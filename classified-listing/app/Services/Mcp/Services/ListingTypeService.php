<?php
/**
 * Listing Type Service - CRUD operations for listing types.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Helpers\Functions;
use Rtcl\Resources\Options;

/**
 * Service for managing listing types (ad types).
 */
class ListingTypeService {

	/**
	 * Option key for listing types.
	 */
	const OPTION_KEY = 'rtcl_listing_types';

	/**
	 * Get all listing types.
	 *
	 * @return array Listing types with slugs and labels.
	 */
	public function listTypes(): array {
		$types = get_option( self::OPTION_KEY, [] );

		// If empty, use defaults
		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		$result = [];
		foreach ( $types as $slug => $label ) {
			$result[] = [
				'slug'       => $slug,
				'label'      => $label,
				'is_default' => array_key_exists( $slug, Options::get_default_listing_types() ),
			];
		}

		return [
			'types' => $result,
			'total' => count( $result ),
		];
	}

	/**
	 * Get a single listing type.
	 *
	 * @param string $slug Type slug.
	 *
	 * @return array|\WP_Error Type data or error.
	 */
	public function getType( string $slug ) {
		$types = get_option( self::OPTION_KEY, [] );

		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		if ( ! isset( $types[ $slug ] ) ) {
			return new \WP_Error(
				'type_not_found',
				sprintf(
					/* translators: %s: type slug */
					__( 'Listing type "%s" not found.', 'classified-listing' ),
					$slug
				)
			);
		}

		return [
			'slug'       => $slug,
			'label'      => $types[ $slug ],
			'is_default' => array_key_exists( $slug, Options::get_default_listing_types() ),
		];
	}

	/**
	 * Create a new listing type.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string $slug  Type slug (unique identifier).
	 * @param string $label Display label.
	 *
	 * @return array|\WP_Error Created type or error.
	 */
	public function createType( string $slug, string $label ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to create listing types.', 'classified-listing' ) );
		}

		$slug = sanitize_key( $slug );
		$label = sanitize_text_field( $label );

		if ( empty( $slug ) ) {
			return new \WP_Error(
				'invalid_slug',
				__( 'Type slug is required and must contain only lowercase letters, numbers, and underscores.', 'classified-listing' )
			);
		}

		if ( empty( $label ) ) {
			return new \WP_Error(
				'invalid_label',
				__( 'Type label is required.', 'classified-listing' )
			);
		}

		$types = get_option( self::OPTION_KEY, [] );

		// Initialize with defaults if empty
		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		if ( isset( $types[ $slug ] ) ) {
			return new \WP_Error(
				'type_exists',
				sprintf(
					/* translators: %s: type slug */
					__( 'Listing type "%s" already exists.', 'classified-listing' ),
					$slug
				)
			);
		}

		$types[ $slug ] = $label;
		update_option( self::OPTION_KEY, $types );

		// Clear any caches
		wp_cache_delete( 'rtcl_listing_types', 'rtcl' );

		return [
			'success' => true,
			'slug'    => $slug,
			'label'   => $label,
			'message' => sprintf(
				/* translators: %s: type label */
				__( 'Listing type "%s" created successfully.', 'classified-listing' ),
				$label
			),
		];
	}

	/**
	 * Update an existing listing type.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string $slug     Current type slug.
	 * @param array  $data     Update data (label, new_slug).
	 *
	 * @return array|\WP_Error Updated type or error.
	 */
	public function updateType( string $slug, array $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update listing types.', 'classified-listing' ) );
		}

		$types = get_option( self::OPTION_KEY, [] );

		// Initialize with defaults if empty
		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		if ( ! isset( $types[ $slug ] ) ) {
			return new \WP_Error(
				'type_not_found',
				sprintf(
					/* translators: %s: type slug */
					__( 'Listing type "%s" not found.', 'classified-listing' ),
					$slug
				)
			);
		}

		$changes = [];

		// Update label
		if ( isset( $data['label'] ) ) {
			$new_label = sanitize_text_field( $data['label'] );
			if ( ! empty( $new_label ) && $types[ $slug ] !== $new_label ) {
				$types[ $slug ] = $new_label;
				$changes[] = 'label';
			}
		}

		// Change slug (rename)
		if ( isset( $data['new_slug'] ) ) {
			$new_slug = sanitize_key( $data['new_slug'] );
			if ( ! empty( $new_slug ) && $new_slug !== $slug ) {
				if ( isset( $types[ $new_slug ] ) ) {
					return new \WP_Error(
						'slug_exists',
						sprintf(
							/* translators: %s: type slug */
							__( 'Listing type slug "%s" already exists.', 'classified-listing' ),
							$new_slug
						)
					);
				}

				// Preserve order by rebuilding array
				$new_types = [];
				foreach ( $types as $key => $value ) {
					if ( $key === $slug ) {
						$new_types[ $new_slug ] = $value;
					} else {
						$new_types[ $key ] = $value;
					}
				}
				$types = $new_types;
				$changes[] = 'slug';

				// Update listings with old slug to new slug
				$this->updateListingsType( $slug, $new_slug );

				$slug = $new_slug;
			}
		}

		if ( empty( $changes ) ) {
			return [
				'success' => true,
				'slug'    => $slug,
				'label'   => $types[ $slug ],
				'message' => __( 'No changes made.', 'classified-listing' ),
			];
		}

		update_option( self::OPTION_KEY, $types );

		// Clear caches
		wp_cache_delete( 'rtcl_listing_types', 'rtcl' );

		return [
			'success' => true,
			'slug'    => $slug,
			'label'   => $types[ $slug ],
			'changes' => $changes,
			'message' => sprintf(
				/* translators: %s: type label */
				__( 'Listing type "%s" updated successfully.', 'classified-listing' ),
				$types[ $slug ]
			),
		];
	}

	/**
	 * Delete a listing type.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param string $slug        Type slug to delete.
	 * @param string $migrate_to  Optional. Migrate listings to this type.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function deleteType( string $slug, string $migrate_to = '' ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete listing types.', 'classified-listing' ) );
		}

		$types = get_option( self::OPTION_KEY, [] );

		// Initialize with defaults if empty
		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		if ( ! isset( $types[ $slug ] ) ) {
			return new \WP_Error(
				'type_not_found',
				sprintf(
					/* translators: %s: type slug */
					__( 'Listing type "%s" not found.', 'classified-listing' ),
					$slug
				)
			);
		}

		// Check if it's the last type
		if ( count( $types ) <= 1 ) {
			return new \WP_Error(
				'cannot_delete_last',
				__( 'Cannot delete the last listing type. At least one type must exist.', 'classified-listing' )
			);
		}

		// Count listings using this type
		$listing_count = $this->countListingsByType( $slug );
		$deleted_label = $types[ $slug ];

		// Migrate listings if needed
		if ( $listing_count > 0 ) {
			if ( empty( $migrate_to ) ) {
				// Default to first available type
				$available_types = array_keys( $types );
				$migrate_to = $available_types[0] === $slug ? $available_types[1] : $available_types[0];
			}

			if ( ! isset( $types[ $migrate_to ] ) ) {
				return new \WP_Error(
					'invalid_migration_target',
					sprintf(
						/* translators: %s: type slug */
						__( 'Migration target type "%s" does not exist.', 'classified-listing' ),
						$migrate_to
					)
				);
			}

			$this->updateListingsType( $slug, $migrate_to );
		}

		// Remove the type
		unset( $types[ $slug ] );
		update_option( self::OPTION_KEY, $types );

		// Clear caches
		wp_cache_delete( 'rtcl_listing_types', 'rtcl' );

		$result = [
			'success' => true,
			'deleted' => [
				'slug'  => $slug,
				'label' => $deleted_label,
			],
			'message' => sprintf(
				/* translators: %s: type label */
				__( 'Listing type "%s" deleted successfully.', 'classified-listing' ),
				$deleted_label
			),
		];

		if ( $listing_count > 0 ) {
			$result['migrated'] = [
				'count'   => $listing_count,
				'to_type' => $migrate_to,
			];
			$result['message'] .= ' ' . sprintf(
				/* translators: %1$d: count, %2$s: target type */
				__( '%1$d listings migrated to "%2$s".', 'classified-listing' ),
				$listing_count,
				$types[ $migrate_to ] ?? $migrate_to
			);
		}

		return $result;
	}

	/**
	 * Count listings by type.
	 *
	 * @param string $type_slug Type slug.
	 *
	 * @return int Listing count.
	 */
	public function countListingsByType( string $type_slug ): int {
		global $wpdb;

		$post_type = rtcl()->post_type;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
		$count = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(DISTINCT p.ID) FROM {$wpdb->posts} p
				INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
				WHERE p.post_type = %s
				AND pm.meta_key = 'ad_type'
				AND pm.meta_value = %s",
				$post_type,
				$type_slug
			)
		);

		return absint( $count );
	}

	/**
	 * Update listings from one type to another.
	 *
	 * @param string $from_type Current type slug.
	 * @param string $to_type   New type slug.
	 *
	 * @return int Number of updated listings.
	 */
	private function updateListingsType( string $from_type, string $to_type ): int {
		global $wpdb;

		$post_type = rtcl()->post_type;

		// Get all listing IDs with the old type
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery
		$listing_ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT DISTINCT p.ID FROM {$wpdb->posts} p
				INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
				WHERE p.post_type = %s
				AND pm.meta_key = 'ad_type'
				AND pm.meta_value = %s",
				$post_type,
				$from_type
			)
		);

		if ( empty( $listing_ids ) ) {
			return 0;
		}

		$count = 0;
		foreach ( $listing_ids as $listing_id ) {
			update_post_meta( $listing_id, 'ad_type', $to_type );
			$count++;
		}

		return $count;
	}

	/**
	 * Get listing type statistics.
	 *
	 * @return array Statistics for each type.
	 */
	public function getTypeStatistics(): array {
		$types = get_option( self::OPTION_KEY, [] );

		if ( empty( $types ) ) {
			$types = Options::get_default_listing_types();
		}

		$stats = [];
		foreach ( $types as $slug => $label ) {
			$stats[] = [
				'slug'          => $slug,
				'label'         => $label,
				'listing_count' => $this->countListingsByType( $slug ),
			];
		}

		return [
			'types'       => $stats,
			'total_types' => count( $stats ),
		];
	}
}
