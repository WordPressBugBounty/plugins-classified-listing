<?php

namespace Rtcl\Services\Mcp\Services\Import;

use Rtcl\Services\Mcp\ErrorCodes;

defined( 'ABSPATH' ) || exit;

/**
 * Handles JSON file parsing for listing imports.
 *
 * Supports:
 * - Local file path on server
 * - Direct JSON string
 * - Base64 encoded JSON data
 */
class JsonImportService {

	/**
	 * Parse JSON data from various input sources.
	 *
	 * @param array $input {
	 *     @type string $json_file  Local file path to JSON file.
	 *     @type string $json_data  Direct JSON string or base64 encoded JSON.
	 *     @type string $json_url   URL to fetch JSON from (optional).
	 * }
	 *
	 * @return array|\WP_Error Parsed items array or error.
	 */
	public function parseJsonInput( array $input ) {
		// Priority: json_file > json_data > json_url
		if ( ! empty( $input['json_file'] ) ) {
			return $this->parseFromFile( $input['json_file'] );
		}

		if ( ! empty( $input['json_data'] ) ) {
			return $this->parseFromData( $input['json_data'] );
		}

		if ( ! empty( $input['json_url'] ) ) {
			return $this->parseFromUrl( $input['json_url'] );
		}

		return new \WP_Error(
			ErrorCodes::VALIDATION_REQUIRED_FIELD,
			__( 'Either json_file, json_data, or json_url is required.', 'classified-listing' )
		);
	}

	/**
	 * Parse JSON from a local file path.
	 *
	 * @param string $file_path Local file path.
	 *
	 * @return array|\WP_Error Parsed data or error.
	 */
	public function parseFromFile( string $file_path ) {
		// Extension first, before touching the filesystem.
		$ext = strtolower( pathinfo( $file_path, PATHINFO_EXTENSION ) );
		if ( ! in_array( $ext, [ 'json', 'txt' ], true ) ) {
			return new \WP_Error(
				'invalid_file_type',
				__( 'File must be a JSON file (.json or .txt extension).', 'classified-listing' )
			);
		}

		$file_path = $this->resolveFilePath( $file_path );

		// Generic error: never echo server paths or reveal whether a file exists outside the allowed directories.
		if ( '' === $file_path || ! is_readable( $file_path ) ) {
			return new \WP_Error(
				'file_not_found',
				__( 'JSON file not found or not allowed. Upload it to the WordPress uploads directory and pass its path relative to that directory.', 'classified-listing' )
			);
		}

		// Check file size (max 10MB)
		$max_size = 10 * 1024 * 1024;
		$file_size = filesize( $file_path );
		if ( $file_size > $max_size ) {
			return new \WP_Error(
				'file_too_large',
				sprintf(
					/* translators: %s: max size in MB */
					__( 'JSON file is too large. Maximum size: %s MB.', 'classified-listing' ),
					$max_size / ( 1024 * 1024 )
				)
			);
		}

		$content = file_get_contents( $file_path );
		if ( false === $content ) {
			return new \WP_Error(
				'file_read_error',
				__( 'Failed to read JSON file contents.', 'classified-listing' )
			);
		}

		return $this->parseJsonString( $content );
	}

	/**
	 * Parse JSON from direct data (string or base64).
	 *
	 * @param string $data JSON string or base64 encoded JSON.
	 *
	 * @return array|\WP_Error Parsed data or error.
	 */
	public function parseFromData( string $data ) {
		$data = trim( $data );

		if ( empty( $data ) ) {
			return new \WP_Error(
				'empty_data',
				__( 'JSON data is empty.', 'classified-listing' )
			);
		}

		// Check if it's base64 encoded
		if ( $this->isBase64( $data ) ) {
			$decoded = base64_decode( $data, true );
			if ( false === $decoded ) {
				return new \WP_Error(
					'invalid_base64',
					__( 'Invalid base64 encoded data.', 'classified-listing' )
				);
			}
			$data = $decoded;
		}

		return $this->parseJsonString( $data );
	}

	/**
	 * Parse JSON from a URL.
	 *
	 * @param string $url JSON URL.
	 *
	 * @return array|\WP_Error Parsed data or error.
	 */
	public function parseFromUrl( string $url ) {
		$url = esc_url_raw( $url );

		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return new \WP_Error(
				'invalid_url',
				__( 'Invalid JSON URL.', 'classified-listing' )
			);
		}

		// wp_safe_remote_get(): rejects loopback/private/link-local hosts and unsafe ports (no SSRF).
		$response = wp_safe_remote_get( $url, [
			'timeout'             => 15,
			'redirection'         => 3,
			'sslverify'           => true,
			'limit_response_size' => 10 * MB_IN_BYTES,
		] );

		if ( is_wp_error( $response ) ) {
			return new \WP_Error(
				'fetch_failed',
				sprintf(
					/* translators: %s: error message */
					__( 'Failed to fetch JSON from URL: %s', 'classified-listing' ),
					$response->get_error_message()
				)
			);
		}

		$status_code = wp_remote_retrieve_response_code( $response );
		if ( 200 !== $status_code ) {
			return new \WP_Error(
				'fetch_failed',
				sprintf(
					/* translators: %d: HTTP status code */
					__( 'Failed to fetch JSON from URL. HTTP status: %d', 'classified-listing' ),
					$status_code
				)
			);
		}

		$body = wp_remote_retrieve_body( $response );
		return $this->parseJsonString( $body );
	}

	/**
	 * Parse a JSON string into array.
	 *
	 * @param string $json_string JSON string.
	 *
	 * @return array|\WP_Error Parsed data or error.
	 */
	private function parseJsonString( string $json_string ) {
		// Remove BOM if present
		$json_string = preg_replace( '/^\xEF\xBB\xBF/', '', $json_string );

		$data = json_decode( $json_string, true );

		if ( json_last_error() !== JSON_ERROR_NONE ) {
			return new \WP_Error(
				'json_parse_error',
				sprintf(
					/* translators: %s: JSON error message */
					__( 'Failed to parse JSON: %s', 'classified-listing' ),
					json_last_error_msg()
				)
			);
		}

		if ( ! is_array( $data ) ) {
			return new \WP_Error(
				'invalid_json_structure',
				__( 'JSON must be an array or object.', 'classified-listing' )
			);
		}

		// Normalize structure - support both direct array and wrapped object
		return $this->normalizeJsonStructure( $data );
	}

	/**
	 * Normalize JSON structure to consistent format.
	 *
	 * Supports:
	 * - Array of items: [{...}, {...}]
	 * - Object with items key: {"items": [{...}, {...}]}
	 * - Object with listings key: {"listings": [{...}, {...}]}
	 * - Object with data key: {"data": [{...}, {...}]}
	 *
	 * @param array $data Parsed JSON data.
	 *
	 * @return array Normalized structure with items array.
	 */
	private function normalizeJsonStructure( array $data ): array {
		$result = [
			'items'   => [],
			'source'  => null,
			'options' => [],
		];

		// Check if it's a direct array of items (numeric keys)
		if ( isset( $data[0] ) && is_array( $data[0] ) ) {
			$result['items'] = $data;
			return $result;
		}

		// Check for wrapped structure
		$items_keys = [ 'items', 'listings', 'data', 'records' ];
		foreach ( $items_keys as $key ) {
			if ( isset( $data[ $key ] ) && is_array( $data[ $key ] ) ) {
				$result['items'] = $data[ $key ];
				break;
			}
		}

		// Extract source if present
		if ( isset( $data['source'] ) ) {
			$result['source'] = sanitize_key( $data['source'] );
		}

		// Extract options if present
		$option_keys = [ 'options', 'settings', 'config' ];
		foreach ( $option_keys as $key ) {
			if ( isset( $data[ $key ] ) && is_array( $data[ $key ] ) ) {
				$result['options'] = $data[ $key ];
				break;
			}
		}

		// If still no items found, treat the whole object as a single item
		if ( empty( $result['items'] ) && isset( $data['title'] ) ) {
			$result['items'] = [ $data ];
		}

		return $result;
	}

	/**
	 * Resolve file path to absolute path.
	 *
	 * @param string $path File path.
	 *
	 * @return string Resolved absolute path.
	 */
	private function resolveFilePath( string $path ): string {
		$path = wp_normalize_path( trim( $path ) );

		// No stream wrappers (phar://, php://, http:// ...).
		if ( false !== strpos( $path, '://' ) ) {
			return '';
		}

		$upload_dir = wp_upload_dir();
		$candidate  = $this->isAbsolutePath( $path ) ? $path : trailingslashit( $upload_dir['basedir'] ) . ltrim( $path, '/' );

		// realpath() resolves ../ and symlinks and returns false for missing files.
		$real = realpath( $candidate );
		if ( false === $real || ! is_file( $real ) ) {
			return '';
		}
		$real = wp_normalize_path( $real );

		/**
		 * Filter the directories MCP may read JSON import files from. Default: the uploads directory.
		 *
		 * @param string[] $dirs Absolute directory paths.
		 */
		$dirs = (array) apply_filters( 'rtcl_mcp_allowed_json_dirs', [ $upload_dir['basedir'] ] );
		foreach ( $dirs as $dir ) {
			$real_dir = realpath( (string) $dir );
			if ( false !== $real_dir && 0 === strpos( $real, trailingslashit( wp_normalize_path( $real_dir ) ) ) ) {
				return $real;
			}
		}

		return '';
	}

	/**
	 * Check if path is absolute.
	 *
	 * @param string $path Path to check.
	 *
	 * @return bool True if absolute.
	 */
	private function isAbsolutePath( string $path ): bool {
		// Unix/Mac
		if ( str_starts_with( $path, '/' ) ) {
			return true;
		}

		// Windows
		if ( preg_match( '/^[A-Za-z]:/', $path ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Check if string is base64 encoded.
	 *
	 * @param string $data Data to check.
	 *
	 * @return bool True if likely base64.
	 */
	private function isBase64( string $data ): bool {
		// Quick check: valid base64 should only contain these characters
		if ( ! preg_match( '/^[A-Za-z0-9+\/=\s]+$/', $data ) ) {
			return false;
		}

		// Must be reasonable length
		if ( strlen( $data ) < 10 ) {
			return false;
		}

		// If it starts with { or [, it's likely raw JSON
		$trimmed = ltrim( $data );
		if ( str_starts_with( $trimmed, '{' ) || str_starts_with( $trimmed, '[' ) ) {
			return false;
		}

		// Try to decode and check if result is valid JSON
		$decoded = base64_decode( $data, true );
		if ( false === $decoded ) {
			return false;
		}

		// Check if decoded content looks like JSON
		$decoded_trimmed = ltrim( $decoded );
		return str_starts_with( $decoded_trimmed, '{' ) || str_starts_with( $decoded_trimmed, '[' );
	}

	/**
	 * Get example JSON structure for documentation.
	 *
	 * @return array Example structure.
	 */
	public static function getExampleStructure(): array {
		return [
			'source'  => 'my-import-source',
			'options' => [
				'default_status'   => 'pending',
				'update_existing'  => true,
				'default_category' => 'Electronics',
				'default_location' => 'New York',
				'default_form_id'  => 1,
			],
			'items'   => [
				[
					'external_id'   => 'ITEM-001',
					'form_id'       => 1,
					'title'         => 'Example Listing',
					'slug'          => 'example-listing-custom-url',
					'description'   => 'Full description here...',
					'excerpt'       => 'Short summary',
					'category'      => 'Electronics > Phones',
					'location'      => 'USA > New York > Manhattan',
					'price'         => 99.99,
					'max_price'     => 149.99,
					'price_type'    => 'negotiable',
					'pricing_type'  => 'range',
					'listing_type'  => 'sell',
					'status'        => 'publish',
					'featured'      => false,
					'tags'          => [ 'smartphone', 'electronics' ],
					'images'        => [
						'https://example.com/image1.jpg',
						'https://example.com/image2.jpg',
					],
					'video_urls'    => [
						'https://www.youtube.com/watch?v=xxxxx',
					],
					'contact'       => [
						'email'          => 'seller@example.com',
						'phone'          => '+1234567890',
						'whatsapp'       => '+1234567890',
						'website'        => 'https://example.com',
						'address'        => '123 Main St',
						'zipcode'        => '10001',
						'contact_person' => 'John Doe',
					],
					'geo_location'  => [
						'latitude'  => 40.7128,
						'longitude' => -74.0060,
						'address'   => '123 Main St, New York, NY 10001',
					],
					'business_hours' => [
						'monday'    => [ 'open' => '09:00', 'close' => '17:00' ],
						'tuesday'   => [ 'open' => '09:00', 'close' => '17:00' ],
						'wednesday' => [ 'open' => '09:00', 'close' => '17:00' ],
						'thursday'  => [ 'open' => '09:00', 'close' => '17:00' ],
						'friday'    => [ 'open' => '09:00', 'close' => '17:00' ],
						'saturday'  => [ 'active' => false ],
						'sunday'    => [ 'active' => false ],
					],
					'social_profiles' => [
						'facebook'  => 'https://facebook.com/page',
						'twitter'   => 'https://twitter.com/user',
						'instagram' => 'https://instagram.com/user',
					],
					'custom_fields' => [
						'brand'      => 'Apple',
						'model'      => 'iPhone 15',
						'condition'  => 'new',
						'warranty'   => true,
						'start_date' => [ 'start' => '2024-01-01', 'end' => '2024-12-31' ],
					],
					'source_url'    => 'https://source.example.com/item/001',
				],
			],
		];
	}
}
