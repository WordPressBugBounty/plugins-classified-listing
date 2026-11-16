<?php

namespace Rtcl\Services\Mcp\Services;

defined( 'ABSPATH' ) || exit;

class StatisticsService {

	/**
	 * Get listing statistics.
	 *
	 * @param array $filters Optional filters.
	 * @return array
	 */
	public function getStatistics( $filters = [] ) {
		global $wpdb;

		$post_type = rtcl()->post_type;
		$where     = $wpdb->prepare( "AND post_type = %s", $post_type );
		$join      = '';

		// Category filter.
		if ( ! empty( $filters['category_id'] ) ) {
			$term_taxonomy_ids = $this->getTermTaxonomyIds( absint( $filters['category_id'] ), rtcl()->category );
			if ( ! empty( $term_taxonomy_ids ) ) {
				$placeholders = implode( ',', array_fill( 0, count( $term_taxonomy_ids ), '%d' ) );
				$join  .= " INNER JOIN {$wpdb->term_relationships} AS tr ON p.ID = tr.object_id";
				// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare
				$where .= $wpdb->prepare( " AND tr.term_taxonomy_id IN ({$placeholders})", ...$term_taxonomy_ids );
			}
		}

		// Location filter.
		if ( ! empty( $filters['location_id'] ) && taxonomy_exists( rtcl()->location ) ) {
			$loc_taxonomy_ids = $this->getTermTaxonomyIds( absint( $filters['location_id'] ), rtcl()->location );
			if ( ! empty( $loc_taxonomy_ids ) ) {
				$placeholders = implode( ',', array_fill( 0, count( $loc_taxonomy_ids ), '%d' ) );
				if ( empty( $filters['category_id'] ) ) {
					$join .= " INNER JOIN {$wpdb->term_relationships} AS tr ON p.ID = tr.object_id";
				} else {
					$join .= " INNER JOIN {$wpdb->term_relationships} AS tr2 ON p.ID = tr2.object_id";
				}
				$alias = empty( $filters['category_id'] ) ? 'tr' : 'tr2';
				// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQLPlaceholders.UnfinishedPrepare
				$where .= $wpdb->prepare( " AND {$alias}.term_taxonomy_id IN ({$placeholders})", ...$loc_taxonomy_ids );
			}
		}

		// Author filter.
		if ( ! empty( $filters['author_id'] ) ) {
			$where .= $wpdb->prepare( ' AND post_author = %d', absint( $filters['author_id'] ) );
		}

		// Date range.
		if ( ! empty( $filters['date_from'] ) ) {
			$where .= $wpdb->prepare( ' AND post_date >= %s', sanitize_text_field( $filters['date_from'] ) . ' 00:00:00' );
		}
		if ( ! empty( $filters['date_to'] ) ) {
			$where .= $wpdb->prepare( ' AND post_date <= %s', sanitize_text_field( $filters['date_to'] ) . ' 23:59:59' );
		}

		// Get counts by status in a single query.
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$results = $wpdb->get_results(
			"SELECT post_status, COUNT(*) as count
			 FROM {$wpdb->posts} AS p
			 {$join}
			 WHERE 1=1 {$where}
			 AND post_status NOT IN ('auto-draft', 'trash', 'rtcl-temp')
			 GROUP BY post_status"
		);

		$counts = [];
		$total  = 0;
		foreach ( $results as $row ) {
			$counts[ $row->post_status ] = (int) $row->count;
			$total += (int) $row->count;
		}

		// Featured count.
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		$featured = (int) $wpdb->get_var(
			"SELECT COUNT(DISTINCT p.ID)
			 FROM {$wpdb->posts} AS p
			 INNER JOIN {$wpdb->postmeta} AS pm ON p.ID = pm.post_id AND pm.meta_key = 'featured' AND pm.meta_value = '1'
			 {$join}
			 WHERE 1=1 {$where}
			 AND post_status NOT IN ('auto-draft', 'trash', 'rtcl-temp')"
		);

		$statistics = [
			'total'     => $total,
			'published' => isset( $counts['publish'] ) ? $counts['publish'] : 0,
			'pending'   => isset( $counts['pending'] ) ? $counts['pending'] : 0,
			'draft'     => isset( $counts['draft'] ) ? $counts['draft'] : 0,
			'reviewed'  => isset( $counts['rtcl-reviewed'] ) ? $counts['rtcl-reviewed'] : 0,
			'expired'   => isset( $counts['rtcl-expired'] ) ? $counts['rtcl-expired'] : 0,
			'featured'  => $featured,
			'sold'      => 0, // Filled by add-ons that own the sold flag (rtcl_mcp_listing_statistics).
		];

		/**
		 * Filter the listing statistics.
		 *
		 * @param array  $statistics Statistics keyed by metric.
		 * @param array  $filters    Requested filters.
		 * @param string $join       Prepared JOIN SQL matching the filters (posts table aliased `p`).
		 * @param string $where      Prepared WHERE SQL matching the filters (starts with AND).
		 */
		return apply_filters( 'rtcl_mcp_listing_statistics', $statistics, $filters, $join, $where );
	}

	/**
	 * Get term taxonomy IDs including children.
	 *
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Taxonomy name.
	 * @return int[]
	 */
	private function getTermTaxonomyIds( $term_id, $taxonomy ) {
		$term = get_term( $term_id, $taxonomy );
		if ( ! $term || is_wp_error( $term ) ) {
			return [];
		}

		$ids   = [ $term->term_taxonomy_id ];
		$child = get_term_children( $term_id, $taxonomy );
		if ( ! is_wp_error( $child ) ) {
			foreach ( $child as $child_id ) {
				$child_term = get_term( $child_id, $taxonomy );
				if ( $child_term && ! is_wp_error( $child_term ) ) {
					$ids[] = $child_term->term_taxonomy_id;
				}
			}
		}

		return $ids;
	}
}
