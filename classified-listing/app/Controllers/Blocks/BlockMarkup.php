<?php
/**
 * Shared markup patching for the block render-time filters.
 *
 * Several of the `core/*` enhancements in this directory work the same way:
 * the editor stores attributes on the block but deliberately writes nothing
 * into the saved HTML — doing that through `blocks.getSaveContent.extraProps`
 * would flag every affected block invalid the moment this plugin is
 * deactivated — so the class and the custom properties are merged into the
 * rendered markup here, on `render_block`, and the saved post never changes.
 *
 * `CoreSpacing` and `CoreButton` both need exactly this, which is why it lives
 * in one place: the WordPress < 6.2 fallback below is fiddly enough that three
 * copies of it would drift.
 *
 * @package Classified-listing
 */

namespace Rtcl\Controllers\Blocks;

/**
 * Class BlockMarkup
 */
class BlockMarkup {

	/**
	 * Merge a class and an inline style into a block's first HTML tag.
	 *
	 * @param string $html    Rendered block HTML.
	 * @param string $classes Space separated classes to add. Optional.
	 * @param string $style   Declarations to append to any existing style. Optional.
	 *
	 * @return string
	 */
	public static function add_attributes( $html, $classes = '', $style = '' ) {
		if ( ! is_string( $html ) || ( '' === $classes && '' === $style ) ) {
			return $html;
		}

		if ( class_exists( 'WP_HTML_Tag_Processor' ) ) {
			$tags = new \WP_HTML_Tag_Processor( $html );

			if ( ! $tags->next_tag() ) {
				return $html;
			}

			if ( '' !== $classes ) {
				foreach ( preg_split( '/\s+/', trim( $classes ) ) as $class_name ) {
					if ( '' !== $class_name ) {
						$tags->add_class( $class_name );
					}
				}
			}

			if ( '' !== $style ) {
				$existing = $tags->get_attribute( 'style' );
				$existing = is_string( $existing ) ? rtrim( trim( $existing ), ';' ) : '';

				$tags->set_attribute( 'style', '' !== $existing ? $existing . ';' . $style : $style );
			}

			return $tags->get_updated_html();
		}

		// WordPress < 6.2 has no tag processor — patch the opening tag by hand.
		if ( ! preg_match( '/<[a-zA-Z][^>]*>/', $html, $match, PREG_OFFSET_CAPTURE ) ) {
			return $html;
		}

		$tag    = $match[0][0];
		$offset = $match[0][1];
		$open   = $tag;

		if ( '' !== $classes ) {
			if ( preg_match( '/\sclass\s*=\s*("|\')(.*?)\1/i', $open, $found ) ) {
				$open = str_replace(
					$found[0],
					' class=' . $found[1] . trim( $found[2] . ' ' . $classes ) . $found[1],
					$open
				);
			} else {
				$open = preg_replace( '/^<([a-zA-Z0-9:-]+)/', '<$1 class="' . esc_attr( $classes ) . '"', $open, 1 );
			}
		}

		if ( '' !== $style ) {
			if ( preg_match( '/\sstyle\s*=\s*("|\')(.*?)\1/i', $open, $found ) ) {
				$existing = rtrim( trim( $found[2] ), ';' );
				$merged   = '' !== $existing ? $existing . ';' . $style : $style;
				$open     = str_replace( $found[0], ' style=' . $found[1] . $merged . $found[1], $open );
			} else {
				$open = preg_replace( '/^<([a-zA-Z0-9:-]+)/', '<$1 style="' . esc_attr( $style ) . '"', $open, 1 );
			}
		}

		return substr_replace( $html, $open, $offset, strlen( $tag ) );
	}
}
