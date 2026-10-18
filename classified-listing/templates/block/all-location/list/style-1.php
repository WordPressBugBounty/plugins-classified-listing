<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Main Gutenberg locationbox.
 *
 * Locationbox style.
 *
 * @package  Classifid-listing
 * @since 1.0.0
 */
$wrap_class = '';
if (isset($settings['blockId'])) {
	$wrap_class .= 'rtcl-block-' . $settings['blockId'];
}
$wrap_class .= ' rtcl-block-frontend ';
if (isset($settings['className'])) {
	$wrap_class .= $settings['className'];
}

use Rtcl\Controllers\Blocks\AllLocation;

list( $image_box_class, $image_box_style ) = AllLocation::image_box_attrs( $settings );
?>
<div class="<?php echo esc_attr($wrap_class); ?>">
	<div class="rtcl gb-all-locations list-style-1<?php echo esc_attr( $image_box_class . AllLocation::hover_lift_class( $settings ) ); ?>"<?php
	echo $image_box_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in the helper.
	?>>
		<?php
		// List view has its own column settings, defaulting to a single
		// full-width column so existing layouts are unchanged. The grid's
		// `col_*` values are deliberately NOT reused — they default to a 3-4
		// column grid, which would have reflowed every list already out there.
		$classes  = 'rtcl-col-xl-' . ( ! empty( $settings['list_col_xl'] ) ? $settings['list_col_xl'] : '12' );
		$classes .= ' rtcl-col-lg-' . ( ! empty( $settings['list_col_lg'] ) ? $settings['list_col_lg'] : '12' );
		$classes .= ' rtcl-col-md-' . ( ! empty( $settings['list_col_md'] ) ? $settings['list_col_md'] : '12' );
		$classes .= ' rtcl-col-sm-' . ( ! empty( $settings['list_col_sm'] ) ? $settings['list_col_sm'] : '12' );
		$classes .= ' rtcl-col-' . ( ! empty( $settings['list_col_mobile'] ) ? $settings['list_col_mobile'] : '12' );
		?>
		<div class="rtcl-row">
		<?php
		if (!empty($terms)) {
			foreach ($terms as $trm) {
				$count_html = null;
				if ($settings['show_count'] && !empty($trm['count'])) {
					ob_start();
					$count_data = sprintf( /* translators: ads count */_n('(%s Ad)', '(%s Ads)', $trm['count'], 'classified-listing'), $trm['count']); ?>
					<span class="rtcl-counter">
						<?php if (!empty($settings['count_after_text'])) { ?>
							<span><?php echo esc_html($trm['count']); ?></span>
							<span><?php echo esc_html($settings['count_after_text']); ?></span>
						<?php } else { ?>
							<?php echo esc_html($count_data); ?>
						<?php } ?>
					</span>
					<?php
					$count_html = ob_get_clean();
				}
				?>
				<div class="location-boxes-wrapper <?php echo esc_attr( $classes ); ?>">
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
						<div class="rtcl-location-content">
							<div class="title-wrap <?php echo esc_attr(($settings['count_position'] == 'inline') ? "count-inline" : "count-newline"); ?>">
								<h3 class="rtcl-title">
									<?php if ($settings['enable_link']) { ?>
										<a <?php echo esc_attr(isset($settings['enable_nofollow']) && $settings['enable_nofollow'] == '1' ? 'rel=nofollow' : ''); ?> href="<?php echo esc_url($trm['permalink']); ?>">
											<?php echo esc_html($trm['name']); ?>
										</a>
										<?php
									} else {
										echo esc_html($trm['name']);
									}
									?>
								</h3>
								<?php
								$arr = array('span' => array('class' => array()));
								echo wp_kses($count_html, $arr);
								?>
							</div>
							<?php if ($settings['show_desc'] && !empty($trm['description'])) { ?>
								<div class="rtcl-description">
									<?php
									if ($settings['desc_limit']) {
										echo esc_html(wp_trim_words($trm['description'], $settings['desc_limit']));
									} else {
										echo wp_kses_post($trm['description']);
									}
									?>
								</div>
							<?php } ?>
						</div>
						<?php
						// Sibling of `.rtcl-location-content`, not a child — the row
						// is a flex line and the chevron is its last item, pinned to
						// the right regardless of how much text sits beside it.
						?>
						<?php if ( $settings['enable_link'] ) : ?>
							<a class="rtcl-location-arrow" href="<?php echo esc_url( $trm['permalink'] ); ?>"
							   aria-label="<?php echo esc_attr( $trm['name'] ); ?>">
								<i class="rtcl-icon rtcl-icon-angle-right"></i>
							</a>
						<?php endif; ?>
					</div>
				</div>
				<?php
			}
		}
		?>
		</div>
	</div>
</div>