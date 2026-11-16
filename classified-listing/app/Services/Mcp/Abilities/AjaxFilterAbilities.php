<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Services\AjaxFilterService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers AJAX filter builder abilities.
 */
class AjaxFilterAbilities {

	public static function register() {
		self::registerListFilters();
		self::registerGetFilter();
		self::registerCreateFilter();
		self::registerUpdateFilter();
		self::registerDeleteFilter();
		self::registerAddFilterItem();
		self::registerRemoveFilterItem();
		self::registerReorderFilterItems();
		self::registerGetAvailableFilterItems();
	}

	private static function registerListFilters() {
		wp_register_ability( 'rtcl/list-ajax-filters', [
			'label'       => __( 'List AJAX Filters', 'classified-listing' ),
			'description' => __( 'List all AJAX filter forms. These filters are used for frontend listing filtering with live updates.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'filters' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'         => [ 'type' => 'string' ],
								'name'       => [ 'type' => 'string' ],
								'item_count' => [ 'type' => 'integer' ],
								'items'      => [ 'type' => 'array' ],
							],
						],
					],
					'total' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function () {
				$service = new AjaxFilterService();
				return $service->listFilters();
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerGetFilter() {
		wp_register_ability( 'rtcl/get-ajax-filter', [
			'label'       => __( 'Get AJAX Filter', 'classified-listing' ),
			'description' => __( 'Get details of a specific AJAX filter by ID, including all its items and their configuration.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID (slug).', 'classified-listing' ),
					],
				],
				'required' => [ 'filter_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'id'         => [ 'type' => 'string' ],
					'name'       => [ 'type' => 'string' ],
					'item_count' => [ 'type' => 'integer' ],
					'items'      => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->getFilter( sanitize_key( $input['filter_id'] ) );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerCreateFilter() {
		wp_register_ability( 'rtcl/create-ajax-filter', [
			'label'       => __( 'Create AJAX Filter', 'classified-listing' ),
			'description' => __( 'Create a new AJAX filter for frontend listing filtering. You can optionally include filter items during creation.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'name' => [
						'type'        => 'string',
						'description' => __( 'Filter name (displayed in admin).', 'classified-listing' ),
					],
					'id' => [
						'type'        => 'string',
						'description' => __( 'Filter ID/slug (auto-generated from name if not provided).', 'classified-listing' ),
					],
					'items' => [
						'type'        => 'array',
						'description' => __( 'Optional filter items to add. Use rtcl/get-available-filter-items to see available types.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'id'    => [ 'type' => 'string', 'description' => __( 'Item type ID (e.g., search, category, location, price, etc.).', 'classified-listing' ) ],
								'title' => [ 'type' => 'string', 'description' => __( 'Item display title.', 'classified-listing' ) ],
								'type'  => [ 'type' => 'string', 'description' => __( 'Field type (checkbox, radio, etc.).', 'classified-listing' ) ],
							],
						],
					],
				],
				'required' => [ 'name' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'id'      => [ 'type' => 'string' ],
					'name'    => [ 'type' => 'string' ],
					'items'   => [ 'type' => 'array' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->createFilter( $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => false,
				],
			],
		] );
	}

	private static function registerUpdateFilter() {
		wp_register_ability( 'rtcl/update-ajax-filter', [
			'label'       => __( 'Update AJAX Filter', 'classified-listing' ),
			'description' => __( 'Update an existing AJAX filter. Can update name and/or replace all items.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID to update.', 'classified-listing' ),
					],
					'name' => [
						'type'        => 'string',
						'description' => __( 'New filter name.', 'classified-listing' ),
					],
					'items' => [
						'type'        => 'array',
						'description' => __( 'New filter items (replaces existing items).', 'classified-listing' ),
						'items'       => [
							'type' => 'object',
						],
					],
				],
				'required' => [ 'filter_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'id'      => [ 'type' => 'string' ],
					'name'    => [ 'type' => 'string' ],
					'items'   => [ 'type' => 'array' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service   = new AjaxFilterService();
				$filter_id = sanitize_key( $input['filter_id'] );
				unset( $input['filter_id'] );
				return $service->updateFilter( $filter_id, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerDeleteFilter() {
		wp_register_ability( 'rtcl/delete-ajax-filter', [
			'label'       => __( 'Delete AJAX Filter', 'classified-listing' ),
			'description' => __( 'Delete an AJAX filter permanently.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID to delete.', 'classified-listing' ),
					],
				],
				'required' => [ 'filter_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'id'      => [ 'type' => 'string' ],
					'name'    => [ 'type' => 'string' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->deleteFilter( sanitize_key( $input['filter_id'] ) );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerAddFilterItem() {
		wp_register_ability( 'rtcl/add-ajax-filter-item', [
			'label'       => __( 'Add AJAX Filter Item', 'classified-listing' ),
			'description' => __( 'Add or update an item in an AJAX filter. If an item with the same type already exists, it will be updated.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID to add the item to.', 'classified-listing' ),
					],
					'item' => [
						'type'        => 'object',
						'description' => __( 'The filter item configuration.', 'classified-listing' ),
						'properties'  => [
							'id' => [
								'type'        => 'string',
								'description' => __( 'Item type: search, category, location, tag, price, ad_type, radius_search, custom_fields, cf_fields_by_category, or rating.', 'classified-listing' ),
							],
							'title' => [
								'type'        => 'string',
								'description' => __( 'Display title for the item.', 'classified-listing' ),
							],
							'type' => [
								'type'        => 'string',
								'description' => __( 'Field type: checkbox, radio, or other field-specific options.', 'classified-listing' ),
							],
							'hide_empty' => [
								'type'        => 'boolean',
								'description' => __( 'Hide options with no listings.', 'classified-listing' ),
							],
							'show_count' => [
								'type'        => 'boolean',
								'description' => __( 'Show listing count next to options.', 'classified-listing' ),
							],
						],
						'required' => [ 'id' ],
					],
				],
				'required' => [ 'filter_id', 'item' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [ 'type' => 'string' ],
					'item'      => [ 'type' => 'object' ],
					'action'    => [ 'type' => 'string' ],
					'message'   => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->addFilterItem(
					sanitize_key( $input['filter_id'] ),
					$input['item']
				);
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerRemoveFilterItem() {
		wp_register_ability( 'rtcl/remove-ajax-filter-item', [
			'label'       => __( 'Remove AJAX Filter Item', 'classified-listing' ),
			'description' => __( 'Remove an item from an AJAX filter.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID.', 'classified-listing' ),
					],
					'item_id' => [
						'type'        => 'string',
						'description' => __( 'The item type ID to remove (e.g., category, location).', 'classified-listing' ),
					],
				],
				'required' => [ 'filter_id', 'item_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [ 'type' => 'string' ],
					'item_id'   => [ 'type' => 'string' ],
					'message'   => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->removeFilterItem(
					sanitize_key( $input['filter_id'] ),
					sanitize_key( $input['item_id'] )
				);
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerReorderFilterItems() {
		wp_register_ability( 'rtcl/reorder-ajax-filter-items', [
			'label'       => __( 'Reorder AJAX Filter Items', 'classified-listing' ),
			'description' => __( 'Reorder items in an AJAX filter by providing the item IDs in the desired order.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [
						'type'        => 'string',
						'description' => __( 'The filter ID.', 'classified-listing' ),
					],
					'item_ids' => [
						'type'        => 'array',
						'description' => __( 'Ordered list of item type IDs.', 'classified-listing' ),
						'items'       => [ 'type' => 'string' ],
					],
				],
				'required' => [ 'filter_id', 'item_ids' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter_id' => [ 'type' => 'string' ],
					'items'     => [ 'type' => 'array' ],
					'message'   => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new AjaxFilterService();
				return $service->reorderFilterItems(
					sanitize_key( $input['filter_id'] ),
					$input['item_ids']
				);
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	private static function registerGetAvailableFilterItems() {
		wp_register_ability( 'rtcl/get-available-filter-items', [
			'label'       => __( 'Get Available Filter Items', 'classified-listing' ),
			'description' => __( 'Get all available filter item types that can be added to an AJAX filter. Returns item types with their configurable fields.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'items' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'     => [ 'type' => 'string' ],
								'label'  => [ 'type' => 'string' ],
								'icon'   => [ 'type' => 'string' ],
								'fields' => [ 'type' => 'array' ],
							],
						],
					],
					'total' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function () {
				$service = new AjaxFilterService();
				return $service->getAvailableFilterItems();
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}
}
