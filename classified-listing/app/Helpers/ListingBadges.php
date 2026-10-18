<?php
/**
 * Promotion badges for a placed instance — a block or a widget.
 *
 * The badge callbacks (`TemplateHooks::listing_featured_badge()` and the New
 * one here, plus Pro's popular / top / bump-up) all gate on
 * `Functions::get_display_options()`. Those options describe the **archive** and
 * the **single listing page**, and they are the right gate there.
 *
 * They are the wrong gate for a Gutenberg block or an Elementor widget. Those
 * are instances the user placed and configured individually, and a global
 * archive checkbox has no business deciding what one of them shows — the
 * practical result was that a block could not display a Featured badge unless
 * the site-wide archive was also displaying it, which is not a relationship
 * anyone would expect. `featured` is not even in the setting's default, so out
 * of the box every block rendered with no badges at all.
 *
 * So an instance passes its own list here instead. For the length of one
 * `rtcl_listing_badges` pass this swaps the badge keys inside the display
 * options, then puts them back.
 *
 * Why filter the options rather than the badges: four of the five callbacks
 * expose a `rtcl_listing_can_show_*_badge_settings` filter, but Pro's popular
 * badge exposes none, so a per-badge approach could never cover the set. The
 * options array is the one thing every callback reads, and filtering it needs
 * no change in Pro at all.
 *
 * @package Classified-listing
 */

namespace Rtcl\Helpers;

/**
 * Class ListingBadges
 */
class ListingBadges {

	/**
	 * Every badge key, in render order.
	 *
	 * `featured` and `new` come from this plugin, the rest from Pro. Listing
	 * Pro's here is deliberate: the keys are what the display options contain,
	 * and this class only ever reads and rewrites that array — it never calls
	 * into Pro — so naming them costs nothing when Pro is inactive.
	 */
	const KEYS = [ 'featured', 'new', 'popular', 'top', 'bump_up' ];

	/**
	 * Render the badges for one listing, honouring an instance's own choices.
	 *
	 * @param object     $listing Listing model.
	 * @param array|null $enabled Badge keys this instance shows. `null` means
	 *                            "all of them", which is what an instance saved
	 *                            before this setting existed will pass — those
	 *                            keep working and gain the badges they were
	 *                            always meant to show.
	 *
	 * @return string
	 */
	public static function render( $listing, $enabled = null ) {
		if ( ! is_object( $listing ) ) {
			return '';
		}

		self::begin( $enabled );

		ob_start();
		do_action( 'rtcl_listing_badges', $listing );
		$html = ob_get_clean();

		self::end();

		return (string) $html;
	}

	/**
	 * The override currently in force, if any.
	 *
	 * @var callable|null
	 */
	private static $override = null;

	/**
	 * Apply an instance's badge choices for a whole render pass.
	 *
	 * Templates reach the badges two different ways — some call
	 * `do_action( 'rtcl_listing_badges' )` directly, others go through
	 * `Listing::badges()` and the `listing/badges` template. Wrapping the entire
	 * render covers both without either having to know about this, which is why
	 * the Elementor widget brackets its template with `begin()` / `end()`
	 * instead of the ten layout templates each being rewritten.
	 *
	 * ALWAYS pair with `end()`. Leaving an override in place would apply this
	 * instance's badge choices to everything rendered afterwards on the page.
	 *
	 * @param array|null $enabled Badge keys, or null for all of them.
	 *
	 * @return void
	 */
	public static function begin( $enabled = null ) {
		// Re-entrancy would need a stack; nesting two listing widgets inside one
		// another is not a thing, so the simpler contract is that the first
		// override wins and a nested call is a no-op rather than a silent
		// corruption of the outer one.
		if ( null !== self::$override ) {
			return;
		}

		$enabled = null === $enabled
			? self::KEYS
			: array_values( array_intersect( self::normalize( $enabled ), self::KEYS ) );

		// Swap the badge keys for this instance's, leaving every other display
		// option (date, price, excerpt…) exactly as the site configured it —
		// other callbacks on this hook may legitimately read them.
		self::$override = static function ( $options ) use ( $enabled ) {
			$options = is_array( $options ) ? $options : [];

			return array_values( array_unique( array_merge( array_diff( $options, self::KEYS ), $enabled ) ) );
		};

		add_filter( 'rtcl_display_options', self::$override, 99 );
	}

	/**
	 * Lift the override applied by `begin()`.
	 *
	 * @return void
	 */
	public static function end() {
		if ( null === self::$override ) {
			return;
		}

		remove_filter( 'rtcl_display_options', self::$override, 99 );
		self::$override = null;
	}

	/**
	 * Accept the shapes a stored setting can arrive in.
	 *
	 * A block round-trips its attributes through AJAX, where an array of keys
	 * can arrive as `[ 'featured' => 'true', 'popular' => 'false' ]` rather than
	 * as a list; Elementor stores its multi-select as a plain list. Both are
	 * normalised to a list of enabled keys.
	 *
	 * @param mixed $value Stored setting.
	 *
	 * @return array
	 */
	private static function normalize( $value ) {
		if ( ! is_array( $value ) ) {
			return [];
		}

		$keys = [];

		foreach ( $value as $key => $item ) {
			if ( is_int( $key ) ) {
				// A plain list of enabled keys.
				$keys[] = (string) $item;
				continue;
			}

			// A key => on/off map.
			$on = is_string( $item )
				? ! in_array( strtolower( $item ), [ '', '0', 'false' ], true )
				: (bool) $item;

			if ( $on ) {
				$keys[] = (string) $key;
			}
		}

		return $keys;
	}
}
