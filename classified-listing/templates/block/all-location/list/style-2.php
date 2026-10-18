<?php
/**
 * All Locations block — list layout, style 2.
 *
 * A pill-shaped card with the location's own photo as a CSS background, a dark
 * scrim over it, and the name and count centred in white on top.
 *
 * The photo is a background rather than an `<img>` because it has to fill a
 * fixed-height pill and be cropped by it; `background-size: cover` does that at
 * any card width without the markup caring. `image_url` is provided alongside
 * the usual `image` markup by
 * `AdminAjaxController::rtcl_gb_all_location_query()`.
 *
 * A card with no photo still renders — it falls back to a flat tint, so a
 * location without an image does not leave a hole in the row.
 *
 * Mirrors the Elementor widget's `all-locations/list/style-2.php`. Styling lives
 * in `src/sass/partials/_gb-all-location-block.scss` under
 * `.gb-all-locations.list-style-2`.
 *
 * @author     RadiusTheme
 * @package    classified-listing/templates
 * @version    1.0.0
 */

use Rtcl\Controllers\Blocks\AllLocation;

defined( 'ABSPATH' ) || exit;

$wrap_class = '';

if ( isset( $settings['blockId'] ) ) {
	$wrap_class .= 'rtcl-block-' . $settings['blockId'];
}

$wrap_class .= ' rtcl-block-frontend ';

if ( isset( $settings['className'] ) ) {
	$wrap_class .= $settings['className'];
}

list( $image_box_class ) = AllLocation::image_box_attrs( $settings );

// Corner radius is a setting; the default is the pill the design calls for.
$radius = isset( $settings['list2_radius'] ) && '' !== $settings['list2_radius']
	? absint( $settings['list2_radius'] )
	: 50;

// One style attribute for the radius plus any custom image size.
$wrap_vars   = array_merge( [ '--rtcl-loc-radius:' . $radius . 'px' ], AllLocation::image_box_vars( $settings ) );
$wrap_style  = ' style="' . esc_attr( implode( ';', $wrap_vars ) ) . '"';

// Same list column settings as style 1, so switching style keeps the layout.
$classes  = 'rtcl-col-xl-' . ( ! empty( $settings['list_col_xl'] ) ? $settings['list_col_xl'] : '12' );
$classes .= ' rtcl-col-lg-' . ( ! empty( $settings['list_col_lg'] ) ? $settings['list_col_lg'] : '12' );
$classes .= ' rtcl-col-md-' . ( ! empty( $settings['list_col_md'] ) ? $settings['list_col_md'] : '12' );
$classes .= ' rtcl-col-sm-' . ( ! empty( $settings['list_col_sm'] ) ? $settings['list_col_sm'] : '12' );
$classes .= ' rtcl-col-' . ( ! empty( $settings['list_col_mobile'] ) ? $settings['list_col_mobile'] : '12' );
?>
<div class="<?php echo esc_attr( $wrap_class ); ?>">
	<div class="rtcl gb-all-locations list-style-2<?php echo esc_attr( $image_box_class . AllLocation::hover_lift_class( $settings ) ); ?>"<?php
	echo $wrap_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
	?>>
		<div class="rtcl-row">
			<?php
			if ( ! empty( $terms ) ) {
				foreach ( $terms as $trm ) {
					$has_image = $settings['show_image'] && ! empty( $trm['image_url'] );
					?>
					<div class="location-boxes-wrapper <?php echo esc_attr( $classes ); ?>">
						<?php
						// The whole card is the link when linking is on, so the
						// hit area is the pill rather than just the words.
						$tag        = $settings['enable_link'] ? 'a' : 'div';
						$href       = $settings['enable_link'] ? ' href="' . esc_url( $trm['permalink'] ) . '"' : '';
						$nofollow   = ! empty( $settings['enable_nofollow'] ) ? ' rel="nofollow"' : '';
						$card_style = $has_image
							? ' style="background-image:url(' . esc_url( $trm['image_url'] ) . ')"'
							: '';
						?>
						<<?php echo esc_attr( $tag ); ?> class="location-boxes<?php echo $has_image ? '' : ' has-no-image'; ?>"<?php
						echo $href . $nofollow . $card_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- each part escaped above.
						?>>
							<span class="rtcl-location-overlay" aria-hidden="true"></span>
							<span class="rtcl-location-label">
								<span class="rtcl-title"><?php echo esc_html( $trm['name'] ); ?></span>
								<?php if ( $settings['show_count'] ) : ?>
									<span class="rtcl-counter">(<?php echo esc_html( $trm['count'] ); ?>)</span>
								<?php endif; ?>
							</span>
						</<?php echo esc_attr( $tag ); ?>>
					</div>
					<?php
				}
			}
			?>
		</div>
	</div>
</div>
