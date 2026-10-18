<?php

/**
 * Main Gutenberg PricingTable Class.
 *
 * The main class that initiates and runs the plugin.
 *
 * @package  Classifid-listing
 *
 * @since 1.0.0
 */

namespace Rtcl\Controllers\Blocks;

use Rtcl\Helpers\Functions;
use Rtcl\Helpers\BlockFns;
use Rtcl\Helpers\Link;

class PricingTable
{
	protected $name = 'rtcl/pricing-table';

	protected $attributes = [];


	public function get_attributes($default = false)
	{
		$attributes = array(
			'blockId'      => array(
				'type'    => 'string',
				'default' => '',
			),

			"style" => array(
				"type" => "string",
				"default" => "1"
			),
			'title' => array(
				'type'    => 'string',
				'default' => 'Combo Bundle',
			),
			// Parity with the Elementor widget, which has rendered a sub-title
			// since 1.0 while this block had no attribute for it at all — the
			// row simply could not appear in Gutenberg. Empty by default so no
			// existing block gains a line it did not have.
			'sub_title' => array(
				'type'    => 'string',
				'default' => '',
			),
			'currency' => array(
				'type'    => 'string',
				'default' => '$',
			),
			'currency_position' => array(
				'type'    => 'string',
				'default' => 'left',
			),
			'price' => array(
				'type'    => 'string',
				'default' => '0',
			),
			'unit' => array(
				'type'    => 'string',
				'default' => 'mo',
			),
			// Parity with Elementor's `show_per_sign`. The block used to
			// hard-code the slash, and disagreed with itself about the spacing:
			// the React preview rendered `/ mo` while the PHP template rendered
			// `/mo` in view-2. Defaults to true, which is what every existing
			// block was already rendering.
			'show_per_sign' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			// Emphasises this box as the recommended plan. Purely presentational —
			// it adds a modifier class the shared stylesheet styles, and works in
			// all three styles.
			'featured' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			// Lets the box rise on hover. Off by default — a card that moves when
			// the pointer crosses it is too strong a default to impose, and it
			// fights themes that animate their own containers.
			'hover_translate' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'badge' => array(
				'type'    => 'string',
				'default' => '',
			),
			'box_icon' => array(
				'type'    => 'string',
				'default' => 'rtcl-icon-paper-plane',
			),
			// Decorative corner image for style 4. Its own uploader rather than
			// an icon control: the marks this is for — a paw print, a logo — are
			// not in the icon font, which is the whole reason it exists.
			'watermark_image' => array(
				'type'    => 'object',
				'default' => array(),
			),
			// Empty, not 'center'. Gutenberg does not serialise an attribute that
			// equals its default, so a default of 'center' is indistinguishable
			// from "never chosen" — and style 4 needs to be able to tell those
			// apart to fall back to left. `PricingBox::default_align()` resolves
			// it; the inspector shows the resolved value so the control is never
			// blank.
			'content_alignment' => array(
				'type'    => 'string',
				'default' => '',
			),

			'btntext' => array(
				'type'    => 'string',
				'default' => 'Buy now',
			),
			'btntype' => array(
				'type'    => 'string',
				'default' => 'custom',
			),
			'buttonurl' => array(
				'type'    => 'string',
				'default' => '#',
			),
			'page_link' => array(
				'type'    => 'string',
				'default' => '',
			),
			'button_icon' => array(
				'type'    => 'string',
				'default' => '',
			),
			'button_icon_size' => array(
				'type'    => 'number',
				'default' => '',
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a svg { width:{{button_icon_size}}px; height:{{button_icon_size}}px; } {{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a i { font-size:{{button_icon_size}}px; }'
				]]

			),
			'button_icon_gap' => array(
				'type'    => 'number',
				'default' => '',
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a { gap:{{button_icon_gap}}px; }'
				]]
			),

			'features' => [
				'type' => "array",
				'default' => [
					[
						"icon" => "rtcl-icon-check-1",
						"text" => "3 Regular Ads ",
						"color" => "#03bb89"
					],
					[
						"icon" => "rtcl-icon-check-1",
						"text" => "No Featured Ads",
						"color" => "#03bb89"
					],
					[
						"icon" => "rtcl-icon-check-1",
						"text" => "No Ads will be bumped up",
						"color" => "#03bb89"
					],
					[
						"icon" => "rtcl-icon-check-1",
						"text" => "Limited Support ",
						"color" => "#03bb89"
					]
				],
			],
			"header_spacing2" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-2 .pricing-header
				 {padding:{{header_spacing2}};}']]
			),
			"header_bg_color2" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-2 .pricing-header{ background-color:{{header_bg_color2}}; }'
				]]
			),

			"body_spacing2" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-2 .pricing-body
				 {padding:{{body_spacing2}};}']]
			),

			"header_icon_color3" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon svg{ fill:{{header_icon_color3}}; } {{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon i{ color:{{header_icon_color3}}; }'
				]]
			),
			"header_icon_bg_color3" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon:before,
					{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon:after { background-color:{{header_icon_bg_color3}}; }'
				]]
			),
			"header_icon_size3" => array(
				"type" => "number",
				"default" => '',
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon svg{ width:{{header_icon_size3}}px; height:{{header_icon_size3}}px; } {{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .box-icon i{ font-size:{{header_icon_size3}}px; }'
				]]
			),

			// ── Style controls: every default below is EMPTY on purpose ──────
			//
			// Each of these carries a `style` selector, so a non-empty default
			// makes the block emit a per-instance declaration for a setting the
			// user never touched. That declaration is more specific than the
			// shared stylesheet (`src/sass/partials/_pricing-box.scss`) and beats
			// it — `cssTypography` even emits line-height with `!important` —
			// so the block quietly overrode the shared design while the Elementor
			// widget, whose `Group_Control_Typography` defaults to empty, did not.
			//
			// That is what made the same three styles render differently: the
			// block was forcing 22px titles, 32px feature line-height, capitalised
			// text and 2px button corners on top of the design both were supposed
			// to share.
			//
			// Keep them empty. The stylesheet is the default; these controls are
			// for overriding it.
			"title_spacing" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-title
				 {margin:{{title_spacing}};}']]
			),

			'title_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-1 .rtcl-gb-pricing-title'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-2 .rtcl-gb-pricing-title'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .rtcl-gb-pricing-title'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-4 .rtcl-gb-pricing-title']
				],
			],
			"title_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-1 .rtcl-gb-pricing-title { color:{{title_color}}; }'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-2 .rtcl-gb-pricing-title { color:{{title_color}}; }'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-3 .rtcl-gb-pricing-title { color:{{title_color}}; }'],
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box.rtcl-gb-pricing-box-view-4 .rtcl-gb-pricing-title { color:{{title_color}}; }']
				]
			),

			// Sub-title styling, matching the widget's own Sub Title section.
			// Not scoped per view like `title_color` is: the sub-title is new,
			// so there is no existing per-view CSS to stay compatible with.
			'sub_title_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-sub-title']
				],
			],
			"sub_title_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-sub-title { color:{{sub_title_color}}; }'
				]]
			),

			'badge_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-label']
				],
			],
			"badge_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-label { color:{{badge_color}}; }'
				]]
			),
			"badge_bg_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-label { background-color:{{badge_bg_color}}; }'
				]]
			),

			"price_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-price { color:{{price_color}}; }'
				]]
			),
			"price_spacing" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-price
				 {margin:{{price_spacing}};}']]

			),
			'price_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-price .rtcl-gb-price']
				],
			],
			'currency_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-price .rtcl-gb-pricing-currency']
				],
			],
			'unit_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-price .rtcl-gb-pricing-duration']
				],
			],
			"unit_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-price .rtcl-gb-pricing-duration { color:{{unit_color}}; }'
				]]
			),

			"feature_spacing" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features
				 {margin:{{feature_spacing}};}']]
			),

			'feature_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features li']
				],
			],
			"feature_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features li { color:{{feature_color}}; }'
				]]
			),
			"feature_icon_color" => array(
				"type" => "string",
				"default" => "",
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features li svg { fill:{{feature_icon_color}}; } {{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-features li i { color:{{feature_icon_color}}; }'
				]]
			),
			"feature_icon_size" => array(
				"type" => "number",
				"default" => '',
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features li svg { width:{{feature_icon_size}}px; height:{{feature_icon_size}}px; } {{RTCL}} .rtcl-gb-pricing-box .rtcl-gb-pricing-features li i { font-size:{{feature_icon_size}}px; }'
				]]
			),
			"feature_icon_gap" => array(
				"type" => "number",
				"default" => '',
				'style' => [(object)[
					'selector' => '{{RTCL}} .rtcl-gb-pricing-box  .rtcl-gb-pricing-features li { gap:{{feature_icon_gap}}px; }'
				]]
			),

			"button_padding" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {padding:{{button_padding}};}']]
			),
			"button_margin" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {margin:{{button_margin}};}']]
			),
			"button_width" => array(
				"type" => "number",
				"default" => '',
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {min-width:{{button_width}}px;}']]
			),

			'button_typo' => [
				'type' => 'object',
				'default' => (object)['openTypography' => 1, 'size' => (object)['lg' => '', 'unit' => 'px'], 'spacing' => (object)['lg' => '', 'unit' => 'px'], 'height' => (object)['lg' => '', 'unit' => 'px'], 'transform' => '', 'weight' => ''],
				'style' => [
					(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a']
				],
			],
			"button_color_style" => array(
				"type" => "string",
				"default" => "normal"
			),
			"button_bg_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {background-color:{{button_bg_color}};}']]
			),
			"button_text_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {color:{{button_text_color}};}']]
			),
			"button_border_type" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {border-style:{{button_border_type}};}']]
			),
			"button_border" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {border-width:{{button_border}};}']]
			),
			"button_border_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a {border-color:{{button_border_color}};}']]
			),
			"button_border_radius" => array(
				"type" => "object",
				'default' => (object)['top' => '', 'bottom' => '', 'left' => '', 'right' => '', 'unit' => 'px'],
				'style' => [
					(object)[
						'selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a { border-radius:{{button_border_radius}}; }'
					]
				]
			),

			"hv_button_bg_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a:hover {background-color:{{hv_button_bg_color}};}']]
			),
			"hv_button_text_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a:hover {color:{{hv_button_text_color}};}']]
			),
			"hv_button_border_type" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a:hover {border-style:{{hv_button_border_type}};}']]
			),
			"hv_button_border" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a:hover {border-width:{{hv_button_border}};}']]
			),
			"hv_button_border_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box .pricing-footer .rtcl-gb-pricing-button a:hover {border-color:{{hv_button_border_color}};}']]
			),

			"container_padding" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box
				 {padding:{{container_padding}} !important;}']]
			),
			"container_margin" => array(
				"type" => "object",
				"default" => array(
					"unit" => "px",
				),
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box
				 {margin:{{container_margin}} !important;}']]
			),
			"containerBGColor" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box
				 {background-color:{{containerBGColor}} !important;}']]
			),
			"container_border_type" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box {border-style:{{container_border_type}};}']]
			),
			"container_border" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box {border-width:{{container_border}};}']]
			),
			"container_border_color" => array(
				"type" => "string",
				"default" => "",
				'style'   => [(object)['selector' => '{{RTCL}} .rtcl-gb-pricing-box {border-color:{{container_border_color}};}']]
			),
			"container_border_radius" => array(
				"type" => "object",
				'default' => (object)['top' => '', 'bottom' => '', 'left' => '', 'right' => '', 'unit' => 'px'],
				'style' => [
					(object)[
						'selector' => '{{RTCL}} .rtcl-gb-pricing-box { border-radius:{{container_border_radius}}; }'
					]
				]
			),

		);

		if ($default) {
			$temp = [];
			foreach ($attributes as $key => $value) {
				if (isset($value['default'])) {
					$temp[$key] = $value['default'];
				}
			}
			return $temp;
		} else {
			return $attributes;
		}
	}

	public function __construct()
	{
		add_action('init', [$this, 'register_pricing_table_block']);

		add_action('wp_ajax_rtcl_gb_pricing_table_post', [$this, 'rtcl_gb_pricing_table_post']);
		add_action('wp_ajax_nopriv_rtcl_gb_pricing_table_post', [$this, 'rtcl_gb_pricing_table_post']);
	}

	public function rtcl_gb_pricing_table_post()
	{

		$rtcl_nonce = $_POST['rtcl_nonce'];
		if (!wp_verify_nonce($rtcl_nonce, 'rtcl-nonce')) {
			wp_send_json_error(esc_html__('Session Expired!!', 'classified-listing'));
		}

		$args           = array(
			'post_type'        => 'rtcl_pricing',
			'posts_per_page'   => -1,
			'suppress_filters' => false,
			'orderby'          => 'title',
			'order'            => 'ASC',
			'post_status'      => 'publish',
			'meta_query' => array(
				array(
					'key'     => 'pricing_type',
					'value'   => 'membership',
					'compare' => '=',
				),
			),
		);
		$posts          = get_posts($args);
		$posts_dropdown = array('0' => __('--Select--', 'classified-listing'));
		if (!is_wp_error($posts)) {
			foreach ($posts as $post) {
				$pricing = rtcl()->factory->get_pricing($post->ID);
				$url     = add_query_arg('option', $pricing->getId(), Link::get_checkout_endpoint_url('membership'));
				$posts_dropdown[$url] = $post->post_title;
				//$posts_dropdown[$post->ID] = $post->post_title;
			}
		}

		if (!empty($posts_dropdown)) :
			wp_send_json($posts_dropdown);
		endif;

		wp_reset_postdata();
		wp_die();
	}


	/**
	 * Register the block.
	 *
	 * This block used to live in classified-listing-pro. It is registered here
	 * now so it is free, under the SAME name — posts already containing one keep
	 * rendering, because only the registrant changed, not the block.
	 *
	 * The guard is for the overlap: base loads before Pro (`plugins_loaded` 20),
	 * so on a site running a NEW base with an OLD Pro both would try to register
	 * `rtcl/pricing-table`. The second call triggers a `_doing_it_wrong` notice
	 * and is discarded, which on a debug site means a visible warning on every
	 * request. Checking first makes the overlap silent, and whichever plugin
	 * gets there first serves the block.
	 */
	public function register_pricing_table_block()
	{
		if (!function_exists('register_block_type')) {
			return;
		}

		if (\WP_Block_Type_Registry::get_instance()->is_registered('rtcl/pricing-table')) {
			return;
		}

		register_block_type(
			'rtcl/pricing-table',
			[
				'render_callback' => [$this, 'render_callback'],
				'attributes' => $this->get_attributes(),
			]
		);
	}

	/**
	 * Undocumented function
	 *
	 * @param [type] $settings settings.
	 * @return string
	 */
	/**
	 * Render one icon, whichever of the two formats it is stored in.
	 *
	 * The icon picker now yields a CSS class from the plugin's own icon font
	 * (`rtcl-icon-check`), which is the full 719-icon set the Form Builder has
	 * always offered. It used to yield a name looked up in
	 * `RTCLGB-icon-controls/RTCLGBIcon.json` and inlined as an `<svg>`.
	 *
	 * Both are rendered, because the old values are sitting in post content on
	 * every site that ever placed one of these blocks — nothing is migrated. A
	 * class goes out as `<i>`, anything else falls through to the SVG lookup that
	 * has always handled it.
	 *
	 * `renderAnyIcon.jsx` is the editor-side half of this and decides the same
	 * way; keep the two tests in step.
	 *
	 * @param string $icon Icon class or legacy SVG name.
	 *
	 * @return string
	 */
	public static function icon_html($icon)
	{
		$icon = is_string($icon) ? trim($icon) : '';

		if ('' === $icon) {
			return '';
		}

		// Font classes are prefixed, or are several classes with a space. Legacy
		// SVG names are bare single words, so this separates them without a table
		// of every icon name to keep updated.
		$is_class = false !== strpos($icon, ' ')
			|| 0 === strpos($icon, 'rtcl-icon-')
			|| 0 === strpos($icon, 'fa-')
			|| 0 === strpos($icon, 'fas')
			|| 0 === strpos($icon, 'far')
			|| 0 === strpos($icon, 'fab')
			|| 0 === strpos($icon, 'dashicons');

		if ($is_class) {
			return '<i class="' . esc_attr($icon) . '" aria-hidden="true"></i>';
		}

		ob_start();
		BlockFns::render_svg_html($icon);

		return ob_get_clean();
	}

	public function button($settings)
	{
		$btn  = '';
		$attr = '';
		$button_icon = '';

		if (!empty($settings['button_icon'])) {
			$button_icon = self::icon_html($settings['button_icon']);
		}

		if ($settings['btntype'] == 'page') {
			$url = '#';
			if (!empty($settings['page_link'])) {
				$url     = $settings['page_link'];
			}
			$attr = 'href="' . $url . '"';
		} else {
			if (!empty($settings['buttonurl'])) {
				$attr  = 'href="' . $settings['buttonurl'] . '"';
			}
		}

		if ($settings['btntext']) {
			$btn = '<a ' . $attr . '>' . $settings['btntext'] . $button_icon . '</a>';
		}
		return $btn;
	}
	/**
	 * Return all feature list.
	 *
	 * @param [type] $settings main settings.
	 * @return mixed
	 */
	public function feature_html($settings)
	{
		$feature_html = null;
		$features_list = $settings['features'];
		if (!empty($features_list)) {
			foreach ($features_list as $feature) {
				if (!empty($feature)) {
					$icon          = self::icon_html(isset($feature['icon']) ? $feature['icon'] : '');
					$feature_html .= '<li>' . $icon . $feature['text'] . '</li>';
				}
			}
		}

		if ($feature_html) {
			$feature_html = '<ul>' . $feature_html . '</ul>';
		}
		return $feature_html;
	}

	public function render_callback($attributes)
	{
		$settings = $attributes;
		$style    = isset($settings['style']) ? $settings['style'] : '1';

		$box_icon = '3' === $style && isset($settings['box_icon'])
			? self::icon_html($settings['box_icon'])
			: '';

		$pricing_label     = !empty($settings['badge']) ? $settings['badge'] : null;
		$content_alignment = !empty($settings['content_alignment']) ? $settings['content_alignment'] : '';
		$currency_position = 'right' === $settings['currency_position'] ? 'currency-right' : 'currency-left';
		$template_style    = 'block/pricing-table/view-' . $style;
		$data              = array(
			'template'              => $template_style,
			'style'                 => $style,
			'settings'              => $settings,
			'feature_html'          => $this->feature_html($settings),
			'btn'                   => $this->button($settings),
			'pricing_label'         => $pricing_label,
			'content_alignment'     => $content_alignment,
			'currency_position'     => $currency_position,
			'default_template_path' => null,
		);
		$data['box_icon']  = $box_icon;
		$data = apply_filters('rtcl_gb_pricint_table_data', $data);
		ob_start();
		Functions::get_template($data['template'], $data, '', $data['default_template_path']);
		return ob_get_clean();
	}
}
