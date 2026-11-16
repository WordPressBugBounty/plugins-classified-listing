<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Helpers\Functions;
use Rtcl\Resources\Options;

defined( 'ABSPATH' ) || exit;

/**
 * Service for managing AJAX filters.
 */
class AjaxFilterService {

	/**
	 * Get all AJAX filters.
	 *
	 * @return array
	 */
	public function listFilters(): array {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters ) ) {
			return [
				'filters' => [],
				'total'   => 0,
				'message' => __( 'No AJAX filters found.', 'classified-listing' ),
			];
		}

		$result = [];
		foreach ( $filters as $id => $filter ) {
			$result[] = [
				'id'         => $id,
				'name'       => $filter['name'] ?? '',
				'item_count' => count( $filter['items'] ?? [] ),
				'items'      => $this->formatFilterItems( $filter['items'] ?? [] ),
			];
		}

		return [
			'filters' => $result,
			'total'   => count( $result ),
		];
	}

	/**
	 * Get a specific filter by ID.
	 *
	 * @param string $filter_id Filter ID.
	 * @return array|\WP_Error
	 */
	public function getFilter( string $filter_id ) {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		$filter = $filters[ $filter_id ];

		return [
			'id'         => $filter_id,
			'name'       => $filter['name'] ?? '',
			'item_count' => count( $filter['items'] ?? [] ),
			'items'      => $this->formatFilterItems( $filter['items'] ?? [] ),
		];
	}

	/**
	 * Create a new AJAX filter.
	 *
	 * @param array $data Filter data.
	 * @return array|\WP_Error
	 */
	public function createFilter( array $data ) {
		$name = sanitize_text_field( $data['name'] ?? '' );
		$id   = sanitize_key( $data['id'] ?? '' );

		if ( empty( $name ) ) {
			return new \WP_Error(
				'empty_name',
				__( 'Filter name is required.', 'classified-listing' ),
				[ 'status' => 400 ]
			);
		}

		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		// Generate ID from name if not provided.
		if ( empty( $id ) ) {
			$id = sanitize_key( str_replace( ' ', '-', strtolower( $name ) ) );
		}

		// Check for duplicate ID.
		if ( ! empty( $filters[ $id ] ) ) {
			return new \WP_Error(
				'duplicate_id',
				__( 'A filter with this ID already exists.', 'classified-listing' ),
				[ 'status' => 400 ]
			);
		}

		// Create new filter.
		$filters[ $id ] = [
			'name'  => $name,
			'items' => [],
		];

		// Add items if provided.
		if ( ! empty( $data['items'] ) && is_array( $data['items'] ) ) {
			foreach ( $data['items'] as $item ) {
				$item_result = $this->addFilterItem( $id, $item, $filters );
				if ( ! is_wp_error( $item_result ) ) {
					$filters = $item_result['filters'];
				}
			}
		}

		update_option( 'rtcl_filter_settings', $filters );

		return [
			'id'      => $id,
			'name'    => $name,
			'items'   => $this->formatFilterItems( $filters[ $id ]['items'] ?? [] ),
			'message' => __( 'Filter created successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Update an existing AJAX filter.
	 *
	 * @param string $filter_id Filter ID.
	 * @param array  $data      Filter data.
	 * @return array|\WP_Error
	 */
	public function updateFilter( string $filter_id, array $data ) {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		// Update name if provided.
		if ( isset( $data['name'] ) ) {
			$filters[ $filter_id ]['name'] = sanitize_text_field( $data['name'] );
		}

		// Replace items if provided.
		if ( isset( $data['items'] ) && is_array( $data['items'] ) ) {
			$filters[ $filter_id ]['items'] = [];
			foreach ( $data['items'] as $item ) {
				$item_result = $this->addFilterItem( $filter_id, $item, $filters );
				if ( ! is_wp_error( $item_result ) ) {
					$filters = $item_result['filters'];
				}
			}
		}

		update_option( 'rtcl_filter_settings', $filters );

		return [
			'id'      => $filter_id,
			'name'    => $filters[ $filter_id ]['name'],
			'items'   => $this->formatFilterItems( $filters[ $filter_id ]['items'] ?? [] ),
			'message' => __( 'Filter updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Delete an AJAX filter.
	 *
	 * @param string $filter_id Filter ID.
	 * @return array|\WP_Error
	 */
	public function deleteFilter( string $filter_id ) {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		$filter_name = $filters[ $filter_id ]['name'];
		unset( $filters[ $filter_id ] );
		update_option( 'rtcl_filter_settings', $filters );

		return [
			'id'      => $filter_id,
			'name'    => $filter_name,
			'message' => __( 'Filter deleted successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Add an item to a filter.
	 *
	 * @param string     $filter_id Filter ID.
	 * @param array      $item_data Item data.
	 * @param array|null $filters   Optional filters array (for internal use).
	 * @return array|\WP_Error
	 */
	public function addFilterItem( string $filter_id, array $item_data, ?array $filters = null ) {
		if ( $filters === null ) {
			$filters = Functions::get_option( 'rtcl_filter_settings', [] );
		}

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		$item_id    = sanitize_key( $item_data['id'] ?? $item_data['type'] ?? '' );
		$all_items  = Options::filterFormItems();

		if ( empty( $item_id ) || empty( $all_items[ $item_id ] ) ) {
			return new \WP_Error(
				'invalid_item_type',
				__( 'Invalid filter item type.', 'classified-listing' ),
				[ 'status' => 400 ]
			);
		}

		// Build item data.
		$item = [ 'id' => $item_id ];
		$item_config = $all_items[ $item_id ];

		if ( ! empty( $item_config['fields'] ) ) {
			foreach ( $item_config['fields'] as $field ) {
				$field_id = $field['id'] ?? '';
				if ( empty( $field_id ) ) {
					continue;
				}

				if ( isset( $item_data[ $field_id ] ) ) {
					$item[ $field_id ] = $this->sanitizeFieldValue( $item_data[ $field_id ], $field );
				} elseif ( isset( $field['default'] ) ) {
					$item[ $field_id ] = $field['default'];
				}
			}
		}

		// Check if item already exists, update it.
		$exists = false;
		if ( ! empty( $filters[ $filter_id ]['items'] ) ) {
			foreach ( $filters[ $filter_id ]['items'] as $key => $existing_item ) {
				if ( $existing_item['id'] === $item_id ) {
					$filters[ $filter_id ]['items'][ $key ] = $item;
					$exists = true;
					break;
				}
			}
		}

		if ( ! $exists ) {
			$filters[ $filter_id ]['items'][] = $item;
		}

		update_option( 'rtcl_filter_settings', $filters );

		return [
			'filter_id' => $filter_id,
			'item'      => $item,
			'action'    => $exists ? 'updated' : 'added',
			'filters'   => $filters,
			'message'   => $exists
				? __( 'Filter item updated.', 'classified-listing' )
				: __( 'Filter item added.', 'classified-listing' ),
		];
	}

	/**
	 * Remove an item from a filter.
	 *
	 * @param string $filter_id Filter ID.
	 * @param string $item_id   Item ID.
	 * @return array|\WP_Error
	 */
	public function removeFilterItem( string $filter_id, string $item_id ) {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		if ( empty( $filters[ $filter_id ]['items'] ) ) {
			return new \WP_Error(
				'item_not_found',
				__( 'Filter has no items.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		$found = false;
		$new_items = [];
		foreach ( $filters[ $filter_id ]['items'] as $item ) {
			if ( $item['id'] === $item_id ) {
				$found = true;
			} else {
				$new_items[] = $item;
			}
		}

		if ( ! $found ) {
			return new \WP_Error(
				'item_not_found',
				__( 'Item not found in filter.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		$filters[ $filter_id ]['items'] = $new_items;
		update_option( 'rtcl_filter_settings', $filters );

		return [
			'filter_id' => $filter_id,
			'item_id'   => $item_id,
			'message'   => __( 'Filter item removed.', 'classified-listing' ),
		];
	}

	/**
	 * Reorder filter items.
	 *
	 * @param string $filter_id Filter ID.
	 * @param array  $item_ids  Ordered list of item IDs.
	 * @return array|\WP_Error
	 */
	public function reorderFilterItems( string $filter_id, array $item_ids ) {
		$filters = Functions::get_option( 'rtcl_filter_settings', [] );

		if ( empty( $filters[ $filter_id ] ) ) {
			return new \WP_Error(
				'filter_not_found',
				__( 'Filter not found.', 'classified-listing' ),
				[ 'status' => 404 ]
			);
		}

		if ( empty( $filters[ $filter_id ]['items'] ) ) {
			return new \WP_Error(
				'no_items',
				__( 'Filter has no items to reorder.', 'classified-listing' ),
				[ 'status' => 400 ]
			);
		}

		// Build a map of current items.
		$item_map = [];
		foreach ( $filters[ $filter_id ]['items'] as $item ) {
			$item_map[ $item['id'] ] = $item;
		}

		// Reorder based on provided IDs.
		$new_items = [];
		foreach ( $item_ids as $id ) {
			$id = sanitize_key( $id );
			if ( isset( $item_map[ $id ] ) ) {
				$new_items[] = $item_map[ $id ];
				unset( $item_map[ $id ] );
			}
		}

		// Append any remaining items not in the order list.
		foreach ( $item_map as $item ) {
			$new_items[] = $item;
		}

		$filters[ $filter_id ]['items'] = $new_items;
		update_option( 'rtcl_filter_settings', $filters );

		return [
			'filter_id' => $filter_id,
			'items'     => $this->formatFilterItems( $new_items ),
			'message'   => __( 'Filter items reordered.', 'classified-listing' ),
		];
	}

	/**
	 * Get available filter item types.
	 *
	 * @return array
	 */
	public function getAvailableFilterItems(): array {
		$all_items = Options::filterFormItems();
		$result    = [];

		foreach ( $all_items as $id => $item ) {
			$fields = [];
			if ( ! empty( $item['fields'] ) ) {
				foreach ( $item['fields'] as $field ) {
					$field_info = [
						'id'       => $field['id'] ?? '',
						'label'    => $field['label'] ?? '',
						'type'     => $field['type'] ?? 'text',
						'required' => ! empty( $field['required'] ),
					];

					if ( isset( $field['default'] ) ) {
						$field_info['default'] = $field['default'];
					}

					if ( isset( $field['options'] ) ) {
						$field_info['options'] = $field['options'];
					}

					if ( isset( $field['placeholder'] ) ) {
						$field_info['placeholder'] = $field['placeholder'];
					}

					if ( isset( $field['description'] ) ) {
						$field_info['description'] = $field['description'];
					}

					$fields[] = $field_info;
				}
			}

			$result[] = [
				'id'     => $id,
				'label'  => $item['label'] ?? $id,
				'icon'   => $item['icon'] ?? '',
				'fields' => $fields,
			];
		}

		return [
			'items' => $result,
			'total' => count( $result ),
		];
	}

	/**
	 * Format filter items for output.
	 *
	 * @param array $items Filter items.
	 * @return array
	 */
	private function formatFilterItems( array $items ): array {
		$all_items = Options::filterFormItems();
		$result    = [];

		foreach ( $items as $item ) {
			$id = $item['id'] ?? '';
			$item_config = $all_items[ $id ] ?? null;

			$formatted = [
				'id'    => $id,
				'type'  => $id,
				'label' => $item_config['label'] ?? $id,
			];

			// Add item settings.
			foreach ( $item as $key => $value ) {
				if ( $key !== 'id' ) {
					$formatted[ $key ] = $value;
				}
			}

			$result[] = $formatted;
		}

		return $result;
	}

	/**
	 * Sanitize a field value based on field type.
	 *
	 * @param mixed $value Field value.
	 * @param array $field Field configuration.
	 * @return mixed
	 */
	private function sanitizeFieldValue( $value, array $field ) {
		$type = $field['type'] ?? 'text';

		switch ( $type ) {
			case 'switch':
				return $value ? 1 : 0;

			case 'select':
				if ( isset( $field['options'] ) && ! isset( $field['options'][ $value ] ) ) {
					return $field['default'] ?? '';
				}
				return sanitize_text_field( $value );

			case 'checkbox':
				if ( is_array( $value ) && isset( $field['options'] ) ) {
					return array_values( array_intersect(
						array_map( 'sanitize_text_field', $value ),
						array_keys( $field['options'] )
					) );
				}
				return [];

			case 'terms_select':
				if ( is_array( $value ) ) {
					return array_map( 'absint', $value );
				}
				return [];

			case 'cf_fields_order':
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_key', $value );
				}
				return [];

			default:
				return sanitize_text_field( $value );
		}
	}
}
