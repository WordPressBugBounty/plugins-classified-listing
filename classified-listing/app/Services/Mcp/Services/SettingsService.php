<?php
/**
 * Settings Service - CRUD operations for RTCL plugin settings.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Controllers\Ajax\AjaxSettings;
use Rtcl\Helpers\Functions;
use Rtcl\Resources\Options;

defined( 'ABSPATH' ) || exit;

/**
 * Service for managing RTCL plugin settings.
 */
class SettingsService {

	/**
	 * All available settings groups with their metadata.
	 */
	const SETTINGS_GROUPS = [
		'rtcl_general_settings' => [
			'label'       => 'General Settings',
			'description' => 'Listing duration, status, favorites, RSS feed settings.',
			'category'    => 'listings',
		],
		'rtcl_general_listing_label_settings' => [
			'label'       => 'Listing Labels',
			'description' => 'Custom labels for listing elements.',
			'category'    => 'listings',
		],
		'rtcl_general_location_settings' => [
			'label'       => 'Location Settings',
			'description' => 'Location-related configuration.',
			'category'    => 'listings',
		],
		'rtcl_general_currency_settings' => [
			'label'       => 'Currency Settings',
			'description' => 'Currency format, symbol, and position.',
			'category'    => 'listings',
		],
		'rtcl_general_social_share_settings' => [
			'label'       => 'Social Share Settings',
			'description' => 'Social sharing buttons configuration.',
			'category'    => 'listings',
		],
		'rtcl_archive_listing_settings' => [
			'label'       => 'Archive/Listings Page Settings',
			'description' => 'Default view, items per row, ordering.',
			'category'    => 'display',
		],
		'rtcl_single_listing_settings' => [
			'label'       => 'Single Listing Page Settings',
			'description' => 'Gallery, video, and detail page options.',
			'category'    => 'display',
		],
		'rtcl_moderation_settings' => [
			'label'       => 'Moderation Settings',
			'description' => 'Form fields visibility, image requirements, text limits.',
			'category'    => 'moderation',
		],
		'rtcl_payment_settings' => [
			'label'       => 'Payment/Checkout Settings',
			'description' => 'Payment gateway, currency, billing options.',
			'category'    => 'payment',
		],
		'rtcl_tax_settings' => [
			'label'       => 'Tax Settings',
			'description' => 'Tax calculation and display options.',
			'category'    => 'payment',
		],
		'rtcl_email_settings' => [
			'label'       => 'Email Sender Settings',
			'description' => 'From name, from email, email format.',
			'category'    => 'email',
		],
		'rtcl_email_notifications_settings' => [
			'label'       => 'Email Notifications',
			'description' => 'User and admin notification triggers.',
			'category'    => 'email',
		],
		'rtcl_email_templates_settings' => [
			'label'       => 'Email Templates',
			'description' => 'Email template content and formatting.',
			'category'    => 'email',
		],
		'rtcl_account_settings' => [
			'label'       => 'Account & Policy Settings',
			'description' => 'User types, registration, terms & privacy pages.',
			'category'    => 'account',
		],
		'rtcl_advanced_settings' => [
			'label'       => 'Advanced/Permalink Settings',
			'description' => 'Endpoints, URL bases, advanced options.',
			'category'    => 'advanced',
		],
		'rtcl_style_settings' => [
			'label'       => 'Style Settings',
			'description' => 'Colors, fonts, and visual styling.',
			'category'    => 'appearance',
		],
		'rtcl_misc_settings' => [
			'label'       => 'Miscellaneous Settings',
			'description' => 'General misc options.',
			'category'    => 'misc',
		],
		'rtcl_misc_phone_settings' => [
			'label'       => 'Phone Settings',
			'description' => 'Phone number format and display options.',
			'category'    => 'misc',
		],
		'rtcl_misc_media_settings' => [
			'label'       => 'Media Settings',
			'description' => 'Image sizes, gallery settings, upload limits.',
			'category'    => 'misc',
		],
		'rtcl_misc_map_settings' => [
			'label'       => 'Map Settings',
			'description' => 'Map provider, API keys, default location.',
			'category'    => 'misc',
		],
		'rtcl_tools_settings' => [
			'label'       => 'Tools Settings',
			'description' => 'Maintenance and utility tools.',
			'category'    => 'tools',
		],
		'rtcl_ai_settings' => [
			'label'       => 'AI Integration Settings',
			'description' => 'AI tools, semantic search, API keys.',
			'category'    => 'ai',
		],
		'rtcl_import_settings' => [
			'label'       => 'Import Settings',
			'description' => 'Import configuration and defaults.',
			'category'    => 'tools',
		],
	];

	/**
	 * Sensitive settings that should be masked or hidden.
	 */
	const SENSITIVE_FIELDS = [
		'claude_api_key',
		'openai_api_key',
		'google_map_api_key',
		'recaptcha_site_key',
		'recaptcha_secret_key',
		'stripe_secret_key',
		'stripe_publishable_key',
		'paypal_client_id',
		'paypal_client_secret',
	];

	/**
	 * Get list of all settings groups.
	 *
	 * @param array $filters Optional filters (category).
	 *
	 * @return array Settings groups list.
	 */
	public function listSettingsGroups( array $filters = [] ): array {
		$groups = [];

		foreach ( self::SETTINGS_GROUPS as $option_key => $meta ) {
			// Filter by category if specified
			if ( ! empty( $filters['category'] ) && $meta['category'] !== $filters['category'] ) {
				continue;
			}

			$settings = get_option( $option_key, [] );

			$groups[] = [
				'option_key'   => $option_key,
				'label'        => $meta['label'],
				'description'  => $meta['description'],
				'category'     => $meta['category'],
				'fields_count' => is_array( $settings ) ? count( $settings ) : 0,
			];
		}

		return [
			'groups' => $groups,
			'total'  => count( $groups ),
			'categories' => $this->getCategories(),
		];
	}

	/**
	 * Get unique categories from settings groups.
	 *
	 * @return array Categories.
	 */
	private function getCategories(): array {
		$categories = [];
		foreach ( self::SETTINGS_GROUPS as $meta ) {
			if ( ! in_array( $meta['category'], $categories, true ) ) {
				$categories[] = $meta['category'];
			}
		}
		return $categories;
	}

	/**
	 * Get all settings in a group.
	 *
	 * @param string $option_key Settings group option key.
	 * @param bool   $include_sensitive Whether to include sensitive fields (masked).
	 *
	 * @return array|\WP_Error Settings or error.
	 */
	public function getSettings( string $option_key, bool $include_sensitive = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to view settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		$settings = get_option( $option_key, [] );
		$meta = self::SETTINGS_GROUPS[ $option_key ];

		// Mask sensitive fields
		if ( ! $include_sensitive && is_array( $settings ) ) {
			foreach ( $settings as $field => $field_value ) {
				if ( ! empty( $field_value ) && $this->isSensitiveField( $option_key, (string) $field ) ) {
					$settings[ $field ] = $this->maskSensitiveValue( $field_value );
				}
			}
		}

		return [
			'option_key'  => $option_key,
			'label'       => $meta['label'],
			'description' => $meta['description'],
			'category'    => $meta['category'],
			'settings'    => $settings,
		];
	}

	/**
	 * Get a single setting value.
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key within the settings group.
	 * @param mixed  $default    Default value if not found.
	 *
	 * @return array|\WP_Error Setting value or error.
	 */
	public function getSetting( string $option_key, string $field_key, $default = null ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to view settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		$value = Functions::get_option_item( $option_key, $field_key, $default );

		// Mask sensitive fields
		if ( ! empty( $value ) && $this->isSensitiveField( $option_key, $field_key ) ) {
			$value = $this->maskSensitiveValue( $value );
		}

		return [
			'option_key' => $option_key,
			'field_key'  => $field_key,
			'value'      => $value,
			'is_default' => $value === $default,
		];
	}

	/**
	 * Update multiple settings in a group.
	 *
	 * @param string $option_key Settings group option key.
	 * @param array  $values     Key-value pairs to update.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function updateSettings( string $option_key, array $values ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		if ( empty( $values ) || ! is_array( $values ) ) {
			return new \WP_Error(
				'invalid_values',
				__( 'Values must be a non-empty array of key-value pairs.', 'classified-listing' )
			);
		}

		// Get current settings
		$settings = get_option( $option_key, [] );
		if ( ! is_array( $settings ) ) {
			$settings = [];
		}

		$updated_fields = [];
		$skipped_fields = [];
		$old_values = [];

		// Update each field
		foreach ( $values as $field_key => $value ) {
			$field_key = sanitize_key( $field_key );
			if ( empty( $field_key ) ) {
				continue;
			}

			// Same rules as the Settings screen: known fields only, value sanitized against the field definition.
			$sanitized = $this->sanitizeAgainstDefinition( $option_key, $field_key, $value );
			if ( is_wp_error( $sanitized ) ) {
				$skipped_fields[ $field_key ] = $sanitized->get_error_message();
				continue;
			}

			// Store old value
			$old_values[ $field_key ] = $settings[ $field_key ] ?? null;

			$settings[ $field_key ] = $sanitized;
			$updated_fields[] = $field_key;
		}

		if ( empty( $updated_fields ) ) {
			return new \WP_Error(
				'no_valid_fields',
				__( 'None of the given fields can be updated.', 'classified-listing' ),
				[ 'skipped_fields' => $skipped_fields ]
			);
		}

		// Save settings
		$result = update_option( $option_key, $settings );

		// Clear caches
		wp_cache_delete( $option_key, 'options' );

		// Fire action for settings update
		do_action( 'rtcl_mcp_settings_updated', $option_key, $updated_fields, $settings );

		return [
			'success'        => true,
			'option_key'     => $option_key,
			'updated_fields' => $updated_fields,
			'skipped_fields' => $skipped_fields,
			'message'        => sprintf(
				/* translators: %d: field count, %s: group label */
				__( '%d field(s) updated in "%s".', 'classified-listing' ),
				count( $updated_fields ),
				self::SETTINGS_GROUPS[ $option_key ]['label']
			),
		];
	}

	/**
	 * Update a single setting.
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key within the settings group.
	 * @param mixed  $value      New value.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function updateSetting( string $option_key, string $field_key, $value ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		$field_key = sanitize_key( $field_key );
		if ( empty( $field_key ) ) {
			return new \WP_Error( 'invalid_field_key', __( 'Field key is required.', 'classified-listing' ) );
		}

		// Get current settings
		$settings = get_option( $option_key, [] );
		if ( ! is_array( $settings ) ) {
			$settings = [];
		}

		// Same rules as the Settings screen: known fields only, value sanitized against the field definition.
		$sanitized = $this->sanitizeAgainstDefinition( $option_key, $field_key, $value );
		if ( is_wp_error( $sanitized ) ) {
			return $sanitized;
		}

		// Store old value
		$old_value = $settings[ $field_key ] ?? null;

		// Update
		$settings[ $field_key ] = $sanitized;
		update_option( $option_key, $settings );

		// Clear caches
		wp_cache_delete( $option_key, 'options' );

		// Fire action
		do_action( 'rtcl_mcp_setting_updated', $option_key, $field_key, $sanitized, $old_value );

		return [
			'success'    => true,
			'option_key' => $option_key,
			'field_key'  => $field_key,
			'old_value'  => $this->isSensitiveField( $option_key, $field_key ) ? '[hidden]' : $old_value,
			'new_value'  => $this->isSensitiveField( $option_key, $field_key ) ? '[hidden]' : $sanitized,
			'message'    => sprintf(
				/* translators: %s: field key */
				__( 'Setting "%s" updated successfully.', 'classified-listing' ),
				$field_key
			),
		];
	}

	/**
	 * Delete/reset a setting to default.
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key to delete.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function deleteSetting( string $option_key, string $field_key ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		$field_key = sanitize_key( $field_key );
		if ( empty( $field_key ) ) {
			return new \WP_Error( 'invalid_field_key', __( 'Field key is required.', 'classified-listing' ) );
		}

		// Get current settings
		$settings = get_option( $option_key, [] );
		if ( ! is_array( $settings ) ) {
			return new \WP_Error( 'setting_not_found', __( 'Setting not found.', 'classified-listing' ) );
		}

		if ( ! isset( $settings[ $field_key ] ) ) {
			return new \WP_Error( 'setting_not_found', __( 'Setting not found.', 'classified-listing' ) );
		}

		$old_value = $settings[ $field_key ];
		unset( $settings[ $field_key ] );

		update_option( $option_key, $settings );

		// Clear caches
		wp_cache_delete( $option_key, 'options' );

		return [
			'success'    => true,
			'option_key' => $option_key,
			'field_key'  => $field_key,
			'message'    => sprintf(
				/* translators: %s: field key */
				__( 'Setting "%s" has been reset/deleted.', 'classified-listing' ),
				$field_key
			),
		];
	}

	/**
	 * Reset all settings in a group to defaults.
	 *
	 * @param string $option_key Settings group option key.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function resetSettingsGroup( string $option_key ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to reset settings.', 'classified-listing' ) );
		}

		if ( ! isset( self::SETTINGS_GROUPS[ $option_key ] ) ) {
			return new \WP_Error(
				'invalid_settings_group',
				sprintf(
					/* translators: %s: option key */
					__( 'Settings group "%s" not found.', 'classified-listing' ),
					$option_key
				)
			);
		}

		// Delete the option (resets to defaults)
		delete_option( $option_key );

		// Clear caches
		wp_cache_delete( $option_key, 'options' );

		return [
			'success'    => true,
			'option_key' => $option_key,
			'message'    => sprintf(
				/* translators: %s: group label */
				__( 'Settings group "%s" has been reset to defaults.', 'classified-listing' ),
				self::SETTINGS_GROUPS[ $option_key ]['label']
			),
		];
	}

	/**
	 * Mask a sensitive value for display.
	 *
	 * @param string $value Value to mask.
	 *
	 * @return string Masked value.
	 */
	private function maskSensitiveValue( $value ): string {
		if ( ! is_scalar( $value ) ) {
			return '[hidden]';
		}
		$value  = (string) $value;
		$length = strlen( $value );
		if ( $length <= 8 ) {
			return str_repeat( '*', $length );
		}
		return substr( $value, 0, 4 ) . str_repeat( '*', $length - 8 ) . substr( $value, -4 );
	}

	/**
	 * Field definition from the settings UI definitions (Options::option_items()).
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key.
	 *
	 * @return array|null
	 */
	private function getFieldDefinition( string $option_key, string $field_key ): ?array {
		static $items = null;
		if ( null === $items ) {
			$items = Options::option_items();
		}

		foreach ( $items as $group_key => $item ) {
			if ( $group_key === $option_key && isset( $item['fields'][ $field_key ] ) ) {
				return $item['fields'][ $field_key ];
			}
			if ( isset( $item['children'][ $option_key ]['fields'][ $field_key ] ) ) {
				return $item['children'][ $option_key ]['fields'][ $field_key ];
			}
		}

		return null;
	}

	/**
	 * Validate and sanitize a value the same way the Settings screen does.
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key.
	 * @param mixed  $value      Raw value.
	 *
	 * @return mixed|\WP_Error Sanitized value, or error for unknown/non-writable fields.
	 */
	private function sanitizeAgainstDefinition( string $option_key, string $field_key, $value ) {
		$field = $this->getFieldDefinition( $option_key, $field_key );

		// Unknown keys, display-only fields and fields stored outside this option are not writable.
		if ( ! $field || ! empty( $field['is_external'] ) || in_array( $field['type'] ?? '', [ 'section', 'html', 'title' ], true ) ) {
			return new \WP_Error(
				'invalid_field_key',
				sprintf(
					/* translators: 1: field key, 2: option key */
					__( 'Field "%1$s" is not a writable setting of "%2$s". Use rtcl/get-settings to see the available fields.', 'classified-listing' ),
					$field_key,
					$option_key
				)
			);
		}

		// A masked secret sent back (e.g. "AIza****abcd") must not overwrite the real value.
		if ( is_string( $value ) && false !== strpos( $value, '****' ) && $this->isSensitiveField( $option_key, $field_key ) ) {
			return new \WP_Error( 'masked_value', __( 'This is a masked secret; send the full new value to change it.', 'classified-listing' ) );
		}

		return AjaxSettings::sanitizeOptionField( $field, $value );
	}

	/**
	 * Whether a field holds a secret (API key, license key, password, token ...).
	 *
	 * @param string $option_key Settings group option key.
	 * @param string $field_key  Field key.
	 *
	 * @return bool
	 */
	private function isSensitiveField( string $option_key, string $field_key ): bool {
		if ( in_array( $field_key, self::SENSITIVE_FIELDS, true ) ) {
			return true;
		}

		if ( preg_match( '/(secret|api_key|_key$|^key$|token|password|license)/', $field_key ) ) {
			return true;
		}

		$field = $this->getFieldDefinition( $option_key, $field_key );

		return $field && 'password' === ( $field['type'] ?? '' );
	}
}
