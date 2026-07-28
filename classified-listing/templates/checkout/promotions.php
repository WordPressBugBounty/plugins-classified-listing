<?php
/**
 * @author        RadiusTheme
 * @package       classified-listing/templates
 * @version       1.0.0
 *
 * @var array $pricing_options
 */


use Rtcl\Helpers\Functions;
use Rtcl\Resources\Options;

$currency        = Functions::get_order_currency();
$currency_symbol = Functions::get_currency_symbol( $currency );
?>
<div id="rtcl-checkout-form-data">
	<div class="rtcl-checkout-pricing-wrapper rtcl-row rtcl-form-group">
		<?php
		if ( ! empty( $pricing_options ) ):
			foreach ( $pricing_options as $pricing ) :
				$price = get_post_meta( $pricing->ID, 'price', true );
				$visible = get_post_meta( $pricing->ID, 'visible', true );
				$featured = get_post_meta( $pricing->ID, 'featured', true );
				$top = get_post_meta( $pricing->ID, '_top', true );
				$bump_up = get_post_meta( $pricing->ID, '_bump_up', true );
				$description = get_post_meta( $pricing->ID, 'description', true );

					// Icon + featured highlight (separate pricing → own icon / featured badge).
					$pricing_icon   = get_post_meta( $pricing->ID, '_rtcl_pricing_icon', true );
					$icon_class     = $pricing_icon ? ( false !== strpos( $pricing_icon, 'fa-' ) ? $pricing_icon : 'rtcl-icon rtcl-icon-' . $pricing_icon ) : '';
					$is_featured    = get_post_meta( $pricing->ID, '_rtcl_pricing_featured', true );
					$featured_label = get_post_meta( $pricing->ID, '_rtcl_pricing_featured_label', true );
					$featured_label = $featured_label ? $featured_label : __( 'Featured', 'classified-listing' );
				?>
				<div class="rtcl-col-md-4 rtcl-col-12">
					<div class="rtcl-checkout-pricing<?php echo $is_featured ? ' is-featured' : ''; ?>">
						<div class="rtcl-checkout-pricing-inner">
							<?php if ( $is_featured ) : ?>
								<span class="rtcl-featured-badge"><?php echo esc_html( $featured_label ); ?></span>
							<?php endif; ?>
							<?php if ( ! empty( $pricing->post_title ) ) : ?>
                                <div class="rtcl-promo-head">
									<?php if ( $icon_class ) : ?>
                                        <span class="rtcl-promo-icon"><i class="<?php echo esc_attr( $icon_class ); ?>"></i></span>
									<?php endif; ?>
                                    <span class="rtcl-promo-heading">
										<span class="rtcl-pricing-title"><?php echo esc_html( $pricing->post_title ); ?></span>
									</span>
                                </div>
							<?php endif; ?>
							<span class="rtcl-pricing-price"><?php echo Functions::get_payment_formatted_price_html( $price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  ?></span>
							<?php if ( $description ): ?>
								<div class="rtcl-pricing-description"><?php echo wp_kses_post( $description ); ?></div>
							<?php endif; ?>
							<?php
							$promotions = Options::get_listing_promotions();
							$promo_rows = [];
							if ( ! empty( $promotions ) ) {
								foreach ( $promotions as $promo_id => $promotion ) {
									if ( get_post_meta( $pricing->ID, $promo_id, true ) ) {
										$promo_rows[] = $promotion;
									}
								}
							}
							if ( ! empty( $promo_rows ) ) :
								$days_label = sprintf(
								/* translators: %s: number of days */
									esc_html( _n( '%s Day', '%s Days', absint( $visible ), 'classified-listing' ) ),
									esc_html( number_format_i18n( absint( $visible ) ) )
								);
								?>
								<div class="rtcl-promo-meta">
									<?php foreach ( $promo_rows as $promotion ) : ?>
										<div class="rtcl-promo-row">
											<span class="rtcl-promo-label"><?php echo esc_html( $promotion ); ?></span>
											<span class="rtcl-promo-value"><?php echo esc_html( $days_label ); ?></span>
										</div>
									<?php endforeach; ?>
								</div>
							<?php endif; ?>
							<div class="rtcl-pricing-btn">
								<?php
								printf( '<input type="radio" name="%s" id="pricing_id_%s" value="%s" class="rtcl-checkout-pricing" required data-price="%s"/><label for="pricing_id_%s">%s</label>',
									'pricing_id', esc_attr( $pricing->ID ), esc_attr( $pricing->ID ), esc_attr( $price ), esc_attr( $pricing->ID ),
									esc_html__( 'Select This Package', 'classified-listing' ) );
								?>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach;
		else: ?>
			<div>
				<span><?php esc_html_e( "No promotion plan found.", "classified-listing" ); ?></span>
			</div>
		<?php endif; ?>
	</div>
</div>