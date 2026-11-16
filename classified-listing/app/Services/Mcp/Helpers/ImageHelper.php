<?php

namespace Rtcl\Services\Mcp\Helpers;

use Rtcl\Helpers\Functions;

defined( 'ABSPATH' ) || exit;

/**
 * Image processing helper for MCP integration.
 *
 * Handles image upload, resizing, and processing according to RTCL misc_media settings.
 */
class ImageHelper {

	/**
	 * Maximum image width for listing uploads.
	 */
	const MAX_WIDTH = 1200;

	/**
	 * Maximum image width for taxonomy (category/location) uploads.
	 */
	const MAX_WIDTH_TAXONOMY = 450;

	/**
	 * Get RTCL image size settings from misc_media_settings.
	 *
	 * @return array Image size settings with width, height, crop.
	 */
	public static function getGalleryImageSettings(): array {
		$settings = Functions::get_option( 'rtcl_misc_media_settings' );

		return [
			'gallery' => [
				'width'  => isset( $settings['image_size_gallery']['width'] ) ? absint( $settings['image_size_gallery']['width'] ) : 924,
				'height' => isset( $settings['image_size_gallery']['height'] ) ? absint( $settings['image_size_gallery']['height'] ) : 462,
				'crop'   => isset( $settings['image_size_gallery']['crop'] ) && 'yes' === $settings['image_size_gallery']['crop'],
			],
			'thumbnail' => [
				'width'  => isset( $settings['image_size_thumbnail']['width'] ) ? absint( $settings['image_size_thumbnail']['width'] ) : 320,
				'height' => isset( $settings['image_size_thumbnail']['height'] ) ? absint( $settings['image_size_thumbnail']['height'] ) : 240,
				'crop'   => isset( $settings['image_size_thumbnail']['crop'] ) && 'yes' === $settings['image_size_thumbnail']['crop'],
			],
			'gallery_thumbnail' => [
				'width'  => isset( $settings['image_size_gallery_thumbnail']['width'] ) ? absint( $settings['image_size_gallery_thumbnail']['width'] ) : 150,
				'height' => isset( $settings['image_size_gallery_thumbnail']['height'] ) ? absint( $settings['image_size_gallery_thumbnail']['height'] ) : 105,
				'crop'   => isset( $settings['image_size_gallery_thumbnail']['crop'] ) && 'yes' === $settings['image_size_gallery_thumbnail']['crop'],
			],
		];
	}

	/**
	 * Calculate dimensions maintaining aspect ratio.
	 *
	 * @param int  $orig_width   Original width.
	 * @param int  $orig_height  Original height.
	 * @param int  $max_width    Maximum width.
	 * @param int  $max_height   Maximum height (0 = auto based on ratio).
	 * @param bool $crop         Whether to crop to exact dimensions.
	 *
	 * @return array [ width, height ]
	 */
	public static function calculateDimensions( int $orig_width, int $orig_height, int $max_width, int $max_height = 0, bool $crop = false ): array {
		if ( $orig_width <= 0 || $orig_height <= 0 ) {
			return [ 0, 0 ];
		}

		// If image is already smaller than max, keep original dimensions
		if ( $orig_width <= $max_width && ( $max_height <= 0 || $orig_height <= $max_height ) ) {
			return [ $orig_width, $orig_height ];
		}

		$ratio = $orig_width / $orig_height;

		if ( $crop && $max_height > 0 ) {
			// Crop mode: return exact dimensions
			return [ $max_width, $max_height ];
		}

		// Maintain aspect ratio
		if ( $max_height <= 0 ) {
			// Only width constraint, calculate height based on ratio
			$new_width = min( $orig_width, $max_width );
			$new_height = (int) round( $new_width / $ratio );
		} else {
			// Both constraints, fit within box
			$new_width = $max_width;
			$new_height = (int) round( $new_width / $ratio );

			if ( $new_height > $max_height ) {
				$new_height = $max_height;
				$new_width = (int) round( $new_height * $ratio );
			}
		}

		return [ $new_width, $new_height ];
	}

	/**
	 * Download and process an image from URL.
	 *
	 * Downloads the image, resizes it according to settings, and attaches it to a post.
	 *
	 * @param string $image_url   Image URL to download.
	 * @param int    $post_id     Post ID to attach image to.
	 * @param string $title       Optional image title.
	 * @param int    $max_width   Maximum width for resizing (default: MAX_WIDTH).
	 *
	 * @return int|\WP_Error Attachment ID or WP_Error on failure.
	 */
	public static function sideloadAndProcess( string $image_url, int $post_id = 0, string $title = '', int $max_width = 0 ) {
		if ( $max_width <= 0 ) {
			$max_width = self::MAX_WIDTH;
		}
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// Download to temp location
		$temp_file = download_url( $image_url, 30 );
		if ( is_wp_error( $temp_file ) ) {
			return new \WP_Error(
				'download_failed',
				sprintf(
					/* translators: %s: error message */
					__( 'Failed to download image: %s', 'classified-listing' ),
					$temp_file->get_error_message()
				)
			);
		}

		// Get original dimensions
		$image_info = wp_getimagesize( $temp_file );
		if ( ! $image_info ) {
			@unlink( $temp_file );
			return new \WP_Error( 'invalid_image', __( 'The file is not a valid image.', 'classified-listing' ) );
		}

		$orig_width = $image_info[0];
		$orig_height = $image_info[1];
		$mime_type = $image_info['mime'];

		// Check if resize is needed
		$needs_resize = $orig_width > $max_width;

		if ( $needs_resize ) {
			// Get RTCL settings for aspect ratio guidance
			$settings = self::getGalleryImageSettings();
			$gallery_width = $settings['gallery']['width'];
			$gallery_height = $settings['gallery']['height'];
			$crop = $settings['gallery']['crop'];

			// Calculate target ratio from gallery settings
			$target_ratio = $gallery_height > 0 ? $gallery_width / $gallery_height : 0;

			// Calculate new dimensions
			$new_width = $max_width;
			$new_height = 0; // 0 means maintain original aspect ratio

			// If crop is enabled and gallery has specific ratio, use that ratio
			if ( $crop && $target_ratio > 0 ) {
				$new_height = (int) round( $max_width / $target_ratio );
			}

			[ $final_width, $final_height ] = self::calculateDimensions(
				$orig_width,
				$orig_height,
				$new_width,
				$new_height,
				$crop
			);

			// Resize the image
			$editor = wp_get_image_editor( $temp_file );
			if ( is_wp_error( $editor ) ) {
				@unlink( $temp_file );
				return $editor;
			}

			if ( $crop && $new_height > 0 ) {
				// Crop to exact dimensions
				$result = $editor->resize( $final_width, $final_height, true );
			} else {
				// Resize maintaining aspect ratio
				$result = $editor->resize( $final_width, $final_height, false );
			}

			if ( is_wp_error( $result ) ) {
				@unlink( $temp_file );
				return $result;
			}

			// Save resized image to temp location
			$resized = $editor->save( $temp_file );
			if ( is_wp_error( $resized ) ) {
				@unlink( $temp_file );
				return $resized;
			}
		}

		// Get file name from URL
		$file_name = basename( wp_parse_url( $image_url, PHP_URL_PATH ) );
		if ( empty( $file_name ) || ! preg_match( '/\.(jpg|jpeg|png|gif|webp)$/i', $file_name ) ) {
			$extension = self::getExtensionFromMime( $mime_type );
			$file_name = 'image-' . time() . '-' . wp_rand( 1000, 9999 ) . '.' . $extension;
		}

		// Prepare for sideload
		$file_array = [
			'name'     => sanitize_file_name( $file_name ),
			'tmp_name' => $temp_file,
		];

		// Apply RTCL upload filters if available
		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::beforeUpload();
		}

		// Sideload into media library
		$attachment_id = media_handle_sideload( $file_array, $post_id, $title );

		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::afterUpload();
		}

		// Clean up temp file if sideload failed
		if ( is_wp_error( $attachment_id ) ) {
			@unlink( $temp_file );
			return $attachment_id;
		}

		// Generate RTCL-specific image sizes
		self::generateRtclImageSizes( $attachment_id );

		return $attachment_id;
	}

	/**
	 * Upload and process a base64 encoded image.
	 *
	 * Accepts base64 image data (with or without data URI prefix), decodes it,
	 * resizes according to settings, and attaches it to a post.
	 *
	 * @param string $base64_data Base64 encoded image data (can include data:image/... prefix).
	 * @param int    $post_id     Post ID to attach image to.
	 * @param string $filename    Optional filename (without extension).
	 * @param int    $max_width   Maximum width for resizing (default: MAX_WIDTH).
	 *
	 * @return int|\WP_Error Attachment ID or WP_Error on failure.
	 */
	public static function uploadBase64Image( string $base64_data, int $post_id = 0, string $filename = '', int $max_width = 0 ) {
		if ( $max_width <= 0 ) {
			$max_width = self::MAX_WIDTH;
		}
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// Trim whitespace from input
		$base64_data = trim( $base64_data );

		// Parse base64 data - extract mime type if data URI format
		$mime_type = 'image/jpeg'; // Default
		$image_data = $base64_data;

		// Check if it's a data URI format: data:image/jpeg;base64,/9j/4AAQ...
		// More flexible regex to handle variations (spaces, different mime subtypes like image/svg+xml)
		if ( preg_match( '/^\s*data:image\/([\w+.-]+);base64,\s*/i', $base64_data, $matches ) ) {
			$extension = strtolower( $matches[1] );
			$mime_map = [
				'jpeg'    => 'image/jpeg',
				'jpg'     => 'image/jpeg',
				'png'     => 'image/png',
				'gif'     => 'image/gif',
				'webp'    => 'image/webp',
				'svg+xml' => 'image/svg+xml',
				'bmp'     => 'image/bmp',
				'tiff'    => 'image/tiff',
			];
			$mime_type = $mime_map[ $extension ] ?? 'image/jpeg';
			// Remove the data URI prefix (including any whitespace)
			$image_data = preg_replace( '/^\s*data:image\/[\w+.-]+;base64,\s*/i', '', $base64_data );
		}

		// Remove any whitespace/newlines from base64 data (common in formatted/wrapped base64)
		$image_data = preg_replace( '/\s+/', '', $image_data );

		// ~10 MB decoded image limit (checked before decoding into memory).
		if ( strlen( $image_data ) > (int) apply_filters( 'rtcl_mcp_max_base64_image_length', 14 * MB_IN_BYTES ) ) {
			return new \WP_Error( 'image_too_large', __( 'Image data is too large.', 'classified-listing' ) );
		}

		// Decode base64 data (non-strict mode to be more forgiving)
		$decoded_data = base64_decode( $image_data, false );
		if ( false === $decoded_data || strlen( $decoded_data ) < 100 ) {
			// Try one more time with strict mode off and padding fix
			$padded = $image_data;
			$padding = strlen( $image_data ) % 4;
			if ( $padding > 0 ) {
				$padded .= str_repeat( '=', 4 - $padding );
			}
			$decoded_data = base64_decode( $padded, false );
			if ( false === $decoded_data || strlen( $decoded_data ) < 100 ) {
				return new \WP_Error( 'invalid_base64', __( 'Invalid base64 image data.', 'classified-listing' ) );
			}
		}

		// Validate it's actually image data
		if ( strlen( $decoded_data ) < 100 ) {
			return new \WP_Error( 'invalid_image_data', __( 'Image data is too small to be valid.', 'classified-listing' ) );
		}

		// Create temp file
		$upload_dir = wp_upload_dir();
		$extension = self::getExtensionFromMime( $mime_type );

		if ( empty( $filename ) ) {
			$filename = 'mcp-upload-' . time() . '-' . wp_rand( 1000, 9999 );
		}
		$filename = sanitize_file_name( $filename );

		// Unique temp file (a fixed name in uploads could clobber an existing file or race with another request).
		$temp_file = wp_tempnam( $filename . '.' . $extension );

		// Write decoded data to temp file
		$written = file_put_contents( $temp_file, $decoded_data );
		if ( false === $written ) {
			return new \WP_Error( 'write_failed', __( 'Failed to write image file.', 'classified-listing' ) );
		}

		// Verify it's a valid image
		$image_info = wp_getimagesize( $temp_file );
		if ( ! $image_info ) {
			@unlink( $temp_file );
			return new \WP_Error( 'invalid_image', __( 'The decoded data is not a valid image.', 'classified-listing' ) );
		}

		$orig_width = $image_info[0];
		$orig_height = $image_info[1];
		$actual_mime = $image_info['mime'];

		// Resize if needed
		if ( $orig_width > $max_width ) {
			$settings = self::getGalleryImageSettings();
			$crop = $settings['gallery']['crop'];

			$editor = wp_get_image_editor( $temp_file );
			if ( is_wp_error( $editor ) ) {
				@unlink( $temp_file );
				return $editor;
			}

			// Calculate new dimensions maintaining aspect ratio
			$ratio = $orig_height / $orig_width;
			$new_width = $max_width;
			$new_height = (int) round( $max_width * $ratio );

			$result = $editor->resize( $new_width, $new_height, $crop );
			if ( is_wp_error( $result ) ) {
				@unlink( $temp_file );
				return $result;
			}

			$saved = $editor->save( $temp_file );
			if ( is_wp_error( $saved ) ) {
				@unlink( $temp_file );
				return $saved;
			}
		}

		// Prepare file for WordPress upload
		$file_array = [
			'name'     => $filename . '.' . $extension,
			'tmp_name' => $temp_file,
			'type'     => $actual_mime,
			'error'    => 0,
			'size'     => filesize( $temp_file ),
		];

		// Apply RTCL upload filters if available
		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::beforeUpload();
		}

		// Upload to media library
		$attachment_id = media_handle_sideload( $file_array, $post_id );

		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::afterUpload();
		}

		// Clean up temp file if upload failed
		if ( is_wp_error( $attachment_id ) ) {
			@unlink( $temp_file );
			return $attachment_id;
		}

		// Generate RTCL-specific image sizes
		self::generateRtclImageSizes( $attachment_id );

		return $attachment_id;
	}

	/**
	 * Check if a string is base64 encoded image data.
	 *
	 * @param string $data Data to check.
	 *
	 * @return bool True if it appears to be base64 image data.
	 */
	public static function isBase64Image( string $data ): bool {
		// Check for data URI format (with optional whitespace)
		if ( preg_match( '/^\s*data:image\/[\w+.-]+;base64,/i', $data ) ) {
			return true;
		}

		// Strip whitespace for raw base64 check
		$cleaned = preg_replace( '/\s+/', '', $data );

		// Check if it's raw base64 that decodes to image data
		// Base64 strings should only contain valid characters
		// Must be at least 100 chars and be valid base64 length (multiple of 4)
		if ( strlen( $cleaned ) > 100 && strlen( $cleaned ) % 4 === 0 && preg_match( '/^[A-Za-z0-9+\/]+=*$/', $cleaned ) ) {
			// Try to decode first few bytes to check if it's an image
			$sample = base64_decode( substr( $cleaned, 0, 64 ), true );
			if ( false !== $sample ) {
				// Check for common image magic bytes
				$magic = substr( $sample, 0, 8 );
				// JPEG: FF D8 FF, PNG: 89 50 4E 47, GIF: 47 49 46, WebP: 52 49 46 46
				if ( "\xFF\xD8\xFF" === substr( $magic, 0, 3 ) ||
				     "\x89PNG" === substr( $magic, 0, 4 ) ||
				     'GIF8' === substr( $magic, 0, 4 ) ||
				     'RIFF' === substr( $magic, 0, 4 ) ) {
					return true;
				}
			}
			// Even if magic bytes don't match, if it looks like valid base64, try it
			return true;
		}

		return false;
	}

	/**
	 * Check if a string is a local file path.
	 *
	 * @param string $path Path to check.
	 *
	 * @return bool True if it appears to be a local file path.
	 */
	public static function isLocalFilePath( string $path ): bool {
		// Skip if it looks like a URL
		if ( filter_var( $path, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		// Skip if it looks like base64 (starts with data: or is very long without path separators)
		if ( preg_match( '/^data:/i', $path ) ) {
			return false;
		}

		// Check for valid image extension at the end
		if ( ! preg_match( '/\.(jpg|jpeg|png|gif|webp|heic|bmp|tiff?)$/i', $path ) ) {
			return false;
		}

		// Unix/Mac absolute path (starts with /)
		// Allow any characters in path including spaces, parentheses, unicode, etc.
		if ( str_starts_with( $path, '/' ) ) {
			return true;
		}

		// Windows absolute path (C:\, D:\, etc.)
		if ( preg_match( '/^[A-Za-z]:[\\\\\\/]/', $path ) ) {
			return true;
		}

		// Relative path (doesn't start with / but has valid extension)
		// Could be wp-content/uploads/image.jpg or just image.jpg
		if ( ! str_contains( $path, '://' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Upload and process a local file from the server filesystem.
	 *
	 * Reads the file from the server's filesystem, resizes it according to settings,
	 * and uploads it to the WordPress media library.
	 *
	 * @param string $file_path Local file path on the server.
	 * @param int    $post_id   Post ID to attach image to.
	 * @param string $title     Optional image title.
	 * @param int    $max_width Maximum width for resizing (default: MAX_WIDTH).
	 *
	 * @return int|\WP_Error Attachment ID or WP_Error on failure.
	 */
	public static function uploadLocalFile( string $file_path, int $post_id = 0, string $title = '', int $max_width = 0 ) {
		if ( $max_width <= 0 ) {
			$max_width = self::MAX_WIDTH;
		}
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		// Normalize path
		$file_path = wp_normalize_path( $file_path );

		// Handle relative paths - resolve from WordPress root
		if ( ! self::isAbsolutePath( $file_path ) ) {
			$file_path = ABSPATH . ltrim( $file_path, '/' );
		}

		// Only files inside the allowed directories (WordPress install by default). realpath()
		// resolves ../ and symlinks, so the check cannot be bypassed; it also returns false for
		// missing files. Errors never echo the server path back to the client.
		$real_path = realpath( $file_path );
		if ( false === $real_path || ! is_file( $real_path ) || ! self::isAllowedLocalPath( $real_path ) ) {
			return new \WP_Error( 'file_not_found', __( 'Local file not found or not allowed. Local images must be inside the WordPress directory.', 'classified-listing' ) );
		}
		$file_path = $real_path;

		// Validate file is readable
		if ( ! is_readable( $file_path ) ) {
			return new \WP_Error( 'file_not_readable', __( 'Local file is not readable.', 'classified-listing' ) );
		}

		// Validate it's an image
		$image_info = wp_getimagesize( $file_path );
		if ( ! $image_info ) {
			return new \WP_Error( 'invalid_image', __( 'The file is not a valid image.', 'classified-listing' ) );
		}

		$orig_width  = $image_info[0];
		$orig_height = $image_info[1];
		$mime_type   = $image_info['mime'];

		// Get file name
		$file_name = basename( $file_path );

		// Create a copy in temp directory for processing
		$upload_dir = wp_upload_dir();
		$temp_file  = trailingslashit( $upload_dir['basedir'] ) . 'mcp-temp-' . time() . '-' . wp_rand( 1000, 9999 ) . '-' . sanitize_file_name( $file_name );

		if ( ! copy( $file_path, $temp_file ) ) {
			return new \WP_Error( 'copy_failed', __( 'Failed to copy file for processing.', 'classified-listing' ) );
		}

		// Resize if needed
		if ( $orig_width > $max_width ) {
			$settings = self::getGalleryImageSettings();
			$crop     = $settings['gallery']['crop'];

			$editor = wp_get_image_editor( $temp_file );
			if ( is_wp_error( $editor ) ) {
				@unlink( $temp_file );
				return $editor;
			}

			// Calculate new dimensions maintaining aspect ratio
			$ratio      = $orig_height / $orig_width;
			$new_width  = $max_width;
			$new_height = (int) round( $max_width * $ratio );

			$result = $editor->resize( $new_width, $new_height, $crop );
			if ( is_wp_error( $result ) ) {
				@unlink( $temp_file );
				return $result;
			}

			$saved = $editor->save( $temp_file );
			if ( is_wp_error( $saved ) ) {
				@unlink( $temp_file );
				return $saved;
			}
		}

		// Prepare file for WordPress upload
		$file_array = [
			'name'     => sanitize_file_name( $file_name ),
			'tmp_name' => $temp_file,
			'type'     => $mime_type,
			'error'    => 0,
			'size'     => filesize( $temp_file ),
		];

		// Apply RTCL upload filters if available
		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::beforeUpload();
		}

		// Upload to media library
		$attachment_id = media_handle_sideload( $file_array, $post_id, $title ?: '' );

		if ( class_exists( 'Rtcl\Controllers\Hooks\Filters' ) ) {
			\Rtcl\Controllers\Hooks\Filters::afterUpload();
		}

		// Clean up temp file if upload failed
		if ( is_wp_error( $attachment_id ) ) {
			@unlink( $temp_file );
			return $attachment_id;
		}

		// Generate RTCL-specific image sizes
		self::generateRtclImageSizes( $attachment_id );

		return $attachment_id;
	}

	/**
	 * Whether a resolved local path is inside a directory MCP may import images from.
	 *
	 * @param string $real_path Path already resolved with realpath().
	 *
	 * @return bool
	 */
	private static function isAllowedLocalPath( string $real_path ): bool {
		/**
		 * Filter the directories MCP may import local images from. Default: the WordPress install directory.
		 *
		 * @param string[] $dirs Absolute directory paths.
		 */
		$dirs      = (array) apply_filters( 'rtcl_mcp_allowed_local_image_dirs', [ ABSPATH ] );
		$real_path = wp_normalize_path( $real_path );

		foreach ( $dirs as $dir ) {
			$real_dir = realpath( (string) $dir );
			if ( false !== $real_dir && 0 === strpos( $real_path, trailingslashit( wp_normalize_path( $real_dir ) ) ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Check if a path is absolute.
	 *
	 * @param string $path Path to check.
	 *
	 * @return bool True if absolute path.
	 */
	private static function isAbsolutePath( string $path ): bool {
		// Unix/Mac absolute path
		if ( str_starts_with( $path, '/' ) ) {
			return true;
		}

		// Windows absolute path
		if ( preg_match( '/^[A-Za-z]:/', $path ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Process image input - handles URL, attachment ID, local file path, or base64 data.
	 *
	 * @param mixed  $image     Image URL, attachment ID, local file path, or base64 data.
	 * @param int    $post_id   Post ID to attach image to.
	 * @param string $title     Optional image title.
	 * @param int    $max_width Maximum width for resizing (default: MAX_WIDTH = 1200).
	 *
	 * @return int|\WP_Error Attachment ID or WP_Error on failure.
	 */
	public static function processImageInput( $image, int $post_id = 0, string $title = '', int $max_width = 0 ) {
		if ( $max_width <= 0 ) {
			$max_width = self::MAX_WIDTH;
		}
		// Attachment ID
		if ( is_numeric( $image ) ) {
			$attachment_id = absint( $image );
			if ( wp_attachment_is_image( $attachment_id ) ) {
				return $attachment_id;
			}
			return new \WP_Error( 'invalid_attachment', __( 'The provided attachment ID is not a valid image.', 'classified-listing' ) );
		}

		// Must be a string at this point
		if ( ! is_string( $image ) ) {
			return new \WP_Error( 'invalid_input', __( 'Image must be a URL, attachment ID, local file path, or base64 data.', 'classified-listing' ) );
		}

		$image = trim( $image );

		// Check if it's a URL first (before local path check)
		if ( filter_var( $image, FILTER_VALIDATE_URL ) ) {
			return self::sideloadAndProcess( $image, $post_id, $title, $max_width );
		}

		// Check if it's base64 data
		if ( self::isBase64Image( $image ) ) {
			return self::uploadBase64Image( $image, $post_id, $title ?: 'mcp-image', $max_width );
		}

		// Check if it's a local file path
		if ( self::isLocalFilePath( $image ) ) {
			return self::uploadLocalFile( $image, $post_id, $title, $max_width );
		}

		// Provide helpful debug info
		$preview  = strlen( $image ) > 100 ? substr( $image, 0, 100 ) . '...' : $image;
		$analysis = [];

		if ( strlen( $image ) > 1000 ) {
			$analysis[] = 'long_string';
		}
		if ( preg_match( '/^data:/i', $image ) ) {
			$analysis[] = 'data_uri_like';
		}
		if ( preg_match( '/^[A-Za-z0-9+\/=\s]+$/', $image ) ) {
			$analysis[] = 'base64_chars';
		}

		return new \WP_Error(
			'invalid_image_format',
			sprintf(
				/* translators: 1: preview of input, 2: analysis hints */
				__( 'Unrecognized image format. Preview: "%1$s". Hints: %2$s. Expected: URL, attachment ID, local file path, or base64 data.', 'classified-listing' ),
				esc_html( $preview ),
				! empty( $analysis ) ? implode( ', ', $analysis ) : 'none'
			)
		);
	}

	/**
	 * Process taxonomy image input with smaller max width (450px).
	 *
	 * Convenience method for category/location images.
	 *
	 * @param mixed  $image   Image URL, attachment ID, local file path, or base64 data.
	 * @param int    $post_id Post ID to attach image to.
	 * @param string $title   Optional image title.
	 *
	 * @return int|\WP_Error Attachment ID or WP_Error on failure.
	 */
	public static function processTaxonomyImage( $image, int $post_id = 0, string $title = '' ) {
		return self::processImageInput( $image, $post_id, $title, self::MAX_WIDTH_TAXONOMY );
	}

	/**
	 * Generate RTCL-specific image sub-sizes.
	 *
	 * @param int $attachment_id Attachment ID.
	 */
	public static function generateRtclImageSizes( int $attachment_id ): void {
		$file = get_attached_file( $attachment_id );
		if ( ! $file || ! file_exists( $file ) ) {
			return;
		}

		// Get RTCL image sizes
		if ( function_exists( 'rtcl' ) && isset( rtcl()->gallery['image_sizes'] ) ) {
			$image_sizes = rtcl()->gallery['image_sizes'];
		} else {
			$settings = self::getGalleryImageSettings();
			$image_sizes = [
				'rtcl-gallery' => $settings['gallery'],
				'rtcl-thumbnail' => $settings['thumbnail'],
				'rtcl-gallery-thumbnail' => $settings['gallery_thumbnail'],
			];
		}

		// Use RTCL's method if available
		if ( class_exists( 'Rtcl\Helpers\Functions' ) && method_exists( Functions::class, 'generate_attachment_metadata' ) ) {
			Functions::generate_attachment_metadata( $attachment_id, $file, $image_sizes );
		} else {
			// Fallback: regenerate standard sizes
			wp_update_attachment_metadata( $attachment_id, wp_generate_attachment_metadata( $attachment_id, $file ) );
		}
	}

	/**
	 * Get file extension from MIME type.
	 *
	 * @param string $mime_type MIME type.
	 *
	 * @return string File extension.
	 */
	private static function getExtensionFromMime( string $mime_type ): string {
		$map = [
			'image/jpeg' => 'jpg',
			'image/png'  => 'png',
			'image/gif'  => 'gif',
			'image/webp' => 'webp',
			'image/heic' => 'heic',
		];

		return $map[ $mime_type ] ?? 'jpg';
	}

	/**
	 * Cap how many images one call may process (each can be a remote download + resize).
	 *
	 * @param array $images Image inputs.
	 *
	 * @return array
	 */
	public static function limitImages( array $images ): array {
		$max = max( 1, (int) apply_filters( 'rtcl_mcp_max_images_per_request', 20 ) );

		return array_slice( $images, 0, $max, true );
	}

	/**
	 * Process multiple images from various sources.
	 *
	 * Supports URLs, local file paths, attachment IDs, and base64 data.
	 *
	 * @param array $images  Array of image sources (URLs, paths, IDs, or base64).
	 * @param int   $post_id Post ID to attach images to.
	 *
	 * @return array Array of attachment IDs (successful ones only).
	 */
	public static function processMultipleImages( array $images, int $post_id = 0 ): array {
		$attachment_ids = [];

		foreach ( self::limitImages( $images ) as $image ) {
			if ( is_string( $image ) ) {
				$image = trim( $image );
			}

			if ( empty( $image ) ) {
				continue;
			}

			$result = self::processImageInput( $image, $post_id );
			if ( ! is_wp_error( $result ) ) {
				$attachment_ids[] = $result;
			}
		}

		return $attachment_ids;
	}

	/**
	 * Attach an image to a listing without taking it away from another post:
	 * only unattached attachments (or ones already on this listing) are re-parented.
	 *
	 * @param int $attachment_id Attachment ID.
	 * @param int $listing_id    Listing ID.
	 */
	public static function attachToListing( int $attachment_id, int $listing_id ): void {
		$attachment = get_post( $attachment_id );
		if ( ! $attachment || 'attachment' !== $attachment->post_type ) {
			return;
		}

		if ( 0 === (int) $attachment->post_parent ) {
			wp_update_post( [
				'ID'          => $attachment_id,
				'post_parent' => $listing_id,
			] );
		}
	}

	/**
	 * Permanently delete an attachment only when it belongs to the listing, so a gallery clean-up
	 * can never delete media used elsewhere (site logo, other listings, pages).
	 *
	 * @param int $attachment_id Attachment ID.
	 * @param int $listing_id    Listing ID.
	 *
	 * @return bool Whether the file was deleted.
	 */
	public static function deleteListingAttachment( int $attachment_id, int $listing_id ): bool {
		$attachment = get_post( $attachment_id );
		if ( ! $attachment || 'attachment' !== $attachment->post_type || (int) $attachment->post_parent !== $listing_id ) {
			return false;
		}

		return (bool) wp_delete_attachment( $attachment_id, true );
	}

	/**
	 * Set featured image and gallery for a listing.
	 *
	 * @param int   $listing_id     Listing ID.
	 * @param array $attachment_ids Array of attachment IDs.
	 * @param bool  $set_featured   Whether to set the first image as featured.
	 */
	public static function setListingImages( int $listing_id, array $attachment_ids, bool $set_featured = true ): void {
		$attachment_ids = array_filter( array_map( 'absint', $attachment_ids ) );

		if ( empty( $attachment_ids ) ) {
			return;
		}

		// Set featured image
		if ( $set_featured ) {
			set_post_thumbnail( $listing_id, $attachment_ids[0] );
		}

		// Attach images to listing
		foreach ( $attachment_ids as $attachment_id ) {
			self::attachToListing( (int) $attachment_id, $listing_id );
		}

		// Store gallery order
		update_post_meta( $listing_id, '_rtcl_images', $attachment_ids );

		// Also store the order for RTCL compatibility
		if ( function_exists( 'update_post_meta' ) ) {
			update_post_meta( $listing_id, '_rtcl_attachments_order', $attachment_ids );
		}
	}
}
