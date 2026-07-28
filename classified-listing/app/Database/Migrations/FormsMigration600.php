<?php
/* phpcs:disable WordPress.DB.DirectDatabaseQuery.SchemaChange, WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching */

namespace Rtcl\Database\Migrations;

use Rtcl\Abstracts\Migration;

/**
 * Combined migration for wp_rtcl_forms:
 *
 * 1. Renames `columns` → `containers` in every section's JSON (sections column).
 *    - Strips `width` from each container (width option removed).
 *    - Sets section `direction` to `row` when the old layout had more than one column.
 * 2. Backfills `message_plural` into the `max_file_count` validation rule for
 *    `images` and `file` fields (fields column).
 * 3. Builds the single-layout grid (single_layout column): produces
 *    `single_layout.rows[] → .columns[](width) → .sections[] → .containers[] → .fields[]`.
 *    - Old nested `single_layout.containers[].columns[].sections[]` is mapped DIRECTLY to `rows[]`,
 *      PRESERVING each page-column `width` (e.g. a 70/30 split): the top-level `containers` key
 *      becomes `rows` (a `wrap: true` flag is added); the width-bearing `columns` stay `columns`;
 *      each section's field-column list is renamed `columns` → `containers`.
 *    - An already-flat `single_layout.sections[]` list is wrapped into a single full-width column
 *      inside one row (`width: 100`). `fields`/`settings` are preserved.
 *
 * Safe to run multiple times (idempotent).
 */
class FormsMigration600 extends Migration {

	private static array $plural_map = [
		'images' => [ 'singular' => 'image', 'plural' => 'images' ],
		'file'   => [ 'singular' => 'file',  'plural' => 'files'  ],
	];

	public static function migrate() {
		global $wpdb;

		$table = $wpdb->prefix . 'rtcl_forms';

		if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) ) !== $table ) {
			return;
		}

		$rows = $wpdb->get_results( "SELECT id, sections, fields, single_layout FROM `$table`", ARRAY_A );

		if ( empty( $rows ) ) {
			return;
		}

		foreach ( $rows as $row ) {
			$update = [];

			// 1. Rename columns → containers in sections JSON.
			if ( ! empty( $row['sections'] ) ) {
				$sections         = json_decode( $row['sections'], true );
				$sections_updated = false;

				if ( is_array( $sections ) ) {
					foreach ( $sections as &$section ) {
						if ( self::rename_section_columns( $section ) ) {
							$sections_updated = true;
						}
					}
					unset( $section );
				}

				if ( $sections_updated ) {
					$update['sections'] = wp_json_encode( $sections );
				}
			}

			// 2. Backfill message_plural in fields JSON.
			if ( ! empty( $row['fields'] ) ) {
				$fields         = json_decode( $row['fields'], true );
				$fields_updated = false;

				if ( is_array( $fields ) ) {
					foreach ( $fields as &$field ) {
						$element = $field['element'] ?? '';

						if ( ! isset( self::$plural_map[ $element ] ) ) {
							continue;
						}

						$rule = $field['validation']['max_file_count'] ?? null;

						if ( ! $rule || ! empty( $rule['message_plural'] ) ) {
							continue;
						}

						$singular = $rule['message'] ?? '';

						if ( $singular ) {
							$map     = self::$plural_map[ $element ];
							$pattern = '/\b' . preg_quote( $map['singular'], '/' ) . '\b(?!' . substr( $map['plural'], strlen( $map['singular'] ) ) . ')/u';
							$field['validation']['max_file_count']['message_plural'] = preg_replace( $pattern, $map['plural'], $singular );
							$fields_updated = true;
						}
					}
					unset( $field );
				}

				if ( $fields_updated ) {
					$update['fields'] = wp_json_encode( $fields );
				}
			}

			// 3. Build single_layout grid: rows[] → columns[](width) → sections[].
			if ( ! empty( $row['single_layout'] ) ) {
				$single_layout = json_decode( $row['single_layout'], true );

				// Idempotent: only build the grid while `rows` is not present yet.
				if ( is_array( $single_layout ) && empty( $single_layout['rows'] ) ) {
					$sl_rows = null;

					if ( ! empty( $single_layout['containers'] ) && is_array( $single_layout['containers'] ) ) {
						// Old nested grid → rows, preserving per-column width (e.g. 70/30).
						$sl_rows = [];
						foreach ( $single_layout['containers'] as $sl_container ) {
							$sl_columns = [];
							foreach ( $sl_container['columns'] ?? [] as $sl_column ) {
								if ( ! is_array( $sl_column ) ) {
									continue;
								}
								$sl_sections = [];
								foreach ( $sl_column['sections'] ?? [] as $sl_section ) {
									// Rename the section's field-column list `columns` → `containers`.
									self::rename_section_columns( $sl_section );
									$sl_sections[] = $sl_section;
								}
								// Keep an explicit page-column width only; a blank width is omitted so the column flex-fills.
								$width   = $sl_column['width'] ?? '';
								$new_col = [];
								if ( $width !== '' && $width !== null ) {
									$new_col['width'] = absint( $width );
								}
								$new_col['sections'] = $sl_sections;
								$sl_columns[]        = $new_col;
							}
							$sl_rows[] = [
								'uuid'      => $sl_container['uuid'] ?? uniqid(),
								'columns'   => $sl_columns,
							];
						}
						unset( $single_layout['containers'] );
					} 

					if ( $sl_rows !== null ) {
						$single_layout['rows'] = $sl_rows;
						$update['single_layout'] = wp_json_encode( $single_layout );
					}
				}
			}

			// 4. Rename `container_class` → `css_class` everywhere it appears (fields, sections,
			//    single_layout — at field/section/container level). Operates on the latest value
			//    of each column (post steps 1–3). Idempotent: no-op once no `container_class` left.
			foreach ( [ 'sections', 'fields', 'single_layout' ] as $col ) {
				$json = $update[ $col ] ?? ( $row[ $col ] ?? '' );
				if ( empty( $json ) ) {
					continue;
				}
				$decoded = json_decode( $json, true );
				if ( ! is_array( $decoded ) ) {
					continue;
				}
				if ( self::rename_key_recursive( $decoded, 'container_class', 'css_class' ) ) {
					$update[ $col ] = wp_json_encode( $decoded );
				}
			}

			if ( ! empty( $update ) ) {
				$wpdb->update(
					$table,
					$update,
					[ 'id' => (int) $row['id'] ],
					array_fill( 0, count( $update ), '%s' ),
					[ '%d' ]
				);
			}
		}
	}

	public static function add_slug_builder_column(): void {
		global $wpdb;
		$table = $wpdb->prefix . 'rtcl_forms';
		if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) ) !== $table ) {
			return;
		}
		$colExists = $wpdb->get_var( $wpdb->prepare(
			"SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = %s AND TABLE_NAME = %s AND COLUMN_NAME = 'slug_builder'",
			DB_NAME, $table
		) );
		if ( ! $colExists ) {
			$wpdb->query( "ALTER TABLE `$table` ADD `slug_builder` JSON NULL AFTER `single_layout`" ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
		}
		
		update_option( 'rtcl_db_migration_' . RTCL_VERSION, '1', true );
	}

	/**
	 * Recursively rename an array key from `$from` to `$to` anywhere it appears in a nested
	 * structure (associative arrays + lists). Returns true if any rename happened.
	 *
	 * @param array  $data Structure passed by reference.
	 * @param string $from Old key.
	 * @param string $to   New key.
	 *
	 * @return bool
	 */
	private static function rename_key_recursive( &$data, string $from, string $to ): bool {
		if ( ! is_array( $data ) ) {
			return false;
		}
		$changed = false;
		if ( array_key_exists( $from, $data ) ) {
			$data[ $to ] = $data[ $from ];
			unset( $data[ $from ] );
			$changed = true;
		}
		foreach ( $data as &$value ) {
			if ( is_array( $value ) && self::rename_key_recursive( $value, $from, $to ) ) {
				$changed = true;
			}
		}
		unset( $value );

		return $changed;
	}

	/**
	 * Rename a single section's `columns` → `containers` in place.
	 *
	 * Strips `width` from each container and sets `direction` to `row` when the old layout had
	 * more than one column. Used for both `sections` entries and single-layout sections.
	 *
	 * @param array $section Section node (passed by reference).
	 *
	 * @return bool True if the section was changed.
	 */
	private static function rename_section_columns( &$section ): bool {
		if ( ! is_array( $section ) || ! array_key_exists( 'columns', $section ) || array_key_exists( 'containers', $section ) ) {
			return false;
		}

		$columns = is_array( $section['columns'] ) ? $section['columns'] : [];

		// Set direction to row if the section had multiple columns.
		if ( count( $columns ) > 1 && empty( $section['direction'] ) ) {
			$section['direction'] = 'row';
		}

		// Strip width from each container.
		foreach ( $columns as &$col ) {
			if ( is_array( $col ) ) {
				unset( $col['width'] );
			}
		}
		unset( $col );

		$section['containers'] = $columns;
		unset( $section['columns'] );

		return true;
	}
}
