<?php

namespace Rtcl\Services\Mcp\Services\Import;

use Rtcl\Services\Mcp\ErrorCodes;
use Rtcl\Services\Mcp\Helpers\ComplexFieldProcessor;
use Rtcl\Services\Importers\DedupeResolver;
use Rtcl\Services\Importers\ListingIngester;

defined( 'ABSPATH' ) || exit;

/**
 * Handles single listing upsert operations via MCP.
 *
 * Wraps the existing RTCL DedupeResolver and ListingIngester to provide
 * idempotent create/update functionality using source + external_id.
 */
class UpsertService {

	/**
	 * @var DedupeResolver
	 */
	private $dedupe;

	/**
	 * @var ListingIngester
	 */
	private $ingester;

	/**
	 * @var TaxonomyResolver
	 */
	private $taxonomy_resolver;

	public function __construct(
		?DedupeResolver $dedupe = null,
		?ListingIngester $ingester = null,
		?TaxonomyResolver $taxonomy_resolver = null
	) {
		$this->dedupe            = $dedupe ?: new DedupeResolver();
		$this->ingester          = $ingester ?: new ListingIngester();
		$this->taxonomy_resolver = $taxonomy_resolver ?: new TaxonomyResolver();
	}

	/**
	 * Upsert a listing using slug (WordPress native) or source+external_id.
	 *
	 * @param array $data    Listing data (title, description, category, location, price, etc.).
	 * @param array $options {
	 *     @type string $slug            Slug to find/create listing by (WordPress native).
	 *     @type string $source          Source identifier for external tracking.
	 *     @type string $external_id     External ID for source-based lookup.
	 *     @type bool   $update_existing Whether to update if exists (default true).
	 *     @type string $default_status  Default status for new listings (default 'pending').
	 *     @type int    $target_category Fallback category ID if none provided.
	 *     @type int    $target_location Fallback location ID if none provided.
	 * }
	 *
	 * @return array|\WP_Error {
	 *     @type string $action     'created' | 'updated' | 'skipped'
	 *     @type int    $listing_id The listing post ID
	 *     @type string $slug       The listing slug
	 *     @type string $url        Permalink to the listing
	 * }
	 */
	public function upsertBySlug( array $data, array $options = [] ) {
		$options = wp_parse_args( $options, [
			'slug'            => '',
			'update_existing' => true,
			'default_status'  => 'pending',
			'target_category' => 0,
			'target_location' => 0,
		] );

		$title = trim( (string) ( $data['title'] ?? '' ) );
		if ( '' === $title ) {
			return new \WP_Error(
				'missing_title',
				__( 'Listing title is required.', 'classified-listing' ),
				[ 'code' => ErrorCodes::VALIDATION_REQUIRED_FIELD, 'field' => 'title' ]
			);
		}

		// Determine slug
		$slug = ! empty( $options['slug'] )
			? sanitize_title( $options['slug'] )
			: sanitize_title( $title );

		// Find existing listing by slug
		$existing_id = $this->find_by_slug( $slug );

		// Permission check
		$permission_check = $this->check_permissions( $existing_id );
		if ( is_wp_error( $permission_check ) ) {
			return $permission_check;
		}

		// If exists and update not allowed, skip
		if ( $existing_id && ! $options['update_existing'] ) {
			$post = get_post( $existing_id );
			return [
				'action'     => 'skipped',
				'listing_id' => $existing_id,
				'slug'       => $post->post_name,
				'title'      => $post->post_title,
				'status'     => $post->post_status,
				'url'        => get_permalink( $existing_id ),
				'message'    => __( 'Listing exists, update skipped.', 'classified-listing' ),
			];
		}

		// Prepare post data
		$postarr = [
			'post_type'    => rtcl()->post_type,
			'post_title'   => sanitize_text_field( $title ),
			'post_name'    => $slug,
			'post_content' => wp_kses_post( $data['description'] ?? '' ),
			'post_excerpt' => sanitize_textarea_field( $data['excerpt'] ?? '' ),
			'post_status'  => $this->resolve_status( $data['status'] ?? '', $options['default_status'] ),
		];

		if ( $existing_id ) {
			// Update existing
			$postarr['ID'] = $existing_id;
			$result = wp_update_post( $postarr, true );
			$action = 'updated';
		} else {
			// Create new
			$result = wp_insert_post( $postarr, true );
			$action = 'created';
		}

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		$post_id = (int) $result;

		// Update taxonomies and meta
		$this->update_listing_taxonomies( $post_id, $data, $options );
		$this->update_listing_meta( $post_id, $data );

		// Handle images
		if ( ! empty( $data['images'] ) && is_array( $data['images'] ) ) {
			$this->process_images( $post_id, $data['images'], $action );
		}

		$post = get_post( $post_id );

		return [
			'action'     => $action,
			'listing_id' => $post_id,
			'slug'       => $post->post_name,
			'title'      => $post->post_title,
			'status'     => $post->post_status,
			'url'        => get_permalink( $post_id ),
		];
	}

	/**
	 * Upsert a listing using source + external_id as the unique identifier.
	 *
	 * For syncing from external systems with tracking.
	 *
	 * @param string $source      Source system identifier (e.g., 'dealer-feed').
	 * @param string $external_id Unique identifier in the source system.
	 * @param array  $data        Listing data (title, description, category, location, price, etc.).
	 * @param array  $options     {
	 *     @type bool   $update_existing  Whether to update if exists (default true).
	 *     @type string $default_status   Default status for new listings (default 'pending').
	 *     @type int    $target_category  Fallback category ID if none provided.
	 *     @type int    $target_location  Fallback location ID if none provided.
	 * }
	 *
	 * @return array|\WP_Error {
	 *     @type string $action     'created' | 'updated' | 'skipped'
	 *     @type int    $listing_id The listing post ID
	 *     @type string $url        Permalink to the listing
	 *     @type string $source     Source identifier
	 *     @type string $external_id External ID
	 * }
	 */
	public function upsert( string $source, string $external_id, array $data, array $options = [] ) {
		// Validate required inputs
		if ( '' === $source ) {
			return new \WP_Error(
				'missing_source',
				__( 'Source identifier is required.', 'classified-listing' ),
				[ 'code' => ErrorCodes::MISSING_SOURCE ]
			);
		}

		if ( '' === $external_id ) {
			return new \WP_Error(
				'missing_external_id',
				__( 'External ID is required.', 'classified-listing' ),
				[ 'code' => ErrorCodes::MISSING_EXTERNAL_ID ]
			);
		}

		$title = trim( (string) ( $data['title'] ?? '' ) );
		if ( '' === $title ) {
			return new \WP_Error(
				'missing_title',
				__( 'Listing title is required.', 'classified-listing' ),
				[ 'code' => ErrorCodes::VALIDATION_REQUIRED_FIELD, 'field' => 'title' ]
			);
		}

		$options = wp_parse_args( $options, [
			'update_existing' => true,
			'default_status'  => 'pending',
			'target_category' => 0,
			'target_location' => 0,
		] );

		// Check if listing already exists
		$existing_id = $this->dedupe->find_existing( $this->normalize_source( $source ), $external_id );

		// Permission check
		$permission_check = $this->check_permissions( $existing_id );
		if ( is_wp_error( $permission_check ) ) {
			return $permission_check;
		}

		// Prepare the normalized row for ListingIngester
		$row = $this->prepare_normalized_row( $source, $external_id, $data, $options );
		if ( is_wp_error( $row ) ) {
			return $row;
		}

		// Call the ingester
		$result = $this->ingester->ingest_normalized( $row, [
			'update_existing' => $options['update_existing'],
			'target_category' => (int) $options['target_category'],
			'target_location' => (int) $options['target_location'],
			'default_status'  => $options['default_status'],
			'dedupe'          => $this->dedupe,
		] );

		// Handle errors
		if ( empty( $result['post_id'] ) ) {
			$error_message = ! empty( $result['errors'] )
				? implode( ' ', $result['errors'] )
				: __( 'Failed to create or update listing.', 'classified-listing' );

			return new \WP_Error(
				'upsert_failed',
				$error_message,
				[ 'code' => ErrorCodes::INTERNAL_ERROR ]
			);
		}

		// Map action names from ingester to MCP convention
		$action_map = [
			'inserted' => 'created',
			'updated'  => 'updated',
			'skipped'  => 'skipped',
		];

		$action = $action_map[ $result['action'] ] ?? $result['action'];

		// Get the listing post for title and status
		$post = get_post( $result['post_id'] );

		return [
			'action'      => $action,
			'listing_id'  => (int) $result['post_id'],
			'slug'        => $post ? $post->post_name : '',
			'title'       => $post ? $post->post_title : '',
			'status'      => $post ? $post->post_status : '',
			'url'         => get_permalink( $result['post_id'] ),
			'source'      => $this->normalize_source( $source ),
			'external_id' => $external_id,
		];
	}

	/**
	 * Find listing by slug.
	 *
	 * @param string $slug Post slug.
	 *
	 * @return int|null Post ID or null.
	 */
	public function find_by_slug( string $slug ): ?int {
		global $wpdb;

		$post_id = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = %s LIMIT 1",
				$slug,
				rtcl()->post_type
			)
		);

		return $post_id ? (int) $post_id : null;
	}

	/**
	 * Update listing taxonomies.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $data    Listing data.
	 * @param array $options Options.
	 */
	private function update_listing_taxonomies( int $post_id, array $data, array $options ): void {
		// Category
		if ( ! empty( $data['category'] ) ) {
			$category_path = $this->taxonomy_resolver->resolveCategoryPath( $data['category'] );
			if ( ! is_wp_error( $category_path ) && $category_path ) {
				$cat_ids = $this->resolve_hierarchy_to_ids( $category_path, rtcl()->category );
				if ( ! empty( $cat_ids ) ) {
					wp_set_object_terms( $post_id, $cat_ids, rtcl()->category );
				}
			}
		} elseif ( ! empty( $options['target_category'] ) ) {
			wp_set_object_terms( $post_id, [ (int) $options['target_category'] ], rtcl()->category );
		}

		// Location
		if ( ! empty( $data['location'] ) ) {
			$location_path = $this->taxonomy_resolver->resolveLocationPath( $data['location'] );
			if ( ! is_wp_error( $location_path ) && $location_path ) {
				$loc_ids = $this->resolve_hierarchy_to_ids( $location_path, rtcl()->location );
				if ( ! empty( $loc_ids ) ) {
					wp_set_object_terms( $post_id, $loc_ids, rtcl()->location );
				}
			}
		} elseif ( ! empty( $options['target_location'] ) ) {
			wp_set_object_terms( $post_id, [ (int) $options['target_location'] ], rtcl()->location );
		}

		// Tags
		if ( ! empty( $data['tags'] ) && is_array( $data['tags'] ) ) {
			$tag_ids = [];
			foreach ( $data['tags'] as $tag_name ) {
				$tag_name = trim( sanitize_text_field( $tag_name ) );
				if ( '' === $tag_name ) {
					continue;
				}
				$check = term_exists( $tag_name, rtcl()->tag );
				if ( ! $check ) {
					$check = wp_insert_term( $tag_name, rtcl()->tag, [ 'slug' => sanitize_title( $tag_name ) ] );
				}
				if ( ! is_wp_error( $check ) && ! empty( $check['term_id'] ) ) {
					$tag_ids[] = (int) $check['term_id'];
				}
			}
			if ( ! empty( $tag_ids ) ) {
				wp_set_object_terms( $post_id, $tag_ids, rtcl()->tag );
			}
		}
	}

	/**
	 * Resolve hierarchy path to term IDs.
	 *
	 * @param string $path     Hierarchy path.
	 * @param string $taxonomy Taxonomy.
	 *
	 * @return array Term IDs.
	 */
	private function resolve_hierarchy_to_ids( string $path, string $taxonomy ): array {
		$segments = array_map( 'trim', explode( '>', $path ) );
		$segments = array_filter( $segments );
		$term_ids = [];
		$parent = 0;

		foreach ( $segments as $name ) {
			$check = term_exists( $name, $taxonomy, $parent );
			if ( $check ) {
				$term_ids[] = (int) $check['term_id'];
				$parent = (int) $check['term_id'];
			} else {
				break;
			}
		}

		return $term_ids;
	}

	/**
	 * Update listing meta fields.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $data    Listing data.
	 */
	private function update_listing_meta( int $post_id, array $data ): void {
		// Price
		if ( isset( $data['price'] ) && is_numeric( $data['price'] ) ) {
			update_post_meta( $post_id, 'price', (float) $data['price'] );
			update_post_meta( $post_id, '_rtcl_price', (float) $data['price'] );
		}

		// Max price (for price range)
		if ( isset( $data['max_price'] ) && is_numeric( $data['max_price'] ) ) {
			update_post_meta( $post_id, '_rtcl_max_price', (float) $data['max_price'] );
		}

		// Price type
		if ( ! empty( $data['price_type'] ) ) {
			$allowed = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$price_type = sanitize_key( $data['price_type'] );
			if ( in_array( $price_type, $allowed, true ) ) {
				update_post_meta( $post_id, 'price_type', $price_type );
			}
		}

		// Pricing type (price, range, disabled)
		if ( ! empty( $data['pricing_type'] ) ) {
			$allowed = [ 'price', 'range', 'disabled' ];
			$pricing_type = sanitize_key( $data['pricing_type'] );
			if ( in_array( $pricing_type, $allowed, true ) ) {
				update_post_meta( $post_id, '_rtcl_listing_pricing', $pricing_type );
			}
		}

		// Price unit
		if ( ! empty( $data['price_unit'] ) ) {
			update_post_meta( $post_id, '_rtcl_price_unit', sanitize_text_field( $data['price_unit'] ) );
		}

		// Listing type (ad_type)
		if ( ! empty( $data['listing_type'] ) ) {
			$allowed = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$listing_type = sanitize_key( $data['listing_type'] );
			if ( in_array( $listing_type, $allowed, true ) ) {
				update_post_meta( $post_id, 'ad_type', $listing_type );
			}
		}

		// Featured flag
		if ( isset( $data['featured'] ) ) {
			update_post_meta( $post_id, 'featured', $data['featured'] ? 1 : 0 );
			update_post_meta( $post_id, '_rtcl_featured', $data['featured'] ? 1 : 0 );
		}

		// Form assignment
		$form_id = 0;
		if ( ! empty( $data['form_id'] ) ) {
			$form_id = absint( $data['form_id'] );
		} elseif ( ! empty( $data['form_slug'] ) ) {
			// Resolve form by slug
			$form_posts = get_posts( [
				'post_type'      => 'rtcl_fb_form',
				'name'           => sanitize_key( $data['form_slug'] ),
				'posts_per_page' => 1,
				'post_status'    => 'publish',
				'fields'         => 'ids',
			] );
			if ( ! empty( $form_posts ) ) {
				$form_id = $form_posts[0];
			}
		}
		if ( $form_id > 0 ) {
			update_post_meta( $post_id, '_rtcl_form_id', $form_id );
		}

		// Contact info
		$contact = $data['contact'] ?? [];
		if ( ! empty( $contact['email'] ) ) {
			update_post_meta( $post_id, 'email', sanitize_email( $contact['email'] ) );
		}
		if ( ! empty( $contact['phone'] ) ) {
			update_post_meta( $post_id, 'phone', sanitize_text_field( $contact['phone'] ) );
		}
		if ( ! empty( $contact['whatsapp'] ) ) {
			update_post_meta( $post_id, '_rtcl_whatsapp_number', sanitize_text_field( $contact['whatsapp'] ) );
		}
		if ( ! empty( $contact['website'] ) ) {
			update_post_meta( $post_id, 'website', esc_url_raw( $contact['website'] ) );
		}
		if ( ! empty( $contact['address'] ) ) {
			update_post_meta( $post_id, 'address', sanitize_text_field( $contact['address'] ) );
		}
		if ( ! empty( $contact['zipcode'] ) ) {
			update_post_meta( $post_id, 'zipcode', sanitize_text_field( $contact['zipcode'] ) );
		}

		// Complex preset fields (video_urls, geo_location, business_hours, social_profiles, contact_person)
		ComplexFieldProcessor::saveToPost( $post_id, $data );

		// Custom fields with proper type handling
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			$processed = ComplexFieldProcessor::processCustomFields( $data['custom_fields'] );
			foreach ( $processed as $key => $value ) {
				// Handle date range fields (need separate meta keys)
				if ( is_array( $value ) && isset( $value['start'] ) && isset( $value['end'] ) ) {
					update_post_meta( $post_id, $key . '_start', $value['start'] );
					update_post_meta( $post_id, $key . '_end', $value['end'] );
				}
				update_post_meta( $post_id, $key, $value );
			}
		}
	}

	/**
	 * Process and attach images.
	 *
	 * @param int    $post_id Post ID.
	 * @param array  $images  Image URLs.
	 * @param string $action  Action (created/updated).
	 */
	private function process_images( int $post_id, array $images, string $action ): void {
		if ( ! function_exists( 'media_sideload_image' ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}

		$attachment_ids = [];
		foreach ( $images as $url ) {
			$url = esc_url_raw( trim( $url ) );
			if ( empty( $url ) ) {
				continue;
			}

			$attachment_id = media_sideload_image( $url, $post_id, null, 'id' );
			if ( ! is_wp_error( $attachment_id ) ) {
				$attachment_ids[] = $attachment_id;
			}
		}

		if ( ! empty( $attachment_ids ) ) {
			// Set featured image on new posts or if none exists
			if ( 'created' === $action || ! has_post_thumbnail( $post_id ) ) {
				set_post_thumbnail( $post_id, $attachment_ids[0] );
			}

			// Store gallery
			update_post_meta( $post_id, '_rtcl_images', $attachment_ids );
		}
	}

	/**
	 * Find an existing listing by source + external_id.
	 *
	 * @param string $source      Source identifier.
	 * @param string $external_id External ID.
	 *
	 * @return int|null Listing ID or null if not found.
	 */
	public function find_existing( string $source, string $external_id ): ?int {
		return $this->dedupe->find_existing( $this->normalize_source( $source ), $external_id );
	}

	/**
	 * Check permissions for upsert operation.
	 *
	 * Requires manage_options (admin) capability for all operations.
	 *
	 * @param int|null $existing_id Existing listing ID, or null for new listing.
	 *
	 * @return true|\WP_Error
	 */
	private function check_permissions( ?int $existing_id ) {
		// All upsert operations require admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to manage listings. Administrator access required.', 'classified-listing' ),
				[ 'code' => ErrorCodes::PERM_CREATE_DENIED ]
			);
		}

		return true;
	}

	/**
	 * Prepare a normalized row for the ListingIngester.
	 *
	 * @param string $source      Source identifier.
	 * @param string $external_id External ID.
	 * @param array  $data        Input data from MCP.
	 * @param array  $options     Upsert options.
	 *
	 * @return array|\WP_Error Normalized row or error.
	 */
	private function prepare_normalized_row( string $source, string $external_id, array $data, array $options ) {
		$row = [
			'source'      => $this->normalize_source( $source ),
			'source_id'   => $external_id,
			'source_url'  => (string) ( $data['source_url'] ?? '' ),
			'title'       => sanitize_text_field( $data['title'] ?? '' ),
			'content'     => wp_kses_post( $data['description'] ?? '' ),
			'excerpt'     => sanitize_textarea_field( $data['excerpt'] ?? '' ),
			'status'      => $this->resolve_status( $data['status'] ?? '', $options['default_status'] ),
			'categories'  => [],
			'locations'   => [],
			'tags'        => [],
			'meta'        => [],
			'gallery_urls' => [],
		];

		// Resolve category - use path method for format ListingIngester expects
		if ( ! empty( $data['category'] ) ) {
			$category_path = $this->taxonomy_resolver->resolveCategoryPath( $data['category'] );
			if ( is_wp_error( $category_path ) ) {
				return $category_path;
			}
			if ( $category_path ) {
				$row['categories'] = [ $category_path ];
			}
		}

		// Resolve location - use path method for format ListingIngester expects
		if ( ! empty( $data['location'] ) ) {
			$location_path = $this->taxonomy_resolver->resolveLocationPath( $data['location'] );
			if ( is_wp_error( $location_path ) ) {
				return $location_path;
			}
			if ( $location_path ) {
				$row['locations'] = [ $location_path ];
			}
		}

		// Tags
		if ( ! empty( $data['tags'] ) && is_array( $data['tags'] ) ) {
			$row['tags'] = array_map( 'sanitize_text_field', $data['tags'] );
		}

		// Images
		if ( ! empty( $data['images'] ) && is_array( $data['images'] ) ) {
			$row['gallery_urls'] = array_filter( array_map( 'esc_url_raw', $data['images'] ) );
		}

		// Build meta array
		$meta = [];

		// Price
		if ( isset( $data['price'] ) && is_numeric( $data['price'] ) ) {
			$meta['price'] = (float) $data['price'];
			$meta['_rtcl_price'] = (float) $data['price'];
		}

		// Max price (for price range)
		if ( isset( $data['max_price'] ) && is_numeric( $data['max_price'] ) ) {
			$meta['_rtcl_max_price'] = (float) $data['max_price'];
		}

		// Price type
		if ( ! empty( $data['price_type'] ) ) {
			$allowed_price_types = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$price_type = sanitize_key( $data['price_type'] );
			if ( in_array( $price_type, $allowed_price_types, true ) ) {
				$meta['price_type'] = $price_type;
			}
		}

		// Pricing type (price, range, disabled)
		if ( ! empty( $data['pricing_type'] ) ) {
			$allowed_pricing_types = [ 'price', 'range', 'disabled' ];
			$pricing_type = sanitize_key( $data['pricing_type'] );
			if ( in_array( $pricing_type, $allowed_pricing_types, true ) ) {
				$meta['_rtcl_listing_pricing'] = $pricing_type;
			}
		}

		// Price unit
		if ( ! empty( $data['price_unit'] ) ) {
			$meta['_rtcl_price_unit'] = sanitize_text_field( $data['price_unit'] );
		}

		// Listing type (ad_type)
		if ( ! empty( $data['listing_type'] ) ) {
			$allowed_types = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$listing_type = sanitize_key( $data['listing_type'] );
			if ( in_array( $listing_type, $allowed_types, true ) ) {
				$meta['ad_type'] = $listing_type;
			}
		}

		// Featured flag
		if ( isset( $data['featured'] ) ) {
			$meta['featured'] = $data['featured'] ? 1 : 0;
			$meta['_rtcl_featured'] = $data['featured'] ? 1 : 0;
		}

		// Contact info
		$contact = $data['contact'] ?? [];
		if ( ! empty( $contact['email'] ) ) {
			$meta['email'] = sanitize_email( $contact['email'] );
		}
		if ( ! empty( $contact['phone'] ) ) {
			$meta['phone'] = sanitize_text_field( $contact['phone'] );
		}
		if ( ! empty( $contact['whatsapp'] ) ) {
			$meta['_rtcl_whatsapp_number'] = sanitize_text_field( $contact['whatsapp'] );
		}
		if ( ! empty( $contact['website'] ) ) {
			$meta['website'] = esc_url_raw( $contact['website'] );
		}
		if ( ! empty( $contact['address'] ) ) {
			$meta['address'] = sanitize_text_field( $contact['address'] );
		}
		if ( ! empty( $contact['zipcode'] ) ) {
			$meta['zipcode'] = sanitize_text_field( $contact['zipcode'] );
		}

		// Complex preset fields (video_urls, geo_location, business_hours, social_profiles, contact_person)
		$meta = ComplexFieldProcessor::processPresetFields( $data, $meta );

		// Custom fields with proper type handling
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			$processed = ComplexFieldProcessor::processCustomFields( $data['custom_fields'] );
			foreach ( $processed as $key => $value ) {
				$meta[ $key ] = $value;
				// Handle date range fields (need separate meta keys)
				if ( is_array( $value ) && isset( $value['start'] ) && isset( $value['end'] ) ) {
					$meta[ $key . '_start' ] = $value['start'];
					$meta[ $key . '_end' ] = $value['end'];
				}
			}
		}

		$row['meta'] = $meta;

		return $row;
	}

	/**
	 * Normalize the source key for storage.
	 *
	 * @param string $source Source identifier.
	 *
	 * @return string Normalized source key.
	 */
	private function normalize_source( string $source ): string {
		// Prefix with 'mcp-' to distinguish from other import sources
		$source = sanitize_key( $source );
		if ( strpos( $source, 'mcp-' ) !== 0 ) {
			$source = 'mcp-' . $source;
		}
		return $source;
	}

	/**
	 * Resolve status with permission check.
	 *
	 * Uses RTCL settings for default status when not explicitly provided.
	 *
	 * @param string $requested_status Requested status.
	 * @param string $default_status   Default status (fallback if settings not available).
	 *
	 * @return string Resolved status.
	 */
	private function resolve_status( string $requested_status, string $default_status ): string {
		$allowed = [ 'publish', 'pending', 'draft', 'private' ];
		$status = sanitize_key( $requested_status );

		// If no status provided, use RTCL settings for new listings
		if ( empty( $status ) || ! in_array( $status, $allowed, true ) ) {
			// Try to get from RTCL settings first
			$settings_status = \Rtcl\Helpers\Functions::get_option_item( 'rtcl_general_settings', 'new_listing_status', '' );
			if ( ! empty( $settings_status ) && in_array( $settings_status, $allowed, true ) ) {
				$status = $settings_status;
			} else {
				$status = $default_status;
			}
		}

		// Validate status
		if ( ! in_array( $status, $allowed, true ) ) {
			$status = 'pending';
		}

		// Publish/private requires capability
		if ( in_array( $status, [ 'publish', 'private' ], true ) && ! current_user_can( 'publish_rtcl_listings' ) ) {
			// Fall back to RTCL settings or pending
			$settings_status = \Rtcl\Helpers\Functions::get_option_item( 'rtcl_general_settings', 'new_listing_status', 'pending' );
			$status = in_array( $settings_status, [ 'publish', 'private' ], true ) ? 'pending' : $settings_status;
		}

		return $status;
	}

}
