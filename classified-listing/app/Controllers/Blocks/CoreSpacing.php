<?php
/**
 * Responsive padding / margin for core blocks — the front end half.
 *
 * The editor stores per-device values on the block (`rtclPadding`,
 * `rtclMargin`, see `src/blocks/core-spacing/`) but deliberately does not write
 * anything into the saved HTML: doing that through
 * `blocks.getSaveContent.extraProps` would leave every affected block flagged
 * as invalid the moment this plugin is deactivated. So the class and the custom
 * properties are added here, at render time, and the saved markup never
 * changes.
 *
 * Mirrors `spacingVars()` / `spacingClasses()` in `src/blocks/core-spacing/vars.js`.
 * Keep the two in step.
 *
 * The stylesheet is `src/sass/partials/_gb-core-spacing.scss`, built into the
 * shared `gb-frontend-block.css` and enqueued by
 * `BlockController::block_assets()`.
 *
 * @package Classified-listing
 */

namespace Rtcl\Controllers\Blocks;

/**
 * Class CoreSpacing
 */
class CoreSpacing {

	/**
	 * Attribute name => [ short key used in the class and custom property, value shape ].
	 *
	 * Mirrors RESPONSIVE_FIELDS in `src/blocks/core-spacing/constants.js`.
	 */
	const FIELDS = [
		'rtclPadding'  => [ 'p', 'box' ],
		'rtclMargin'   => [ 'm', 'box' ],
		'rtclFontSize' => [ 'f', 'length' ],
		'rtclTextAlign' => [ 'ta', 'keyword' ],
	];

	/**
	 * Values the `keyword` shape will emit. Anything else is dropped.
	 *
	 * A keyword goes into the style attribute verbatim, unlike the box and length
	 * shapes whose numbers are cast before they get there — so this is the thing
	 * standing between a block attribute and the page's CSS.
	 */
	const KEYWORDS = [ 'left', 'center', 'right', 'justify' ];

	/** Devices, in the order the stylesheet declares them. */
	const DEVICES = [ 'lg', 'md', 'sm', 'xs' ];

	/** Units the controls offer. Anything else is treated as px. */
	const UNITS = [ 'px', '%', 'em', 'rem', 'vh', 'vw' ];

	/**
	 * CoreSpacing constructor.
	 */
	public function __construct() {
		add_filter( 'render_block', [ $this, 'render_block' ], 10, 2 );
	}

	/**
	 * Add the spacing class and custom properties to a block's own element.
	 *
	 * Driven by the attributes rather than a block whitelist, so extending the
	 * JS side through the `rtcl.coreSpacing.blocks` filter needs no change here.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 *
	 * @return string
	 */
	public function render_block( $block_content, $block ) {
		if ( ! is_string( $block_content ) || '' === trim( $block_content ) ) {
			return $block_content;
		}

		$attributes = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];

		// Cheapest possible bail — this filter runs on every block on the page.
		$has_value = false;

		foreach ( array_keys( self::FIELDS ) as $attribute ) {
			if ( ! empty( $attributes[ $attribute ] ) ) {
				$has_value = true;
				break;
			}
		}

		if ( ! $has_value ) {
			return $block_content;
		}

		list( $classes, $style ) = self::block_style( $attributes );

		if ( ! $classes ) {
			return $block_content;
		}

		return BlockMarkup::add_attributes( $block_content, implode( ' ', $classes ), $style );
	}

	/**
	 * Build the class list and the inline custom properties for one block.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array [ string[] $classes, string $style ]
	 */
	public static function block_style( $attributes ) {
		$classes = [];
		$style   = [];

		foreach ( self::FIELDS as $attribute => $field ) {
			list( $key, $shape ) = $field;

			$value = isset( $attributes[ $attribute ] ) && is_array( $attributes[ $attribute ] )
				? $attributes[ $attribute ]
				: [];

			foreach ( self::DEVICES as $device ) {
				if ( empty( $value[ $device ] ) ) {
					continue;
				}

				// `box` and `length` store an array per device; `keyword` stores a
				// bare string, so the array check cannot be shared.
				if ( 'keyword' === $shape ) {
					$css = self::keyword_to_css( $value[ $device ] );
				} elseif ( is_array( $value[ $device ] ) ) {
					$css = 'box' === $shape
						? self::box_to_css( $value[ $device ] )
						: self::length_to_css( $value[ $device ] );
				} else {
					continue;
				}

				if ( '' === $css ) {
					continue;
				}

				$classes[] = "rtcl-gb-sp-{$key}-{$device}";
				$style[]   = "--rtcl-sp-{$key}-{$device}:{$css}";
			}
		}

		return [ $classes, implode( ';', $style ) ];
	}

	/**
	 * A CSS keyword, allowed only if it is one we offer.
	 *
	 * @param mixed $value Per-device value.
	 *
	 * @return string Empty string when it is not a keyword we recognise.
	 */
	private static function keyword_to_css( $value ) {
		if ( ! is_string( $value ) ) {
			return '';
		}

		$value = strtolower( trim( $value ) );

		return in_array( $value, self::KEYWORDS, true ) ? $value : '';
	}

	/**
	 * `[ 'top' => 20, 'unit' => 'px' ]` => `20px 0 0 0`.
	 *
	 * A side the user left empty renders as `0` rather than being skipped —
	 * the shorthand needs all four — but if every side is empty the whole
	 * device is skipped so the theme keeps that breakpoint. An explicit 0 is
	 * kept: zeroing the default margin is the main thing this control is for.
	 *
	 * @param array $box Per-device box value.
	 *
	 * @return string Empty string when nothing is set.
	 */
	private static function box_to_css( $box ) {
		$unit = isset( $box['unit'] ) && in_array( $box['unit'], self::UNITS, true ) ? $box['unit'] : 'px';

		$sides = [];
		$any   = false;

		foreach ( [ 'top', 'right', 'bottom', 'left' ] as $side ) {
			$value = isset( $box[ $side ] ) ? $box[ $side ] : null;

			if ( null === $value || '' === $value || ! is_numeric( $value ) ) {
				$sides[] = '0';
				continue;
			}

			$any     = true;
			$sides[] = self::number( $value ) . $unit;
		}

		return $any ? implode( ' ', $sides ) : '';
	}

	/**
	 * `[ 'value' => 50, 'unit' => 'px' ]` => `50px`.
	 *
	 * Mirrors `lengthToCss()` in `src/util/responsive/helpers.js`.
	 *
	 * @param array $length Per-device length value.
	 *
	 * @return string Empty string when nothing is set.
	 */
	private static function length_to_css( $length ) {
		if ( ! isset( $length['value'] ) || '' === $length['value'] || ! is_numeric( $length['value'] ) ) {
			return '';
		}

		$unit = isset( $length['unit'] ) && in_array( $length['unit'], self::UNITS, true ) ? $length['unit'] : 'px';

		return self::number( $length['value'] ) . $unit;
	}

	/**
	 * Format a stored number the way JS would: no trailing zeros, no
	 * locale-dependent separator.
	 *
	 * @param mixed $value Numeric attribute value.
	 *
	 * @return string
	 */
	private static function number( $value ) {
		$number = $value + 0;

		if ( is_int( $number ) ) {
			return (string) $number;
		}

		return rtrim( rtrim( sprintf( '%.4F', $number ), '0' ), '.' );
	}
}
