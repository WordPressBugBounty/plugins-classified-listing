<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

/**
 * Main Gutenberg locationbox.
 *
 * Locationbox style.
 *
 * @package  Classifid-listing
 * @since 1.0.0
 */

use Rtcl\Controllers\Blocks\AllLocation;

$wrap_class = '';
if ( isset( $settings['blockId'] ) ) {
	$wrap_class .= 'rtcl-block-' . $settings['blockId'];
}
$wrap_class .= ' rtcl-block-frontend ';
if ( isset( $settings['className'] ) ) {
	$wrap_class .= $settings['className'];
}

list( $image_box_class, $image_box_style ) = AllLocation::image_box_attrs( $settings );
?>

<div class="<?php
echo esc_attr( $wrap_class ); ?>">
	<div class="rtcl gb-all-locations grid-style-1<?php echo esc_attr( $image_box_class . AllLocation::hover_lift_class( $settings ) ); ?>"<?php
	echo $image_box_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- built above from absint() values, escaped there.
	?>>
		<div class="rtcl-row">
			<?php
			// Each breakpoint falls back to its own registered attribute default,
			// so a block saved before these attributes existed still emits a
			// valid class instead of `rtcl-col-xl-`. Matches the list templates.
			$classes = 'rtcl-col-xl-' . ( ! empty( $settings['col_xl'] ) ? $settings['col_xl'] : '3' );
			$classes .= ' rtcl-col-lg-' . ( ! empty( $settings['col_lg'] ) ? $settings['col_lg'] : '3' );
			$classes .= ' rtcl-col-md-' . ( ! empty( $settings['col_md'] ) ? $settings['col_md'] : '4' );
			$classes .= ' rtcl-col-sm-' . ( ! empty( $settings['col_sm'] ) ? $settings['col_sm'] : '6' );
			$classes .= ' rtcl-col-' . ( ! empty( $settings['col_mobile'] ) ? $settings['col_mobile'] : '12' );
			?>
			<?php
			if ( ! empty( $terms ) ) {
				foreach ( $terms as $trm ) {
					$count_html = null;
					if ( $settings['show_count'] && ! empty( $trm['count'] ) ) {
						ob_start();
						$count_data = sprintf( /* translators: Ads count */ _n( '(%s Ad)', '(%s Ads)', $trm["count"], 'classified-listing' ), $trm['count'] ); ?>
						<span class="rtcl-counter">
							<?php
							if ( ! empty( $settings['count_after_text'] ) ) { ?>
								<span><?php
									echo esc_html( $trm['count'] ); ?></span>
								<span><?php
									echo esc_html( $settings['count_after_text'] ); ?></span>
							<?php
							} else { ?>
								<?php
								echo esc_html( $count_data ); ?>
							<?php
							} ?>
						</span>
						<?php
						$count_html = ob_get_clean();
					} ?>

					<div class="location-boxes-wrapper <?php
					echo esc_attr( $classes ); ?>">

						<div class="location-boxes">
							<?php
							if ( $settings['show_image'] && ! empty( $trm['image'] ) ) { ?>
								<div class="rtcl-location-image">
									<a href="<?php
									echo esc_url( $trm['permalink'] ); ?>">
										<?php
										echo wp_kses_post( $trm['image'] ); ?>
									</a>
								</div>
							<?php
							} ?>
							<?php
							// Title and count share `.location-boxes-content`, with the
							// chevron as its sibling inside `.location-boxes-footer` —
							// the two sit as a row with the arrow pushed to the end.
							// Mirrors the Elementor widget's grid style 1 markup so the
							// block can carry the same card design.
							?>
							<div class="location-boxes-footer">
								<div class="location-boxes-content">
									<div class="title-wrap">
										<h3 class="rtcl-title">
											<?php
											if ( $settings['enable_link'] ) { ?>
												<a <?php
												echo esc_attr( isset( $settings['enable_nofollow'] ) && $settings['enable_nofollow'] == '1' ? 'rel=nofollow' : '' ); ?>
													href="<?php
													echo esc_url( $trm['permalink'] ); ?>">
													<?php
													echo esc_html( $trm['name'] ); ?>
												</a>
												<?php
											} else {
												echo esc_html( $trm['name'] );
											} ?>
										</h3>
									</div>
									<?php
									$arr = [
										'span' => [
											'class' => [],
										],
									];
									echo wp_kses( $count_html, $arr ); ?>
								</div>
								<?php if ( $settings['enable_link'] ) : ?>
									<a class="rtcl-location-arrow" href="<?php echo esc_url( $trm['permalink'] ); ?>"
									   aria-label="<?php echo esc_attr( $trm['name'] ); ?>">
										<i class="rtcl-icon rtcl-icon-angle-right"></i>
									</a>
								<?php endif; ?>
							</div>
							<?php
							if ( $settings['show_desc'] && ! empty( $trm['description'] ) ) { ?>
								<div class="rtcl-description">
									<?php
									if ( $settings['desc_limit'] ) {
										echo esc_html( wp_trim_words( $trm['description'], $settings['desc_limit'] ) );
									} else {
										echo wp_kses_post( $trm['description'] );
									}
									?>
								</div>
							<?php
							} ?>
						</div>
					</div>
					<?php
				}
			}
			?>
		</div>
	</div>
</div>