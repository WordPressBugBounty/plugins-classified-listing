<?php
/**
 * Dashboard
 *
 * @author     RadiusTheme
 * @package    classified-listing/templates
 * @version    1.0.0
 *
 * @var String $note
 * @var WP_User $current_user
 */


use Rtcl\Helpers\Functions;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
} ?>
	<div class="rtcl-user-info">
		<div class="rtcl-user-content">
			<div class="rtcl-user-content-inner">
				<div class="rtcl-user-avatar">
					<?php
					$pp_id = absint( get_user_meta( $current_user->ID, '_rtcl_pp_id', true ) );
					echo( $pp_id ? wp_get_attachment_image( $pp_id, [ 100, 100 ] ) : get_avatar( $current_user->ID ) ); ?>
				</div>
				<div class="rtcl-user-details">
					<h5><?php
						echo esc_html( Functions::get_author_name( $current_user ) ); ?></h5>
					<p class="rtcl-media-heading"><?php
						printf( "<strong>%s</strong> : %s",
							esc_html__( "Email", "classified-listing" ),
							esc_html( $current_user->user_email ) ); ?></p>
					<?php
					$current_user->description ? printf( "<p>%s</p>", wp_kses_post( $current_user->description ) ) : '' ?>
				</div>
			</div>
		</div>
		<?php
		if ( ! empty( $note ) ): ?>
			<div class="rtcl-user-note">
				<div class="rtcl-user-note-inner">
					<h4><?php
						echo esc_html__( "Note from Admin", "classified-listing" ) ?></h4>
					<p><?php
						echo wp_kses_post( $note ); ?></p>
				</div>
			</div>
		<?php
		endif; ?>
	</div>
<?php
if ( ! Functions::is_user_type_buyer() ): ?>
	<div class="rtcl-listing-statistics">
		<?php
		$count_listings = Functions::my_listings_count_as_status(); ?>
		<div class="rtcl-listing-count">
			<div class="rtcl-listing-count-inner">
				<div class="rtcl-listing-icon total-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
						<path d="M12 2 2 7l10 5 10-5-10-5Z"/>
						<path d="m2 17 10 5 10-5"/>
						<path d="m2 12 10 5 10-5"/>
					</svg>
				</div>
				<div class="rtcl-listing-number">
					<h5><?php
						esc_html_e( 'Total Listings', 'classified-listing' ); ?></h5>
					<span><?php
						echo esc_html( $count_listings->total ); ?></span>
				</div>
			</div>
		</div>
		<div class="rtcl-listing-count">
			<div class="rtcl-listing-count-inner">
				<div class="rtcl-listing-icon published-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
						<path d="m22 4-10 10.01-3-3"/>
					</svg>
				</div>
				<div class="rtcl-listing-number">
					<h5><?php
						esc_html_e( 'Published Listings', 'classified-listing' ); ?></h5>
					<span><?php
						echo esc_html( $count_listings->publish ); ?></span>
				</div>
			</div>
		</div>
		<div class="rtcl-listing-count">
			<div class="rtcl-listing-count-inner">
				<div class="rtcl-listing-icon pending-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
						<circle cx="12" cy="12" r="9"/>
						<path d="M12 7v5l3 2"/>
					</svg>
				</div>
				<div class="rtcl-listing-number">
					<h5><?php
						esc_html_e( 'Pending Listings', 'classified-listing' ); ?></h5>
					<span><?php
						echo esc_html( $count_listings->pending ); ?></span>
				</div>
			</div>
		</div>
		<div class="rtcl-listing-count">
			<div class="rtcl-listing-count-inner">
				<div class="rtcl-listing-icon expired-icon">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
						<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
						<path d="M12 9v4"/>
						<path d="M12 17h.01"/>
					</svg>
				</div>
				<div class="rtcl-listing-number">
					<h5><?php
						esc_html_e( 'Expired Listings', 'classified-listing' ); ?></h5>
					<span><?php
						echo esc_html( $count_listings->expired ); ?></span>
				</div>
			</div>
		</div>
	</div>
<?php
endif; ?>