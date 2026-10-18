<?php
/**
 * Inline SVG icon set used by the Listing Showcase layouts.
 *
 * The showcase templates used to render icon-font glyphs
 * (`<i class="rtcl-icon rtcl-icon-clock">`). Those depend on the base
 * stylesheet's webfont and cannot be tuned per layout, so the 2026 designs
 * ship their own stroked SVG set instead. Keeping the markup here means all
 * ten layouts draw from the same source.
 *
 * This lives in the base plugin, alongside the shared card CSS in
 * `src/sass/partials/_listing-showcase.scss`, because both front ends that
 * render those layouts need it and the base can never depend on an add-on:
 *
 *   Elementor  classified-listing-toolkits, templates/elementor/listing-ads/…
 *   Gutenberg  this plugin, templates/block/listing-ads/…
 *
 * `RadiusTheme\ClassifiedListingToolkits\Common\Icons` is kept as a thin
 * delegate to this class so existing toolkits templates keep working unchanged.
 * The icon keys are a shared surface — add to them, do not rename them.
 *
 * @package Classified-listing
 */

namespace Rtcl\Helpers;

/**
 * Icons Class.
 */
class Icons {

	/**
	 * Icon definitions: stroke width plus the shapes inside a 24x24 viewBox.
	 *
	 * `fill` is only set for solid icons (the featured star); everything else
	 * is stroked with `currentColor` so it inherits the surrounding text
	 * colour.
	 *
	 * @return array
	 */
	protected static function icons() {
		return [
			// Listing meta.
			'tag'        => [
				'width' => '1.8',
				'paths' => '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"></path><circle cx="7.5" cy="7.5" r="1" fill="currentColor"></circle>',
			],
			'clock'      => [
				'width' => '1.8',
				'paths' => '<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline>',
			],
			'location'   => [
				'width' => '1.8',
				'paths' => '<path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="2.4"></circle>',
			],
			'views'      => [
				'width' => '1.8',
				'paths' => '<polyline points="3 17 9 11 13 15 21 7"></polyline><polyline points="15 7 21 7 21 13"></polyline>',
			],
			'user'       => [
				'width' => '1.8',
				'paths' => '<path d="M20 21v-1.6a5.4 5.4 0 0 0-5.4-5.4H9.4A5.4 5.4 0 0 0 4 19.4V21"></path><circle cx="12" cy="7.4" r="3.9"></circle>',
			],
			'folder'     => [
				'width' => '1.8',
				'paths' => '<path d="M3 7.2a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.5.7l1.3 1.5H19a2 2 0 0 1 2 2v7.4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
			],
			'eye'        => [
				'width' => '1.8',
				'paths' => '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"></path><circle cx="12" cy="12" r="3"></circle>',
			],

			// Actions.
			'phone'      => [
				'width' => '1.8',
				'paths' => '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"></path>',
			],
			'quick-view' => [
				'width' => '1.8',
				'paths' => '<circle cx="11" cy="11" r="7"></circle><line x1="16.8" y1="16.8" x2="21" y2="21"></line><line x1="11" y1="8.3" x2="11" y2="13.7"></line><line x1="8.3" y1="11" x2="13.7" y2="11"></line>',
			],
			'compare'    => [
				'width' => '1.7',
				'paths' => '<path d="M4 7h12"></path><path d="M13 4l3 3-3 3"></path><path d="M20 17H8"></path><path d="M11 14l-3 3 3 3"></path>',
			],
			'favourite'  => [
				'width' => '1.7',
				'paths' => '<path d="M19.5 12.6 12 20l-7.5-7.4a4.6 4.6 0 0 1 6.5-6.5l1 1 1-1a4.6 4.6 0 0 1 6.5 6.5z"></path>',
			],

			// Badges.
			'featured'   => [
				'fill'  => 'currentColor',
				'paths' => '<path d="M12 3.2l2.6 5.3 5.8.85-4.2 4.1 1 5.8L12 16.6l-5.2 2.75 1-5.8-4.2-4.1 5.8-.85z"></path>',
			],
		];
	}

	/**
	 * Build the markup for a single icon.
	 *
	 * @param  string $name           Icon key, see self::icons().
	 * @param  string $extra_classes  Optional extra classes on the <svg>.
	 *
	 * @return string Empty string when the icon is unknown.
	 */
	public static function get( $name, $extra_classes = '' ) {
		$icons = self::icons();

		if ( ! isset( $icons[ $name ] ) ) {
			return '';
		}

		$icon    = $icons[ $name ];
		$classes = trim( 'rtcl-sc-icon rtcl-sc-icon--' . $name . ' ' . $extra_classes );

		// Solid icons (the star) fill instead of stroke.
		if ( ! empty( $icon['fill'] ) ) {
			$paint = sprintf( 'fill="%s" stroke="none"', esc_attr( $icon['fill'] ) );
		} else {
			$paint = sprintf(
				'fill="none" stroke="currentColor" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"',
				esc_attr( $icon['width'] )
			);
		}

		return sprintf(
			'<svg class="%s" viewBox="0 0 24 24" %s aria-hidden="true" focusable="false">%s</svg>',
			esc_attr( $classes ),
			$paint,
			$icon['paths']
		);
	}

	/**
	 * Echo an icon.
	 *
	 * @param  string $name           Icon key.
	 * @param  string $extra_classes  Optional extra classes.
	 *
	 * @return void
	 */
	public static function render( $name, $extra_classes = '' ) {
		echo wp_kses( self::get( $name, $extra_classes ), self::allowed_html() );
	}

	/**
	 * `wp_kses_post()` strips SVG, so the showcase templates sanitise their
	 * output against this list instead: post HTML plus the SVG primitives the
	 * icon set uses.
	 *
	 * @return array
	 */
	public static function allowed_html() {
		$svg = [
			'svg'      => [
				'class'            => true,
				'viewbox'          => true,
				'width'            => true,
				'height'           => true,
				'fill'             => true,
				'stroke'           => true,
				'stroke-width'     => true,
				'stroke-linecap'   => true,
				'stroke-linejoin'  => true,
				'aria-hidden'      => true,
				'focusable'        => true,
				'role'             => true,
				'xmlns'            => true,
			],
			'g'        => [ 'fill' => true, 'stroke' => true, 'transform' => true ],
			'path'     => [ 'd' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true ],
			'circle'   => [ 'cx' => true, 'cy' => true, 'r' => true, 'fill' => true, 'stroke' => true ],
			'rect'     => [ 'x' => true, 'y' => true, 'width' => true, 'height' => true, 'rx' => true, 'ry' => true, 'fill' => true, 'stroke' => true ],
			'line'     => [ 'x1' => true, 'y1' => true, 'x2' => true, 'y2' => true, 'stroke' => true ],
			'polyline' => [ 'points' => true, 'fill' => true, 'stroke' => true ],
			'polygon'  => [ 'points' => true, 'fill' => true, 'stroke' => true ],
		];

		return array_merge( wp_kses_allowed_html( 'post' ), $svg );
	}

}
