<?php
/**
 *
 * @author        RadiusTheme
 * @package       classified-listing/templates
 * @version       6.2.1
 *
 * @var WP_Query $rtcl_query
 */

use Rtcl\Helpers\Functions;
use Rtcl\Helpers\Pagination;

global $post;
?>
<div class="rtcl-payment-history-wrap">
	<?php
	if ( $rtcl_query->have_posts() ) {
		?>
		<div class="rtcl-payment-table-wrap rtcl-MyAccount-content-inner">
			<h3><?php esc_html_e( 'Payment History', 'classified-listing' ); ?></h3>
			<div class="rtcl-table-scroll-x rtcl-table-responsive-list">
				<table class="rtcl-table-striped-border">
					<thead>
					<tr>
						<th><?php esc_html_e( '#', 'classified-listing' ); ?></th>
						<th><?php esc_html_e( 'Total', 'classified-listing' ); ?></th>
						<th><?php esc_html_e( 'Payment Method', 'classified-listing' ); ?></th>
						<th><?php esc_html_e( 'Transaction Key', 'classified-listing' ); ?></th>
						<th><?php esc_html_e( 'Date', 'classified-listing' ); ?></th>
						<th><?php esc_html_e( 'Status', 'classified-listing' ); ?></th>
					</tr>
					</thead>

					<!-- the loop -->
					<?php while ( $rtcl_query->have_posts() ) : $rtcl_query->the_post();
						$order = rtcl()->factory->get_order( get_the_ID() ); ?>
						<tr>
							<td data-heading="<?php esc_attr_e( 'Order ID:', 'classified-listing' ); ?>">
								<?php
								printf( '<a href="#" class="rtcl-payment-popup-link" data-order-id="%s">%s</a>', esc_attr( $order->get_maybe_id() ), esc_html( $order->get_maybe_id() ) );
								?>
							</td>
							<td data-heading="<?php esc_attr_e( 'Total:', 'classified-listing' ); ?>">
								<?php
								$main_amount_html = Functions::get_payment_formatted_price_html( $order->get_total() );
								$main_amount      = apply_filters( 'rtcl_payment_table_total_amount', $main_amount_html, $order );
								Functions::print_html( $main_amount );
								?>
							</td>
							<td data-heading="<?php esc_attr_e( 'Payment Method:', 'classified-listing' ); ?>"><?php echo esc_html( $order->get_payment_method_title() ); ?></td>
							<td data-heading="<?php esc_attr_e( 'Transaction Key:', 'classified-listing' ); ?>">
								<?php
								if ( $transaction_key = $order->get_transaction_id() ) {
									echo esc_html( $transaction_key );
								}
								?>
							</td>
							<td data-heading="<?php esc_attr_e( 'Date:', 'classified-listing' ); ?>"><?php
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
								echo Functions::datetime( 'rtcl', $order->get_created_date() ); ?></td>
							<td data-heading="<?php esc_attr_e( 'Status:', 'classified-listing' ); ?>">
								<?php if ( $status_label = Functions::get_status_i18n( $post->post_status ) ) : ?>
									<span class="rtcl-payment-status rtcl-payment-status--<?php echo esc_attr( str_replace( 'rtcl-', '', $post->post_status ) ); ?>"><?php echo esc_html( $status_label ); ?></span>
								<?php endif; ?>
							</td>
						</tr>
					<?php endwhile;
					wp_reset_postdata();
					?>
				</table>
			</div>
		</div>
		<!-- pagination here -->
		<?php
		Pagination::pagination( $rtcl_query, true );

	} else {
		echo '<p class="rtcl-no-data-found">' . esc_html__( 'No Results Found.', 'classified-listing' ) . '</p>';
	} ?>

	<div class="rtcl-popup-wrapper" id="rtcl-payment-details-popup" role="dialog" aria-modal="true" aria-labelledby="rtcl-payment-details-popup-title">
		<div class="rtcl-popup">
			<div class="rtcl-popup-content">
				<div class="rtcl-popup-header">
					<h5 class="rtcl-popup-title" id="rtcl-payment-details-popup-title"><?php esc_html_e( 'Payment Details', 'classified-listing' ); ?></h5>
					<a href="#" class="rtcl-popup-close" aria-label="<?php esc_attr_e( 'Close', 'classified-listing' ); ?>">×</a>
				</div>
				<div class="rtcl-popup-body"></div>
			</div>
		</div>
	</div>

</div>
