<?php

namespace Rtcl\Services\Mcp\Services\Import;

use Rtcl\Services\Mcp\Helpers\ComplexFieldProcessor;
use Rtcl\Services\Importers\ImporterInterface;

defined( 'ABSPATH' ) || exit;

/**
 * MCP Importer implementation for bulk listing imports.
 *
 * Implements the RTCL ImporterInterface to integrate with the existing
 * import infrastructure (ImportRunner, ImportHistory, etc.).
 */
class McpImporter implements ImporterInterface {

	/**
	 * Source identifier.
	 *
	 * @var string
	 */
	private $source;

	/**
	 * Items to import.
	 *
	 * @var array
	 */
	private $items;

	/**
	 * Import options.
	 *
	 * @var array
	 */
	private $options;

	/**
	 * @var TaxonomyResolver
	 */
	private $taxonomy_resolver;

	/**
	 * Constructor.
	 *
	 * @param string $source Source identifier.
	 * @param array  $items  Items to import.
	 * @param array  $options Import options (default_form_id, default_form_slug, etc.).
	 * @param TaxonomyResolver|null $taxonomy_resolver Taxonomy resolver.
	 */
	public function __construct( string $source, array $items, array $options = [], ?TaxonomyResolver $taxonomy_resolver = null ) {
		$this->source = $source;
		$this->items = array_map(
			function ( $item ) {
				return self::ensureExternalId( self::normalizeAliases( $item ) );
			},
			array_values( array_filter( $items, 'is_array' ) )
		);
		$this->options = $options;
		$this->taxonomy_resolver = $taxonomy_resolver ?: new TaxonomyResolver();
	}

	/**
	 * Accept the documented JSON format (MCP Guidelines page): featured_image / gallery for images and
	 * price_type "range" with price_min / price_max.
	 *
	 * @param array $item Import item.
	 *
	 * @return array
	 */
	public static function normalizeAliases( array $item ): array {
		$images = isset( $item['images'] ) && is_array( $item['images'] ) ? $item['images'] : [];
		if ( ! empty( $item['featured_image'] ) && is_string( $item['featured_image'] ) ) {
			array_unshift( $images, $item['featured_image'] );
		}
		if ( ! empty( $item['gallery'] ) && is_array( $item['gallery'] ) ) {
			$images = array_merge( $images, $item['gallery'] );
		}
		if ( $images ) {
			$item['images'] = array_values( array_unique( array_filter( $images, 'is_string' ) ) );
		}

		if ( isset( $item['price_type'] ) && 'range' === sanitize_key( (string) $item['price_type'] ) ) {
			$item['pricing_type'] = 'range';
			unset( $item['price_type'] );
		}
		if ( ! isset( $item['price'] ) && isset( $item['price_min'] ) && is_numeric( $item['price_min'] ) ) {
			$item['price'] = $item['price_min'];
		}
		if ( ! isset( $item['max_price'] ) && isset( $item['price_max'] ) && is_numeric( $item['price_max'] ) ) {
			$item['max_price'] = $item['price_max'];
		}

		return $item;
	}

	/**
	 * Give an item without external_id a stable generated one (title + category + location), so the
	 * documented JSON format works and re-importing the same data updates instead of duplicating.
	 *
	 * @param array $item Import item.
	 *
	 * @return array
	 */
	public static function ensureExternalId( array $item ): array {
		if ( '' !== trim( (string) ( $item['external_id'] ?? '' ) ) || '' === trim( (string) ( $item['title'] ?? '' ) ) ) {
			return $item;
		}

		$flatten = function ( $value ) {
			return is_array( $value ) ? implode( ',', array_map( 'strval', array_filter( $value, 'is_scalar' ) ) ) : (string) $value;
		};
		$key = strtolower( trim( (string) $item['title'] ) ) . '|' . strtolower( $flatten( $item['category'] ?? '' ) ) . '|' . strtolower( $flatten( $item['location'] ?? '' ) );

		$item['external_id'] = 'auto-' . substr( md5( $key ), 0, 16 );

		return $item;
	}

	/**
	 * Get the source key for this importer.
	 *
	 * @return string Source key.
	 */
	public function get_source_key(): string {
		$source = sanitize_key( $this->source );
		if ( strpos( $source, 'mcp-' ) !== 0 ) {
			$source = 'mcp-' . $source;
		}
		return $source;
	}

	/**
	 * Validate the importer configuration.
	 *
	 * @param array $config Configuration array.
	 *
	 * @return true|\WP_Error True on success, WP_Error on failure.
	 */
	public function validate_config( array $config ) {
		if ( empty( $this->source ) ) {
			return new \WP_Error( 'missing_source', __( 'Source identifier is required.', 'classified-listing' ) );
		}

		if ( empty( $this->items ) ) {
			return new \WP_Error( 'no_items', __( 'No items to import.', 'classified-listing' ) );
		}

		return true;
	}

	/**
	 * Fetch and normalize the import data.
	 *
	 * @param array $params Parameters (not used for MCP imports).
	 *
	 * @return array|\WP_Error Array of normalized rows or WP_Error.
	 */
	public function fetch( array $params ) {
		$validation = $this->validate_config( [] );
		if ( is_wp_error( $validation ) ) {
			return $validation;
		}

		$normalized_rows = [];

		foreach ( $this->items as $item ) {
			$row = $this->to_normalized_row( $item );
			if ( is_wp_error( $row ) ) {
				// Include error info in the row so ImportRunner can track it
				$normalized_rows[] = [
					'source'     => $this->get_source_key(),
					'source_id'  => $item['external_id'] ?? '',
					'title'      => $item['title'] ?? '',
					'_error'     => $row->get_error_message(),
				];
			} else {
				$normalized_rows[] = $row;
			}
		}

		return $normalized_rows;
	}

	/**
	 * Convert an MCP item to a NormalizedRow for ListingIngester.
	 *
	 * @param array $item MCP item data.
	 *
	 * @return array|\WP_Error Normalized row or error.
	 */
	private function to_normalized_row( array $item ) {
		$external_id = trim( (string) ( $item['external_id'] ?? '' ) );
		if ( '' === $external_id ) {
			return new \WP_Error( 'missing_external_id', __( 'Missing external_id.', 'classified-listing' ) );
		}

		$title = trim( (string) ( $item['title'] ?? '' ) );
		if ( '' === $title ) {
			return new \WP_Error( 'missing_title', __( 'Missing title.', 'classified-listing' ) );
		}

		$row = [
			'source'      => $this->get_source_key(),
			'source_id'   => $external_id,
			'source_url'  => (string) ( $item['source_url'] ?? '' ),
			'title'       => sanitize_text_field( $title ),
			'content'     => wp_kses_post( $item['description'] ?? '' ),
			'excerpt'     => sanitize_textarea_field( $item['excerpt'] ?? '' ),
			'slug'        => ! empty( $item['slug'] ) ? sanitize_title( $item['slug'] ) : '',
			'status'      => '',  // Will be set by ImportRunner from options, unless overridden below
			'categories'  => [],
			'locations'   => [],
			'tags'        => [],
			'meta'        => [],
			'gallery_urls' => [],
		];

		// Per-item status override (if provided)
		if ( ! empty( $item['status'] ) ) {
			$allowed_statuses = [ 'publish', 'pending', 'draft' ];
			$status = sanitize_key( $item['status'] );
			if ( in_array( $status, $allowed_statuses, true ) ) {
				// Same publish check as the import options.
				$row['status'] = ( 'publish' === $status && ! current_user_can( 'publish_rtcl_listings' ) ) ? 'pending' : $status;
			}
		}

		// Form assignment - will be processed in meta later
		$form_id = 0;
		if ( ! empty( $item['form_id'] ) ) {
			$form_id = absint( $item['form_id'] );
			$row['form_id'] = $form_id;
		} elseif ( ! empty( $item['form_slug'] ) ) {
			$row['form_slug'] = sanitize_key( $item['form_slug'] );
			// Resolve form_id from slug
			$form_id = $this->resolveFormBySlug( $item['form_slug'] );
		}

		// Resolve category - use path method for format ListingIngester expects
		if ( ! empty( $item['category'] ) ) {
			$category_path = $this->taxonomy_resolver->resolveCategoryPath( $item['category'] );
			if ( ! is_wp_error( $category_path ) && $category_path ) {
				$row['categories'] = [ $category_path ];
			} elseif ( is_string( $item['category'] ) && '' !== trim( $item['category'] ) ) {
				// Not (fully) existing: let ListingIngester reuse existing terms and create the missing
				// ones along the path, as the other importers do.
				$row['categories'] = [ sanitize_text_field( $item['category'] ) ];
			}
		}

		// Resolve location - use path method for format ListingIngester expects
		if ( ! empty( $item['location'] ) ) {
			$location_path = $this->taxonomy_resolver->resolveLocationPath( $item['location'] );
			if ( ! is_wp_error( $location_path ) && $location_path ) {
				$row['locations'] = [ $location_path ];
			} elseif ( is_string( $item['location'] ) && '' !== trim( $item['location'] ) ) {
				$row['locations'] = [ sanitize_text_field( $item['location'] ) ];
			}
		}

		// Tags
		if ( ! empty( $item['tags'] ) && is_array( $item['tags'] ) ) {
			$row['tags'] = array_map( 'sanitize_text_field', $item['tags'] );
		}

		// Images
		if ( ! empty( $item['images'] ) && is_array( $item['images'] ) ) {
			$row['gallery_urls'] = array_filter( array_map( 'esc_url_raw', $item['images'] ) );
		}

		// Build meta array
		$meta = [];

		// Form association - resolve and store in meta
		// Priority: item form_id > item form_slug > options default_form_id > options default_form_slug > category auto-detect > system default
		if ( ! $form_id && ! empty( $this->options['default_form_id'] ) ) {
			$form_id = absint( $this->options['default_form_id'] );
		}
		if ( ! $form_id && ! empty( $this->options['default_form_slug'] ) ) {
			$form_id = $this->resolveFormBySlug( $this->options['default_form_slug'] );
		}
		// If still no form, try to auto-detect from category
		if ( ! $form_id && ! empty( $row['categories'] ) ) {
			$form_id = $this->resolveFormFromCategory( $row['categories'][0] );
		}
		// If still no form, try to get system default form
		if ( ! $form_id ) {
			$form_id = $this->getDefaultFormId();
		}
		// Store in meta for ListingIngester to save
		if ( $form_id > 0 ) {
			$meta['_rtcl_form_id'] = $form_id;
		}

		// Price
		if ( isset( $item['price'] ) && is_numeric( $item['price'] ) ) {
			$meta['price'] = (float) $item['price'];
			$meta['_rtcl_price'] = (float) $item['price'];
		}

		// Max price (for price range)
		if ( isset( $item['max_price'] ) && is_numeric( $item['max_price'] ) ) {
			$meta['_rtcl_max_price'] = (float) $item['max_price'];
		}

		// Price type
		if ( ! empty( $item['price_type'] ) ) {
			$allowed_price_types = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$price_type = sanitize_key( $item['price_type'] );
			if ( in_array( $price_type, $allowed_price_types, true ) ) {
				$meta['price_type'] = $price_type;
			}
		}

		// Pricing type (price, range, disabled)
		if ( ! empty( $item['pricing_type'] ) ) {
			$allowed_pricing_types = [ 'price', 'range', 'disabled' ];
			$pricing_type = sanitize_key( $item['pricing_type'] );
			if ( in_array( $pricing_type, $allowed_pricing_types, true ) ) {
				$meta['_rtcl_listing_pricing'] = $pricing_type;
			}
		}

		// Price unit
		if ( ! empty( $item['price_unit'] ) ) {
			$meta['_rtcl_price_unit'] = sanitize_text_field( $item['price_unit'] );
		}

		// Listing type (ad_type)
		if ( ! empty( $item['listing_type'] ) ) {
			$allowed_types = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$listing_type = sanitize_key( $item['listing_type'] );
			if ( in_array( $listing_type, $allowed_types, true ) ) {
				$meta['ad_type'] = $listing_type;
			}
		}

		// Featured flag
		if ( isset( $item['featured'] ) ) {
			$meta['featured'] = $item['featured'] ? 1 : 0;
			$meta['_rtcl_featured'] = $item['featured'] ? 1 : 0;
		}

		// Contact info
		$contact = $item['contact'] ?? [];
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
		$meta = ComplexFieldProcessor::processPresetFields( $item, $meta );

		// Custom fields with proper type handling
		if ( ! empty( $item['custom_fields'] ) && is_array( $item['custom_fields'] ) ) {
			$processed = ComplexFieldProcessor::processCustomFields( $item['custom_fields'] );
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
	 * Resolve form ID from slug.
	 *
	 * @param string $slug Form slug.
	 * @return int Form ID or 0 if not found.
	 */
	private function resolveFormBySlug( string $slug ): int {
		if ( ! $this->isFormBuilderEnabled() ) {
			return 0;
		}

		$form_posts = get_posts( [
			'post_type'      => 'rtcl_fb_form',
			'name'           => sanitize_key( $slug ),
			'posts_per_page' => 1,
			'post_status'    => 'publish',
			'fields'         => 'ids',
		] );

		return ! empty( $form_posts ) ? (int) $form_posts[0] : 0;
	}

	/**
	 * Resolve form ID from category path.
	 *
	 * @param string $category_path Category path (e.g., "Electronics > Phones").
	 * @return int Form ID or 0 if not found.
	 */
	private function resolveFormFromCategory( string $category_path ): int {
		if ( ! $this->isFormBuilderEnabled() ) {
			return 0;
		}

		// Parse the category path to get the deepest category
		$segments = array_map( 'trim', explode( '>', $category_path ) );
		$segments = array_filter( $segments );
		if ( empty( $segments ) ) {
			return 0;
		}

		// Find the deepest category term
		$parent = 0;
		$category_id = 0;
		foreach ( $segments as $name ) {
			$term = term_exists( $name, rtcl()->category, $parent );
			if ( $term ) {
				$category_id = (int) $term['term_id'];
				$parent = $category_id;
			} else {
				break;
			}
		}

		if ( ! $category_id ) {
			return 0;
		}

		// Check this category and its parents for form association
		return $this->getFormIdForCategory( $category_id );
	}

	/**
	 * Get form ID associated with a category.
	 *
	 * Checks the category and its parents for form association.
	 *
	 * @param int $category_id Category term ID.
	 * @return int Form ID or 0 if not found.
	 */
	private function getFormIdForCategory( int $category_id ): int {
		$form_id = (int) get_term_meta( $category_id, '_rtcl_form_id', true );
		if ( $form_id > 0 ) {
			return $form_id;
		}

		// Check parent categories
		$term = get_term( $category_id, rtcl()->category );
		if ( $term && ! is_wp_error( $term ) && $term->parent > 0 ) {
			return $this->getFormIdForCategory( $term->parent );
		}

		return 0;
	}

	/**
	 * Get the default form ID.
	 *
	 * @return int Default form ID or 0 if not found.
	 */
	private function getDefaultFormId(): int {
		if ( ! class_exists( 'Rtcl\Models\Form\Form' ) ) {
			return 0;
		}

		$form = \Rtcl\Models\Form\Form::query()->where( 'default', 1 )->first();
		return $form ? (int) $form->id : 0;
	}

	/**
	 * Check if Form Builder is enabled.
	 *
	 * @return bool
	 */
	private function isFormBuilderEnabled(): bool {
		return class_exists( 'Rtcl\Models\Form\Form' ) &&
			   class_exists( 'Rtcl\Services\FormBuilder\FBHelper' ) &&
			   \Rtcl\Services\FormBuilder\FBHelper::isEnabled();
	}

}
