<?php

namespace Rtcl\Services\Mcp\Services\Import;

use Rtcl\Services\Mcp\ErrorCodes;

defined( 'ABSPATH' ) || exit;

/**
 * Resolves taxonomy terms (categories, locations) from various input formats.
 *
 * Supports:
 * - Integer ID (direct term lookup)
 * - Slug string
 * - Name string
 * - Hierarchical path string ("Parent > Child > Grandchild")
 */
class TaxonomyResolver {

	/**
	 * Resolve a category from various input formats.
	 *
	 * @param mixed $identifier Term ID, slug, name, or hierarchical path.
	 *
	 * @return int|\WP_Error Term ID or error.
	 */
	public function resolveCategory( $identifier ) {
		return $this->resolve_term( $identifier, rtcl()->category, 'category' );
	}

	/**
	 * Resolve a location from various input formats.
	 *
	 * @param mixed $identifier Term ID, slug, name, or hierarchical path.
	 *
	 * @return int|\WP_Error Term ID or error.
	 */
	public function resolveLocation( $identifier ) {
		if ( ! taxonomy_exists( rtcl()->location ) ) {
			return new \WP_Error(
				'location_taxonomy_disabled',
				__( 'Location taxonomy is not enabled.', 'classified-listing' ),
				[ 'code' => ErrorCodes::LOCATION_NOT_FOUND ]
			);
		}

		return $this->resolve_term( $identifier, rtcl()->location, 'location' );
	}

	/**
	 * Resolve tags from an array of names.
	 *
	 * @param array $tags Array of tag names.
	 *
	 * @return array Array of term IDs.
	 */
	public function resolveTags( array $tags ): array {
		$term_ids = [];

		foreach ( $tags as $tag_name ) {
			$tag_name = trim( sanitize_text_field( $tag_name ) );
			if ( '' === $tag_name ) {
				continue;
			}

			$term = get_term_by( 'name', $tag_name, rtcl()->tag );
			if ( ! $term ) {
				$term = get_term_by( 'slug', sanitize_title( $tag_name ), rtcl()->tag );
			}

			if ( $term && ! is_wp_error( $term ) ) {
				$term_ids[] = $term->term_id;
			} else {
				// Tag doesn't exist - it will be created by the ingester
				// Just pass the name through
				$term_ids[] = $tag_name;
			}
		}

		return $term_ids;
	}

	/**
	 * Resolve a term from various input formats.
	 *
	 * @param mixed  $identifier   Term ID, slug, name, or hierarchical path.
	 * @param string $taxonomy     Taxonomy name.
	 * @param string $type_label   Label for error messages (e.g., 'category', 'location').
	 *
	 * @return int|\WP_Error Term ID or error.
	 */
	private function resolve_term( $identifier, string $taxonomy, string $type_label ) {
		if ( empty( $identifier ) ) {
			return null;
		}

		// Integer: direct term ID lookup
		if ( is_int( $identifier ) || ( is_string( $identifier ) && ctype_digit( $identifier ) ) ) {
			$term = get_term( (int) $identifier, $taxonomy );
			if ( $term && ! is_wp_error( $term ) ) {
				return $term->term_id;
			}
			return new \WP_Error(
				$type_label . '_not_found',
				sprintf(
					/* translators: 1: Type label, 2: ID */
					__( '%1$s with ID %2$d not found.', 'classified-listing' ),
					ucfirst( $type_label ),
					(int) $identifier
				),
				[ 'code' => 'category' === $type_label ? ErrorCodes::CATEGORY_NOT_FOUND : ErrorCodes::LOCATION_NOT_FOUND ]
			);
		}

		// String identifier
		$identifier = trim( (string) $identifier );

		// Hierarchical path: "Parent > Child > Grandchild"
		if ( strpos( $identifier, '>' ) !== false ) {
			return $this->resolve_hierarchical_path( $identifier, $taxonomy, $type_label );
		}

		// Try slug first
		$term = get_term_by( 'slug', sanitize_title( $identifier ), $taxonomy );
		if ( $term && ! is_wp_error( $term ) ) {
			return $term->term_id;
		}

		// Try name (case-insensitive via get_term_by)
		$term = get_term_by( 'name', $identifier, $taxonomy );
		if ( $term && ! is_wp_error( $term ) ) {
			return $term->term_id;
		}

		return new \WP_Error(
			$type_label . '_not_found',
			sprintf(
				/* translators: 1: Type label, 2: Identifier */
				__( '%1$s "%2$s" not found.', 'classified-listing' ),
				ucfirst( $type_label ),
				$identifier
			),
			[ 'code' => 'category' === $type_label ? ErrorCodes::CATEGORY_NOT_FOUND : ErrorCodes::LOCATION_NOT_FOUND ]
		);
	}

	/**
	 * Resolve a hierarchical path like "Parent > Child > Grandchild".
	 *
	 * @param string $path       Hierarchical path string.
	 * @param string $taxonomy   Taxonomy name.
	 * @param string $type_label Label for error messages.
	 *
	 * @return int|\WP_Error Last term ID in the path, or error.
	 */
	private function resolve_hierarchical_path( string $path, string $taxonomy, string $type_label ) {
		$segments = array_map( 'trim', explode( '>', $path ) );
		$segments = array_filter( $segments );

		if ( empty( $segments ) ) {
			return new \WP_Error(
				$type_label . '_not_found',
				sprintf(
					/* translators: %s: Type label */
					__( 'Invalid %s path.', 'classified-listing' ),
					$type_label
				),
				[ 'code' => 'category' === $type_label ? ErrorCodes::CATEGORY_NOT_FOUND : ErrorCodes::LOCATION_NOT_FOUND ]
			);
		}

		$parent_id = 0;
		$last_term_id = null;

		foreach ( $segments as $segment ) {
			// Try to find term by name first, then by slug
			$term = $this->find_term_in_parent( $segment, $taxonomy, $parent_id );

			if ( ! $term ) {
				return new \WP_Error(
					$type_label . '_not_found',
					sprintf(
						/* translators: 1: Type label, 2: Segment name, 3: Full path */
						__( '%1$s "%2$s" not found in path "%3$s".', 'classified-listing' ),
						ucfirst( $type_label ),
						$segment,
						$path
					),
					[ 'code' => 'category' === $type_label ? ErrorCodes::CATEGORY_NOT_FOUND : ErrorCodes::LOCATION_NOT_FOUND ]
				);
			}

			$last_term_id = $term->term_id;
			$parent_id = $term->term_id;
		}

		return $last_term_id;
	}

	/**
	 * Find a term by name or slug within a specific parent.
	 *
	 * @param string $name     Term name or slug to find.
	 * @param string $taxonomy Taxonomy name.
	 * @param int    $parent   Parent term ID (0 for top-level).
	 *
	 * @return \WP_Term|null Term object or null if not found.
	 */
	private function find_term_in_parent( string $name, string $taxonomy, int $parent ): ?\WP_Term {
		// Get all child terms of the parent
		$args = [
			'taxonomy'   => $taxonomy,
			'parent'     => $parent,
			'hide_empty' => false,
		];

		$terms = get_terms( $args );

		if ( empty( $terms ) || is_wp_error( $terms ) ) {
			return null;
		}

		$slug = sanitize_title( $name );

		foreach ( $terms as $term ) {
			// Check name (case-insensitive)
			if ( strcasecmp( $term->name, $name ) === 0 ) {
				return $term;
			}
			// Check slug
			if ( $term->slug === $slug ) {
				return $term;
			}
		}

		return null;
	}

	/**
	 * Get all categories as a flat list for schema discovery.
	 *
	 * @param int $parent Parent ID (0 for all).
	 *
	 * @return array Array of category data.
	 */
	public function getAllCategories( int $parent = 0 ): array {
		return $this->get_all_terms( rtcl()->category, $parent );
	}

	/**
	 * Get all locations as a flat list for schema discovery.
	 *
	 * @param int $parent Parent ID (0 for all).
	 *
	 * @return array Array of location data.
	 */
	public function getAllLocations( int $parent = 0 ): array {
		if ( ! taxonomy_exists( rtcl()->location ) ) {
			return [];
		}
		return $this->get_all_terms( rtcl()->location, $parent );
	}

	/**
	 * Get the hierarchy path string for a term (e.g., "Parent > Child > Grandchild").
	 *
	 * This format is compatible with ListingIngester::collect_hierarchy_terms().
	 *
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Taxonomy name.
	 *
	 * @return string Hierarchy path string.
	 */
	public function getTermPath( int $term_id, string $taxonomy ): string {
		$term = get_term( $term_id, $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			return '';
		}

		$names = [ $term->name ];
		$parent_id = $term->parent;

		while ( $parent_id > 0 ) {
			$parent = get_term( $parent_id, $taxonomy );
			if ( ! $parent || is_wp_error( $parent ) ) {
				break;
			}
			array_unshift( $names, $parent->name );
			$parent_id = $parent->parent;
		}

		return implode( ' > ', $names );
	}

	/**
	 * Resolve category and return the hierarchy path string.
	 *
	 * @param mixed $identifier Term ID, slug, name, or hierarchical path.
	 *
	 * @return string|\WP_Error Path string or error.
	 */
	public function resolveCategoryPath( $identifier ) {
		// If already a path string, validate and return
		if ( is_string( $identifier ) && strpos( $identifier, '>' ) !== false ) {
			$term_id = $this->resolveCategory( $identifier );
			if ( is_wp_error( $term_id ) ) {
				return $term_id;
			}
			return trim( $identifier );
		}

		$term_id = $this->resolveCategory( $identifier );
		if ( is_wp_error( $term_id ) ) {
			return $term_id;
		}
		if ( ! $term_id ) {
			return '';
		}

		return $this->getTermPath( $term_id, rtcl()->category );
	}

	/**
	 * Resolve location and return the hierarchy path string.
	 *
	 * @param mixed $identifier Term ID, slug, name, or hierarchical path.
	 *
	 * @return string|\WP_Error Path string or error.
	 */
	public function resolveLocationPath( $identifier ) {
		// If already a path string, validate and return
		if ( is_string( $identifier ) && strpos( $identifier, '>' ) !== false ) {
			$term_id = $this->resolveLocation( $identifier );
			if ( is_wp_error( $term_id ) ) {
				return $term_id;
			}
			return trim( $identifier );
		}

		$term_id = $this->resolveLocation( $identifier );
		if ( is_wp_error( $term_id ) ) {
			return $term_id;
		}
		if ( ! $term_id ) {
			return '';
		}

		return $this->getTermPath( $term_id, rtcl()->location );
	}

	/**
	 * Get all terms for a taxonomy.
	 *
	 * @param string $taxonomy Taxonomy name.
	 * @param int    $parent   Parent ID (0 for all top-level).
	 *
	 * @return array Array of term data.
	 */
	private function get_all_terms( string $taxonomy, int $parent = 0 ): array {
		$args = [
			'taxonomy'   => $taxonomy,
			'hide_empty' => false,
			'orderby'    => 'name',
			'order'      => 'ASC',
		];

		if ( $parent > 0 ) {
			$args['child_of'] = $parent;
		}

		$terms = get_terms( $args );

		if ( empty( $terms ) || is_wp_error( $terms ) ) {
			return [];
		}

		$result = [];
		foreach ( $terms as $term ) {
			$result[] = [
				'id'     => $term->term_id,
				'name'   => $term->name,
				'slug'   => $term->slug,
				'parent' => $term->parent,
				'count'  => $term->count,
			];
		}

		return $result;
	}
}
