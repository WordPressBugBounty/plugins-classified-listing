<?php
/**
 * The pricing box markup, rendered once for both front ends.
 *
 * The same three pricing designs are rendered by two plugins:
 *
 *   - the Elementor "Pricing Table" widget in classified-listing-toolkits
 *     (`templates/elementor/pricing-table/view-{1,2,3}.php`);
 *   - the Gutenberg `rtcl/pricing-table` block in this plugin
 *     (`templates/block/pricing-table/view-{1,2,3}.php`).
 *
 * Both used to carry their own copy of the markup, and a third copy lived in
 * the block's React editor preview. The copies drifted — Elementor grew a
 * sub-title the block never rendered, view-2 printed `/ mo` in the editor and
 * `/mo` on the front end — which is why the two editors stopped agreeing.
 *
 * The structure now lives here and both templates call it, so there is one
 * answer to "what does a pricing box look like". The shared stylesheet
 * `src/sass/partials/_pricing-box.scss` is written against exactly these class
 * names; change one and you must change the other.
 *
 * This mirrors how {@see ListingShowcase} already shares the listing card
 * between the same two front ends, including the reason the templates remain
 * real files: `classified-listing/block/pricing-table/...` is a documented
 * theme override point, and folding the markup entirely into this class would
 * silently kill every override of it. A theme that wants different markup
 * copies the template and stops calling this.
 *
 * ── What each front end still owns ──────────────────────────────────────────
 *
 * Only the bits the two genuinely disagree on: Elementor renders icons as Font
 * Awesome `<i>` elements through `Icons_Manager`, the block renders inline
 * `<svg>` through `BlockFns`. So icons, the feature list and the button arrive
 * here as already-rendered, already-escaped HTML, and the caller keeps its own
 * escaping policy (`wp_kses_post` for Elementor, `BlockFns::kses_allowed_svg()`
 * for the block). Plain-text values are escaped here.
 *
 * @package Classified-listing
 */

namespace Rtcl\Helpers;

/**
 * Class PricingBox
 */
class PricingBox {

	/**
	 * Legacy class families, keyed by the front end that emits them.
	 *
	 * These carry NO styling any more — the stylesheet is written entirely
	 * against the shared `rtcl-pricing-box__*` names. They stay in the markup
	 * because a great many things already point at them and would break if they
	 * vanished:
	 *
	 *   - the block's 52 generated selectors in `Blocks\PricingTable`;
	 *   - every `selectors` entry on the Elementor widget's style controls;
	 *   - whatever custom CSS existing sites wrote against the old design.
	 *
	 * Emitting both families costs a few bytes and keeps all of that working.
	 *
	 * @var array
	 */
	const LEGACY_PREFIXES = [ 'el', 'gb' ];

	/**
	 * Render a complete pricing box.
	 *
	 * @param array $args {
	 *     @type int    $style             1, 2, 3 or 4.
	 *     @type string $align             left|center|right, or '' to follow the style.
	 *     @type string $prefix            Legacy class family: `el` or `gb`.
	 *     @type bool   $featured          Emphasise this box as the featured one.
	 *     @type bool   $hover_translate   Let the box rise on hover.
	 *     @type string $badge             Badge text. Plain text, escaped here.
	 *     @type string $title             Title. Plain text, escaped here.
	 *     @type string $sub_title         Sub-title. Plain text, escaped here.
	 *     @type string $currency          Currency symbol. Plain text.
	 *     @type string $price             Amount. Plain text.
	 *     @type string $unit              Period, e.g. `mo`. Plain text.
	 *     @type string $currency_position left|right.
	 *     @type bool   $show_per_sign     Print `/` before the period.
	 *     @type string $icon_html         Pre-escaped icon markup (style 3).
	 *     @type string $features_html     Pre-escaped `<ul>…</ul>`.
	 *     @type string $button_html       Pre-escaped `<a>…</a>`.
	 *     @type string $watermark_url     Decorative corner image URL, style 4.
	 * }
	 *
	 * @return string
	 */
	public static function render( $args = [] ) {
		$args = wp_parse_args(
			$args,
			[
				'style'             => 1,
				'align'             => '',
				'prefix'            => 'gb',
				'featured'          => false,
				'hover_translate'   => false,
				'badge'             => '',
				'title'             => '',
				'sub_title'         => '',
				'currency'          => '',
				'price'             => '',
				'unit'              => '',
				'currency_position' => 'left',
				'show_per_sign'     => true,
				'icon_html'         => '',
				'features_html'     => '',
				'button_html'       => '',
				'watermark_url'     => '',
			]
		);

		$style  = in_array( (int) $args['style'], [ 1, 2, 3, 4 ], true ) ? (int) $args['style'] : 1;
		// An empty alignment means "whatever this style is meant to be", which is
		// how style 4 comes out left without a control having to be touched. Any
		// explicit value still wins, so a style 4 deliberately set to centre stays
		// centred.
		$align  = in_array( $args['align'], [ 'left', 'center', 'right' ], true )
			? $args['align']
			: self::default_align( (int) $args['style'] );
		$prefix = in_array( $args['prefix'], self::LEGACY_PREFIXES, true ) ? $args['prefix'] : 'gb';

		// Style 3 is the odd one: the icon medallion goes in the header and the
		// price drops to the footer, above the button.
		$price_in_footer = ( 3 === $style );

		$price_html = self::price( $args, $prefix );

		$classes = [
			'rtcl-pricing-box',
			'rtcl-pricing-box--v' . $style,
			'rtcl-pricing-box--align-' . $align,
			// Legacy, unstyled. See LEGACY_PREFIXES.
			'rtcl-' . $prefix . '-pricing-box',
			'rtcl-' . $prefix . '-pricing-box-view-' . $style,
			'content-alignment-' . $align,
		];

		// Elementor switchers arrive as the string 'yes', the block sends a real
		// boolean — both have to count as on.
		if ( self::is_on( $args['featured'] ) ) {
			$classes[] = 'rtcl-pricing-box--featured';
		}

		if ( self::is_on( $args['hover_translate'] ) ) {
			$classes[] = 'rtcl-pricing-box--hover-lift';
		}

		ob_start();
		?>
		<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
			<?php if ( '' !== (string) $args['watermark_url'] ) : ?>
				<?php /* Decoration only: no alt text, and hidden from assistive tech. */ ?>
				<span class="rtcl-pricing-box__watermark" aria-hidden="true">
					<img src="<?php echo esc_url( $args['watermark_url'] ); ?>" alt="" />
				</span>
			<?php endif; ?>

			<?php if ( '' !== (string) $args['badge'] ) : ?>
				<span class="rtcl-pricing-box__badge pricing-label"><?php echo esc_html( $args['badge'] ); ?></span>
			<?php endif; ?>

			<div class="rtcl-pricing-box__header pricing-header">
				<?php if ( 3 === $style && '' !== trim( (string) $args['icon_html'] ) ) : ?>
					<div class="rtcl-pricing-box__icon box-icon">
						<?php echo $args['icon_html']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by the caller; see the class docblock. ?>
					</div>
				<?php endif; ?>

				<?php if ( '' !== (string) $args['title'] ) : ?>
					<h3 class="rtcl-pricing-box__title rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-title"><?php echo esc_html( $args['title'] ); ?></h3>
				<?php endif; ?>

				<?php if ( '' !== (string) $args['sub_title'] ) : ?>
					<div class="rtcl-pricing-box__subtitle rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-sub-title"><?php echo esc_html( $args['sub_title'] ); ?></div>
				<?php endif; ?>

				<?php
				if ( ! $price_in_footer ) {
					echo $price_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built and escaped by self::price().
				}
				?>
			</div>

			<div class="rtcl-pricing-box__body pricing-body">
				<div class="rtcl-pricing-box__features rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-features">
					<?php echo $args['features_html']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by the caller; see the class docblock. ?>
				</div>
			</div>

			<div class="rtcl-pricing-box__footer pricing-footer">
				<?php
				if ( $price_in_footer ) {
					echo $price_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built and escaped by self::price().
				}
				?>

				<?php if ( '' !== trim( (string) $args['button_html'] ) ) : ?>
					<div class="rtcl-pricing-box__action rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-button">
						<?php echo $args['button_html']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by the caller; see the class docblock. ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 * Is a switch on?
	 *
	 * The two editors disagree about what a boolean looks like: Elementor's
	 * SWITCHER stores the string `yes` (and `''` when off), the block stores a
	 * real boolean. `'no'` is checked too because that is what a switcher
	 * configured with an explicit off-value stores, and it is truthy as a string.
	 *
	 * @param mixed $value Raw setting value.
	 *
	 * @return bool
	 */
	protected static function is_on( $value ) {
		return ! empty( $value ) && 'no' !== $value;
	}

	/**
	 * The alignment a style reads best at, used when none was chosen.
	 *
	 * Style 4 is a left-aligned card by design — its title sits over a large
	 * price with a description beneath and a mark in the opposite corner, none of
	 * which composes centred. The other three are centred.
	 *
	 * This is a FALLBACK, not an override: it only applies when the alignment
	 * control has never been set. Forcing the control's value when someone picks a
	 * style would silently rewrite a choice they had already made.
	 *
	 * `renderView.jsx` mirrors this so the editor preview agrees.
	 *
	 * @param int $style Style number.
	 *
	 * @return string
	 */
	protected static function default_align( $style ) {
		return 4 === $style ? 'left' : 'center';
	}

	/**
	 * The price group — currency, amount and period.
	 *
	 * Split out because style 3 renders it in the footer and styles 1 and 2 in
	 * the header; the markup itself is identical in all three, so it is built
	 * once and placed twice.
	 *
	 * The whole group is skipped when there is no amount AND no period. An empty
	 * price block still occupies its top margin, which showed up as a mystery
	 * gap under the title on boxes that only advertise features.
	 *
	 * @param array  $args   Render args, already defaulted.
	 * @param string $prefix Legacy class family.
	 *
	 * @return string
	 */
	protected static function price( $args, $prefix ) {
		$price = (string) $args['price'];
		$unit  = (string) $args['unit'];

		if ( '' === $price && '' === $unit ) {
			return '';
		}

		// `currency-left` / `currency-right` is the class the stylesheet flips
		// the flex direction on, and it is also what both editors' existing
		// currency-position controls already target.
		$currency_class = 'right' === $args['currency_position'] ? 'currency-right' : 'currency-left';

		// The separator is a control in both editors. Elementor called it
		// `show_per_sign`; the block hard-coded the slash and disagreed with its
		// own editor preview about the spacing, which is why it is built here.
		$period = '';

		if ( '' !== $unit ) {
			$period = ( ! empty( $args['show_per_sign'] ) ? '/ ' : '' ) . $unit;
		}

		ob_start();
		?>
		<div class="rtcl-pricing-box__price rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-price">
			<span class="rtcl-pricing-box__amount rtcl-<?php echo esc_attr( $prefix ); ?>-price <?php echo esc_attr( $currency_class ); ?>">
				<?php if ( '' !== (string) $args['currency'] ) : ?>
					<span class="rtcl-pricing-box__currency rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-currency"><?php echo esc_html( $args['currency'] ); ?></span>
				<?php endif; ?>
				<?php if ( '' !== $price ) : ?>
					<span class="rtcl-pricing-box__number rtcl-<?php echo esc_attr( $prefix ); ?>-number"><?php echo esc_html( $price ); ?></span>
				<?php endif; ?>
			</span>
			<?php if ( '' !== $period ) : ?>
				<span class="rtcl-pricing-box__period rtcl-<?php echo esc_attr( $prefix ); ?>-pricing-duration"><?php echo esc_html( $period ); ?></span>
			<?php endif; ?>
		</div>
		<?php

		return ob_get_clean();
	}
}
