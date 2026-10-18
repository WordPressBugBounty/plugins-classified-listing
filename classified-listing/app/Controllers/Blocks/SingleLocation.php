<?php

/**
 * Main Gutenberg SingleLocation Class.
 *
 * The main class that initiates and runs the plugin.
 *
 * @package  Classifid-listing
 *
 * @since    1.0.0
 */

namespace Rtcl\Controllers\Blocks;

use Rtcl\Helpers\Functions;

class SingleLocation {
	protected $name = 'rtcl/single-location';

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
			"iconName"               => [
				"type"    => "string",
				"default" => "right-big",
			],
			'iconColorStyle'         => [
				'type'    => 'string',
				'default' => 'normal',
			],
			'iconColor'              => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3 .rtcl-gb-content > a .rtcl-icon
						{color:{{iconColor}};}',
					],
				],
			],
			'iconHoverColor'         => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3:hover .rtcl-gb-content > a .rtcl-icon
						{color:{{iconHoverColor}};}',
					],
				],
			],
			'iconRotate'             => [
				'type'    => 'number',
				'default' => 0,
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3 .rtcl-gb-content > a
						{transform:rotate({{iconRotate}}deg);}',
					],
				],
			],
			'iconHoverRotate'        => [
				'type'    => 'number',
				'default' => 0,
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3:hover .rtcl-gb-content > a
						{transform:rotate({{iconHoverRotate}}deg);}',
					],
				],
			],
			'iconBGColor'            => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3 .rtcl-gb-content > a
						{background-color:{{iconBGColor}};}',
					],
				],
			],
			'iconBGHoverColor'       => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3:hover .rtcl-gb-content > a
						{background-color:{{iconBGHoverColor}};}',
					],
				],
			],
			'boxBGType'              => [
				'type'    => 'string',
				'default' => 'classic',
			],
			'boxBGImgID'             => [
				'type'    => 'string',
				'default' => '',
			],
			'boxBGColor'             => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'depends'  => [
							(object) [ 'key' => 'boxBGType', 'condition' => '==', 'value' => 'classic' ],
						],
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
						{background-color:{{boxBGColor}};}',
					],
				],
			],
			'boxBGImgURL'            => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'depends'  => [
							(object) [ 'key' => 'boxBGType', 'condition' => '==', 'value' => 'classic' ],
						],
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background-image:url({{boxBGImgURL}});}',
					],
				],
			],
			'boxBGImgSize'           => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background-size:{{boxBGImgSize}};}',
					],
				],
			],
			'boxBGImgRepeat'         => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background-repeat:{{boxBGImgRepeat}};}',
					],
				],
			],
			'boxBGImgPosition'       => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background-position:{{boxBGImgPosition}};}',
					],
				],
			],
			'boxBGImgAttachment'     => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background-attachment:{{boxBGImgAttachment}};}',
					],
				],
			],
			'boxBGWith'              => [
				'type'    => 'number',
				'default' => 0,
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box
					{width:{{boxBGWith}}px;}',
					],
				],
			],
			'boxBGHeight'            => [
				'type'    => 'number',
				'default' => 290,
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box
					{height:{{boxBGHeight}}px;}',
					],
				],
			],
			'boxBGGradient'          => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'depends'  => [
							(object) [ 'key' => 'boxBGType', 'condition' => '==', 'value' => 'gradient' ],
						],
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-img
					{background:{{boxBGGradient}};}',
					],
				],
			],
			'overlayBGColorStyle'    => [
				'type'    => 'string',
				'default' => 'normal',
			],
			'overlayBGGradient'      => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box:not(.location-box-style-3).rtcl-gb-has-count .rtcl-gb-content
					{background:{{overlayBGGradient}};}',
					],
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3 .rtcl-image-wrapper .rtcl-gb-img::before
					{background:{{overlayBGGradient}};}',
					],
				],
			],
			'overlayHoverBGGradient' => [
				'type'    => 'string',
				'default' => '',
				'style'   => [
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box:not(.location-box-style-3).rtcl-gb-has-count:hover .rtcl-gb-content
					{background:{{overlayHoverBGGradient}};}',
					],
					(object) [
						'selector' => '{{RTCL}} .rtcl-gb-listing-location-box.location-box-style-3 .rtcl-image-wrapper .rtcl-gb-img::after
					{background:{{overlayHoverBGGradient}};}',
					],
				],
			],
			"image_type"             => [
				"type"    => "object",
				"default" => [
					"type" => "custom_image",
				],
			],
			"col_style"              => [
				"type"    => "object",
				"default" => [
					"style" => "1",
				],
			],
			"titleColor"             => [
				"type"    => "string",
				"default" => "",
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-content .rtcl-gb-title {color:{{titleColor}} !important;}' ],
				],
			],
			"titleHoverColor"        => [
				"type"    => "string",
				"default" => "",
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .rtcl-gb-listing-location-box:hover .rtcl-gb-content .rtcl-gb-title a {color:{{titleHoverColor}} !important;}' ],
				],
			],
			'titleTypo'              => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '20', 'unit' => 'px !important' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '26', 'unit' => 'px' ],
					'transform'      => 'capitalize',
					'weight'         => '700',
				],
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-content .rtcl-gb-title' ],
				],
			],
			"counterColor"           => [
				"type"    => "string",
				"default" => "",
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-counter{color:{{counterColor}};}' ],
				],
			],
			'counterTypo'            => [
				'type'    => 'object',
				'default' => (object) [
					'openTypography' => 1,
					'size'           => (object) [ 'lg' => '15', 'unit' => 'px !important' ],
					'spacing'        => (object) [ 'lg' => '0', 'unit' => 'px' ],
					'height'         => (object) [ 'lg' => '15', 'unit' => 'px' ],
					'transform'      => 'capitalize',
					'weight'         => '400',
				],
				'style'   => [
					(object) [ 'selector' => '{{RTCL}} .rtcl-gb-listing-location-box .rtcl-gb-counter' ],
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
			"location"               => [
				"type" => "string",
			],
			"show_count"             => [
				"type"    => "boolean",
				"default" => true,
			],
			"enable_link"            => [
				"type"    => "boolean",
				"default" => true,
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
		add_action( 'init', [ $this, 'register_listing_serch_form' ] );
	}

	public function register_listing_serch_form() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		register_block_type(
			RTCL_PATH . 'block-metadata/single-location',
			[
				'render_callback' => [ $this, 'render_callback_listings' ],
				'attributes'      => $this->get_attributes(),
			],
		);
	}

	/**
	 * Is a custom background configured on the block?
	 *
	 * `boxBGType` picks which of the two sets of attributes the generated CSS
	 * reads, so only that set is worth checking.
	 *
	 * @param array $settings Block attributes.
	 *
	 * @return bool
	 */
	public static function has_custom_background( array $settings ): bool {
		$type = ! empty( $settings['boxBGType'] ) ? $settings['boxBGType'] : '';

		if ( 'gradient' === $type ) {
			return ! empty( $settings['boxBGGradient'] );
		}

		return ! empty( $settings['boxBGImgURL'] ) || ! empty( $settings['boxBGColor'] );
	}

	/**
	 * Resolve the background image printed inline on the box.
	 *
	 * The custom background runs through the block's generated CSS
	 * (`boxBGImgURL` / `boxBGColor` / `boxBGGradient`), and an inline
	 * `background-image` would beat it — so nothing is returned while one is
	 * configured. With no custom background and no location image, the plugin
	 * placeholder stands in rather than leaving a flat dark rectangle (no
	 * location picked yet, or a location that has no image of its own).
	 *
	 * @param array $settings Block attributes.
	 * @param array $term     Resolved location data.
	 *
	 * @return string Image url, empty when there is nothing to print.
	 */
	public static function resolve_box_image( array $settings, array $term ): string {
		$image_type = ! empty( $settings['image_type']['type'] ) ? $settings['image_type']['type'] : 'custom_image';

		if ( 'featured_image' === $image_type && ! empty( $term['image_src'] ) ) {
			return $term['image_src'];
		}

		if ( self::has_custom_background( $settings ) ) {
			return '';
		}

		// Cast: the url runs through the `rtcl_default_placeholder_url` filter.
		return (string) Functions::get_default_placeholder_url();
	}

	public function render_callback_listings( $attributes ) {
		wp_enqueue_style( 'fontawesome' );
		$settings = $attributes;
		$style    = ! empty( $settings['col_style']['style'] ) && in_array( $settings['col_style']['style'], [ '1', '2' ] ) ? $settings['col_style']['style']
			: '1';

		$data = [
			'template'              => 'block/single-location/style-' . $style,
			'style'                 => $style,
			'settings'              => $settings,
			'term'                  => AdminAjaxController::rtcl_gb_single_location_query( $settings ),
			'default_template_path' => null,
		];

		$data = apply_filters( 'rtcl_gb_single_location_box_data', $data );
		ob_start();
		Functions::get_template( $data['template'], $data, '', $data['default_template_path'] );

		return ob_get_clean();
	}
}
