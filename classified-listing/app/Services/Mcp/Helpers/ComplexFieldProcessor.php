<?php

namespace Rtcl\Services\Mcp\Helpers;

defined( 'ABSPATH' ) || exit;

/**
 * Processes complex data structure fields for import/export.
 *
 * Handles video_urls, business_hours, social_profiles, geo_location,
 * date ranges, and other complex field types.
 */
class ComplexFieldProcessor {

	/**
	 * Process all complex preset fields and add to meta array.
	 *
	 * @param array $data Input data.
	 * @param array $meta Existing meta array.
	 *
	 * @return array Updated meta array.
	 */
	public static function processPresetFields( array $data, array $meta = [] ): array {
		// Contact person
		$contact = $data['contact'] ?? [];
		$contact_person = $contact['contact_person'] ?? $data['contact_person'] ?? null;
		if ( null !== $contact_person && '' !== $contact_person ) {
			$meta['_rtcl_contact_person'] = sanitize_text_field( $contact_person );
		}

		// Video URLs
		if ( ! empty( $data['video_urls'] ) && is_array( $data['video_urls'] ) ) {
			$meta['_rtcl_video_urls'] = self::sanitizeVideoUrls( $data['video_urls'] );
		}

		// Geo location
		if ( ! empty( $data['geo_location'] ) ) {
			$geo = self::sanitizeGeoLocation( $data['geo_location'] );
			if ( ! empty( $geo ) ) {
				$meta['_rtcl_geo_address'] = $geo['address'];
				$meta['_rtcl_latitude'] = $geo['latitude'];
				$meta['_rtcl_longitude'] = $geo['longitude'];
			}
		}

		// Business hours
		if ( ! empty( $data['business_hours'] ) ) {
			$business_hours = self::sanitizeBusinessHours( $data['business_hours'] );
			if ( ! empty( $business_hours ) ) {
				$meta['_rtcl_bhs'] = $business_hours;
				// Enable business hours feature for this listing
				$meta['_rtcl_active_bhs'] = '1';
			}
		}

		// Social profiles
		if ( ! empty( $data['social_profiles'] ) ) {
			$meta['_rtcl_social_profiles'] = self::sanitizeSocialProfiles( $data['social_profiles'] );
		}

		return $meta;
	}

	/**
	 * Whether a caller-supplied custom field key may be written as listing post meta.
	 *
	 * Allows legacy custom fields (`_field_{id}`, plus `_start`/`_end` for date ranges) and
	 * plain field names. Rejects other protected (`_`-prefixed) meta such as `_thumbnail_id`
	 * or `_rtcl_*` internals, and the listing state keys that drive promotions/expiry.
	 *
	 * @param string $key Sanitized meta key.
	 *
	 * @return bool
	 */
	public static function isWritableCustomFieldKey( string $key ): bool {
		if ( '' === $key ) {
			return false;
		}

		if ( preg_match( '/^_field_\d+(_start|_end)?$/', $key ) ) {
			return true;
		}

		if ( is_protected_meta( $key, 'post' ) ) {
			return false;
		}

		/**
		 * Filter listing meta keys MCP custom fields must never write.
		 *
		 * @param string[] $keys Meta keys.
		 */
		$blocked = (array) apply_filters( 'rtcl_mcp_blocked_custom_field_keys', [
			'featured',
			'feature_expiry_date',
			'never_expires',
			'expiry_date',
			'transaction_id',
			'payment_type',
			'rtcl_agree',
			'notification_by_visitor',
			'notification_by_moderation',
		] );

		return ! in_array( $key, $blocked, true );
	}

	/**
	 * Process custom fields with proper type handling.
	 *
	 * @param array $custom_fields Custom fields data.
	 * @param array $field_config  Optional field configuration from form.
	 *
	 * @return array Processed custom fields.
	 */
	public static function processCustomFields( array $custom_fields, array $field_config = [] ): array {
		$processed = [];

		foreach ( $custom_fields as $key => $value ) {
			$safe_key = sanitize_key( $key );
			if ( ! self::isWritableCustomFieldKey( $safe_key ) ) {
				continue;
			}

			// Get field type from config if available
			$field_type = $field_config[ $key ]['element'] ?? $field_config[ $key ]['type'] ?? null;

			$processed[ $safe_key ] = self::sanitizeFieldValue( $value, $field_type );
		}

		return $processed;
	}

	/**
	 * Sanitize field value based on detected or specified type.
	 *
	 * @param mixed       $value Field value.
	 * @param string|null $type  Field type hint.
	 *
	 * @return mixed Sanitized value.
	 */
	public static function sanitizeFieldValue( $value, ?string $type = null ) {
		// Auto-detect type if not specified
		if ( null === $type ) {
			$type = self::detectFieldType( $value );
		}

		switch ( $type ) {
			case 'number':
			case 'range':
				return is_numeric( $value ) ? floatval( $value ) : '';

			case 'url':
				return esc_url_raw( $value );

			case 'email':
				return sanitize_email( $value );

			case 'textarea':
				return sanitize_textarea_field( $value );

			case 'checkbox':
				if ( is_bool( $value ) ) {
					return $value ? '1' : '0';
				}
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );

			case 'date':
				return self::sanitizeDate( $value );

			case 'date_time':
			case 'datetime':
				return self::sanitizeDateTime( $value );

			case 'date_range':
				return self::sanitizeDateRange( $value, 'Y-m-d' );

			case 'date_time_range':
			case 'datetime_range':
				return self::sanitizeDateRange( $value, 'Y-m-d H:i:s' );

			case 'file':
				return self::sanitizeFileValue( $value );

			case 'color':
			case 'color_picker':
				$color = sanitize_text_field( $value );
				return preg_match( '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/', $color ) ? $color : '';

			case 'select':
			case 'radio':
				return sanitize_text_field( $value );

			case 'array':
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );

			case 'json':
			case 'object':
				// For complex objects, ensure they're arrays and sanitize recursively
				if ( is_array( $value ) ) {
					return self::sanitizeArrayRecursive( $value );
				}
				return $value;

			case 'text':
			default:
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );
		}
	}

	/**
	 * Detect field type from value structure.
	 *
	 * @param mixed $value Value to analyze.
	 *
	 * @return string Detected type.
	 */
	private static function detectFieldType( $value ): string {
		if ( is_bool( $value ) ) {
			return 'checkbox';
		}

		if ( is_numeric( $value ) ) {
			return 'number';
		}

		if ( is_array( $value ) ) {
			// Check for date range pattern
			if ( isset( $value['start'] ) || isset( $value['end'] ) ) {
				$start = $value['start'] ?? '';
				if ( preg_match( '/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/', $start ) ) {
					return 'date_time_range';
				}
				return 'date_range';
			}

			// Check for geo location pattern
			if ( isset( $value['latitude'] ) || isset( $value['longitude'] ) ) {
				return 'geo_location';
			}

			// Generic array
			return 'array';
		}

		if ( is_string( $value ) ) {
			// Check for URL
			if ( filter_var( $value, FILTER_VALIDATE_URL ) ) {
				return 'url';
			}

			// Check for email
			if ( filter_var( $value, FILTER_VALIDATE_EMAIL ) ) {
				return 'email';
			}

			// Check for date pattern
			if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value ) ) {
				return 'date';
			}

			// Check for datetime pattern
			if ( preg_match( '/^\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}/', $value ) ) {
				return 'date_time';
			}

			// Check for color
			if ( preg_match( '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/', $value ) ) {
				return 'color';
			}
		}

		return 'text';
	}

	/**
	 * Sanitize video URLs.
	 *
	 * @param array $urls Video URLs.
	 *
	 * @return array Sanitized URLs.
	 */
	public static function sanitizeVideoUrls( array $urls ): array {
		$sanitized = [];
		$allowed_hosts = [ 'youtube.com', 'youtu.be', 'vimeo.com', 'www.youtube.com', 'www.vimeo.com' ];

		foreach ( $urls as $url ) {
			$url = esc_url_raw( trim( $url ) );
			if ( empty( $url ) ) {
				continue;
			}

			// Validate it's a video URL from allowed hosts
			$host = parse_url( $url, PHP_URL_HOST );
			if ( $host && in_array( $host, $allowed_hosts, true ) ) {
				$sanitized[] = $url;
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize geo location data.
	 *
	 * @param mixed $geo Geo location data.
	 *
	 * @return array|null Sanitized geo data or null.
	 */
	public static function sanitizeGeoLocation( $geo ): ?array {
		if ( ! is_array( $geo ) ) {
			return null;
		}

		$latitude = isset( $geo['latitude'] ) ? floatval( $geo['latitude'] ) : null;
		$longitude = isset( $geo['longitude'] ) ? floatval( $geo['longitude'] ) : null;

		// Validate latitude/longitude ranges
		if ( null === $latitude || null === $longitude ) {
			return null;
		}

		if ( $latitude < -90 || $latitude > 90 ) {
			return null;
		}

		if ( $longitude < -180 || $longitude > 180 ) {
			return null;
		}

		return [
			'latitude'  => $latitude,
			'longitude' => $longitude,
			'address'   => sanitize_text_field( $geo['address'] ?? '' ),
		];
	}

	/**
	 * Sanitize business hours data.
	 *
	 * RTCL Form Builder expects this structure:
	 *
	 * For 24/7 (open all day, every day):
	 * [
	 *     'active' => 1,
	 *     'type'   => '247',
	 * ]
	 *
	 * For selective hours:
	 * [
	 *     'active' => 1,
	 *     'type'   => 'selective',
	 *     'days'   => [
	 *         1 => [ 'open' => 1, 'times' => [[ 'start' => 'HH:MM', 'end' => 'HH:MM' ]] ],
	 *         2 => [ 'open' => 1, 'times' => [...] ],
	 *         // Days use numeric indices: 0=Sunday, 1=Monday, ..., 6=Saturday
	 *     ],
	 * ]
	 *
	 * This method accepts multiple input formats and normalizes to RTCL format.
	 *
	 * @param mixed $hours Business hours data.
	 *
	 * @return array Sanitized business hours in RTCL format.
	 */
	public static function sanitizeBusinessHours( $hours ): array {
		if ( ! is_array( $hours ) ) {
			return [];
		}

		// Check for 24/7 mode
		$is_247 = false;
		if ( isset( $hours['type'] ) ) {
			$type = strtolower( trim( (string) $hours['type'] ) );
			if ( in_array( $type, [ '247', '24/7', '24-7', 'always', 'all_day', 'allday' ], true ) ) {
				$is_247 = true;
			}
		}
		// Also check for explicit 24/7 flags
		if ( ! empty( $hours['24_7'] ) || ! empty( $hours['247'] ) || ! empty( $hours['always_open'] ) || ! empty( $hours['all_day'] ) ) {
			$is_247 = true;
		}

		// Return 24/7 format
		if ( $is_247 ) {
			return [
				'active' => 1,
				'type'   => '247',
			];
		}

		// Map day names to numeric indices (0=Sunday, 1=Monday, ..., 6=Saturday)
		$day_name_to_index = [
			'sunday'    => 0,
			'monday'    => 1,
			'tuesday'   => 2,
			'wednesday' => 3,
			'thursday'  => 4,
			'friday'    => 5,
			'saturday'  => 6,
			// Short forms
			'sun'       => 0,
			'mon'       => 1,
			'tue'       => 2,
			'wed'       => 3,
			'thu'       => 4,
			'fri'       => 5,
			'sat'       => 6,
			// String numeric keys (from JSON)
			'0'         => 0,
			'1'         => 1,
			'2'         => 2,
			'3'         => 3,
			'4'         => 4,
			'5'         => 5,
			'6'         => 6,
		];

		$days = [];
		$has_open_day = false;

		foreach ( $hours as $day_key => $day_data ) {
			// Skip non-day keys
			if ( in_array( $day_key, [ 'type', 'active', '24_7', '247', 'always_open', 'all_day' ], true ) ) {
				continue;
			}

			// Convert day key to numeric index
			$day_index = null;
			if ( is_string( $day_key ) ) {
				$day_key_lower = strtolower( trim( $day_key ) );
				if ( isset( $day_name_to_index[ $day_key_lower ] ) ) {
					$day_index = $day_name_to_index[ $day_key_lower ];
				}
			} elseif ( is_int( $day_key ) && $day_key >= 0 && $day_key <= 6 ) {
				$day_index = $day_key;
			}

			if ( null === $day_index ) {
				continue; // Unknown day
			}

			// Handle non-array values (false, 'off', 'closed')
			if ( ! is_array( $day_data ) ) {
				if ( false === $day_data || 'off' === strtolower( (string) $day_data ) || 'closed' === strtolower( (string) $day_data ) ) {
					$days[ $day_index ] = [ 'open' => false ];
				}
				continue;
			}

			// Determine if day is open
			$is_open = true;
			if ( isset( $day_data['open'] ) ) {
				$is_open = ! empty( $day_data['open'] );
			} elseif ( isset( $day_data['active'] ) ) {
				$is_open = ! empty( $day_data['active'] );
			} elseif ( isset( $day_data['closed'] ) && $day_data['closed'] ) {
				$is_open = false;
			} elseif ( isset( $day_data['off'] ) && $day_data['off'] ) {
				$is_open = false;
			}

			if ( ! $is_open ) {
				$days[ $day_index ] = [ 'open' => false ];
				continue;
			}

			// Collect time slots
			$times = [];

			// Check for 'times' array (RTCL native format)
			if ( isset( $day_data['times'] ) && is_array( $day_data['times'] ) ) {
				foreach ( $day_data['times'] as $slot ) {
					if ( is_array( $slot ) ) {
						$start = self::sanitizeTime( $slot['start'] ?? $slot['open'] ?? '' );
						$end   = self::sanitizeTime( $slot['end'] ?? $slot['close'] ?? '' );
						if ( $start && $end ) {
							$times[] = [ 'start' => $start, 'end' => $end ];
						}
					}
				}
			}

			// Check for 'slots' array (alternative format with open/close)
			if ( empty( $times ) && isset( $day_data['slots'] ) && is_array( $day_data['slots'] ) ) {
				foreach ( $day_data['slots'] as $slot ) {
					if ( is_array( $slot ) ) {
						$start = self::sanitizeTime( $slot['open'] ?? $slot['start'] ?? '' );
						$end   = self::sanitizeTime( $slot['close'] ?? $slot['end'] ?? '' );
						if ( $start && $end ) {
							$times[] = [ 'start' => $start, 'end' => $end ];
						}
					}
				}
			}

			// Check for direct open/close or start/end (single time slot)
			if ( empty( $times ) ) {
				$start = self::sanitizeTime( $day_data['start'] ?? '' );
				$end   = self::sanitizeTime( $day_data['end'] ?? '' );
				// Also check open/close as time values (not boolean)
				if ( ! $start && isset( $day_data['open'] ) && is_string( $day_data['open'] ) ) {
					$start = self::sanitizeTime( $day_data['open'] );
				}
				if ( ! $end && isset( $day_data['close'] ) ) {
					$end = self::sanitizeTime( $day_data['close'] );
				}
				if ( $start && $end ) {
					$times[] = [ 'start' => $start, 'end' => $end ];
				}
			}

			// Build the day entry
			if ( ! empty( $times ) ) {
				$days[ $day_index ] = [
					'open'  => 1,
					'times' => $times,
				];
				$has_open_day = true;
			} else {
				// Day is marked open but 24 hours (no specific times)
				$days[ $day_index ] = [ 'open' => 1 ];
				$has_open_day = true;
			}
		}

		// If no days have data, return empty
		if ( empty( $days ) || ! $has_open_day ) {
			return [];
		}

		// Build the final structure
		return [
			'active' => 1,
			'type'   => 'selective',
			'days'   => $days,
		];
	}

	/**
	 * Sanitize social profiles data.
	 *
	 * @param mixed $profiles Social profiles data.
	 *
	 * @return array Sanitized social profiles.
	 */
	public static function sanitizeSocialProfiles( $profiles ): array {
		if ( ! is_array( $profiles ) ) {
			return [];
		}

		$allowed_networks = [
			'facebook', 'twitter', 'instagram', 'linkedin', 'youtube',
			'pinterest', 'tiktok', 'snapchat', 'telegram', 'whatsapp',
			'github', 'dribbble', 'behance', 'vimeo', 'website',
		];

		$sanitized = [];

		foreach ( $profiles as $network => $url ) {
			$network = sanitize_key( $network );
			if ( ! in_array( $network, $allowed_networks, true ) ) {
				continue;
			}

			$url = esc_url_raw( $url );
			if ( ! empty( $url ) ) {
				$sanitized[ $network ] = $url;
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize time string to HH:MM format.
	 *
	 * @param string $time Time string.
	 *
	 * @return string Sanitized time (HH:MM).
	 */
	public static function sanitizeTime( string $time ): string {
		$time = sanitize_text_field( $time );

		// Already in HH:MM format
		if ( preg_match( '/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/', $time ) ) {
			return $time;
		}

		// Try to parse
		$timestamp = strtotime( $time );
		if ( $timestamp ) {
			return date( 'H:i', $timestamp );
		}

		return '';
	}

	/**
	 * Sanitize date string.
	 *
	 * @param string $date Date string.
	 *
	 * @return string Sanitized date (Y-m-d).
	 */
	public static function sanitizeDate( string $date ): string {
		$date = sanitize_text_field( $date );

		// Already in Y-m-d format
		if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $date ) ) {
			return $date;
		}

		// Try to parse
		$timestamp = strtotime( $date );
		return $timestamp ? date( 'Y-m-d', $timestamp ) : '';
	}

	/**
	 * Sanitize datetime string.
	 *
	 * @param string $datetime DateTime string.
	 *
	 * @return string Sanitized datetime.
	 */
	public static function sanitizeDateTime( string $datetime ): string {
		$datetime = sanitize_text_field( $datetime );

		$timestamp = strtotime( $datetime );
		return $timestamp ? date( 'Y-m-d H:i:s', $timestamp ) : '';
	}

	/**
	 * Sanitize date range value.
	 *
	 * @param mixed  $value  Date range value.
	 * @param string $format Date format.
	 *
	 * @return array Sanitized date range.
	 */
	public static function sanitizeDateRange( $value, string $format = 'Y-m-d' ): array {
		$result = [ 'start' => '', 'end' => '' ];

		if ( is_array( $value ) ) {
			$start = $value['start'] ?? $value[0] ?? '';
			$end   = $value['end'] ?? $value[1] ?? '';
		} elseif ( is_object( $value ) ) {
			$start = $value->start ?? '';
			$end   = $value->end ?? '';
		} else {
			return $result;
		}

		if ( $start ) {
			$timestamp = strtotime( sanitize_text_field( $start ) );
			$result['start'] = $timestamp ? date( $format, $timestamp ) : '';
		}

		if ( $end ) {
			$timestamp = strtotime( sanitize_text_field( $end ) );
			$result['end'] = $timestamp ? date( $format, $timestamp ) : '';
		}

		return $result;
	}

	/**
	 * Sanitize file value (URL or attachment ID).
	 *
	 * @param mixed $value File value.
	 *
	 * @return mixed Sanitized file value.
	 */
	public static function sanitizeFileValue( $value ) {
		if ( is_numeric( $value ) ) {
			return absint( $value );
		}

		if ( is_string( $value ) && filter_var( $value, FILTER_VALIDATE_URL ) ) {
			return esc_url_raw( $value );
		}

		if ( is_array( $value ) ) {
			return array_map( [ self::class, 'sanitizeFileValue' ], $value );
		}

		return '';
	}

	/**
	 * Recursively sanitize an array.
	 *
	 * @param array $data Array to sanitize.
	 *
	 * @return array Sanitized array.
	 */
	private static function sanitizeArrayRecursive( array $data ): array {
		$sanitized = [];

		foreach ( $data as $key => $value ) {
			$safe_key = is_string( $key ) ? sanitize_key( $key ) : $key;

			if ( is_array( $value ) ) {
				$sanitized[ $safe_key ] = self::sanitizeArrayRecursive( $value );
			} elseif ( is_string( $value ) ) {
				$sanitized[ $safe_key ] = sanitize_text_field( $value );
			} elseif ( is_numeric( $value ) ) {
				$sanitized[ $safe_key ] = $value;
			} elseif ( is_bool( $value ) ) {
				$sanitized[ $safe_key ] = $value;
			} else {
				$sanitized[ $safe_key ] = $value;
			}
		}

		return $sanitized;
	}

	/**
	 * Save complex fields to post meta.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $data    Input data.
	 */
	public static function saveToPost( int $post_id, array $data ): void {
		// Contact person
		$contact = $data['contact'] ?? [];
		$contact_person = $contact['contact_person'] ?? $data['contact_person'] ?? null;
		if ( null !== $contact_person && '' !== $contact_person ) {
			update_post_meta( $post_id, '_rtcl_contact_person', sanitize_text_field( $contact_person ) );
		}

		// Video URLs
		if ( ! empty( $data['video_urls'] ) && is_array( $data['video_urls'] ) ) {
			$video_urls = self::sanitizeVideoUrls( $data['video_urls'] );
			update_post_meta( $post_id, '_rtcl_video_urls', $video_urls );
		}

		// Geo location
		if ( ! empty( $data['geo_location'] ) ) {
			$geo = self::sanitizeGeoLocation( $data['geo_location'] );
			if ( ! empty( $geo ) ) {
				update_post_meta( $post_id, '_rtcl_geo_address', $geo['address'] );
				update_post_meta( $post_id, '_rtcl_latitude', $geo['latitude'] );
				update_post_meta( $post_id, '_rtcl_longitude', $geo['longitude'] );
			}
		}

		// Business hours
		if ( ! empty( $data['business_hours'] ) ) {
			$business_hours = self::sanitizeBusinessHours( $data['business_hours'] );
			if ( ! empty( $business_hours ) ) {
				update_post_meta( $post_id, '_rtcl_bhs', $business_hours );
				// Enable business hours feature for this listing
				update_post_meta( $post_id, '_rtcl_active_bhs', '1' );
			}
		}

		// Social profiles
		if ( ! empty( $data['social_profiles'] ) ) {
			$social_profiles = self::sanitizeSocialProfiles( $data['social_profiles'] );
			if ( ! empty( $social_profiles ) ) {
				update_post_meta( $post_id, '_rtcl_social_profiles', $social_profiles );
			}
		}
	}
}
