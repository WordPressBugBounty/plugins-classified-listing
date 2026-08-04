<?php
/**
 *
 * @author        RadiusTheme
 * @package       classified-listing/templates
 * @version       1.0.0
 *
 * @var WP_User $user
 * @var string  $phone
 * @var string  $whatsapp_number
 * @var string  $website
 * @var string  $telegram
 * @var string  $description
 * @var string  $geo_address
 * @var string  $state_text
 * @var string  $city_text
 * @var array   $user_locations
 * @var int     $sub_location_id
 * @var int     $location_id
 * @var string  $town_text
 * @var string  $zipcode
 * @var float   $latitude
 * @var float   $longitude
 * @var int     $pp_id
 */

use Rtcl\Helpers\Functions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

do_action( 'rtcl_before_edit_account_form' ); ?>

<form class="rtcl-EditAccountForm rtcl-MyAccount-content-inner" id="rtcl-user-account" method="post">
	
	<div class="rtcl-myaccount-content-title-wrap">
		<h3 class="rtcl-myaccount-content-title"><?php esc_html_e( 'Account Details', 'classified-listing' ); ?></h3>
		<?php
		$rtcl_profile_url = apply_filters( 'rtcl_edit_account_profile_url', get_author_posts_url( $user->ID ), $user );
		if ( $rtcl_profile_url ) : ?>
			<a href="<?php echo esc_url( $rtcl_profile_url ); ?>" class="rtcl-view-profile-link" target="_blank" rel="noopener noreferrer">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
				<span><?php esc_html_e( 'View Public Profile', 'classified-listing' ); ?></span>
			</a>
		<?php endif; ?>
	</div>

	<?php do_action( 'rtcl_edit_account_form_start' ); ?>

	<div class="rtcl-form-group rtcl-profile-picture-row">
		<label for="rtcl-profile-picture" class="rtcl-field-label">
			<?php esc_html_e( 'Profile Picture', 'classified-listing' ); ?>
			<span class="require-star">*</span>
		</label>
		<div class="rtcl-field-col">
			<div class="rtcl-profile-picture-wrap">
				<?php if ( ! $pp_id && Functions::user_has_gravatar( $user ) ): ?>
					<div class="rtcl-gravatar-wrap">
						<div class="rtcl-gravatar-img">
							<?php echo get_avatar( $user->ID ); ?>
						</div>
					</div>
				<?php endif; ?>
				<div class="rtcl-media-upload-wrap">
					<div class="rtcl-media-upload rtcl-media-upload-pp<?php echo( $pp_id ? ' has-media' : ' no-media' ) ?>">
						<div class="rtcl-media-action">
							<span class="rtcl-icon-plus add"><?php esc_html_e( "Add Logo", "classified-listing" ); ?></span>
							<span class="rtcl-icon-trash remove"><?php esc_html_e( "Delete Logo", "classified-listing" ); ?></span>
						</div>
						<div class="rtcl-media-item">
							<?php echo( $pp_id ? wp_get_attachment_image( $pp_id, [ 100, 100 ] ) : '' ) ?>
						</div>
					</div>
				</div>
				
			</div>
			<?php
			echo '<p class="rtcl-gravatar-link-wrap"><a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer" class="rtcl-gravatar-link">'
				 . '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
				 . '<span>' . esc_html__( 'Change on Gravatar.', 'classified-listing' ) . '</span></a></p>';
			?>
		</div>
	</div>

	<div class="rtcl-form-group-wrap">
		<div class="rtcl-form-group rtcl-no-field-group rtcl-username-row">
			<label for="rtcl-username" class="rtcl-field-label">
				<?php esc_html_e( 'Username:', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<p class="rtcl-form-control-static"><strong><?php echo esc_html( $user->user_login ); ?></strong></p>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-first-name" class="rtcl-field-label">
				<?php esc_html_e( 'First Name', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<input type="text" name="first_name" id="rtcl-first-name" value="<?php echo esc_attr( $user->first_name ); ?>" class="rtcl-form-control" maxlength="50"/>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-last-name" class="rtcl-field-label">
				<?php esc_html_e( 'Last Name', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<input type="text" name="last_name" id="rtcl-last-name" value="<?php echo esc_attr( $user->last_name ); ?>"
					   class="rtcl-form-control" maxlength="50"/>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-email" class="rtcl-field-label">
				<?php esc_html_e( 'E-mail', 'classified-listing' ); ?>
				<span class="require-star">*</span>
			</label>
			<div class="rtcl-field-col">
				<input type="email" name="email" id="rtcl-email" class="rtcl-form-control"
					   value="<?php echo esc_attr( $user->user_email ); ?>" required="required"/>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-whatsapp-phone" class="rtcl-field-label">
				<?php esc_html_e( 'Whatsapp number', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<div class="rtcl-intl-phone-field">
					<input type="text" name="whatsapp_number_local" id="rtcl-whatsapp-phone"
						   value="<?php echo esc_attr( $whatsapp_number ); ?>"
						   class="rtcl-form-control rtcl-intl-phone"
						   data-target="whatsapp_number"
						   data-rule-rtclintlphone="true"
						   autocomplete="off"/>
					<input type="hidden" name="whatsapp_number" value="<?php echo esc_attr( $whatsapp_number ); ?>"/>
				</div>
				<p class="description small"><?php esc_html_e( "WhatsApp number with your country code. e.g.+1xxxxxxxxxx", 'classified-listing' ) ?></p>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-phone" class="rtcl-field-label">
				<?php esc_html_e( 'Phone', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<?php
				$phone = esc_attr( $phone );
				$field = '<div class="rtcl-intl-phone-field">'
					. "<input type='text' name='phone_local' id='rtcl-phone' value='{$phone}' class='rtcl-form-control rtcl-intl-phone' data-target='phone' data-rule-rtclintlphone='true' autocomplete='off'/>"
					. "<input type='hidden' name='phone' value='{$phone}'/>"
					. '</div>';
				Functions::print_html( apply_filters( 'rtcl_edit_account_phone_field', $field, $phone ), true );
				?>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-website" class="rtcl-field-label">
				<?php esc_html_e( 'Website', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<input type="url" name="website" id="rtcl-website" value="<?php echo esc_attr( $website ); ?>" class="rtcl-form-control" maxlength="200" data-rule-url="true" data-msg-url="<?php esc_attr_e( 'Please enter a valid website URL.', 'classified-listing' ); ?>"/>
				<p class="description small"><?php esc_html_e('e.g. https://example.com', 'classified-listing'); ?></p>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-telegram" class="rtcl-field-label">
				<?php esc_html_e( 'Telegram ID', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<input type="text" name="telegram" id="rtcl-telegram" value="<?php echo esc_attr( $telegram ); ?>" class="rtcl-form-control" maxlength="33" data-rule-rtcltelegram="true" placeholder="@username"/>
			</div>
		</div>
		<?php
		// Build the "Display name publicly as" options, mirroring WP's default profile dropdown.
		$public_display                     = [];
		$public_display['display_nickname'] = $user->nickname;
		$public_display['display_username'] = $user->user_login;

		if ( ! empty( $user->first_name ) ) {
			$public_display['display_firstname'] = $user->first_name;
		}
		if ( ! empty( $user->last_name ) ) {
			$public_display['display_lastname'] = $user->last_name;
		}
		if ( ! empty( $user->first_name ) && ! empty( $user->last_name ) ) {
			$public_display['display_firstlast'] = $user->first_name . ' ' . $user->last_name;
			$public_display['display_lastfirst'] = $user->last_name . ' ' . $user->first_name;
		}
		if ( ! in_array( $user->display_name, $public_display, true ) ) {
			$public_display = [ 'display_displayname' => $user->display_name ] + $public_display;
		}
		$public_display = array_map( 'trim', $public_display );
		$public_display = array_unique( $public_display );
		?>
		<div class="rtcl-form-group">
			<label for="rtcl-display-name" class="rtcl-field-label">
				<?php esc_html_e( 'Display name publicly as', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<select name="display_name" id="rtcl-display-name" class="rtcl-form-control">
					<?php foreach ( $public_display as $item ) : ?>
						<option <?php selected( $user->display_name, $item ); ?> value="<?php echo esc_attr( $item ); ?>"><?php echo esc_html( $item ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
		</div>
		<div class="rtcl-form-group">
			<label for="rtcl-description" class="rtcl-field-label">
				<?php esc_html_e( 'Biographical Info', 'classified-listing' ); ?>
			</label>
			<div class="rtcl-field-col">
				<textarea name="description" id="rtcl-description" rows="5" class="rtcl-form-control" maxlength="500"><?php echo esc_textarea( $description ); ?></textarea>
				<p class="description small"><?php esc_html_e( 'Share a little biographical information to fill out your profile. This may be shown publicly.', 'classified-listing' ); ?></p>
			</div>
		</div>
		<div class="rtcl-form-group rtcl-no-field-group">
			<div class="form-check">
				<input type="hidden" name="change_password" value="0">
				<input type="checkbox" name="change_password" class="form-check-input" id="rtcl-change-password" value="1">
				<label class="rtcl-form-check-label" for="rtcl-change-password">
					<?php esc_html_e( 'Change Password', 'classified-listing' ); ?>
				</label>
			</div>
		</div>
		<div class="rtcl-form-group rtcl-password-fields" style="display: none;">
			<label for="password" class="rtcl-field-label">
				<?php esc_html_e( 'New Password', 'classified-listing' ); ?>
				<span class="require-star">*</span>
			</label>
			<div class="rtcl-field-col">
				<input type="password" name="pass1" id="password" class="rtcl-form-control rtcl-password" autocomplete="off"
					   required="required"/>
			</div>
		</div>
		<div class="rtcl-form-group rtcl-password-fields" style="display: none">
			<label for="password_confirm" class="rtcl-field-label">
				<?php esc_html_e( 'Confirm Password', 'classified-listing' ); ?>
				<span class="require-star">*</span>
			</label>
			<div class="rtcl-field-col">
				<input type="password" name="pass2" id="password_confirm" class="rtcl-form-control" autocomplete="off"
					   data-rule-equalTo="#password" data-msg-equalTo="<?php esc_attr_e( 'Password does not match.', 'classified-listing' ); ?>"
					   required/>
			</div>
		</div>
	</div>

	<?php do_action( 'rtcl_edit_account_form' ); ?>
	
	
	<?php do_action( 'rtcl_edit_account_form_end' ); ?>

</form>

<?php do_action( 'rtcl_after_edit_account_form' ); ?>
