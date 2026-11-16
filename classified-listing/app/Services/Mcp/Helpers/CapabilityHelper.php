<?php

namespace Rtcl\Services\Mcp\Helpers;

defined( 'ABSPATH' ) || exit;

/**
 * Centralized capability management for MCP abilities and AI Agent.
 *
 * This helper provides a single source of truth for capability checks across:
 * - AI Agent controller (admin UI)
 * - MCP abilities (external clients like Claude Desktop, ChatGPT, Cursor)
 *
 * TODO: Later differentiate between admin and subscriber capabilities.
 * For now, all write operations require manage_options (admin only).
 */
class CapabilityHelper {

	/**
	 * Primary access capability (WordPress admin).
	 */
	const CAP_ADMIN = 'manage_options';

	/**
	 * RTCL-specific capabilities.
	 */
	const CAP_READ_LISTINGS     = 'read_rtcl_listings';
	const CAP_EDIT_LISTINGS     = 'edit_rtcl_listings';
	const CAP_PUBLISH_LISTINGS  = 'publish_rtcl_listings';
	const CAP_EDIT_OTHERS       = 'edit_others_rtcl_listings';
	const CAP_MANAGE_OPTIONS    = 'manage_rtcl_options';  // Terms, settings, forms
	const CAP_MANAGE_FORMS      = 'manage_rtcl_fb_form';

	/**
	 * Action types for granular permission checking.
	 */
	const ACTION_READ_LISTING      = 'read_listing';
	const ACTION_CREATE_LISTING    = 'create_listing';
	const ACTION_EDIT_LISTING      = 'edit_listing';
	const ACTION_PUBLISH_LISTING   = 'publish_listing';
	const ACTION_READ_TAXONOMY     = 'read_taxonomy';
	const ACTION_CREATE_TAXONOMY   = 'create_taxonomy';
	const ACTION_READ_FORMS        = 'read_forms';
	const ACTION_MANAGE_FORMS      = 'manage_forms';
	const ACTION_READ_STATS        = 'read_stats';
	const ACTION_BULK_IMPORT       = 'bulk_import';

	/**
	 * Check if current user can access MCP abilities.
	 *
	 * This is the primary access gate for all MCP operations.
	 * Currently requires admin access (manage_options).
	 *
	 * @return bool
	 */
	public static function canAccessMcp(): bool {
		return current_user_can( self::CAP_ADMIN );
	}

	/**
	 * Check if current user can perform a specific action.
	 *
	 * @param string $action Action type constant.
	 * @return bool
	 */
	public static function canPerform( string $action ): bool {
		// Primary access gate - must be admin for now
		if ( ! self::canAccessMcp() ) {
			return false;
		}

		// Admin with manage_options can do everything
		// Additional RTCL capability checks are for defense in depth
		// but we allow fallback to manage_options for compatibility
		switch ( $action ) {
			case self::ACTION_READ_LISTING:
			case self::ACTION_READ_TAXONOMY:
			case self::ACTION_READ_STATS:
				// Allow if user has RTCL read capability OR is admin
				return current_user_can( self::CAP_READ_LISTINGS ) || current_user_can( self::CAP_ADMIN );

			case self::ACTION_CREATE_LISTING:
			case self::ACTION_EDIT_LISTING:
				// Allow if user has RTCL edit capability OR is admin
				return current_user_can( self::CAP_EDIT_LISTINGS ) || current_user_can( self::CAP_ADMIN );

			case self::ACTION_PUBLISH_LISTING:
				// Allow if user has RTCL publish capability OR is admin
				return current_user_can( self::CAP_PUBLISH_LISTINGS ) || current_user_can( self::CAP_ADMIN );

			case self::ACTION_CREATE_TAXONOMY:
				return current_user_can( self::CAP_MANAGE_OPTIONS );

			case self::ACTION_READ_FORMS:
				return current_user_can( self::CAP_MANAGE_FORMS ) || current_user_can( self::CAP_MANAGE_OPTIONS );

			case self::ACTION_MANAGE_FORMS:
				return current_user_can( self::CAP_MANAGE_OPTIONS );

			case self::ACTION_BULK_IMPORT:
				// Admin can always bulk import
				return current_user_can( self::CAP_ADMIN );

			default:
				return false;
		}
	}

	/**
	 * Check if user can edit a specific listing.
	 *
	 * @param int $listing_id Listing ID.
	 * @return bool
	 */
	public static function canEditListing( int $listing_id ): bool {
		if ( ! self::canPerform( self::ACTION_EDIT_LISTING ) ) {
			return false;
		}

		$post = get_post( $listing_id );
		if ( ! $post || ! function_exists( 'rtcl' ) || rtcl()->post_type !== $post->post_type ) {
			return false;
		}

		// Own listing or can edit others
		if ( (int) $post->post_author === get_current_user_id() ) {
			return true;
		}

		return current_user_can( self::CAP_EDIT_OTHERS );
	}

	/**
	 * Get permission callback for read-only listing operations.
	 *
	 * Use for: get-listing, search-listings, get-categories, get-locations, get-tags
	 *
	 * @return callable
	 */
	public static function getReadListingCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_READ_LISTING );
		};
	}

	/**
	 * Get permission callback for listing statistics.
	 *
	 * @return callable
	 */
	public static function getReadStatsCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_READ_STATS );
		};
	}

	/**
	 * Get permission callback for creating/editing listings.
	 *
	 * Use for: create-listing, update-listing, change-status, update-flags, update-price, upsert-listing
	 *
	 * @return callable
	 */
	public static function getEditListingCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_EDIT_LISTING );
		};
	}

	/**
	 * Get permission callback for creating taxonomies.
	 *
	 * Use for: create-category, create-location, create-tag, hierarchy operations
	 *
	 * @return callable
	 */
	public static function getCreateTaxonomyCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_CREATE_TAXONOMY );
		};
	}

	/**
	 * Get permission callback for read-only form operations.
	 *
	 * Use for: get-available-form-fields, list-forms, get-form-fields
	 *
	 * @return callable
	 */
	public static function getReadFormsCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_READ_FORMS );
		};
	}

	/**
	 * Get permission callback for managing forms.
	 *
	 * Use for: create-form, update-form, delete-form
	 *
	 * @return callable
	 */
	public static function getManageFormsCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_MANAGE_FORMS );
		};
	}

	/**
	 * Get permission callback for bulk import operations.
	 *
	 * @return callable
	 */
	public static function getBulkImportCallback(): callable {
		return function () {
			return self::canPerform( self::ACTION_BULK_IMPORT );
		};
	}

	/**
	 * Get permission callback for schema/discovery operations.
	 *
	 * These are informational and can use read-level access.
	 *
	 * @return callable
	 */
	public static function getSchemaDiscoveryCallback(): callable {
		return function () {
			return self::canAccessMcp();
		};
	}

	/**
	 * Get permission callback for admin-only operations.
	 *
	 * Use for: All create/update/delete operations that require manage_options.
	 * This includes: listing type management, form management, settings, etc.
	 *
	 * @return callable
	 */
	public static function getManageOptionsCallback(): callable {
		return function () {
			return current_user_can( self::CAP_ADMIN );
		};
	}

	/**
	 * Get permission callback for admin write operations on listings.
	 *
	 * Use for: create-listing, update-listing, delete-listing, upsert-listing, etc.
	 * Requires manage_options capability.
	 *
	 * @return callable
	 */
	public static function getAdminWriteCallback(): callable {
		return function () {
			return current_user_can( self::CAP_ADMIN );
		};
	}

	/**
	 * Get error message for permission denied.
	 *
	 * @param string $action Action type.
	 * @return string
	 */
	public static function getPermissionDeniedMessage( string $action ): string {
		$messages = [
			self::ACTION_READ_LISTING    => __( 'You do not have permission to view listings.', 'classified-listing' ),
			self::ACTION_CREATE_LISTING  => __( 'You do not have permission to create listings.', 'classified-listing' ),
			self::ACTION_EDIT_LISTING    => __( 'You do not have permission to edit listings.', 'classified-listing' ),
			self::ACTION_PUBLISH_LISTING => __( 'You do not have permission to publish listings.', 'classified-listing' ),
			self::ACTION_READ_TAXONOMY   => __( 'You do not have permission to view taxonomies.', 'classified-listing' ),
			self::ACTION_CREATE_TAXONOMY => __( 'You do not have permission to manage categories, locations, or tags.', 'classified-listing' ),
			self::ACTION_READ_FORMS      => __( 'You do not have permission to view forms.', 'classified-listing' ),
			self::ACTION_MANAGE_FORMS    => __( 'You do not have permission to manage forms.', 'classified-listing' ),
			self::ACTION_READ_STATS      => __( 'You do not have permission to view statistics.', 'classified-listing' ),
			self::ACTION_BULK_IMPORT     => __( 'You do not have permission to import listings.', 'classified-listing' ),
		];

		return $messages[ $action ] ?? __( 'Permission denied.', 'classified-listing' );
	}

	/**
	 * Create WP_Error for permission denied.
	 *
	 * @param string $action Action type.
	 * @return \WP_Error
	 */
	public static function permissionDeniedError( string $action ): \WP_Error {
		return new \WP_Error(
			'permission_denied',
			self::getPermissionDeniedMessage( $action ),
			[ 'status' => 403 ]
		);
	}
}
