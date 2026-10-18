<?php
/**
 * `core/button` enhancements — the front end half.
 *
 * The editor stores a trailing-arrow boolean and two hover colours on the block
 * (`rtclArrowIcon`, `rtclHoverColor`, `rtclHoverBackground`, see
 * `src/blocks/core-button/`) but deliberately does not write anything into the
 * saved HTML: doing that through `blocks.getSaveContent.extraProps` would leave
 * every button flagged as invalid the moment this plugin is deactivated. So the
 * classes and custom properties are added here, at render time, and the saved
 * markup never changes.
 *
 * The arrow and the hover colours are both drawn entirely in CSS, so this class
 * only has to emit the hooks the stylesheet needs. Stylesheet is
 * `src/sass/partials/_gb-core-button.scss`, built into the shared
 * `gb-frontend-block.css` and enqueued by `BlockController::block_assets()`.
 *
 * Mirrors `hoverClasses()` / `hoverVars()` in `src/blocks/core-button/vars.js`.
 * Keep the two in step.
 *
 * @package Classified-listing
 */

namespace Rtcl\Controllers\Blocks;

/**
 * Class CoreButton
 */
class CoreButton {

	/**
	 * Boolean attribute for the trailing arrow icon.
	 */
	const ARROW_ATTRIBUTE = 'rtclArrowIcon';

	/**
	 * Class the stylesheet hangs the arrow on.
	 */
	const ARROW_CLASS = 'rtcl-gb-btn-arrow';

	/**
	 * Attribute name => short key used in the class and the custom property.
	 *
	 * Mirrors HOVER_FIELDS in `src/blocks/core-button/constants.js`.
	 */
	const HOVER_FIELDS = [
		'rtclHoverColor'      => 'hc',
		'rtclHoverBackground' => 'hbg',
	];

	/**
	 * What a stored colour is allowed to look like.
	 *
	 * These values go straight into an inline `style` attribute, so this is the
	 * security boundary and it is deliberately an allowlist rather than a
	 * blocklist. Four shapes are accepted and nothing else:
	 *
	 *   #abc / #aabbcc / #aabbccdd     hex, with or without alpha
	 *   rgb() rgba() hsl() hsla()      only digits, separators and units inside
	 *   var(--custom-property)         what the editor stores for a palette colour
	 *   red / transparent / inherit    bare CSS keyword
	 *
	 * Because the pattern is anchored and none of the character classes admit
	 * `;`, `}`, `:`, quotes or angle brackets, a value cannot close the
	 * declaration it sits in and start another one, and `url(` cannot be formed.
	 */
	const COLOR_PATTERN = '/^(?:#[0-9a-f]{3,8}|[a-z]+|(?:rgba?|hsla?)\([0-9a-z.,%\/ +-]{1,64}\)|var\(--[a-z0-9-]{1,64}\))$/i';

	/**
	 * CoreButton constructor.
	 */
	public function __construct() {
		add_filter( 'render_block', [ $this, 'render_block' ], 10, 2 );
	}

	/**
	 * Add the arrow and hover classes, and the hover custom properties, to a
	 * button's own element.
	 *
	 * Driven by the attributes rather than a block whitelist, so extending the
	 * JS side through the `rtcl.coreButton.blocks` filter needs no change here.
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
		$has_value = ! empty( $attributes[ self::ARROW_ATTRIBUTE ] );

		if ( ! $has_value ) {
			foreach ( array_keys( self::HOVER_FIELDS ) as $attribute ) {
				if ( ! empty( $attributes[ $attribute ] ) ) {
					$has_value = true;
					break;
				}
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
	 * Build the class list and the inline custom properties for one button.
	 *
	 * @param array $attributes Block attributes.
	 *
	 * @return array [ string[] $classes, string $style ]
	 */
	public static function block_style( $attributes ) {
		$classes = [];
		$style   = [];

		if ( ! empty( $attributes[ self::ARROW_ATTRIBUTE ] ) ) {
			$classes[] = self::ARROW_CLASS;
		}

		foreach ( self::HOVER_FIELDS as $attribute => $key ) {
			$color = self::sanitize_color( isset( $attributes[ $attribute ] ) ? $attributes[ $attribute ] : '' );

			if ( '' === $color ) {
				continue;
			}

			// The class is what makes the declaration conditional. Emitting the
			// custom property without it would do nothing, and emitting the
			// class without a value would resolve `var()` to nothing — which is
			// invalid at computed-value time and would take the whole
			// declaration down with it.
			$classes[] = "rtcl-gb-btn-{$key}";
			$style[]   = "--rtcl-btn-{$key}:{$color}";
		}

		return [ $classes, implode( ';', $style ) ];
	}

	/**
	 * Validate a stored colour, or return an empty string.
	 *
	 * @param mixed $value Stored attribute value.
	 *
	 * @return string
	 */
	private static function sanitize_color( $value ) {
		if ( ! is_string( $value ) ) {
			return '';
		}

		$value = trim( $value );

		if ( '' === $value || strlen( $value ) > 100 ) {
			return '';
		}

		return preg_match( self::COLOR_PATTERN, $value ) ? $value : '';
	}
}
