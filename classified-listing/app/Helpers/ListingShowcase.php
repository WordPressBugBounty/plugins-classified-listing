<?php
/**
 * Card fragments for the Listing Showcase layouts, Gutenberg side.
 *
 * The ten block layouts (`templates/block/listing-ads/{grid,list}/style-{1..5}.php`)
 * render the same card design as the ten Elementor layouts in
 * classified-listing-toolkits, styled by the shared
 * `src/sass/partials/_listing-showcase.scss`. What differs between the two front
 * ends is only:
 *
 *   - the settings keys — Elementor's flat `rtcl_show_price`, the block's
 *     nested `content_visibility['price']`;
 *   - the data source — Elementor loops a `WP_Query`, the block is handed a
 *     pre-built array by `ListingsAjaxController::rtcl_gb_listings_query()`.
 *
 * Everything between those two points is identical, so it lives here once
 * instead of ten times. Each layout template still assembles the fragments into
 * its own structure and stays a real file under `templates/` — collapsing the
 * markup into this class would silently kill every theme override of
 * `classified-listing/block/listing-ads/...`, which is a documented extension
 * point.
 *
 * Fragment markup is deliberately byte-compatible with the Elementor templates.
 * If you change a class name here, change it there too or the two front ends
 * drift apart again — the shared stylesheet is written against these names.
 *
 * @package Classified-listing
 */

namespace Rtcl\Helpers;

/**
 * Class ListingShowcase
 */
class ListingShowcase {

	/**
	 * Read a `content_visibility` toggle.
	 *
	 * Absent keys count as ON. These blocks predate several of the toggles, so
	 * a post saved before a toggle existed has no value for it — defaulting to
	 * OFF would silently strip content from existing pages on upgrade.
	 *
	 * @param array  $instance Block settings.
	 * @param string $key      Toggle name.
	 *
	 * @return bool
	 */
	public static function shows( $instance, $key ) {
		if ( ! isset( $instance['content_visibility'] ) || ! is_array( $instance['content_visibility'] ) ) {
			return true;
		}

		if ( ! array_key_exists( $key, $instance['content_visibility'] ) ) {
			return true;
		}

		$value = $instance['content_visibility'][ $key ];

		// The editor round-trips these through AJAX, where booleans arrive as
		// the strings "false"/"0" rather than as booleans.
		if ( is_string( $value ) ) {
			return ! in_array( strtolower( $value ), [ '', '0', 'false' ], true );
		}

		return (bool) $value;
	}

	/**
	 * The action buttons that sit over the photo.
	 *
	 * Favourite comes from the core helper and keeps its own icon — the shared
	 * stylesheet already styles `.rtcl-icon-heart`. Quick view and compare are
	 * rebuilt here rather than reused from
	 * `ListingsAjaxController::rtcl_gb_listings_query()`, because that builds
	 * them with the old webfont glyphs (`rtcl-icon-zoom-in`,
	 * `rtcl-icon-retweet`) and the 2026 layouts use the inline SVG set.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 *
	 * @return string
	 */
	public static function buttons( $item, $instance, $icon = 'eye' ) {
		$items = self::action_items( $item, $instance, [ 'prefix' => 'rtcl', 'icon' => $icon ] );

		if ( ! $items ) {
			return '';
		}

		// The block stores this already suffixed — its default is
		// `horizontal-layout`, where Elementor's equivalent setting stores a
		// bare `horizontal` and the template appends `-layout`. Appending
		// unconditionally produced `horizontal-layout-layout`, which matches no
		// rule in the stylesheet, so the action rail fell back to its unstyled
		// arrangement. Normalise instead of assuming either shape.
		$layout = ! empty( $instance['content_visibility']['actionLayout'] )
			? sanitize_html_class( $instance['content_visibility']['actionLayout'] ) : '';

		if ( '' !== $layout && ! preg_match( '/-layout$/', $layout ) ) {
			$layout .= '-layout';
		}

		return sprintf(
			'<div class="rtcl-meta-buttons-wrap %s meta-button-count-%d">%s</div>',
			esc_attr( $layout ),
			count( $items ),
			implode( ' ', $items )
		);
	}

	/**
	 * Favourite, quick view and compare, as standalone button elements.
	 *
	 * Five layouts want five slightly different renderings of the same three
	 * buttons, so the differences are parameters rather than five copies:
	 *
	 *   prefix  `rtcl` over the photo, `rtin` in a footer or aside — drives the
	 *           `-fav` / `-quick-view` / `-compare` names the stylesheet targets
	 *   class   the shared button class: `rtcl-el-button` (overlay),
	 *           `rtin-el-button` (footer) or `rtcl-text-el-button` (labelled)
	 *   labels  whether each button carries a visible `<span>` caption. Labelled
	 *           buttons also get their per-button name class, and drop the
	 *           `title` attribute the icon-only ones rely on for their tooltip —
	 *           that is how the Elementor templates do it, and the caption makes
	 *           the tooltip redundant anyway
	 *   icon    quick-view glyph, `eye` or `quick-view` depending on the layout
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 * @param array $args     prefix, class, labels, icon.
	 *
	 * @return array HTML for each enabled button, in render order.
	 */
	private static function action_items( $item, $instance, $args = [] ) {
		$args = array_merge(
			[
				'prefix' => 'rtcl',
				'class'  => '',
				'labels' => false,
				'icon'   => 'eye',
			],
			$args
		);

		$prefix = $args['prefix'];
		$class  = $args['class'] ? $args['class'] : $prefix . '-el-button';
		$labels = (bool) $args['labels'];
		$id     = absint( $item['ID'] );
		$items  = [];

		// Named only when labelled; the icon-only variants leave every button but
		// the favourite on the bare shared class.
		$name = static function ( $suffix ) use ( $prefix, $class, $labels ) {
			return $labels ? sprintf( '%s-%s %s', $prefix, $suffix, $class ) : $class;
		};

		$caption = static function ( $text ) use ( $labels ) {
			return $labels ? sprintf( '<span>%s</span>', esc_html( $text ) ) : '';
		};

		$title = static function ( $text ) use ( $labels ) {
			return $labels ? '' : sprintf( ' title="%s"', esc_attr( $text ) );
		};

		if ( self::shows( $instance, 'favourit_btn' ) && ! empty( $item['favourite_link'] ) ) {
			// The favourite always carries its name — it is the one button the
			// stylesheet colours differently when active.
			$items[] = sprintf(
				'<div class="%s-fav %s">%s</div>',
				esc_attr( $prefix ),
				esc_attr( $class ),
				$item['favourite_link']
			);
		}

		if ( rtcl()->has_pro() && self::shows( $instance, 'quick_btn' ) && ! empty( $item['quick_view'] ) ) {
			$items[] = sprintf(
				'<div class="%s"><a class="rtcl-quick-view" href="#"%s data-listing_id="%d">%s%s</a></div>',
				esc_attr( $name( 'quick-view' ) ),
				$title( __( 'Quick View', 'classified-listing' ) ),
				$id,
				Icons::get( $args['icon'] ),
				$caption( __( 'Quick View', 'classified-listing' ) )
			);
		}

		if ( rtcl()->has_pro() && self::shows( $instance, 'compare_btn' ) && ! empty( $item['compare'] ) ) {
			// Mirrors the Elementor template: the session drives the selected
			// state so a compared listing stays lit after a page load.
			$compare_ids    = ! empty( $_SESSION['rtcl_compare_ids'] ) ? array_map( 'absint', (array) $_SESSION['rtcl_compare_ids'] ) : [];
			$selected_class = in_array( $id, $compare_ids, true ) ? ' selected' : '';

			$items[] = sprintf(
				'<div class="%s"><a class="rtcl-compare %s" href="#"%s data-listing_id="%d">%s%s</a></div>',
				esc_attr( $name( 'compare' ) ),
				esc_attr( $selected_class ),
				$title( __( 'Compare', 'classified-listing' ) ),
				$id,
				Icons::get( 'compare' ),
				$caption( __( 'Compare', 'classified-listing' ) )
			);
		}

		return $items;
	}

	/**
	 * Grid style 5's footer: an even row of cells with the seller first.
	 *
	 * A third distinct shape. Grid 3 and list 4 use flat `.rtin-el-button` divs
	 * in a three-column grid; this one is a `<ul>` whose `<li>`s divide the row
	 * evenly, and its first cell is the seller's avatar rather than a button.
	 * The stylesheet targets `li` and `.action-btn` directly, so the list
	 * elements are load-bearing — divs get none of it.
	 *
	 * The seller cell is deliberately NOT `.action-btn`: it is a person, not an
	 * action, and the action-button style controls are meant to skip it.
	 *
	 * @param array  $item     One row from the block's listings array.
	 * @param array  $instance Block settings.
	 * @param string $icon     Quick-view glyph.
	 *
	 * @return string
	 */
	public static function author_bar( $item, $instance, $icon = 'quick-view' ) {
		$cells  = [];
		$author = self::shows( $instance, 'author' ) && ! empty( $item['author_image'] );

		if ( $author ) {
			$avatar = ! empty( $item['author_url'] )
				? sprintf(
					'<a href="%s"><div class="item-img">%s</div></a>',
					esc_url( $item['author_url'] ),
					$item['author_image']
				)
				: sprintf( '<div class="item-img">%s</div>', $item['author_image'] );

			$cells[] = sprintf( '<li class="item-author">%s</li>', $avatar );
		}

		foreach ( self::action_items( $item, $instance, [ 'prefix' => 'rtin', 'icon' => $icon ] ) as $button ) {
			// Reuse the same buttons, re-wrapped as list cells: `action_items()`
			// owns which are enabled and how each is built, and only the element
			// around them differs here.
			$cells[] = sprintf( '<li class="action-btn">%s</li>', self::unwrap( $button ) );
		}

		if ( ! $cells ) {
			return '';
		}

		return sprintf(
			'<div class="rtin-bottom%s"><ul>%s</ul></div>',
			$author ? ' has-author' : '',
			implode( '', $cells )
		);
	}

	/**
	 * List style 5's footer: labelled buttons rather than icon-only cells.
	 *
	 * @param array  $item     One row from the block's listings array.
	 * @param array  $instance Block settings.
	 * @param string $icon     Quick-view glyph.
	 *
	 * @return string
	 */
	public static function text_buttons( $item, $instance, $icon = 'quick-view', $count = false ) {
		$items = self::action_items(
			$item,
			$instance,
			[ 'prefix' => 'rtin', 'class' => 'rtcl-text-el-button', 'labels' => true, 'icon' => $icon ]
		);

		if ( ! $items ) {
			return '';
		}

		// List 1 puts this group in the right-hand aside with a count class;
		// list 5 puts the same group in a `.rtin-bottom` footer without one.
		return sprintf(
			'<div class="rtcl-meta-buttons-withtext%s">%s</div>',
			$count ? ' meta-button-count-' . count( $items ) : '',
			implode( ' ', $items )
		);
	}

	/**
	 * Strip the single outer `<div>` `action_items()` wraps each button in.
	 *
	 * Grid style 5 needs the same buttons inside `<li>` elements instead. Doing
	 * it here keeps one definition of what a button IS, rather than a second
	 * copy that would drift the next time one of them changes.
	 *
	 * @param string $html One entry from `action_items()`.
	 *
	 * @return string
	 */
	private static function unwrap( $html ) {
		if ( ! preg_match( '#^\s*<div[^>]*>(.*)</div>\s*$#s', $html, $found ) ) {
			return $html;
		}

		return trim( $found[1] );
	}

	/**
	 * The promotion pills (Featured, New, Popular, Top, Bump Up).
	 *
	 * `ListingsAjaxController::rtcl_gb_listings_query()` captures these into the
	 * listings array up front, and normally that value is used as-is. But the
	 * capture happens in one place, far from render, and anything that leaves it
	 * empty — a plugin filtering the loop, the array arriving from a cache or a
	 * customisation that rebuilt it — silently costs the card its badges, which
	 * is invisible until you compare it against the Elementor widget.
	 *
	 * So when the captured value is empty this re-runs the exact call the
	 * Elementor templates make:
	 *
	 *     ob_start(); do_action( 'rtcl_listing_badges', $listing ); ob_get_clean();
	 *
	 * The callbacks (`TemplateHooks::listing_featured_badge()` and friends, plus
	 * Pro's popular/top/bump-up) read only the `Listing` they are handed and the
	 * global label settings — no loop state — so calling it here yields the same
	 * markup it would inside the query loop.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 *
	 * @return string
	 */
	public static function badges( $item, $instance ) {
		if ( ! self::shows( $instance, 'badge' ) ) {
			return '';
		}

		if ( empty( $item['ID'] ) || ! class_exists( '\Rtcl\Models\Listing' ) ) {
			return '';
		}

		// Deliberately NOT the `badges` value captured by
		// `ListingsAjaxController::rtcl_gb_listings_query()`. That capture runs
		// a bare `do_action( 'rtcl_listing_badges' )`, which every callback
		// gates on the global archive display options — so a block showed no
		// badges unless the site-wide archive did, and `featured` is not in that
		// setting's default. Rendering here instead lets the block's own
		// `badge_visibility` decide, which is the whole point of a placed
		// instance. See `ListingBadges`.
		$listing = new \Rtcl\Models\Listing( absint( $item['ID'] ) );

		return ListingBadges::render( $listing, self::badge_visibility( $instance ) );
	}

	/**
	 * Which badges this block instance shows.
	 *
	 * `null` — meaning all of them — for a block saved before the setting
	 * existed. Those blocks were already rendering the badge wrapper and simply
	 * never got any content into it, so switching them all on is what they were
	 * always meant to look like rather than a change in behaviour.
	 *
	 * @param array $instance Block settings.
	 *
	 * @return array|null
	 */
	public static function badge_visibility( $instance ) {
		if ( ! isset( $instance['badge_visibility'] ) || ! is_array( $instance['badge_visibility'] ) ) {
			return null;
		}

		return $instance['badge_visibility'];
	}

	/**
	 * The reveal-phone button.
	 *
	 * Its own method because the layouts place it differently: grid 3 and list 4
	 * put it inside `.rtin-bottom` as the first cell, while list 5 renders it as
	 * a SIBLING of `.rtin-bottom` — which is what makes it a filled pill there
	 * while the buttons below it stay plain text.
	 *
	 * `phone_btn` is the block's key for this. `shows()` treats an unknown key as
	 * ON, so asking for `phone` here silently ignored the user's setting.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 *
	 * @return string Empty when hidden or the listing has no number.
	 */
	public static function phone_button( $item, $instance ) {
		if ( empty( $item['phone'] ) || ! self::shows( $instance, 'phone_btn' ) ) {
			return '';
		}

		return sprintf(
			'<div class="rtin-phn rtin-el-button"><a class="rtcl-phone-reveal not-revealed" href="#" data-phone="%s">%s<span>%s</span></a></div>',
			esc_attr( $item['phone'] ),
			Icons::get( 'phone' ),
			esc_html__( 'Show Phone No', 'classified-listing' )
		);
	}

	/**
	 * The reveal-phone button, and the `.rtin-bottom` footer that carries it.
	 *
	 * Grid styles 3 and 5 (and the equivalent list layouts) put the actions in
	 * a footer strip under the body instead of floating them over the photo.
	 * The button count goes on the wrapper because the stylesheet lays the
	 * strip out differently for one, two or three buttons.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 *
	 * @return string Empty when nothing would be in it.
	 */
	public static function bottom( $item, $instance, $icon = 'quick-view', $labels = false ) {
		$items = [];
		$phone = self::phone_button( $item, $instance );

		if ( $phone ) {
			$items[] = $phone;
		}

		$items = array_merge(
			$items,
			self::action_items( $item, $instance, [ 'prefix' => 'rtin', 'icon' => $icon, 'labels' => $labels ] )
		);

		if ( ! $items ) {
			return '';
		}

		return sprintf(
			'<div class="rtin-bottom button-count-%d">%s</div>',
			count( $items ),
			implode( ' ', $items )
		);
	}

	/**
	 * Every fragment a layout template can place.
	 *
	 * The ten layouts arrange the same pieces four different ways, so rather
	 * than a variant name per layout `$args` exposes the axes they differ on:
	 *
	 *   thumb          'overlay'  photo carries a `.listing-thumb-inner` wrapper
	 *                  'plain'    photo is a bare `.listing-thumb`
	 *   thumb_badges   badges sit on the photo (true) or fall into the card body
	 *                  through `labels` (false)
	 *   thumb_actions  action buttons float over the photo (true) or are left
	 *                  for the template to place — in `.rtin-right`, say (false)
	 *   bottom         also build the `.rtin-bottom` strip (phone + actions)
	 *
	 * Because `parts()` is the one deciding where the badges went, a template can
	 * always print `labels` inside `.item-content` without knowing which case it
	 * is in — exactly as the Elementor templates do. `buttons`, `bottom` and
	 * `details` always come back populated so a layout can place them anywhere.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 * @param array $args     See the axes above. A bare string is accepted as a
	 *                        shorthand for `description`.
	 *
	 * @return array Fragment name => HTML. Every value is a ready-to-print
	 *               string, empty when that piece is hidden or has no data.
	 */
	public static function parts( $item, $instance, $args = [] ) {
		$args = array_merge(
			[
				'description'   => 'grid_content',
				'thumb'         => 'overlay',
				'thumb_badges'  => true,
				'thumb_actions' => true,
				// false | true (flat strip) | 'author' (grid 5) | 'text' (list 5).
				'bottom'        => false,
				'icon'          => 'eye',
				// List 1 renders the ad type as a pill on the photo instead of a
				// meta row, so it also drops `listing_type` from `meta_keys`.
				'type_badge'    => false,
				// List 4 captions its footer buttons; grid 3 leaves them icon-only.
				'bottom_labels' => false,
				'meta_keys'     => [ 'listing_type', 'author', 'date', 'location', 'view' ],
			],
			is_array( $args ) ? $args : [ 'description' => $args ]
		);

		$description = $args['description'];
		$overlay     = 'overlay' === $args['thumb'];

		$parts = [
			'thumb'        => '',
			'labels'       => '',
			'buttons'      => '',
			'bottom'       => '',
			'text_buttons' => '',
			'details'      => '',
			'category'     => '',
			'title'        => '',
			'custom_field' => '',
			'meta'         => '',
			'description'  => '',
			'price'        => '',
		];

		$parts['buttons']      = self::buttons( $item, $instance, $args['icon'] );
		$parts['text_buttons'] = self::text_buttons( $item, $instance, $args['icon'], true );

		// Three different footer shapes across the ten layouts; see each builder.
		if ( 'author' === $args['bottom'] ) {
			$parts['bottom'] = self::author_bar( $item, $instance, $args['icon'] );
		} elseif ( 'text' === $args['bottom'] ) {
			// The phone is a sibling of `.rtin-bottom` here, not a child of it —
			// that is what keeps it a filled pill while the buttons under it
			// render as plain captioned links.
			$parts['bottom'] = self::phone_button( $item, $instance ) . sprintf(
				'<div class="rtin-bottom">%s</div>',
				self::text_buttons( $item, $instance, $args['icon'] )
			);
		} elseif ( $args['bottom'] ) {
			$parts['bottom'] = self::bottom( $item, $instance, $args['icon'], $args['bottom_labels'] );
		}
		$parts['details'] = self::shows( $instance, 'details_btn' )
			? sprintf(
				'<a class="rtin-details-button" href="%s">%s</a>',
				esc_url( $item['post_link'] ),
				esc_html__( 'Details', 'classified-listing' )
			)
			: '';

		$badges = self::badges( $item, $instance );
		$sold   = self::shows( $instance, 'sold' ) && ! empty( $item['sold'] ) ? $item['sold'] : '';

		// The ad type as a pill alongside Featured/Popular rather than a row in
		// the meta list. Appended before the badges are placed so it travels
		// with them, onto the photo or into the body, whichever this layout does.
		if ( $args['type_badge'] && self::shows( $instance, 'listing_type' ) && ! empty( $item['listing_type'] ) ) {
			$types = Functions::get_listing_types();
			$label = isset( $types[ $item['listing_type'] ] ) ? $types[ $item['listing_type'] ] : '';

			if ( $label ) {
				$badges .= sprintf( '<span class="badge rtcl-badge-type">%s</span>', esc_html( $label ) );
			}
		}

		if ( self::shows( $instance, 'thumbnail' ) && ! empty( $item['thumbnail'] ) ) {
			$on_photo = $args['thumb_badges'] ? $badges : '';
			$actions  = $args['thumb_actions'] ? $parts['buttons'] : '';
			$link     = sprintf(
				"<a href='%s' title='%s'>%s</a>",
				esc_url( $item['post_link'] ),
				esc_attr( $item['title'] ),
				$item['thumbnail']
			);

			if ( $overlay ) {
				// Sold banner and badges share one wrapper so the column gap
				// spaces the pills apart, the way the Elementor layouts do it.
				$wrap = trim( $sold . $on_photo )
					? sprintf( '<div class="rtcl-listing-badge-wrap">%s%s</div>', $sold, $on_photo )
					: '';

				$parts['thumb'] = sprintf(
					"<div class='listing-thumb'><div class='listing-thumb-inner'>%s%s%s</div></div>",
					$wrap,
					$link,
					$actions
				);
			} else {
				$wrap = trim( $on_photo )
					? sprintf( '<div class="rtcl-listing-badge-wrap">%s</div>', $on_photo )
					: '';

				$parts['thumb'] = sprintf(
					"<div class='listing-thumb'>%s%s%s%s</div>",
					$sold,
					$wrap,
					$link,
					$actions
				);
			}

			if ( $args['thumb_badges'] ) {
				// Rendered over the photo, so keep them out of the body.
				$badges = '';
			}
		}

		if ( trim( $badges ) ) {
			$parts['labels'] = sprintf( '<div class="rtcl-listing-badge-wrap">%s</div>', $badges );
		}

		if ( self::shows( $instance, 'category' ) && ! empty( $item['categories'] ) ) {
			// Same wrapping as the location meta entry below: one flex item for
			// the whole comma-separated value rather than one per term.
			$parts['category'] = sprintf(
				'<div class="category">%s %s</div>',
				Icons::get( 'folder' ),
				$item['categories']
			);
		}

		if ( self::shows( $instance, 'title' ) && ! empty( $item['title'] ) ) {
			$parts['title'] = sprintf(
				'<h3 class="listing-title rtcl-listing-title"><a href="%1$s" title="%2$s">%2$s</a></h3>',
				esc_url( $item['post_link'] ),
				esc_html( $item['title'] )
			);
		}

		if ( self::shows( $instance, 'custom_field' ) && ! empty( $item['custom_field'] ) ) {
			$parts['custom_field'] = $item['custom_field'];
		}

		$parts['meta'] = self::meta_list( $item, $instance, $args['meta_keys'] );

		if ( self::shows( $instance, $description ) && ! empty( $item['excerpt'] ) ) {
			$limit = ! empty( $instance['content_limit'] ) ? absint( $instance['content_limit'] ) : 0;
			$text  = $limit
				? esc_html( wp_trim_words( wpautop( $item['excerpt'] ), $limit, '' ) )
				: wpautop( $item['excerpt'] );

			$parts['description'] = sprintf( '<div class="rtcl-short-description"> %s </div>', $text );
		}

		if ( self::shows( $instance, 'price' ) && ! empty( $item['price'] ) ) {
			$parts['price'] = sprintf( '<div class="item-price">%s</div>', $item['price'] );
		}

		return $parts;
	}

	/**
	 * Tuck an extra fragment inside the `.listing-thumb` wrapper.
	 *
	 * Grid style 5 renders the price over the photo rather than in the card
	 * body. Rather than give `parts()` a second thumb variant for one layout,
	 * the template composes it here.
	 *
	 * Appending before the final `</div>` is safe because `parts()` builds the
	 * plain thumb as a single `.listing-thumb` element with no trailing
	 * siblings — and if the photo is hidden, `$thumb` is empty and the extra is
	 * dropped rather than being emitted loose into the card.
	 *
	 * @param string $thumb Thumb markup from `parts()`.
	 * @param string $extra Fragment to place inside it.
	 *
	 * @return string
	 */
	public static function thumb_with( $thumb, $extra ) {
		if ( '' === trim( (string) $thumb ) || '' === trim( (string) $extra ) ) {
			return $thumb;
		}

		$at = strrpos( $thumb, '</div>' );

		return false === $at ? $thumb : substr_replace( $thumb, $extra . '</div>', $at, strlen( '</div>' ) );
	}

	/**
	 * The meta list under the title.
	 *
	 * Order matches the Elementor templates — type, author, date, location,
	 * views — because the stylesheet targets `li` position in a couple of the
	 * layouts.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 *
	 * @return string Empty when every entry is hidden.
	 */
	protected static function meta( $item, $instance ) {
		return self::meta_list( $item, $instance, [ 'listing_type', 'author', 'date', 'location', 'view' ] );
	}

	/**
	 * Build a `.rtcl-listing-meta-data` list from a chosen subset of entries.
	 *
	 * List style 2 puts a second, shorter meta list in the right-hand aside
	 * (type and views only) alongside the full one in the body, which is why
	 * this is public and takes the keys rather than hard-coding them.
	 *
	 * @param array $item     One row from the block's listings array.
	 * @param array $instance Block settings.
	 * @param array $keys     Which entries to include, in render order.
	 *
	 * @return string Empty when every requested entry is hidden.
	 */
	public static function meta_list( $item, $instance, $keys ) {
		$entries = [];

		if ( in_array( 'listing_type', $keys, true ) && self::shows( $instance, 'listing_type' ) && ! empty( $item['listing_type'] ) ) {
			$types = Functions::get_listing_types();
			$label = isset( $types[ $item['listing_type'] ] ) ? $types[ $item['listing_type'] ] : '';

			if ( $label ) {
				$entries[] = sprintf( '<li class="rtin-type">%s%s</li>', Icons::get( 'tag' ), esc_html( $label ) );
			}
		}

		if ( in_array( 'author', $keys, true ) && self::shows( $instance, 'author' ) && ! empty( $item['author'] ) ) {
			$entries[] = sprintf( '<li class="author">%s%s</li>', Icons::get( 'user' ), esc_html( $item['author'] ) );
		}

		if ( in_array( 'date', $keys, true ) && self::shows( $instance, 'date' ) && ! empty( $item['time'] ) ) {
			$entries[] = sprintf( '<li class="date">%s%s</li>', Icons::get( 'clock' ), esc_html( $item['time'] ) );
		}

		if ( in_array( 'location', $keys, true ) && self::shows( $instance, 'location' ) && ! empty( $item['locations'] ) && wp_strip_all_tags( $item['locations'] ) ) {
			// Wrapped: a multi-term value arrives as one link per term with a
			// delimiter between them, and the `li` is a flex row — left bare,
			// every term would become a flex item of its own and wrap inside
			// its own column. The span keeps the whole value a single item that
			// wraps as ordinary text. See `%rtcl-sc-meta` in the stylesheet.
			$entries[] = sprintf(
				'<li class="location">%s %s</li>',
				Icons::get( 'location' ),
				$item['locations']
			);
		}

		if ( in_array( 'view', $keys, true ) && self::shows( $instance, 'view' ) && ! empty( $item['views'] ) ) {
			$views = absint( $item['views'] );

			$entries[] = sprintf(
				'<li class="view">%s%s</li>',
				Icons::get( 'views' ),
				esc_html(
					sprintf(
						/* translators: %s: views count */
						_n( '%s view', '%s views', $views, 'classified-listing' ),
						number_format_i18n( $views )
					)
				)
			);
		}

		return $entries ? sprintf( '<ul class="rtcl-listing-meta-data">%s</ul>', implode( '', $entries ) ) : '';
	}

	/**
	 * The wrapper class list for one layout.
	 *
	 * Mirrors the Elementor templates exactly — `.rtcl-listings` plus
	 * `rtcl-{view}-view`, `rtcl-style-{n}-view` and the three column counts —
	 * because the shared stylesheet keys every layout off those names.
	 *
	 * @param array  $instance Block settings.
	 * @param string $view     `grid` or `list`.
	 * @param string $style    Style number, 1-5.
	 *
	 * @return string
	 */
	public static function listings_class( $instance, $view, $style ) {
		$view  = in_array( $view, [ 'grid', 'list' ], true ) ? $view : 'list';
		$style = in_array( (string) $style, [ '1', '2', '3', '4', '5' ], true ) ? (string) $style : '1';

		$classes = [
			'rtcl-listings',
			'rtcl-ajax-listings',
			'rtcl-' . $view . '-view',
			'rtcl-style-' . $style . '-view',
			'columns-' . ( ! empty( $instance['col_desktop'] ) ? absint( $instance['col_desktop'] ) : 1 ),
			'tab-columns-' . ( ! empty( $instance['col_tablet'] ) ? absint( $instance['col_tablet'] ) : 2 ),
			'mobile-columns-' . ( ! empty( $instance['col_mobile'] ) ? absint( $instance['col_mobile'] ) : 1 ),
		];

		return implode( ' ', $classes );
	}

	/**
	 * The opt-in "lift the card on hover" class.
	 *
	 * The shared stylesheet keeps the card still by default and only translates
	 * it on hover when this class is on the wrapper (`--rtcl-sc-lift`). Both
	 * front ends store the toggle under their own key and in their own shape —
	 * the block saves a real boolean under `hover_translate`, Elementor's
	 * switcher saves the string `yes` (or an empty string when off) under
	 * `rtcl_listings_hover_translate` — so the key is a parameter and the value
	 * is read defensively. Off whenever the setting is missing, which is what an
	 * instance saved before this toggle existed should get.
	 *
	 * @param array  $instance Block or widget settings.
	 * @param string $key      Setting name holding the toggle.
	 *
	 * @return string Class name, or an empty string when the lift is off.
	 */
	public static function hover_lift_class( $instance, $key = 'hover_translate' ) {
		if ( ! is_array( $instance ) || ! isset( $instance[ $key ] ) ) {
			return '';
		}

		$value = $instance[ $key ];

		// Elementor stores `yes`/``; the block editor round-trips its boolean
		// through AJAX, where it can arrive as the string "false"/"0".
		if ( is_string( $value ) ) {
			$value = ! in_array( strtolower( $value ), [ '', '0', 'false', 'no' ], true );
		}

		return $value ? 'rtcl-sc-hover-lift' : '';
	}

	/**
	 * The outermost wrapper class list.
	 *
	 * `rtcl-listings-sc-wrapper` is the hook the shared stylesheet is scoped to
	 * — without it the card design does not apply at all. `rtcl-block-<id>` and
	 * the user's own `className` are kept so per-block CSS generated by
	 * `ParseCss` keeps matching.
	 *
	 * @param array $instance Block settings.
	 *
	 * @return string
	 */
	public static function wrapper_class( $instance ) {
		$classes = [ 'rtcl', 'rtcl-listings-sc-wrapper', 'rtcl-gb-block', 'rtcl-block-frontend' ];

		$lift = self::hover_lift_class( $instance );

		if ( $lift ) {
			$classes[] = $lift;
		}

		if ( ! empty( $instance['blockId'] ) ) {
			$classes[] = 'rtcl-block-' . sanitize_html_class( $instance['blockId'] );
		}

		if ( ! empty( $instance['className'] ) ) {
			$classes[] = $instance['className'];
		}

		return implode( ' ', $classes );
	}
}
