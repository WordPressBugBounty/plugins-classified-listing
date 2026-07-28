<?php

namespace Rtcl\Traits\Functions;

trait UserTrait {
	/**
	 * @return bool
	 */
	public static function is_user_type_buyer(): bool {
		if ( is_user_logged_in() && self::is_user_type_enabled() ) {
			$user_type = get_user_meta( get_current_user_id(), '_rtcl_user_type', true );

			if ( $user_type === 'buyer' ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Whether the user has a real (custom) Gravatar image set for their email.
	 *
	 * Gravatar always returns a fallback (mystery-person) avatar, so `get_avatar()`
	 * can't tell "has a picture" from "has none". We probe the Gravatar endpoint
	 * with `d=404`: a 200 means a real image exists, 404 means only the default
	 * would show. The boolean result is cached in a transient (keyed by the email
	 * hash) so we never hit the network on every page load.
	 *
	 * @param int|WP_User $user User ID or WP_User object.
	 *
	 * @return bool
	 */
	public static function user_has_gravatar( $user ): bool {
		$user = is_numeric( $user ) ? get_user_by( 'id', absint( $user ) ) : $user;
		if ( ! $user instanceof \WP_User || empty( $user->user_email ) ) {
			return false;
		}

		$hash      = md5( strtolower( trim( $user->user_email ) ) );
		$cache_key = 'rtcl_has_gravatar_' . $hash;
		$cached    = get_transient( $cache_key );
		if ( false !== $cached ) {
			return 'yes' === $cached;
		}

		$response = wp_safe_remote_head(
			"https://www.gravatar.com/avatar/{$hash}?d=404",
			[ 'timeout' => 3 ]
		);
		// On a network error leave the cache empty so we retry later, but treat
		// this render as "no real gravatar" to avoid showing an empty box.
		if ( is_wp_error( $response ) ) {
			return false;
		}

		$has_gravatar = 200 === (int) wp_remote_retrieve_response_code( $response );
		set_transient( $cache_key, $has_gravatar ? 'yes' : 'no', WEEK_IN_SECONDS );

		return $has_gravatar;
	}
}