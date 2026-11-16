<?php

namespace Rtcl\Services\Mcp\Services;

defined( 'ABSPATH' ) || exit;

/**
 * Service for creating pages with Gutenberg blocks and Elementor widgets.
 * Supports ALL registered WordPress blocks dynamically.
 */
class PageBuilderService {

	/**
	 * Check if user provided explicit styling (non-empty section_settings or preset).
	 *
	 * @param array $widget Widget configuration.
	 *
	 * @return bool True if explicit styling is provided.
	 */
	private function hasExplicitStyling( array $widget ): bool {
		// Check if preset is specified
		if ( ! empty( $widget['preset'] ) ) {
			return true;
		}

		// Check if section_settings has styling keys
		$section_settings = $widget['section_settings'] ?? [];
		if ( empty( $section_settings ) ) {
			return false;
		}

		// Styling keys that indicate explicit styling
		$styling_keys = [
			'background_color', 'gradient', 'background_image', 'background_image_url',
			'padding', 'margin', 'min_height', 'layout', 'border_type', 'border_radius',
			'box_shadow', 'overlay_color',
		];

		foreach ( $styling_keys as $key ) {
			if ( isset( $section_settings[ $key ] ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get preset section styling based on widget type and position.
	 * Applied when no explicit styling is provided.
	 *
	 * @param string $widget_type Widget type.
	 * @param int    $index       Widget position index (0-based).
	 * @param int    $total       Total widget count.
	 *
	 * @return array Section settings with preset styling.
	 */
	private function getAutoSectionPreset( string $widget_type, int $index, int $total ): array {
		$is_first = $index === 0;
		$is_last = $index === $total - 1;

		// Hero/Banner section (first position with heading or search)
		// Use light background with dark text for safety - gradients can be added explicitly
		if ( $is_first && in_array( $widget_type, [ 'heading', 'rtcl-listing-search-form', 'text-editor' ], true ) ) {
			return [
				'layout'           => 'full_width',
				'min_height'       => 300,
				'content_position' => 'middle',
				'background_color' => '#f0f4f8',
				'padding'          => [ 'top' => 60, 'bottom' => 60 ],
			];
		}

		// RTCL Listing Items - Featured section
		if ( $widget_type === 'rtcl-listing-items' ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 40, 'bottom' => 60 ],
			];
		}

		// RTCL Category Box - Categories section
		if ( $widget_type === 'rtcl-listing-cat-box' ) {
			return [
				'background_color' => '#f8f9fa',
				'padding'          => [ 'top' => 40, 'bottom' => 60 ],
			];
		}

		// RTCL Search Form (not first)
		if ( $widget_type === 'rtcl-listing-search-form' && ! $is_first ) {
			return [
				'background_color' => '#f8f9fa',
				'padding'          => [ 'top' => 40, 'bottom' => 40 ],
			];
		}

		// RTCL All Locations
		if ( $widget_type === 'rtcl-all-locations' ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 40, 'bottom' => 60 ],
			];
		}

		// Heading widgets (section titles)
		if ( $widget_type === 'heading' && ! $is_first ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 60, 'bottom' => 20 ],
			];
		}

		// Text editor
		if ( $widget_type === 'text-editor' && ! $is_first ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 20, 'bottom' => 40 ],
			];
		}

		// Button - CTA style
		if ( $widget_type === 'button' ) {
			return [
				'background_color' => '#f8f9fa',
				'padding'          => [ 'top' => 40, 'bottom' => 40 ],
			];
		}

		// Icon box
		if ( $widget_type === 'icon-box' ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 40, 'bottom' => 40 ],
			];
		}

		// Counter
		if ( $widget_type === 'counter' ) {
			return [
				'background_color' => '#1a1a2e',
				'padding'          => [ 'top' => 60, 'bottom' => 60 ],
			];
		}

		// Price table
		if ( $widget_type === 'price-table' ) {
			return [
				'background_color' => '#f1f5f9',
				'padding'          => [ 'top' => 40, 'bottom' => 40 ],
			];
		}

		// Testimonial
		if ( $widget_type === 'testimonial' ) {
			return [
				'background_color' => '#f8f9fa',
				'padding'          => [ 'top' => 60, 'bottom' => 60 ],
			];
		}

		// Image carousel / Slides
		if ( in_array( $widget_type, [ 'image-carousel', 'slides' ], true ) ) {
			return [
				'layout'  => 'full_width',
				'padding' => 0,
			];
		}

		// Default fallback
		return [
			'background_color' => '#ffffff',
			'padding'          => [ 'top' => 40, 'bottom' => 40 ],
		];
	}

	/**
	 * Get preset widget styling based on widget type.
	 * Applied when no explicit widget styling is provided.
	 *
	 * @param string $widget_type Widget type.
	 * @param array  $settings    Existing settings.
	 * @param int    $index       Widget position index.
	 * @param int    $total       Total widgets count.
	 *
	 * @return array Enhanced settings with preset styling.
	 */
	private function getAutoWidgetPreset( string $widget_type, array $settings, int $index, int $total ): array {
		$is_first = $index === 0;

		// Heading presets - ALWAYS use dark text by default (safe for any background)
		if ( $widget_type === 'heading' ) {
			// Only set title_color if not already provided - ALWAYS dark for safety
			if ( ! isset( $settings['title_color'] ) ) {
				$settings['title_color'] = '#333333';
			}
			$settings = array_merge( [
				'header_size' => $is_first ? 'h1' : 'h2',
				'align'       => 'center',
			], $settings );
		}

		// Text editor presets - ALWAYS use dark text by default
		if ( $widget_type === 'text-editor' ) {
			$editor = $settings['editor'] ?? '';
			// Only modify if no inline styles exist - always use dark color for safety
			if ( ! empty( $editor ) && strpos( $editor, 'style=' ) === false && strpos( $editor, 'color:' ) === false ) {
				$settings['editor'] = '<p style="text-align:center;color:#666666;font-size:16px;">' . strip_tags( $editor ) . '</p>';
			}
			$settings = array_merge( [ 'align' => 'center' ], $settings );
		}

		// Button presets
		if ( $widget_type === 'button' ) {
			$settings = array_merge( [
				'align'            => 'center',
				'background_color' => '#667eea',
				'button_text_color' => '#ffffff',
				'border_radius'    => [ 'size' => 5 ],
			], $settings );
		}

		// Icon box presets
		if ( $widget_type === 'icon-box' ) {
			$settings = array_merge( [
				'position'       => 'top',
				'title_color'    => '#333333',
				'primary_color'  => '#667eea',
			], $settings );
		}

		// Counter presets
		if ( $widget_type === 'counter' ) {
			$settings = array_merge( [
				'title_color'  => '#ffffff',
				'number_color' => '#667eea',
			], $settings );
		}

		// Price table presets
		if ( $widget_type === 'price-table' ) {
			$settings = array_merge( [
				'header_bg_color' => '#667eea',
				'price_color'     => '#333333',
			], $settings );
		}

		// RTCL Listing Items presets
		if ( $widget_type === 'rtcl-listing-items' ) {
			$settings = array_merge( [
				'rtcl_listing_per_page' => 6,
				'rtcl_col_lg'           => 3,
				'rtcl_col_md'           => 2,
				'rtcl_col_sm'           => 1,
			], $settings );
		}

		// RTCL Category Box presets
		if ( $widget_type === 'rtcl-listing-cat-box' ) {
			$settings = array_merge( [
				'rtcl_category_limit' => 8,
				'rtcl_col_lg'         => 4,
				'rtcl_col_md'         => 3,
				'rtcl_col_sm'         => 2,
				'rtcl_show_count'     => 'yes',
			], $settings );
		}

		// RTCL All Locations presets
		if ( $widget_type === 'rtcl-all-locations' ) {
			$settings = array_merge( [
				'rtcl_location_limit' => 8,
				'rtcl_col_lg'         => 4,
				'rtcl_show_count'     => 'yes',
			], $settings );
		}

		return $settings;
	}

	/**
	 * Check if multi-column section has explicit styling.
	 *
	 * @param array $section_settings Section settings.
	 *
	 * @return bool True if explicit styling is provided.
	 */
	private function hasExplicitMultiColStyling( array $section_settings ): bool {
		if ( empty( $section_settings ) ) {
			return false;
		}

		$styling_keys = [
			'background_color', 'gradient', 'background_image', 'background_image_url',
			'padding', 'margin', 'min_height', 'layout', 'border_type', 'border_radius',
			'box_shadow', 'overlay_color',
		];

		foreach ( $styling_keys as $key ) {
			if ( isset( $section_settings[ $key ] ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get the first widget type from columns array.
	 *
	 * @param array $columns Columns configuration.
	 *
	 * @return string First widget type found.
	 */
	private function getFirstWidgetTypeFromColumns( array $columns ): string {
		foreach ( $columns as $column ) {
			$widgets = $column['widgets'] ?? [];
			foreach ( $widgets as $widget ) {
				$type = $widget['type'] ?? $widget['widget'] ?? '';
				if ( ! empty( $type ) ) {
					return $type;
				}
			}
		}
		return 'unknown';
	}

	/**
	 * Get auto preset for multi-column sections based on widget types.
	 *
	 * @param string $first_widget_type First widget type in columns.
	 * @param int    $num_columns       Number of columns.
	 *
	 * @return array Section settings preset.
	 */
	private function getAutoMultiColumnPreset( string $first_widget_type, int $num_columns ): array {
		// Counter sections - dark background
		if ( $first_widget_type === 'counter' ) {
			return [
				'layout'           => 'full_width',
				'background_color' => '#1a1a2e',
				'padding'          => [ 'top' => 60, 'bottom' => 60 ],
			];
		}

		// Price table sections - light gray
		if ( $first_widget_type === 'price-table' ) {
			return [
				'background_color' => '#f1f5f9',
				'padding'          => [ 'top' => 40, 'bottom' => 60 ],
			];
		}

		// Icon box sections (How it works, features)
		if ( $first_widget_type === 'icon-box' ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 40, 'bottom' => 60 ],
			];
		}

		// Testimonial columns
		if ( $first_widget_type === 'testimonial' ) {
			return [
				'background_color' => '#f8f9fa',
				'padding'          => [ 'top' => 60, 'bottom' => 60 ],
			];
		}

		// Image columns
		if ( $first_widget_type === 'image' ) {
			return [
				'background_color' => '#ffffff',
				'padding'          => [ 'top' => 40, 'bottom' => 40 ],
			];
		}

		// Default multi-column section
		return [
			'background_color' => '#ffffff',
			'padding'          => [ 'top' => 40, 'bottom' => 40 ],
		];
	}

	/**
	 * Get all registered Gutenberg blocks from WordPress.
	 * This dynamically discovers ALL blocks - core, plugin, and theme blocks.
	 *
	 * @param string $filter Optional filter: 'all', 'core', 'rtcl', or plugin prefix.
	 *
	 * @return array List of registered blocks.
	 */
	public function getRegisteredBlocks( string $filter = 'all' ): array {
		$registry = \WP_Block_Type_Registry::get_instance();
		$all_blocks = $registry->get_all_registered();

		$blocks = [];
		foreach ( $all_blocks as $name => $block_type ) {
			// Apply filter
			if ( $filter !== 'all' ) {
				if ( $filter === 'core' && strpos( $name, 'core/' ) !== 0 ) {
					continue;
				}
				if ( $filter === 'rtcl' && strpos( $name, 'rtcl/' ) !== 0 ) {
					continue;
				}
				if ( $filter !== 'core' && $filter !== 'rtcl' && strpos( $name, $filter . '/' ) !== 0 ) {
					continue;
				}
			}

			$blocks[] = [
				'name'        => $name,
				'title'       => $block_type->title ?? $name,
				'description' => $block_type->description ?? '',
				'category'    => $block_type->category ?? 'common',
				'icon'        => is_string( $block_type->icon ) ? $block_type->icon : '',
				'supports'    => $block_type->supports ?? [],
				'attributes'  => $this->formatBlockAttributes( $block_type->attributes ?? [] ),
				'is_dynamic'  => $block_type->is_dynamic(),
			];
		}

		return $blocks;
	}

	/**
	 * Format block attributes for output.
	 *
	 * @param array $attributes Raw attributes.
	 *
	 * @return array Formatted attributes.
	 */
	private function formatBlockAttributes( array $attributes ): array {
		$formatted = [];
		foreach ( $attributes as $name => $config ) {
			$formatted[ $name ] = [
				'type'    => $config['type'] ?? 'string',
				'default' => $config['default'] ?? null,
			];
		}
		return $formatted;
	}

	/**
	 * Get available RTCL Gutenberg blocks.
	 *
	 * @return array List of RTCL blocks.
	 */
	public function getAvailableGutenbergBlocks(): array {
		return $this->getRegisteredBlocks( 'rtcl' );
	}

	/**
	 * Get theme prefix for meta keys based on active theme.
	 * Uses theme slug directly: {theme_slug}_layout_settings
	 * Works for RadiusTheme themes that follow this naming convention.
	 *
	 * @return string Theme prefix (theme slug with hyphens replaced by underscores).
	 */
	private function getThemePrefix(): string {
		$theme = wp_get_theme();
		$theme_slug = $theme->get_stylesheet();

		// Convert to lowercase and replace hyphens with underscores
		// e.g., "classima" -> "classima", "starter-theme" -> "starter_theme"
		return strtolower( str_replace( '-', '_', $theme_slug ) );
	}

	/**
	 * Check if theme meta box settings are available.
	 * Works with RadiusTheme themes that use {theme}_layout_settings meta key format.
	 *
	 * @return array Status info about meta box availability.
	 */
	public function checkMetaBoxAvailability(): array {
		$theme = wp_get_theme();
		$prefix = $this->getThemePrefix();
		$meta_key = "{$prefix}_layout_settings";

		// Check if RT_Postmeta class exists (RadiusTheme meta framework)
		$rt_postmeta_exists = class_exists( 'RT_Postmeta' );

		return [
			'available'   => $rt_postmeta_exists,
			'theme'       => $theme->get( 'Name' ),
			'theme_slug'  => $theme->get_stylesheet(),
			'prefix'      => $prefix,
			'meta_key'    => $meta_key,
			'rt_postmeta' => $rt_postmeta_exists,
			'format'      => '{theme_slug}_layout_settings',
			'message'     => $rt_postmeta_exists
				? sprintf( __( 'Page layout settings available using meta key: %s', 'classified-listing' ), $meta_key )
				: __( 'RT_Postmeta class not found. Theme may not support layout settings.', 'classified-listing' ),
		];
	}

	/**
	 * Check if a specific page has layout meta settings.
	 *
	 * @param int $page_id Page ID.
	 *
	 * @return bool Whether the page has meta settings.
	 */
	public function pageHasLayoutSettings( int $page_id ): bool {
		$prefix = $this->getThemePrefix();
		if ( ! $prefix ) {
			return false;
		}

		$meta_key = "{$prefix}_layout_settings";
		$settings = get_post_meta( $page_id, $meta_key, true );

		return ! empty( $settings ) && is_array( $settings );
	}

	/**
	 * Get available page layout options from Classima theme.
	 *
	 * @return array Available options schema.
	 */
	public function getPageLayoutOptions(): array {
		$sidebars = [];
		if ( class_exists( 'radiustheme\Classima\Helper' ) && method_exists( 'radiustheme\Classima\Helper', 'custom_sidebar_fields' ) ) {
			$sidebars = \radiustheme\Classima\Helper::custom_sidebar_fields();
		}

		return [
			'layout' => [
				'label'   => __( 'Layout', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default'       => __( 'Default', 'classified-listing' ),
					'full-width'    => __( 'Full Width', 'classified-listing' ),
					'left-sidebar'  => __( 'Left Sidebar', 'classified-listing' ),
					'right-sidebar' => __( 'Right Sidebar', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'sidebar' => [
				'label'   => __( 'Custom Sidebar', 'classified-listing' ),
				'type'    => 'select',
				'options' => array_merge( [ 'default' => __( 'Default', 'classified-listing' ) ], $sidebars ),
				'default' => 'default',
			],
			'tr_header' => [
				'label'   => __( 'Transparent Header', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'on'      => __( 'Enable', 'classified-listing' ),
					'off'     => __( 'Disable', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'top_bar' => [
				'label'   => __( 'Top Bar', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'on'      => __( 'Enable', 'classified-listing' ),
					'off'     => __( 'Disable', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'header_style' => [
				'label'   => __( 'Header Layout', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'1'       => __( 'Layout 1', 'classified-listing' ),
					'2'       => __( 'Layout 2', 'classified-listing' ),
					'3'       => __( 'Layout 3', 'classified-listing' ),
					'4'       => __( 'Layout 4', 'classified-listing' ),
					'5'       => __( 'Layout 5', 'classified-listing' ),
					'6'       => __( 'Layout 6', 'classified-listing' ),
					'7'       => __( 'Layout 7', 'classified-listing' ),
					'8'       => __( 'Layout 8', 'classified-listing' ),
					'9'       => __( 'Layout 9', 'classified-listing' ),
					'10'      => __( 'Layout 10', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'footer_style' => [
				'label'   => __( 'Footer Style', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'1'       => __( 'Style 1', 'classified-listing' ),
					'2'       => __( 'Style 2', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'banner' => [
				'label'   => __( 'Banner', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'on'      => __( 'Enable', 'classified-listing' ),
					'off'     => __( 'Disable', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'breadcrumb' => [
				'label'   => __( 'Breadcrumb', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'on'      => __( 'Enable', 'classified-listing' ),
					'off'     => __( 'Disable', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'banner_search' => [
				'label'   => __( 'Banner Search', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'on'      => __( 'Enable', 'classified-listing' ),
					'off'     => __( 'Disable', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'bgtype' => [
				'label'   => __( 'Banner Background Type', 'classified-listing' ),
				'type'    => 'select',
				'options' => [
					'default' => __( 'Default', 'classified-listing' ),
					'bgimg'   => __( 'Background Image', 'classified-listing' ),
					'bgcolor' => __( 'Background Color', 'classified-listing' ),
				],
				'default' => 'default',
			],
			'bgimg' => [
				'label'   => __( 'Banner Background Image', 'classified-listing' ),
				'type'    => 'image',
				'default' => '',
			],
			'bgcolor' => [
				'label'   => __( 'Banner Background Color', 'classified-listing' ),
				'type'    => 'color',
				'default' => '',
			],
		];
	}

	/**
	 * Get page layout settings (theme meta box settings).
	 *
	 * @param int $page_id Page ID.
	 *
	 * @return array|\WP_Error Layout settings or error.
	 */
	public function getPageLayoutSettings( int $page_id ) {
		// Check if user can edit this page
		if ( ! current_user_can( 'edit_post', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to view settings for this page.', 'classified-listing' )
			);
		}

		// Check if meta system is available
		$availability = $this->checkMetaBoxAvailability();
		if ( ! $availability['available'] ) {
			return new \WP_Error(
				'meta_not_available',
				sprintf(
					__( 'Page layout meta settings are not available. Theme "%s" does not have RT_Postmeta support. Expected meta key: %s', 'classified-listing' ),
					$availability['theme'],
					$availability['meta_key']
				),
				$availability
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || ! in_array( $page->post_type, [ 'page', 'post' ], true ) ) {
			return new \WP_Error( 'invalid_post', __( 'Page or post not found.', 'classified-listing' ) );
		}

		$prefix = $this->getThemePrefix();
		$meta_key = "{$prefix}_layout_settings";
		$settings = get_post_meta( $page_id, $meta_key, true );

		$has_settings = is_array( $settings ) && ! empty( $settings );
		if ( ! is_array( $settings ) ) {
			$settings = [];
		}

		// Get default values from schema
		$schema = $this->getPageLayoutOptions();
		$result = [];

		foreach ( $schema as $key => $config ) {
			$result[ $key ] = [
				'value'   => $settings[ $key ] ?? $config['default'],
				'label'   => $config['label'],
				'options' => $config['options'] ?? null,
			];
		}

		return [
			'page_id'      => $page_id,
			'title'        => $page->post_title,
			'post_type'    => $page->post_type,
			'has_settings' => $has_settings,
			'theme'        => $availability['theme'],
			'prefix'       => $prefix,
			'meta_key'     => $meta_key,
			'settings'     => $result,
			'raw'          => $settings,
		];
	}

	/**
	 * Update page layout settings (theme meta box settings).
	 *
	 * @param int   $page_id  Page ID.
	 * @param array $settings Settings to update.
	 *
	 * @return array|\WP_Error Updated settings or error.
	 */
	public function updatePageLayoutSettings( int $page_id, array $settings ) {
		// Check if meta system is available
		$availability = $this->checkMetaBoxAvailability();
		if ( ! $availability['available'] ) {
			return new \WP_Error(
				'meta_not_available',
				sprintf(
					__( 'Page layout meta settings are not available. Theme "%s" does not have RT_Postmeta support. Expected meta key: %s', 'classified-listing' ),
					$availability['theme'],
					$availability['meta_key']
				),
				$availability
			);
		}

		if ( ! current_user_can( 'edit_post', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to edit this page.', 'classified-listing' )
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || ! in_array( $page->post_type, [ 'page', 'post' ], true ) ) {
			return new \WP_Error( 'invalid_post', __( 'Page or post not found.', 'classified-listing' ) );
		}

		$prefix = $this->getThemePrefix();
		$meta_key = "{$prefix}_layout_settings";

		// Get existing settings
		$existing = get_post_meta( $page_id, $meta_key, true );
		$had_settings = is_array( $existing ) && ! empty( $existing );
		if ( ! is_array( $existing ) ) {
			$existing = [];
		}

		// Validate and merge settings
		$schema = $this->getPageLayoutOptions();
		$valid_keys = array_keys( $schema );
		$updated = [];
		$skipped = [];

		foreach ( $settings as $key => $value ) {
			if ( ! in_array( $key, $valid_keys, true ) ) {
				$skipped[ $key ] = 'invalid_key';
				continue;
			}

			// Validate value against options if applicable
			if ( isset( $schema[ $key ]['options'] ) && ! isset( $schema[ $key ]['options'][ $value ] ) ) {
				$skipped[ $key ] = 'invalid_value';
				continue;
			}

			$existing[ $key ] = sanitize_text_field( $value );
			$updated[ $key ] = $value;
		}

		// Save updated meta
		update_post_meta( $page_id, $meta_key, $existing );

		return [
			'page_id'      => $page_id,
			'title'        => $page->post_title,
			'theme'        => $availability['theme'],
			'prefix'       => $prefix,
			'meta_key'     => $meta_key,
			'had_settings' => $had_settings,
			'updated'      => $updated,
			'skipped'      => $skipped,
			'settings'     => $existing,
			'message'      => sprintf(
				__( 'Updated %d layout setting(s) for "%s" using theme "%s".', 'classified-listing' ),
				count( $updated ),
				$page->post_title,
				$availability['theme']
			),
		];
	}

	/**
	 * Get available page templates from theme and plugins.
	 *
	 * @param string $post_type Post type to get templates for.
	 *
	 * @return array List of available templates.
	 */
	public function getPageTemplates( string $post_type = 'page' ): array {
		$theme = wp_get_theme();
		$templates = [];

		// Add default template
		$templates[] = [
			'file'        => 'default',
			'name'        => __( 'Default Template', 'classified-listing' ),
			'description' => __( 'The theme\'s default page template.', 'classified-listing' ),
			'source'      => 'wordpress',
		];

		// Get theme templates
		$theme_templates = $theme->get_page_templates( null, $post_type );
		foreach ( $theme_templates as $file => $name ) {
			$templates[] = [
				'file'   => $file,
				'name'   => $name,
				'source' => 'theme',
			];
		}

		// Get block templates (FSE/Block themes)
		if ( function_exists( 'get_block_templates' ) ) {
			try {
				$block_templates = get_block_templates( [ 'post_type' => $post_type ] );
				if ( is_array( $block_templates ) ) {
					foreach ( $block_templates as $template ) {
						$templates[] = [
							'file'   => $template->slug,
							'name'   => ! empty( $template->title ) ? $template->title : $template->slug,
							'source' => 'block',
							'type'   => $template->type ?? 'wp_template',
						];
					}
				}
			} catch ( \Exception $e ) {
				// Block templates not available
			}
		}

		// Elementor templates
		if ( defined( 'ELEMENTOR_VERSION' ) ) {
			$templates[] = [
				'file'   => 'elementor_canvas',
				'name'   => __( 'Elementor Canvas', 'classified-listing' ),
				'source' => 'elementor',
			];
			$templates[] = [
				'file'   => 'elementor_header_footer',
				'name'   => __( 'Elementor Full Width', 'classified-listing' ),
				'source' => 'elementor',
			];
		}

		// Check for GeneratePress templates
		if ( function_exists( 'generate_get_block_elements' ) ) {
			$templates[] = [
				'file'   => 'generatepress-full-width',
				'name'   => __( 'GeneratePress Full Width', 'classified-listing' ),
				'source' => 'generatepress',
			];
		}

		// Check for Astra templates
		if ( defined( 'ASTRA_THEME_VERSION' ) ) {
			$templates[] = [
				'file'   => 'astra-full-width',
				'name'   => __( 'Astra Full Width', 'classified-listing' ),
				'source' => 'astra',
			];
		}

		return [
			'templates'     => $templates,
			'theme'         => $theme->get( 'Name' ),
			'theme_version' => $theme->get( 'Version' ),
			'count'         => count( $templates ),
		];
	}

	/**
	 * Check if Elementor Pro is active.
	 *
	 * @return bool True if Elementor Pro is active.
	 */
	public function isElementorProActive(): bool {
		return defined( 'ELEMENTOR_PRO_VERSION' ) && did_action( 'elementor_pro/init' );
	}

	/**
	 * Get available Elementor widgets.
	 *
	 * @param string $filter Filter: 'all', 'rtcl', 'core', or prefix.
	 *
	 * @return array List of available widgets.
	 */
	public function getAvailableElementorWidgets( string $filter = 'rtcl' ): array {
		$widgets = [];

		// Check if Elementor is active
		if ( ! did_action( 'elementor/loaded' ) ) {
			return [
				'available' => false,
				'message'   => __( 'Elementor is not active.', 'classified-listing' ),
				'widgets'   => [],
			];
		}

		// Get widgets from Elementor registry
		$widgets_manager = \Elementor\Plugin::instance()->widgets_manager;
		if ( ! $widgets_manager ) {
			return [
				'available' => false,
				'message'   => __( 'Elementor widgets manager not available.', 'classified-listing' ),
				'widgets'   => [],
			];
		}

		$registered_widgets = $widgets_manager->get_widget_types();

		foreach ( $registered_widgets as $widget ) {
			$name = $widget->get_name();

			// Apply filter
			if ( $filter !== 'all' ) {
				if ( $filter === 'rtcl' && strpos( $name, 'rtcl' ) === false ) {
					continue;
				}
				if ( $filter === 'core' && strpos( $name, 'rtcl' ) !== false ) {
					continue;
				}
				if ( $filter !== 'rtcl' && $filter !== 'core' && strpos( $name, $filter ) === false ) {
					continue;
				}
			}

			$widgets[] = [
				'id'         => $name,
				'title'      => $widget->get_title(),
				'icon'       => $widget->get_icon(),
				'categories' => $widget->get_categories(),
			];
		}

		return [
			'available' => true,
			'filter'    => $filter,
			'count'     => count( $widgets ),
			'widgets'   => $widgets,
		];
	}

	/**
	 * Get available style/layout options for Gutenberg blocks.
	 * Used by MCP client to prompt user for style selection.
	 *
	 * @param string $block_name Optional specific block name.
	 *
	 * @return array Style options organized by block.
	 */
	public function getBlockStyleOptions( string $block_name = '' ): array {
		$all_options = [
			'rtcl/listing-ads' => [
				'label'       => __( 'Listings Display', 'classified-listing' ),
				'description' => __( 'Show listings from your directory', 'classified-listing' ),
				'styles'      => [
					'view_mode' => [
						'label'       => __( 'View Mode', 'classified-listing' ),
						'description' => __( 'Choose between grid cards or list rows', 'classified-listing' ),
						'attribute'   => 'col_style.style',
						'required'    => true,
						'options'     => [
							[
								'value'       => 'grid',
								'label'       => __( '📦 Grid View', 'classified-listing' ),
								'description' => __( 'Display as cards in columns - best for visual browsing', 'classified-listing' ),
								'recommended' => true,
							],
							[
								'value'       => 'list',
								'label'       => __( '📋 List View', 'classified-listing' ),
								'description' => __( 'Display as horizontal rows - shows more details', 'classified-listing' ),
							],
						],
					],
					'grid_style' => [
						'label'       => __( 'Grid Card Style', 'classified-listing' ),
						'description' => __( 'Visual design for grid cards', 'classified-listing' ),
						'attribute'   => 'rtcl_style_grid',
						'depends_on'  => [ 'view_mode' => 'grid' ],
						'options'     => [
							[ 'value' => 'style-grid', 'label' => __( 'Grid Style 1 - Classic', 'classified-listing' ), 'description' => 'Traditional card layout', 'recommended' => true ],
							[ 'value' => 'style-grid2', 'label' => __( 'Grid Style 2 - Modern', 'classified-listing' ), 'description' => 'Contemporary design with hover effects' ],
							[ 'value' => 'style-grid3', 'label' => __( 'Grid Style 3 - Compact', 'classified-listing' ), 'description' => 'Space-efficient layout' ],
							[ 'value' => 'style-grid4', 'label' => __( 'Grid Style 4 - Featured', 'classified-listing' ), 'description' => 'Emphasis on images' ],
							[ 'value' => 'style-grid5', 'label' => __( 'Grid Style 5 - Minimal', 'classified-listing' ), 'description' => 'Clean and simple' ],
						],
					],
					'list_style' => [
						'label'       => __( 'List Row Style', 'classified-listing' ),
						'description' => __( 'Visual design for list rows', 'classified-listing' ),
						'attribute'   => 'rtcl_style_list',
						'depends_on'  => [ 'view_mode' => 'list' ],
						'options'     => [
							[ 'value' => 'style-list1', 'label' => __( 'List Style 1 - Standard', 'classified-listing' ), 'description' => 'Traditional horizontal layout', 'recommended' => true ],
							[ 'value' => 'style-list2', 'label' => __( 'List Style 2 - Detailed', 'classified-listing' ), 'description' => 'More info visible' ],
							[ 'value' => 'style-list3', 'label' => __( 'List Style 3 - Compact', 'classified-listing' ), 'description' => 'Space-efficient rows' ],
							[ 'value' => 'style-list4', 'label' => __( 'List Style 4 - Image Focus', 'classified-listing' ), 'description' => 'Larger thumbnails' ],
							[ 'value' => 'style-list5', 'label' => __( 'List Style 5 - Minimal', 'classified-listing' ), 'description' => 'Clean design' ],
						],
					],
					'columns' => [
						'label'       => __( 'Columns per Row', 'classified-listing' ),
						'description' => __( 'Number of listings per row on desktop', 'classified-listing' ),
						'attribute'   => 'col_desktop',
						'depends_on'  => [ 'view_mode' => 'grid' ],
						'options'     => [
							[ 'value' => '2', 'label' => '2 Columns' ],
							[ 'value' => '3', 'label' => '3 Columns', 'recommended' => true ],
							[ 'value' => '4', 'label' => '4 Columns' ],
							[ 'value' => '6', 'label' => '6 Columns' ],
						],
					],
					'items_count' => [
						'label'       => __( 'Number of Listings', 'classified-listing' ),
						'description' => __( 'How many listings to display?', 'classified-listing' ),
						'attribute'   => 'perPage',
						'options'     => [
							[ 'value' => 3, 'label' => '3 Listings' ],
							[ 'value' => 6, 'label' => '6 Listings', 'recommended' => true ],
							[ 'value' => 9, 'label' => '9 Listings' ],
							[ 'value' => 12, 'label' => '12 Listings' ],
						],
					],
				],
			],
			'rtcl/listing-cat-box' => [
				'label'       => __( 'Category Boxes', 'classified-listing' ),
				'description' => __( 'Display category boxes with icons', 'classified-listing' ),
				'styles'      => [
					'box_style' => [
						'label'       => __( 'Box Style', 'classified-listing' ),
						'description' => __( 'Visual style for category boxes', 'classified-listing' ),
						'attribute'   => 'col_style.style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'style-grid', 'label' => __( '🎨 Style 1 - Classic Grid', 'classified-listing' ), 'description' => 'Icon centered above category name', 'recommended' => true ],
							[ 'value' => 'style-grid2', 'label' => __( '✨ Style 2 - Modern Card', 'classified-listing' ), 'description' => 'Card with icon background and subcategories' ],
						],
					],
					'columns' => [
						'label'       => __( 'Columns per Row', 'classified-listing' ),
						'description' => __( 'Number of categories per row', 'classified-listing' ),
						'attribute'   => 'col_desktop',
						'options'     => [
							[ 'value' => '3', 'label' => '3 Columns' ],
							[ 'value' => '4', 'label' => '4 Columns', 'recommended' => true ],
							[ 'value' => '5', 'label' => '5 Columns' ],
							[ 'value' => '6', 'label' => '6 Columns' ],
						],
					],
					'category_count' => [
						'label'       => __( 'Number of Categories', 'classified-listing' ),
						'description' => __( 'How many categories to show?', 'classified-listing' ),
						'attribute'   => 'category_limit',
						'options'     => [
							[ 'value' => 4, 'label' => '4 Categories' ],
							[ 'value' => 6, 'label' => '6 Categories' ],
							[ 'value' => 8, 'label' => '8 Categories', 'recommended' => true ],
							[ 'value' => 12, 'label' => '12 Categories' ],
						],
					],
					'icon_type' => [
						'label'       => __( 'Icon Display', 'classified-listing' ),
						'description' => __( 'Show icon or image for categories?', 'classified-listing' ),
						'attribute'   => 'icon_type',
						'options'     => [
							[ 'value' => 'icon', 'label' => __( '🔷 Icon', 'classified-listing' ), 'description' => 'Use category icons', 'recommended' => true ],
							[ 'value' => 'image', 'label' => __( '🖼️ Image', 'classified-listing' ), 'description' => 'Use category images' ],
						],
					],
				],
			],
			'rtcl/listing-search' => [
				'label'       => __( 'Search Form', 'classified-listing' ),
				'description' => __( 'Listing search form with filters', 'classified-listing' ),
				'styles'      => [
					'orientation' => [
						'label'       => __( 'Form Layout', 'classified-listing' ),
						'description' => __( 'How should the search form be arranged?', 'classified-listing' ),
						'attribute'   => 'search_oriantation',
						'required'    => true,
						'options'     => [
							[ 'value' => 'inline', 'label' => __( '➡️ Horizontal / Inline', 'classified-listing' ), 'description' => 'All fields in a single row - compact design', 'recommended' => true ],
							[ 'value' => 'vertical', 'label' => __( '⬇️ Vertical / Stacked', 'classified-listing' ), 'description' => 'Fields stacked vertically - more prominent' ],
						],
					],
					'search_style' => [
						'label'       => __( 'Dropdown Behavior', 'classified-listing' ),
						'description' => __( 'How should category/location dropdowns work?', 'classified-listing' ),
						'attribute'   => 'search_style',
						'options'     => [
							[ 'value' => 'dependency', 'label' => __( '🔗 Dependent', 'classified-listing' ), 'description' => 'Location filters based on selected category', 'recommended' => true ],
							[ 'value' => 'standard', 'label' => __( '📋 Independent', 'classified-listing' ), 'description' => 'All dropdowns work independently' ],
						],
					],
				],
			],
			'rtcl/all-location' => [
				'label'       => __( 'Locations Display', 'classified-listing' ),
				'description' => __( 'Show all locations with listing counts', 'classified-listing' ),
				'styles'      => [
					'view_mode' => [
						'label'       => __( 'View Mode', 'classified-listing' ),
						'description' => __( 'How to display locations?', 'classified-listing' ),
						'attribute'   => 'col_style.style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'grid', 'label' => __( '📦 Grid Layout', 'classified-listing' ), 'description' => 'Location cards in columns', 'recommended' => true ],
							[ 'value' => 'list', 'label' => __( '📋 List Layout', 'classified-listing' ), 'description' => 'Locations in a vertical list' ],
						],
					],
					'grid_style' => [
						'label'       => __( 'Grid Style', 'classified-listing' ),
						'description' => __( 'Visual style for grid view', 'classified-listing' ),
						'attribute'   => 'rtcl_style',
						'depends_on'  => [ 'view_mode' => 'grid' ],
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( 'Style 1 - Classic', 'classified-listing' ), 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( 'Style 2 - Modern', 'classified-listing' ) ],
						],
					],
					'location_count' => [
						'label'       => __( 'Number of Locations', 'classified-listing' ),
						'description' => __( 'How many locations to show?', 'classified-listing' ),
						'attribute'   => 'location_limit',
						'options'     => [
							[ 'value' => 4, 'label' => '4 Locations' ],
							[ 'value' => 6, 'label' => '6 Locations' ],
							[ 'value' => 8, 'label' => '8 Locations', 'recommended' => true ],
						],
					],
				],
			],
			'rtcl/single-location' => [
				'label'       => __( 'Single Location Box', 'classified-listing' ),
				'description' => __( 'Display a single location with details', 'classified-listing' ),
				'styles'      => [
					'box_style' => [
						'label'       => __( 'Box Style', 'classified-listing' ),
						'description' => __( 'Visual style for the location box', 'classified-listing' ),
						'attribute'   => 'rtcl_style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( '🎨 Style 1 - Basic', 'classified-listing' ), 'description' => 'Simple location card', 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( '✨ Style 2 - With Image', 'classified-listing' ), 'description' => 'Location with background image' ],
							[ 'value' => 'style-3', 'label' => __( '🖼️ Style 3 - Overlay', 'classified-listing' ), 'description' => 'Image with text overlay' ],
						],
					],
				],
			],
			'rtcl/pricing-table' => [
				'label'       => __( 'Pricing Table', 'classified-listing' ),
				'description' => __( 'Display membership/pricing tiers', 'classified-listing' ),
				'styles'      => [
					'table_style' => [
						'label'       => __( 'Table Style', 'classified-listing' ),
						'description' => __( 'Visual design for pricing table', 'classified-listing' ),
						'attribute'   => 'rtcl_view',
						'required'    => true,
						'options'     => [
							[ 'value' => 'view-1', 'label' => __( '💳 View 1 - Classic', 'classified-listing' ), 'description' => 'Traditional pricing card', 'recommended' => true ],
							[ 'value' => 'view-2', 'label' => __( '✨ View 2 - Modern', 'classified-listing' ), 'description' => 'Contemporary design' ],
							[ 'value' => 'view-3', 'label' => __( '🎨 View 3 - Featured', 'classified-listing' ), 'description' => 'Highlighted design' ],
						],
					],
				],
			],
		];

		/**
		 * Filter the Gutenberg block style options, so add-ons can describe the blocks they register.
		 *
		 * @param array $all_options Style options keyed by block name.
		 */
		$all_options = apply_filters( 'rtcl_mcp_block_style_options', $all_options );

		if ( $block_name ) {
			return $all_options[ $block_name ] ?? [];
		}

		return $all_options;
	}

	/**
	 * Get available style/layout options for Elementor widgets.
	 * Used by MCP client to prompt user for style selection.
	 *
	 * @param string $widget_name Optional specific widget name.
	 *
	 * @return array Style options organized by widget.
	 */
	public function getWidgetStyleOptions( string $widget_name = '' ): array {
		$all_options = [
			// Default Elementor widgets with style options
			'heading' => [
				'label'       => __( 'Heading', 'classified-listing' ),
				'description' => __( 'Add headings and titles', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'header_size' => [
						'label'       => __( 'Heading Level', 'classified-listing' ),
						'description' => __( 'HTML heading tag', 'classified-listing' ),
						'attribute'   => 'header_size',
						'options'     => [
							[ 'value' => 'h1', 'label' => 'H1 - Main Title', 'description' => 'Largest heading, typically one per page' ],
							[ 'value' => 'h2', 'label' => 'H2 - Section Title', 'description' => 'Second level heading', 'recommended' => true ],
							[ 'value' => 'h3', 'label' => 'H3 - Subsection', 'description' => 'Third level heading' ],
							[ 'value' => 'h4', 'label' => 'H4 - Small Heading', 'description' => 'Fourth level heading' ],
						],
					],
					'align' => [
						'label'       => __( 'Text Alignment', 'classified-listing' ),
						'description' => __( 'Horizontal alignment', 'classified-listing' ),
						'attribute'   => 'align',
						'options'     => [
							[ 'value' => 'left', 'label' => __( '⬅️ Left', 'classified-listing' ) ],
							[ 'value' => 'center', 'label' => __( '↔️ Center', 'classified-listing' ), 'recommended' => true ],
							[ 'value' => 'right', 'label' => __( '➡️ Right', 'classified-listing' ) ],
						],
					],
				],
			],
			'button' => [
				'label'       => __( 'Button', 'classified-listing' ),
				'description' => __( 'Clickable button with link', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'button_type' => [
						'label'       => __( 'Button Style', 'classified-listing' ),
						'description' => __( 'Visual style of the button', 'classified-listing' ),
						'attribute'   => 'button_type',
						'options'     => [
							[ 'value' => '', 'label' => __( '🔵 Default', 'classified-listing' ), 'description' => 'Theme default style', 'recommended' => true ],
							[ 'value' => 'info', 'label' => __( 'ℹ️ Info', 'classified-listing' ), 'description' => 'Blue informational style' ],
							[ 'value' => 'success', 'label' => __( '✅ Success', 'classified-listing' ), 'description' => 'Green success style' ],
							[ 'value' => 'warning', 'label' => __( '⚠️ Warning', 'classified-listing' ), 'description' => 'Yellow/orange warning style' ],
							[ 'value' => 'danger', 'label' => __( '🔴 Danger', 'classified-listing' ), 'description' => 'Red danger/action style' ],
						],
					],
					'size' => [
						'label'       => __( 'Button Size', 'classified-listing' ),
						'description' => __( 'Size of the button', 'classified-listing' ),
						'attribute'   => 'size',
						'options'     => [
							[ 'value' => 'xs', 'label' => 'Extra Small' ],
							[ 'value' => 'sm', 'label' => 'Small', 'recommended' => true ],
							[ 'value' => 'md', 'label' => 'Medium' ],
							[ 'value' => 'lg', 'label' => 'Large' ],
							[ 'value' => 'xl', 'label' => 'Extra Large' ],
						],
					],
				],
			],
			'icon-box' => [
				'label'       => __( 'Icon Box', 'classified-listing' ),
				'description' => __( 'Icon with title and description', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'view' => [
						'label'       => __( 'Icon View', 'classified-listing' ),
						'description' => __( 'Visual style for the icon', 'classified-listing' ),
						'attribute'   => 'view',
						'options'     => [
							[ 'value' => 'default', 'label' => __( '📍 Default', 'classified-listing' ), 'description' => 'Plain icon without background', 'recommended' => true ],
							[ 'value' => 'stacked', 'label' => __( '🔳 Stacked', 'classified-listing' ), 'description' => 'Icon with solid background shape' ],
							[ 'value' => 'framed', 'label' => __( '🔲 Framed', 'classified-listing' ), 'description' => 'Icon with border frame' ],
						],
					],
					'position' => [
						'label'       => __( 'Icon Position', 'classified-listing' ),
						'description' => __( 'Where to place the icon', 'classified-listing' ),
						'attribute'   => 'position',
						'options'     => [
							[ 'value' => 'top', 'label' => __( '⬆️ Top', 'classified-listing' ), 'description' => 'Icon above content', 'recommended' => true ],
							[ 'value' => 'left', 'label' => __( '⬅️ Left', 'classified-listing' ), 'description' => 'Icon to the left of content' ],
							[ 'value' => 'right', 'label' => __( '➡️ Right', 'classified-listing' ), 'description' => 'Icon to the right of content' ],
						],
					],
				],
			],
			'testimonial' => [
				'label'       => __( 'Testimonial', 'classified-listing' ),
				'description' => __( 'Customer testimonial with quote', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'image_position' => [
						'label'       => __( 'Image Position', 'classified-listing' ),
						'description' => __( 'Where to place the customer image', 'classified-listing' ),
						'attribute'   => 'image_position',
						'options'     => [
							[ 'value' => 'aside', 'label' => __( '↔️ Aside', 'classified-listing' ), 'description' => 'Image to the side of quote', 'recommended' => true ],
							[ 'value' => 'top', 'label' => __( '⬆️ Top', 'classified-listing' ), 'description' => 'Image above the quote' ],
							[ 'value' => 'bottom', 'label' => __( '⬇️ Bottom', 'classified-listing' ), 'description' => 'Image below the quote' ],
						],
					],
				],
			],
			'tabs' => [
				'label'       => __( 'Tabs', 'classified-listing' ),
				'description' => __( 'Tabbed content panels', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'type' => [
						'label'       => __( 'Tab Orientation', 'classified-listing' ),
						'description' => __( 'How tabs are arranged', 'classified-listing' ),
						'attribute'   => 'type',
						'options'     => [
							[ 'value' => 'horizontal', 'label' => __( '➡️ Horizontal', 'classified-listing' ), 'description' => 'Tabs in a row above content', 'recommended' => true ],
							[ 'value' => 'vertical', 'label' => __( '⬇️ Vertical', 'classified-listing' ), 'description' => 'Tabs in a column to the side' ],
						],
					],
				],
			],
			'icon-list' => [
				'label'       => __( 'Icon List', 'classified-listing' ),
				'description' => __( 'List with icons', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'view' => [
						'label'       => __( 'List Layout', 'classified-listing' ),
						'description' => __( 'How list items are arranged', 'classified-listing' ),
						'attribute'   => 'view',
						'options'     => [
							[ 'value' => 'traditional', 'label' => __( '📋 Traditional', 'classified-listing' ), 'description' => 'Vertical list, one item per line', 'recommended' => true ],
							[ 'value' => 'inline', 'label' => __( '➡️ Inline', 'classified-listing' ), 'description' => 'Items in a horizontal row' ],
						],
					],
				],
			],
			'social-icons' => [
				'label'       => __( 'Social Icons', 'classified-listing' ),
				'description' => __( 'Social media icon links', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'shape' => [
						'label'       => __( 'Icon Shape', 'classified-listing' ),
						'description' => __( 'Shape of the icon background', 'classified-listing' ),
						'attribute'   => 'shape',
						'options'     => [
							[ 'value' => 'rounded', 'label' => __( '🔵 Rounded', 'classified-listing' ), 'description' => 'Rounded corners', 'recommended' => true ],
							[ 'value' => 'square', 'label' => __( '🟦 Square', 'classified-listing' ), 'description' => 'Sharp square corners' ],
							[ 'value' => 'circle', 'label' => __( '⭕ Circle', 'classified-listing' ), 'description' => 'Fully circular' ],
						],
					],
				],
			],
			'alert' => [
				'label'       => __( 'Alert', 'classified-listing' ),
				'description' => __( 'Notification/alert box', 'classified-listing' ),
				'category'    => 'default',
				'styles'      => [
					'alert_type' => [
						'label'       => __( 'Alert Type', 'classified-listing' ),
						'description' => __( 'Visual style and color', 'classified-listing' ),
						'attribute'   => 'alert_type',
						'options'     => [
							[ 'value' => 'info', 'label' => __( 'ℹ️ Info', 'classified-listing' ), 'description' => 'Blue informational alert', 'recommended' => true ],
							[ 'value' => 'success', 'label' => __( '✅ Success', 'classified-listing' ), 'description' => 'Green success message' ],
							[ 'value' => 'warning', 'label' => __( '⚠️ Warning', 'classified-listing' ), 'description' => 'Yellow/orange warning' ],
							[ 'value' => 'danger', 'label' => __( '🔴 Danger', 'classified-listing' ), 'description' => 'Red error/danger alert' ],
						],
					],
				],
			],
			// RTCL widgets
			'rtcl-listing-items' => [
				'label'       => __( 'Listings Display', 'classified-listing' ),
				'description' => __( 'Show listings from your directory', 'classified-listing' ),
				'styles'      => [
					'view_mode' => [
						'label'       => __( 'View Mode', 'classified-listing' ),
						'description' => __( 'Choose between grid cards or list rows', 'classified-listing' ),
						'attribute'   => 'rtcl_listings_view',
						'required'    => true,
						'options'     => [
							[
								'value'       => 'grid',
								'label'       => __( '📦 Grid View', 'classified-listing' ),
								'description' => __( 'Cards in columns - best for visual browsing', 'classified-listing' ),
								'icon'        => 'eicon-gallery-grid',
								'recommended' => true,
							],
							[
								'value'       => 'list',
								'label'       => __( '📋 List View', 'classified-listing' ),
								'description' => __( 'Horizontal rows - shows more details', 'classified-listing' ),
								'icon'        => 'eicon-post-list',
							],
						],
					],
					'card_style' => [
						'label'       => __( 'Card Style', 'classified-listing' ),
						'description' => __( 'Visual design for listing cards', 'classified-listing' ),
						'attribute'   => 'rtcl_listings_style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( '🎨 Style 1 - Classic', 'classified-listing' ), 'description' => 'Traditional card layout with image, title, price', 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( '✨ Style 2 - Modern', 'classified-listing' ), 'description' => 'Contemporary design with hover effects' ],
							[ 'value' => 'style-3', 'label' => __( '🔲 Style 3 - Compact', 'classified-listing' ), 'description' => 'Space-efficient minimal design' ],
							[ 'value' => 'style-4', 'label' => __( '🖼️ Style 4 - Image Focus', 'classified-listing' ), 'description' => 'Large image with overlay info' ],
							[ 'value' => 'style-5', 'label' => __( '📄 Style 5 - Detailed', 'classified-listing' ), 'description' => 'Shows more listing details' ],
						],
					],
					'columns' => [
						'label'       => __( 'Columns per Row', 'classified-listing' ),
						'description' => __( 'Number of listings per row on desktop', 'classified-listing' ),
						'attribute'   => 'rtcl_col_lg',
						'depends_on'  => [ 'view_mode' => 'grid' ],
						'options'     => [
							[ 'value' => 2, 'label' => '2 Columns' ],
							[ 'value' => 3, 'label' => '3 Columns', 'recommended' => true ],
							[ 'value' => 4, 'label' => '4 Columns' ],
						],
					],
					'items_count' => [
						'label'       => __( 'Number of Listings', 'classified-listing' ),
						'description' => __( 'How many listings to display?', 'classified-listing' ),
						'attribute'   => 'rtcl_listing_per_page',
						'options'     => [
							[ 'value' => 3, 'label' => '3 Listings' ],
							[ 'value' => 6, 'label' => '6 Listings', 'recommended' => true ],
							[ 'value' => 9, 'label' => '9 Listings' ],
							[ 'value' => 12, 'label' => '12 Listings' ],
						],
					],
				],
			],
			'rtcl-listing-cat-box' => [
				'label'       => __( 'Category Boxes', 'classified-listing' ),
				'description' => __( 'Display category boxes with icons and counts', 'classified-listing' ),
				'styles'      => [
					'box_style' => [
						'label'       => __( 'Box Style', 'classified-listing' ),
						'description' => __( 'Visual style for category boxes', 'classified-listing' ),
						'attribute'   => 'rtcl_cats_style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( '🎨 Style 1 - Basic Grid', 'classified-listing' ), 'description' => 'Icon centered above category name', 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( '✨ Style 2 - With Subcategories', 'classified-listing' ), 'description' => 'Shows subcategories below main category' ],
						],
					],
					'columns' => [
						'label'       => __( 'Columns per Row', 'classified-listing' ),
						'description' => __( 'Number of categories per row', 'classified-listing' ),
						'attribute'   => 'rtcl_col_lg',
						'options'     => [
							[ 'value' => 3, 'label' => '3 Columns' ],
							[ 'value' => 4, 'label' => '4 Columns', 'recommended' => true ],
							[ 'value' => 5, 'label' => '5 Columns' ],
							[ 'value' => 6, 'label' => '6 Columns' ],
						],
					],
					'category_count' => [
						'label'       => __( 'Number of Categories', 'classified-listing' ),
						'description' => __( 'How many categories to show?', 'classified-listing' ),
						'attribute'   => 'rtcl_category_limit',
						'options'     => [
							[ 'value' => 4, 'label' => '4 Categories' ],
							[ 'value' => 6, 'label' => '6 Categories' ],
							[ 'value' => 8, 'label' => '8 Categories', 'recommended' => true ],
							[ 'value' => 12, 'label' => '12 Categories' ],
						],
					],
				],
			],
			'rtcl-all-locations' => [
				'label'       => __( 'All Locations', 'classified-listing' ),
				'description' => __( 'Display all locations with listing counts', 'classified-listing' ),
				'styles'      => [
					'view_mode' => [
						'label'       => __( 'View Mode', 'classified-listing' ),
						'description' => __( 'How to display locations?', 'classified-listing' ),
						'attribute'   => 'rtcl_view',
						'required'    => true,
						'options'     => [
							[ 'value' => 'grid', 'label' => __( '📦 Grid Layout', 'classified-listing' ), 'description' => 'Location cards in columns', 'recommended' => true ],
							[ 'value' => 'list', 'label' => __( '📋 List Layout', 'classified-listing' ), 'description' => 'Locations in a vertical list' ],
						],
					],
					'grid_style' => [
						'label'       => __( 'Grid Style', 'classified-listing' ),
						'description' => __( 'Visual style for grid view', 'classified-listing' ),
						'attribute'   => 'rtcl_style',
						'depends_on'  => [ 'view_mode' => 'grid' ],
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( 'Style 1 - Classic', 'classified-listing' ), 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( 'Style 2 - Modern', 'classified-listing' ) ],
						],
					],
					'location_count' => [
						'label'       => __( 'Number of Locations', 'classified-listing' ),
						'description' => __( 'How many locations to show?', 'classified-listing' ),
						'attribute'   => 'rtcl_location_limit',
						'options'     => [
							[ 'value' => 4, 'label' => '4 Locations' ],
							[ 'value' => 6, 'label' => '6 Locations' ],
							[ 'value' => 8, 'label' => '8 Locations', 'recommended' => true ],
						],
					],
				],
			],
			'rtcl-single-location' => [
				'label'       => __( 'Single Location', 'classified-listing' ),
				'description' => __( 'Display a single location box', 'classified-listing' ),
				'styles'      => [
					'box_style' => [
						'label'       => __( 'Box Style', 'classified-listing' ),
						'description' => __( 'Visual style for the location box', 'classified-listing' ),
						'attribute'   => 'rtcl_style',
						'required'    => true,
						'options'     => [
							[ 'value' => 'style-1', 'label' => __( '🎨 Style 1 - Basic', 'classified-listing' ), 'description' => 'Simple location card', 'recommended' => true ],
							[ 'value' => 'style-2', 'label' => __( '✨ Style 2 - With Image', 'classified-listing' ), 'description' => 'Location with background image' ],
							[ 'value' => 'style-3', 'label' => __( '🖼️ Style 3 - Overlay', 'classified-listing' ), 'description' => 'Image with text overlay' ],
						],
					],
				],
			],
			'rtcl-listing-search-form' => [
				'label'       => __( 'Search Form', 'classified-listing' ),
				'description' => __( 'Listing search form with filters', 'classified-listing' ),
				'styles'      => [
					'orientation' => [
						'label'       => __( 'Form Layout', 'classified-listing' ),
						'description' => __( 'How should the search form be arranged?', 'classified-listing' ),
						'attribute'   => 'search_oriantation',
						'required'    => true,
						'options'     => [
							[ 'value' => 'inline', 'label' => __( '➡️ Horizontal / Inline', 'classified-listing' ), 'description' => 'All fields in a single row - compact design', 'recommended' => true ],
							[ 'value' => 'vertical', 'label' => __( '⬇️ Vertical / Stacked', 'classified-listing' ), 'description' => 'Fields stacked vertically - more prominent' ],
						],
					],
				],
			],
			'rtcl-listing-store' => [
				'label'       => __( 'Stores Display (Store Plugin)', 'classified-listing' ),
				'description' => __( 'Show vendor/store listings', 'classified-listing' ),
				'store'       => true,
				'styles'      => [
					'view_mode' => [
						'label'       => __( 'View Mode', 'classified-listing' ),
						'description' => __( 'How to display stores?', 'classified-listing' ),
						'attribute'   => 'rtcl_view',
						'required'    => true,
						'options'     => [
							[ 'value' => 'grid', 'label' => __( '📦 Grid Layout', 'classified-listing' ), 'description' => 'Store cards in columns', 'recommended' => true ],
							[ 'value' => 'list', 'label' => __( '📋 List Layout', 'classified-listing' ), 'description' => 'Stores in horizontal rows' ],
						],
					],
					'store_count' => [
						'label'       => __( 'Number of Stores', 'classified-listing' ),
						'description' => __( 'How many stores to display?', 'classified-listing' ),
						'attribute'   => 'rtcl_store_limit',
						'options'     => [
							[ 'value' => 3, 'label' => '3 Stores' ],
							[ 'value' => 4, 'label' => '4 Stores', 'recommended' => true ],
							[ 'value' => 6, 'label' => '6 Stores' ],
							[ 'value' => 8, 'label' => '8 Stores' ],
						],
					],
				],
			],
		];

		/**
		 * Filter the Elementor widget style options, so add-ons can describe the widgets they enable.
		 *
		 * @param array $all_options Style options keyed by widget name.
		 */
		$all_options = apply_filters( 'rtcl_mcp_widget_style_options', $all_options );

		if ( $widget_name ) {
			return $all_options[ $widget_name ] ?? [];
		}

		return $all_options;
	}

	/**
	 * Build widget/block settings from user style selections.
	 *
	 * @param string $type       'gutenberg' or 'elementor'.
	 * @param string $name       Block/widget name.
	 * @param array  $selections User's style selections (style_key => selected_value).
	 *
	 * @return array Settings to apply to the block/widget.
	 */
	public function buildSettingsFromStyleSelections( string $type, string $name, array $selections ): array {
		$options = $type === 'elementor'
			? $this->getWidgetStyleOptions( $name )
			: $this->getBlockStyleOptions( $name );

		if ( empty( $options['styles'] ) ) {
			return [];
		}

		$settings = [];

		foreach ( $selections as $style_key => $selected_value ) {
			if ( isset( $options['styles'][ $style_key ]['attribute'] ) ) {
				$attribute = $options['styles'][ $style_key ]['attribute'];

				// Handle nested attributes (e.g., 'col_style' => ['style' => 'grid'])
				if ( strpos( $attribute, '.' ) !== false ) {
					$parts = explode( '.', $attribute );
					$settings[ $parts[0] ] = [ $parts[1] => $selected_value ];
				} else {
					$settings[ $attribute ] = $selected_value;
				}
			}
		}

		return $settings;
	}

	/**
	 * Get default Elementor widgets schema for page building.
	 * These are core Elementor widgets that can be used alongside RTCL widgets.
	 *
	 * @return array Default widgets with settings.
	 */
	public function getDefaultElementorWidgetsSchema(): array {
		return [
			'heading' => [
				'title'       => __( 'Heading', 'classified-listing' ),
				'description' => __( 'Add headings and titles to your page.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'title'           => [ 'type' => 'string', 'default' => 'Add Your Heading Text Here', 'description' => 'The heading text' ],
					'header_size'     => [ 'type' => 'string', 'default' => 'h2', 'options' => [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'p' ], 'description' => 'HTML tag' ],
					'align'           => [ 'type' => 'string', 'default' => '', 'options' => [ 'left', 'center', 'right', 'justify' ], 'description' => 'Text alignment' ],
					'link'            => [ 'type' => 'object', 'default' => [ 'url' => '' ], 'description' => 'Optional link' ],
					'size'            => [ 'type' => 'string', 'default' => 'default', 'options' => [ 'default', 'small', 'medium', 'large', 'xl', 'xxl' ] ],
				],
			],
			'text-editor' => [
				'title'       => __( 'Text Editor', 'classified-listing' ),
				'description' => __( 'Add rich text content with WYSIWYG editor.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'editor'     => [ 'type' => 'string', 'default' => '<p>Add your content here.</p>', 'description' => 'HTML content' ],
					'align'      => [ 'type' => 'string', 'default' => '', 'options' => [ 'left', 'center', 'right', 'justify' ] ],
					'text_color' => [ 'type' => 'string', 'default' => '' ],
				],
			],
			'button' => [
				'title'       => __( 'Button', 'classified-listing' ),
				'description' => __( 'Add a clickable button with customizable style.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'text'             => [ 'type' => 'string', 'default' => 'Click Here', 'description' => 'Button text' ],
					'link'             => [ 'type' => 'object', 'default' => [ 'url' => '#', 'is_external' => false ], 'description' => 'Button URL' ],
					'button_type'      => [ 'type' => 'string', 'default' => '', 'options' => [ '', 'info', 'success', 'warning', 'danger' ] ],
					'size'             => [ 'type' => 'string', 'default' => 'sm', 'options' => [ 'xs', 'sm', 'md', 'lg', 'xl' ] ],
					'align'            => [ 'type' => 'string', 'default' => '', 'options' => [ 'left', 'center', 'right', 'justify' ] ],
					'selected_icon'    => [ 'type' => 'object', 'default' => [ 'value' => '', 'library' => 'fa-solid' ], 'description' => 'Button icon' ],
					'icon_align'       => [ 'type' => 'string', 'default' => 'left', 'options' => [ 'left', 'right' ] ],
					'button_css_id'    => [ 'type' => 'string', 'default' => '' ],
				],
			],
			'image' => [
				'title'       => __( 'Image', 'classified-listing' ),
				'description' => __( 'Add an image from the media library.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'image'        => [ 'type' => 'object', 'default' => [ 'url' => '', 'id' => '' ], 'description' => 'Image source' ],
					'image_size'   => [ 'type' => 'string', 'default' => 'large', 'options' => [ 'thumbnail', 'medium', 'large', 'full' ] ],
					'align'        => [ 'type' => 'string', 'default' => '', 'options' => [ 'left', 'center', 'right' ] ],
					'link_to'      => [ 'type' => 'string', 'default' => 'none', 'options' => [ 'none', 'file', 'custom' ] ],
					'link'         => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'caption_source' => [ 'type' => 'string', 'default' => 'none', 'options' => [ 'none', 'attachment', 'custom' ] ],
				],
			],
			'video' => [
				'title'       => __( 'Video', 'classified-listing' ),
				'description' => __( 'Embed videos from YouTube, Vimeo, or self-hosted.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'video_type'    => [ 'type' => 'string', 'default' => 'youtube', 'options' => [ 'youtube', 'vimeo', 'dailymotion', 'hosted', 'external' ] ],
					'youtube_url'   => [ 'type' => 'string', 'default' => 'https://www.youtube.com/watch?v=XHOmBV4js_E' ],
					'vimeo_url'     => [ 'type' => 'string', 'default' => 'https://vimeo.com/235215203' ],
					'autoplay'      => [ 'type' => 'boolean', 'default' => false ],
					'mute'          => [ 'type' => 'boolean', 'default' => false ],
					'loop'          => [ 'type' => 'boolean', 'default' => false ],
					'controls'      => [ 'type' => 'boolean', 'default' => true ],
				],
			],
			'icon' => [
				'title'       => __( 'Icon', 'classified-listing' ),
				'description' => __( 'Add a Font Awesome or custom icon.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'selected_icon' => [ 'type' => 'object', 'default' => [ 'value' => 'fas fa-star', 'library' => 'fa-solid' ] ],
					'view'          => [ 'type' => 'string', 'default' => 'default', 'options' => [ 'default', 'stacked', 'framed' ] ],
					'shape'         => [ 'type' => 'string', 'default' => 'circle', 'options' => [ 'circle', 'square' ] ],
					'link'          => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'align'         => [ 'type' => 'string', 'default' => 'center' ],
				],
			],
			'icon-box' => [
				'title'       => __( 'Icon Box', 'classified-listing' ),
				'description' => __( 'An icon with title and description.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'selected_icon'    => [ 'type' => 'object', 'default' => [ 'value' => 'fas fa-star', 'library' => 'fa-solid' ] ],
					'view'             => [ 'type' => 'string', 'default' => 'default', 'options' => [ 'default', 'stacked', 'framed' ] ],
					'shape'            => [ 'type' => 'string', 'default' => 'circle' ],
					'title_text'       => [ 'type' => 'string', 'default' => 'This is the heading' ],
					'description_text' => [ 'type' => 'string', 'default' => 'Click edit button to change this text.' ],
					'link'             => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'position'         => [ 'type' => 'string', 'default' => 'top', 'options' => [ 'top', 'left', 'right' ] ],
					'title_size'       => [ 'type' => 'string', 'default' => 'h3', 'options' => [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] ],
				],
			],
			'image-box' => [
				'title'       => __( 'Image Box', 'classified-listing' ),
				'description' => __( 'An image with title and description.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'image'            => [ 'type' => 'object', 'default' => [ 'url' => '', 'id' => '' ] ],
					'title_text'       => [ 'type' => 'string', 'default' => 'This is the heading' ],
					'description_text' => [ 'type' => 'string', 'default' => 'Click edit button to change this text.' ],
					'link'             => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'position'         => [ 'type' => 'string', 'default' => 'top', 'options' => [ 'top', 'left', 'right' ] ],
					'title_size'       => [ 'type' => 'string', 'default' => 'h3' ],
				],
			],
			'spacer' => [
				'title'       => __( 'Spacer', 'classified-listing' ),
				'description' => __( 'Add vertical spacing between elements.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'space' => [ 'type' => 'object', 'default' => [ 'size' => 50, 'unit' => 'px' ], 'description' => 'Space height' ],
				],
			],
			'divider' => [
				'title'       => __( 'Divider', 'classified-listing' ),
				'description' => __( 'Add a horizontal line separator.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'style'  => [ 'type' => 'string', 'default' => 'solid', 'options' => [ 'solid', 'double', 'dotted', 'dashed', 'groove' ] ],
					'weight' => [ 'type' => 'object', 'default' => [ 'size' => 1, 'unit' => 'px' ] ],
					'color'  => [ 'type' => 'string', 'default' => '#2c2c2c' ],
					'width'  => [ 'type' => 'object', 'default' => [ 'size' => 100, 'unit' => '%' ] ],
					'align'  => [ 'type' => 'string', 'default' => 'center' ],
					'gap'    => [ 'type' => 'object', 'default' => [ 'size' => 15, 'unit' => 'px' ] ],
				],
			],
			'google-maps' => [
				'title'       => __( 'Google Maps', 'classified-listing' ),
				'description' => __( 'Embed a Google Map location.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'address' => [ 'type' => 'string', 'default' => 'London Eye, London, United Kingdom' ],
					'zoom'    => [ 'type' => 'object', 'default' => [ 'size' => 10 ] ],
					'height'  => [ 'type' => 'object', 'default' => [ 'size' => 300, 'unit' => 'px' ] ],
				],
			],
			'icon-list' => [
				'title'       => __( 'Icon List', 'classified-listing' ),
				'description' => __( 'A list with icons for each item.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'icon_list' => [
						'type'    => 'array',
						'default' => [
							[ 'text' => 'List Item #1', 'selected_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
							[ 'text' => 'List Item #2', 'selected_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
							[ 'text' => 'List Item #3', 'selected_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
						],
					],
					'view'      => [ 'type' => 'string', 'default' => 'traditional', 'options' => [ 'traditional', 'inline' ] ],
				],
			],
			'counter' => [
				'title'       => __( 'Counter', 'classified-listing' ),
				'description' => __( 'Animated number counter with title.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'starting_number' => [ 'type' => 'number', 'default' => 0 ],
					'ending_number'   => [ 'type' => 'number', 'default' => 100 ],
					'prefix'          => [ 'type' => 'string', 'default' => '' ],
					'suffix'          => [ 'type' => 'string', 'default' => '' ],
					'duration'        => [ 'type' => 'number', 'default' => 2000 ],
					'thousand_separator' => [ 'type' => 'boolean', 'default' => true ],
					'title'           => [ 'type' => 'string', 'default' => 'Cool Number' ],
				],
			],
			'progress' => [
				'title'       => __( 'Progress Bar', 'classified-listing' ),
				'description' => __( 'Animated progress bar with percentage.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'title'       => [ 'type' => 'string', 'default' => 'My Skill' ],
					'progress_type' => [ 'type' => 'string', 'default' => '', 'options' => [ '', 'info', 'success', 'warning', 'danger' ] ],
					'percent'     => [ 'type' => 'object', 'default' => [ 'size' => 50 ] ],
					'display_percentage' => [ 'type' => 'boolean', 'default' => true ],
					'inner_text'  => [ 'type' => 'string', 'default' => '' ],
				],
			],
			'testimonial' => [
				'title'       => __( 'Testimonial', 'classified-listing' ),
				'description' => __( 'Customer testimonial with image and quote.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'testimonial_content' => [ 'type' => 'string', 'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' ],
					'testimonial_image'   => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'testimonial_name'    => [ 'type' => 'string', 'default' => 'John Doe' ],
					'testimonial_job'     => [ 'type' => 'string', 'default' => 'Designer' ],
					'image_position'      => [ 'type' => 'string', 'default' => 'aside', 'options' => [ 'aside', 'top', 'bottom' ] ],
					'alignment'           => [ 'type' => 'string', 'default' => 'center' ],
				],
			],
			'tabs' => [
				'title'       => __( 'Tabs', 'classified-listing' ),
				'description' => __( 'Tabbed content with multiple panels.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'tabs' => [
						'type'    => 'array',
						'default' => [
							[ 'tab_title' => 'Tab #1', 'tab_content' => 'Content for Tab #1' ],
							[ 'tab_title' => 'Tab #2', 'tab_content' => 'Content for Tab #2' ],
						],
					],
					'type' => [ 'type' => 'string', 'default' => 'horizontal', 'options' => [ 'horizontal', 'vertical' ] ],
				],
			],
			'accordion' => [
				'title'       => __( 'Accordion', 'classified-listing' ),
				'description' => __( 'Collapsible content panels.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'tabs' => [
						'type'    => 'array',
						'default' => [
							[ 'tab_title' => 'Accordion #1', 'tab_content' => 'Content for Accordion #1' ],
							[ 'tab_title' => 'Accordion #2', 'tab_content' => 'Content for Accordion #2' ],
						],
					],
					'selected_icon'        => [ 'type' => 'object', 'default' => [ 'value' => 'fas fa-plus', 'library' => 'fa-solid' ] ],
					'selected_active_icon' => [ 'type' => 'object', 'default' => [ 'value' => 'fas fa-minus', 'library' => 'fa-solid' ] ],
				],
			],
			'toggle' => [
				'title'       => __( 'Toggle', 'classified-listing' ),
				'description' => __( 'Toggleable content panels (FAQ style).', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'tabs' => [
						'type'    => 'array',
						'default' => [
							[ 'tab_title' => 'Toggle #1', 'tab_content' => 'Content for Toggle #1' ],
							[ 'tab_title' => 'Toggle #2', 'tab_content' => 'Content for Toggle #2' ],
						],
					],
				],
			],
			'social-icons' => [
				'title'       => __( 'Social Icons', 'classified-listing' ),
				'description' => __( 'Social media icon links.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'social_icon_list' => [
						'type'    => 'array',
						'default' => [
							[ 'social_icon' => [ 'value' => 'fab fa-facebook', 'library' => 'fa-brands' ], 'link' => [ 'url' => '#' ] ],
							[ 'social_icon' => [ 'value' => 'fab fa-twitter', 'library' => 'fa-brands' ], 'link' => [ 'url' => '#' ] ],
							[ 'social_icon' => [ 'value' => 'fab fa-youtube', 'library' => 'fa-brands' ], 'link' => [ 'url' => '#' ] ],
						],
					],
					'shape'    => [ 'type' => 'string', 'default' => 'rounded', 'options' => [ 'rounded', 'square', 'circle' ] ],
					'align'    => [ 'type' => 'string', 'default' => 'center' ],
				],
			],
			'alert' => [
				'title'       => __( 'Alert', 'classified-listing' ),
				'description' => __( 'Dismissible alert/notification box.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'alert_type'    => [ 'type' => 'string', 'default' => 'info', 'options' => [ 'info', 'success', 'warning', 'danger' ] ],
					'alert_title'   => [ 'type' => 'string', 'default' => 'This is an Alert' ],
					'alert_description' => [ 'type' => 'string', 'default' => 'I am a description. Click the edit button to change this text.' ],
					'show_dismiss'  => [ 'type' => 'boolean', 'default' => true ],
				],
			],
			'html' => [
				'title'       => __( 'HTML', 'classified-listing' ),
				'description' => __( 'Add custom HTML code.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'html' => [ 'type' => 'string', 'default' => '' ],
				],
			],
			'shortcode' => [
				'title'       => __( 'Shortcode', 'classified-listing' ),
				'description' => __( 'Insert any WordPress shortcode.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'shortcode' => [ 'type' => 'string', 'default' => '' ],
				],
			],
			'star-rating' => [
				'title'       => __( 'Star Rating', 'classified-listing' ),
				'description' => __( 'Display a star rating.', 'classified-listing' ),
				'category'    => 'basic',
				'settings'    => [
					'rating_scale' => [ 'type' => 'number', 'default' => 5 ],
					'rating'       => [ 'type' => 'object', 'default' => [ 'size' => 4 ] ],
					'star_style'   => [ 'type' => 'string', 'default' => 'star_fontawesome', 'options' => [ 'star_fontawesome', 'star_unicode' ] ],
					'title'        => [ 'type' => 'string', 'default' => '' ],
					'align'        => [ 'type' => 'string', 'default' => 'center' ],
				],
			],
			'slides' => [
				'title'       => __( 'Slides', 'classified-listing' ),
				'description' => __( 'Full-screen slider/carousel with images and content.', 'classified-listing' ),
				'category'    => 'pro',
				'settings'    => [
					'slides' => [
						'type'    => 'array',
						'default' => [
							[
								'heading'           => 'Slide 1 Heading',
								'description'       => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
								'button_text'       => 'Click Here',
								'link'              => [ 'url' => '#' ],
								'background_color'  => '#833AB4',
								'background_image'  => [ 'url' => '' ],
							],
							[
								'heading'           => 'Slide 2 Heading',
								'description'       => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
								'button_text'       => 'Click Here',
								'link'              => [ 'url' => '#' ],
								'background_color'  => '#FD1D1D',
								'background_image'  => [ 'url' => '' ],
							],
							[
								'heading'           => 'Slide 3 Heading',
								'description'       => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
								'button_text'       => 'Click Here',
								'link'              => [ 'url' => '#' ],
								'background_color'  => '#FCB045',
								'background_image'  => [ 'url' => '' ],
							],
						],
					],
					'slides_per_view' => [ 'type' => 'number', 'default' => 1 ],
					'autoplay'        => [ 'type' => 'boolean', 'default' => true ],
					'autoplay_speed'  => [ 'type' => 'number', 'default' => 5000 ],
					'infinite'        => [ 'type' => 'boolean', 'default' => true ],
					'effect'          => [ 'type' => 'string', 'default' => 'slide', 'options' => [ 'slide', 'fade', 'cube' ] ],
					'navigation'      => [ 'type' => 'string', 'default' => 'both', 'options' => [ 'arrows', 'dots', 'both', 'none' ] ],
					'content_animation' => [ 'type' => 'string', 'default' => 'fadeInUp' ],
					'height'          => [ 'type' => 'object', 'default' => [ 'size' => 500, 'unit' => 'px' ] ],
				],
			],
			'call-to-action' => [
				'title'       => __( 'Call to Action', 'classified-listing' ),
				'description' => __( 'Banner with title, description, and button over background.', 'classified-listing' ),
				'category'    => 'pro',
				'settings'    => [
					'skin'               => [ 'type' => 'string', 'default' => 'cover', 'options' => [ 'classic', 'cover' ] ],
					'title'              => [ 'type' => 'string', 'default' => 'This is the heading' ],
					'description'        => [ 'type' => 'string', 'default' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' ],
					'button'             => [ 'type' => 'string', 'default' => 'Click Here' ],
					'link'               => [ 'type' => 'object', 'default' => [ 'url' => '#' ] ],
					'background_image'   => [ 'type' => 'object', 'default' => [ 'url' => '' ] ],
					'background_color'   => [ 'type' => 'string', 'default' => '#4054B2' ],
					'min_height'         => [ 'type' => 'object', 'default' => [ 'size' => 300, 'unit' => 'px' ] ],
					'position'           => [ 'type' => 'string', 'default' => 'center center' ],
					'title_tag'          => [ 'type' => 'string', 'default' => 'h2' ],
				],
			],
			'price-table' => [
				'title'       => __( 'Price Table', 'classified-listing' ),
				'description' => __( 'Pricing card with features and CTA button.', 'classified-listing' ),
				'category'    => 'pro',
				'settings'    => [
					'heading'       => [ 'type' => 'string', 'default' => 'Basic' ],
					'sub_heading'   => [ 'type' => 'string', 'default' => 'Perfect for starters' ],
					'price'         => [ 'type' => 'string', 'default' => '49' ],
					'currency'      => [ 'type' => 'string', 'default' => '$' ],
					'period'        => [ 'type' => 'string', 'default' => '/month' ],
					'features_list' => [
						'type'    => 'array',
						'default' => [
							[ 'item' => 'Feature 1', 'item_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
							[ 'item' => 'Feature 2', 'item_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
							[ 'item' => 'Feature 3', 'item_icon' => [ 'value' => 'fas fa-check', 'library' => 'fa-solid' ] ],
						],
					],
					'button_text'   => [ 'type' => 'string', 'default' => 'Buy Now' ],
					'link'          => [ 'type' => 'object', 'default' => [ 'url' => '#' ] ],
					'featured'      => [ 'type' => 'boolean', 'default' => false, 'description' => 'Highlight this plan' ],
					'ribbon_title'  => [ 'type' => 'string', 'default' => 'Popular' ],
				],
			],
			'image-carousel' => [
				'title'       => __( 'Image Carousel', 'classified-listing' ),
				'description' => __( 'Carousel of images with navigation.', 'classified-listing' ),
				'category'    => 'pro',
				'settings'    => [
					'carousel' => [
						'type'    => 'array',
						'default' => [
							[ 'image' => [ 'url' => '' ] ],
							[ 'image' => [ 'url' => '' ] ],
							[ 'image' => [ 'url' => '' ] ],
						],
					],
					'slides_to_show' => [ 'type' => 'number', 'default' => 3 ],
					'autoplay'       => [ 'type' => 'boolean', 'default' => true ],
					'infinite'       => [ 'type' => 'boolean', 'default' => true ],
					'navigation'     => [ 'type' => 'string', 'default' => 'both' ],
					'image_stretch'  => [ 'type' => 'boolean', 'default' => false ],
				],
			],
		];
	}

	/**
	 * Get all Elementor widgets schema (default + RTCL).
	 * Combines core Elementor widgets with RTCL-specific widgets.
	 *
	 * @return array Combined widgets schema.
	 */
	public function getAllElementorWidgetsSchema(): array {
		$default_widgets = $this->getDefaultElementorWidgetsSchema();
		$rtcl_widgets = $this->getRtclElementorWidgetsSchema();

		return [
			'default_widgets' => [
				'label'       => __( 'Elementor Default Widgets', 'classified-listing' ),
				'description' => __( 'Core Elementor widgets for general page building', 'classified-listing' ),
				'count'       => count( $default_widgets ),
				'widgets'     => $default_widgets,
			],
			'rtcl_widgets' => [
				'label'       => __( 'RTCL Widgets', 'classified-listing' ),
				'description' => __( 'Classified Listing widgets for directory functionality', 'classified-listing' ),
				'count'       => count( $rtcl_widgets ),
				'widgets'     => $rtcl_widgets,
			],
			'total_count' => count( $default_widgets ) + count( $rtcl_widgets ),
		];
	}

	/**
	 * Get RTCL Elementor widgets with their settings schema.
	 *
	 * @return array Widgets with settings.
	 */
	public function getRtclElementorWidgetsSchema(): array {
		// Define RTCL Elementor widgets with their key settings
		$widgets = [
			'rtcl-listing-items' => [
				'title'       => __( 'Listing Showcase', 'classified-listing' ),
				'description' => __( 'Display listings in grid or list view.', 'classified-listing' ),
				'settings'    => [
					'rtcl_listings_by_categories' => [ 'type' => 'array', 'default' => [], 'description' => 'Category IDs to filter' ],
					'rtcl_locations'              => [ 'type' => 'array', 'default' => [], 'description' => 'Location IDs to filter' ],
					'rtcl_listing_per_page'       => [ 'type' => 'number', 'default' => 5, 'description' => 'Number of listings' ],
					'rtcl_orderby'                => [ 'type' => 'string', 'default' => 'date', 'options' => [ 'date', 'price', 'views', 'rand' ] ],
					'rtcl_order'                  => [ 'type' => 'string', 'default' => 'desc', 'options' => [ 'asc', 'desc' ] ],
					'rtcl_listings_view'          => [ 'type' => 'string', 'default' => 'grid', 'options' => [ 'grid', 'list' ] ],
					'rtcl_listings_style'         => [ 'type' => 'string', 'default' => 'style-1' ],
					'rtcl_col_xl'                 => [ 'type' => 'number', 'default' => 4, 'description' => 'Columns on XL screens' ],
					'rtcl_col_lg'                 => [ 'type' => 'number', 'default' => 3, 'description' => 'Columns on desktop' ],
					'rtcl_col_md'                 => [ 'type' => 'number', 'default' => 2, 'description' => 'Columns on tablet' ],
					'rtcl_col_sm'                 => [ 'type' => 'number', 'default' => 1, 'description' => 'Columns on mobile' ],
				],
			],
			'rtcl-listing-cat-box' => [
				'title'       => __( 'Listing Category', 'classified-listing' ),
				'description' => __( 'Display category boxes with icons and counts.', 'classified-listing' ),
				'settings'    => [
					'rtcl_cats_style'         => [ 'type' => 'string', 'default' => 'style-1' ],
					'rtcl_cats'               => [ 'type' => 'array', 'default' => [], 'description' => 'Specific category IDs' ],
					'rtcl_category_limit'     => [ 'type' => 'number', 'default' => 10, 'description' => 'Number of categories' ],
					'rtcl_show_sub_category'  => [ 'type' => 'boolean', 'default' => false ],
					'rtcl_sub_category_limit' => [ 'type' => 'number', 'default' => 5 ],
					'rtcl_orderby'            => [ 'type' => 'string', 'default' => 'name', 'options' => [ 'name', 'count', 'term_id' ] ],
					'rtcl_order'              => [ 'type' => 'string', 'default' => 'asc' ],
					'rtcl_hide_empty'         => [ 'type' => 'boolean', 'default' => false ],
					'rtcl_show_image'         => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_count'         => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_col_xl'             => [ 'type' => 'number', 'default' => 4 ],
					'rtcl_col_lg'             => [ 'type' => 'number', 'default' => 3 ],
					'rtcl_col_md'             => [ 'type' => 'number', 'default' => 2 ],
					'rtcl_col_sm'             => [ 'type' => 'number', 'default' => 1 ],
				],
			],
			'rtcl-all-locations' => [
				'title'       => __( 'All Locations', 'classified-listing' ),
				'description' => __( 'Display all locations with listing counts.', 'classified-listing' ),
				'settings'    => [
					'rtcl_location_limit'     => [ 'type' => 'number', 'default' => 10 ],
					'rtcl_show_sub_location'  => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_sub_location_limit' => [ 'type' => 'number', 'default' => 5 ],
					'rtcl_orderby'            => [ 'type' => 'string', 'default' => 'name' ],
					'rtcl_order'              => [ 'type' => 'string', 'default' => 'asc' ],
					'rtcl_hide_empty'         => [ 'type' => 'boolean', 'default' => false ],
					'rtcl_show_count'         => [ 'type' => 'boolean', 'default' => true ],
				],
			],
			'rtcl-listing-search-form' => [
				'title'       => __( 'Search Form', 'classified-listing' ),
				'description' => __( 'Listing search form with filters.', 'classified-listing' ),
				'settings'    => [
					'search_style'       => [ 'type' => 'string', 'default' => 'dependency' ],
					'search_oriantation' => [ 'type' => 'string', 'default' => 'inline', 'options' => [ 'inline', 'vertical' ] ],
					'keyword_field'      => [ 'type' => 'boolean', 'default' => true ],
					'location_field'     => [ 'type' => 'boolean', 'default' => true ],
					'category_field'     => [ 'type' => 'boolean', 'default' => true ],
					'types_field'        => [ 'type' => 'boolean', 'default' => false ],
					'price_field'        => [ 'type' => 'boolean', 'default' => false ],
				],
			],
			'rtcl-listing-headerbtn' => [
				'title'       => __( 'Header Button', 'classified-listing' ),
				'description' => __( 'Header buttons for favorites, compare, login, add listing.', 'classified-listing' ),
				'settings'    => [
					'rtcl_show_favourites'   => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_compare'      => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_signin'       => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_chat'         => [ 'type' => 'boolean', 'default' => false ],
					'rtcl_show_add_listing'  => [ 'type' => 'boolean', 'default' => true ],
				],
			],
			'rtcl-listing-store' => [
				'title'       => __( 'Listing Store (Store Plugin)', 'classified-listing' ),
				'description' => __( 'Display stores/vendors.', 'classified-listing' ),
				'store'       => true,
				'settings'    => [
					'rtcl_store_limit' => [ 'type' => 'number', 'default' => 4 ],
					'rtcl_orderby'     => [ 'type' => 'string', 'default' => 'title' ],
					'rtcl_order'       => [ 'type' => 'string', 'default' => 'ASC' ],
					'rtcl_show_logo'   => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_title'  => [ 'type' => 'boolean', 'default' => true ],
					'rtcl_show_count'  => [ 'type' => 'boolean', 'default' => true ],
				],
			],
		];

		/**
		 * Filter the RTCL Elementor widget schemas, so add-ons can describe the widgets they enable.
		 *
		 * @param array $widgets Widget schemas keyed by widget name.
		 */
		return apply_filters( 'rtcl_mcp_elementor_widgets_schema', $widgets );
	}

	/**
	 * Check if Elementor is available.
	 *
	 * @return array Elementor availability info.
	 */
	public function checkElementorAvailability(): array {
		$elementor_active = did_action( 'elementor/loaded' );
		$elementor_pro = $this->isElementorProActive();
		$toolkits_active = class_exists( 'RadiusTheme\ClassifiedListingToolkits\ClassifiedListingToolkits' );

		$message = '';
		if ( ! $elementor_active ) {
			$message = __( 'Elementor is not active. Install and activate Elementor to use these features.', 'classified-listing' );
		} elseif ( $elementor_pro ) {
			$message = __( 'Elementor Pro is active. Custom CSS can be added via the Advanced tab custom_css setting on sections and widgets.', 'classified-listing' );
		} else {
			$message = __( 'Elementor is active. For custom CSS support, upgrade to Elementor Pro.', 'classified-listing' );
		}

		return [
			'elementor_active'   => $elementor_active,
			'elementor_version'  => $elementor_active && defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : null,
			'elementor_pro'      => $elementor_pro,
			'pro_version'        => $elementor_pro && defined( 'ELEMENTOR_PRO_VERSION' ) ? ELEMENTOR_PRO_VERSION : null,
			'custom_css_support' => $elementor_pro,
			'rtcl_toolkits'      => $toolkits_active,
			'can_create_pages'   => $elementor_active,
			'message'            => $message,
			'styling_note'       => $elementor_pro
				? __( 'Use custom_css setting in section/widget settings for advanced styling. Example: "selector { property: value; }"', 'classified-listing' )
				: __( 'Custom CSS requires Elementor Pro. Use built-in style options instead.', 'classified-listing' ),
		];
	}

	/**
	 * Generate unique Elementor element ID.
	 *
	 * @return string Unique ID.
	 */
	private function generateElementorId(): string {
		return substr( md5( uniqid( wp_rand(), true ) ), 0, 8 );
	}

	/**
	 * Create an Elementor page with widgets.
	 *
	 * @param array $config Page configuration.
	 *
	 * @return array|\WP_Error Created page info or error.
	 */
	public function createElementorPage( array $config ) {
		// Check permissions
		if ( ! current_user_can( 'publish_pages' ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to create pages.', 'classified-listing' )
			);
		}

		// Check if Elementor is active
		if ( ! did_action( 'elementor/loaded' ) ) {
			return new \WP_Error(
				'elementor_not_active',
				__( 'Elementor is not active. Please activate Elementor to create pages with it.', 'classified-listing' )
			);
		}

		$title = sanitize_text_field( $config['title'] ?? '' );
		if ( empty( $title ) ) {
			return new \WP_Error( 'missing_title', __( 'Page title is required.', 'classified-listing' ) );
		}

		$widgets = $config['widgets'] ?? [];

		// Handle widgets passed as JSON string
		if ( is_string( $widgets ) ) {
			$decoded = json_decode( $widgets, true );
			if ( json_last_error() === JSON_ERROR_NONE && is_array( $decoded ) ) {
				$widgets = $decoded;
			} else {
				return new \WP_Error(
					'invalid_widgets_json',
					__( 'Widgets JSON string could not be decoded.', 'classified-listing' ),
					[ 'json_error' => json_last_error_msg(), 'received' => substr( $widgets, 0, 200 ) ]
				);
			}
		}

		if ( empty( $widgets ) ) {
			return new \WP_Error( 'missing_widgets', __( 'At least one widget is required.', 'classified-listing' ) );
		}

		// Validate widgets array structure
		if ( ! is_array( $widgets ) ) {
			return new \WP_Error( 'invalid_widgets', __( 'Widgets must be an array.', 'classified-listing' ) );
		}

		// Validate at least one widget has a type
		$valid_widgets = 0;
		foreach ( $widgets as $widget ) {
			if ( is_array( $widget ) && ( isset( $widget['type'] ) || isset( $widget['widget'] ) || isset( $widget['section'] ) ) ) {
				$valid_widgets++;
			}
		}

		if ( $valid_widgets === 0 ) {
			return new \WP_Error(
				'no_valid_widgets',
				__( 'No valid widgets found. Each widget must have a "type" key.', 'classified-listing' ),
				[ 'widgets_count' => count( $widgets ) ]
			);
		}

		// Build Elementor data structure BEFORE creating page
		$elementor_data = $this->buildElementorData( $widgets );

		// Validate elementor data was generated
		if ( empty( $elementor_data ) ) {
			return new \WP_Error(
				'elementor_data_empty',
				__( 'Failed to build Elementor data. Ensure widgets have "type" key.', 'classified-listing' ),
				[ 'widgets_received' => count( $widgets ) ]
			);
		}

		// Encode to JSON and validate
		$elementor_json = wp_json_encode( $elementor_data );

		if ( $elementor_json === false ) {
			return new \WP_Error(
				'json_encode_failed',
				__( 'Failed to encode Elementor data to JSON.', 'classified-listing' ),
				[ 'json_error' => json_last_error_msg() ]
			);
		}

		// Create the page
		$page_data = [
			'post_title'   => $title,
			'post_name'    => sanitize_title( $config['slug'] ?? $title ),
			'post_content' => '',
			'post_status'  => sanitize_key( $config['status'] ?? 'publish' ),
			'post_type'    => 'page',
			'post_author'  => get_current_user_id(),
		];

		$page_id = wp_insert_post( $page_data, true );

		if ( is_wp_error( $page_id ) ) {
			return $page_id;
		}

		// Save Elementor meta - use wp_slash to prevent stripping of backslashes
		$slashed_json = wp_slash( $elementor_json );
		$meta_saved = update_post_meta( $page_id, '_elementor_data', $slashed_json );

		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $page_id, '_elementor_version', defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.0.0' );
		update_post_meta( $page_id, '_elementor_template_type', 'wp-page' );
		update_post_meta( $page_id, '_elementor_css', '' ); // Clear CSS cache

		// Set page template for Elementor
		$template = $config['template'] ?? 'elementor_header_footer';
		update_post_meta( $page_id, '_wp_page_template', $template );

		// Verify the data was saved correctly
		$saved_data = get_post_meta( $page_id, '_elementor_data', true );
		$sections_count = count( $elementor_data );

		if ( empty( $saved_data ) ) {
			// Try to save again with wp_slash
			update_post_meta( $page_id, '_elementor_data', wp_slash( $elementor_json ) );
			$saved_data = get_post_meta( $page_id, '_elementor_data', true );

			if ( empty( $saved_data ) ) {
				return new \WP_Error(
					'meta_save_failed',
					__( 'Failed to save Elementor data to page. Please try again.', 'classified-listing' ),
					[ 'page_id' => $page_id ]
				);
			}
		}


		return [
			'page_id'        => $page_id,
			'title'          => esc_html( $title ),
			'slug'           => esc_attr( get_post_field( 'post_name', $page_id ) ),
			'url'            => esc_url( get_permalink( $page_id ) ),
			'edit_url'       => esc_url( admin_url( 'post.php?post=' . $page_id . '&action=elementor' ) ),
			'status'         => esc_attr( get_post_status( $page_id ) ),
			'widget_count'   => count( $widgets ),
			'sections_count' => $sections_count,
			'template'       => esc_attr( $template ),
			'message'        => $sections_count > 0
				? sprintf( __( 'Page created successfully with %d sections.', 'classified-listing' ), $sections_count )
				: __( 'Page created but no sections were generated.', 'classified-listing' ),
		];
	}

	/**
	 * Build Elementor data structure from widget configurations.
	 * Supports single widgets, multi-column sections, and styled containers.
	 *
	 * @param array $widgets Widget configurations.
	 *
	 * @return array Elementor data structure.
	 */
	private function buildElementorData( array $widgets ): array {
		$elements = [];

		foreach ( $widgets as $index => $widget ) {
			// Skip invalid widgets
			if ( ! is_array( $widget ) ) {
				continue;
			}

			// Check if this is a section with multiple columns/widgets
			if ( isset( $widget['section'] ) && ( $widget['section'] === true || $widget['section'] === 'true' || $widget['section'] === 1 ) ) {
				$section = $this->buildStyledSection( $widget );
				if ( ! empty( $section ) ) {
					$elements[] = $section;
				}
				continue;
			}

			$widget_type = $widget['type'] ?? $widget['widget'] ?? $widget['widgetType'] ?? '';
			$settings = $widget['settings'] ?? [];
			$total_widgets = count( $widgets );

			// Skip invalid widgets but log for debugging
			if ( empty( $widget_type ) ) {
				// Try to extract from nested structure
				if ( isset( $widget[0] ) && is_array( $widget[0] ) ) {
					// This might be a nested array, try to process it
					foreach ( $widget as $nested_widget ) {
						if ( is_array( $nested_widget ) ) {
							$nested_elements = $this->buildElementorData( [ $nested_widget ] );
							$elements = array_merge( $elements, $nested_elements );
						}
					}
				}
				continue;
			}


			// Create a section with a column containing the widget
			$section_id = $this->generateElementorId();
			$column_id = $this->generateElementorId();
			$widget_id = $this->generateElementorId();

			// Get section settings from widget config (optional)
			$section_settings = $widget['section_settings'] ?? [];

			// Apply section preset if specified
			$preset = $widget['preset'] ?? '';
			if ( $preset ) {
				$section_settings = array_merge( $this->getSectionPreset( $preset ), $section_settings );
			}

			// AUTO PRESET: Apply automatic section styling if no explicit styling provided
			if ( ! $this->hasExplicitStyling( $widget ) ) {
				$auto_section_preset = $this->getAutoSectionPreset( $widget_type, $index, $total_widgets );
				$section_settings = array_merge( $auto_section_preset, $section_settings );
			}

			$section_config = $this->buildSectionSettings( $section_settings );

			// AUTO PRESET: Apply automatic widget styling if minimal settings provided
			$settings = $this->getAutoWidgetPreset( $widget_type, $settings, $index, $total_widgets );

			// Apply default settings for known widget types and merge with provided settings
			$merged_settings = $this->applyWidgetDefaults( $widget_type, $settings );

			// Sanitize settings
			$sanitized_settings = $this->sanitizeElementorSettings( $merged_settings );

			$elements[] = [
				'id'       => $section_id,
				'elType'   => 'section',
				'settings' => $section_config,
				'elements' => [
					[
						'id'       => $column_id,
						'elType'   => 'column',
						'settings' => [
							'_column_size' => 100,
						],
						'elements' => [
							[
								'id'         => $widget_id,
								'elType'     => 'widget',
								'widgetType' => sanitize_key( $widget_type ),
								'settings'   => $sanitized_settings,
								'elements'   => [],
							],
						],
					],
				],
			];
		}

		return $elements;
	}

	/**
	 * Build a styled section with multiple columns.
	 *
	 * @param array $config Section configuration.
	 *
	 * @return array Section element.
	 */
	private function buildStyledSection( array $config ): array {
		$section_id = $this->generateElementorId();
		$columns = $config['columns'] ?? [];
		$section_settings = $config['settings'] ?? [];
		$preset = $config['preset'] ?? '';

		// Apply preset if specified
		if ( $preset ) {
			$section_settings = array_merge( $this->getSectionPreset( $preset ), $section_settings );
		}

		// AUTO PRESET: Detect widget types and apply section styling if no explicit styling
		$has_explicit_styling = ! empty( $preset ) || $this->hasExplicitMultiColStyling( $section_settings );
		if ( ! $has_explicit_styling && ! empty( $columns ) ) {
			$first_widget_type = $this->getFirstWidgetTypeFromColumns( $columns );
			$auto_preset = $this->getAutoMultiColumnPreset( $first_widget_type, count( $columns ) );
			$section_settings = array_merge( $auto_preset, $section_settings );
		}

		$section_config = $this->buildSectionSettings( $section_settings );

		// Build columns
		$column_elements = [];
		$num_columns = count( $columns );

		// Calculate equal column sizes (must be integers that sum to 100)
		$default_sizes = $this->calculateColumnSizes( $num_columns );

		foreach ( $columns as $index => $column ) {
			$column_id = $this->generateElementorId();
			$col_size = isset( $column['size'] ) ? intval( $column['size'] ) : $default_sizes[ $index ];
			$col_settings = $column['settings'] ?? [];

			// Build widgets in this column
			$widget_elements = [];
			$col_widgets = $column['widgets'] ?? [];

			foreach ( $col_widgets as $widget ) {
				$widget_type = $widget['type'] ?? $widget['widget'] ?? '';
				if ( empty( $widget_type ) ) {
					continue;
				}

				$widget_id = $this->generateElementorId();
				$widget_settings = $widget['settings'] ?? [];

				// Apply auto widget preset for multi-column widgets
				$widget_settings = $this->getAutoWidgetPreset( $widget_type, $widget_settings, $index, $num_columns );

				$merged_settings = $this->applyWidgetDefaults( $widget_type, $widget_settings );
				$sanitized_settings = $this->sanitizeElementorSettings( $merged_settings );

				$widget_elements[] = [
					'id'         => $widget_id,
					'elType'     => 'widget',
					'widgetType' => sanitize_key( $widget_type ),
					'settings'   => $sanitized_settings,
					'elements'   => [],
				];
			}

			// Column settings with proper defaults
			$column_config = array_merge(
				[
					'_column_size' => $col_size,
					'_inline_size' => null, // Let Elementor calculate
				],
				$this->sanitizeElementorSettings( $col_settings )
			);

			$column_elements[] = [
				'id'       => $column_id,
				'elType'   => 'column',
				'settings' => $column_config,
				'elements' => $widget_elements,
			];
		}

		// Determine structure based on column count
		$structure = $this->getColumnStructure( $num_columns );
		$section_config['structure'] = $structure;

		// Ensure section stretches full width if layout is full_width
		if ( isset( $section_settings['layout'] ) && $section_settings['layout'] === 'full_width' ) {
			$section_config['stretch_section'] = 'section-stretched';
		}

		// Add gap between columns
		if ( ! isset( $section_config['gap'] ) ) {
			$section_config['gap'] = 'default';
		}

		return [
			'id'       => $section_id,
			'elType'   => 'section',
			'settings' => $section_config,
			'elements' => $column_elements,
		];
	}

	/**
	 * Calculate column sizes that sum to 100.
	 *
	 * @param int $num_columns Number of columns.
	 *
	 * @return array Array of column sizes.
	 */
	private function calculateColumnSizes( int $num_columns ): array {
		if ( $num_columns <= 0 ) {
			return [ 100 ];
		}

		$base_size = floor( 100 / $num_columns );
		$remainder = 100 - ( $base_size * $num_columns );

		$sizes = array_fill( 0, $num_columns, intval( $base_size ) );

		// Distribute remainder to first columns
		for ( $i = 0; $i < $remainder; $i++ ) {
			$sizes[ $i ]++;
		}

		return $sizes;
	}

	/**
	 * Get Elementor column structure code.
	 *
	 * @param int $num_columns Number of columns.
	 *
	 * @return string Structure code.
	 */
	private function getColumnStructure( int $num_columns ): string {
		$structures = [
			1 => '10',
			2 => '20',
			3 => '30',
			4 => '40',
			5 => '50',
			6 => '60',
		];
		return $structures[ $num_columns ] ?? '10';
	}

	/**
	 * Get section preset settings for common layouts.
	 *
	 * @param string $preset Preset name.
	 *
	 * @return array Preset settings.
	 */
	private function getSectionPreset( string $preset ): array {
		$presets = [
			'hero' => [
				'layout'           => 'full_width',
				'content_position' => 'middle',
				'height'           => 'min-height',
				'custom_height'    => [ 'size' => 500, 'unit' => 'px' ],
				'padding'          => [
					'top'      => '80',
					'right'    => '0',
					'bottom'   => '80',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#1a1a2e',
			],
			'banner' => [
				'layout'           => 'full_width',
				'height'           => 'min-height',
				'custom_height'    => [ 'size' => 450, 'unit' => 'px' ],
				'content_position' => 'middle',
				'padding'          => [
					'top'      => '60',
					'right'    => '30',
					'bottom'   => '60',
					'left'     => '30',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'gradient',
				'background_color'      => '#667eea',
				'background_color_b'    => '#764ba2',
				'background_gradient_angle' => [ 'size' => 135, 'unit' => 'deg' ],
			],
			'cta' => [
				'layout'           => 'boxed',
				'content_position' => 'middle',
				'padding'          => [
					'top'      => '80',
					'right'    => '50',
					'bottom'   => '80',
					'left'     => '50',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#f8f9fa',
				'border_radius'         => [
					'top'      => '12',
					'right'    => '12',
					'bottom'   => '12',
					'left'     => '12',
					'unit'     => 'px',
					'isLinked' => true,
				],
			],
			'cta_dark' => [
				'layout'           => 'full_width',
				'content_position' => 'middle',
				'padding'          => [
					'top'      => '80',
					'right'    => '30',
					'bottom'   => '80',
					'left'     => '30',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'gradient',
				'background_color'      => '#2c3e50',
				'background_color_b'    => '#1a1a2e',
			],
			'featured' => [
				'layout'  => 'boxed',
				'padding' => [
					'top'      => '60',
					'right'    => '0',
					'bottom'   => '60',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#ffffff',
			],
			'section_light' => [
				'layout'  => 'boxed',
				'padding' => [
					'top'      => '60',
					'right'    => '0',
					'bottom'   => '60',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#ffffff',
			],
			'section_gray' => [
				'layout'  => 'boxed',
				'padding' => [
					'top'      => '60',
					'right'    => '0',
					'bottom'   => '60',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#f8f9fa',
			],
			'pricing' => [
				'layout'  => 'boxed',
				'padding' => [
					'top'      => '80',
					'right'    => '0',
					'bottom'   => '80',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#f1f5f9',
			],
			'app_promo' => [
				'layout'           => 'full_width',
				'content_position' => 'middle',
				'padding'          => [
					'top'      => '80',
					'right'    => '30',
					'bottom'   => '80',
					'left'     => '30',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'gradient',
				'background_color'      => '#11998e',
				'background_color_b'    => '#38ef7d',
				'background_gradient_angle' => [ 'size' => 120, 'unit' => 'deg' ],
			],
			'dark' => [
				'layout'  => 'boxed',
				'padding' => [
					'top'      => '60',
					'right'    => '0',
					'bottom'   => '60',
					'left'     => '0',
					'unit'     => 'px',
					'isLinked' => false,
				],
				'background_background' => 'classic',
				'background_color'      => '#1a1a2e',
			],
		];

		return $presets[ $preset ] ?? [];
	}

	/**
	 * Build section settings with full dynamic styling support.
	 * Supports all Elementor section styling options for user customization.
	 *
	 * @param array $settings Custom section settings.
	 *
	 * @return array Section settings.
	 */
	private function buildSectionSettings( array $settings ): array {
		$defaults = [
			'structure'     => '10',
			'layout'        => 'boxed',
			'content_width' => [ 'size' => 1140, 'unit' => 'px' ],
		];

		$merged = $defaults;

		// === LAYOUT OPTIONS ===
		if ( isset( $settings['layout'] ) ) {
			$merged['layout'] = $settings['layout'];
			if ( $settings['layout'] === 'full_width' ) {
				$merged['stretch_section'] = 'section-stretched';
				$merged['content_width'] = [ 'size' => '', 'unit' => 'px' ];
			}
		}

		if ( isset( $settings['content_width'] ) ) {
			$merged['content_width'] = is_array( $settings['content_width'] )
				? $settings['content_width']
				: [ 'size' => intval( $settings['content_width'] ), 'unit' => 'px' ];
		}

		if ( isset( $settings['min_height'] ) || isset( $settings['height'] ) ) {
			$merged['height'] = 'min-height';
			$height_value = $settings['min_height'] ?? $settings['height'];
			$merged['custom_height'] = is_array( $height_value )
				? $height_value
				: [ 'size' => intval( $height_value ), 'unit' => 'px' ];
		}

		if ( isset( $settings['content_position'] ) ) {
			$merged['content_position'] = $settings['content_position']; // top, middle, bottom
		}

		// === BACKGROUND - GRADIENT (check first, takes priority over solid) ===
		$has_gradient = isset( $settings['gradient_color_1'] ) || isset( $settings['gradient'] );
		if ( $has_gradient ) {
			$merged['background_background'] = 'gradient';
			if ( isset( $settings['gradient'] ) && is_array( $settings['gradient'] ) ) {
				$merged['background_color'] = $settings['gradient']['color_1'] ?? $settings['gradient'][0] ?? '#667eea';
				$merged['background_color_b'] = $settings['gradient']['color_2'] ?? $settings['gradient'][1] ?? '#764ba2';
				$merged['background_gradient_angle'] = [
					'size' => intval( $settings['gradient']['angle'] ?? 135 ),
					'unit' => 'deg',
				];
				$merged['background_gradient_type'] = $settings['gradient']['type'] ?? 'linear';
				$merged['background_gradient_position'] = 'center center';
			} else {
				$merged['background_color'] = $settings['gradient_color_1'];
				$merged['background_color_b'] = $settings['gradient_color_2'] ?? '#764ba2';
				$merged['background_gradient_angle'] = [
					'size' => intval( $settings['gradient_angle'] ?? 135 ),
					'unit' => 'deg',
				];
				$merged['background_gradient_type'] = 'linear';
				$merged['background_gradient_position'] = 'center center';
			}
		}
		// === BACKGROUND - SOLID COLOR (only if no gradient) ===
		elseif ( isset( $settings['background_color'] ) ) {
			$merged['background_background'] = 'classic';
			$merged['background_color'] = $settings['background_color'];
		}

		// === BACKGROUND - IMAGE ===
		if ( isset( $settings['background_image'] ) || isset( $settings['background_image_url'] ) ) {
			$merged['background_background'] = 'classic';
			$img_url = $settings['background_image_url'] ?? '';
			if ( isset( $settings['background_image'] ) ) {
				$img_url = is_array( $settings['background_image'] )
					? ( $settings['background_image']['url'] ?? '' )
					: $settings['background_image'];
			}
			$merged['background_image'] = [ 'url' => $img_url, 'id' => '' ];
			$merged['background_size'] = $settings['background_size'] ?? 'cover';
			$merged['background_position'] = $settings['background_position'] ?? 'center center';
			$merged['background_repeat'] = $settings['background_repeat'] ?? 'no-repeat';
			$merged['background_attachment'] = $settings['background_attachment'] ?? 'scroll';
		}

		// === BACKGROUND OVERLAY ===
		if ( isset( $settings['overlay_color'] ) || isset( $settings['background_overlay_color'] ) ) {
			$merged['background_overlay_background'] = 'classic';
			$merged['background_overlay_color'] = $settings['overlay_color'] ?? $settings['background_overlay_color'];
			$merged['background_overlay_opacity'] = [
				'size' => $settings['overlay_opacity'] ?? $settings['background_overlay_opacity'] ?? 0.5,
			];
		}

		// === SPACING - PADDING ===
		if ( isset( $settings['padding'] ) ) {
			$merged['padding'] = $this->normalizeSpacing( $settings['padding'] );
		}

		// === SPACING - MARGIN ===
		if ( isset( $settings['margin'] ) ) {
			$merged['margin'] = $this->normalizeSpacing( $settings['margin'] );
		}

		// === BORDER ===
		if ( isset( $settings['border_type'] ) || isset( $settings['border_width'] ) ) {
			$merged['border_border'] = $settings['border_type'] ?? 'solid';
			if ( isset( $settings['border_width'] ) ) {
				$merged['border_width'] = $this->normalizeSpacing( $settings['border_width'] );
			}
			if ( isset( $settings['border_color'] ) ) {
				$merged['border_color'] = $settings['border_color'];
			}
		}

		// === BORDER RADIUS ===
		if ( isset( $settings['border_radius'] ) ) {
			$merged['border_radius'] = $this->normalizeSpacing( $settings['border_radius'] );
		}

		// === BOX SHADOW ===
		if ( isset( $settings['box_shadow'] ) ) {
			$shadow = $settings['box_shadow'];
			$merged['box_shadow_box_shadow_type'] = 'yes';
			$merged['box_shadow_box_shadow'] = [
				'horizontal' => $shadow['horizontal'] ?? 0,
				'vertical'   => $shadow['vertical'] ?? 10,
				'blur'       => $shadow['blur'] ?? 30,
				'spread'     => $shadow['spread'] ?? 0,
				'color'      => $shadow['color'] ?? 'rgba(0,0,0,0.1)',
			];
		}

		// === Z-INDEX ===
		if ( isset( $settings['z_index'] ) ) {
			$merged['z_index'] = intval( $settings['z_index'] );
		}

		// === CSS ID & CLASSES ===
		if ( isset( $settings['css_id'] ) ) {
			$merged['_element_id'] = sanitize_html_class( $settings['css_id'] );
		}
		if ( isset( $settings['css_classes'] ) ) {
			$merged['css_classes'] = sanitize_text_field( $settings['css_classes'] );
		}

		// === CUSTOM CSS (Elementor Pro) ===
		if ( isset( $settings['custom_css'] ) && $this->isElementorProActive() ) {
			$merged['custom_css'] = wp_strip_all_tags( $settings['custom_css'] );
		}

		// Pass through any other Elementor-native settings
		$native_keys = [
			'structure', 'gap', 'column_gap', 'row_gap', 'hide_desktop', 'hide_tablet', 'hide_mobile',
		];
		foreach ( $native_keys as $key ) {
			if ( isset( $settings[ $key ] ) ) {
				$merged[ $key ] = $settings[ $key ];
			}
		}

		return $merged;
	}

	/**
	 * Normalize spacing values (padding, margin, border, radius).
	 * Accepts: number, "10px", "10", array, or object.
	 *
	 * @param mixed $value Spacing value.
	 *
	 * @return array Elementor spacing format.
	 */
	private function normalizeSpacing( $value ): array {
		// Already in correct format
		if ( is_array( $value ) && isset( $value['top'] ) ) {
			$value['unit'] = $value['unit'] ?? 'px';
			$value['isLinked'] = $value['isLinked'] ?? false;
			return $value;
		}

		// Single value for all sides
		if ( is_numeric( $value ) || is_string( $value ) ) {
			$size = preg_replace( '/[^0-9]/', '', $value );
			return [
				'top'      => $size,
				'right'    => $size,
				'bottom'   => $size,
				'left'     => $size,
				'unit'     => 'px',
				'isLinked' => true,
			];
		}

		// Array with [top, right, bottom, left]
		if ( is_array( $value ) && isset( $value[0] ) ) {
			return [
				'top'      => $value[0] ?? 0,
				'right'    => $value[1] ?? $value[0] ?? 0,
				'bottom'   => $value[2] ?? $value[0] ?? 0,
				'left'     => $value[3] ?? $value[1] ?? $value[0] ?? 0,
				'unit'     => 'px',
				'isLinked' => false,
			];
		}

		// Shorthand: {y: 60, x: 30}
		if ( is_array( $value ) && ( isset( $value['y'] ) || isset( $value['x'] ) ) ) {
			return [
				'top'      => $value['y'] ?? $value['top'] ?? 0,
				'right'    => $value['x'] ?? $value['right'] ?? 0,
				'bottom'   => $value['y'] ?? $value['bottom'] ?? 0,
				'left'     => $value['x'] ?? $value['left'] ?? 0,
				'unit'     => $value['unit'] ?? 'px',
				'isLinked' => false,
			];
		}

		return [
			'top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0,
			'unit' => 'px', 'isLinked' => true,
		];
	}

	/**
	 * Apply default settings for known widget types.
	 *
	 * @param string $widget_type Widget type identifier.
	 * @param array  $settings    User-provided settings.
	 *
	 * @return array Merged settings with defaults.
	 */
	private function applyWidgetDefaults( string $widget_type, array $settings ): array {
		// Get default widgets schema
		$default_widgets = $this->getDefaultElementorWidgetsSchema();
		$rtcl_widgets = $this->getRtclElementorWidgetsSchema();

		$defaults = [];

		// Check if it's a default Elementor widget
		if ( isset( $default_widgets[ $widget_type ] ) ) {
			foreach ( $default_widgets[ $widget_type ]['settings'] as $key => $config ) {
				if ( isset( $config['default'] ) ) {
					$defaults[ $key ] = $config['default'];
				}
			}
		}

		// Check if it's an RTCL widget
		if ( isset( $rtcl_widgets[ $widget_type ] ) ) {
			foreach ( $rtcl_widgets[ $widget_type ]['settings'] as $key => $config ) {
				if ( isset( $config['default'] ) ) {
					$defaults[ $key ] = $config['default'];
				}
			}
		}

		// User settings override defaults
		$merged = array_merge( $defaults, $settings );

		// Process widget-level styling options
		$merged = $this->processWidgetStyling( $merged );

		return $merged;
	}

	/**
	 * Process widget-level styling options.
	 * Converts user-friendly style keys to Elementor format.
	 *
	 * @param array $settings Widget settings.
	 *
	 * @return array Processed settings.
	 */
	private function processWidgetStyling( array $settings ): array {
		// === TYPOGRAPHY ===
		// title_typography: {size: 32, weight: 700, family: 'Poppins', transform: 'uppercase'}
		if ( isset( $settings['title_typography'] ) ) {
			$typo = $settings['title_typography'];
			$settings['title_typography_typography'] = 'custom';
			if ( isset( $typo['size'] ) ) {
				$settings['title_typography_font_size'] = is_array( $typo['size'] )
					? $typo['size']
					: [ 'size' => intval( $typo['size'] ), 'unit' => 'px' ];
			}
			if ( isset( $typo['weight'] ) ) {
				$settings['title_typography_font_weight'] = (string) $typo['weight'];
			}
			if ( isset( $typo['family'] ) ) {
				$settings['title_typography_font_family'] = $typo['family'];
			}
			if ( isset( $typo['transform'] ) ) {
				$settings['title_typography_text_transform'] = $typo['transform'];
			}
			if ( isset( $typo['line_height'] ) ) {
				$settings['title_typography_line_height'] = is_array( $typo['line_height'] )
					? $typo['line_height']
					: [ 'size' => floatval( $typo['line_height'] ), 'unit' => 'em' ];
			}
			if ( isset( $typo['letter_spacing'] ) ) {
				$settings['title_typography_letter_spacing'] = is_array( $typo['letter_spacing'] )
					? $typo['letter_spacing']
					: [ 'size' => floatval( $typo['letter_spacing'] ), 'unit' => 'px' ];
			}
			unset( $settings['title_typography'] );
		}

		// description_typography
		if ( isset( $settings['description_typography'] ) ) {
			$typo = $settings['description_typography'];
			$settings['description_typography_typography'] = 'custom';
			if ( isset( $typo['size'] ) ) {
				$settings['description_typography_font_size'] = is_array( $typo['size'] )
					? $typo['size']
					: [ 'size' => intval( $typo['size'] ), 'unit' => 'px' ];
			}
			if ( isset( $typo['weight'] ) ) {
				$settings['description_typography_font_weight'] = (string) $typo['weight'];
			}
			if ( isset( $typo['family'] ) ) {
				$settings['description_typography_font_family'] = $typo['family'];
			}
			unset( $settings['description_typography'] );
		}

		// typography (general for text-editor, etc.)
		if ( isset( $settings['typography'] ) ) {
			$typo = $settings['typography'];
			$settings['typography_typography'] = 'custom';
			if ( isset( $typo['size'] ) ) {
				$settings['typography_font_size'] = is_array( $typo['size'] )
					? $typo['size']
					: [ 'size' => intval( $typo['size'] ), 'unit' => 'px' ];
			}
			if ( isset( $typo['weight'] ) ) {
				$settings['typography_font_weight'] = (string) $typo['weight'];
			}
			if ( isset( $typo['family'] ) ) {
				$settings['typography_font_family'] = $typo['family'];
			}
			unset( $settings['typography'] );
		}

		// === SPACING ===
		// widget_padding, widget_margin
		if ( isset( $settings['widget_padding'] ) ) {
			$settings['_padding'] = $this->normalizeSpacing( $settings['widget_padding'] );
			unset( $settings['widget_padding'] );
		}
		if ( isset( $settings['widget_margin'] ) ) {
			$settings['_margin'] = $this->normalizeSpacing( $settings['widget_margin'] );
			unset( $settings['widget_margin'] );
		}

		// === BORDER ===
		if ( isset( $settings['widget_border'] ) ) {
			$border = $settings['widget_border'];
			$settings['_border_border'] = $border['type'] ?? 'solid';
			if ( isset( $border['width'] ) ) {
				$settings['_border_width'] = $this->normalizeSpacing( $border['width'] );
			}
			if ( isset( $border['color'] ) ) {
				$settings['_border_color'] = $border['color'];
			}
			unset( $settings['widget_border'] );
		}

		// === BORDER RADIUS ===
		if ( isset( $settings['widget_border_radius'] ) ) {
			$settings['_border_radius'] = $this->normalizeSpacing( $settings['widget_border_radius'] );
			unset( $settings['widget_border_radius'] );
		}

		// === BOX SHADOW ===
		if ( isset( $settings['widget_box_shadow'] ) ) {
			$shadow = $settings['widget_box_shadow'];
			$settings['_box_shadow_box_shadow_type'] = 'yes';
			$settings['_box_shadow_box_shadow'] = [
				'horizontal' => $shadow['horizontal'] ?? 0,
				'vertical'   => $shadow['vertical'] ?? 5,
				'blur'       => $shadow['blur'] ?? 20,
				'spread'     => $shadow['spread'] ?? 0,
				'color'      => $shadow['color'] ?? 'rgba(0,0,0,0.1)',
			];
			unset( $settings['widget_box_shadow'] );
		}

		// === BACKGROUND ===
		if ( isset( $settings['widget_background_color'] ) ) {
			$settings['_background_background'] = 'classic';
			$settings['_background_color'] = $settings['widget_background_color'];
			unset( $settings['widget_background_color'] );
		}

		// === CSS CLASSES & ID ===
		if ( isset( $settings['css_id'] ) ) {
			$settings['_element_id'] = sanitize_html_class( $settings['css_id'] );
			unset( $settings['css_id'] );
		}
		if ( isset( $settings['css_classes'] ) ) {
			$settings['_css_classes'] = sanitize_text_field( $settings['css_classes'] );
			unset( $settings['css_classes'] );
		}

		// === CUSTOM CSS (Elementor Pro) ===
		if ( isset( $settings['custom_css'] ) && $this->isElementorProActive() ) {
			$settings['custom_css'] = wp_strip_all_tags( $settings['custom_css'] );
		}

		return $settings;
	}

	/**
	 * Sanitize Elementor widget settings.
	 * Properly handles nested arrays, objects, and Elementor-specific value formats.
	 * Preserves colors, HTML content, icons, and styling values.
	 *
	 * @param array $settings Raw settings.
	 *
	 * @return array Sanitized settings.
	 */
	private function sanitizeElementorSettings( array $settings ): array {
		$sanitized = [];

		// Keys that should allow HTML content
		$html_keys = [ 'editor', 'html', 'content', 'description', 'testimonial_content', 'tab_content', 'alert_description' ];

		// Keys that should preserve CSS content (Elementor Pro custom CSS)
		$css_keys = [ 'custom_css' ];

		// Keys that contain color values
		$color_keys = [ 'color', 'background_color', 'text_color', 'title_color', 'border_color', 'overlay_color' ];

		foreach ( $settings as $key => $value ) {
			$sanitized_key = sanitize_key( $key );

			if ( is_string( $value ) ) {
				// Custom CSS (Elementor Pro): like Elementor itself, only for users allowed unfiltered HTML.
				if ( in_array( $key, $css_keys, true ) ) {
					if ( current_user_can( 'unfiltered_html' ) ) {
						$sanitized[ $sanitized_key ] = wp_strip_all_tags( $value );
					}
				}
				// Preserve HTML content
				elseif ( in_array( $key, $html_keys, true ) || strpos( $key, '_content' ) !== false ) {
					$sanitized[ $sanitized_key ] = wp_kses_post( $value );
				}
				// Preserve hex colors (#fff, #ffffff)
				elseif ( preg_match( '/^#([a-fA-F0-9]{3}){1,2}$/', $value ) ) {
					$sanitized[ $sanitized_key ] = $value;
				}
				// Preserve rgba colors (whole value must be an rgb()/rgba() color)
				elseif ( $this->isRgbColor( $value ) ) {
					$sanitized[ $sanitized_key ] = $value;
				}
				// Preserve icon classes (class-name characters only)
				elseif ( ( preg_match( '/^(fa[srbl]?\s|eicon-|dashicons-)/', $value ) || strpos( $value, 'fa-' ) === 0 ) && preg_match( '/^[A-Za-z0-9 _-]+$/', $value ) ) {
					$sanitized[ $sanitized_key ] = $value;
				}
				// Color keys - hex or rgb()/rgba() only
				elseif ( $this->isColorKey( $key ) ) {
					$sanitized[ $sanitized_key ] = sanitize_hex_color( $value ) ?: ( $this->isRgbColor( $value ) ? $value : '' );
				}
				// URL keys/values (esc_url_raw drops javascript: and other unsafe schemes)
				elseif ( 'url' === $key || '_url' === substr( $key, -4 ) || filter_var( $value, FILTER_VALIDATE_URL ) ) {
					$sanitized[ $sanitized_key ] = esc_url_raw( $value );
				}
				// Default text sanitization - preserve Unicode
				else {
					$sanitized[ $sanitized_key ] = $this->sanitizeTextPreserveUnicode( $value );
				}
			} elseif ( is_numeric( $value ) ) {
				$sanitized[ $sanitized_key ] = $value;
			} elseif ( is_bool( $value ) ) {
				// Elementor uses 'yes'/'' for boolean values
				$sanitized[ $sanitized_key ] = $value ? 'yes' : '';
			} elseif ( is_array( $value ) ) {
				// Check if it's an associative array (object-like) or sequential array
				if ( $this->isAssociativeArray( $value ) ) {
					// Recursively sanitize associative arrays (nested settings)
					$sanitized[ $sanitized_key ] = $this->sanitizeElementorSettings( $value );
				} else {
					// Sequential arrays - sanitize each item appropriately
					$sanitized[ $sanitized_key ] = array_map( function( $item ) {
						if ( is_array( $item ) ) {
							return $this->sanitizeElementorSettings( $item );
						} elseif ( is_string( $item ) ) {
							// Check for color or URL in array items
							if ( preg_match( '/^#([a-fA-F0-9]{3}){1,2}$/', $item ) || $this->isRgbColor( $item ) ) {
								return $item;
							}
							return $this->sanitizeTextPreserveUnicode( $item );
						}
						return $item;
					}, $value );
				}
			} elseif ( is_null( $value ) ) {
				// Skip null values
				continue;
			} else {
				$sanitized[ $sanitized_key ] = $value;
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize text while preserving Unicode characters.
	 * Unlike sanitize_text_field, this preserves em-dashes, bullets, stars, etc.
	 *
	 * @param string $value Text to sanitize.
	 *
	 * @return string Sanitized text with Unicode preserved.
	 */
	private function sanitizeTextPreserveUnicode( string $value ): string {
		// Remove null bytes
		$value = preg_replace( '/\x00/', '', $value );

		// Convert HTML entities back to characters (preserves Unicode). Decode BEFORE stripping
		// tags: decoding afterwards would turn "&lt;img onerror=...&gt;" into a live tag.
		$value = html_entity_decode( $value, ENT_QUOTES | ENT_HTML5, 'UTF-8' );

		// Remove HTML tags
		$value = wp_strip_all_tags( $value );

		// Remove any remaining control characters except newlines/tabs
		$value = preg_replace( '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value );

		// Trim whitespace
		$value = trim( $value );

		return $value;
	}

	/**
	 * Check if a key is related to color values.
	 *
	 * @param string $key Setting key.
	 *
	 * @return bool True if it's a color key.
	 */
	private function isRgbColor( string $value ): bool {
		return (bool) preg_match( '/^rgba?\(\s*[\d.\s,%]+\)$/i', $value );
	}

	/**
	 * Check if a key is related to color values.
	 *
	 * @param string $key Setting key.
	 *
	 * @return bool
	 */
	private function isColorKey( string $key ): bool {
		$color_suffixes = [ '_color', '_color_b', 'color_1', 'color_2' ];
		$color_prefixes = [ 'background_', 'border_', 'text_', 'title_', 'overlay_' ];

		foreach ( $color_suffixes as $suffix ) {
			if ( substr( $key, -strlen( $suffix ) ) === $suffix ) {
				return true;
			}
		}

		foreach ( $color_prefixes as $prefix ) {
			if ( strpos( $key, $prefix ) === 0 && strpos( $key, 'color' ) !== false ) {
				return true;
			}
		}

		return $key === 'color';
	}

	/**
	 * Check if an array is associative (has string keys).
	 *
	 * @param array $arr Array to check.
	 *
	 * @return bool True if associative.
	 */
	private function isAssociativeArray( array $arr ): bool {
		if ( empty( $arr ) ) {
			return false;
		}
		return array_keys( $arr ) !== range( 0, count( $arr ) - 1 );
	}

	/**
	 * Add Elementor widgets to an existing page.
	 *
	 * @param int    $page_id  Page ID.
	 * @param array  $widgets  Widgets to add.
	 * @param string $position Where to add: 'append', 'prepend', or 'replace'.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function addElementorWidgetsToPage( int $page_id, array $widgets, string $position = 'append' ) {
		// Check permissions
		if ( ! current_user_can( 'edit_page', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to edit this page.', 'classified-listing' )
			);
		}

		// Check if Elementor is active
		if ( ! did_action( 'elementor/loaded' ) ) {
			return new \WP_Error(
				'elementor_not_active',
				__( 'Elementor is not active.', 'classified-listing' )
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || $page->post_type !== 'page' ) {
			return new \WP_Error( 'page_not_found', __( 'Page not found.', 'classified-listing' ) );
		}

		// Get existing Elementor data
		$existing_data = get_post_meta( $page_id, '_elementor_data', true );
		$existing_elements = [];

		if ( $existing_data ) {
			$existing_elements = json_decode( $existing_data, true );
			if ( ! is_array( $existing_elements ) ) {
				$existing_elements = [];
			}
		}

		// Build new widget elements
		$new_elements = $this->buildElementorData( $widgets );

		// Merge based on position
		switch ( $position ) {
			case 'prepend':
				$merged_elements = array_merge( $new_elements, $existing_elements );
				break;
			case 'replace':
				$merged_elements = $new_elements;
				break;
			case 'append':
			default:
				$merged_elements = array_merge( $existing_elements, $new_elements );
				break;
		}

		// Save updated Elementor data
		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $merged_elements ) ) );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		return [
			'page_id'      => $page_id,
			'title'        => $page->post_title,
			'url'          => get_permalink( $page_id ),
			'edit_url'     => admin_url( 'post.php?post=' . $page_id . '&action=elementor' ),
			'widget_count' => count( $widgets ),
			'position'     => $position,
			'message'      => sprintf( __( '%d Elementor widget(s) added to page.', 'classified-listing' ), count( $widgets ) ),
		];
	}

	/**
	 * Create a page with Gutenberg blocks.
	 *
	 * @param array $config Page configuration.
	 *
	 * @return array|\WP_Error Created page info or error.
	 */
	public function createGutenbergPage( array $config ) {
		if ( ! current_user_can( 'publish_pages' ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to create pages.', 'classified-listing' )
			);
		}

		$title = sanitize_text_field( $config['title'] ?? '' );
		if ( empty( $title ) ) {
			return new \WP_Error( 'missing_title', __( 'Page title is required.', 'classified-listing' ) );
		}

		$blocks = $config['blocks'] ?? [];
		if ( empty( $blocks ) ) {
			return new \WP_Error( 'missing_blocks', __( 'At least one block is required.', 'classified-listing' ) );
		}

		// Build block content
		$content = $this->buildGutenbergContent( $blocks );

		// Create the page
		$page_data = [
			'post_title'   => $title,
			'post_name'    => sanitize_title( $config['slug'] ?? $title ),
			'post_content' => $content,
			'post_status'  => sanitize_key( $config['status'] ?? 'publish' ),
			'post_type'    => 'page',
			'post_author'  => get_current_user_id(),
		];

		$page_id = wp_insert_post( $page_data, true );

		if ( is_wp_error( $page_id ) ) {
			return $page_id;
		}

		// Set page template if specified
		if ( ! empty( $config['template'] ) ) {
			update_post_meta( $page_id, '_wp_page_template', sanitize_text_field( $config['template'] ) );
		}

		return [
			'page_id'     => $page_id,
			'title'       => $title,
			'slug'        => get_post_field( 'post_name', $page_id ),
			'url'         => get_permalink( $page_id ),
			'edit_url'    => get_edit_post_link( $page_id, 'raw' ),
			'status'      => get_post_status( $page_id ),
			'block_count' => count( $blocks ),
			'message'     => __( 'Page created successfully with Gutenberg blocks.', 'classified-listing' ),
		];
	}

	/**
	 * Build Gutenberg block content from configuration.
	 * Supports ANY registered block dynamically.
	 *
	 * @param array $blocks Block configurations.
	 *
	 * @return string Block content.
	 */
	private function buildGutenbergContent( array $blocks ): string {
		$content = '';

		foreach ( $blocks as $block ) {
			$block_name = $block['name'] ?? '';
			$attributes = $block['attributes'] ?? [];
			$inner_blocks = $block['innerBlocks'] ?? [];
			$inner_content = $block['innerHTML'] ?? $block['content'] ?? '';

			if ( empty( $block_name ) ) {
				continue;
			}

			$content .= $this->buildBlock( $block_name, $attributes, $inner_blocks, $inner_content, $block );
		}

		return $content;
	}

	/**
	 * Build a single Gutenberg block.
	 * Handles both static and dynamic blocks.
	 *
	 * @param string $block_name    Block name (e.g., 'core/paragraph', 'rtcl/listing-ads').
	 * @param array  $attributes    Block attributes.
	 * @param array  $inner_blocks  Nested blocks.
	 * @param string $inner_content Inner HTML content.
	 * @param array  $full_config   Full block configuration.
	 *
	 * @return string Block markup.
	 */
	private function buildBlock( string $block_name, array $attributes, array $inner_blocks, string $inner_content, array $full_config ): string {
		// Check if it's a known block type that needs special handling
		$special_blocks = [
			'core/cover'    => 'buildCoverBlock',
			'core/buttons'  => 'buildButtonsBlock',
			'core/group'    => 'buildGroupBlock',
			'core/columns'  => 'buildColumnsBlock',
			'core/heading'  => 'buildHeadingBlock',
			'core/paragraph' => 'buildParagraphBlock',
			'core/image'    => 'buildImageBlock',
			'core/list'     => 'buildListBlock',
		];

		if ( isset( $special_blocks[ $block_name ] ) ) {
			$method = $special_blocks[ $block_name ];
			return $this->$method( $attributes, $full_config );
		}

		// For all other blocks (including dynamic blocks like rtcl/*), use generic builder
		return $this->buildGenericBlock( $block_name, $attributes, $inner_blocks, $inner_content );
	}

	/**
	 * Build a generic block that works with any block type.
	 *
	 * @param string $block_name    Block name.
	 * @param array  $attributes    Block attributes.
	 * @param array  $inner_blocks  Nested blocks.
	 * @param string $inner_content Inner HTML content.
	 *
	 * @return string Block markup.
	 */
	private function buildGenericBlock( string $block_name, array $attributes, array $inner_blocks, string $inner_content ): string {
		// Sanitize attributes
		$sanitized_attrs = $this->sanitizeAttributes( $attributes );

		// Build attributes JSON
		$attrs_json = ! empty( $sanitized_attrs ) ? ' ' . wp_json_encode( $sanitized_attrs, JSON_UNESCAPED_SLASHES ) : '';

		// Check if block has inner blocks
		if ( ! empty( $inner_blocks ) ) {
			$inner_content = $this->buildGutenbergContent( $inner_blocks );
			return sprintf(
				"<!-- wp:%s%s -->\n%s<!-- /wp:%s -->\n\n",
				esc_attr( $block_name ),
				$attrs_json,
				$inner_content,
				esc_attr( $block_name )
			);
		}

		// Check if block has inner HTML content
		if ( ! empty( $inner_content ) ) {
			return sprintf(
				"<!-- wp:%s%s -->\n%s\n<!-- /wp:%s -->\n\n",
				esc_attr( $block_name ),
				$attrs_json,
				$inner_content,
				esc_attr( $block_name )
			);
		}

		// Self-closing block (dynamic blocks like rtcl/*)
		return sprintf(
			"<!-- wp:%s%s /-->\n\n",
			esc_attr( $block_name ),
			$attrs_json
		);
	}

	/**
	 * Sanitize block attributes.
	 *
	 * @param array $attributes Raw attributes.
	 *
	 * @return array Sanitized attributes.
	 */
	private function sanitizeAttributes( array $attributes ): array {
		$sanitized = [];

		foreach ( $attributes as $key => $value ) {
			$key = sanitize_key( $key );

			if ( is_string( $value ) ) {
				$sanitized[ $key ] = $value; // Keep as-is for block editor
			} elseif ( is_numeric( $value ) ) {
				$sanitized[ $key ] = $value;
			} elseif ( is_bool( $value ) ) {
				$sanitized[ $key ] = $value;
			} elseif ( is_array( $value ) ) {
				$sanitized[ $key ] = $this->sanitizeAttributes( $value );
			} elseif ( is_null( $value ) ) {
				// Skip null values
				continue;
			} else {
				$sanitized[ $key ] = $value;
			}
		}

		return $sanitized;
	}

	/**
	 * Build a heading block.
	 */
	private function buildHeadingBlock( array $attributes, array $block ): string {
		$level = $attributes['level'] ?? 2;
		$text  = $attributes['content'] ?? '';
		$align = $attributes['textAlign'] ?? '';
		$font_size = $attributes['fontSize'] ?? '';
		$text_color = $attributes['textColor'] ?? '';

		$attrs = [];
		if ( $level !== 2 ) {
			$attrs['level'] = $level;
		}
		if ( $align ) {
			$attrs['textAlign'] = $align;
		}
		if ( $font_size ) {
			$attrs['fontSize'] = $font_size;
		}
		if ( $text_color ) {
			$attrs['textColor'] = $text_color;
		}

		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';

		// Build class attribute
		$classes = [ 'wp-block-heading' ];
		if ( $align ) {
			$classes[] = 'has-text-align-' . $align;
		}
		if ( $font_size ) {
			$classes[] = 'has-' . $font_size . '-font-size';
		}
		if ( $text_color ) {
			$classes[] = 'has-' . $text_color . '-color';
			$classes[] = 'has-text-color';
		}

		$class_attr = ' class="' . esc_attr( implode( ' ', $classes ) ) . '"';

		return sprintf(
			"<!-- wp:heading%s -->\n<h%d%s>%s</h%d>\n<!-- /wp:heading -->\n\n",
			$attrs_json,
			$level,
			$class_attr,
			wp_kses_post( $text ),
			$level
		);
	}

	/**
	 * Build a paragraph block.
	 */
	private function buildParagraphBlock( array $attributes, array $block ): string {
		$text  = $attributes['content'] ?? '';
		$align = $attributes['align'] ?? '';
		$font_size = $attributes['fontSize'] ?? '';
		$text_color = $attributes['textColor'] ?? '';
		$bg_color = $attributes['backgroundColor'] ?? '';

		$attrs = [];
		if ( $align ) {
			$attrs['align'] = $align;
		}
		if ( $font_size ) {
			$attrs['fontSize'] = $font_size;
		}
		if ( $text_color ) {
			$attrs['textColor'] = $text_color;
		}
		if ( $bg_color ) {
			$attrs['backgroundColor'] = $bg_color;
		}

		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';

		// Build class attribute
		$classes = [];
		if ( $align ) {
			$classes[] = 'has-text-align-' . $align;
		}
		if ( $font_size ) {
			$classes[] = 'has-' . $font_size . '-font-size';
		}
		if ( $text_color ) {
			$classes[] = 'has-' . $text_color . '-color';
			$classes[] = 'has-text-color';
		}
		if ( $bg_color ) {
			$classes[] = 'has-' . $bg_color . '-background-color';
			$classes[] = 'has-background';
		}

		$class_attr = ! empty( $classes ) ? ' class="' . esc_attr( implode( ' ', $classes ) ) . '"' : '';

		return sprintf(
			"<!-- wp:paragraph%s -->\n<p%s>%s</p>\n<!-- /wp:paragraph -->\n\n",
			$attrs_json,
			$class_attr,
			wp_kses_post( $text )
		);
	}

	/**
	 * Build an image block.
	 */
	private function buildImageBlock( array $attributes, array $block ): string {
		$url     = $attributes['url'] ?? '';
		$alt     = $attributes['alt'] ?? '';
		$caption = $attributes['caption'] ?? '';
		$id      = $attributes['id'] ?? 0;
		$size    = $attributes['sizeSlug'] ?? 'large';
		$align   = $attributes['align'] ?? '';

		$attrs = [];
		if ( $id ) {
			$attrs['id'] = $id;
		}
		if ( $size ) {
			$attrs['sizeSlug'] = $size;
		}
		if ( $align ) {
			$attrs['align'] = $align;
		}

		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';

		$figure_class = 'wp-block-image';
		if ( $size ) {
			$figure_class .= ' size-' . esc_attr( $size );
		}
		if ( $align ) {
			$figure_class .= ' align' . esc_attr( $align );
		}

		$img_class = $id ? 'wp-image-' . $id : '';

		$caption_html = $caption ? '<figcaption class="wp-element-caption">' . wp_kses_post( $caption ) . '</figcaption>' : '';

		return sprintf(
			"<!-- wp:image%s -->\n<figure class=\"%s\"><img src=\"%s\" alt=\"%s\" class=\"%s\"/>%s</figure>\n<!-- /wp:image -->\n\n",
			$attrs_json,
			esc_attr( $figure_class ),
			esc_url( $url ),
			esc_attr( $alt ),
			esc_attr( $img_class ),
			$caption_html
		);
	}

	/**
	 * Build a list block.
	 * Uses WordPress 6.x format with nested list-item blocks.
	 */
	private function buildListBlock( array $attributes, array $block ): string {
		$ordered = $attributes['ordered'] ?? false;
		$items   = $attributes['values'] ?? $attributes['items'] ?? [];

		$attrs = [];
		if ( $ordered ) {
			$attrs['ordered'] = true;
		}

		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';
		$tag = $ordered ? 'ol' : 'ul';
		$list_class = 'wp-block-list';

		// Build list items using proper WordPress 6.x nested block format
		$items_html = '';
		foreach ( $items as $item ) {
			$item_text = is_array( $item ) ? ( $item['content'] ?? $item['text'] ?? '' ) : $item;
			$items_html .= sprintf(
				"<!-- wp:list-item -->\n<li>%s</li>\n<!-- /wp:list-item -->\n",
				wp_kses_post( $item_text )
			);
		}

		return sprintf(
			"<!-- wp:list%s -->\n<%s class=\"%s\">\n%s</%s>\n<!-- /wp:list -->\n\n",
			$attrs_json,
			$tag,
			esc_attr( $list_class ),
			$items_html,
			$tag
		);
	}

	/**
	 * Build a cover block (banner/hero).
	 */
	private function buildCoverBlock( array $attributes, array $block ): string {
		$url            = $attributes['url'] ?? '';
		$overlay_color  = $attributes['overlayColor'] ?? '';
		$custom_overlay = $attributes['customOverlayColor'] ?? '';
		$dim_ratio      = $attributes['dimRatio'] ?? 50;
		$min_height     = $attributes['minHeight'] ?? 400;
		$min_height_unit = $attributes['minHeightUnit'] ?? 'px';
		$align          = $attributes['align'] ?? 'full';

		// Build inner content
		$inner_content = '';
		if ( ! empty( $block['innerBlocks'] ) ) {
			$inner_content = $this->buildGutenbergContent( $block['innerBlocks'] );
		} else {
			// Build from title/subtitle if provided
			$title    = $attributes['title'] ?? '';
			$subtitle = $attributes['subtitle'] ?? '';

			if ( $title ) {
				$inner_content .= $this->buildHeadingBlock( [
					'level'     => 1,
					'content'   => $title,
					'textAlign' => 'center',
				], [] );
			}
			if ( $subtitle ) {
				$inner_content .= $this->buildParagraphBlock( [
					'content' => $subtitle,
					'align'   => 'center',
				], [] );
			}
		}

		$attrs = [
			'dimRatio'  => $dim_ratio,
			'minHeight' => $min_height,
		];

		if ( $url ) {
			$attrs['url'] = $url;
		}
		if ( $overlay_color ) {
			$attrs['overlayColor'] = $overlay_color;
		}
		if ( $custom_overlay ) {
			$attrs['customOverlayColor'] = $custom_overlay;
		}
		if ( $align ) {
			$attrs['align'] = $align;
		}

		$style = sprintf( 'min-height:%d%s', $min_height, $min_height_unit );

		$overlay_class = 'wp-block-cover__background has-background-dim';
		if ( $dim_ratio ) {
			$overlay_class .= ' has-background-dim-' . $dim_ratio;
		}
		if ( $overlay_color ) {
			$overlay_class .= ' has-' . $overlay_color . '-background-color';
		}

		$cover_class = 'wp-block-cover';
		if ( $align ) {
			$cover_class .= ' align' . $align;
		}

		$bg_style = '';
		if ( $url ) {
			$bg_style = sprintf( 'background-image:url(%s)', esc_url( $url ) );
		}

		return sprintf(
			"<!-- wp:cover %s -->\n<div class=\"%s\" style=\"%s\"><span aria-hidden=\"true\" class=\"%s\"%s></span><div class=\"wp-block-cover__inner-container\">\n%s</div></div>\n<!-- /wp:cover -->\n\n",
			wp_json_encode( $attrs ),
			esc_attr( $cover_class ),
			esc_attr( $style ),
			esc_attr( $overlay_class ),
			$bg_style ? ' style="' . esc_attr( $bg_style ) . '"' : '',
			$inner_content
		);
	}

	/**
	 * Build a buttons block (CTA).
	 */
	private function buildButtonsBlock( array $attributes, array $block ): string {
		$layout = $attributes['layout'] ?? [ 'type' => 'flex', 'justifyContent' => 'center' ];
		$align  = $attributes['align'] ?? '';

		$inner_content = '';

		// Get buttons from various sources
		$buttons = $block['buttons'] ?? $block['innerBlocks'] ?? $attributes['buttons'] ?? [];

		foreach ( $buttons as $button ) {
			if ( isset( $button['name'] ) && $button['name'] === 'core/button' ) {
				// It's a proper inner block
				$btn_attrs = $button['attributes'] ?? [];
				$text = $btn_attrs['text'] ?? $btn_attrs['content'] ?? 'Button';
				$url  = $btn_attrs['url'] ?? '#';
				$style = $btn_attrs['className'] ?? $btn_attrs['style'] ?? '';
				$bg_color = $btn_attrs['backgroundColor'] ?? '';
				$text_color = $btn_attrs['textColor'] ?? '';
			} else {
				// Simple button config
				$text = $button['text'] ?? 'Button';
				$url  = $button['url'] ?? '#';
				$style = $button['style'] ?? $button['className'] ?? '';
				$bg_color = $button['backgroundColor'] ?? '';
				$text_color = $button['textColor'] ?? '';
			}

			// Build button block attributes
			$btn_block_attrs = [];
			if ( $bg_color ) {
				$btn_block_attrs['backgroundColor'] = $bg_color;
			}
			if ( $text_color ) {
				$btn_block_attrs['textColor'] = $text_color;
			}
			$btn_attrs_json = ! empty( $btn_block_attrs ) ? ' ' . wp_json_encode( $btn_block_attrs ) : '';

			// Build button wrapper class
			$wrapper_class = 'wp-block-button';
			if ( $style === 'outline' || $style === 'is-style-outline' ) {
				$wrapper_class .= ' is-style-outline';
			} elseif ( $style === 'fill' || $style === 'is-style-fill' ) {
				$wrapper_class .= ' is-style-fill';
			}

			// Build link class
			$link_class = 'wp-block-button__link wp-element-button';
			if ( $bg_color ) {
				$link_class .= ' has-' . esc_attr( $bg_color ) . '-background-color has-background';
			}
			if ( $text_color ) {
				$link_class .= ' has-' . esc_attr( $text_color ) . '-color has-text-color';
			}

			$inner_content .= sprintf(
				"<!-- wp:button%s -->\n<div class=\"%s\"><a class=\"%s\" href=\"%s\">%s</a></div>\n<!-- /wp:button -->\n\n",
				$btn_attrs_json,
				esc_attr( $wrapper_class ),
				esc_attr( $link_class ),
				esc_url( $url ),
				wp_kses_post( $text )
			);
		}

		$attrs = [ 'layout' => $layout ];
		if ( $align ) {
			$attrs['align'] = $align;
		}

		// Build buttons container class
		$container_class = 'wp-block-buttons';
		if ( isset( $layout['justifyContent'] ) ) {
			$container_class .= ' is-content-justification-' . esc_attr( $layout['justifyContent'] );
		}
		$container_class .= ' is-layout-flex';

		return sprintf(
			"<!-- wp:buttons %s -->\n<div class=\"%s\">\n%s</div>\n<!-- /wp:buttons -->\n\n",
			wp_json_encode( $attrs ),
			esc_attr( $container_class ),
			$inner_content
		);
	}

	/**
	 * Build a group block.
	 */
	private function buildGroupBlock( array $attributes, array $block ): string {
		$inner_content = '';
		if ( ! empty( $block['innerBlocks'] ) ) {
			$inner_content = $this->buildGutenbergContent( $block['innerBlocks'] );
		}

		$attrs = [];
		$classes = [ 'wp-block-group' ];

		if ( ! empty( $attributes['backgroundColor'] ) ) {
			$attrs['backgroundColor'] = $attributes['backgroundColor'];
			$classes[] = 'has-' . $attributes['backgroundColor'] . '-background-color';
			$classes[] = 'has-background';
		}
		if ( ! empty( $attributes['align'] ) ) {
			$attrs['align'] = $attributes['align'];
			$classes[] = 'align' . $attributes['align'];
		}
		if ( ! empty( $attributes['layout'] ) ) {
			$attrs['layout'] = $attributes['layout'];
		}

		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';

		return sprintf(
			"<!-- wp:group%s -->\n<div class=\"%s\">\n%s</div>\n<!-- /wp:group -->\n\n",
			$attrs_json,
			esc_attr( implode( ' ', $classes ) ),
			$inner_content
		);
	}

	/**
	 * Build a columns block.
	 */
	private function buildColumnsBlock( array $attributes, array $block ): string {
		$inner_content = '';

		$columns = $block['columns'] ?? $block['innerBlocks'] ?? [];

		foreach ( $columns as $column ) {
			$width = $column['width'] ?? $column['attributes']['width'] ?? '';
			$column_content = '';

			$inner_blocks = $column['innerBlocks'] ?? [];
			if ( ! empty( $inner_blocks ) ) {
				$column_content = $this->buildGutenbergContent( $inner_blocks );
			}

			$col_attrs = [];
			if ( $width ) {
				$col_attrs['width'] = $width;
			}
			$col_attrs_json = ! empty( $col_attrs ) ? ' ' . wp_json_encode( $col_attrs ) : '';

			$inner_content .= sprintf(
				"<!-- wp:column%s -->\n<div class=\"wp-block-column\">\n%s</div>\n<!-- /wp:column -->\n\n",
				$col_attrs_json,
				$column_content
			);
		}

		$attrs = [];
		if ( ! empty( $attributes['align'] ) ) {
			$attrs['align'] = $attributes['align'];
		}
		$attrs_json = ! empty( $attrs ) ? ' ' . wp_json_encode( $attrs ) : '';

		return sprintf(
			"<!-- wp:columns%s -->\n<div class=\"wp-block-columns\">\n%s</div>\n<!-- /wp:columns -->\n\n",
			$attrs_json,
			$inner_content
		);
	}

	/**
	 * Create a basic page.
	 *
	 * @param array $config Page configuration.
	 *
	 * @return array|\WP_Error Created page info or error.
	 */
	public function createPage( array $config ) {
		if ( ! current_user_can( 'publish_pages' ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to create pages.', 'classified-listing' )
			);
		}

		$title = sanitize_text_field( $config['title'] ?? '' );
		if ( empty( $title ) ) {
			return new \WP_Error( 'missing_title', __( 'Page title is required.', 'classified-listing' ) );
		}

		$content = $config['content'] ?? '';

		// If blocks are provided, build Gutenberg content
		if ( ! empty( $config['blocks'] ) ) {
			$content = $this->buildGutenbergContent( $config['blocks'] );
		}

		$page_data = [
			'post_title'   => $title,
			'post_name'    => sanitize_title( $config['slug'] ?? $title ),
			'post_content' => $content,
			'post_status'  => sanitize_key( $config['status'] ?? 'publish' ),
			'post_type'    => 'page',
			'post_author'  => get_current_user_id(),
			'post_parent'  => absint( $config['parent_id'] ?? 0 ),
		];

		$page_id = wp_insert_post( $page_data, true );

		if ( is_wp_error( $page_id ) ) {
			return $page_id;
		}

		// Set page template if specified
		if ( ! empty( $config['template'] ) ) {
			update_post_meta( $page_id, '_wp_page_template', sanitize_text_field( $config['template'] ) );
		}

		// Set featured image if specified
		if ( ! empty( $config['featured_image_id'] ) ) {
			set_post_thumbnail( $page_id, absint( $config['featured_image_id'] ) );
		}

		return [
			'page_id'  => $page_id,
			'title'    => $title,
			'slug'     => get_post_field( 'post_name', $page_id ),
			'url'      => get_permalink( $page_id ),
			'edit_url' => get_edit_post_link( $page_id, 'raw' ),
			'status'   => get_post_status( $page_id ),
			'message'  => __( 'Page created successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Get a page by ID.
	 *
	 * @param int $page_id Page ID.
	 *
	 * @return array|\WP_Error Page data or error.
	 */
	public function getPage( int $page_id ) {
		$page = get_post( $page_id );

		if ( ! $page || $page->post_type !== 'page' ) {
			return new \WP_Error( 'page_not_found', __( 'Page not found.', 'classified-listing' ) );
		}

		// Check if user can read this specific page
		if ( ! current_user_can( 'read_post', $page_id ) ) {
			// For private/draft pages, check if user has edit capability
			if ( in_array( $page->post_status, [ 'private', 'draft', 'pending' ], true ) ) {
				if ( ! current_user_can( 'edit_post', $page_id ) ) {
					return new \WP_Error(
						'permission_denied',
						__( 'You do not have permission to view this page.', 'classified-listing' )
					);
				}
			}
		}

		return [
			'page_id'        => $page->ID,
			'title'          => $page->post_title,
			'slug'           => $page->post_name,
			'content'        => $page->post_content,
			'excerpt'        => $page->post_excerpt,
			'status'         => $page->post_status,
			'url'            => get_permalink( $page->ID ),
			'edit_url'       => current_user_can( 'edit_post', $page_id ) ? get_edit_post_link( $page->ID, 'raw' ) : '',
			'template'       => get_page_template_slug( $page->ID ),
			'parent_id'      => $page->post_parent,
			'menu_order'     => $page->menu_order,
			'featured_image' => get_the_post_thumbnail_url( $page->ID, 'full' ),
			'author'         => [
				'id'   => $page->post_author,
				'name' => get_the_author_meta( 'display_name', $page->post_author ),
			],
			'date_created'   => $page->post_date,
			'date_modified'  => $page->post_modified,
		];
	}

	/**
	 * Update a page.
	 *
	 * @param int   $page_id Page ID.
	 * @param array $config  Update configuration.
	 *
	 * @return array|\WP_Error Updated page info or error.
	 */
	public function updatePage( int $page_id, array $config ) {
		if ( ! current_user_can( 'edit_page', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to edit this page.', 'classified-listing' )
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || $page->post_type !== 'page' ) {
			return new \WP_Error( 'page_not_found', __( 'Page not found.', 'classified-listing' ) );
		}

		$update_data = [ 'ID' => $page_id ];

		if ( isset( $config['title'] ) ) {
			$update_data['post_title'] = sanitize_text_field( $config['title'] );
		}

		if ( isset( $config['slug'] ) ) {
			$update_data['post_name'] = sanitize_title( $config['slug'] );
		}

		if ( isset( $config['content'] ) ) {
			$update_data['post_content'] = $config['content'];
		}

		// If blocks are provided, build Gutenberg content
		if ( ! empty( $config['blocks'] ) ) {
			$update_data['post_content'] = $this->buildGutenbergContent( $config['blocks'] );
		}

		if ( isset( $config['status'] ) ) {
			$update_data['post_status'] = sanitize_key( $config['status'] );
		}

		if ( isset( $config['parent_id'] ) ) {
			$update_data['post_parent'] = absint( $config['parent_id'] );
		}

		if ( isset( $config['menu_order'] ) ) {
			$update_data['menu_order'] = absint( $config['menu_order'] );
		}

		$result = wp_update_post( $update_data, true );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		// Update template if specified
		if ( isset( $config['template'] ) ) {
			update_post_meta( $page_id, '_wp_page_template', sanitize_text_field( $config['template'] ) );
		}

		// Update featured image if specified
		if ( isset( $config['featured_image_id'] ) ) {
			if ( $config['featured_image_id'] ) {
				set_post_thumbnail( $page_id, absint( $config['featured_image_id'] ) );
			} else {
				delete_post_thumbnail( $page_id );
			}
		}

		return [
			'page_id' => $page_id,
			'title'   => get_the_title( $page_id ),
			'slug'    => get_post_field( 'post_name', $page_id ),
			'url'     => get_permalink( $page_id ),
			'status'  => get_post_status( $page_id ),
			'message' => __( 'Page updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Delete a page.
	 *
	 * @param int  $page_id      Page ID.
	 * @param bool $force_delete Whether to permanently delete.
	 *
	 * @return array|\WP_Error Deletion result or error.
	 */
	public function deletePage( int $page_id, bool $force_delete = false ) {
		if ( ! current_user_can( 'delete_page', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to delete this page.', 'classified-listing' )
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || $page->post_type !== 'page' ) {
			return new \WP_Error( 'page_not_found', __( 'Page not found.', 'classified-listing' ) );
		}

		$title = $page->post_title;

		if ( $force_delete ) {
			$result = wp_delete_post( $page_id, true );
			$message = __( 'Page permanently deleted.', 'classified-listing' );
		} else {
			$result = wp_trash_post( $page_id );
			$message = __( 'Page moved to trash.', 'classified-listing' );
		}

		if ( ! $result ) {
			return new \WP_Error( 'delete_failed', __( 'Failed to delete page.', 'classified-listing' ) );
		}

		return [
			'deleted'      => true,
			'page_id'      => $page_id,
			'title'        => $title,
			'force_delete' => $force_delete,
			'message'      => $message,
		];
	}

	/**
	 * List pages.
	 *
	 * @param array $args Query arguments.
	 *
	 * @return array List of pages.
	 */
	public function listPages( array $args = [] ) {
		// Determine which statuses the user can see
		$allowed_statuses = [ 'publish' ]; // Everyone can see published pages

		if ( current_user_can( 'edit_pages' ) ) {
			// Editors can see drafts, pending, private
			$allowed_statuses = array_merge( $allowed_statuses, [ 'draft', 'pending', 'private' ] );
		}

		if ( current_user_can( 'edit_others_pages' ) ) {
			// Can see all pages including others' drafts
			$allowed_statuses[] = 'future';
		}

		// If user requested a specific status, validate it
		$requested_status = $args['status'] ?? 'any';
		if ( $requested_status !== 'any' ) {
			// Only allow the requested status if user has permission
			if ( ! in_array( $requested_status, $allowed_statuses, true ) ) {
				$requested_status = 'publish'; // Fallback to publish only
			}
		} else {
			// 'any' means all statuses the user can access
			$requested_status = $allowed_statuses;
		}

		$defaults = [
			'post_type'      => 'page',
			'post_status'    => $requested_status,
			'posts_per_page' => min( absint( $args['per_page'] ?? 20 ), 100 ),
			'paged'          => absint( $args['page'] ?? 1 ),
			'orderby'        => sanitize_key( $args['orderby'] ?? 'date' ),
			'order'          => strtoupper( $args['order'] ?? 'DESC' ) === 'ASC' ? 'ASC' : 'DESC',
		];

		// For non-admins, only show their own private/draft posts
		if ( ! current_user_can( 'edit_others_pages' ) ) {
			$defaults['author'] = get_current_user_id();
			// But still include published pages from anyone
			$defaults['post_status'] = 'publish';

			// If user wants their own drafts, we need a more complex query
			if ( in_array( 'draft', (array) $requested_status, true ) || in_array( 'pending', (array) $requested_status, true ) ) {
				// Reset to show both published (any author) and own drafts
				unset( $defaults['author'] );
				add_filter( 'posts_where', [ $this, 'filterPagesByAuthorOrPublished' ] );
			}
		}

		if ( ! empty( $args['search'] ) ) {
			$defaults['s'] = sanitize_text_field( $args['search'] );
		}

		if ( ! empty( $args['parent_id'] ) ) {
			$defaults['post_parent'] = absint( $args['parent_id'] );
		}

		$query = new \WP_Query( $defaults );

		// Remove the filter if we added it
		remove_filter( 'posts_where', [ $this, 'filterPagesByAuthorOrPublished' ] );

		$pages = [];

		foreach ( $query->posts as $page ) {
			// Double-check permission for each page
			if ( ! current_user_can( 'read_post', $page->ID ) && $page->post_status !== 'publish' ) {
				continue;
			}

			$pages[] = [
				'page_id'   => $page->ID,
				'title'     => $page->post_title,
				'slug'      => $page->post_name,
				'status'    => $page->post_status,
				'url'       => get_permalink( $page->ID ),
				'template'  => get_page_template_slug( $page->ID ),
				'parent_id' => $page->post_parent,
				'date'      => $page->post_date,
				'can_edit'  => current_user_can( 'edit_post', $page->ID ),
			];
		}

		return [
			'pages'        => $pages,
			'total'        => count( $pages ),
			'total_pages'  => $query->max_num_pages,
			'current_page' => $defaults['paged'],
		];
	}

	/**
	 * Filter to show published pages from any author, but drafts only from current user.
	 *
	 * @param string $where The WHERE clause.
	 *
	 * @return string Modified WHERE clause.
	 */
	public function filterPagesByAuthorOrPublished( string $where ): string {
		global $wpdb;
		$user_id = get_current_user_id();
		$where .= $wpdb->prepare(
			" AND ({$wpdb->posts}.post_status = 'publish' OR {$wpdb->posts}.post_author = %d)",
			$user_id
		);
		return $where;
	}

	/**
	 * Add blocks to an existing page.
	 *
	 * @param int    $page_id  Page ID.
	 * @param array  $blocks   Blocks to add.
	 * @param string $position Where to add: 'append', 'prepend', or 'replace'.
	 *
	 * @return array|\WP_Error Updated page info or error.
	 */
	public function addBlocksToPage( int $page_id, array $blocks, string $position = 'append' ) {
		if ( ! current_user_can( 'edit_page', $page_id ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'You do not have permission to edit this page.', 'classified-listing' )
			);
		}

		$page = get_post( $page_id );
		if ( ! $page || $page->post_type !== 'page' ) {
			return new \WP_Error( 'page_not_found', __( 'Page not found.', 'classified-listing' ) );
		}

		$new_content = $this->buildGutenbergContent( $blocks );
		$existing_content = $page->post_content;

		switch ( $position ) {
			case 'prepend':
				$content = $new_content . "\n\n" . $existing_content;
				break;
			case 'replace':
				$content = $new_content;
				break;
			case 'append':
			default:
				$content = $existing_content . "\n\n" . $new_content;
				break;
		}

		$result = wp_update_post( [
			'ID'           => $page_id,
			'post_content' => $content,
		], true );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return [
			'page_id'     => $page_id,
			'title'       => $page->post_title,
			'url'         => get_permalink( $page_id ),
			'block_count' => count( $blocks ),
			'position'    => $position,
			'message'     => sprintf( __( '%d block(s) added to page.', 'classified-listing' ), count( $blocks ) ),
		];
	}
}
