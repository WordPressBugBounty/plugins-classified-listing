<?php
/**
 * Listing Category block — style 1.
 *
 * Renders the same markup as the Elementor Listing Category widget
 * (`classified-listing-toolkits/templates/elementor/listing-cat-box/grid-style-1.php`)
 * so both share one design: `src/sass/partials/elementor/_elementor-widget-category.scss`.
 * Keeping two parallel stylesheets is what let them drift apart in the first
 * place.
 *
 * Every element also carries the block's own class (`rtcl-gb-cat-box`,
 * `item-content`, `title`, `counter`, `content`, `item-icon`) because those are
 * the selectors the block's style attributes generate CSS against — dropping
 * them would silently discard the colours and spacing existing users have set.
 * The layout stays on the block's CSS grid (`rtcl-grid-view` + `columns-*`)
 * rather than the widget's `rtcl-row`/`rtcl-col-*`, so the Columns and Gutter
 * controls keep working.
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

// The block stores alignment as `rtcl-text-<x>`; the shared stylesheet keys off
// `cat-box-<x>-alignment`. Empty stays empty — the card is centred by default,
// which is what these blocks have always rendered.
$align_map   = [
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
	'rt-el-listing-cat-box-1',
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

// `icon` gets the rounded tile from the shared stylesheet; `image` deliberately
// does not — see `.icon:not(.image)` there.
$icon_class = ( 'icon' === $settings['icon_type'] ) ? 'icon item-icon' : 'image item-image';
?>

<?php if ( ! empty( $terms ) ) { ?>
	<div class="<?php echo esc_attr( $wrap_class ); ?>">
		<div class="<?php echo esc_attr( implode( ' ', $grid_classes ) ); ?>">
			<div class="<?php echo esc_attr( $col_class ); ?>">
				<?php
				foreach ( $terms as $term ) {
					// A theme can give each category its own colour through the
					// `rtcl_category_color` filter. Style 1 does not bind it
					// itself — it is exposed so a theme stylesheet can.
					$item_style = ! empty( $term['color'] )
						? sprintf( ' style="--rtcl-cat-color:%s"', esc_attr( $term['color'] ) )
						: '';
					?>
					<div class="cat-item-wrap listing-item"<?php echo $item_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built above with esc_attr(). ?>>
						<div class="<?php echo esc_attr( $item_class ); ?>">
							<div class="cat-details-inner item-content">
								<?php if ( $show_icon && ! empty( $term['icon_html'] ) ) : ?>
									<div class="<?php echo esc_attr( $icon_class ); ?>">
										<a href="<?php echo esc_url( $term['permalink'] ); ?>"><?php echo wp_kses_post( $term['icon_html'] ); ?></a>
									</div>
								<?php endif; ?>

								<h3 class="rtcl-category-title title">
									<a href="<?php echo esc_url( $term['permalink'] ); ?>"><?php echo esc_html( $term['name'] ); ?></a>
								</h3>

								<?php
								if ( ! empty( $visibility['counter'] ) && isset( $term['count'] ) ) :
									$count = (int) $term['count'];
									?>
									<div class="views counter">
										<div class="view-inner">
											<span class="dot"></span>
											<?php if ( ! empty( $settings['count_after_text'] ) ) : ?>
												<?php echo esc_html( $count ); ?>
												<span class="ads-count"><?php echo esc_html( $settings['count_after_text'] ); ?></span>
											<?php else : ?>
												<span class="ads-count">
													<?php
													printf(
														/* translators: %s: number of ads in this category */
														esc_html( _n( '%s Ad', '%s Ads', $count, 'classified-listing' ) ),
														esc_html( $count )
													);
													?>
												</span>
											<?php endif; ?>
										</div>
									</div>
								<?php endif; ?>

								<?php if ( ! empty( $visibility['catDesc'] ) && ! empty( $term['description'] ) ) : ?>
									<p class="content">
										<?php
										if ( $settings['content_limit'] ) {
											echo esc_html( wp_trim_words( $term['description'], $settings['content_limit'] ) );
										} else {
											echo wp_kses_post( $term['description'] );
										}
										?>
									</p>
								<?php endif; ?>
							</div>
						</div>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
<?php } ?>
