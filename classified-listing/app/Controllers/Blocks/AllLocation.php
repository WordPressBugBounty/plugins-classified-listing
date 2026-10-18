<?php

/**
 * Main Gutenberg AllLocation Class.
 *
 * The main class that initiates and runs the plugin.
 *
 * @package  Classifid-listing
 *
 * @since    1.0.0
 */

namespace Rtcl\Controllers\Blocks;

use Rtcl\Helpers\Functions;

class AllLocation {
	protected $name = 'rtcl/all-location';

	protected $attributes = [];

	public function get_attributes( $default = false ) {
		$attributes = [
			'blockId'                => [
				'type'    => 'string',
				'default' => '',
			],
			'preview'                => [
				'type'    => 'boolean',
				'default' => false,
			],
			"col_style"              => [
				"type"    => "object",
				"default" => [
					"style"      => "grid",
					"style_list" => "1",
					"style_grid" => "1",
				],
			],
			// Lift the card on hover. ON by default, unlike the same toggle on
			// the Listing Ads block: the All Locations card design has always
			// moved on hover in the Elementor widget, and this block is meant to
			// match it. `hover_lift_class()` turns it into the
			// `rtcl-loc-hover-lift` wrapper class.
			"hover_translate"        => [
				"type"    => "boolean",
				"default" => true,
			],
			'colBGColor'             => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes { background-color:{{colBGColor}}; }' ] ],
			],
			'colBorderColor'         => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes { border-color:{{colBorderColor}}; }' ] ],
			],
			'colBorderWith'          => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes {border-width:{{colBorderWith}}; }' ] ],
			],
			'colBorderStyle'         => [
				'type'    => 'string',
				'default' => 'solid',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes { border-style:{{colBorderStyle}}; }' ] ],
			],
			'colBorderRadius'        => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes { border-radius:{{colBorderRadius}}; }' ] ],
			],
			"col_padding"            => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .grid-style-1 .location-boxes,
				{{RTCL}} .list-style-1 .location-boxes {padding:{{col_padding}} !important;}',
					],
				],
			],
			"gutter_padding"         => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .location-boxes-wrapper {padding:{{gutter_padding}};}' ] ],
			],
			'headerBGColor'          => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations.grid-style-2 .location-boxes .location-boxes-header { background-color:{{headerBGColor}}; }' ] ],
			],
			'headerBorderColor'      => [
				'type'    => 'string',
				'default' => '',
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations.grid-style-2 .location-boxes .location-boxes-header { border-color:{{headerBorderColor}}; }' ] ],
			],
			"header_padding"         => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .location-boxes-header {padding:{{header_padding}} !important;}' ] ],
			],
			'childIconColor'         => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .gb-all-locations .rtcl-gb-sub-location li i {
						color:{{childIconColor}};
					}',
					],
				],
			],
			'childColor'             => [
				'type'  => 'string',
				'style' => [
					(object) [
						'selector' => '{{RTCL}} .gb-all-locations .rtcl-gb-sub-location li a {
						color:{{childColor}} !important;
					}',
					],
				],
			],
			'childHoverColor'        => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .gb-all-locations .rtcl-gb-sub-location li a:hover {
						color:{{childHoverColor}};
					}',
					],
				],
			],
			'childTypo'              => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '16', 'unit' => 'px' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '26', 'unit' => 'px' ],
					'transform'      => 'none',
					'weight'         => '400',
				],
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .rtcl-gb-sub-location li' ] ],
			],
			"child_location_padding" => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .location-boxes-body {padding:{{child_location_padding}} !important;}' ] ],
			],
			"titleColor"             => [
				"type"    => "string",
				"default" => "",
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-title a{color:{{titleColor}} !important;}' ] ],
			],
			"titleHoverColor"        => [
				"type"    => "string",
				"default" => "",
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-title a:hover {color:{{titleHoverColor}} !important;}' ],
				],

			],
			'titleTypo'              => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '18', 'unit' => 'px' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '26', 'unit' => 'px' ],
					'transform'      => 'capitalize',
					'weight'         => '700',
				],
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-title',
					],
				],
			],
			"counterColor"           => [
				"type"    => "string",
				"default" => "",
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-counter{color:{{counterColor}}; }' ] ],
			],
			'counterTypo'            => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '15', 'unit' => 'px' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '26', 'unit' => 'px' ],
					'transform'      => 'capitalize',
					'weight'         => '400',
				],
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-counter' ], ],
			],
			"contentColor"           => [
				"type"    => "string",
				"default" => "",
				'style'   => [ (object) [ 'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-description{color:{{contentColor}}; }' ] ],
			],
			'contentTypo'            => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '16', 'unit' => 'px' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '26', 'unit' => 'px' ],
					'transform'      => 'none',
					'weight'         => '400',
				],
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .gb-all-locations .location-boxes .rtcl-description',
					],
				],
			],
			"container_padding"      => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [
					(object) [
						'selector' => '{{RTCL}}.rtcl-block-editor,
				{{RTCL}}.rtcl-block-frontend {padding:{{container_padding}};}',
					],
				],
			],
			"container_margin"       => [
				"type"    => "object",
				"default" => [
					"unit" => "px",
				],
				'style'   => [
					(object) [
						'selector' => '{{RTCL}}.rtcl-block-editor,
				{{RTCL}}.rtcl-block-frontend {margin:{{container_margin}};}',
					],
				],
			],
			"containerBGColor"       => [
				"type"    => "string",
				"default" => "",
				'style'   => [
					(object) [
						'selector' => '{{RTCL}}.rtcl-block-editor,
				{{RTCL}}.rtcl-block-frontend {background-color:{{containerBGColor}};}',
					],
				],
			],
			"locations"              => [
				"type" => "array",
			],
			"location_type"          => [
				"type"    => "string",
				"default" => "all",
			],
			"show_count"             => [
				"type"    => "boolean",
				"default" => true,
			],
			"count_position"         => [
				"type"    => "string",
				"default" => "inline",
			],
			"count_after_text"       => [
				"type" => "string",
			],
			"orderby"                => [
				"type"    => "string",
				"default" => "name",
			],
			"sortby"                 => [
				"type"    => "string",
				"default" => "asc",
			],
			"hide_empty"             => [
				"type"    => "boolean",
				"default" => false,
			],
			"show_image"             => [
				"type"    => "boolean",
				"default" => false,
			],
			"image_size"             => [
				"type"    => "string",
				"default" => "rtcl-thumbnail",
			],
			"custom_image_width"     => [
				"type"    => "number",
				"default" => 400,
			],
			"custom_image_height"    => [
				"type"    => "number",
				"default" => 280,
			],
			"show_desc"              => [
				"type"    => "boolean",
				"default" => true,
			],
			"show_sub_location"      => [
				"type"    => "boolean",
				"default" => true,
			],
			"enable_link"            => [
				"type"    => "boolean",
				"default" => true,
			],
			"enable_nofollow"        => [
				"type"    => "boolean",
				"default" => false,
			],
			"enable_parent"          => [
				"type"    => "boolean",
				"default" => false,
			],
			"sub_location_limit"     => [
				"type"    => "number",
				"default" => 4,
			],
			"location_limit"         => [
				"type"    => "number",
				"default" => 4,
			],
			"desc_limit"             => [
				"type"    => "number",
				"default" => 20,
			],
			// List view gets its OWN column settings, defaulting to a single
			// full-width column. Reusing `col_*` would have been simpler, but those
			// default to a 3-4 column grid — every existing list layout on every
			// site would have silently reflowed into columns the moment this
			// shipped. New keys, defaulted to 12 (1 Col), leave them untouched.
			// Corner radius of the list style 2 card. Its default is the pill shape
			// the design calls for; anything down to 0 gives a square card.
			"list2_radius"           => [
				"type"    => "number",
				"default" => 50,
			],
			"list_col_xl"            => [
				"type"    => "string",
				"default" => "12",
			],
			"list_col_lg"            => [
				"type"    => "string",
				"default" => "12",
			],
			"list_col_md"            => [
				"type"    => "string",
				"default" => "12",
			],
			"list_col_sm"            => [
				"type"    => "string",
				"default" => "12",
			],
			"list_col_mobile"        => [
				"type"    => "string",
				"default" => "12",
			],
			"col_xl"                 => [
				"type"    => "string",
				"default" => "3",
			],
			"col_lg"                 => [
				"type"    => "string",
				"default" => "3",
			],
			"col_md"                 => [
				"type"    => "string",
				"default" => "4",
			],
			"col_sm"                 => [
				"type"    => "string",
				"default" => "6",
			],
			"col_mobile"             => [
				"type"    => "string",
				"default" => "12",
			],
		];

		if ( $default ) {
			$temp = [];
			foreach ( $attributes as $key => $value ) {
				if ( isset( $value['default'] ) ) {
					$temp[ $key ] = $value['default'];
				}
			}

			return $temp;
		} else {
			return $attributes;
		}
	}

	public function __construct() {
		add_action( 'init', [ $this, 'all_location_content' ] );
	}

	public function all_location_content() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		register_block_type(
			RTCL_PATH . 'block-metadata/all-location',
			[
				'render_callback' => [ $this, 'render_callback_listings' ],
				'attributes'      => $this->get_attributes(),
			],
		);
	}

	/**
	 * Coerce the block's boolean settings back into real booleans.
	 *
	 * The editor posts its attributes through `Qs.stringify`, which serialises
	 * `false` as the STRING `"false"` — and `"false"` is truthy in PHP. So every
	 * toggle read as ON in the editor preview no matter how it was set, while
	 * the front end (which gets the attributes as native types) behaved
	 * correctly. Show Image was the visible symptom; Show Counts, Show
	 * Description, Enable Link, Add nofollow and Show Sub Location were all
	 * stuck on too.
	 *
	 * Two of the eight were already patched individually downstream with
	 * `== 'true'` — the two that affect the QUERY rather than the display, which
	 * is presumably why only those got noticed. Normalising all of them here in
	 * one place is what stops the next one being missed; those existing checks
	 * keep working, since `true == 'true'` and `false == 'true'` both still
	 * evaluate correctly against a real boolean.
	 *
	 * Driven by the block's own attribute schema rather than a hand-written list,
	 * so a boolean added later is covered without touching this.
	 *
	 * @param array $settings Block settings, possibly from an AJAX round-trip.
	 *
	 * @return array
	 */
	public static function normalize_settings( $settings ) {
		static $booleans = null;

		if ( null === $booleans ) {
			$booleans = [];

			foreach ( ( new self() )->get_attributes() as $key => $definition ) {
				if ( isset( $definition['type'] ) && 'boolean' === $definition['type'] ) {
					$booleans[] = $key;
				}
			}
		}

		foreach ( $booleans as $key ) {
			if ( isset( $settings[ $key ] ) && is_string( $settings[ $key ] ) ) {
				$settings[ $key ] = ! in_array( strtolower( $settings[ $key ] ), [ '', '0', 'false' ], true );
			}
		}

		return $settings;
	}

	/**
	 * The "lift the card on hover" class.
	 *
	 * The stylesheet keeps the card still and only translates it when this class
	 * is on the `.gb-all-locations` wrapper (`--rtcl-loc-lift` in
	 * `src/sass/partials/_gb-all-location-block.scss`). Same class and same
	 * variable the Elementor widget uses, so the toggle means the same thing in
	 * both editors.
	 *
	 * Missing means ON. `hover_translate` defaults to true, so the only way to
	 * reach this branch is a block saved before the attribute existed — and
	 * those should keep the movement, not lose it. That is the opposite of
	 * `ListingShowcase::hover_lift_class()`, whose toggle is opt-in because its
	 * card never moved before.
	 *
	 * @since 5.3.1
	 *
	 * @param array $settings Block settings.
	 *
	 * @return string Class name with a leading space, matching
	 *                `image_box_attrs()` so the templates can concatenate it
	 *                straight onto the wrapper; empty when the lift is off.
	 */
	public static function hover_lift_class( $settings ) {
		if ( ! is_array( $settings ) || ! isset( $settings['hover_translate'] ) ) {
			return ' rtcl-loc-hover-lift';
		}

		$value = $settings['hover_translate'];

		// `normalize_settings()` already coerces this, but the template is also
		// reachable through `rtcl_gb_all_location_box_data` filters, so read it
		// defensively — the editor round-trips the boolean through AJAX, where
		// it arrives as the string "false"/"0".
		if ( is_string( $value ) ) {
			$value = ! in_array( strtolower( $value ), [ '', '0', 'false' ], true );
		}

		return $value ? ' rtcl-loc-hover-lift' : '';
	}

	/**
	 * Wrapper class and inline custom properties for a custom image size.
	 *
	 * Image Size → Custom is enforced in CSS rather than by the file WordPress
	 * serves. Asking for an arbitrary crop only works if that exact size was
	 * registered AND generated for the attachment — for a size typed into the
	 * block it never was, so WordPress falls back to the full image and the
	 * setting appeared to do nothing (and reported a 1x1 dimension while it was
	 * at it). Sizing the box in CSS means the setting works for every image
	 * regardless of which crops exist, with `object-fit: cover` doing the crop.
	 *
	 * Shared by all three layout templates so they cannot drift; each decides
	 * for itself what the width and height mean, in
	 * `src/sass/partials/_gb-all-location-block.scss`.
	 *
	 * @param array $settings Block settings.
	 *
	 * @return array [ string $class, string $style ] — both empty unless a
	 *               custom size with at least one dimension is set. `$style` is
	 *               a ready-to-print ` style="…"` attribute, already escaped.
	 */
	public static function image_box_attrs( $settings ) {
		if ( empty( $settings['image_size'] ) || 'custom' !== $settings['image_size'] ) {
			return [ '', '' ];
		}

		$width  = ! empty( $settings['custom_image_width'] ) ? absint( $settings['custom_image_width'] ) : 0;
		$height = ! empty( $settings['custom_image_height'] ) ? absint( $settings['custom_image_height'] ) : 0;

		if ( ! $width && ! $height ) {
			return [ '', '' ];
		}

		return [ ' has-custom-image-size', ' style="' . esc_attr( implode( ';', self::image_box_vars( $settings ) ) ) . '"' ];
	}

	/**
	 * The custom-size declarations on their own, without the `style` wrapper.
	 *
	 * List style 2 has a corner-radius property of its own to emit, so it needs
	 * to compose one style attribute rather than concatenate two.
	 *
	 * Emitted independently, so setting only one dimension stays valid — the
	 * stylesheet's `var()` fallbacks cover the other.
	 *
	 * @param array $settings Block settings.
	 *
	 * @return array CSS declarations, empty when no custom size is set.
	 */
	public static function image_box_vars( $settings ) {
		if ( empty( $settings['image_size'] ) || 'custom' !== $settings['image_size'] ) {
			return [];
		}

		$width  = ! empty( $settings['custom_image_width'] ) ? absint( $settings['custom_image_width'] ) : 0;
		$height = ! empty( $settings['custom_image_height'] ) ? absint( $settings['custom_image_height'] ) : 0;
		$vars   = [];

		if ( $width ) {
			$vars[] = '--rtcl-loc-img-w:' . $width . 'px';
		}

		if ( $height ) {
			$vars[] = '--rtcl-loc-img-h:' . $height . 'px';
		}

		return $vars;
	}

	public function render_callback_listings( $attributes ) {
		wp_enqueue_style( 'fontawesome' );

		return self::render( $attributes );
	}

	/**
	 * Render the All Locations block to HTML.
	 *
	 * Extracted from `render_callback_listings()` so the editor can go through
	 * exactly the same code path as the front end:
	 * `AdminAjaxController::rtcl_gb_all_locations()` calls this and hands the
	 * markup straight to the block's edit component. Before, the editor rebuilt
	 * the layouts a second time in React (`src/blocks/all-location/layout/`),
	 * which is how the canvas and the published page drifted apart — the card
	 * design landed on the front end while the editor kept the old markup.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return string
	 */
	public static function render( $attributes ) {
		// Both the front end and the editor come through here; only the editor's
		// attributes need coercing, and doing it for both keeps one code path.
		$settings = self::normalize_settings( $attributes );
		$view     = ! empty( $settings['col_style']['style'] ) && in_array( $settings['col_style']['style'], [ 'grid', 'list' ] )
			? $settings['col_style']['style'] : 'grid';
		$style    = '1';
		if ( 'grid' == $view ) {
			$style = ! empty( $settings['col_style']['style_grid'] ) && in_array( $settings['col_style']['style_grid'], [ '1', '2' ] )
				? $settings['col_style']['style_grid'] : '1';
		} else {
			// List had a single style, so this was hardcoded. Style 2 is the
			// image-backed pill card.
			$style = ! empty( $settings['col_style']['style_list'] ) && in_array( $settings['col_style']['style_list'], [ '1', '2' ] )
				? $settings['col_style']['style_list'] : '1';
		}

		$data = [
			'template'              => 'block/all-location/' . $view . '/style-' . $style,
			'view'                  => $view,
			'style'                 => $style,
			'settings'              => $settings,
			'terms'                 => AdminAjaxController::rtcl_gb_all_location_query( $settings ),
			'default_template_path' => null,
		];

		$data = apply_filters( 'rtcl_gb_all_location_box_data', $data );
		ob_start();
		Functions::get_template( $data['template'], $data, '', $data['default_template_path'] );

		return ob_get_clean();
	}
}
