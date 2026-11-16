<?php

namespace Rtcl\Services\Mcp;

use Rtcl\Helpers\Functions;
use Rtcl\Services\Mcp\Admin\GuidelinesPage;

defined( 'ABSPATH' ) || exit;

/**
 * Entry point for the optional MCP integration.
 *
 * Boot order on `plugins_loaded`:
 *   1. AI Integration → "MCP Integration" switch must be on (default off).
 *   2. The WordPress Abilities API must exist (WordPress 6.9+).
 *   3. The MCP Adapter plugin (https://wordpress.org/plugins/mcp-adapter/) must be active.
 * Only then are the abilities, categories and admin page registered. A missing
 * requirement shows an admin notice and nothing else is loaded.
 */
class Mcp {

	/**
	 * MCP Adapter plugin basename (WordPress.org slug `mcp-adapter`).
	 */
	const ADAPTER_PLUGIN = 'mcp-adapter/mcp-adapter.php';

	/**
	 * MCP Adapter default server REST route (namespace/route).
	 */
	const ADAPTER_DEFAULT_ROUTE = 'mcp/mcp-adapter-default-server';

	const STATUS_DISABLED         = 'disabled';
	const STATUS_ACTIVE           = 'active';
	const STATUS_NO_ABILITIES_API = 'no_abilities_api';
	const STATUS_ADAPTER_MISSING  = 'adapter_missing';
	const STATUS_LEGACY_ADDON     = 'legacy_addon';

	private static $initialized = false;

	private static $status = self::STATUS_DISABLED;

	/**
	 * Hook the boot check. Called once from Rtcl::__init().
	 */
	public static function init() {
		if ( self::$initialized ) {
			return;
		}
		self::$initialized = true;

		// The switch is administrator-only even though the AI Integration tab can be saved with manage_rtcl_options.
		add_filter( 'rtcl_update_options_rtcl_ai_settings', [ __CLASS__, 'protect_enable_switch' ] );

		if ( did_action( 'plugins_loaded' ) ) {
			self::boot();
		} else {
			add_action( 'plugins_loaded', [ __CLASS__, 'boot' ], 20 );
		}
	}

	/**
	 * Check the requirements and start the integration when they are all met.
	 */
	public static function boot() {
		if ( ! self::is_enabled() ) {
			return;
		}

		self::$status = self::detect_status();

		if ( self::STATUS_ACTIVE !== self::$status ) {
			if ( is_admin() ) {
				add_action( 'admin_notices', [ __CLASS__, 'requirement_notice' ] );
				if ( self::STATUS_ADAPTER_MISSING === self::$status ) {
					add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_notice_scripts' ] );
				}
			}

			return;
		}

		McpIntegration::getInstance();

		/**
		 * Fires after the Classified Listing MCP integration has booted.
		 */
		do_action( 'rtcl_mcp_loaded' );
	}

	/**
	 * Keep the stored "Enable MCP Integration" value when the AI Integration settings are saved by a user
	 * who is not an administrator (e.g. the Listing Manager role).
	 *
	 * @param array $options AI Integration settings about to be saved.
	 *
	 * @return array
	 */
	public static function protect_enable_switch( $options ) {
		if ( ! is_array( $options ) || current_user_can( 'manage_options' ) ) {
			return $options;
		}

		$stored = get_option( 'rtcl_ai_settings', [] );
		if ( is_array( $stored ) && array_key_exists( 'enable_mcp', $stored ) ) {
			$options['enable_mcp'] = $stored['enable_mcp'];
		} else {
			unset( $options['enable_mcp'] );
		}

		return $options;
	}

	/**
	 * Whether the MCP integration is switched on in Settings → AI Integration.
	 *
	 * @return bool
	 */
	public static function is_enabled() {
		$enabled = Functions::get_option_item( 'rtcl_ai_settings', 'enable_mcp', false, 'checkbox' );

		return (bool) apply_filters( 'rtcl_mcp_enabled', $enabled );
	}

	/**
	 * Whether the WordPress Abilities API (WordPress 6.9+) is available.
	 *
	 * @return bool
	 */
	public static function has_abilities_api() {
		return function_exists( 'wp_register_ability' ) && function_exists( 'wp_register_ability_category' );
	}

	/**
	 * Whether the MCP Adapter plugin is loaded. It defines WP_MCP_VERSION while
	 * WordPress loads plugins, so this is reliable from `plugins_loaded` on.
	 *
	 * @return bool
	 */
	public static function is_adapter_active() {
		return defined( 'WP_MCP_VERSION' ) && class_exists( 'WP\MCP\Core\McpAdapter' );
	}

	/**
	 * The retired standalone "Classified Listing - MCP Integration" add-on
	 * registers the same `rtcl/*` abilities; running both would register them twice.
	 *
	 * @return bool
	 */
	public static function is_legacy_addon_active() {
		return defined( 'RTCL_MCP_VERSION' );
	}

	/**
	 * Whether the integration booted on this request.
	 *
	 * @return bool
	 */
	public static function is_active() {
		return self::STATUS_ACTIVE === self::$status;
	}

	/**
	 * MCP endpoint URL served by the MCP Adapter default server.
	 *
	 * @return string
	 */
	public static function get_endpoint_url() {
		return rest_url( self::ADAPTER_DEFAULT_ROUTE );
	}

	/**
	 * @return string One of the STATUS_* constants.
	 */
	private static function detect_status() {
		if ( self::is_legacy_addon_active() ) {
			return self::STATUS_LEGACY_ADDON;
		}
		if ( ! self::has_abilities_api() ) {
			return self::STATUS_NO_ABILITIES_API;
		}
		if ( ! self::is_adapter_active() ) {
			return self::STATUS_ADAPTER_MISSING;
		}

		return self::STATUS_ACTIVE;
	}

	/**
	 * Admin notice for an enabled integration whose requirements are not met.
	 */
	public static function requirement_notice() {
		if ( ! current_user_can( 'activate_plugins' ) || self::is_plugin_installer_screen() ) {
			return;
		}

		$button = '';
		switch ( self::$status ) {
			case self::STATUS_LEGACY_ADDON:
				$message = esc_html__( 'MCP integration feature is now built into Classified Listing. Please deactivate the "Classified Listing - MCP Integration" add-on; the built-in MCP integration stays paused while the add-on is active.', 'classified-listing' );
				break;

			case self::STATUS_NO_ABILITIES_API:
				$message = sprintf(
					/* translators: %s: required WordPress version */
					esc_html__( 'MCP integration feature is enabled but requires WordPress %s or later (Abilities API). MCP tools are not loaded.', 'classified-listing' ),
					'<strong>6.9</strong>'
				);
				break;

			case self::STATUS_ADAPTER_MISSING:
				$message = self::is_adapter_installed()
					? esc_html__( 'MCP integration feature is enabled and the MCP Adapter plugin is installed, but it is not activated. Activate it to load the MCP tools.', 'classified-listing' )
					: esc_html__( 'MCP integration feature is enabled but requires the MCP Adapter plugin to be installed and activated. MCP tools are not loaded.', 'classified-listing' );
				$button  = self::adapter_action_button();
				break;

			default:
				return;
		}

		// Same layout as the setup wizard notice (SetupWizard::setup_wizard_notice()).
		printf(
			'<div class="notice notice-info rtcl-mcp-notice" style="display:flex;flex-direction:column;padding-top:20px;padding-bottom:20px;border-left-color:#3232FF;"><h3 style="margin:0;">%1$s</h3><p style="margin-top:8px;font-size:14px;">%2$s</p>%3$s</div>',
			esc_html__( 'Classified Listing - MCP Integration', 'classified-listing' ),
			$message, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
			$button // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in adapter_action_button().
		);
	}

	/**
	 * Description for the AI Integration settings field, reflecting the current state.
	 *
	 * @return string
	 */
	public static function get_settings_status_html() {
		if ( self::is_active() ) {
			return sprintf(
				/* translators: 1: MCP endpoint URL, 2: guidelines page URL */
				__( 'MCP is active. Endpoint: <code>%1$s</code> — see <a href="%2$s">MCP Guidelines</a> for client setup.', 'classified-listing' ),
				esc_html( self::get_endpoint_url() ),
				esc_url( admin_url( 'admin.php?page=' . GuidelinesPage::SLUG ) )
			);
		}

		if ( self::is_legacy_addon_active() ) {
			return esc_html__( 'Deactivate the "Classified Listing - MCP Integration" add-on to use the built-in MCP integration.', 'classified-listing' );
		}

		if ( ! self::has_abilities_api() ) {
			return esc_html__( 'Requires WordPress 6.9 or later (Abilities API).', 'classified-listing' );
		}

		if ( ! self::is_adapter_active() ) {
			return sprintf(
				/* translators: %s: install/activate link */
				__( 'Requires the MCP Adapter plugin. %s', 'classified-listing' ),
				self::adapter_action_link()
			);
		}

		return esc_html__( 'All requirements are met. Save the settings and reload the page to start the MCP integration.', 'classified-listing' );
	}

	/**
	 * @return array{url: string, label: string, installed: bool}
	 */
	private static function adapter_action() {
		$installed = self::is_adapter_installed();

		if ( $installed ) {
			return [
				'url'       => wp_nonce_url( self_admin_url( 'plugins.php?action=activate&plugin=' . self::ADAPTER_PLUGIN ), 'activate-plugin_' . self::ADAPTER_PLUGIN ),
				'label'     => __( 'Activate MCP Adapter', 'classified-listing' ),
				'installed' => true,
			];
		}

		return [
			'url'       => wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=mcp-adapter' ), 'install-plugin_mcp-adapter' ),
			'label'     => __( 'Install MCP Adapter', 'classified-listing' ),
			'installed' => false,
		];
	}

	/**
	 * Whether the MCP Adapter plugin files exist (installed, maybe inactive).
	 *
	 * @return bool
	 */
	private static function is_adapter_installed() {
		return file_exists( WP_PLUGIN_DIR . '/' . self::ADAPTER_PLUGIN );
	}

	/**
	 * WordPress' own plugin installer/updater screen (update.php). The notice is
	 * rendered before the install runs there, so it would show a stale state.
	 *
	 * @return bool
	 */
	private static function is_plugin_installer_screen() {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;

		return $screen && 'update' === $screen->id;
	}

	/**
	 * Load WordPress' plugin install API (wp.updates) for the one-click install & activate button.
	 */
	public static function enqueue_notice_scripts() {
		if ( current_user_can( 'install_plugins' ) && ! self::is_plugin_installer_screen() ) {
			wp_enqueue_script( 'updates' );
		}
	}

	private static function can_act_on_adapter( $installed ) {
		return $installed ? current_user_can( 'activate_plugins' ) : current_user_can( 'install_plugins' );
	}

	private static function adapter_action_button() {
		$action = self::adapter_action();
		if ( ! self::can_act_on_adapter( $action['installed'] ) ) {
			return '';
		}

		// The href is the no-JS fallback (WordPress installer page / activation link).
		$button = sprintf(
			'<p style="margin:0;display:flex;align-items:center;gap:10px;"><a href="%1$s" class="button button-primary rtcl-mcp-adapter-action" data-action="%2$s" data-slug="mcp-adapter" data-activate-url="%3$s" style="background:#3232FF;border-color:#3232FF;color:#fff;">%4$s</a><span class="rtcl-mcp-adapter-status" role="status" aria-live="polite"></span></p>',
			esc_url( $action['url'] ),
			esc_attr( $action['installed'] ? 'activate' : 'install' ),
			esc_url( $action['installed'] ? $action['url'] : '' ),
			esc_html( $action['label'] )
		);

		return $button . self::adapter_action_script();
	}

	/**
	 * Install (via wp.updates) and/or activate the MCP Adapter in place, then reload.
	 * Falls back to the button's href (classic WordPress screens) when anything fails.
	 *
	 * @return string
	 */
	private static function adapter_action_script() {
		$i18n = [
			'installing' => __( 'Installing MCP Adapter…', 'classified-listing' ),
			'activating' => __( 'Activating MCP Adapter…', 'classified-listing' ),
			'done'       => __( 'MCP Adapter is active. Reloading…', 'classified-listing' ),
		];

		ob_start();
		?>
		<script>
			( function ( $ ) {
				var i18n = <?php echo wp_json_encode( $i18n ); ?>;
				$( document ).on( 'click', '.rtcl-mcp-adapter-action', function ( e ) {
					var $btn = $( this ), $status = $btn.siblings( '.rtcl-mcp-adapter-status' ), fallback = $btn.attr( 'href' );
					if ( $btn.hasClass( 'disabled' ) ) {
						e.preventDefault();
						return;
					}
					var activate = function ( url ) {
						$status.text( i18n.activating );
						$.get( url ).done( function () {
							$status.text( i18n.done );
							window.location.reload();
						} ).fail( function () {
							window.location.href = url;
						} );
					};
					if ( 'activate' === $btn.data( 'action' ) ) {
						e.preventDefault();
						$btn.addClass( 'disabled' );
						activate( $btn.data( 'activate-url' ) );
						return;
					}
					if ( ! window.wp || ! wp.updates || ! wp.updates.ajax ) {
						return; // Follow the link to the WordPress installer.
					}
					e.preventDefault();
					$btn.addClass( 'disabled' );
					$status.text( i18n.installing );
					wp.updates.ajax( 'install-plugin', {
						slug: $btn.data( 'slug' ),
						success: function ( response ) {
							if ( response && response.activateUrl ) {
								activate( response.activateUrl );
							} else {
								window.location.reload();
							}
						},
						error: function () {
							window.location.href = fallback;
						}
					} );
				} );
			} )( jQuery );
		</script>
		<?php
		return ob_get_clean();
	}

	private static function adapter_action_link() {
		$action = self::adapter_action();
		if ( ! self::can_act_on_adapter( $action['installed'] ) ) {
			return '';
		}

		// Plain link (no script in the settings UI): it opens the WordPress installer, which only installs.
		$label = $action['installed'] ? $action['label'] : __( 'Install MCP Adapter', 'classified-listing' );

		return sprintf( '<a href="%s">%s</a>', esc_url( $action['url'] ), esc_html( $label ) );
	}
}
