<?php
/**
 * Listing Type Abilities - MCP abilities for listing type CRUD.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Helpers\CapabilityHelper;
use Rtcl\Services\Mcp\Services\ListingTypeService;

/**
 * Register listing type MCP abilities.
 */
class ListingTypeAbilities {

	/**
	 * Register all listing type abilities.
	 */
	public static function register() {
		self::registerListTypes();
		self::registerGetType();
		self::registerCreateType();
		self::registerUpdateType();
		self::registerDeleteType();
		self::registerGetTypeStatistics();
	}

	/**
	 * Register list types ability.
	 */
	private static function registerListTypes() {
		wp_register_ability( 'rtcl/list-listing-types', [
			'label'       => __( 'List Listing Types', 'classified-listing' ),
			'description' => __( 'List all available listing types (ad types) such as Sell, Buy, Exchange, Job, To-Let. These types categorize listings by their purpose.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'types' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'slug'       => [ 'type' => 'string' ],
								'label'      => [ 'type' => 'string' ],
								'is_default' => [ 'type' => 'boolean' ],
							],
						],
					],
					'total' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function () {
				$service = new ListingTypeService();
				return $service->listTypes();
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

	/**
	 * Register get type ability.
	 */
	private static function registerGetType() {
		wp_register_ability( 'rtcl/get-listing-type', [
			'label'       => __( 'Get Listing Type', 'classified-listing' ),
			'description' => __( 'Get details of a specific listing type by its slug.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug' => [
						'type'        => 'string',
						'description' => __( 'The listing type slug (e.g., "sell", "buy", "job").', 'classified-listing' ),
					],
				],
				'required' => [ 'slug' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug'       => [ 'type' => 'string' ],
					'label'      => [ 'type' => 'string' ],
					'is_default' => [ 'type' => 'boolean' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$slug = sanitize_key( $input['slug'] ?? '' );
				if ( empty( $slug ) ) {
					return new \WP_Error( 'missing_slug', __( 'Type slug is required.', 'classified-listing' ) );
				}

				$service = new ListingTypeService();
				return $service->getType( $slug );
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

	/**
	 * Register create type ability.
	 */
	private static function registerCreateType() {
		wp_register_ability( 'rtcl/create-listing-type', [
			'label'       => __( 'Create Listing Type', 'classified-listing' ),
			'description' => __( 'Create a new listing type (ad type). Examples: "rent", "services", "auction". The slug must be unique and URL-safe.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Unique identifier for the type. Use lowercase letters, numbers, and underscores only.', 'classified-listing' ),
					],
					'label' => [
						'type'        => 'string',
						'description' => __( 'Display name for the type (e.g., "For Rent", "Services Offered").', 'classified-listing' ),
					],
				],
				'required' => [ 'slug', 'label' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'slug'    => [ 'type' => 'string' ],
					'label'   => [ 'type' => 'string' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$slug = $input['slug'] ?? '';
				$label = $input['label'] ?? '';

				$service = new ListingTypeService();
				return $service->createType( $slug, $label );
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

	/**
	 * Register update type ability.
	 */
	private static function registerUpdateType() {
		wp_register_ability( 'rtcl/update-listing-type', [
			'label'       => __( 'Update Listing Type', 'classified-listing' ),
			'description' => __( 'Update an existing listing type. You can change the label or rename the slug. If you change the slug, all listings using that type will be automatically updated.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Current slug of the type to update.', 'classified-listing' ),
					],
					'label' => [
						'type'        => 'string',
						'description' => __( 'New display label.', 'classified-listing' ),
					],
					'new_slug' => [
						'type'        => 'string',
						'description' => __( 'New slug (if renaming). Listings will be automatically migrated.', 'classified-listing' ),
					],
				],
				'required' => [ 'slug' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'slug'    => [ 'type' => 'string' ],
					'label'   => [ 'type' => 'string' ],
					'changes' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$slug = sanitize_key( $input['slug'] ?? '' );
				if ( empty( $slug ) ) {
					return new \WP_Error( 'missing_slug', __( 'Type slug is required.', 'classified-listing' ) );
				}

				$data = [];
				if ( isset( $input['label'] ) ) {
					$data['label'] = $input['label'];
				}
				if ( isset( $input['new_slug'] ) ) {
					$data['new_slug'] = $input['new_slug'];
				}

				$service = new ListingTypeService();
				return $service->updateType( $slug, $data );
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

	/**
	 * Register delete type ability.
	 */
	private static function registerDeleteType() {
		wp_register_ability( 'rtcl/delete-listing-type', [
			'label'       => __( 'Delete Listing Type', 'classified-listing' ),
			'description' => __( 'Permanently delete a listing type. Listing types do not have trash - deletion is permanent. If listings exist with this type, they will be migrated to another type.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Slug of the type to delete.', 'classified-listing' ),
					],
					'confirm_permanent' => [
						'type'        => 'boolean',
						'description' => __( 'Confirm permanent deletion. Listing types cannot be recovered after deletion.', 'classified-listing' ),
					],
					'migrate_to' => [
						'type'        => 'string',
						'description' => __( 'Optional. Slug of the type to migrate existing listings to.', 'classified-listing' ),
					],
				],
				'required' => [ 'slug' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'  => [ 'type' => 'boolean' ],
					'deleted'  => [
						'type'       => 'object',
						'properties' => [
							'slug'  => [ 'type' => 'string' ],
							'label' => [ 'type' => 'string' ],
						],
					],
					'migrated' => [
						'type'       => 'object',
						'properties' => [
							'count'   => [ 'type' => 'integer' ],
							'to_type' => [ 'type' => 'string' ],
						],
					],
					'message'  => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$slug = sanitize_key( $input['slug'] ?? '' );
				if ( empty( $slug ) ) {
					return new \WP_Error( 'missing_slug', __( 'Type slug is required.', 'classified-listing' ) );
				}

				$service = new ListingTypeService();
				$types = $service->getTypes();

				// If confirm_permanent is explicitly false, cancel
				if ( array_key_exists( 'confirm_permanent', $input ) && empty( $input['confirm_permanent'] ) ) {
					$type_label = $types['types'][ $slug ] ?? $slug;
					return [
						'cancelled' => true,
						'slug'      => $slug,
						'label'     => $type_label,
						'message'   => __( 'Listing type deletion cancelled.', 'classified-listing' ),
					];
				}

				// Proceed with deletion - user's request to delete is the confirmation
				$migrate_to = sanitize_key( $input['migrate_to'] ?? '' );

				return $service->deleteType( $slug, $migrate_to );
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

	/**
	 * Register get type statistics ability.
	 */
	private static function registerGetTypeStatistics() {
		wp_register_ability( 'rtcl/get-listing-type-statistics', [
			'label'       => __( 'Get Listing Type Statistics', 'classified-listing' ),
			'description' => __( 'Get statistics for all listing types including the count of listings for each type.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'types' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'slug'          => [ 'type' => 'string' ],
								'label'         => [ 'type' => 'string' ],
								'listing_count' => [ 'type' => 'integer' ],
							],
						],
					],
					'total_types' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function () {
				$service = new ListingTypeService();
				return $service->getTypeStatistics();
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
