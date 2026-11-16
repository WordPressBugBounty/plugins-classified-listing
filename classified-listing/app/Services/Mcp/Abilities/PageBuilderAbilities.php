<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Services\PageBuilderService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers page builder abilities for creating and managing pages.
 */
class PageBuilderAbilities {

	public static function register() {
		// Page management
		self::registerCreatePage();
		self::registerGetPage();
		self::registerUpdatePage();
		self::registerDeletePage();
		self::registerListPages();
		self::registerAddBlocksToPage();
		self::registerGetPageTemplates();

		// Page layout/meta settings (theme-specific)
		self::registerCheckPageMetaAvailability();
		self::registerGetPageLayoutOptions();
		self::registerGetPageLayoutSettings();
		self::registerUpdatePageLayoutSettings();

		// Gutenberg/Block specific
		self::registerGetAvailableBlocks();
		self::registerGetAllBlocks();
		self::registerGetBlockStyleOptions();
		self::registerCreateGutenbergPage();

		// Elementor specific
		self::registerCheckElementorAvailability();
		self::registerGetAvailableElementorWidgets();
		self::registerGetDefaultElementorWidgetsSchema();
		self::registerGetRtclElementorWidgetsSchema();
		self::registerGetAllElementorWidgetsSchema();
		self::registerGetWidgetStyleOptions();
		self::registerGetSectionPresets();
		self::registerGetStylingOptions();
		self::registerCreateElementorPage();
		self::registerAddElementorWidgetsToPage();
		self::registerGetPageTemplates_Elementor();
	}

	/**
	 * Register ability to create a page.
	 */
	private static function registerCreatePage() {
		wp_register_ability( 'rtcl/create-page', [
			'label'       => __( 'Create Page', 'classified-listing' ),
			'description' => __( 'Create a new WordPress page. Supports plain content or Gutenberg blocks. Use this for creating any type of page including landing pages, about pages, contact pages, etc.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Page title (required).', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Page slug/permalink (optional, auto-generated from title).', 'classified-listing' ),
					],
					'content' => [
						'type'        => 'string',
						'description' => __( 'Page content (HTML or plain text). Use blocks parameter for Gutenberg blocks.', 'classified-listing' ),
					],
					'blocks' => [
						'type'        => 'array',
						'description' => __( 'Gutenberg blocks array. Each block has name and attributes.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'description' => __( 'Page status: publish, draft, pending, private (default: publish).', 'classified-listing' ),
						'enum'        => [ 'publish', 'draft', 'pending', 'private' ],
					],
					'template' => [
						'type'        => 'string',
						'description' => __( 'Page template file name (optional).', 'classified-listing' ),
					],
					'parent_id' => [
						'type'        => 'integer',
						'description' => __( 'Parent page ID for hierarchical pages (optional).', 'classified-listing' ),
					],
					'featured_image_id' => [
						'type'        => 'integer',
						'description' => __( 'Featured image attachment ID (optional).', 'classified-listing' ),
					],
				],
				'required' => [ 'title' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'  => [ 'type' => 'integer' ],
					'title'    => [ 'type' => 'string' ],
					'slug'     => [ 'type' => 'string' ],
					'url'      => [ 'type' => 'string' ],
					'edit_url' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->createPage( $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get a page.
	 */
	private static function registerGetPage() {
		wp_register_ability( 'rtcl/get-page', [
			'label'       => __( 'Get Page', 'classified-listing' ),
			'description' => __( 'Get details of a WordPress page by ID. Returns title, content, status, URL, template, and metadata.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to retrieve.', 'classified-listing' ),
					],
				],
				'required' => [ 'page_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [ 'type' => 'integer' ],
					'title'   => [ 'type' => 'string' ],
					'content' => [ 'type' => 'string' ],
					'status'  => [ 'type' => 'string' ],
					'url'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->getPage( absint( $input['page_id'] ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to update a page.
	 */
	private static function registerUpdatePage() {
		wp_register_ability( 'rtcl/update-page', [
			'label'       => __( 'Update Page', 'classified-listing' ),
			'description' => __( 'Update an existing WordPress page. Can modify title, content, slug, status, template, and more. Use blocks parameter to replace content with Gutenberg blocks.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to update (required).', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'New page title.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'New page slug.', 'classified-listing' ),
					],
					'content' => [
						'type'        => 'string',
						'description' => __( 'New page content.', 'classified-listing' ),
					],
					'blocks' => [
						'type'        => 'array',
						'description' => __( 'Gutenberg blocks to replace content with.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'description' => __( 'New page status.', 'classified-listing' ),
						'enum'        => [ 'publish', 'draft', 'pending', 'private', 'trash' ],
					],
					'template' => [
						'type'        => 'string',
						'description' => __( 'Page template.', 'classified-listing' ),
					],
					'parent_id' => [
						'type'        => 'integer',
						'description' => __( 'Parent page ID.', 'classified-listing' ),
					],
					'menu_order' => [
						'type'        => 'integer',
						'description' => __( 'Menu order for sorting.', 'classified-listing' ),
					],
				],
				'required' => [ 'page_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [ 'type' => 'integer' ],
					'title'   => [ 'type' => 'string' ],
					'url'     => [ 'type' => 'string' ],
					'message' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$page_id = absint( $input['page_id'] );
				unset( $input['page_id'] );
				return $service->updatePage( $page_id, $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to delete a page.
	 */
	private static function registerDeletePage() {
		wp_register_ability( 'rtcl/delete-page', [
			'label'       => __( 'Delete Page', 'classified-listing' ),
			'description' => __( 'Delete a WordPress page. By default moves to trash. Use force_delete=true for permanent deletion.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to delete (required).', 'classified-listing' ),
					],
					'force_delete' => [
						'type'        => 'boolean',
						'description' => __( 'Permanently delete instead of trashing (default: false).', 'classified-listing' ),
					],
				],
				'required' => [ 'page_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'deleted'      => [ 'type' => 'boolean' ],
					'page_id'      => [ 'type' => 'integer' ],
					'title'        => [ 'type' => 'string' ],
					'force_delete' => [ 'type' => 'boolean' ],
					'message'      => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->deletePage(
					absint( $input['page_id'] ),
					! empty( $input['force_delete'] )
				);
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => false,
				],
			],
		] );
	}

	/**
	 * Register ability to list pages.
	 */
	private static function registerListPages() {
		wp_register_ability( 'rtcl/list-pages', [
			'label'       => __( 'List Pages', 'classified-listing' ),
			'description' => __( 'Get a list of WordPress pages with filtering and pagination. Use this to find existing pages before creating or modifying.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'status' => [
						'type'        => 'string',
						'description' => __( 'Filter by status: publish, draft, pending, private, trash, any (default: any).', 'classified-listing' ),
					],
					'search' => [
						'type'        => 'string',
						'description' => __( 'Search pages by title or content.', 'classified-listing' ),
					],
					'parent_id' => [
						'type'        => 'integer',
						'description' => __( 'Filter by parent page ID.', 'classified-listing' ),
					],
					'per_page' => [
						'type'        => 'integer',
						'description' => __( 'Results per page (default: 20, max: 100).', 'classified-listing' ),
					],
					'page' => [
						'type'        => 'integer',
						'description' => __( 'Page number for pagination (default: 1).', 'classified-listing' ),
					],
					'orderby' => [
						'type'        => 'string',
						'description' => __( 'Order by: date, title, menu_order, modified (default: date).', 'classified-listing' ),
					],
					'order' => [
						'type'        => 'string',
						'description' => __( 'Sort order: ASC, DESC (default: DESC).', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'pages'        => [ 'type' => 'array' ],
					'total'        => [ 'type' => 'integer' ],
					'total_pages'  => [ 'type' => 'integer' ],
					'current_page' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->listPages( $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to add blocks to an existing page.
	 */
	private static function registerAddBlocksToPage() {
		wp_register_ability( 'rtcl/add-blocks-to-page', [
			'label'       => __( 'Add Blocks to Page', 'classified-listing' ),
			'description' => __( 'Add Gutenberg blocks to an existing page. Can append, prepend, or replace existing content. Use this to add RTCL blocks like listings, categories, search forms to any page.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to modify (required).', 'classified-listing' ),
					],
					'blocks' => [
						'type'        => 'array',
						'description' => __( 'Blocks to add. Each block has name and attributes.', 'classified-listing' ),
					],
					'position' => [
						'type'        => 'string',
						'description' => __( 'Where to add blocks: append (end), prepend (beginning), replace (default: append).', 'classified-listing' ),
						'enum'        => [ 'append', 'prepend', 'replace' ],
					],
				],
				'required' => [ 'page_id', 'blocks' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'     => [ 'type' => 'integer' ],
					'block_count' => [ 'type' => 'integer' ],
					'message'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->addBlocksToPage(
					absint( $input['page_id'] ),
					$input['blocks'],
					$input['position'] ?? 'append'
				);
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get available page templates.
	 */
	private static function registerGetPageTemplates() {
		wp_register_ability( 'rtcl/get-page-templates', [
			'label'       => __( 'Get Available Page Templates', 'classified-listing' ),
			'description' => __( 'Get a list of all available page templates from the current WordPress theme and plugins. Returns template file names and labels. Use this to discover what templates are available before creating or updating pages. Common templates include: default, full-width, blank/canvas templates from themes and page builders.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'post_type' => [
						'type'        => 'string',
						'description' => __( 'Post type to get templates for (default: page).', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'templates' => [ 'type' => 'array' ],
					'theme'     => [ 'type' => 'string' ],
					'count'     => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$post_type = $input['post_type'] ?? 'page';
				$result = $service->getPageTemplates( $post_type );

				$result['message'] = sprintf(
					__( 'Found %d page templates from theme "%s".', 'classified-listing' ),
					$result['count'],
					$result['theme']
				);

				return $result;
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to check page meta availability.
	 */
	private static function registerCheckPageMetaAvailability() {
		wp_register_ability( 'rtcl/check-page-meta-availability', [
			'label'       => __( 'Check Page Meta Availability', 'classified-listing' ),
			'description' => __( 'Check if page layout meta settings are available for the current theme. Returns theme info, supported status, and meta key prefix. Use this before attempting to get or update page layout settings to verify compatibility. Supported themes include Classima, Flavor, StarterX and other RadiusTheme themes.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'available'        => [ 'type' => 'boolean' ],
					'theme'            => [ 'type' => 'string' ],
					'prefix'           => [ 'type' => 'string' ],
					'supported_themes' => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$result = $service->checkMetaBoxAvailability();
				$result['message'] = $result['available']
					? sprintf( __( 'Page meta settings are available for theme "%s" with prefix "%s".', 'classified-listing' ), $result['theme'], $result['prefix'] )
					: sprintf( __( 'Page meta settings are NOT available for theme "%s". Supported themes: %s', 'classified-listing' ), $result['theme'], implode( ', ', $result['supported_themes'] ) );
				return $result;
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get available page layout options.
	 */
	private static function registerGetPageLayoutOptions() {
		wp_register_ability( 'rtcl/get-page-layout-options', [
			'label'       => __( 'Get Page Layout Options', 'classified-listing' ),
			'description' => __( 'Get all available page layout options from the active theme. Returns the schema of settings that can be configured per page including: layout (full-width, left-sidebar, right-sidebar), transparent header, top bar, header style (1-10), footer style (1-2), banner (on/off), breadcrumb (on/off), banner search, background type/image/color. Works with RadiusTheme themes like Classima, Flavor, StarterX.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'options' => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$options = $service->getPageLayoutOptions();
				return [
					'options' => $options,
					'count'   => count( $options ),
					'message' => __( 'Available page layout options retrieved.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get page layout settings.
	 */
	private static function registerGetPageLayoutSettings() {
		wp_register_ability( 'rtcl/get-page-layout-settings', [
			'label'       => __( 'Get Page Layout Settings', 'classified-listing' ),
			'description' => __( 'Get current layout settings for a specific page. Returns values for: layout, sidebar, transparent header, top bar, header style, footer style, banner, breadcrumb, banner search, background type/image/color. Also returns has_settings (bool) indicating if the page has custom settings. Works with RadiusTheme themes (Classima, Flavor, StarterX).', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to get settings for (required).', 'classified-listing' ),
					],
				],
				'required' => [ 'page_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'  => [ 'type' => 'integer' ],
					'title'    => [ 'type' => 'string' ],
					'settings' => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->getPageLayoutSettings( absint( $input['page_id'] ) );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to update page layout settings.
	 */
	private static function registerUpdatePageLayoutSettings() {
		wp_register_ability( 'rtcl/update-page-layout-settings', [
			'label'       => __( 'Update Page Layout Settings', 'classified-listing' ),
			'description' => __( 'Update layout settings for a page. Available settings: layout (default/full-width/left-sidebar/right-sidebar), tr_header (default/on/off), top_bar (default/on/off), header_style (default/1-10), footer_style (default/1/2), banner (default/on/off), breadcrumb (default/on/off), banner_search (default/on/off), bgtype (default/bgimg/bgcolor), bgcolor (hex color). To disable breadcrumb use breadcrumb="off". Works with RadiusTheme themes (Classima, Flavor, StarterX). Use rtcl/check-page-meta-availability first to verify theme support.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to update (required).', 'classified-listing' ),
					],
					'layout' => [
						'type'        => 'string',
						'description' => __( 'Page layout: default, full-width, left-sidebar, right-sidebar.', 'classified-listing' ),
						'enum'        => [ 'default', 'full-width', 'left-sidebar', 'right-sidebar' ],
					],
					'tr_header' => [
						'type'        => 'string',
						'description' => __( 'Transparent header: default, on, off.', 'classified-listing' ),
						'enum'        => [ 'default', 'on', 'off' ],
					],
					'top_bar' => [
						'type'        => 'string',
						'description' => __( 'Top bar: default, on, off.', 'classified-listing' ),
						'enum'        => [ 'default', 'on', 'off' ],
					],
					'header_style' => [
						'type'        => 'string',
						'description' => __( 'Header layout style: default, 1-10.', 'classified-listing' ),
					],
					'footer_style' => [
						'type'        => 'string',
						'description' => __( 'Footer style: default, 1, 2.', 'classified-listing' ),
						'enum'        => [ 'default', '1', '2' ],
					],
					'banner' => [
						'type'        => 'string',
						'description' => __( 'Banner visibility: default, on, off.', 'classified-listing' ),
						'enum'        => [ 'default', 'on', 'off' ],
					],
					'breadcrumb' => [
						'type'        => 'string',
						'description' => __( 'Breadcrumb visibility: default, on, off. Use "off" to disable breadcrumb.', 'classified-listing' ),
						'enum'        => [ 'default', 'on', 'off' ],
					],
					'banner_search' => [
						'type'        => 'string',
						'description' => __( 'Banner search: default, on, off.', 'classified-listing' ),
						'enum'        => [ 'default', 'on', 'off' ],
					],
					'bgtype' => [
						'type'        => 'string',
						'description' => __( 'Banner background type: default, bgimg, bgcolor.', 'classified-listing' ),
						'enum'        => [ 'default', 'bgimg', 'bgcolor' ],
					],
					'bgcolor' => [
						'type'        => 'string',
						'description' => __( 'Banner background color (hex code).', 'classified-listing' ),
					],
					'bgimg' => [
						'type'        => 'integer',
						'description' => __( 'Banner background image attachment ID.', 'classified-listing' ),
					],
					'sidebar' => [
						'type'        => 'string',
						'description' => __( 'Custom sidebar slug.', 'classified-listing' ),
					],
				],
				'required' => [ 'page_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'  => [ 'type' => 'integer' ],
					'updated'  => [ 'type' => 'object' ],
					'message'  => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$page_id = absint( $input['page_id'] );
				unset( $input['page_id'] );
				return $service->updatePageLayoutSettings( $page_id, $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get available Gutenberg blocks.
	 */
	private static function registerGetAvailableBlocks() {
		wp_register_ability( 'rtcl/get-available-blocks', [
			'label'       => __( 'Get Available RTCL Gutenberg Blocks', 'classified-listing' ),
			'description' => __( 'Get all RTCL Gutenberg blocks with complete attribute schemas. Available blocks: rtcl/listing-ads (listings grid/list with perPage, col_desktop, orderby, sortby, cats, locations, listing_type, content_visibility), rtcl/listing-cat-box (category boxes with category_limit, col_desktop, orderby, icon_type, hide_empty, content_visibility), rtcl/listing-search (search form with search_style, keyword_field, location_field, category_field, types_field, price_field), rtcl/all-location (locations list with location_limit, show_count, show_sub_location), rtcl/single-location (single location display), rtcl/listing-ads-slider (pro - carousel), rtcl/listing-cat-box-slider (pro - category carousel), rtcl/listing-store (pro - stores/vendors), rtcl/pricing-table (pro - pricing cards).', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'blocks' => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return [
					'blocks'  => $service->getAvailableGutenbergBlocks(),
					'message' => __( 'Available Gutenberg blocks retrieved successfully.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get ALL registered blocks with filtering.
	 */
	private static function registerGetAllBlocks() {
		wp_register_ability( 'rtcl/get-all-blocks', [
			'label'       => __( 'Get All Registered Blocks', 'classified-listing' ),
			'description' => __( 'Get a list of ALL registered Gutenberg blocks in WordPress with optional filtering. Use filter parameter to narrow results: "all" for all blocks, "core" for WordPress core blocks, "rtcl" for Classified Listing blocks, or any custom prefix like "woocommerce". Returns block names, titles, descriptions, categories, and complete attribute schemas. Use this to discover what blocks are available system-wide before building pages.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter' => [
						'type'        => 'string',
						'description' => __( 'Filter blocks by prefix: "all" (default), "core", "rtcl", or any block prefix.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'blocks' => [ 'type' => 'array' ],
					'count'  => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$filter = $input['filter'] ?? 'all';
				$blocks = $service->getRegisteredBlocks( $filter );
				return [
					'blocks'  => $blocks,
					'count'   => count( $blocks ),
					'filter'  => $filter,
					'message' => sprintf(
						__( 'Found %d registered blocks with filter "%s".', 'classified-listing' ),
						count( $blocks ),
						$filter
					),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get block style options for user selection.
	 */
	private static function registerGetBlockStyleOptions() {
		wp_register_ability( 'rtcl/get-block-style-options', [
			'label'       => __( 'Get Block Style Options', 'classified-listing' ),
			'description' => __( 'Get available layout and style options for RTCL Gutenberg blocks. Use this to prompt users for their preferred display style before creating pages. Returns user-friendly options with labels, descriptions, and recommended defaults. Blocks with style options: rtcl/listing-ads (grid/list view, columns, items count), rtcl/listing-cat-box (5 box styles, columns, icon type), rtcl/listing-search (inline/vertical layout), rtcl/all-location (grid/list, count).', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'block_name' => [
						'type'        => 'string',
						'description' => __( 'Specific block name to get options for (e.g., "rtcl/listing-ads"). Leave empty for all blocks.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'blocks' => [
						'type'        => 'object',
						'description' => 'Style options organized by block name',
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$block_name = $input['block_name'] ?? '';
				$options = $service->getBlockStyleOptions( $block_name );

				if ( $block_name && ! empty( $options ) ) {
					return [
						'block'   => $block_name,
						'options' => $options,
						'message' => sprintf(
							__( 'Style options for %s. Ask user to select from available options before creating the page.', 'classified-listing' ),
							$options['label'] ?? $block_name
						),
					];
				}

				return [
					'blocks'  => $options,
					'count'   => count( $options ),
					'message' => __( 'Available style options for RTCL blocks. Present these choices to the user before creating pages.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to check Elementor availability.
	 */
	private static function registerCheckElementorAvailability() {
		wp_register_ability( 'rtcl/check-elementor-availability', [
			'label'       => __( 'Check Elementor Availability', 'classified-listing' ),
			'description' => __( 'Check if Elementor and related plugins are active. Returns Elementor status, version, Elementor Pro status, and RTCL Toolkits availability. Use this before attempting to create Elementor pages to verify the environment supports it.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'elementor_active'  => [ 'type' => 'boolean' ],
					'elementor_version' => [ 'type' => 'string' ],
					'elementor_pro'     => [ 'type' => 'boolean' ],
					'rtcl_toolkits'     => [ 'type' => 'boolean' ],
					'can_create_pages'  => [ 'type' => 'boolean' ],
					'message'           => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->checkElementorAvailability();
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get available Elementor widgets.
	 */
	private static function registerGetAvailableElementorWidgets() {
		wp_register_ability( 'rtcl/get-available-elementor-widgets', [
			'label'       => __( 'Get Available Elementor Widgets', 'classified-listing' ),
			'description' => __( 'Get a list of available Elementor widgets with optional filtering. Use filter parameter: "all" for all widgets, "rtcl" for Classified Listing widgets (default), "core" for Elementor core widgets, or any custom prefix.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'filter' => [
						'type'        => 'string',
						'description' => __( 'Filter widgets: "all", "rtcl" (default), "core", or any prefix.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'available' => [ 'type' => 'boolean' ],
					'filter'    => [ 'type' => 'string' ],
					'count'     => [ 'type' => 'integer' ],
					'widgets'   => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$filter = $input['filter'] ?? 'rtcl';
				return $service->getAvailableElementorWidgets( $filter );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get default Elementor widgets schema.
	 */
	private static function registerGetDefaultElementorWidgetsSchema() {
		wp_register_ability( 'rtcl/get-default-elementor-widgets-schema', [
			'label'       => __( 'Get Default Elementor Widgets Schema', 'classified-listing' ),
			'description' => __( 'Get schema of default Elementor widgets that can be used alongside RTCL widgets. Includes: heading, text-editor, button, image, video, icon, icon-box, image-box, spacer, divider, google-maps, icon-list, counter, progress, testimonial, tabs, accordion, toggle, social-icons, alert, html, shortcode, star-rating. Each widget includes settings with types, defaults, and options. Use these for building complete pages with layout and content elements.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'widgets' => [ 'type' => 'object' ],
					'count'   => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$widgets = $service->getDefaultElementorWidgetsSchema();
				return [
					'widgets' => $widgets,
					'count'   => count( $widgets ),
					'message' => __( 'Default Elementor widgets schema retrieved.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get RTCL Elementor widgets schema.
	 */
	private static function registerGetRtclElementorWidgetsSchema() {
		wp_register_ability( 'rtcl/get-rtcl-elementor-widgets-schema', [
			'label'       => __( 'Get RTCL Elementor Widgets Schema', 'classified-listing' ),
			'description' => __( 'Get detailed schema of all RTCL Elementor widgets with their settings. Widgets include: rtcl-listing-items (grid/list view with categories, locations, columns, orderby), rtcl-listing-cat-box (category boxes with icons, counts, subcategories), rtcl-all-locations (locations with sub-locations), rtcl-listing-search-form (search form), rtcl-listing-headerbtn (header buttons), rtcl-listing-slider (Pro - carousel), rtcl-listing-cat-slider (Pro - category carousel), rtcl-pricing-table (Pro - pricing tiers), rtcl-listing-store (Store - vendor display). Use this to understand available settings before creating Elementor pages.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'widgets' => [ 'type' => 'object' ],
					'count'   => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$widgets = $service->getRtclElementorWidgetsSchema();
				return [
					'widgets' => $widgets,
					'count'   => count( $widgets ),
					'message' => __( 'RTCL Elementor widgets schema retrieved.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get ALL Elementor widgets schema (default + RTCL).
	 */
	private static function registerGetAllElementorWidgetsSchema() {
		wp_register_ability( 'rtcl/get-all-elementor-widgets-schema', [
			'label'       => __( 'Get All Elementor Widgets Schema', 'classified-listing' ),
			'description' => __( 'Get complete schema of ALL available Elementor widgets: both default Elementor widgets (heading, text-editor, button, image, spacer, divider, icon-box, testimonial, tabs, accordion, etc.) AND RTCL widgets (listing-items, listing-cat-box, search-form, locations, stores, pricing-table, etc.). This is the recommended call before building Elementor pages - it gives you the full toolkit. Returns widgets organized by category with all settings, defaults, and options.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'default_widgets' => [ 'type' => 'object' ],
					'rtcl_widgets'    => [ 'type' => 'object' ],
					'total_count'     => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$result = $service->getAllElementorWidgetsSchema();
				$result['message'] = sprintf(
					__( 'All Elementor widgets schema retrieved: %d default widgets + %d RTCL widgets.', 'classified-listing' ),
					$result['default_widgets']['count'],
					$result['rtcl_widgets']['count']
				);
				return $result;
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get Elementor widget style options for user selection.
	 */
	private static function registerGetWidgetStyleOptions() {
		wp_register_ability( 'rtcl/get-widget-style-options', [
			'label'       => __( 'Get Widget Style Options', 'classified-listing' ),
			'description' => __( 'Get available layout and style options for RTCL Elementor widgets. IMPORTANT: Use this to prompt users for their preferred display style BEFORE creating pages. Returns user-friendly options with labels, descriptions, icons, and recommended defaults. Widgets with style options: rtcl-listing-items (Grid/List view, 4 card styles, columns, count), rtcl-listing-cat-box (5 box styles, columns, count), rtcl-listing-search-form (Horizontal/Vertical layout), rtcl-listing-slider (slides visible), rtcl-listing-store (store count). Present these choices to the user in a clear format.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'widget_name' => [
						'type'        => 'string',
						'description' => __( 'Specific widget name to get options for (e.g., "rtcl-listing-items"). Leave empty for all widgets.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'widgets' => [
						'type'        => 'object',
						'description' => 'Style options organized by widget name',
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				$widget_name = $input['widget_name'] ?? '';
				$options = $service->getWidgetStyleOptions( $widget_name );

				if ( $widget_name && ! empty( $options ) ) {
					// Format for user-friendly display
					$formatted_styles = [];
					foreach ( $options['styles'] ?? [] as $style_key => $style_config ) {
						$formatted_options = [];
						foreach ( $style_config['options'] ?? [] as $opt ) {
							$formatted_options[] = [
								'value'       => $opt['value'],
								'label'       => $opt['label'],
								'description' => $opt['description'] ?? '',
								'recommended' => $opt['recommended'] ?? false,
							];
						}
						$formatted_styles[ $style_key ] = [
							'question'    => $style_config['label'],
							'description' => $style_config['description'],
							'choices'     => $formatted_options,
						];
					}

					return [
						'widget'       => $widget_name,
						'widget_label' => $options['label'] ?? $widget_name,
						'description'  => $options['description'] ?? '',
						'style_choices' => $formatted_styles,
						'prompt_hint'  => __( 'Ask the user to choose from these options before creating the page. Highlight recommended options.', 'classified-listing' ),
					];
				}

				return [
					'widgets' => $options,
					'count'   => count( $options ),
					'message' => __( 'Available style options for RTCL Elementor widgets. Present these choices to the user before creating pages.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get section presets.
	 */
	private static function registerGetSectionPresets() {
		wp_register_ability( 'rtcl/get-section-presets', [
			'label'       => __( 'Get Section Presets', 'classified-listing' ),
			'description' => __( 'Get available section presets for styling Elementor page sections. Presets provide pre-configured backgrounds, padding, and layout settings. Use these with the "preset" key when creating pages. Available presets: "banner" (gradient purple-pink hero), "hero" (dark full-width), "cta" (light card with rounded corners), "cta_dark" (dark gradient CTA), "featured" (white boxed section), "section_light" (white background), "section_gray" (light gray background), "pricing" (light gray for pricing tables), "app_promo" (green gradient for app promotion), "dark" (dark background section).', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'presets' => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				return [
					'presets' => [
						'banner' => [
							'name'        => 'banner',
							'label'       => __( 'Banner / Hero Slider', 'classified-listing' ),
							'description' => __( 'Full-width gradient hero section (purple-pink). Ideal for sliders, hero text, CTAs.', 'classified-listing' ),
							'background'  => 'gradient (#667eea → #764ba2)',
							'padding'     => '60px top/bottom',
						],
						'hero' => [
							'name'        => 'hero',
							'label'       => __( 'Dark Hero', 'classified-listing' ),
							'description' => __( 'Dark full-width hero section. Great for impactful headlines.', 'classified-listing' ),
							'background'  => 'solid (#1a1a2e)',
							'padding'     => '80px top/bottom',
						],
						'featured' => [
							'name'        => 'featured',
							'label'       => __( 'Featured Content', 'classified-listing' ),
							'description' => __( 'White boxed section for featured listings, products.', 'classified-listing' ),
							'background'  => 'solid (#ffffff)',
							'padding'     => '60px top/bottom',
						],
						'section_light' => [
							'name'        => 'section_light',
							'label'       => __( 'Light Section', 'classified-listing' ),
							'description' => __( 'Clean white section for general content.', 'classified-listing' ),
							'background'  => 'solid (#ffffff)',
							'padding'     => '60px top/bottom',
						],
						'section_gray' => [
							'name'        => 'section_gray',
							'label'       => __( 'Gray Section', 'classified-listing' ),
							'description' => __( 'Light gray section for alternating backgrounds.', 'classified-listing' ),
							'background'  => 'solid (#f8f9fa)',
							'padding'     => '60px top/bottom',
						],
						'cta' => [
							'name'        => 'cta',
							'label'       => __( 'Call to Action (Light)', 'classified-listing' ),
							'description' => __( 'Light CTA card with rounded corners. Good for sign-up prompts.', 'classified-listing' ),
							'background'  => 'solid (#f8f9fa)',
							'padding'     => '80px all',
							'border'      => '12px rounded',
						],
						'cta_dark' => [
							'name'        => 'cta_dark',
							'label'       => __( 'Call to Action (Dark)', 'classified-listing' ),
							'description' => __( 'Dark gradient CTA section. High contrast for important CTAs.', 'classified-listing' ),
							'background'  => 'gradient (#2c3e50 → #1a1a2e)',
							'padding'     => '80px top/bottom',
						],
						'pricing' => [
							'name'        => 'pricing',
							'label'       => __( 'Pricing Section', 'classified-listing' ),
							'description' => __( 'Light gray section optimized for pricing tables.', 'classified-listing' ),
							'background'  => 'solid (#f1f5f9)',
							'padding'     => '80px top/bottom',
						],
						'app_promo' => [
							'name'        => 'app_promo',
							'label'       => __( 'App Promotion', 'classified-listing' ),
							'description' => __( 'Fresh green gradient for app downloads, promotions.', 'classified-listing' ),
							'background'  => 'gradient (#11998e → #38ef7d)',
							'padding'     => '80px top/bottom',
						],
						'dark' => [
							'name'        => 'dark',
							'label'       => __( 'Dark Section', 'classified-listing' ),
							'description' => __( 'Dark background for footer-like sections.', 'classified-listing' ),
							'background'  => 'solid (#1a1a2e)',
							'padding'     => '60px top/bottom',
						],
					],
					'usage_example' => [
						'single_widget' => '{"type": "heading", "preset": "banner", "settings": {"title": "Welcome"}}',
						'multi_column'  => '{"section": true, "preset": "pricing", "columns": [{"widgets": [...]}, {"widgets": [...]}]}',
					],
					'message' => __( 'Use the "preset" key in widgets array to apply section styling automatically.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get styling options.
	 */
	private static function registerGetStylingOptions() {
		wp_register_ability( 'rtcl/get-styling-options', [
			'label'       => __( 'Get Elementor Styling Options', 'classified-listing' ),
			'description' => __( 'Get all available inline styling options for Elementor sections and widgets. Use this to understand what styling can be applied dynamically based on user requirements. Returns section styling (backgrounds, gradients, padding, borders, shadows) and widget styling (typography, colors, spacing, borders).', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'section_styling' => [ 'type' => 'object' ],
					'widget_styling'  => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				return [
					'section_styling' => [
						'background' => [
							'solid'    => [
								'key'         => 'background_color',
								'type'        => 'string',
								'format'      => 'hex color',
								'example'     => '#ffffff',
								'description' => 'Solid background color',
							],
							'gradient' => [
								'key'         => 'gradient',
								'type'        => 'object',
								'format'      => '{color_1: "#667eea", color_2: "#764ba2", angle: 135, type: "linear"}',
								'example'     => [ 'color_1' => '#667eea', 'color_2' => '#764ba2', 'angle' => 135 ],
								'description' => 'Gradient background with two colors and angle',
							],
							'image'    => [
								'key'         => 'background_image_url',
								'type'        => 'string',
								'format'      => 'URL',
								'example'     => 'https://example.com/image.jpg',
								'description' => 'Background image URL',
								'additional'  => [
									'background_size'     => 'cover | contain | auto',
									'background_position' => 'center center | top left | etc.',
									'overlay_color'       => '#000000 (hex with transparency)',
									'overlay_opacity'     => '0.5 (0-1)',
								],
							],
						],
						'spacing' => [
							'padding' => [
								'key'      => 'padding',
								'type'     => 'number | array | object',
								'formats'  => [
									'single'    => '60 (applies to all sides)',
									'array'     => '[60, 30, 60, 30] (top, right, bottom, left)',
									'object'    => '{top: 60, right: 30, bottom: 60, left: 30}',
									'shorthand' => '{y: 60, x: 30} (vertical, horizontal)',
								],
								'example'  => 60,
							],
							'margin' => [
								'key'     => 'margin',
								'type'    => 'number | array | object',
								'formats' => 'Same as padding',
							],
						],
						'border' => [
							'border_type'   => [ 'key' => 'border_type', 'options' => [ 'none', 'solid', 'dashed', 'dotted', 'double' ] ],
							'border_width'  => [ 'key' => 'border_width', 'type' => 'number | object', 'example' => 1 ],
							'border_color'  => [ 'key' => 'border_color', 'type' => 'string', 'example' => '#dddddd' ],
							'border_radius' => [ 'key' => 'border_radius', 'type' => 'number | object', 'example' => 12 ],
						],
						'box_shadow' => [
							'key'     => 'box_shadow',
							'type'    => 'object',
							'example' => [
								'horizontal' => 0,
								'vertical'   => 10,
								'blur'       => 30,
								'spread'     => 0,
								'color'      => 'rgba(0,0,0,0.1)',
							],
						],
						'layout' => [
							'layout'           => [ 'key' => 'layout', 'options' => [ 'boxed', 'full_width' ], 'default' => 'boxed' ],
							'content_width'    => [ 'key' => 'content_width', 'type' => 'number', 'example' => 1140, 'description' => 'Max width in px' ],
							'min_height'       => [ 'key' => 'min_height', 'type' => 'number', 'example' => 500, 'description' => 'Minimum section height' ],
							'content_position' => [ 'key' => 'content_position', 'options' => [ 'top', 'middle', 'bottom' ] ],
						],
					],
					'widget_styling' => [
						'colors' => [
							'title_color'       => [ 'type' => 'string', 'format' => 'hex', 'example' => '#333333' ],
							'text_color'        => [ 'type' => 'string', 'format' => 'hex', 'example' => '#666666' ],
							'description_color' => [ 'type' => 'string', 'format' => 'hex', 'example' => '#888888' ],
						],
						'typography' => [
							'title_typography' => [
								'type'    => 'object',
								'example' => [
									'size'           => 32,
									'weight'         => 700,
									'family'         => 'Poppins',
									'transform'      => 'uppercase',
									'line_height'    => 1.4,
									'letter_spacing' => 1,
								],
								'description' => 'Controls title text styling. All properties optional.',
							],
							'description_typography' => [
								'type'        => 'object',
								'example'     => [ 'size' => 16, 'weight' => 400, 'family' => 'Open Sans' ],
								'description' => 'Controls description text styling',
							],
							'typography' => [
								'type'        => 'object',
								'example'     => [ 'size' => 16, 'weight' => 400 ],
								'description' => 'General text styling for text-editor and other text widgets',
							],
						],
						'spacing' => [
							'widget_padding' => [ 'type' => 'number | array | object', 'example' => 20 ],
							'widget_margin'  => [ 'type' => 'number | array | object', 'example' => [ 0, 0, 30, 0 ] ],
						],
						'background' => [
							'widget_background_color' => [ 'type' => 'string', 'format' => 'hex', 'example' => '#f5f5f5' ],
						],
						'border' => [
							'widget_border' => [
								'type'    => 'object',
								'example' => [ 'type' => 'solid', 'width' => 1, 'color' => '#dddddd' ],
							],
							'widget_border_radius' => [ 'type' => 'number', 'example' => 8 ],
						],
						'effects' => [
							'widget_box_shadow' => [
								'type'    => 'object',
								'example' => [ 'vertical' => 5, 'blur' => 20, 'color' => 'rgba(0,0,0,0.1)' ],
							],
						],
						'advanced' => [
							'css_id'      => [ 'type' => 'string', 'description' => 'Custom CSS ID for the widget' ],
							'css_classes' => [ 'type' => 'string', 'description' => 'Custom CSS classes' ],
						],
					],
					'examples' => [
						'hero_section' => [
							'type'             => 'heading',
							'section_settings' => [
								'layout'           => 'full_width',
								'min_height'       => 500,
								'content_position' => 'middle',
								'gradient'         => [ 'color_1' => '#667eea', 'color_2' => '#764ba2', 'angle' => 135 ],
								'padding'          => [ 'y' => 80, 'x' => 30 ],
							],
							'settings' => [
								'title'       => 'Welcome to Our Marketplace',
								'header_size' => 'h1',
								'align'       => 'center',
								'title_color' => '#ffffff',
								'title_typography' => [ 'size' => 48, 'weight' => 700 ],
							],
						],
						'feature_card' => [
							'type'             => 'icon-box',
							'section_settings' => [
								'background_color' => '#ffffff',
								'padding'          => 40,
								'border_radius'    => 12,
								'box_shadow'       => [ 'vertical' => 10, 'blur' => 30, 'color' => 'rgba(0,0,0,0.08)' ],
							],
							'settings' => [
								'title_text'         => 'Fast & Easy',
								'description_text'   => 'Post your ad in minutes',
								'title_color'        => '#333333',
								'title_typography'   => [ 'size' => 20, 'weight' => 600 ],
								'widget_padding'     => 30,
							],
						],
					],
					'message' => __( 'Use these styling options in section_settings for sections and settings for widgets. All colors support hex (#ffffff) and rgba formats.', 'classified-listing' ),
				];
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to create an Elementor page.
	 */
	private static function registerCreateElementorPage() {
		wp_register_ability( 'rtcl/create-elementor-page', [
			'label'       => __( 'Create Elementor Page', 'classified-listing' ),
			'description' => __( 'Create a fully styled WordPress page with Elementor widgets.

REQUIRED FORMAT - widgets array must contain objects with "type" key:
[
  {"type": "heading", "settings": {"title": "Welcome"}, "section_settings": {"background_color": "#1e3c72"}},
  {"type": "rtcl-listing-items", "settings": {"rtcl_listing_per_page": 6, "rtcl_col_lg": 3}}
]

AVAILABLE WIDGET TYPES:
- Default: heading, text-editor, button, image, icon-box, slides, call-to-action, price-table, testimonial, tabs, accordion, social-icons, counter, progress, spacer, divider, image-carousel
- RTCL: rtcl-listing-items, rtcl-listing-cat-box, rtcl-all-locations, rtcl-listing-search-form, rtcl-listing-slider, rtcl-pricing-table, rtcl-listing-store

SECTION STYLING (in section_settings):
- background_color: "#ffffff"
- gradient: {"color_1": "#667eea", "color_2": "#764ba2", "angle": 135}
- padding: 60 or {"y": 60, "x": 30}
- layout: "full_width" for full-width sections
- custom_css: "selector { property: value; }" (Elementor Pro only)

WIDGET STYLING (in settings):
- title_color, text_color, background_color, border_radius, etc.
- custom_css: "selector { property: value; }" (Elementor Pro only - Advanced tab)

CUSTOM CSS (Elementor Pro Required):
Use custom_css in section_settings or widget settings for advanced styling.
Example: "custom_css": "selector .heading { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }"

MULTI-COLUMN SECTIONS (for pricing tables, counters, icon boxes):
{"section": true, "settings": {"background_color": "#f1f5f9", "padding": 60}, "columns": [
  {"widgets": [{"type": "counter", "settings": {"ending_number": 5000, "title": "Listings"}}]},
  {"widgets": [{"type": "counter", "settings": {"ending_number": 10000, "title": "Users"}}]}
]}

OPTIONAL PRESETS: "preset": "banner" | "hero" | "cta" | "pricing" | "app_promo" | "dark"', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Page title (required).', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Page slug/permalink.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'description' => __( 'Page status: publish, draft, pending.', 'classified-listing' ),
						'enum'        => [ 'publish', 'draft', 'pending' ],
					],
					'template' => [
						'type'        => 'string',
						'description' => __( 'Page template: elementor_header_footer (recommended), elementor_canvas (blank).', 'classified-listing' ),
						'enum'        => [ 'elementor_header_footer', 'elementor_canvas' ],
					],
					'widgets' => [
						'type'        => 'array',
						'description' => __( 'Array of widget objects. Each must have "type" key. Example: [{"type": "heading", "settings": {"title": "Hello"}}, {"type": "rtcl-listing-items", "settings": {"rtcl_listing_per_page": 6}}]', 'classified-listing' ),
					],
				],
				'required' => [ 'title', 'widgets' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'      => [ 'type' => 'integer' ],
					'title'        => [ 'type' => 'string' ],
					'slug'         => [ 'type' => 'string' ],
					'url'          => [ 'type' => 'string' ],
					'edit_url'     => [ 'type' => 'string' ],
					'widget_count' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->createElementorPage( $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to add Elementor widgets to an existing page.
	 */
	private static function registerAddElementorWidgetsToPage() {
		wp_register_ability( 'rtcl/add-elementor-widgets-to-page', [
			'label'       => __( 'Add Elementor Widgets to Page', 'classified-listing' ),
			'description' => __( 'Add Elementor widgets to an existing page. Can append, prepend, or replace existing widgets. Use this to modify existing Elementor pages with RTCL widgets. The page will be converted to Elementor edit mode if not already.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id' => [
						'type'        => 'integer',
						'description' => __( 'Page ID to modify (required).', 'classified-listing' ),
					],
					'widgets' => [
						'type'        => 'array',
						'description' => __( 'Array of widgets to add. Each has "type" and "settings".', 'classified-listing' ),
					],
					'position' => [
						'type'        => 'string',
						'description' => __( 'Where to add widgets: append (end), prepend (beginning), replace (default: append).', 'classified-listing' ),
						'enum'        => [ 'append', 'prepend', 'replace' ],
					],
				],
				'required' => [ 'page_id', 'widgets' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'      => [ 'type' => 'integer' ],
					'title'        => [ 'type' => 'string' ],
					'url'          => [ 'type' => 'string' ],
					'edit_url'     => [ 'type' => 'string' ],
					'widget_count' => [ 'type' => 'integer' ],
					'position'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->addElementorWidgetsToPage(
					absint( $input['page_id'] ),
					$input['widgets'],
					$input['position'] ?? 'append'
				);
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to create a page with Gutenberg blocks.
	 */
	private static function registerCreateGutenbergPage() {
		wp_register_ability( 'rtcl/create-gutenberg-page', [
			'label'       => __( 'Create Gutenberg Page', 'classified-listing' ),
			'description' => __( 'Create a WordPress page with Gutenberg blocks. IMPORTANT: Before calling this, use rtcl/get-block-style-options to get available styles and ASK THE USER which layout they prefer (grid/list, columns, style preset). Apply their selections to block attributes. RTCL blocks: rtcl/listing-ads (col_style.style=grid|list, perPage, col_desktop), rtcl/listing-cat-box (col_style.style=1-5, category_limit, col_desktop, icon_type), rtcl/listing-search (search_style, search_oriantation=inline|vertical), rtcl/all-location (col_style.style=grid|list, location_limit). Core blocks: core/cover, core/heading, core/paragraph, core/buttons, core/spacer, core/group, core/columns.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Page title.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'Page slug/permalink.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'description' => __( 'Page status: publish, draft, pending.', 'classified-listing' ),
						'enum'        => [ 'publish', 'draft', 'pending' ],
					],
					'template' => [
						'type'        => 'string',
						'description' => __( 'Page template.', 'classified-listing' ),
					],
					'blocks' => [
						'type'        => 'array',
						'description' => __( 'Array of blocks. Each block has "name" (e.g., rtcl/listing-ads, core/cover) and "attributes" object.', 'classified-listing' ),
					],
				],
				'required' => [ 'title', 'blocks' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'page_id'  => [ 'type' => 'integer' ],
					'title'    => [ 'type' => 'string' ],
					'slug'     => [ 'type' => 'string' ],
					'url'      => [ 'type' => 'string' ],
					'edit_url' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PageBuilderService();
				return $service->createGutenbergPage( $input );
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
	 * Register ability to get ready-to-use Elementor page templates.
	 */
	private static function registerGetPageTemplates_Elementor() {
		wp_register_ability( 'rtcl/get-elementor-page-templates', [
			'label'       => __( 'Get Elementor Page Templates', 'classified-listing' ),
			'description' => __( 'Get ready-to-use Elementor page templates with complete widget structures. IMPORTANT: Use this before creating pages from images/screenshots to get proper widget format. Available templates: "classified_home", "real_estate_home", "car_dealer_home", "job_board_home", "marketplace_home". Returns complete widgets array ready to pass to rtcl/create-elementor-page.', 'classified-listing' ),
			'category'    => 'rtcl-page-builder',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'template' => [
						'type'        => 'string',
						'description' => __( 'Template name: classified_home, real_estate_home, car_dealer_home, job_board_home, marketplace_home', 'classified-listing' ),
						'enum'        => [ 'classified_home', 'real_estate_home', 'car_dealer_home', 'job_board_home', 'marketplace_home' ],
					],
					'customizations' => [
						'type'        => 'object',
						'description' => __( 'Optional customizations: primary_color, secondary_color, site_name, tagline', 'classified-listing' ),
					],
				],
				'required' => [ 'template' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'template'    => [ 'type' => 'string' ],
					'title'       => [ 'type' => 'string' ],
					'widgets'     => [ 'type' => 'array' ],
					'description' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$template = sanitize_key( $input['template'] ?? 'classified_home' );
				$custom = $input['customizations'] ?? [];

				// Sanitize customization inputs
				$primary_color = isset( $custom['primary_color'] ) ? sanitize_hex_color( $custom['primary_color'] ) : '#667eea';
				$secondary_color = isset( $custom['secondary_color'] ) ? sanitize_hex_color( $custom['secondary_color'] ) : '#764ba2';
				$site_name = isset( $custom['site_name'] ) ? sanitize_text_field( $custom['site_name'] ) : 'Marketplace';
				$tagline = isset( $custom['tagline'] ) ? sanitize_text_field( $custom['tagline'] ) : 'Buy and sell anything in your local community';

				// Ensure colors have valid fallbacks
				$primary_color = $primary_color ?: '#667eea';
				$secondary_color = $secondary_color ?: '#764ba2';

				$templates = [
					'classified_home' => [
						'title'       => 'Classified Listings Home',
						'description' => 'Modern classified listings homepage with hero, featured listings, categories, stats, CTA, and pricing',
						'widgets'     => [
							// Hero Section
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'min_height' => 450,
									'content_position' => 'middle',
									'gradient' => [ 'color_1' => $primary_color, 'color_2' => $secondary_color, 'angle' => 135 ],
									'padding' => [ 'top' => 80, 'bottom' => 20 ],
								],
								'settings' => [
									'title' => 'Find Your Perfect Deal',
									'header_size' => 'h1',
									'align' => 'center',
									'title_color' => '#ffffff',
								],
							],
							[
								'type' => 'text-editor',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => $primary_color, 'color_2' => $secondary_color ],
									'padding' => [ 'top' => 0, 'bottom' => 30 ],
								],
								'settings' => [
									'editor' => '<p style="text-align:center;color:#ffffff;font-size:18px;">' . esc_html( $tagline ) . '</p>',
								],
							],
							[
								'type' => 'rtcl-listing-search-form',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => $primary_color, 'color_2' => $secondary_color ],
									'padding' => [ 'top' => 0, 'bottom' => 80 ],
								],
								'settings' => [],
							],
							// Featured Listings
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Featured Listings', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-items',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_listing_per_page' => 6, 'rtcl_col_lg' => 3, 'rtcl_col_md' => 2 ],
							],
							// Categories
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f8f9fa', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Browse by Category', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-cat-box',
								'section_settings' => [ 'background_color' => '#f8f9fa', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_category_limit' => 8, 'rtcl_col_lg' => 4, 'rtcl_show_count' => 'yes' ],
							],
							// Stats Counter
							[
								'section' => true,
								'settings' => [ 'layout' => 'full_width', 'background_color' => '#1a1a2e', 'padding' => 60 ],
								'columns' => [
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 5000, 'suffix' => '+', 'title' => 'Listings', 'title_color' => '#ffffff', 'number_color' => $primary_color ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 10000, 'suffix' => '+', 'title' => 'Happy Users', 'title_color' => '#ffffff', 'number_color' => $primary_color ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 500, 'suffix' => '+', 'title' => 'Cities', 'title_color' => '#ffffff', 'number_color' => $primary_color ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 99, 'suffix' => '%', 'title' => 'Satisfaction', 'title_color' => '#ffffff', 'number_color' => $primary_color ] ] ] ],
								],
							],
							// CTA Section
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => '#11998e', 'color_2' => '#38ef7d' ],
									'padding' => [ 'top' => 80, 'bottom' => 20 ],
								],
								'settings' => [ 'title' => 'Ready to Sell Something?', 'align' => 'center', 'header_size' => 'h2', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'button',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => '#11998e', 'color_2' => '#38ef7d' ],
									'padding' => [ 'top' => 0, 'bottom' => 80 ],
								],
								'settings' => [ 'text' => 'Post Your Ad Free', 'align' => 'center', 'background_color' => '#ffffff', 'button_text_color' => '#11998e' ],
							],
							// How It Works
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 30 ] ],
								'settings' => [ 'title' => 'How It Works', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'section' => true,
								'settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'columns' => [
									[ 'widgets' => [ [ 'type' => 'icon-box', 'settings' => [ 'title_text' => 'Create Account', 'description_text' => 'Sign up free in seconds', 'selected_icon' => [ 'value' => 'fas fa-user-plus' ] ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'icon-box', 'settings' => [ 'title_text' => 'Post Your Ad', 'description_text' => 'Add photos and details', 'selected_icon' => [ 'value' => 'fas fa-edit' ] ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'icon-box', 'settings' => [ 'title_text' => 'Connect', 'description_text' => 'Chat with buyers', 'selected_icon' => [ 'value' => 'fas fa-comments' ] ] ] ] ],
								],
							],
							// Pricing Section
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f1f5f9', 'padding' => [ 'top' => 80, 'bottom' => 30 ] ],
								'settings' => [ 'title' => 'Choose Your Plan', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'section' => true,
								'settings' => [ 'background_color' => '#f1f5f9', 'padding' => [ 'top' => 0, 'bottom' => 80 ] ],
								'columns' => [
									[ 'widgets' => [ [ 'type' => 'price-table', 'settings' => [ 'heading' => 'Basic', 'sub_heading' => 'For starters', 'price' => 'Free', 'features' => "5 Listings\nBasic Support\n30 Days", 'button_text' => 'Start Free' ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'price-table', 'settings' => [ 'heading' => 'Pro', 'sub_heading' => 'Most Popular', 'price' => '$9.99', 'period' => '/month', 'features' => "50 Listings\nPriority Support\nFeatured Ads\n90 Days", 'button_text' => 'Go Pro', 'featured' => 'yes' ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'price-table', 'settings' => [ 'heading' => 'Business', 'sub_heading' => 'For agencies', 'price' => '$29.99', 'period' => '/month', 'features' => "Unlimited\n24/7 Support\nAnalytics\n1 Year", 'button_text' => 'Go Business' ] ] ] ],
								],
							],
							// App Download
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => $primary_color, 'color_2' => $secondary_color ],
									'padding' => [ 'top' => 80, 'bottom' => 20 ],
								],
								'settings' => [ 'title' => 'Get Our Mobile App', 'align' => 'center', 'header_size' => 'h2', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'text-editor',
								'section_settings' => [
									'layout' => 'full_width',
									'gradient' => [ 'color_1' => $primary_color, 'color_2' => $secondary_color ],
									'padding' => [ 'top' => 0, 'bottom' => 80 ],
								],
								'settings' => [ 'editor' => '<p style="text-align:center;color:#ffffff;">Download our app for iOS and Android. Buy and sell on the go!</p>' ],
							],
						],
					],
					'real_estate_home' => [
						'title'       => 'Real Estate Home',
						'description' => 'Real estate homepage with property search, featured properties, and agent section',
						'widgets'     => [
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'min_height' => 500,
									'content_position' => 'middle',
									'gradient' => [ 'color_1' => '#2c3e50', 'color_2' => '#3498db', 'angle' => 135 ],
									'padding' => 80,
								],
								'settings' => [ 'title' => 'Find Your Dream Home', 'header_size' => 'h1', 'align' => 'center', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'rtcl-listing-search-form',
								'section_settings' => [ 'gradient' => [ 'color_1' => '#2c3e50', 'color_2' => '#3498db' ], 'padding' => [ 'top' => 0, 'bottom' => 80 ] ],
								'settings' => [],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Featured Properties', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-items',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_listing_per_page' => 6, 'rtcl_col_lg' => 3 ],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f8f9fa', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Property Types', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-cat-box',
								'section_settings' => [ 'background_color' => '#f8f9fa', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_category_limit' => 6, 'rtcl_col_lg' => 3 ],
							],
							[
								'section' => true,
								'settings' => [ 'background_color' => '#2c3e50', 'padding' => 60 ],
								'columns' => [
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 2500, 'suffix' => '+', 'title' => 'Properties', 'title_color' => '#ffffff', 'number_color' => '#3498db' ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 1200, 'suffix' => '+', 'title' => 'Happy Clients', 'title_color' => '#ffffff', 'number_color' => '#3498db' ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 50, 'suffix' => '+', 'title' => 'Agents', 'title_color' => '#ffffff', 'number_color' => '#3498db' ] ] ] ],
									[ 'widgets' => [ [ 'type' => 'counter', 'settings' => [ 'ending_number' => 15, 'suffix' => '+', 'title' => 'Years Experience', 'title_color' => '#ffffff', 'number_color' => '#3498db' ] ] ] ],
								],
							],
						],
					],
					'car_dealer_home' => [
						'title'       => 'Car Dealer Home',
						'description' => 'Automotive dealership homepage with vehicle search and featured cars',
						'widgets'     => [
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'min_height' => 450,
									'content_position' => 'middle',
									'gradient' => [ 'color_1' => '#1a1a2e', 'color_2' => '#16213e' ],
									'padding' => 80,
								],
								'settings' => [ 'title' => 'Find Your Perfect Ride', 'header_size' => 'h1', 'align' => 'center', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'rtcl-listing-search-form',
								'section_settings' => [ 'gradient' => [ 'color_1' => '#1a1a2e', 'color_2' => '#16213e' ], 'padding' => [ 'top' => 0, 'bottom' => 80 ] ],
								'settings' => [],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Featured Vehicles', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-items',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_listing_per_page' => 8, 'rtcl_col_lg' => 4 ],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f5f5f5', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Browse by Make', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-cat-box',
								'section_settings' => [ 'background_color' => '#f5f5f5', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_category_limit' => 8, 'rtcl_col_lg' => 4 ],
							],
						],
					],
					'job_board_home' => [
						'title'       => 'Job Board Home',
						'description' => 'Job listing homepage with job search and featured positions',
						'widgets'     => [
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'min_height' => 400,
									'content_position' => 'middle',
									'gradient' => [ 'color_1' => '#6366f1', 'color_2' => '#8b5cf6' ],
									'padding' => 80,
								],
								'settings' => [ 'title' => 'Find Your Dream Job', 'header_size' => 'h1', 'align' => 'center', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'rtcl-listing-search-form',
								'section_settings' => [ 'gradient' => [ 'color_1' => '#6366f1', 'color_2' => '#8b5cf6' ], 'padding' => [ 'top' => 0, 'bottom' => 80 ] ],
								'settings' => [],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Latest Jobs', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-items',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_listing_per_page' => 6, 'rtcl_col_lg' => 2 ],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f8fafc', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Browse by Category', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-cat-box',
								'section_settings' => [ 'background_color' => '#f8fafc', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_category_limit' => 8, 'rtcl_col_lg' => 4 ],
							],
						],
					],
					'marketplace_home' => [
						'title'       => 'Marketplace Home',
						'description' => 'General marketplace homepage similar to Facebook Marketplace or Craigslist',
						'widgets'     => [
							[
								'type' => 'heading',
								'section_settings' => [
									'layout' => 'full_width',
									'min_height' => 400,
									'content_position' => 'middle',
									'background_color' => '#0866ff',
									'padding' => 80,
								],
								'settings' => [ 'title' => 'Marketplace', 'header_size' => 'h1', 'align' => 'center', 'title_color' => '#ffffff' ],
							],
							[
								'type' => 'text-editor',
								'section_settings' => [ 'background_color' => '#0866ff', 'padding' => [ 'top' => 0, 'bottom' => 20 ] ],
								'settings' => [ 'editor' => '<p style="text-align:center;color:#ffffff;font-size:18px;">Buy and sell items locally or have them shipped</p>' ],
							],
							[
								'type' => 'rtcl-listing-search-form',
								'section_settings' => [ 'background_color' => '#0866ff', 'padding' => [ 'top' => 0, 'bottom' => 80 ] ],
								'settings' => [],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => "Today's Picks", 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-items',
								'section_settings' => [ 'background_color' => '#ffffff', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_listing_per_page' => 12, 'rtcl_col_lg' => 4 ],
							],
							[
								'type' => 'heading',
								'section_settings' => [ 'background_color' => '#f0f2f5', 'padding' => [ 'top' => 60, 'bottom' => 20 ] ],
								'settings' => [ 'title' => 'Shop by Category', 'align' => 'center', 'header_size' => 'h2' ],
							],
							[
								'type' => 'rtcl-listing-cat-box',
								'section_settings' => [ 'background_color' => '#f0f2f5', 'padding' => [ 'top' => 0, 'bottom' => 60 ] ],
								'settings' => [ 'rtcl_category_limit' => 8, 'rtcl_col_lg' => 4 ],
							],
						],
					],
				];

				if ( ! isset( $templates[ $template ] ) ) {
					return new \WP_Error(
						'invalid_template',
						__( 'Template not found. Available: classified_home, real_estate_home, car_dealer_home, job_board_home, marketplace_home', 'classified-listing' )
					);
				}

				$result = $templates[ $template ];
				$result['template_name'] = $template;
				$result['usage'] = 'Pass the "widgets" array directly to rtcl/create-elementor-page with your desired title';
				$result['message'] = sprintf( __( 'Template "%s" ready. Contains %d widgets.', 'classified-listing' ), $template, count( $result['widgets'] ) );

				return $result;
			},
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
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
