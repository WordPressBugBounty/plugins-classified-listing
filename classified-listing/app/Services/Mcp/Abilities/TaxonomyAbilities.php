<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Services\TaxonomyService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers taxonomy-related abilities (categories, locations, tags).
 */
class TaxonomyAbilities {

	public static function register() {
		self::registerGetCategories();
		self::registerCreateCategory();
		self::registerUpdateCategory();
		self::registerDeleteCategory();
		self::registerSetCategoryImage();
		self::registerSetCategoryIcon();
		self::registerGetTags();
		self::registerCreateTag();
		self::registerDeleteTag();

		// Location abilities only when local location taxonomy exists.
		if ( taxonomy_exists( 'rtcl_location' ) ) {
			self::registerGetLocations();
			self::registerCreateLocation();
			self::registerUpdateLocation();
			self::registerDeleteLocation();
			self::registerSetLocationImage();
			self::registerCreateLocationHierarchy();
		}

		self::registerCreateCategoryHierarchy();
	}

	private static function registerGetCategories() {
		wp_register_ability( 'rtcl/get-categories', [
			'label'       => __( 'Get Categories', 'classified-listing' ),
			'description' => __( 'Get classified listing categories with full meta (icon, image, order, types, price_units). Supports filtering by parent (use 0 for top-level), search, and pagination. Categories are hierarchical.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'parent'           => [ 'type' => 'integer', 'description' => __( 'Parent category ID. 0 = top-level only. Omit for all.', 'classified-listing' ) ],
					'include_children' => [ 'type' => 'boolean', 'description' => __( 'Include all descendants of parent. Default: false.', 'classified-listing' ) ],
					'search'           => [ 'type' => 'string', 'description' => __( 'Search by name.', 'classified-listing' ) ],
					'page'             => [ 'type' => 'integer', 'default' => 1 ],
					'per_page'         => [ 'type' => 'integer', 'default' => 50 ],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'total' => [ 'type' => 'integer' ],
					'terms' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'          => [ 'type' => 'integer' ],
								'name'        => [ 'type' => 'string' ],
								'slug'        => [ 'type' => 'string' ],
								'parent'      => [ 'type' => 'integer' ],
								'count'       => [ 'type' => 'integer' ],
								'description' => [ 'type' => 'string' ],
								'order'       => [ 'type' => 'integer' ],
								'icon'         => [ 'type' => 'string' ],
								'image_id'     => [ 'type' => 'integer' ],
								'image_url'    => [ 'type' => 'string' ],
								'map_icon_id'  => [ 'type' => 'integer', 'description' => __( 'Map marker icon attachment ID.', 'classified-listing' ) ],
								'map_icon_url' => [ 'type' => 'string', 'description' => __( 'Map marker icon URL.', 'classified-listing' ) ],
								'types'        => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
								'price_units'  => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
							],
						],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->getTerms( rtcl()->category, $input );
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => true, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerCreateCategory() {
		wp_register_ability( 'rtcl/create-category', [
			'label'       => __( 'Create Category', 'classified-listing' ),
			'description' => __( 'Create a listing category with full meta support. Checks if category exists before creating. Supports icon, image, order, listing types, and price units.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'name'        => [ 'type' => 'string', 'description' => __( 'Category name. Required.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'URL slug. Auto-generated from name if not provided.', 'classified-listing' ) ],
					'description' => [ 'type' => 'string', 'description' => __( 'Category description.', 'classified-listing' ) ],
					'parent'      => [ 'type' => 'integer', 'description' => __( 'Parent category ID. 0 = top-level.', 'classified-listing' ) ],
					'order'       => [ 'type' => 'integer', 'description' => __( 'Display order (lower = first).', 'classified-listing' ) ],
					'icon'        => [ 'type' => 'string', 'description' => __( 'FontAwesome icon class (e.g., "fa-car").', 'classified-listing' ) ],
					'image_id'    => [ 'type' => 'integer', 'description' => __( 'Featured image attachment ID.', 'classified-listing' ) ],
					'types'       => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Allowed listing types: sell, buy, exchange, job, to_let.', 'classified-listing' ),
					],
					'price_units' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Allowed price units: year, month, week, day, hour, sqft, total.', 'classified-listing' ),
					],
				],
				'required' => [ 'name' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id' => [ 'type' => 'integer' ],
					'name'    => [ 'type' => 'string' ],
					'slug'    => [ 'type' => 'string' ],
					'parent'  => [ 'type' => 'integer' ],
					'exists'  => [ 'type' => 'boolean', 'description' => __( 'True if category already existed.', 'classified-listing' ) ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->createTerm( rtcl()->category, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerUpdateCategory() {
		wp_register_ability( 'rtcl/update-category', [
			'label'       => __( 'Update Category', 'classified-listing' ),
			'description' => __( 'Update an existing category. Supports updating name, slug, description, parent, order, icon, image, types, and price_units.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id'     => [ 'type' => 'integer', 'description' => __( 'Category term ID. Required.', 'classified-listing' ) ],
					'name'        => [ 'type' => 'string', 'description' => __( 'New category name.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'New URL slug.', 'classified-listing' ) ],
					'description' => [ 'type' => 'string', 'description' => __( 'New description.', 'classified-listing' ) ],
					'parent'      => [ 'type' => 'integer', 'description' => __( 'New parent category ID.', 'classified-listing' ) ],
					'order'       => [ 'type' => 'integer', 'description' => __( 'Display order.', 'classified-listing' ) ],
					'icon'        => [ 'type' => 'string', 'description' => __( 'FontAwesome icon class.', 'classified-listing' ) ],
					'image'       => [
						'oneOf' => [
							[ 'type' => 'string', 'description' => __( 'Image URL, local path, or base64 data.', 'classified-listing' ) ],
							[ 'type' => 'integer', 'description' => __( 'Attachment ID.', 'classified-listing' ) ],
						],
						'description' => __( 'Category image (URL, path, base64, or attachment ID).', 'classified-listing' ),
					],
					'types'       => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Allowed listing types.', 'classified-listing' ),
					],
					'price_units' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Allowed price units.', 'classified-listing' ),
					],
				],
				'required' => [ 'term_id' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id' => [ 'type' => 'integer' ],
					'name'    => [ 'type' => 'string' ],
					'slug'    => [ 'type' => 'string' ],
					'parent'  => [ 'type' => 'integer' ],
					'updates' => [ 'type' => 'object', 'description' => __( 'Fields that were updated.', 'classified-listing' ) ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Term ID is required.', 'classified-listing' ) );
				}
				$service = new TaxonomyService();
				return $service->updateTerm( rtcl()->category, $term_id, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerDeleteCategory() {
		wp_register_ability( 'rtcl/delete-category', [
			'label'       => __( 'Delete Category', 'classified-listing' ),
			'description' => __( 'Permanently delete a listing category. WordPress categories do not have trash - deletion is permanent. Fails if category has listings or children unless force=true.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Category term ID. Required.', 'classified-listing' ),
					],
					'confirm_permanent' => [
						'type'        => 'boolean',
						'description' => __( 'Confirm permanent deletion. Categories cannot be recovered after deletion.', 'classified-listing' ),
					],
					'force' => [
						'type'        => 'boolean',
						'description' => __( 'Force delete even if category has listings or children. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'term_id' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'            => [ 'type' => 'integer' ],
					'name'               => [ 'type' => 'string' ],
					'slug'               => [ 'type' => 'string' ],
					'affected_listings'  => [ 'type' => 'integer', 'description' => __( 'Number of listings that lost this category.', 'classified-listing' ) ],
					'orphaned_image_id'  => [ 'type' => 'integer', 'description' => __( 'Category image attachment ID (not deleted).', 'classified-listing' ) ],
					'message'            => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Category term ID is required.', 'classified-listing' ) );
				}

				// If confirm_permanent is explicitly false, cancel
				if ( array_key_exists( 'confirm_permanent', $input ) && empty( $input['confirm_permanent'] ) ) {
					$term = get_term( $term_id, rtcl()->category );
					return [
						'cancelled' => true,
						'term_id'   => $term_id,
						'name'      => $term ? $term->name : '',
						'message'   => __( 'Category deletion cancelled.', 'classified-listing' ),
					];
				}

				// Proceed with deletion - user's request to delete is the confirmation
				$service = new TaxonomyService();
				return $service->deleteTerm( rtcl()->category, $term_id, [
					'force' => ! empty( $input['force'] ),
				] );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => true, 'idempotent' => false ],
			],
		] );
	}

	private static function registerSetCategoryImage() {
		wp_register_ability( 'rtcl/set-category-image', [
			'label'       => __( 'Set Category Image', 'classified-listing' ),
			'description' => __( 'Set or update the image for a category. Supports external URL, local server path, base64 data, or existing attachment ID. Images are resized to max 450px width while maintaining aspect ratio.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Category term ID. Required.', 'classified-listing' ),
					],
					'image' => [
						'oneOf' => [
							[ 'type' => 'string', 'description' => __( 'Image URL, local path, or base64 data.', 'classified-listing' ) ],
							[ 'type' => 'integer', 'description' => __( 'Existing WordPress attachment ID.', 'classified-listing' ) ],
						],
						'description' => __( 'Image source: URL (https://...), local path (/path/to/image.jpg), base64 data (data:image/...), or attachment ID.', 'classified-listing' ),
					],
				],
				'required' => [ 'term_id', 'image' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'           => [ 'type' => 'integer', 'description' => __( 'Category term ID.', 'classified-listing' ) ],
					'taxonomy'          => [ 'type' => 'string', 'description' => __( 'Taxonomy slug.', 'classified-listing' ) ],
					'name'              => [ 'type' => 'string', 'description' => __( 'Category name.', 'classified-listing' ) ],
					'attachment_id'     => [ 'type' => 'integer', 'description' => __( 'New attachment ID.', 'classified-listing' ) ],
					'url'               => [ 'type' => 'string', 'description' => __( 'New image URL.', 'classified-listing' ) ],
					'dimensions'        => [
						'type'       => 'object',
						'properties' => [
							'width'  => [ 'type' => 'integer' ],
							'height' => [ 'type' => 'integer' ],
						],
					],
					'old_attachment_id' => [ 'type' => 'integer', 'description' => __( 'Previous attachment ID (if any).', 'classified-listing' ) ],
					'old_url'           => [ 'type' => 'string', 'description' => __( 'Previous image URL (if any).', 'classified-listing' ) ],
					'message'           => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				$image = $input['image'] ?? '';

				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Category term ID is required.', 'classified-listing' ) );
				}
				if ( empty( $image ) ) {
					return new \WP_Error( 'missing_image', __( 'Image is required.', 'classified-listing' ) );
				}

				$service = new TaxonomyService();
				return $service->setTermImage( rtcl()->category, $term_id, $image );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerSetCategoryIcon() {
		wp_register_ability( 'rtcl/set-category-icon', [
			'label'       => __( 'Set Category Icon', 'classified-listing' ),
			'description' => __( 'Set or update the FontAwesome icon class for a category (stored in _rtcl_icon meta). This is the icon displayed in category listings, not the map marker icon.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Category term ID. Required.', 'classified-listing' ),
					],
					'icon' => [
						'type'        => 'string',
						'description' => __( 'FontAwesome icon class (e.g., "fa-car", "fa-home", "fa-briefcase"). Required.', 'classified-listing' ),
					],
				],
				'required' => [ 'term_id', 'icon' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'  => [ 'type' => 'integer', 'description' => __( 'Category term ID.', 'classified-listing' ) ],
					'name'     => [ 'type' => 'string', 'description' => __( 'Category name.', 'classified-listing' ) ],
					'icon'     => [ 'type' => 'string', 'description' => __( 'New FontAwesome icon class.', 'classified-listing' ) ],
					'old_icon' => [ 'type' => 'string', 'description' => __( 'Previous icon class (if any).', 'classified-listing' ) ],
					'message'  => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				$icon = TaxonomyService::sanitizeIconClass( $input['icon'] ?? '' );

				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Category term ID is required.', 'classified-listing' ) );
				}
				if ( empty( $icon ) ) {
					return new \WP_Error( 'missing_icon', __( 'Icon class is required.', 'classified-listing' ) );
				}

				$term = get_term( $term_id, rtcl()->category );
				if ( ! $term || is_wp_error( $term ) ) {
					return new \WP_Error( 'term_not_found', __( 'Category not found.', 'classified-listing' ) );
				}

				// Check admin capability
				if ( ! current_user_can( 'manage_options' ) ) {
					return new \WP_Error( 'permission_denied', __( 'Administrator access required.', 'classified-listing' ) );
				}

				// Get old icon
				$old_icon = get_term_meta( $term_id, '_rtcl_icon', true );

				// Update icon
				update_term_meta( $term_id, '_rtcl_icon', $icon );

				$result = [
					'term_id' => $term_id,
					'name'    => $term->name,
					'icon'    => $icon,
					'message' => __( 'Category icon set successfully.', 'classified-listing' ),
				];

				if ( $old_icon ) {
					$result['old_icon'] = $old_icon;
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerCreateCategoryHierarchy() {
		wp_register_ability( 'rtcl/create-category-hierarchy', [
			'label'       => __( 'Create Category Hierarchy', 'classified-listing' ),
			'description' => __( 'Create a category hierarchy from a path string like "Electronics > Phones > Smartphones". Creates missing categories, skips existing ones.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'path' => [
						'type'        => 'string',
						'description' => __( 'Category path using ">" separator (e.g., "Electronics > Phones > Smartphones").', 'classified-listing' ),
					],
					'options' => [
						'type'        => 'array',
						'description' => __( 'Per-level options array. Index 0 = first level, etc.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'icon'        => [ 'type' => 'string' ],
								'image_id'    => [ 'type' => 'integer' ],
								'order'       => [ 'type' => 'integer' ],
								'types'       => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
								'price_units' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
							],
						],
					],
				],
				'required' => [ 'path' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_ids' => [ 'type' => 'array', 'items' => [ 'type' => 'integer' ] ],
					'leaf_id'  => [ 'type' => 'integer', 'description' => __( 'The deepest category ID.', 'classified-listing' ) ],
					'message'  => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				$term_ids = $service->createHierarchyFromPath(
					rtcl()->category,
					$input['path'] ?? '',
					$input['options'] ?? []
				);

				return [
					'term_ids' => $term_ids,
					'leaf_id'  => ! empty( $term_ids ) ? end( $term_ids ) : null,
					'message'  => sprintf(
						__( 'Created/found %d categories in hierarchy.', 'classified-listing' ),
						count( $term_ids )
					),
				];
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerGetLocations() {
		wp_register_ability( 'rtcl/get-locations', [
			'label'       => __( 'Get Locations', 'classified-listing' ),
			'description' => __( 'Get listing locations with meta (image, order). Hierarchical (e.g., State > Metro > City > Neighborhood). Supports parent filter, search, and pagination.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'parent'           => [ 'type' => 'integer', 'description' => __( 'Parent location ID. 0 = top-level.', 'classified-listing' ) ],
					'include_children' => [ 'type' => 'boolean', 'description' => __( 'Include all descendants of parent. Default: false.', 'classified-listing' ) ],
					'search'           => [ 'type' => 'string', 'description' => __( 'Search by name.', 'classified-listing' ) ],
					'page'             => [ 'type' => 'integer', 'default' => 1 ],
					'per_page'         => [ 'type' => 'integer', 'default' => 50 ],
				],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'total' => [ 'type' => 'integer' ],
					'terms' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'          => [ 'type' => 'integer' ],
								'name'        => [ 'type' => 'string' ],
								'slug'        => [ 'type' => 'string' ],
								'parent'      => [ 'type' => 'integer' ],
								'count'       => [ 'type' => 'integer' ],
								'description' => [ 'type' => 'string' ],
								'order'       => [ 'type' => 'integer' ],
								'image_id'    => [ 'type' => 'integer' ],
								'image_url'   => [ 'type' => 'string' ],
							],
						],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->getTerms( rtcl()->location, $input );
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => true, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerCreateLocation() {
		wp_register_ability( 'rtcl/create-location', [
			'label'       => __( 'Create Location', 'classified-listing' ),
			'description' => __( 'Create a listing location with meta support. Checks if location exists before creating. Supports image and display order.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'name'        => [ 'type' => 'string', 'description' => __( 'Location name. Required.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'URL slug. Auto-generated from name if not provided.', 'classified-listing' ) ],
					'description' => [ 'type' => 'string', 'description' => __( 'Location description.', 'classified-listing' ) ],
					'parent'      => [ 'type' => 'integer', 'description' => __( 'Parent location ID. 0 = top-level (State/Country level).', 'classified-listing' ) ],
					'order'       => [ 'type' => 'integer', 'description' => __( 'Display order (lower = first).', 'classified-listing' ) ],
					'image_id'    => [ 'type' => 'integer', 'description' => __( 'Featured image attachment ID.', 'classified-listing' ) ],
				],
				'required' => [ 'name' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id' => [ 'type' => 'integer' ],
					'name'    => [ 'type' => 'string' ],
					'slug'    => [ 'type' => 'string' ],
					'parent'  => [ 'type' => 'integer' ],
					'exists'  => [ 'type' => 'boolean', 'description' => __( 'True if location already existed.', 'classified-listing' ) ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->createTerm( rtcl()->location, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerUpdateLocation() {
		wp_register_ability( 'rtcl/update-location', [
			'label'       => __( 'Update Location', 'classified-listing' ),
			'description' => __( 'Update an existing location. Supports updating name, slug, description, parent, order, and image.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id'     => [ 'type' => 'integer', 'description' => __( 'Location term ID. Required.', 'classified-listing' ) ],
					'name'        => [ 'type' => 'string', 'description' => __( 'New location name.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'New URL slug.', 'classified-listing' ) ],
					'description' => [ 'type' => 'string', 'description' => __( 'New description.', 'classified-listing' ) ],
					'parent'      => [ 'type' => 'integer', 'description' => __( 'New parent location ID.', 'classified-listing' ) ],
					'order'       => [ 'type' => 'integer', 'description' => __( 'Display order.', 'classified-listing' ) ],
					'image'       => [
						'oneOf' => [
							[ 'type' => 'string', 'description' => __( 'Image URL, local path, or base64 data.', 'classified-listing' ) ],
							[ 'type' => 'integer', 'description' => __( 'Attachment ID.', 'classified-listing' ) ],
						],
						'description' => __( 'Location image (URL, path, base64, or attachment ID).', 'classified-listing' ),
					],
				],
				'required' => [ 'term_id' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id' => [ 'type' => 'integer' ],
					'name'    => [ 'type' => 'string' ],
					'slug'    => [ 'type' => 'string' ],
					'parent'  => [ 'type' => 'integer' ],
					'updates' => [ 'type' => 'object', 'description' => __( 'Fields that were updated.', 'classified-listing' ) ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Term ID is required.', 'classified-listing' ) );
				}
				$service = new TaxonomyService();
				return $service->updateTerm( rtcl()->location, $term_id, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerDeleteLocation() {
		wp_register_ability( 'rtcl/delete-location', [
			'label'       => __( 'Delete Location', 'classified-listing' ),
			'description' => __( 'Permanently delete a listing location. WordPress locations do not have trash - deletion is permanent. Fails if location has listings or children unless force=true.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Location term ID. Required.', 'classified-listing' ),
					],
					'confirm_permanent' => [
						'type'        => 'boolean',
						'description' => __( 'Confirm permanent deletion. Locations cannot be recovered after deletion.', 'classified-listing' ),
					],
					'force' => [
						'type'        => 'boolean',
						'description' => __( 'Force delete even if location has listings or children. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'term_id' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'            => [ 'type' => 'integer' ],
					'name'               => [ 'type' => 'string' ],
					'slug'               => [ 'type' => 'string' ],
					'affected_listings'  => [ 'type' => 'integer', 'description' => __( 'Number of listings that lost this location.', 'classified-listing' ) ],
					'orphaned_image_id'  => [ 'type' => 'integer', 'description' => __( 'Location image attachment ID (not deleted).', 'classified-listing' ) ],
					'message'            => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Location term ID is required.', 'classified-listing' ) );
				}

				// If confirm_permanent is explicitly false, cancel
				if ( array_key_exists( 'confirm_permanent', $input ) && empty( $input['confirm_permanent'] ) ) {
					$term = get_term( $term_id, rtcl()->location );
					return [
						'cancelled' => true,
						'term_id'   => $term_id,
						'name'      => $term ? $term->name : '',
						'message'   => __( 'Location deletion cancelled.', 'classified-listing' ),
					];
				}

				// Proceed with deletion - user's request to delete is the confirmation
				$service = new TaxonomyService();
				return $service->deleteTerm( rtcl()->location, $term_id, [
					'force' => ! empty( $input['force'] ),
				] );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => true, 'idempotent' => false ],
			],
		] );
	}

	private static function registerSetLocationImage() {
		wp_register_ability( 'rtcl/set-location-image', [
			'label'       => __( 'Set Location Image', 'classified-listing' ),
			'description' => __( 'Set or update the image for a location. Supports external URL, local server path, base64 data, or existing attachment ID. Images are resized to max 450px width while maintaining aspect ratio.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Location term ID. Required.', 'classified-listing' ),
					],
					'image' => [
						'oneOf' => [
							[ 'type' => 'string', 'description' => __( 'Image URL, local path, or base64 data.', 'classified-listing' ) ],
							[ 'type' => 'integer', 'description' => __( 'Existing WordPress attachment ID.', 'classified-listing' ) ],
						],
						'description' => __( 'Image source: URL (https://...), local path (/path/to/image.jpg), base64 data (data:image/...), or attachment ID.', 'classified-listing' ),
					],
				],
				'required' => [ 'term_id', 'image' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'           => [ 'type' => 'integer', 'description' => __( 'Location term ID.', 'classified-listing' ) ],
					'taxonomy'          => [ 'type' => 'string', 'description' => __( 'Taxonomy slug.', 'classified-listing' ) ],
					'name'              => [ 'type' => 'string', 'description' => __( 'Location name.', 'classified-listing' ) ],
					'attachment_id'     => [ 'type' => 'integer', 'description' => __( 'New attachment ID.', 'classified-listing' ) ],
					'url'               => [ 'type' => 'string', 'description' => __( 'New image URL.', 'classified-listing' ) ],
					'dimensions'        => [
						'type'       => 'object',
						'properties' => [
							'width'  => [ 'type' => 'integer' ],
							'height' => [ 'type' => 'integer' ],
						],
					],
					'old_attachment_id' => [ 'type' => 'integer', 'description' => __( 'Previous attachment ID (if any).', 'classified-listing' ) ],
					'old_url'           => [ 'type' => 'string', 'description' => __( 'Previous image URL (if any).', 'classified-listing' ) ],
					'message'           => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				$image = $input['image'] ?? '';

				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Location term ID is required.', 'classified-listing' ) );
				}
				if ( empty( $image ) ) {
					return new \WP_Error( 'missing_image', __( 'Image is required.', 'classified-listing' ) );
				}

				$service = new TaxonomyService();
				return $service->setTermImage( rtcl()->location, $term_id, $image );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerCreateLocationHierarchy() {
		wp_register_ability( 'rtcl/create-location-hierarchy', [
			'label'       => __( 'Create Location Hierarchy', 'classified-listing' ),
			'description' => __( 'Create a location hierarchy from a path string like "California > Los Angeles > Downtown". Creates missing locations, skips existing ones. Respects location depth limit (default 3 levels).', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'path' => [
						'type'        => 'string',
						'description' => __( 'Location path using ">" separator (e.g., "California > Los Angeles > Downtown").', 'classified-listing' ),
					],
					'options' => [
						'type'        => 'array',
						'description' => __( 'Per-level options array. Index 0 = first level (State), etc.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'image_id' => [ 'type' => 'integer' ],
								'order'    => [ 'type' => 'integer' ],
							],
						],
					],
				],
				'required' => [ 'path' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_ids' => [ 'type' => 'array', 'items' => [ 'type' => 'integer' ] ],
					'leaf_id'  => [ 'type' => 'integer', 'description' => __( 'The deepest location ID.', 'classified-listing' ) ],
					'message'  => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				$term_ids = $service->createHierarchyFromPath(
					rtcl()->location,
					$input['path'] ?? '',
					$input['options'] ?? []
				);

				return [
					'term_ids' => $term_ids,
					'leaf_id'  => ! empty( $term_ids ) ? end( $term_ids ) : null,
					'message'  => sprintf(
						__( 'Created/found %d locations in hierarchy.', 'classified-listing' ),
						count( $term_ids )
					),
				];
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerGetTags() {
		wp_register_ability( 'rtcl/get-tags', [
			'label'       => __( 'Get Tags', 'classified-listing' ),
			'description' => __( 'Get listing tags with optional search and pagination. Tags are flat (non-hierarchical).', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'search'   => [ 'type' => 'string', 'description' => __( 'Search by name.', 'classified-listing' ) ],
					'page'     => [ 'type' => 'integer', 'default' => 1 ],
					'per_page' => [ 'type' => 'integer', 'default' => 50 ],
				],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'total' => [ 'type' => 'integer' ],
					'terms' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'    => [ 'type' => 'integer' ],
								'name'  => [ 'type' => 'string' ],
								'slug'  => [ 'type' => 'string' ],
								'count' => [ 'type' => 'integer' ],
							],
						],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->getTerms( rtcl()->tag, $input );
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => true, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerCreateTag() {
		wp_register_ability( 'rtcl/create-tag', [
			'label'       => __( 'Create Tag', 'classified-listing' ),
			'description' => __( 'Create a listing tag. Checks if tag exists before creating (by name or slug).', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'name'        => [ 'type' => 'string', 'description' => __( 'Tag name. Required.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'URL slug. Auto-generated from name if not provided.', 'classified-listing' ) ],
					'description' => [ 'type' => 'string', 'description' => __( 'Tag description.', 'classified-listing' ) ],
				],
				'required' => [ 'name' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id' => [ 'type' => 'integer' ],
					'name'    => [ 'type' => 'string' ],
					'slug'    => [ 'type' => 'string' ],
					'exists'  => [ 'type' => 'boolean', 'description' => __( 'True if tag already existed.', 'classified-listing' ) ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new TaxonomyService();
				return $service->createTerm( rtcl()->tag, $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}

	private static function registerDeleteTag() {
		wp_register_ability( 'rtcl/delete-tag', [
			'label'       => __( 'Delete Tag', 'classified-listing' ),
			'description' => __( 'Permanently delete a listing tag. WordPress tags do not have trash - deletion is permanent. Fails if tag has listings unless force=true.', 'classified-listing' ),
			'category'    => 'rtcl-taxonomies',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'term_id' => [
						'type'        => 'integer',
						'description' => __( 'Tag term ID. Required.', 'classified-listing' ),
					],
					'confirm_permanent' => [
						'type'        => 'boolean',
						'description' => __( 'Confirm permanent deletion. Tags cannot be recovered after deletion.', 'classified-listing' ),
					],
					'force' => [
						'type'        => 'boolean',
						'description' => __( 'Force delete even if tag has listings. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'term_id' ],
			],
			'output_schema' => [
				'type' => 'object',
				'properties' => [
					'term_id'           => [ 'type' => 'integer' ],
					'name'              => [ 'type' => 'string' ],
					'slug'              => [ 'type' => 'string' ],
					'affected_listings' => [ 'type' => 'integer', 'description' => __( 'Number of listings that lost this tag.', 'classified-listing' ) ],
					'message'           => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$term_id = absint( $input['term_id'] ?? 0 );
				if ( ! $term_id ) {
					return new \WP_Error( 'missing_term_id', __( 'Tag term ID is required.', 'classified-listing' ) );
				}

				// If confirm_permanent is explicitly false, cancel
				if ( array_key_exists( 'confirm_permanent', $input ) && empty( $input['confirm_permanent'] ) ) {
					$term = get_term( $term_id, rtcl()->tag );
					return [
						'cancelled' => true,
						'term_id'   => $term_id,
						'name'      => $term ? $term->name : '',
						'message'   => __( 'Tag deletion cancelled.', 'classified-listing' ),
					];
				}

				// Proceed with deletion - user's request to delete is the confirmation
				$service = new TaxonomyService();
				return $service->deleteTerm( rtcl()->tag, $term_id, [
					'force' => ! empty( $input['force'] ),
				] );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => false, 'destructive' => true, 'idempotent' => false ],
			],
		] );
	}
}
