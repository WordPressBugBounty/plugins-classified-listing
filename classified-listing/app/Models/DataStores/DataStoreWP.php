<?php
// phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching

namespace Rtcl\Models\DataStores;

use DateTimeZone;
use Exception;
use Rtcl\Abstracts\Data;
use Rtcl\Helpers\Functions;
use Rtcl\Models\RtclDateTime;
use stdClass;

class DataStoreWP {
	/**
	 * Meta type. This should match up with
	 * the types available at https://codex.wordpress.org/Function_Reference/add_metadata.
	 * WP defines 'post', 'user', 'comment', and 'term'.
	 *
	 * @var string
	 */
	protected $meta_type = 'post';

	/**
	 * This only needs set if you are using a custom metadata type (for example payment tokens.
	 * This should be the name of the field your table uses for associating meta with objects.
	 * For example, in payment_tokenmeta, this would be payment_token_id.
	 *
	 * @var string
	 */
	protected $object_id_field_for_meta = '';

	/**
	 * Data stored in meta keys, but not considered "meta" for an object.
	 *
	 * @since 3.0.0
	 * @var array
	 */
	protected $internal_meta_keys = [];

	/**
	 * Get and store terms from a taxonomy.
	 *
	 * @param Data|integer $object   Data object or object ID.
	 * @param string       $taxonomy Taxonomy name e.g. product_cat.
	 *
	 * @return array of terms
	 * @since  1.0.0
	 */
	protected function get_term_ids( $object, $taxonomy ) {
		if ( is_numeric( $object ) ) {
			$object_id = $object;
		} else {
			$object_id = $object->get_id();
		}
		$terms = get_the_terms( $object_id, $taxonomy );
		if ( false === $terms || is_wp_error( $terms ) ) {
			return [];
		}

		return wp_list_pluck( $terms, 'term_id' );
	}

	/**
	 * Returns an array of meta for an object.
	 *
	 * @param Data $object Data object.
	 *
	 * @return array
	 * @since  3.0.0
	 */
	public function read_meta( &$object ) {
		global $wpdb;
		$db_info       = $this->get_db_info();
		$raw_meta_data = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT {$db_info['meta_id_field']} as meta_id, meta_key, meta_value
				FROM {$db_info['table']}
				WHERE {$db_info['object_id_field']} = %d
				ORDER BY {$db_info['meta_id_field']}",
				// phpcs:enable
				$object->get_id()
			)
		);

		$this->internal_meta_keys = array_merge( array_map( [
			$this,
			'prefix_key'
		], $object->get_data_keys() ), $this->internal_meta_keys );
		$meta_data                = array_filter( $raw_meta_data, [ $this, 'exclude_internal_meta_keys' ] );

		return apply_filters( "rtcl_data_store_wp_{$this->meta_type}_read_meta", $meta_data, $object, $this );
	}

	/**
	 * Deletes meta based on meta ID.
	 *
	 * @param Data     $object Data object.
	 * @param stdClass $meta   (containing at least ->id).
	 *
	 * @since  1.0.0
	 */
	public function delete_meta( &$object, $meta ) {
		delete_metadata_by_mid( $this->meta_type, $meta->id );
	}

	/**
	 * Add new piece of meta.
	 *
	 * @param Data     $object Data object.
	 * @param stdClass $meta   (containing ->key and ->value).
	 *
	 * @return int meta ID
	 * @since  1.0.0
	 */
	public function add_meta( &$object, $meta ) {
		return add_metadata( $this->meta_type, $object->get_id(), $meta->key, is_string( $meta->value ) ? wp_slash( $meta->value ) : $meta->value, false );
	}

	/**
	 * Update meta.
	 *
	 * @param Data     $object Data object.
	 * @param stdClass $meta   (containing ->id, ->key and ->value).
	 *
	 * @since  1.0.0
	 */
	public function update_meta( &$object, $meta ) {
		update_metadata_by_mid( $this->meta_type, $meta->id, $meta->value, $meta->key );
	}

	/**
	 * Table structure is slightly different between meta types, this function will return what we need to know.
	 *
	 * @return array Array elements: table, object_id_field, meta_id_field
	 * @since  1.0.0
	 */
	protected function get_db_info() {
		global $wpdb;

		$meta_id_field = 'meta_id'; // for some reason users calls this umeta_id so we need to track this as well.
		$table         = $wpdb->prefix;

		// If we are dealing with a type of metadata that is not a core type, the table should be prefixed.
		if ( ! in_array( $this->meta_type, [ 'post', 'user', 'comment', 'term' ], true ) ) {
			$table .= 'rtcl_';
		}

		$table           .= $this->meta_type . 'meta';
		$object_id_field = $this->meta_type . '_id';

		// Figure out our field names.
		if ( 'user' === $this->meta_type ) {
			$meta_id_field = 'umeta_id';
			$table         = $wpdb->usermeta;
		}

		if ( ! empty( $this->object_id_field_for_meta ) ) {
			$object_id_field = $this->object_id_field_for_meta;
		}

		return [
			'table'           => $table,
			'object_id_field' => $object_id_field,
			'meta_id_field'   => $meta_id_field,
		];
	}

	/**
	 * Internal meta keys we don't want exposed as part of meta_data. This is in
	 * addition to all data props with _ prefix.
	 *
	 * @param string $key Prefix to be added to meta keys.
	 *
	 * @return string
	 * @since 2.6.0
	 *
	 */
	protected function prefix_key( $key ) {
		return '_' === substr( $key, 0, 1 ) ? $key : '_' . $key;
	}

	/**
	 * Callback to remove unwanted meta data.
	 *
	 * @param object $meta Meta object to check if it should be excluded or not.
	 *
	 * @return bool
	 */
	protected function exclude_internal_meta_keys( $meta ) {
		return ! in_array( $meta->meta_key, $this->internal_meta_keys, true ) && 0 !== stripos( $meta->meta_key, 'wp_' );
	}

	/**
	 * Gets a list of props and meta keys that need updated based on change state
	 * or if they are present in the database or not.
	 *
	 * @param Data   $object            The WP_Data object (WC_Coupon for coupons, etc).
	 * @param array  $meta_key_to_props A mapping of meta keys => prop names.
	 * @param string $meta_type         The internal WP meta type (post, user, etc).
	 *
	 * @return array                        A mapping of meta keys => prop names, filtered by ones that should be updated.
	 */
	protected function get_props_to_update( $object, $meta_key_to_props, $meta_type = 'post' ) {
		$props_to_update = [];
		$changed_props   = $object->get_changes();

		// Props should be updated if they are a part of the $changed array or don't exist yet.
		foreach ( $meta_key_to_props as $meta_key => $prop ) {
			if ( array_key_exists( $prop, $changed_props ) || ! metadata_exists( $meta_type, $object->get_id(), $meta_key ) ) {
				$props_to_update[ $meta_key ] = $prop;
			}
		}

		return $props_to_update;
	}

	/**
	 * Get valid WP_Query args from a WC_Object_Query's query variables.
	 *
	 * @param array $query_vars query vars from a WC_Object_Query.
	 *
	 * @return array
	 * @since 3.1.0
	 */
	protected function get_wp_query_args( $query_vars ) {

		$skipped_values = [ '', [], null ];
		$wp_query_args  = [
			'errors'     => [],
			'meta_query' => [], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		];

		foreach ( $query_vars as $key => $value ) {
			if ( in_array( $value, $skipped_values, true ) || 'meta_query' === $key ) {
				continue; 
			}

			// Build meta queries out of vars that are stored in internal meta keys.
			if ( in_array( '_' . $key, $this->internal_meta_keys, true ) ) {
				$wp_query_args['meta_query'][] = [
					'key'     => '_' . $key,
					'value'   => $value,
					'compare' => is_array( $value ) ? 'IN' : '=',
				];
			} else { // Other vars get mapped to wp_query args or just left alone.
				$key_mapping = [
					'parent'         => 'post_parent',
					'parent_exclude' => 'post_parent__not_in', 
					'exclude'        => 'post__not_in',// phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude
					'limit'          => 'posts_per_page',
					'type'           => 'post_type',
					'return'         => 'fields',
				];

				if ( isset( $key_mapping[ $key ] ) ) {
					$wp_query_args[ $key_mapping[ $key ] ] = $value;
				} else {
					$wp_query_args[ $key ] = $value;
				}
			}
		}

		return apply_filters( 'woocommerce_get_wp_query_args', $wp_query_args, $query_vars );
	}

	/**
	 * Map a valid date query var to WP_Query arguments.
	 * Valid date formats: YYYY-MM-DD or timestamp, possibly combined with an operator from $valid_operators.
	 * Also accepts a RtclDateTime object.
	 *
	 * @param mixed  $query_var     A valid date format.
	 * @param string $key           meta or db column key.
	 * @param array  $wp_query_args WP_Query args.
	 *
	 * @return array Modified $wp_query_args
	 * @since 3.2.0
	 */
	public function parse_date_for_wp_query( $query_var, $key, $wp_query_args = [] ) {
		$query_parse_regex = '/([^.<>]*)(>=|<=|>|<|\.\.\.)([^.<>]+)/';
		$valid_operators   = [ '>', '>=', '=', '<=', '<', '...' ];

		// YYYY-MM-DD queries have 'day' precision. Timestamp/RtclDateTime queries have 'second' precision.
		$precision = 'second';

		$dates    = [];
		$operator = '=';

		try {
			// Specific time query with a RtclDateTime.
			if ( is_a( $query_var, 'RtclDateTime' ) ) {
				$dates[] = $query_var;
			} elseif ( is_numeric( $query_var ) ) { // Specific time query with a timestamp.
				$dates[] = new RtclDateTime( "@{$query_var}", new DateTimeZone( 'UTC' ) );
			} elseif ( preg_match( $query_parse_regex, $query_var, $sections ) ) { // Query with operators and possible range of dates.
				if ( ! empty( $sections[1] ) ) {
					$dates[] = is_numeric( $sections[1] ) ? new RtclDateTime( "@{$sections[1]}", new DateTimeZone( 'UTC' ) ) : Functions::string_to_datetime( $sections[1] );
				}

				$operator = in_array( $sections[2], $valid_operators, true ) ? $sections[2] : '';
				$dates[]  = is_numeric( $sections[3] ) ? new RtclDateTime( "@{$sections[3]}", new DateTimeZone( 'UTC' ) ) : Functions::string_to_datetime( $sections[3] );

				if ( ! is_numeric( $sections[1] ) && ! is_numeric( $sections[3] ) ) {
					$precision = 'day';
				}
			} else { // Specific time query with a string.
				$dates[]   = Functions::string_to_datetime( $query_var );
				$precision = 'day';
			}
		} catch ( Exception $e ) {
			return $wp_query_args;
		}

		// Check for valid inputs.
		if ( ! $operator || empty( $dates ) || ( '...' === $operator && count( $dates ) < 2 ) ) {
			return $wp_query_args;
		}

		// Build date query for 'post_date' or 'post_modified' keys.
		if ( 'post_date' === $key || 'post_modified' === $key ) {
			if ( ! isset( $wp_query_args['date_query'] ) ) {
				$wp_query_args['date_query'] = [];
			}

			$query_arg = [
				'column'    => 'day' === $precision ? $key : $key . '_gmt',
				'inclusive' => '>' !== $operator && '<' !== $operator,
			];

			// Add 'before'/'after' query args.
			$comparisons = [];
			if ( '>' === $operator || '>=' === $operator || '...' === $operator ) {
				$comparisons[] = 'after';
			}
			if ( '<' === $operator || '<=' === $operator || '...' === $operator ) {
				$comparisons[] = 'before';
			}

			foreach ( $comparisons as $index => $comparison ) {
				if ( 'day' === $precision ) {
					/**
					 * WordPress doesn't generate the correct SQL for inclusive day queries with both a 'before' and
					 * 'after' string query, so we have to use the array format in 'day' precision.
					 *
					 * @see https://core.trac.wordpress.org/ticket/29908
					 */
					$query_arg[ $comparison ]['year']  = $dates[ $index ]->date( 'Y' );
					$query_arg[ $comparison ]['month'] = $dates[ $index ]->date( 'n' );
					$query_arg[ $comparison ]['day']   = $dates[ $index ]->date( 'j' );
				} else {
					/**
					 * WordPress doesn't support 'hour'/'second'/'minute' in array format 'before'/'after' queries,
					 * so we have to use a string query.
					 */
					$query_arg[ $comparison ] = gmdate( 'm/d/Y H:i:s', $dates[ $index ]->getTimestamp() );
				}
			}

			if ( empty( $comparisons ) ) {
				$query_arg['year']  = $dates[0]->date( 'Y' );
				$query_arg['month'] = $dates[0]->date( 'n' );
				$query_arg['day']   = $dates[0]->date( 'j' );
				if ( 'second' === $precision ) {
					$query_arg['hour']   = $dates[0]->date( 'H' );
					$query_arg['minute'] = $dates[0]->date( 'i' );
					$query_arg['second'] = $dates[0]->date( 's' );
				}
			}
			$wp_query_args['date_query'][] = $query_arg;

			return $wp_query_args;
		}

		// Build meta query for unrecognized keys.
		if ( ! isset( $wp_query_args['meta_query'] ) ) {
			$wp_query_args['meta_query'] = []; // phpcs:ignore WordPress.VIP.SlowDBQuery.slow_db_query_meta_query, WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		}

		// Meta dates are stored as timestamps in the db.
		// Check against beginning/end-of-day timestamps when using 'day' precision.
		if ( 'day' === $precision ) {
			$start_timestamp = strtotime( gmdate( 'm/d/Y 00:00:00', $dates[0]->getTimestamp() ) );
			$end_timestamp   = '...' !== $operator ? ( $start_timestamp + DAY_IN_SECONDS ) : strtotime( gmdate( 'm/d/Y 00:00:00', $dates[1]->getTimestamp() ) );
			switch ( $operator ) {
				case '>':
				case '<=':
					$wp_query_args['meta_query'][] = [
						'key'     => $key,
						'value'   => $end_timestamp,
						'compare' => $operator,
					];
					break;
				case '<':
				case '>=':
					$wp_query_args['meta_query'][] = [
						'key'     => $key,
						'value'   => $start_timestamp,
						'compare' => $operator,
					];
					break;
				default:
					$wp_query_args['meta_query'][] = [
						'key'     => $key,
						'value'   => $start_timestamp,
						'compare' => '>=',
					];
					$wp_query_args['meta_query'][] = [
						'key'     => $key,
						'value'   => $end_timestamp,
						'compare' => '<=',
					];
			}
		} else {
			if ( '...' !== $operator ) {
				$wp_query_args['meta_query'][] = [
					'key'     => $key,
					'value'   => $dates[0]->getTimestamp(),
					'compare' => $operator,
				];
			} else {
				$wp_query_args['meta_query'][] = [
					'key'     => $key,
					'value'   => $dates[0]->getTimestamp(),
					'compare' => '>=',
				];
				$wp_query_args['meta_query'][] = [
					'key'     => $key,
					'value'   => $dates[1]->getTimestamp(),
					'compare' => '<=',
				];
			}
		}

		return $wp_query_args;
	}

	/**
	 * Return list of internal meta keys.
	 *
	 * @return array
	 * @since 3.2.0
	 */
	public function get_internal_meta_keys() {
		return $this->internal_meta_keys;
	}

	/**
	 * Check if the terms are suitable for searching.
	 *
	 * Uses an array of stopwords (terms) that are excluded from the separate
	 * term matching when searching for posts. The list of English stopwords is
	 * the approximate search engines list, and is translatable.
	 *
	 * @param array $terms Terms to check.
	 *
	 * @return array Terms that are not stopwords.
	 * @since 3.4.0
	 */
	protected function get_valid_search_terms( $terms ) {
		$valid_terms = [];
		$stopwords   = $this->get_search_stopwords();

		foreach ( $terms as $term ) {
			// keep before/after spaces when term is for exact match, otherwise trim quotes and spaces.
			if ( preg_match( '/^".+"$/', $term ) ) {
				$term = trim( $term, "\"'" );
			} else {
				$term = trim( $term, "\"' " );
			}

			// Avoid single A-Z and single dashes.
			if ( empty( $term ) || ( 1 === strlen( $term ) && preg_match( '/^[a-z\-]$/i', $term ) ) ) {
				continue;
			}

			if ( in_array( Functions::strtolower( $term ), $stopwords, true ) ) {
				continue;
			}

			$valid_terms[] = $term;
		}

		return $valid_terms;
	}

	/**
	 * Retrieve stopwords used when parsing search terms.
	 *
	 * @return array Stopwords.
	 * @since 1.0.0
	 */
	protected function get_search_stopwords() {
		// Translators: This is a comma-separated list of very common words that should be excluded from a search, like a, an, and the. These are usually called "stopwords". You should not simply translate these individual words into your load_language. Instead, look for and provide commonly accepted stopwords in your load_language.
		$stopwords = array_map( [ Functions::class, 'strtolower' ], array_map( 'trim', explode(
			',', _x(
				'about,an,are,as,at,be,by,com,for,from,how,in,is,it,of,on,or,that,the,this,to,was,what,when,where,who,will,with,www',
				'Comma-separated list of search stopwords in your load_language',
				'classified-listing'
			)
		) ) );

		return apply_filters( 'wp_search_stopwords', $stopwords );
	}
}