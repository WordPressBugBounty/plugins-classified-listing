<?php
/**
 * Listing Category block — new layout 3.
 *
 * A circular badge per category with the name and count beneath it.
 *
 * The style key is `new-layout-3`, not `3`. Themes and add-ons extend the style
 * list through filters and several already ship their own `layout-3` / `style-3`
 * / `3`; prefixing keeps this one from colliding with them.
 *
 * Renders the same markup as the Elementor widget's `grid-new-layout-3.php` in
 * classified-listing-toolkits so both share one design, which lives in
 * `src/sass/partials/elementor/_elementor-widget-category.scss`. Element classes
 * carried over from the block (`rtcl-gb-cat-box`, `item-content`, `title`,
 * `counter`, `item-icon`) are the selectors the block's style attributes
 * generate CSS against.
 *
 * The badge uses the primary colour for every category — the plugin has no
 * per-category colour setting, so the multicolour look of the reference design
 * is not reproducible without one.
 *
 * @package Classified-listing
 */

use Rtcl\Controllers\Blocks\ListingCatBox;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$col_class  = 'rtcl-grid-view';
$col_class .= ' columns-' . $settings['col_desktop'];
$col_class .= ' tab-columns-' . $settings['col_tablet'];
$col_class .= ' mobile-columns-' . $settings['col_mobile'];
$col_class .= ' rtcl-gb-cat-wrap';

$visibility = ! empty( $settings['content_visibility'] ) ? $settings['content_visibility'] : [];
$show_icon  = ! empty( $visibility['icon'] );

$align_map     = [
	'rtcl-text-left'   => 'cat-box-left-alignment',
	'rtcl-text-right'  => 'cat-box-right-alignment',
	'rtcl-text-center' => '',
];
$content_align = ! empty( $visibility['contentAlign'] ) ? $visibility['contentAlign'] : '';
$align_class   = isset( $align_map[ $content_align ] ) ? $align_map[ $content_align ] : '';

$grid_classes = [
	'rtcl',
	'rtcl-gb-block',
	'rtcl-categories',
	'rtcl-categories-elementor',
	'rtcl-categories-grid',
	'rt-el-listing-cat-box-new-layout-3',
	$show_icon ? 'has-cat-icon' : 'no-cat-icon',
];
if ( $align_class ) {
	$grid_classes[] = $align_class;
}

// Empty string when the hover lift is switched off.
$hover_lift_class = ListingCatBox::hover_lift_class( $settings );
if ( $hover_lift_class ) {
	$grid_classes[] = $hover_lift_class;
}

$item_class  = 'cat-details rtcl-gb-cat-box';
$item_class .= ' rtcl-gb-cat-box-' . $settings['col_style']['style'];
if ( $content_align ) {
	$item_class .= ' ' . $content_align;
}

$wrap_class = '';
if ( isset( $settings['blockId'] ) ) {
	$wrap_class .= 'rtcl-block-' . $settings['blockId'];
}
$wrap_class .= ' rtcl-block-frontend ';
if ( isset( $settings['className'] ) ) {
	$wrap_class .= $settings['className'];
}
// Empty means no alignment — `isset()` let an empty value through and
// produced a bare `align` class.
if ( ! empty( $settings['align'] ) ) {
	$wrap_class .= ' align' . $settings['align'] . ' ';
}

$icon_class = ( 'icon' === $settings['icon_type'] ) ? 'icon item-icon' : 'image icon item-image';
?>

<?php if ( ! empty( $terms ) ) { ?>
	<div class="<?php echo esc_attr( $wrap_class ); ?>">
		<div class="<?php echo esc_attr( implode( ' ', $grid_classes ) ); ?>">
			<div class="<?php echo esc_attr( $col_class ); ?>">
				<?php
				foreach ( $terms as $term ) {
					// A theme can give each category its own colour through the
					// `rtcl_category_color` filter; the badge falls back to the
					// primary colour when nothing does.
					$item_style = ! empty( $term['color'] )
						? sprintf( ' style="--rtcl-cat-color:%s"', esc_attr( $term['color'] ) )
						: '';
					?>
					<div class="cat-item-wrap listing-item"<?php echo $item_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built above with esc_attr(). ?>>
						<div class="<?php echo esc_attr( $item_class ); ?>">
							<div class="cat-details-inner">
								<?php if ( $show_icon && ! empty( $term['icon_html'] ) ) : ?>
									<div class="<?php echo esc_attr( $icon_class ); ?>">
										<a href="<?php echo esc_url( $term['permalink'] ); ?>"><?php echo wp_kses_post( $term['icon_html'] ); ?></a>
									</div>
								<?php endif; ?>

								<div class="rtcl-title-wrapper item-content">
									<h3 class="rtcl-category-title title">
										<a href="<?php echo esc_url( $term['permalink'] ); ?>"><?php echo esc_html( $term['name'] ); ?></a>
									</h3>

									<?php
									if ( ! empty( $visibility['counter'] ) && isset( $term['count'] ) ) :
										$count = (int) $term['count'];
										// Bare "(3)" unless a suffix was set, which is how
										// the layout reads in the design.
										$count_text = ! empty( $settings['count_after_text'] )
											? $count . ' ' . $settings['count_after_text']
											: (string) $count;
										?>
										<div class="views counter">
											<div class="view-inner">
												<span class="dot"></span>
												<span class="ads-count"><?php echo esc_html( $count_text ); ?></span>
											</div>
										</div>
									<?php endif; ?>
								</div>
							</div>
						</div>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
<?php } ?>
