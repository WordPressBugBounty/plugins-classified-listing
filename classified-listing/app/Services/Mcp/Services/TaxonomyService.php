<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Helpers\Functions;
use Rtcl\Services\Mcp\Helpers\ImageHelper;

defined( 'ABSPATH' ) || exit;

class TaxonomyService {

	/**
	 * Sanitize an icon class string (e.g. "fas fa-car"). Front-end templates print it inside a
	 * class attribute, so only class-name characters are kept.
	 *
	 * @param mixed $icon Raw icon class.
	 *
	 * @return string
	 */
	public static function sanitizeIconClass( $icon ): string {
		return trim( preg_replace( '/\s+/', ' ', preg_replace( '/[^A-Za-z0-9 _-]/', '', (string) $icon ) ) );
	}

	/**
	 * Get terms for a given taxonomy.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param array  $params   Query parameters.
	 * @return array{total: int, terms: array}
	 */
	public function getTerms( $taxonomy, $params = [] ) {
		$per_page = min( 100, max( 1, isset( $params['per_page'] ) ? absint( $params['per_page'] ) : 50 ) );
		$page = max( 1, isset( $params['page'] ) ? absint( $params['page'] ) : 1 );

		$args = [
			'taxonomy'   => $taxonomy,
			'hide_empty' => false,
			'number'     => $per_page,
			'offset'     => ( $page - 1 ) * $per_page,
			'orderby'    => 'meta_value_num',
			'meta_key'   => '_rtcl_order',
			'order'      => 'ASC',
		];

		// Parent filter.
		if ( isset( $params['parent'] ) ) {
			$args['parent'] = absint( $params['parent'] );
		}

		// Search.
		if ( ! empty( $params['search'] ) ) {
			$args['search'] = sanitize_text_field( $params['search'] );
		}

		// Include children recursively
		if ( ! empty( $params['include_children'] ) && isset( $params['parent'] ) ) {
			$args['child_of'] = absint( $params['parent'] );
			unset( $args['parent'] );
		}

		// Get terms.
		$terms = get_terms( $args );

		if ( is_wp_error( $terms ) ) {
			return [
				'total' => 0,
				'terms' => [],
			];
		}

		// Total count (without pagination).
		$count_args = $args;
		unset( $count_args['number'], $count_args['offset'] );
		$count_args['count'] = true;
		$total = (int) get_terms( $count_args );

		$formatted = [];
		foreach ( $terms as $term ) {
			$formatted[] = $this->formatTerm( $term, $taxonomy );
		}

		return [
			'total' => $total,
			'terms' => $formatted,
		];
	}

	/**
	 * Create a new term using core's create_term function.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * Leverages ListingTrait::create_term() for proper duplicate checking
	 * and meta field handling.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param array  $data     Term data.
	 * @return array|\WP_Error
	 */
	public function createTerm( $taxonomy, $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to create terms.', 'classified-listing' ) );
		}

		// Build the data array for core's create_term
		$term_data = [
			'name'        => sanitize_text_field( $data['name'] ?? '' ),
			'slug'        => ! empty( $data['slug'] ) ? sanitize_title( $data['slug'] ) : '',
			'parent'      => absint( $data['parent'] ?? 0 ),
			'description' => sanitize_textarea_field( $data['description'] ?? '' ),
			'order'       => absint( $data['order'] ?? 0 ),
			'meta'        => [],
		];

		// Build meta array based on taxonomy type
		if ( rtcl()->category === $taxonomy ) {
			// Category-specific meta
			if ( ! empty( $data['icon'] ) ) {
				$term_data['meta']['_rtcl_icon'] = self::sanitizeIconClass( $data['icon'] );
			}
			if ( ! empty( $data['image_id'] ) ) {
				$term_data['meta']['_rtcl_image'] = absint( $data['image_id'] );
			}
			if ( ! empty( $data['types'] ) && is_array( $data['types'] ) ) {
				// Validate against allowed types
				$allowed_types = array_keys( Functions::get_listing_types() );
				$types = array_filter( $data['types'], function( $type ) use ( $allowed_types ) {
					return in_array( $type, $allowed_types, true );
				} );
				if ( ! empty( $types ) ) {
					$term_data['meta']['_rtcl_types'] = $types;
				}
			}
			if ( ! empty( $data['price_units'] ) && is_array( $data['price_units'] ) ) {
				// Validate against allowed price units
				$allowed_units = array_keys( \Rtcl\Resources\Options::get_price_unit_list() );
				$units = array_filter( $data['price_units'], function( $unit ) use ( $allowed_units ) {
					return in_array( $unit, $allowed_units, true );
				} );
				if ( ! empty( $units ) ) {
					$term_data['meta']['_rtcl_price_units'] = $units;
				}
			}
		} elseif ( rtcl()->location === $taxonomy ) {
			// Location-specific meta
			if ( ! empty( $data['image_id'] ) ) {
				$term_data['meta']['_rtcl_image'] = absint( $data['image_id'] );
			}
		}

		/**
		 * Filter the term data before the term is created, so add-ons can store the term meta they own.
		 *
		 * @param array  $term_data Term data incl. `meta` (meta_key => value).
		 * @param string $taxonomy  Taxonomy slug.
		 * @param array  $data      Raw input data.
		 */
		$term_data = apply_filters( 'rtcl_mcp_create_term_data', $term_data, $taxonomy, $data );

		// Use core's create_term which handles duplicate checking
		$result = Functions::create_term( $taxonomy, $term_data );

		if ( ! $result['success'] ) {
			// Check if it's because term already exists
			if ( ! empty( $result['data'] ) && isset( $result['data']['term_id'] ) ) {
				// Term exists - return it with appropriate message
				$term = get_term( $result['data']['term_id'], $taxonomy );
				return [
					'term_id'  => $result['data']['term_id'],
					'name'     => $term->name,
					'slug'     => $term->slug,
					'parent'   => $term->parent,
					'exists'   => true,
					'message'  => $result['message'],
				];
			}
			return new \WP_Error( 'term_creation_failed', $result['message'] );
		}

		$term_id = $result['data']['term_id'];
		$term = get_term( $term_id, $taxonomy );

		return [
			'term_id' => $term_id,
			'name'    => $term->name,
			'slug'    => $term->slug,
			'parent'  => $term->parent,
			'exists'  => false,
			'message' => $result['message'],
		];
	}

	/**
	 * Find a term by various identifiers.
	 *
	 * @param string     $taxonomy   Taxonomy slug.
	 * @param int|string $identifier Term ID, slug, name, or path.
	 * @return \WP_Term|null
	 */
	public function findTerm( $taxonomy, $identifier ) {
		if ( empty( $identifier ) ) {
			return null;
		}

		// By ID
		if ( is_int( $identifier ) || ( is_string( $identifier ) && ctype_digit( $identifier ) ) ) {
			$term = get_term( (int) $identifier, $taxonomy );
			return ( $term && ! is_wp_error( $term ) ) ? $term : null;
		}

		// By slug
		$term = get_term_by( 'slug', sanitize_title( $identifier ), $taxonomy );
		if ( $term ) {
			return $term;
		}

		// By name
		$term = get_term_by( 'name', $identifier, $taxonomy );
		if ( $term ) {
			return $term;
		}

		return null;
	}

	/**
	 * Check if a term exists.
	 *
	 * @param string     $taxonomy   Taxonomy slug.
	 * @param int|string $identifier Term ID, slug, or name.
	 * @param int        $parent     Optional parent ID for scoped check.
	 * @return array|null Array with term_id and term_taxonomy_id, or null.
	 */
	public function termExists( $taxonomy, $identifier, $parent = 0 ) {
		$result = term_exists( $identifier, $taxonomy, $parent );
		return $result ?: null;
	}

	/**
	 * Create a term hierarchy from a path string.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param string $path     Path like "State > City > Neighborhood".
	 * @param array  $options  Options for each level (icon, image_id, etc.).
	 * @return array Array of created/found term IDs.
	 */
	public function createHierarchyFromPath( $taxonomy, $path, $options = [] ) {
		$segments = array_map( 'trim', explode( '>', $path ) );
		$segments = array_filter( $segments );

		if ( empty( $segments ) ) {
			return [];
		}

		$limit = apply_filters( 'rtcl_import_terms_hierarchy_limit', 3 );
		$parent = 0;
		$term_ids = [];

		foreach ( $segments as $index => $name ) {
			if ( $limit > 0 && $index >= $limit ) {
				break;
			}

			$level_options = $options[ $index ] ?? [];
			$level_options['name'] = $name;
			$level_options['parent'] = $parent;

			$result = $this->createTerm( $taxonomy, $level_options );

			if ( is_wp_error( $result ) ) {
				break;
			}

			$term_ids[] = $result['term_id'];
			$parent = $result['term_id'];
		}

		return $term_ids;
	}

	/**
	 * Get available listing types.
	 *
	 * @return array
	 */
	public function getListingTypes() {
		return Functions::get_listing_types();
	}

	/**
	 * Get available price units.
	 *
	 * @return array
	 */
	public function getPriceUnits() {
		return \Rtcl\Resources\Options::get_price_unit_list();
	}

	/**
	 * Get available icons.
	 *
	 * @return array
	 */
	public function getIcons() {
		return \Rtcl\Resources\Options::get_icon_list();
	}

	/**
	 * Set or update the image for a taxonomy term.
	 *
	 * Supports: URL, local file path, attachment ID, or base64 data.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string     $taxonomy Taxonomy slug.
	 * @param int        $term_id  Term ID.
	 * @param mixed      $image    Image URL, local path, attachment ID, or base64 data.
	 * @return array|\WP_Error Result array or error.
	 */
	public function setTermImage( $taxonomy, $term_id, $image ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to set term images.', 'classified-listing' ) );
		}

		$term = get_term( $term_id, $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			return new \WP_Error( 'term_not_found', __( 'Term not found.', 'classified-listing' ) );
		}

		// Check if this taxonomy supports images
		$supports_image = ( rtcl()->category === $taxonomy || rtcl()->location === $taxonomy );
		if ( ! $supports_image ) {
			return new \WP_Error( 'image_not_supported', __( 'This taxonomy does not support images.', 'classified-listing' ) );
		}

		// Get old image info
		$old_image_id = get_term_meta( $term_id, '_rtcl_image', true );
		$old_image_url = $old_image_id ? wp_get_attachment_url( $old_image_id ) : null;

		// Process the image input (max 450px for taxonomy images)
		$attachment_id = ImageHelper::processTaxonomyImage( $image, 0, $term->name );
		if ( is_wp_error( $attachment_id ) ) {
			return $attachment_id;
		}

		// Update the term meta
		update_term_meta( $term_id, '_rtcl_image', $attachment_id );

		// Get new image info
		$new_image_url = wp_get_attachment_url( $attachment_id );
		$image_metadata = wp_get_attachment_metadata( $attachment_id );
		$dimensions = [
			'width'  => $image_metadata['width'] ?? 0,
			'height' => $image_metadata['height'] ?? 0,
		];

		$result = [
			'term_id'       => $term_id,
			'taxonomy'      => $taxonomy,
			'name'          => $term->name,
			'slug'          => $term->slug,
			'attachment_id' => $attachment_id,
			'url'           => $new_image_url,
			'dimensions'    => $dimensions,
			'message'       => __( 'Image set successfully.', 'classified-listing' ),
		];

		if ( $old_image_id ) {
			$result['old_attachment_id'] = absint( $old_image_id );
			$result['old_url'] = $old_image_url;
		}

		return $result;
	}

	/**
	 * Update term meta/data.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param int    $term_id  Term ID.
	 * @param array  $data     Data to update.
	 * @return array|\WP_Error Result array or error.
	 */
	public function updateTerm( $taxonomy, $term_id, $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update terms.', 'classified-listing' ) );
		}

		$term = get_term( $term_id, $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			return new \WP_Error( 'term_not_found', __( 'Term not found.', 'classified-listing' ) );
		}

		$updates = [];

		// Update core term fields
		$term_args = [];
		if ( isset( $data['name'] ) ) {
			$term_args['name'] = sanitize_text_field( $data['name'] );
			$updates['name'] = $term_args['name'];
		}
		if ( isset( $data['slug'] ) ) {
			$term_args['slug'] = sanitize_title( $data['slug'] );
			$updates['slug'] = $term_args['slug'];
		}
		if ( isset( $data['description'] ) ) {
			$term_args['description'] = sanitize_textarea_field( $data['description'] );
			$updates['description'] = $term_args['description'];
		}
		if ( isset( $data['parent'] ) ) {
			$term_args['parent'] = absint( $data['parent'] );
			$updates['parent'] = $term_args['parent'];
		}

		if ( ! empty( $term_args ) ) {
			$result = wp_update_term( $term_id, $taxonomy, $term_args );
			if ( is_wp_error( $result ) ) {
				return $result;
			}
		}

		// Update order
		if ( isset( $data['order'] ) ) {
			update_term_meta( $term_id, '_rtcl_order', absint( $data['order'] ) );
			$updates['order'] = absint( $data['order'] );
		}

		// Category-specific meta
		if ( rtcl()->category === $taxonomy ) {
			if ( isset( $data['icon'] ) ) {
				$icon = self::sanitizeIconClass( $data['icon'] );
				update_term_meta( $term_id, '_rtcl_icon', $icon );
				$updates['icon'] = $icon;
			}
			if ( isset( $data['types'] ) && is_array( $data['types'] ) ) {
				$allowed_types = array_keys( Functions::get_listing_types() );
				$types = array_filter( $data['types'], function( $type ) use ( $allowed_types ) {
					return in_array( $type, $allowed_types, true );
				} );
				// Delete existing and add new
				delete_term_meta( $term_id, '_rtcl_types' );
				foreach ( $types as $type ) {
					add_term_meta( $term_id, '_rtcl_types', $type );
				}
				$updates['types'] = $types;
			}
			if ( isset( $data['price_units'] ) && is_array( $data['price_units'] ) ) {
				$allowed_units = array_keys( \Rtcl\Resources\Options::get_price_unit_list() );
				$units = array_filter( $data['price_units'], function( $unit ) use ( $allowed_units ) {
					return in_array( $unit, $allowed_units, true );
				} );
				// Delete existing and add new
				delete_term_meta( $term_id, '_rtcl_price_units' );
				foreach ( $units as $unit ) {
					add_term_meta( $term_id, '_rtcl_price_units', $unit );
				}
				$updates['price_units'] = $units;
			}
		}

		/**
		 * Filter the term updates, so add-ons can update the term meta they own.
		 *
		 * @param array  $updates  Applied updates keyed by field.
		 * @param string $taxonomy Taxonomy slug.
		 * @param int    $term_id  Term ID.
		 * @param array  $data     Raw input data.
		 */
		$updates = apply_filters( 'rtcl_mcp_update_term_meta', $updates, $taxonomy, $term_id, $data );

		// Handle image update
		if ( isset( $data['image'] ) && ! empty( $data['image'] ) ) {
			$image_result = $this->setTermImage( $taxonomy, $term_id, $data['image'] );
			if ( ! is_wp_error( $image_result ) ) {
				$updates['image_id'] = $image_result['attachment_id'];
				$updates['image_url'] = $image_result['url'];
			}
		} elseif ( isset( $data['image_id'] ) ) {
			// Direct attachment ID update
			update_term_meta( $term_id, '_rtcl_image', absint( $data['image_id'] ) );
			$updates['image_id'] = absint( $data['image_id'] );
		}

		// Refresh term data
		$term = get_term( $term_id, $taxonomy );

		return [
			'term_id' => $term_id,
			'name'    => $term->name,
			'slug'    => $term->slug,
			'parent'  => $term->parent,
			'updates' => $updates,
			'message' => __( 'Term updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Delete a taxonomy term.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string $taxonomy Taxonomy slug.
	 * @param int    $term_id  Term ID.
	 * @param array  $options  Options: reassign (int term_id to reassign posts to), force (bool).
	 * @return array|\WP_Error
	 */
	public function deleteTerm( $taxonomy, $term_id, $options = [] ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete terms.', 'classified-listing' ) );
		}

		$term = get_term( $term_id, $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			return new \WP_Error( 'term_not_found', __( 'Term not found.', 'classified-listing' ) );
		}

		// Check if term has listings
		$listing_count = $term->count;

		// Check if term has children
		$children = get_terms( [
			'taxonomy'   => $taxonomy,
			'parent'     => $term_id,
			'hide_empty' => false,
			'count'      => true,
		] );
		$has_children = ! is_wp_error( $children ) && count( $children ) > 0;

		// Safety checks
		$force = ! empty( $options['force'] );

		if ( ! $force && $listing_count > 0 ) {
			return new \WP_Error(
				'term_has_listings',
				sprintf(
					__( 'Term has %d listings. Use force=true to delete anyway, or reassign listings first.', 'classified-listing' ),
					$listing_count
				),
				[
					'term_id'       => $term_id,
					'listing_count' => $listing_count,
				]
			);
		}

		if ( ! $force && $has_children ) {
			return new \WP_Error(
				'term_has_children',
				sprintf(
					__( 'Term has %d child terms. Delete children first or use force=true.', 'classified-listing' ),
					count( $children )
				),
				[
					'term_id'      => $term_id,
					'child_count'  => count( $children ),
				]
			);
		}

		$term_name = $term->name;
		$term_slug = $term->slug;

		// Get image attachment ID before deletion
		$image_id = get_term_meta( $term_id, '_rtcl_image', true );

		// Delete the term
		$result = wp_delete_term( $term_id, $taxonomy );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		if ( false === $result ) {
			return new \WP_Error( 'delete_failed', __( 'Failed to delete term.', 'classified-listing' ) );
		}

		$response = [
			'term_id'  => $term_id,
			'name'     => $term_name,
			'slug'     => $term_slug,
			'taxonomy' => $taxonomy,
			'message'  => __( 'Term deleted successfully.', 'classified-listing' ),
		];

		if ( $image_id ) {
			$response['orphaned_image_id'] = absint( $image_id );
			$response['note'] = __( 'Term image was not deleted. Delete the attachment separately if needed.', 'classified-listing' );
		}

		if ( $listing_count > 0 ) {
			$response['affected_listings'] = $listing_count;
		}

		return $response;
	}

	/**
	 * Format a term object for MCP response.
	 *
	 * @param \WP_Term $term     Term object.
	 * @param string   $taxonomy Taxonomy slug.
	 * @return array
	 */
	private function formatTerm( $term, $taxonomy ) {
		$data = [
			'id'          => $term->term_id,
			'name'        => $term->name,
			'slug'        => $term->slug,
			'parent'      => $term->parent,
			'count'       => $term->count,
			'description' => $term->description,
		];

		// Get order
		$order = get_term_meta( $term->term_id, '_rtcl_order', true );
		if ( $order !== '' ) {
			$data['order'] = (int) $order;
		}

		// Category-specific meta
		if ( rtcl()->category === $taxonomy ) {
			$icon = get_term_meta( $term->term_id, '_rtcl_icon', true );
			if ( $icon ) {
				$data['icon'] = $icon;
			}

			$image = get_term_meta( $term->term_id, '_rtcl_image', true );
			if ( $image ) {
				$data['image_id'] = absint( $image );
				$data['image_url'] = wp_get_attachment_url( $image );
			}

			// Map icon
			$map_icon = get_term_meta( $term->term_id, '_rtcl_map_icon', true );
			if ( $map_icon ) {
				$data['map_icon_id'] = absint( $map_icon );
				$data['map_icon_url'] = wp_get_attachment_url( $map_icon );
			}

			// Get associated listing types
			$types = get_term_meta( $term->term_id, '_rtcl_types', true );
			if ( ! empty( $types ) ) {
				// Ensure it's a flat array of strings
				$data['types'] = is_array( $types ) ? array_values( array_map( 'strval', $types ) ) : [ (string) $types ];
			}

			// Get price units
			$price_units = get_term_meta( $term->term_id, '_rtcl_price_units', true );
			if ( ! empty( $price_units ) ) {
				// Ensure it's a flat array of strings
				$data['price_units'] = is_array( $price_units ) ? array_values( array_map( 'strval', $price_units ) ) : [ (string) $price_units ];
			}
		}

		// Location-specific meta
		if ( rtcl()->location === $taxonomy ) {
			$image = get_term_meta( $term->term_id, '_rtcl_image', true );
			if ( $image ) {
				$data['image_id'] = absint( $image );
				$data['image_url'] = wp_get_attachment_url( $image );
			}
		}

		return $data;
	}
}
