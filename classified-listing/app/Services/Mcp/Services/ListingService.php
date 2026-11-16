<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Helpers\Functions;
use Rtcl\Services\Mcp\Helpers\ComplexFieldProcessor;
use Rtcl\Services\Mcp\Helpers\ImageHelper;
use Rtcl\Models\Listing;

defined( 'ABSPATH' ) || exit;

class ListingService {

	/**
	 * Get a sanitized listing array by ID.
	 *
	 * @param int $listing_id Listing ID.
	 * @return array|\WP_Error
	 */
	public function getListing( $listing_id ) {
		$post = get_post( absint( $listing_id ) );

		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$listing = new Listing( $post );

		return $this->formatListing( $listing );
	}

	/**
	 * Create a new listing.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param array $data Listing data.
	 * @return array|\WP_Error
	 */
	public function createListing( $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to create listings.', 'classified-listing' ) );
		}

		// Determine the status from RTCL settings (used when status is not specified).
		$new_listing_status = Functions::get_option_item( 'rtcl_general_settings', 'new_listing_status', 'pending' );

		// If user explicitly provided a status, use it (with permission checks).
		if ( ! empty( $data['status'] ) ) {
			$requested_status = sanitize_key( $data['status'] );
			$allowed_statuses = [ 'publish', 'pending', 'draft', 'private' ];

			if ( in_array( $requested_status, $allowed_statuses, true ) ) {
				// Publish/private require publish capability.
				if ( in_array( $requested_status, [ 'publish', 'private' ], true ) ) {
					if ( current_user_can( 'publish_rtcl_listings' ) ) {
						$new_listing_status = $requested_status;
					}
					// Otherwise fall back to settings default.
				} else {
					// draft/pending allowed for any user.
					$new_listing_status = $requested_status;
				}
			}
		}

		$post_arg = [
			'post_title'   => sanitize_text_field( $data['title'] ),
			'post_content' => isset( $data['description'] ) ? wp_kses_post( $data['description'] ) : '',
			'post_status'  => $new_listing_status,
			'post_type'    => rtcl()->post_type,
			'post_author'  => get_current_user_id(),
		];

		$post_arg = apply_filters( 'rtcl_listing_save_update_args', $post_arg, 'new' );

		$listing_id = wp_insert_post( $post_arg, true );

		if ( is_wp_error( $listing_id ) ) {
			return $listing_id;
		}

		// Set meta fields.
		$this->updateListingMeta( $listing_id, $data );

		// Set taxonomies.
		$this->updateListingTaxonomies( $listing_id, $data );

		// Fire RTCL hooks for addon compatibility.
		$listing  = new Listing( $listing_id );
		$cat_id   = 0;
		$cats     = $listing->get_categories();
		if ( ! empty( $cats ) ) {
			$last_cat = end( $cats );
			$cat_id   = $last_cat->term_id;
		}

		do_action( 'rtcl_listing_form_after_save_or_update', $listing, 'new', $cat_id, $new_listing_status, [ 'data' => $data ] );

		return [
			'listing_id' => $listing_id,
			'title'      => get_the_title( $listing_id ),
			'status'     => get_post_status( $listing_id ),
			'url'        => get_permalink( $listing_id ),
			'message'    => __( 'Listing created successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Update an existing listing.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $data       Fields to update.
	 * @return array|\WP_Error
	 */
	public function updateListing( $listing_id, $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update listings.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$post_arg = [ 'ID' => $listing_id ];

		if ( isset( $data['title'] ) ) {
			$post_arg['post_title'] = sanitize_text_field( $data['title'] );
		}
		if ( isset( $data['description'] ) ) {
			$post_arg['post_content'] = wp_kses_post( $data['description'] );
		}

		// Handle status change.
		$new_status = null;
		if ( ! empty( $data['status'] ) ) {
			// User explicitly provided a status.
			$requested_status = sanitize_key( $data['status'] );
			$allowed_statuses = [ 'publish', 'pending', 'draft', 'private' ];

			if ( in_array( $requested_status, $allowed_statuses, true ) ) {
				// Publish/private require publish capability.
				if ( in_array( $requested_status, [ 'publish', 'private' ], true ) ) {
					if ( current_user_can( 'publish_rtcl_listings' ) ) {
						$new_status = $requested_status;
					}
				} else {
					// draft/pending allowed for any user.
					$new_status = $requested_status;
				}
			}
		} else {
			// No status provided - check if edited_listing_status setting should be applied.
			$edited_listing_status = Functions::get_option_item( 'rtcl_general_settings', 'edited_listing_status', '' );
			if ( ! empty( $edited_listing_status ) ) {
				$new_status = $edited_listing_status;
			}
		}

		if ( $new_status ) {
			$post_arg['post_status'] = $new_status;
		}

		if ( count( $post_arg ) > 1 ) {
			$post_arg = apply_filters( 'rtcl_listing_save_update_args', $post_arg, 'update' );
			$result   = wp_update_post( $post_arg, true );
			if ( is_wp_error( $result ) ) {
				return $result;
			}
		}

		// Update meta fields.
		$this->updateListingMeta( $listing_id, $data );

		// Update taxonomies.
		$this->updateListingTaxonomies( $listing_id, $data );

		// Fire RTCL hooks.
		$listing = new Listing( $listing_id );
		$cat_id  = 0;
		$cats    = $listing->get_categories();
		if ( ! empty( $cats ) ) {
			$last_cat = end( $cats );
			$cat_id   = $last_cat->term_id;
		}

		do_action( 'rtcl_listing_form_after_save_or_update', $listing, 'update', $cat_id, $post->post_status, [ 'data' => $data ] );

		return [
			'listing_id' => $listing_id,
			'title'      => get_the_title( $listing_id ),
			'status'     => get_post_status( $listing_id ),
			'url'        => get_permalink( $listing_id ),
			'message'    => __( 'Listing updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Change listing status.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int    $listing_id Listing ID.
	 * @param string $status     New status.
	 * @return array|\WP_Error
	 */
	public function changeStatus( $listing_id, $status ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to change listing status.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$old_status = $post->post_status;

		$result = wp_update_post( [
			'ID'          => $listing_id,
			'post_status' => $status,
		], true );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return [
			'listing_id' => $listing_id,
			'old_status' => $old_status,
			'new_status' => $status,
			'message'    => __( 'Listing status updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Update listing flags (featured; add-ons add more via `rtcl_mcp_update_listing_flags`).
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $flags      Array of flag key-value pairs.
	 * @return array|\WP_Error
	 */
	public function updateFlags( $listing_id, $flags ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update listing flags.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$changes = [];

		if ( isset( $flags['featured'] ) ) {
			$old_featured = (bool) absint( get_post_meta( $listing_id, 'featured', true ) );
			$new_featured = (bool) $flags['featured'];
			update_post_meta( $listing_id, 'featured', $new_featured ? 1 : 0 );
			$changes['featured'] = [
				'old' => $old_featured,
				'new' => $new_featured,
			];
		}

		/**
		 * Filter the flag changes, so add-ons can apply flags they own.
		 *
		 * @param array $changes    Applied changes keyed by flag: [ 'old' => ..., 'new' => ... ].
		 * @param int   $listing_id Listing ID.
		 * @param array $flags      Requested flags.
		 */
		$changes = apply_filters( 'rtcl_mcp_update_listing_flags', $changes, $listing_id, $flags );

		return [
			'listing_id' => $listing_id,
			'changes'    => $changes,
			'message'    => __( 'Listing flags updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Update listing price.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param float $price      New price.
	 * @return array|\WP_Error
	 */
	public function updatePrice( $listing_id, $price ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update listing price.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$old_price = get_post_meta( $listing_id, 'price', true );
		update_post_meta( $listing_id, 'price', $price );

		return [
			'listing_id' => $listing_id,
			'old_price'  => $old_price !== '' ? (float) $old_price : null,
			'new_price'  => (float) $price,
			'message'    => __( 'Listing price updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Format a Listing model into a sanitized response array.
	 *
	 * @param Listing $listing Listing model instance.
	 * @return array
	 */
	public function formatListing( Listing $listing ) {
		$id = $listing->get_id();

		// Categories.
		$categories = [];
		foreach ( $listing->get_categories() as $term ) {
			$categories[] = [
				'id'   => $term->term_id,
				'name' => $term->name,
				'slug' => $term->slug,
			];
		}

		// Locations.
		$locations = [];
		$raw_locations = $listing->get_locations();
		if ( ! empty( $raw_locations ) && ! is_wp_error( $raw_locations ) ) {
			foreach ( $raw_locations as $term ) {
				$locations[] = [
					'id'   => $term->term_id,
					'name' => $term->name,
					'slug' => $term->slug,
				];
			}
		}

		// Tags.
		$tags      = [];
		$raw_tags  = get_the_terms( $id, rtcl()->tag );
		if ( ! empty( $raw_tags ) && ! is_wp_error( $raw_tags ) ) {
			foreach ( $raw_tags as $term ) {
				$tags[] = [
					'id'   => $term->term_id,
					'name' => $term->name,
					'slug' => $term->slug,
				];
			}
		}

		// Images.
		$images     = [];
		$raw_images = $listing->get_images();
		if ( ! empty( $raw_images ) ) {
			foreach ( $raw_images as $img ) {
				$url = wp_get_attachment_url( $img->ID );
				if ( $url ) {
					$images[] = [
						'id'  => $img->ID,
						'url' => $url,
					];
				}
			}
		}

		// Contact info.
		$contact = [
			'email'          => get_post_meta( $id, 'email', true ) ?: null,
			'phone'          => get_post_meta( $id, 'phone', true ) ?: null,
			'whatsapp'       => get_post_meta( $id, '_rtcl_whatsapp_number', true ) ?: null,
			'website'        => get_post_meta( $id, 'website', true ) ?: null,
			'address'        => get_post_meta( $id, 'address', true ) ?: null,
			'zipcode'        => get_post_meta( $id, 'zipcode', true ) ?: null,
			'contact_person' => get_post_meta( $id, '_rtcl_contact_person', true ) ?: null,
		];

		// Video URLs.
		$video_urls     = null;
		$raw_video_urls = get_post_meta( $id, '_rtcl_video_urls', true );
		if ( ! empty( $raw_video_urls ) && is_array( $raw_video_urls ) ) {
			$video_urls = $raw_video_urls;
		}

		// Geo location.
		$geo_location = null;
		$latitude  = get_post_meta( $id, '_rtcl_latitude', true );
		$longitude = get_post_meta( $id, '_rtcl_longitude', true );
		if ( '' !== $latitude && '' !== $longitude ) {
			$geo_location = [
				'latitude'  => (float) $latitude,
				'longitude' => (float) $longitude,
				'address'   => get_post_meta( $id, '_rtcl_geo_address', true ) ?: null,
			];
		}

		// Business hours.
		$business_hours = null;
		$raw_bhs        = get_post_meta( $id, '_rtcl_bhs', true );
		if ( ! empty( $raw_bhs ) && is_array( $raw_bhs ) ) {
			$business_hours = $raw_bhs;
		}

		// Social profiles.
		$social_profiles = null;
		$raw_social      = get_post_meta( $id, '_rtcl_social_profiles', true );
		if ( ! empty( $raw_social ) && is_array( $raw_social ) ) {
			$social_profiles = $raw_social;
		}

		// Custom fields.
		$custom_fields = $this->getCustomFields( $listing );

		$data = [
			'id'              => $id,
			'title'           => $listing->get_the_title(),
			'description'     => ( $listing->get_listing() && isset( $listing->get_listing()->post_content ) ) ? $listing->get_listing()->post_content : '',
			'status'          => $listing->get_status(),
			'ad_type'         => $listing->get_ad_type(),
			'price'           => $listing->get_price() !== '' ? (float) $listing->get_price() : null,
			'max_price'       => $listing->get_max_price() !== '' ? (float) $listing->get_max_price() : null,
			'price_type'      => $listing->get_price_type(),
			'pricing_type'    => $listing->get_pricing_type(),
			'featured'        => $listing->is_featured(),
			'sold'            => null, // Filled by add-ons that own the sold flag (rtcl_mcp_listing_data).
			'categories'      => $categories,
			'locations'       => $locations,
			'tags'            => $tags,
			'images'          => $images,
			'video_urls'      => $video_urls,
			'geo_location'    => $geo_location,
			'contact'         => $contact,
			'business_hours'  => $business_hours,
			'social_profiles' => $social_profiles,
			'custom_fields'   => $custom_fields,
			'views'           => $listing->get_view_counts(),
			'author'          => [
				'id'   => $listing->get_owner_id(),
				'name' => $listing->get_owner_name(),
			],
			'url'             => get_permalink( $id ),
			'created_at'      => get_the_date( 'c', $id ),
			'updated_at'      => get_the_modified_date( 'c', $id ),
		];

		return apply_filters( 'rtcl_mcp_listing_data', $data, $listing );
	}

	/**
	 * Get custom field values for a listing.
	 *
	 * @param Listing $listing Listing model.
	 * @return array
	 */
	private function getCustomFields( Listing $listing ) {
		$fields = [];
		$cat_id = $listing->get_last_child_category_id();

		if ( ! $cat_id ) {
			return $fields;
		}

		$custom_field_ids = Functions::get_custom_field_ids( $cat_id );
		if ( empty( $custom_field_ids ) ) {
			return $fields;
		}

		foreach ( $custom_field_ids as $field_id ) {
			$cf_data = Functions::get_cf_data( $field_id, $listing->get_id(), [ 'formatted_value' => true ] );
			if ( $cf_data && '' !== $cf_data['value'] ) {
				$fields[] = [
					'label' => $cf_data['label'],
					'type'  => $cf_data['type'],
					'value' => $cf_data['value'],
				];
			}
		}

		return $fields;
	}

	/**
	 * Update listing meta fields from data array.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $data       Input data.
	 */
	private function updateListingMeta( $listing_id, $data ) {
		// Form association - explicit form_id, form_slug, or auto-detect from category.
		$this->updateFormAssociation( $listing_id, $data );

		// Price.
		if ( isset( $data['price'] ) ) {
			update_post_meta( $listing_id, 'price', (float) $data['price'] );
		}

		// Price type.
		if ( isset( $data['price_type'] ) ) {
			$allowed_price_types = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$pt = sanitize_key( $data['price_type'] );
			if ( in_array( $pt, $allowed_price_types, true ) ) {
				update_post_meta( $listing_id, 'price_type', $pt );
			}
		}

		// Listing type (ad_type) — accept 'listing_type' input key, maps to 'ad_type' meta.
		if ( isset( $data['listing_type'] ) ) {
			$allowed_types = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$type          = sanitize_key( $data['listing_type'] );
			if ( in_array( $type, $allowed_types, true ) ) {
				update_post_meta( $listing_id, 'ad_type', $type );
			}
		}

		// Contact fields.
		$contact_map = [
			'email'    => 'email',
			'phone'    => 'phone',
			'whatsapp' => '_rtcl_whatsapp_number',
			'website'  => 'website',
			'address'  => 'address',
			'zipcode'  => 'zipcode',
		];

		foreach ( $contact_map as $input_key => $meta_key ) {
			if ( isset( $data[ $input_key ] ) ) {
				if ( 'website' === $input_key ) {
					$value = esc_url_raw( $data[ $input_key ] );
				} elseif ( 'email' === $input_key ) {
					$value = sanitize_email( $data[ $input_key ] );
				} else {
					$value = sanitize_text_field( $data[ $input_key ] );
				}
				update_post_meta( $listing_id, $meta_key, $value );
			}
		}

		// Custom fields — sanitized keys, no protected/internal listing meta.
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			foreach ( $data['custom_fields'] as $cf_key => $cf_value ) {
				$safe_key = sanitize_key( $cf_key );
				if ( ComplexFieldProcessor::isWritableCustomFieldKey( $safe_key ) ) {
					$safe_value = is_array( $cf_value ) ? array_map( 'sanitize_text_field', $cf_value ) : sanitize_text_field( $cf_value );
					update_post_meta( $listing_id, $safe_key, $safe_value );
				}
			}
		}

		// Complex preset fields (video_urls, geo_location, business_hours, social_profiles, contact_person).
		ComplexFieldProcessor::saveToPost( $listing_id, $data );
	}

	/**
	 * Update form association for a listing.
	 *
	 * Resolves form_id from:
	 * 1. Explicit form_id parameter
	 * 2. Explicit form_slug parameter
	 * 3. Auto-detection from category (if Form Builder enabled)
	 * 4. Default form (if Form Builder enabled)
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $data       Input data containing form_id, form_slug, or category.
	 */
	private function updateFormAssociation( $listing_id, $data ) {
		$form_id = 0;

		// 1. Explicit form_id
		if ( ! empty( $data['form_id'] ) ) {
			$form_id = absint( $data['form_id'] );
		}

		// 2. Explicit form_slug
		if ( ! $form_id && ! empty( $data['form_slug'] ) ) {
			$form_id = $this->resolveFormBySlug( $data['form_slug'] );
		}

		// 3. Auto-detect from category (if Form Builder enabled)
		if ( ! $form_id && $this->isFormBuilderEnabled() ) {
			// Get category from data or from existing listing
			$category_id = 0;
			if ( ! empty( $data['category_id'] ) ) {
				$category_id = is_array( $data['category_id'] )
					? absint( end( $data['category_id'] ) )
					: absint( $data['category_id'] );
			} else {
				// Check existing listing categories
				$categories = get_the_terms( $listing_id, rtcl()->category );
				if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
					// Get the deepest category (last in hierarchy)
					$category_id = $this->getDeepestCategoryId( $categories );
				}
			}

			if ( $category_id ) {
				$form_id = $this->getFormIdForCategory( $category_id );
			}
		}

		// 4. Default form (if Form Builder enabled and still no form)
		if ( ! $form_id && $this->isFormBuilderEnabled() ) {
			$form_id = $this->getDefaultFormId();
		}

		// Store form association
		if ( $form_id > 0 ) {
			update_post_meta( $listing_id, '_rtcl_form_id', $form_id );
		}
	}

	/**
	 * Resolve form ID from slug.
	 *
	 * @param string $slug Form slug.
	 * @return int Form ID or 0 if not found.
	 */
	private function resolveFormBySlug( $slug ) {
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
	 * Get form ID associated with a category.
	 *
	 * Checks the category and its parents for form association.
	 *
	 * @param int $category_id Category term ID.
	 * @return int Form ID or 0 if not found.
	 */
	private function getFormIdForCategory( $category_id ) {
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
	 * Get the deepest category ID from a list of terms.
	 *
	 * @param array $categories Array of term objects.
	 * @return int Deepest category ID.
	 */
	private function getDeepestCategoryId( $categories ) {
		$deepest_id = 0;
		$max_depth = -1;

		foreach ( $categories as $cat ) {
			$depth = 0;
			$parent = $cat->parent;
			while ( $parent > 0 ) {
				$depth++;
				$parent_term = get_term( $parent, rtcl()->category );
				$parent = ( $parent_term && ! is_wp_error( $parent_term ) ) ? $parent_term->parent : 0;
			}

			if ( $depth > $max_depth ) {
				$max_depth = $depth;
				$deepest_id = $cat->term_id;
			}
		}

		return $deepest_id ?: ( ! empty( $categories ) ? $categories[0]->term_id : 0 );
	}

	/**
	 * Get the default form ID.
	 *
	 * @return int Default form ID or 0 if not found.
	 */
	private function getDefaultFormId() {
		if ( ! class_exists( 'Rtcl\Models\Form\Form' ) ) {
			return 0;
		}

		$form = \Rtcl\Models\Form\Form::query()->where( 'default', 1 )->first();
		return $form ? $form->id : 0;
	}

	/**
	 * Check if Form Builder is enabled.
	 *
	 * @return bool
	 */
	private function isFormBuilderEnabled() {
		return class_exists( 'Rtcl\Models\Form\Form' ) &&
			   class_exists( 'Rtcl\Services\FormBuilder\FBHelper' ) &&
			   \Rtcl\Services\FormBuilder\FBHelper::isEnabled();
	}

	/**
	 * Set or update the featured image for a listing.
	 *
	 * Accepts three image formats:
	 * - URL: Downloads and processes the image from a remote URL
	 * - Attachment ID: Uses an existing WordPress media library attachment
	 * - Base64: Decodes and uploads base64 encoded image data
	 *
	 * Images are processed according to RTCL misc_media settings:
	 * - Maximum width: 1200px
	 * - Aspect ratio maintained based on gallery settings
	 * - RTCL-specific image sizes generated
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int          $listing_id Listing ID.
	 * @param string|int   $image      Image URL, attachment ID, or base64 encoded data.
	 * @return array|\WP_Error
	 */
	public function setFeaturedImage( $listing_id, $image ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to set featured image.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$old_thumbnail_id = get_post_thumbnail_id( $listing_id );
		$old_thumbnail_url = $old_thumbnail_id ? wp_get_attachment_url( $old_thumbnail_id ) : null;

		// Use ImageHelper to process the image (handles URL, attachment ID, or base64)
		$attachment_id = ImageHelper::processImageInput( $image, $listing_id );

		if ( is_wp_error( $attachment_id ) ) {
			return $attachment_id;
		}

		// Ensure attachment is attached to the listing (required by RTCL) (never re-parents media owned by another post)
		ImageHelper::attachToListing( (int) $attachment_id, (int) $listing_id );

		// Set as featured image (WordPress standard)
		$result = set_post_thumbnail( $listing_id, $attachment_id );
		if ( ! $result ) {
			return new \WP_Error(
				'set_thumbnail_failed',
				__( 'Failed to set featured image.', 'classified-listing' )
			);
		}

		// Also add to RTCL gallery if not already present
		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		if ( ! is_array( $gallery_images ) ) {
			$gallery_images = [];
		}
		if ( ! in_array( $attachment_id, $gallery_images, true ) ) {
			array_unshift( $gallery_images, $attachment_id ); // Add to beginning
			update_post_meta( $listing_id, '_rtcl_images', $gallery_images );
		}

		// Update RTCL attachments order meta
		update_post_meta( $listing_id, '_rtcl_attachments_order', $gallery_images );

		$new_thumbnail_url = wp_get_attachment_url( $attachment_id );

		// Get image dimensions for response
		$meta = wp_get_attachment_metadata( $attachment_id );
		$dimensions = null;
		if ( $meta && isset( $meta['width'], $meta['height'] ) ) {
			$dimensions = [
				'width'  => $meta['width'],
				'height' => $meta['height'],
			];
		}

		return [
			'listing_id'        => $listing_id,
			'attachment_id'     => $attachment_id,
			'url'               => $new_thumbnail_url,
			'dimensions'        => $dimensions,
			'old_attachment_id' => $old_thumbnail_id ?: null,
			'old_url'           => $old_thumbnail_url ?: null,
			'message'           => __( 'Featured image updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Delete a listing.
	 *
	 * @param int  $listing_id   Listing ID.
	 * Requires manage_options (admin) capability.
	 *
	 * @param bool $force_delete Whether to bypass trash and permanently delete. Default: false.
	 * @return array|\WP_Error
	 */
	public function deleteListing( $listing_id, $force_delete = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete listings.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$title = $post->post_title;

		// Get associated images before deletion
		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		$featured_image_id = get_post_thumbnail_id( $listing_id );

		// Fire RTCL hook before deletion
		do_action( 'rtcl_before_delete_listing', $listing_id );

		// Delete the listing
		$result = wp_delete_post( $listing_id, $force_delete );

		if ( ! $result ) {
			return new \WP_Error( 'delete_failed', __( 'Failed to delete listing.', 'classified-listing' ) );
		}

		// Fire RTCL hook after deletion
		do_action( 'rtcl_after_delete_listing', $listing_id );

		$response = [
			'listing_id'   => $listing_id,
			'title'        => $title,
			'force_delete' => $force_delete,
			'message'      => $force_delete
				? __( 'Listing permanently deleted.', 'classified-listing' )
				: __( 'Listing moved to trash.', 'classified-listing' ),
		];

		// Include info about orphaned attachments
		$orphaned_images = [];
		if ( $featured_image_id ) {
			$orphaned_images[] = $featured_image_id;
		}
		if ( is_array( $gallery_images ) ) {
			$orphaned_images = array_merge( $orphaned_images, $gallery_images );
		}
		$orphaned_images = array_unique( array_filter( $orphaned_images ) );

		if ( ! empty( $orphaned_images ) ) {
			$response['orphaned_attachment_ids'] = array_values( $orphaned_images );
			$response['note'] = __( 'Gallery images were not deleted. Use delete_attachments option to remove them.', 'classified-listing' );
		}

		return $response;
	}

	/**
	 * Add images to a listing gallery.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $images     Array of image URLs, paths, base64 data, or attachment IDs.
	 * @param array $options    Options: set_featured (bool), position (string: 'start'|'end').
	 * @return array|\WP_Error
	 */
	public function addGalleryImages( $listing_id, $images, $options = [] ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to add gallery images.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		if ( empty( $images ) || ! is_array( $images ) ) {
			return new \WP_Error( 'invalid_images', __( 'Images array is required.', 'classified-listing' ) );
		}

		$set_featured = ! empty( $options['set_featured'] );
		$position = isset( $options['position'] ) ? sanitize_key( $options['position'] ) : 'end';

		// Get existing gallery
		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		if ( ! is_array( $gallery_images ) ) {
			$gallery_images = [];
		}

		$added = [];
		$failed = [];

		foreach ( ImageHelper::limitImages( $images ) as $index => $image ) {
			$attachment_id = ImageHelper::processImageInput( $image, $listing_id );

			if ( is_wp_error( $attachment_id ) ) {
				$failed[] = [
					'index'   => $index,
					'input'   => is_string( $image ) ? substr( $image, 0, 100 ) : $image,
					'error'   => $attachment_id->get_error_message(),
				];
				continue;
			}

			// Ensure attachment is attached to the listing (never re-parents media owned by another post)
			ImageHelper::attachToListing( (int) $attachment_id, (int) $listing_id );

			// Add to appropriate position in gallery
			if ( ! in_array( $attachment_id, $gallery_images, true ) ) {
				if ( 'start' === $position ) {
					array_unshift( $gallery_images, $attachment_id );
				} else {
					$gallery_images[] = $attachment_id;
				}
			}

			// Get image info for response
			$url = wp_get_attachment_url( $attachment_id );
			$meta = wp_get_attachment_metadata( $attachment_id );

			$added[] = [
				'attachment_id' => $attachment_id,
				'url'           => $url,
				'dimensions'    => [
					'width'  => $meta['width'] ?? 0,
					'height' => $meta['height'] ?? 0,
				],
			];

			// Set first successful as featured if requested
			if ( $set_featured && count( $added ) === 1 ) {
				set_post_thumbnail( $listing_id, $attachment_id );
			}
		}

		// Update gallery meta
		update_post_meta( $listing_id, '_rtcl_images', $gallery_images );
		update_post_meta( $listing_id, '_rtcl_attachments_order', $gallery_images );

		$response = [
			'listing_id'   => $listing_id,
			'added_count'  => count( $added ),
			'failed_count' => count( $failed ),
			'total_images' => count( $gallery_images ),
			'added'        => $added,
			'message'      => sprintf(
				__( 'Added %d images to gallery.', 'classified-listing' ),
				count( $added )
			),
		];

		if ( ! empty( $failed ) ) {
			$response['failed'] = $failed;
		}

		if ( $set_featured && ! empty( $added ) ) {
			$response['featured_image_id'] = $added[0]['attachment_id'];
		}

		return $response;
	}

	/**
	 * Update listing taxonomies from data array.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $data       Input data.
	 */
	private function updateListingTaxonomies( $listing_id, $data ) {
		// Category.
		if ( isset( $data['category_id'] ) ) {
			$cat_ids = is_array( $data['category_id'] ) ? array_map( 'absint', $data['category_id'] ) : [ absint( $data['category_id'] ) ];
			wp_set_object_terms( $listing_id, $cat_ids, rtcl()->category );
		}

		// Location.
		if ( isset( $data['location_id'] ) && taxonomy_exists( rtcl()->location ) ) {
			$loc_ids = is_array( $data['location_id'] ) ? array_map( 'absint', $data['location_id'] ) : [ absint( $data['location_id'] ) ];
			wp_set_object_terms( $listing_id, $loc_ids, rtcl()->location );
		}

		// Tags.
		if ( isset( $data['tags'] ) ) {
			$tag_names = is_array( $data['tags'] ) ? array_map( 'sanitize_text_field', $data['tags'] ) : explode( ',', sanitize_text_field( $data['tags'] ) );
			$tag_names = array_map( 'trim', $tag_names );
			$tag_names = array_filter( $tag_names );
			wp_set_object_terms( $listing_id, $tag_names, rtcl()->tag );
		}
	}

	/**
	 * Delete specific images from listing gallery.
	 *
	 * @param int   $listing_id     Listing ID.
	 * @param array $attachment_ids Attachment IDs to remove.
	 * @param bool  $delete_files   Also delete the attachment files. Default: false.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function deleteGalleryImages( $listing_id, $attachment_ids, $delete_files = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete gallery images.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		if ( empty( $attachment_ids ) || ! is_array( $attachment_ids ) ) {
			return new \WP_Error( 'invalid_ids', __( 'Attachment IDs array is required.', 'classified-listing' ) );
		}

		$attachment_ids = array_map( 'absint', $attachment_ids );

		// Get existing gallery
		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		if ( ! is_array( $gallery_images ) ) {
			$gallery_images = [];
		}

		$removed = [];
		$not_found = [];
		$featured_id = get_post_thumbnail_id( $listing_id );
		$featured_removed = false;

		foreach ( $attachment_ids as $att_id ) {
			$key = array_search( $att_id, $gallery_images, true );
			if ( false !== $key ) {
				unset( $gallery_images[ $key ] );
				$removed[] = $att_id;

				// Check if this was the featured image
				if ( (int) $featured_id === $att_id ) {
					delete_post_thumbnail( $listing_id );
					$featured_removed = true;
				}

				// Delete attachment file if requested
				if ( $delete_files ) {
					ImageHelper::deleteListingAttachment( (int) $att_id, (int) $listing_id );
				}
			} else {
				$not_found[] = $att_id;
			}
		}

		// Re-index array and update
		$gallery_images = array_values( $gallery_images );
		update_post_meta( $listing_id, '_rtcl_images', $gallery_images );
		update_post_meta( $listing_id, '_rtcl_attachments_order', $gallery_images );

		$response = [
			'listing_id'       => $listing_id,
			'removed_count'    => count( $removed ),
			'removed_ids'      => $removed,
			'remaining_count'  => count( $gallery_images ),
			'files_deleted'    => $delete_files,
			'featured_removed' => $featured_removed,
			'message'          => sprintf(
				__( 'Removed %d images from gallery.', 'classified-listing' ),
				count( $removed )
			),
		];

		if ( ! empty( $not_found ) ) {
			$response['not_found'] = $not_found;
		}

		return $response;
	}

	/**
	 * Clear all gallery images from a listing.
	 *
	 * @param int  $listing_id   Listing ID.
	 * @param bool $delete_files Also delete the attachment files. Default: false.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function clearGalleryImages( $listing_id, $delete_files = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to clear gallery images.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		// Get existing gallery
		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		if ( ! is_array( $gallery_images ) ) {
			$gallery_images = [];
		}

		$removed_count = count( $gallery_images );

		// Delete attachment files if requested
		if ( $delete_files && ! empty( $gallery_images ) ) {
			foreach ( $gallery_images as $att_id ) {
				ImageHelper::deleteListingAttachment( (int) $att_id, (int) $listing_id );
			}
		}

		// Clear gallery
		update_post_meta( $listing_id, '_rtcl_images', [] );
		update_post_meta( $listing_id, '_rtcl_attachments_order', [] );

		// Also remove featured image
		delete_post_thumbnail( $listing_id );

		return [
			'listing_id'      => $listing_id,
			'removed_count'   => $removed_count,
			'files_deleted'   => $delete_files,
			'message'         => sprintf(
				__( 'Cleared %d images from gallery.', 'classified-listing' ),
				$removed_count
			),
		];
	}

	/**
	 * Remove featured image from a listing.
	 *
	 * @param int  $listing_id   Listing ID.
	 * @param bool $delete_file  Also delete the attachment file. Default: false.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function removeFeaturedImage( $listing_id, $delete_file = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to remove featured image.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$featured_id = get_post_thumbnail_id( $listing_id );

		if ( ! $featured_id ) {
			return new \WP_Error( 'no_featured_image', __( 'Listing has no featured image.', 'classified-listing' ) );
		}

		$url = wp_get_attachment_url( $featured_id );

		// Remove featured image
		delete_post_thumbnail( $listing_id );

		// Delete file if requested
		if ( $delete_file ) {
			ImageHelper::deleteListingAttachment( (int) $featured_id, (int) $listing_id );
		}

		return [
			'listing_id'       => $listing_id,
			'removed_id'       => $featured_id,
			'removed_url'      => $url,
			'file_deleted'     => $delete_file,
			'message'          => __( 'Featured image removed successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Get gallery images for a listing.
	 *
	 * @param int $listing_id Listing ID.
	 *
	 * @return array|\WP_Error Gallery images or error.
	 */
	public function getGalleryImages( $listing_id ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required.', 'classified-listing' ) );
		}

		$post = get_post( absint( $listing_id ) );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
		}

		$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
		if ( ! is_array( $gallery_images ) ) {
			$gallery_images = [];
		}

		$featured_id = get_post_thumbnail_id( $listing_id );

		$images = [];
		foreach ( $gallery_images as $att_id ) {
			$url = wp_get_attachment_url( $att_id );
			$meta = wp_get_attachment_metadata( $att_id );

			$images[] = [
				'attachment_id' => $att_id,
				'url'           => $url,
				'is_featured'   => (int) $featured_id === (int) $att_id,
				'dimensions'    => [
					'width'  => $meta['width'] ?? 0,
					'height' => $meta['height'] ?? 0,
				],
			];
		}

		return [
			'listing_id'      => $listing_id,
			'featured_id'     => $featured_id ? (int) $featured_id : null,
			'featured_url'    => $featured_id ? ( wp_get_attachment_url( $featured_id ) ?: null ) : null,
			'total_images'    => count( $images ),
			'images'          => $images,
		];
	}
}
