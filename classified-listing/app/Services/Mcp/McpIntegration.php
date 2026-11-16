<?php

namespace Rtcl\Services\Mcp;

use Rtcl\Services\Mcp\Abilities\AjaxFilterAbilities;
use Rtcl\Services\Mcp\Abilities\FormAbilities;
use Rtcl\Services\Mcp\Abilities\ImportAbilities;
use Rtcl\Services\Mcp\Abilities\ListingAbilities;
use Rtcl\Services\Mcp\Abilities\ListingTypeAbilities;
use Rtcl\Services\Mcp\Abilities\MembershipAbilities;
use Rtcl\Services\Mcp\Abilities\PageBuilderAbilities;
use Rtcl\Services\Mcp\Abilities\PaymentAbilities;
use Rtcl\Services\Mcp\Abilities\SettingsAbilities;
use Rtcl\Services\Mcp\Abilities\TaxonomyAbilities;
use Rtcl\Services\Mcp\Admin\GuidelinesPage;

defined( 'ABSPATH' ) || exit;

/**
 * Registers Classified Listing abilities using the WordPress Abilities API.
 *
 * The abilities are exposed to MCP clients through the MCP Adapter plugin
 * (https://wordpress.org/plugins/mcp-adapter/). Only booted by Mcp::boot()
 * once the AI Integration setting is on and the adapter is active.
 */
final class McpIntegration {

	private static $instance = null;

	public static function getInstance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->registerHooks();
	}

	private function registerHooks() {
		// Register ability categories.
		add_action( 'wp_abilities_api_categories_init', [ $this, 'registerCategories' ] );

		// Register abilities.
		add_action( 'wp_abilities_api_init', [ $this, 'registerAbilities' ] );

		// Explain refused calls from non-administrators instead of a bare "Permission denied".
		add_filter( 'wp_ability_permission_result', [ $this, 'explainDeniedPermission' ], 20, 2 );

		// Admin page.
		if ( is_admin() ) {
			add_action( 'admin_menu', [ GuidelinesPage::class, 'add_menu' ], 99 );
			add_action( 'in_admin_header', [ GuidelinesPage::class, 'remove_admin_notices' ], 1000 );
		}
	}

	/**
	 * Register ability categories for grouping RTCL abilities.
	 */
	public function registerCategories() {
		wp_register_ability_category( 'rtcl-listings', [
			'label'       => __( 'Classified Listings', 'classified-listing' ),
			'description' => __( 'Manage classified listing ads — search, create, update, status changes, and statistics.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-taxonomies', [
			'label'       => __( 'Listing Taxonomies', 'classified-listing' ),
			'description' => __( 'Manage listing categories, locations, and tags.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-memberships', [
			'label'       => __( 'Listing Memberships', 'classified-listing' ),
			'description' => __( 'View pricing plans and membership packages.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-imports', [
			'label'       => __( 'Listing Imports', 'classified-listing' ),
			'description' => __( 'Bulk import and upsert listings from external sources.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-forms', [
			'label'       => __( 'Form Builder', 'classified-listing' ),
			'description' => __( 'Create and manage listing forms with custom fields.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-settings', [
			'label'       => __( 'Listing Settings', 'classified-listing' ),
			'description' => __( 'Manage listing types, configuration, and settings.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-payments', [
			'label'       => __( 'Payment History', 'classified-listing' ),
			'description' => __( 'View payment history, order details, and revenue statistics.', 'classified-listing' ),
		] );

		wp_register_ability_category( 'rtcl-page-builder', [
			'label'       => __( 'Page Builder', 'classified-listing' ),
			'description' => __( 'Create pages with Gutenberg blocks and Elementor widgets for listing directories.', 'classified-listing' ),
		] );
	}

	/**
	 * Register all RTCL abilities.
	 */
	public function registerAbilities() {
		ListingAbilities::register();
		TaxonomyAbilities::register();
		MembershipAbilities::register();
		ImportAbilities::register();
		FormAbilities::register();
		ListingTypeAbilities::register();
		SettingsAbilities::register();
		PaymentAbilities::register();
		PageBuilderAbilities::register();
		AjaxFilterAbilities::register();

		/**
		 * Fires after the built-in Classified Listing abilities are registered,
		 * so add-ons can register their own `rtcl/*` abilities alongside them.
		 */
		do_action( 'rtcl_mcp_abilities_registered' );
	}

	/**
	 * All rtcl/* abilities (base and add-ons) are administrator-only. When one is refused for a user who is
	 * not an administrator, return a clear, translatable explanation; MCP clients show the WP_Error message
	 * to the user. Administrators and other plugins' abilities are not affected.
	 *
	 * @param bool|\WP_Error $result Permission result.
	 * @param string         $name   Ability name.
	 *
	 * @return bool|\WP_Error
	 */
	public function explainDeniedPermission( $result, $name ) {
		if ( true === $result || 0 !== strpos( (string) $name, 'rtcl/' ) || current_user_can( 'manage_options' ) ) {
			return $result;
		}

		$user = wp_get_current_user();
		if ( ! $user || ! $user->exists() ) {
			return new \WP_Error(
				'rtcl_mcp_not_signed_in',
				__( 'Classified Listing could not sign you in. Check the credentials (username and Application Password of an administrator account) in your AI app\'s MCP configuration. You can create new ones in Classified Listing → MCP Guidelines.', 'classified-listing' ),
				[ 'status' => 401 ]
			);
		}

		$roles = wp_roles();
		$names = [];
		foreach ( (array) $user->roles as $role ) {
			$names[] = isset( $roles->role_names[ $role ] ) ? translate_user_role( $roles->role_names[ $role ] ) : $role;
		}

		return new \WP_Error(
			'rtcl_mcp_admin_only',
			sprintf(
				/* translators: 1: username, 2: role name(s) */
				__( 'Sorry, this can\'t be done with the current connection. Classified Listing MCP tools only work with an administrator account, but this connection signs in as "%1$s" (%2$s). Ask a site administrator to create credentials for an administrator account in Classified Listing → MCP Guidelines, then update the connection in your AI app.', 'classified-listing' ),
				$user->user_login,
				$names ? implode( ', ', $names ) : __( 'no role', 'classified-listing' )
			),
			[ 'status' => 403 ]
		);
	}

	private function __clone() {}

	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton.' );
	}
}
