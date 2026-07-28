<?php
/**
 * Password Reset email
 * This template can be overridden by copying it to yourtheme/classified-listing/emails/user-reset-password-email-to-user.php
 *
 * @author        RadiusTheme
 * @package       ClassifiedListing/Templates/Emails
 * @version       2.3.0
 *
 * @var RtclEmail $email
 * @var WP_User   $user
 * @var string    $reset_key
 */


use Rtcl\Helpers\Functions;
use Rtcl\Helpers\Link;
use Rtcl\Models\RtclEmail;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @hooked RtclEmails::email_header() Output the email header
 */
do_action( 'rtcl_email_header', $email );
$_display_name = trim( $user->first_name . ' ' . $user->last_name ) ?: $user->user_login;
?>
	<p style="margin: 0 0 16px;"><?php /* translators: %s: user display name or login */
		printf( esc_html__( 'Hi %s,', 'classified-listing' ), esc_html( $_display_name ) ); ?></p>
	<p style="margin: 0 0 16px;"><?php esc_html_e( 'We received a request to reset your password. To set a new password, please visit the link below.', 'classified-listing' ); ?></p>
	<p style="margin: 0 0 16px;">
		<a style="<?php echo esc_attr( Functions::email_class_link_style( $email ) ); ?>" href="<?php echo esc_url( add_query_arg( array(
			'key'   => $reset_key,
			'login' => $user->user_login
		), Link::get_my_account_page_link( 'lost-password' ) ) ); ?>"><?php // phpcs:ignore ?>
			<?php esc_html_e( 'Click here to reset your password', 'classified-listing' ); ?>
		</a>
	</p>
	<p style="margin: 0 0 16px;"><?php esc_html_e( 'If you did not request a password reset, you can safely ignore this email.', 'classified-listing' ); ?></p>
	<p style="margin: 0 0 16px;"><?php esc_html_e( 'Thank you.', 'classified-listing' ); ?></p>

<?php
/**
 * @hooked RtclEmails::email_footer() Output the email footer
 */
do_action( 'rtcl_email_footer', $email );
