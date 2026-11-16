<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Models\Listing;

defined( 'ABSPATH' ) || exit;

class SearchService {

	/** @var ListingService */
	private $listingService;

	public function __construct() {
		$this->listingService = new ListingService();
	}

	/**
	 * Search listings with filters.
	 *
	 * Supports filtering by:
	 * - keyword, status, author, date range
	 * - category (ID, slug, name, or array)
	 * - location (ID, slug, name, or array)
	 * - tags (names or slugs)
	 * - form_id (Form Builder form)
	 * - price range (price_min, price_max)
	 * - listing_type, featured
	 * - custom_fields (key-value pairs)
	 * - rating (min_rating, max_rating, has_reviews)
	 *
	 * @param array $params Search parameters.
	 * @return array{total: int, page: int, per_page: int, listings: array}
	 */
	public function search( $params ) {
		$args = [
			'post_type'      => rtcl()->post_type,
			'post_status'    => 'publish',
			'posts_per_page' => min( 100, max( 1, isset( $params['per_page'] ) ? absint( $params['per_page'] ) : 20 ) ),
			'paged'          => max( 1, isset( $params['page'] ) ? absint( $params['page'] ) : 1 ),
		];

		// Keyword search.
		if ( ! empty( $params['keyword'] ) ) {
			$args['s'] = sanitize_text_field( $params['keyword'] );
		}

		// Status filter — non-publish statuses require edit capability.
		if ( ! empty( $params['status'] ) ) {
			$allowed = [ 'publish', 'pending', 'draft', 'rtcl-reviewed', 'rtcl-expired' ];
			$status  = sanitize_key( $params['status'] );
			if ( in_array( $status, $allowed, true ) ) {
				if ( 'publish' !== $status && ! current_user_can( 'edit_rtcl_listings' ) ) {
					$args['post_status'] = 'publish'; // Fall back — user lacks permission.
				} else {
					$args['post_status'] = $status;
				}
			}
		}

		// Author filter.
		if ( ! empty( $params['author'] ) ) {
			$args['author'] = absint( $params['author'] );
		}

		// Date range filters.
		$date_query = [];
		if ( ! empty( $params['date_from'] ) ) {
			$date_query['after'] = sanitize_text_field( $params['date_from'] );
		}
		if ( ! empty( $params['date_to'] ) ) {
			$date_query['before']    = sanitize_text_field( $params['date_to'] );
			$date_query['inclusive'] = true;
		}
		if ( ! empty( $date_query ) ) {
			$args['date_query'] = [ $date_query ];
		}

		// Tax queries.
		$tax_query = [];

		// Category filter - supports ID, slug, name, or array of any.
		if ( ! empty( $params['category_id'] ) || ! empty( $params['category'] ) ) {
			$category_ref = $params['category_id'] ?? $params['category'];
			$category_query = $this->buildTaxonomyQuery( rtcl()->category, $category_ref, true );
			if ( $category_query ) {
				$tax_query[] = $category_query;
			}
		}

		// Location filter - supports ID, slug, name, or array of any.
		if ( taxonomy_exists( rtcl()->location ) ) {
			if ( ! empty( $params['location_id'] ) || ! empty( $params['location'] ) ) {
				$location_ref = $params['location_id'] ?? $params['location'];
				$location_query = $this->buildTaxonomyQuery( rtcl()->location, $location_ref, true );
				if ( $location_query ) {
					$tax_query[] = $location_query;
				}
			}
		}

		// Tags filter - supports names or slugs.
		if ( ! empty( $params['tags'] ) ) {
			$tag_terms = is_array( $params['tags'] ) ? $params['tags'] : explode( ',', $params['tags'] );
			$tag_terms = array_map( 'sanitize_text_field', $tag_terms );
			$tag_terms = array_map( 'trim', $tag_terms );
			$tax_query[] = [
				'taxonomy' => rtcl()->tag,
				'field'    => 'slug', // Try slug first, WP will fall back.
				'terms'    => $tag_terms,
			];
		}

		if ( ! empty( $tax_query ) ) {
			$tax_query['relation']  = 'AND';
			$args['tax_query']      = $tax_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
		}

		// Meta queries.
		$meta_query = [];

		// Price range.
		if ( isset( $params['price_min'] ) && is_numeric( $params['price_min'] ) ) {
			$meta_query[] = [
				'key'     => 'price',
				'value'   => (float) $params['price_min'],
				'compare' => '>=',
				'type'    => 'NUMERIC',
			];
		}
		if ( isset( $params['price_max'] ) && is_numeric( $params['price_max'] ) ) {
			$meta_query[] = [
				'key'     => 'price',
				'value'   => (float) $params['price_max'],
				'compare' => '<=',
				'type'    => 'NUMERIC',
			];
		}

		// Featured filter.
		if ( isset( $params['featured'] ) ) {
			$meta_query[] = [
				'key'     => 'featured',
				'value'   => $params['featured'] ? '1' : '0',
				'compare' => '=',
			];
		}

		// Listing type filter.
		if ( ! empty( $params['listing_type'] ) ) {
			$allowed_types = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$type          = sanitize_key( $params['listing_type'] );
			if ( in_array( $type, $allowed_types, true ) ) {
				$meta_query[] = [
					'key'     => 'ad_type',
					'value'   => $type,
					'compare' => '=',
				];
			}
		}

		// Form/Directory filter (Form Builder).
		if ( ! empty( $params['form_id'] ) ) {
			$meta_query[] = [
				'key'     => '_rtcl_form_id',
				'value'   => absint( $params['form_id'] ),
				'compare' => '=',
				'type'    => 'NUMERIC',
			];
		}

		// Rating filter.
		if ( isset( $params['min_rating'] ) && is_numeric( $params['min_rating'] ) ) {
			$meta_query[] = [
				'key'     => '_rtcl_average_rating',
				'value'   => (float) $params['min_rating'],
				'compare' => '>=',
				'type'    => 'DECIMAL(10,2)',
			];
		}
		if ( isset( $params['max_rating'] ) && is_numeric( $params['max_rating'] ) ) {
			$meta_query[] = [
				'key'     => '_rtcl_average_rating',
				'value'   => (float) $params['max_rating'],
				'compare' => '<=',
				'type'    => 'DECIMAL(10,2)',
			];
		}
		// Has reviews filter.
		if ( isset( $params['has_reviews'] ) && $params['has_reviews'] ) {
			$meta_query[] = [
				'key'     => '_rtcl_review_count',
				'value'   => 0,
				'compare' => '>',
				'type'    => 'NUMERIC',
			];
		}

		// Price type filter.
		if ( ! empty( $params['price_type'] ) ) {
			$allowed_price_types = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$price_type = sanitize_key( $params['price_type'] );
			if ( in_array( $price_type, $allowed_price_types, true ) ) {
				$meta_query[] = [
					'key'     => '_rtcl_price_type',
					'value'   => $price_type,
					'compare' => '=',
				];
			}
		}

		// Custom fields filter.
		if ( ! empty( $params['custom_fields'] ) && is_array( $params['custom_fields'] ) ) {
			foreach ( $params['custom_fields'] as $field_key => $field_value ) {
				$sanitized_key = sanitize_key( $field_key );
				if ( empty( $sanitized_key ) ) {
					continue;
				}

				// Support different comparison operators.
				if ( is_array( $field_value ) && isset( $field_value['value'] ) ) {
					// Extended format: { value: X, compare: '>=', type: 'NUMERIC' }
					$cf_query = [
						'key'     => $sanitized_key,
						'value'   => $this->sanitizeCustomFieldValue( $field_value['value'] ),
						'compare' => $this->sanitizeCompareOperator( $field_value['compare'] ?? '=' ),
					];
					if ( ! empty( $field_value['type'] ) ) {
						$cf_query['type'] = sanitize_key( $field_value['type'] );
					}
					$meta_query[] = $cf_query;
				} elseif ( is_array( $field_value ) ) {
					// Array of values - use IN comparison.
					$meta_query[] = [
						'key'     => $sanitized_key,
						'value'   => array_map( [ $this, 'sanitizeCustomFieldValue' ], $field_value ),
						'compare' => 'IN',
					];
				} else {
					// Simple value.
					$meta_query[] = [
						'key'     => $sanitized_key,
						'value'   => $this->sanitizeCustomFieldValue( $field_value ),
						'compare' => '=',
					];
				}
			}
		}

		/**
		 * Filter the listing search meta query, e.g. to support add-on specific search params.
		 *
		 * @param array $meta_query Meta query clauses (without relation).
		 * @param array $params     Search parameters.
		 */
		$meta_query = apply_filters( 'rtcl_mcp_search_meta_query', $meta_query, $params );

		if ( ! empty( $meta_query ) ) {
			$meta_query['relation'] = 'AND';
			$args['meta_query']     = $meta_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		}

		// Ordering.
		$orderby_map = [
			'date'     => 'date',
			'modified' => 'modified',
			'title'    => 'title',
			'ID'       => 'ID',
			'rand'     => 'rand',
		];

		$orderby = isset( $params['orderby'] ) ? sanitize_key( $params['orderby'] ) : 'date';

		if ( 'price' === $orderby ) {
			$args['meta_key'] = 'price'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			$args['orderby']  = 'meta_value_num';
		} elseif ( 'views' === $orderby ) {
			$args['meta_key'] = '_views'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			$args['orderby']  = 'meta_value_num';
		} elseif ( isset( $orderby_map[ $orderby ] ) ) {
			$args['orderby'] = $orderby_map[ $orderby ];
		} else {
			$args['orderby'] = 'date';
		}

		$args['order'] = isset( $params['order'] ) && strtoupper( $params['order'] ) === 'ASC' ? 'ASC' : 'DESC';

		// Execute query.
		$args  = apply_filters( 'rtcl_mcp_search_query_args', $args, $params );
		$query = new \WP_Query( $args );

		$listings = [];
		foreach ( $query->posts as $post ) {
			$listing    = new Listing( $post );
			$listings[] = $this->listingService->formatListing( $listing );
		}

		return [
			'total'    => (int) $query->found_posts,
			'page'     => (int) $args['paged'],
			'per_page' => (int) $args['posts_per_page'],
			'listings' => $listings,
		];
	}

	/**
	 * Build taxonomy query from flexible input.
	 *
	 * Supports:
	 * - Integer ID
	 * - String slug or name
	 * - Array of IDs, slugs, or names
	 *
	 * @param string $taxonomy         Taxonomy name.
	 * @param mixed  $term_ref         Term reference(s).
	 * @param bool   $include_children Whether to include child terms.
	 *
	 * @return array|null Taxonomy query array or null.
	 */
	private function buildTaxonomyQuery( string $taxonomy, $term_ref, bool $include_children = true ): ?array {
		if ( empty( $term_ref ) ) {
			return null;
		}

		// Handle array of terms.
		if ( is_array( $term_ref ) ) {
			$term_ids = [];
			foreach ( $term_ref as $ref ) {
				$resolved = $this->resolveTermId( $taxonomy, $ref );
				if ( $resolved ) {
					$term_ids[] = $resolved;
				}
			}
			if ( empty( $term_ids ) ) {
				return null;
			}
			return [
				'taxonomy'         => $taxonomy,
				'field'            => 'term_id',
				'terms'            => $term_ids,
				'include_children' => $include_children,
				'operator'         => 'IN',
			];
		}

		// Single term.
		$term_id = $this->resolveTermId( $taxonomy, $term_ref );
		if ( ! $term_id ) {
			return null;
		}

		return [
			'taxonomy'         => $taxonomy,
			'field'            => 'term_id',
			'terms'            => $term_id,
			'include_children' => $include_children,
		];
	}

	/**
	 * Resolve term reference to ID.
	 *
	 * @param string $taxonomy Taxonomy name.
	 * @param mixed  $term_ref Term ID, slug, or name.
	 *
	 * @return int|null Term ID or null.
	 */
	private function resolveTermId( string $taxonomy, $term_ref ): ?int {
		if ( is_numeric( $term_ref ) ) {
			$term = get_term( absint( $term_ref ), $taxonomy );
			return ( $term && ! is_wp_error( $term ) ) ? $term->term_id : null;
		}

		$term_ref = sanitize_text_field( $term_ref );

		// Try by slug first.
		$term = get_term_by( 'slug', $term_ref, $taxonomy );
		if ( $term ) {
			return $term->term_id;
		}

		// Try by name.
		$term = get_term_by( 'name', $term_ref, $taxonomy );
		if ( $term ) {
			return $term->term_id;
		}

		return null;
	}

	/**
	 * Sanitize custom field value.
	 *
	 * @param mixed $value Value to sanitize.
	 *
	 * @return mixed Sanitized value.
	 */
	private function sanitizeCustomFieldValue( $value ) {
		if ( is_numeric( $value ) ) {
			return $value;
		}
		if ( is_bool( $value ) ) {
			return $value ? '1' : '0';
		}
		return sanitize_text_field( $value );
	}

	/**
	 * Sanitize comparison operator.
	 *
	 * @param string $operator Operator to sanitize.
	 *
	 * @return string Safe operator.
	 */
	private function sanitizeCompareOperator( string $operator ): string {
		$allowed = [ '=', '!=', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN', 'EXISTS', 'NOT EXISTS', 'REGEXP', 'NOT REGEXP', 'RLIKE' ];
		$operator = strtoupper( trim( $operator ) );
		return in_array( $operator, $allowed, true ) ? $operator : '=';
	}
}
