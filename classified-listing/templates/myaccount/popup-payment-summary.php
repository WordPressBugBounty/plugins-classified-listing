<?php
/**
 * Payment details popup: order number, status, date and payment method.
 *
 * @author        RadiusTheme
 * @package       classified-listing/templates
 * @version       6.2.1
 *
 * @var Payment $payment
 */

use Rtcl\Helpers\Functions;
use Rtcl\Models\Payment;

$status       = $payment->get_status();
$status_label = Functions::get_status_i18n( $status );
$method       = $payment->get_payment_method_title();
?>
<div class="rtcl-payment-popup-summary">
	<div class="rtcl-payment-popup-summary__top">
		<span class="rtcl-payment-popup-summary__id">
			<?php
			/* translators: %s: Payment / order number */
			printf( esc_html__( 'Order #%s', 'classified-listing' ), esc_html( $payment->get_maybe_id() ) );
			?>
		</span>
		<?php if ( $status_label ) : ?>
			<span class="rtcl-payment-status rtcl-payment-status--<?php echo esc_attr( str_replace( 'rtcl-', '', $status ) ); ?>">
				<?php echo esc_html( $status_label ); ?>
			</span>
		<?php endif; ?>
	</div>
	<div class="rtcl-payment-popup-summary__meta">
		<span class="rtcl-payment-popup-summary__date">
			<?php
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo Functions::datetime( 'rtcl', $payment->get_created_date() );
			?>
		</span>
		<?php if ( $method ) : ?>
			<span class="rtcl-payment-popup-summary__method"><?php echo esc_html( $method ); ?></span>
		<?php endif; ?>
	</div>
</div>
