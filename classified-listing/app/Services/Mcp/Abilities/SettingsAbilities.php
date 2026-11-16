<?php
/**
 * Settings Abilities - MCP abilities for plugin settings management.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Helpers\CapabilityHelper;
use Rtcl\Services\Mcp\Services\SettingsService;

defined( 'ABSPATH' ) || exit;

/**
 * Register settings management MCP abilities.
 */
class SettingsAbilities {

	/**
	 * Register all settings abilities.
	 */
	public static function register() {
		self::registerListSettingsGroups();
		self::registerGetSettings();
		self::registerGetSetting();
		self::registerUpdateSettings();
		self::registerUpdateSetting();
		self::registerDeleteSetting();
		self::registerResetSettingsGroup();
	}

	/**
	 * Register list settings groups ability.
	 */
	private static function registerListSettingsGroups() {
		wp_register_ability( 'rtcl/list-settings-groups', [
			'label'       => __( 'List Settings Groups', 'classified-listing' ),
			'description' => __( 'List all available RTCL settings groups (option keys). Each group contains related settings. Categories include: listings, display, moderation, payment, email, account, advanced, appearance, misc, tools, ai.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'category' => [
						'type'        => 'string',
						'enum'        => [ 'listings', 'display', 'moderation', 'payment', 'email', 'account', 'advanced', 'appearance', 'misc', 'tools', 'ai' ],
						'description' => __( 'Filter by category. Omit to get all groups.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'groups' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'option_key'   => [ 'type' => 'string' ],
								'label'        => [ 'type' => 'string' ],
								'description'  => [ 'type' => 'string' ],
								'category'     => [ 'type' => 'string' ],
								'fields_count' => [ 'type' => 'integer' ],
							],
						],
					],
					'total'      => [ 'type' => 'integer' ],
					'categories' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new SettingsService();
				return $service->listSettingsGroups( $input );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register get settings ability.
	 */
	private static function registerGetSettings() {
		wp_register_ability( 'rtcl/get-settings', [
			'label'       => __( 'Get Settings Group', 'classified-listing' ),
			'description' => __( 'Get all settings in a specific settings group. Use rtcl/list-settings-groups to discover available groups. Sensitive fields (API keys) are masked by default.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key (e.g., "rtcl_general_settings", "rtcl_moderation_settings").', 'classified-listing' ),
					],
				],
				'required' => [ 'option_key' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key'  => [ 'type' => 'string' ],
					'label'       => [ 'type' => 'string' ],
					'description' => [ 'type' => 'string' ],
					'category'    => [ 'type' => 'string' ],
					'settings'    => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->getSettings( $option_key );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register get single setting ability.
	 */
	private static function registerGetSetting() {
		wp_register_ability( 'rtcl/get-setting', [
			'label'       => __( 'Get Single Setting', 'classified-listing' ),
			'description' => __( 'Get a specific setting value from a settings group. Useful for checking individual configuration values.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key.', 'classified-listing' ),
					],
					'field_key' => [
						'type'        => 'string',
						'description' => __( 'Field key within the settings group (e.g., "new_listing_status", "listing_duration").', 'classified-listing' ),
					],
					'default' => [
						'description' => __( 'Default value to return if setting is not found.', 'classified-listing' ),
					],
				],
				'required' => [ 'option_key', 'field_key' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [ 'type' => 'string' ],
					'field_key'  => [ 'type' => 'string' ],
					'value'      => [ 'description' => __( 'The setting value.', 'classified-listing' ) ],
					'is_default' => [ 'type' => 'boolean' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				$field_key = sanitize_key( $input['field_key'] ?? '' );

				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}
				if ( empty( $field_key ) ) {
					return new \WP_Error( 'missing_field_key', __( 'Field key is required.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->getSetting( $option_key, $field_key, $input['default'] ?? null );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register update settings ability.
	 */
	private static function registerUpdateSettings() {
		wp_register_ability( 'rtcl/update-settings', [
			'label'       => __( 'Update Settings', 'classified-listing' ),
			'description' => __( 'Update multiple settings in a settings group at once. Provide an object with field keys and their new values. Common settings: rtcl_general_settings (new_listing_status, listing_duration, has_favourites), rtcl_moderation_settings (required_gallery_image, title_max_limit).', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key.', 'classified-listing' ),
					],
					'values' => [
						'type'        => 'object',
						'description' => __( 'Object of field_key: value pairs to update.', 'classified-listing' ),
						'additionalProperties' => true,
					],
				],
				'required' => [ 'option_key', 'values' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'        => [ 'type' => 'boolean' ],
					'option_key'     => [ 'type' => 'string' ],
					'updated_fields' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
					'message'        => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				$values = $input['values'] ?? [];

				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}
				if ( empty( $values ) || ! is_array( $values ) ) {
					return new \WP_Error( 'missing_values', __( 'Values object is required.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->updateSettings( $option_key, $values );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register update single setting ability.
	 */
	private static function registerUpdateSetting() {
		wp_register_ability( 'rtcl/update-setting', [
			'label'       => __( 'Update Single Setting', 'classified-listing' ),
			'description' => __( 'Update a single setting value. Use this for simple configuration changes. Examples: set new_listing_status to "publish", set listing_duration to 30, enable has_favourites.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key.', 'classified-listing' ),
					],
					'field_key' => [
						'type'        => 'string',
						'description' => __( 'Field key to update.', 'classified-listing' ),
					],
					'value' => [
						'description' => __( 'New value for the setting. Type depends on the field (string, number, boolean, array).', 'classified-listing' ),
					],
				],
				'required' => [ 'option_key', 'field_key', 'value' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'    => [ 'type' => 'boolean' ],
					'option_key' => [ 'type' => 'string' ],
					'field_key'  => [ 'type' => 'string' ],
					'old_value'  => [ 'description' => __( 'Previous value.', 'classified-listing' ) ],
					'new_value'  => [ 'description' => __( 'New value.', 'classified-listing' ) ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				$field_key = sanitize_key( $input['field_key'] ?? '' );

				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}
				if ( empty( $field_key ) ) {
					return new \WP_Error( 'missing_field_key', __( 'Field key is required.', 'classified-listing' ) );
				}
				if ( ! isset( $input['value'] ) ) {
					return new \WP_Error( 'missing_value', __( 'Value is required.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->updateSetting( $option_key, $field_key, $input['value'] );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register delete/reset setting ability.
	 */
	private static function registerDeleteSetting() {
		wp_register_ability( 'rtcl/delete-setting', [
			'label'       => __( 'Delete/Reset Setting', 'classified-listing' ),
			'description' => __( 'Delete a specific setting, resetting it to its default value. The setting will no longer be stored and will use the plugin default.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key.', 'classified-listing' ),
					],
					'field_key' => [
						'type'        => 'string',
						'description' => __( 'Field key to delete/reset.', 'classified-listing' ),
					],
				],
				'required' => [ 'option_key', 'field_key' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'    => [ 'type' => 'boolean' ],
					'option_key' => [ 'type' => 'string' ],
					'field_key'  => [ 'type' => 'string' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				$field_key = sanitize_key( $input['field_key'] ?? '' );

				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}
				if ( empty( $field_key ) ) {
					return new \WP_Error( 'missing_field_key', __( 'Field key is required.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->deleteSetting( $option_key, $field_key );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register reset settings group ability.
	 */
	private static function registerResetSettingsGroup() {
		wp_register_ability( 'rtcl/reset-settings-group', [
			'label'       => __( 'Reset Settings Group', 'classified-listing' ),
			'description' => __( 'Reset all settings in a group to their default values. WARNING: This will delete all custom configurations in the group. Use with caution.', 'classified-listing' ),
			'category'    => 'rtcl-settings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'option_key' => [
						'type'        => 'string',
						'description' => __( 'Settings group option key to reset.', 'classified-listing' ),
					],
					'confirm' => [
						'type'        => 'boolean',
						'description' => __( 'Must be true to confirm the reset operation.', 'classified-listing' ),
					],
				],
				'required' => [ 'option_key', 'confirm' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'    => [ 'type' => 'boolean' ],
					'option_key' => [ 'type' => 'string' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$option_key = sanitize_key( $input['option_key'] ?? '' );
				$confirm = ! empty( $input['confirm'] );

				if ( empty( $option_key ) ) {
					return new \WP_Error( 'missing_option_key', __( 'Option key is required.', 'classified-listing' ) );
				}
				if ( ! $confirm ) {
					return new \WP_Error( 'confirmation_required', __( 'You must set confirm to true to reset settings.', 'classified-listing' ) );
				}

				$service = new SettingsService();
				return $service->resetSettingsGroup( $option_key );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => true,
				],
			],
		] );
	}
}
