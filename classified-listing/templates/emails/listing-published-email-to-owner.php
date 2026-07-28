<?php
/**
 * new listing email notification to owner
 * This template can be overridden by copying it to yourtheme/classified-listing/emails/new-post-notification-user.php
 *
 * @author        RadiusTheme
 * @package       ClassifiedListing/Templates/Emails
 * @version       1.3.0
 *
 * @var RtclEmail $email
 * @var Listing $listing
 */

use Rtcl\Helpers\Functions;
use Rtcl\Models\Listing;
use Rtcl\Models\RtclEmail;

if ( !defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @hooked RtclEmails::email_header() Output the email header
 */
$_owner        = get_userdata( $listing->get_owner_id() );
$_display_name = $_owner ? ( trim( $_owner->first_name . ' ' . $_owner->last_name ) ?: $_owner->user_login ) : $listing->get_owner_name();

do_action( 'rtcl_email_header', $email ); ?>
	<p style="margin: 0 0 16px;"><?php /* translators: %s: owner display name */
		printf( esc_html__( 'Hi %s,', 'classified-listing' ), esc_html( $_display_name ) ); ?></p>
	<p style="margin: 0 0 16px;"><?php
		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
		printf(
			// translators: %1$s: listing title, %2$s: site name, %3$s: listing link
			__( 'Great news — your listing %1$s has been successfully published and is now live on %2$s. It can be viewed by the public at: %3$s.', 'classified-listing' ),
			sprintf( '<strong>%s</strong>', esc_html( $listing->get_the_title() ) ),
			esc_html( Functions::get_blogname() ),
			sprintf( '<a href="%s">%s</a>', esc_url( $listing->get_the_permalink() ), esc_html( $listing->get_the_permalink() ) )
		) ?></p>
	<p style="margin: 0 0 16px;"><?php esc_html_e( 'Thank you.', 'classified-listing' ); ?></p>
<?php

/**
 * @hooked RtclEmails::email_footer() Output the email footer
 */
do_action( 'rtcl_email_footer', $email );
