<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\ErrorCodes;
use Rtcl\Services\Mcp\Services\Import\McpImporter;
use Rtcl\Services\Mcp\Services\Import\ValidationService;
use Rtcl\Services\Mcp\Services\Import\JsonImportService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;
use Rtcl\Services\Importers\ImportRunner;
use Rtcl\Services\Importers\ImportHistory;

defined( 'ABSPATH' ) || exit;

/**
 * Registers bulk import abilities with the WordPress Abilities API.
 */
class ImportAbilities {

	public static function register() {
		self::registerValidateListingImport();
		self::registerCreateListingImport();
		self::registerImportFromJson();
		self::registerGetImportStatus();
		self::registerGetImportResults();
		self::registerGetImportSchema();
	}

	/**
	 * Get the complete item schema with all preset and custom fields.
	 *
	 * @return array Item schema definition.
	 */
	private static function getItemSchema(): array {
		return [
			'type'       => 'object',
			'properties' => [
				// Identification
				'external_id' => [
					'type'        => 'string',
					'description' => __( 'External ID for deduplication. Required for imports.', 'classified-listing' ),
				],
				// Form assignment
				'form_id' => [
					'type'        => 'integer',
					'description' => __( 'Form Builder form ID to use for this listing.', 'classified-listing' ),
				],
				'form_slug' => [
					'type'        => 'string',
					'description' => __( 'Form slug (alternative to form_id).', 'classified-listing' ),
				],
				// Core fields
				'title' => [
					'type'        => 'string',
					'description' => __( 'Listing title. Required.', 'classified-listing' ),
				],
				'description' => [
					'type'        => 'string',
					'description' => __( 'Full listing description. HTML allowed.', 'classified-listing' ),
				],
				'excerpt' => [
					'type'        => 'string',
					'description' => __( 'Short summary of the listing.', 'classified-listing' ),
				],
				'slug' => [
					'type'        => 'string',
					'description' => __( 'URL slug. Auto-generated from title if not provided.', 'classified-listing' ),
				],
				// Taxonomies
				'category' => [
					'oneOf' => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
					'description' => __( 'Category ID, slug, name, or path (e.g., "Electronics > Phones").', 'classified-listing' ),
				],
				'location' => [
					'oneOf' => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
					'description' => __( 'Location ID, slug, name, or path (e.g., "USA > New York").', 'classified-listing' ),
				],
				'tags' => [
					'type'        => 'array',
					'items'       => [ 'type' => 'string' ],
					'description' => __( 'Array of tag names.', 'classified-listing' ),
				],
				// Pricing
				'price' => [
					'type'        => 'number',
					'description' => __( 'Listing price.', 'classified-listing' ),
				],
				'max_price' => [
					'type'        => 'number',
					'description' => __( 'Maximum price (for price range). Requires pricing_type=range.', 'classified-listing' ),
				],
				'price_type' => [
					'type'        => 'string',
					'enum'        => [ 'regular', 'on_call', 'negotiable', 'fixed' ],
					'description' => __( 'Price type.', 'classified-listing' ),
				],
				'pricing_type' => [
					'type'        => 'string',
					'enum'        => [ 'price', 'range', 'disabled' ],
					'description' => __( 'Pricing display type: single price, range, or disabled.', 'classified-listing' ),
				],
				'price_unit' => [
					'type'        => 'string',
					'description' => __( 'Price unit (e.g., "per month", "per item").', 'classified-listing' ),
				],
				// Listing type and status
				'listing_type' => [
					'type'        => 'string',
					'enum'        => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ],
					'description' => __( 'Listing type (ad type).', 'classified-listing' ),
				],
				'status' => [
					'type'        => 'string',
					'enum'        => [ 'publish', 'pending', 'draft' ],
					'description' => __( 'Listing status.', 'classified-listing' ),
				],
				'featured' => [
					'type'        => 'boolean',
					'description' => __( 'Whether listing is featured.', 'classified-listing' ),
				],
				// Media
				'images' => [
					'type'        => 'array',
					'items'       => [ 'type' => 'string' ],
					'description' => __( 'Image URLs, local paths, or base64 data. First becomes featured image.', 'classified-listing' ),
				],
				'video_urls' => [
					'type'        => 'array',
					'items'       => [ 'type' => 'string' ],
					'description' => __( 'YouTube/Vimeo video URLs.', 'classified-listing' ),
				],
				// Contact information
				'contact' => [
					'type'        => 'object',
					'properties'  => [
						'email'          => [ 'type' => 'string', 'description' => __( 'Contact email.', 'classified-listing' ) ],
						'phone'          => [ 'type' => 'string', 'description' => __( 'Contact phone.', 'classified-listing' ) ],
						'whatsapp'       => [ 'type' => 'string', 'description' => __( 'WhatsApp number.', 'classified-listing' ) ],
						'website'        => [ 'type' => 'string', 'description' => __( 'Website URL.', 'classified-listing' ) ],
						'address'        => [ 'type' => 'string', 'description' => __( 'Street address.', 'classified-listing' ) ],
						'zipcode'        => [ 'type' => 'string', 'description' => __( 'ZIP/postal code.', 'classified-listing' ) ],
						'contact_person' => [ 'type' => 'string', 'description' => __( 'Contact person name.', 'classified-listing' ) ],
					],
					'description' => __( 'Contact information object.', 'classified-listing' ),
				],
				// Geo location
				'geo_location' => [
					'type'        => 'object',
					'properties'  => [
						'latitude'  => [ 'type' => 'number', 'description' => __( 'Latitude (-90 to 90).', 'classified-listing' ) ],
						'longitude' => [ 'type' => 'number', 'description' => __( 'Longitude (-180 to 180).', 'classified-listing' ) ],
						'address'   => [ 'type' => 'string', 'description' => __( 'Formatted address for display.', 'classified-listing' ) ],
					],
					'description' => __( 'Geographic coordinates for map display.', 'classified-listing' ),
				],
				// Business hours
				'business_hours' => [
					'type'        => 'object',
					'description' => __( 'Business hours by day (monday-sunday). Each day: {open: "HH:MM", close: "HH:MM"} or {active: false}.', 'classified-listing' ),
					'additionalProperties' => [
						'type'       => 'object',
						'properties' => [
							'active' => [ 'type' => 'boolean' ],
							'open'   => [ 'type' => 'string' ],
							'close'  => [ 'type' => 'string' ],
							'slots'  => [
								'type'  => 'array',
								'items' => [
									'type'       => 'object',
									'properties' => [
										'open'  => [ 'type' => 'string' ],
										'close' => [ 'type' => 'string' ],
									],
								],
							],
						],
					],
				],
				// Social profiles
				'social_profiles' => [
					'type'        => 'object',
					'description' => __( 'Social profile URLs: {facebook: "url", twitter: "url", ...}.', 'classified-listing' ),
					'additionalProperties' => [ 'type' => 'string' ],
				],
				// Custom fields
				'custom_fields' => [
					'type'        => 'object',
					'description' => __( 'Custom field values. Supports: text, textarea, number, select, radio, checkbox (array), date (YYYY-MM-DD), date_range ({start, end}), datetime, url, email, file, color (#RRGGBB).', 'classified-listing' ),
					'additionalProperties' => true,
				],
				// Tracking
				'source_url' => [
					'type'        => 'string',
					'description' => __( 'Original URL in source system for reference.', 'classified-listing' ),
				],
			],
			'required' => [ 'external_id', 'title' ],
		];
	}

	private static function registerValidateListingImport() {
		$item_schema = self::getItemSchema();

		wp_register_ability( 'rtcl/validate-listing-import', [
			'label'       => __( 'Validate Listing Import', 'classified-listing' ),
			'description' => __( 'Validate a batch of listings before importing (dry-run). Returns validation errors and warnings for each item without modifying the database. Use to check data quality before running an actual import.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'source' => [
						'type'        => 'string',
						'description' => __( 'Source identifier for this import batch.', 'classified-listing' ),
					],
					'items' => [
						'type'        => 'array',
						'description' => __( 'Array of listing items to validate.', 'classified-listing' ),
						// No per-item "required" here: missing external_id/title are reported as validation
						// errors per item (that is the point of this tool) instead of rejecting the whole call.
						'items'       => array_diff_key( $item_schema, [ 'required' => true ] ),
					],
				],
				'required' => [ 'source', 'items' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'valid'         => [ 'type' => 'boolean', 'description' => __( 'Whether all items are valid.', 'classified-listing' ) ],
					'total_items'   => [ 'type' => 'integer', 'description' => __( 'Total items validated.', 'classified-listing' ) ],
					'valid_items'   => [ 'type' => 'integer', 'description' => __( 'Number of valid items.', 'classified-listing' ) ],
					'invalid_items' => [ 'type' => 'integer', 'description' => __( 'Number of invalid items.', 'classified-listing' ) ],
					'results'       => [ 'type' => 'array', 'description' => __( 'Validation results for invalid items or items with warnings.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$source = sanitize_key( $input['source'] ?? '' );
				$items = self::prepareItems( $input['items'] ?? [] );
				if ( is_wp_error( $items ) ) {
					return $items;
				}

				$service = new ValidationService();
				return $service->validateBatch( $source, $items );
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

	private static function registerCreateListingImport() {
		$item_schema = self::getItemSchema();

		wp_register_ability( 'rtcl/create-listing-import', [
			'label'       => __( 'Create Listing Import', 'classified-listing' ),
			'description' => __( 'Create and execute a bulk listing import job. Uses source+external_id for deduplication. Returns a job_id that can be used to track progress via get-import-status. Existing listings with same source+external_id will be updated. Supports all preset fields including video_urls, geo_location, business_hours, social_profiles, and custom_fields.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'source' => [
						'type'        => 'string',
						'description' => __( 'Source identifier for this import (e.g., "dealer-feed").', 'classified-listing' ),
					],
					'items' => [
						'type'        => 'array',
						'description' => __( 'Array of listing items to import.', 'classified-listing' ),
						'items'       => $item_schema,
					],
					'options' => [
						'type'        => 'object',
						'description' => __( 'Import options.', 'classified-listing' ),
						'properties'  => [
							'default_status' => [
								'type'        => 'string',
								'enum'        => [ 'publish', 'pending', 'draft' ],
								'description' => __( 'Default status for new listings. Default: pending.', 'classified-listing' ),
							],
							'update_existing' => [
								'type'        => 'boolean',
								'description' => __( 'Whether to update existing listings. Default: true.', 'classified-listing' ),
							],
							'default_category' => [
								'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
								'description' => __( 'Default category for items without category.', 'classified-listing' ),
							],
							'default_location' => [
								'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
								'description' => __( 'Default location for items without location.', 'classified-listing' ),
							],
							'default_form_id' => [
								'type'        => 'integer',
								'description' => __( 'Default Form Builder form ID for items.', 'classified-listing' ),
							],
							'default_form_slug' => [
								'type'        => 'string',
								'description' => __( 'Default form slug (alternative to default_form_id).', 'classified-listing' ),
							],
							'skip_images' => [
								'type'        => 'boolean',
								'description' => __( 'Skip image processing for faster import. Default: false.', 'classified-listing' ),
							],
						],
					],
				],
				'required' => [ 'source', 'items' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id'      => [ 'type' => 'integer', 'description' => __( 'Import job ID for tracking.', 'classified-listing' ) ],
					'status'      => [ 'type' => 'string', 'description' => __( 'Job status.', 'classified-listing' ) ],
					'total_items' => [ 'type' => 'integer', 'description' => __( 'Total items in the import.', 'classified-listing' ) ],
					'source'      => [ 'type' => 'string', 'description' => __( 'Source identifier.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$source = sanitize_key( $input['source'] ?? '' );
				$items = self::prepareItems( $input['items'] ?? [] );
				if ( is_wp_error( $items ) ) {
					return $items;
				}
				$options = $input['options'] ?? [];

				if ( empty( $source ) ) {
					return new \WP_Error(
						ErrorCodes::MISSING_SOURCE,
						__( 'Source identifier is required.', 'classified-listing' )
					);
				}

				if ( ! is_array( $items ) || empty( $items ) ) {
					return new \WP_Error(
						ErrorCodes::VALIDATION_INVALID_TYPE,
						__( 'Items must be a non-empty array.', 'classified-listing' )
					);
				}

				// Check if ImportRunner class exists (RTCL core dependency)
				if ( ! class_exists( ImportRunner::class ) ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_SYSTEM_ERROR,
						__( 'Import system not available. Please update Classified Listing plugin.', 'classified-listing' )
					);
				}

				// Prepare importer options for form association
				$importer_options = [];
				if ( ! empty( $options['default_form_id'] ) ) {
					$importer_options['default_form_id'] = absint( $options['default_form_id'] );
				}
				if ( ! empty( $options['default_form_slug'] ) ) {
					$importer_options['default_form_slug'] = sanitize_key( $options['default_form_slug'] );
				}

				// Create MCP importer with options
				$importer = new McpImporter( $source, $items, $importer_options );

				// Prepare runner options
				$runner_options = [
					'update_existing' => $options['update_existing'] ?? true,
				];

				if ( ! empty( $options['default_status'] ) ) {
					$allowed_statuses = [ 'publish', 'pending', 'draft' ];
					$status = sanitize_key( $options['default_status'] );
					if ( in_array( $status, $allowed_statuses, true ) ) {
						// Check publish capability
						if ( 'publish' === $status && ! current_user_can( 'publish_rtcl_listings' ) ) {
							$runner_options['default_status'] = 'pending';
						} else {
							$runner_options['default_status'] = $status;
						}
					}
				}

				// Run the import
				$runner = new ImportRunner();
				// Options go in the 3rd argument ($opts); the 2nd ($params) is only passed to the importer's fetch().
				$result = $runner->run_with_importer( $importer, [], $runner_options );

				if ( is_wp_error( $result ) ) {
					return $result;
				}

				return self::formatRunResult( $result, count( $items ), $importer->get_source_key() );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => false,
				],
			],
		] );
	}

	private static function registerGetImportStatus() {
		wp_register_ability( 'rtcl/get-import-status', [
			'label'       => __( 'Get Import Status', 'classified-listing' ),
			'description' => __( 'Get the status and progress of an import job by its ID. Returns counts of imported, updated, skipped, and failed items.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id' => [
						'type'        => 'integer',
						'description' => __( 'The import job ID returned from create-listing-import.', 'classified-listing' ),
					],
				],
				'required' => [ 'job_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id'     => [ 'type' => 'integer' ],
					'status'     => [ 'type' => 'string', 'enum' => [ 'running', 'success', 'partial', 'failed', 'pending', 'processing', 'completed' ], 'description' => __( 'Run status (running, success, partial, failed).', 'classified-listing' ) ],
					'source_key' => [ 'type' => 'string' ],
					'total'      => [ 'type' => 'integer' ],
					'imported'   => [ 'type' => 'integer' ],
					'updated'    => [ 'type' => 'integer' ],
					'skipped'    => [ 'type' => 'integer' ],
					'failed'     => [ 'type' => 'integer' ],
					'started_at' => [ 'type' => 'string' ],
					'finished_at' => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$job_id = absint( $input['job_id'] ?? 0 );

				if ( ! $job_id ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_JOB_NOT_FOUND,
						__( 'Job ID is required.', 'classified-listing' )
					);
				}

				// Check if ImportHistory class exists
				if ( ! class_exists( ImportHistory::class ) ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_SYSTEM_ERROR,
						__( 'Import history system not available.', 'classified-listing' )
					);
				}

				$history = ImportHistory::get( $job_id );

				if ( ! $history ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_JOB_NOT_FOUND,
						__( 'Import job not found.', 'classified-listing' )
					);
				}

				return [
					'job_id'      => $history->id,
					'status'      => $history->status,
					'source_key'  => $history->source_key,
					'total'       => (int) $history->total,
					'imported'    => (int) $history->imported,
					'updated'     => (int) $history->updated,
					'skipped'     => (int) $history->skipped,
					'failed'      => (int) ( $history->total - $history->imported - $history->updated - $history->skipped ),
					'started_at'  => $history->started_at,
					'finished_at' => $history->finished_at,
				];
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

	private static function registerGetImportResults() {
		wp_register_ability( 'rtcl/get-import-results', [
			'label'       => __( 'Get Import Results', 'classified-listing' ),
			'description' => __( 'Get detailed results of an import job including errors and per-item status. Supports pagination for large imports.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id' => [
						'type'        => 'integer',
						'description' => __( 'The import job ID.', 'classified-listing' ),
					],
					'page' => [
						'type'        => 'integer',
						'description' => __( 'Page number. Default: 1.', 'classified-listing' ),
						'default'     => 1,
					],
					'per_page' => [
						'type'        => 'integer',
						'description' => __( 'Results per page. Default: 50.', 'classified-listing' ),
						'default'     => 50,
					],
					'filter' => [
						'type'        => 'string',
						'enum'        => [ 'all', 'errors', 'success' ],
						'description' => __( 'Filter results. Default: all.', 'classified-listing' ),
						'default'     => 'all',
					],
				],
				'required' => [ 'job_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id'   => [ 'type' => 'integer' ],
					'status'   => [ 'type' => 'string' ],
					'total'    => [ 'type' => 'integer' ],
					'page'     => [ 'type' => 'integer' ],
					'per_page' => [ 'type' => 'integer' ],
					'errors'   => [ 'type' => 'array', 'description' => __( 'Array of error details.', 'classified-listing' ) ],
					'results'  => [ 'type' => 'array', 'description' => __( 'Paginated result items.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$job_id = absint( $input['job_id'] ?? 0 );
				$page = max( 1, absint( $input['page'] ?? 1 ) );
				$per_page = min( 100, max( 1, absint( $input['per_page'] ?? 50 ) ) );
				$filter = sanitize_key( $input['filter'] ?? 'all' );

				if ( ! $job_id ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_JOB_NOT_FOUND,
						__( 'Job ID is required.', 'classified-listing' )
					);
				}

				if ( ! class_exists( ImportHistory::class ) ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_SYSTEM_ERROR,
						__( 'Import history system not available.', 'classified-listing' )
					);
				}

				$history = ImportHistory::get( $job_id );

				if ( ! $history ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_JOB_NOT_FOUND,
						__( 'Import job not found.', 'classified-listing' )
					);
				}

				// Parse stored errors
				$errors = [];
				if ( ! empty( $history->errors ) ) {
					$errors = json_decode( $history->errors, true ) ?: [];
				}

				// Build results from post meta
				$results = self::get_import_results_from_meta( $history->source_key, $page, $per_page, $filter );

				return [
					'job_id'   => $history->id,
					'status'   => $history->status,
					'total'    => (int) $history->total,
					'page'     => $page,
					'per_page' => $per_page,
					'errors'   => $errors,
					'results'  => $results,
				];
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
	 * Register import from JSON file ability.
	 */
	private static function registerImportFromJson() {
		wp_register_ability( 'rtcl/import-from-json', [
			'label'       => __( 'Import Listings from JSON', 'classified-listing' ),
			'description' => __( 'Import listings from a JSON file (local path), JSON URL, or direct JSON data. Supports all preset fields including video_urls, geo_location, business_hours, social_profiles, and custom_fields. The JSON can be an array of items or an object with "items", "listings", or "data" key containing the array.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'json_file' => [
						'type'        => 'string',
						'description' => __( 'Path to a .json/.txt file inside the WordPress uploads directory (relative to uploads, or absolute within it).', 'classified-listing' ),
					],
					'json_data' => [
						'type'        => 'string',
						'description' => __( 'Direct JSON string or base64 encoded JSON data.', 'classified-listing' ),
					],
					'json_url' => [
						'type'        => 'string',
						'description' => __( 'URL to fetch JSON from.', 'classified-listing' ),
					],
					'source' => [
						'type'        => 'string',
						'description' => __( 'Source identifier. Can be overridden by JSON content.', 'classified-listing' ),
					],
					'options' => [
						'type'        => 'object',
						'description' => __( 'Import options.', 'classified-listing' ),
						'properties'  => [
							'default_status' => [
								'type'        => 'string',
								'enum'        => [ 'publish', 'pending', 'draft' ],
								'description' => __( 'Default status for new listings. Default: pending.', 'classified-listing' ),
							],
							'update_existing' => [
								'type'        => 'boolean',
								'description' => __( 'Whether to update existing listings. Default: true.', 'classified-listing' ),
							],
							'default_category' => [
								'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
								'description' => __( 'Default category for items without category.', 'classified-listing' ),
							],
							'default_location' => [
								'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
								'description' => __( 'Default location for items without location.', 'classified-listing' ),
							],
							'default_form_id' => [
								'type'        => 'integer',
								'description' => __( 'Default Form Builder form ID for items.', 'classified-listing' ),
							],
							'default_form_slug' => [
								'type'        => 'string',
								'description' => __( 'Default form slug (alternative to default_form_id).', 'classified-listing' ),
							],
							'skip_images' => [
								'type'        => 'boolean',
								'description' => __( 'Skip image processing for faster import. Default: false.', 'classified-listing' ),
							],
							'validate_only' => [
								'type'        => 'boolean',
								'description' => __( 'Only validate, do not import. Default: false.', 'classified-listing' ),
							],
						],
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'job_id'      => [ 'type' => 'integer', 'description' => __( 'Import job ID for tracking.', 'classified-listing' ) ],
					'status'      => [ 'type' => 'string', 'description' => __( 'Job status.', 'classified-listing' ) ],
					'total_items' => [ 'type' => 'integer', 'description' => __( 'Total items in the import.', 'classified-listing' ) ],
					'source'      => [ 'type' => 'string', 'description' => __( 'Source identifier.', 'classified-listing' ) ],
					'validation'  => [ 'type' => 'object', 'description' => __( 'Validation results if validate_only=true.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				// Parse JSON input
				$json_service = new JsonImportService();
				$parsed = $json_service->parseJsonInput( $input );

				if ( is_wp_error( $parsed ) ) {
					return $parsed;
				}

				$items = self::prepareItems( $parsed['items'] ?? [] );
				if ( is_wp_error( $items ) ) {
					return $items;
				}
				if ( empty( $items ) ) {
					return new \WP_Error(
						ErrorCodes::VALIDATION_REQUIRED_FIELD,
						__( 'No items found in JSON data.', 'classified-listing' )
					);
				}

				// Determine source (input param takes precedence, then JSON content)
				$source = ! empty( $input['source'] )
					? sanitize_key( $input['source'] )
					: ( ! empty( $parsed['source'] ) ? sanitize_key( $parsed['source'] ) : 'json-import-' . time() );

				// Merge options from input and JSON. Fetched JSON (file/URL) may only carry harmless options;
				// status / update behaviour comes from the caller, not from third-party content.
				$options = array_merge(
					array_intersect_key( (array) ( $parsed['options'] ?? [] ), array_flip( [ 'validate_only', 'default_form_id', 'default_form_slug' ] ) ),
					$input['options'] ?? []
				);

				// Handle validate_only option
				if ( ! empty( $options['validate_only'] ) ) {
					$validation_service = new ValidationService();
					$validation = $validation_service->validateBatch( $source, $items );

					return [
						'status'      => 'validated',
						'total_items' => count( $items ),
						'source'      => $source,
						'validation'  => $validation,
					];
				}

				// Check if ImportRunner class exists (RTCL core dependency)
				if ( ! class_exists( ImportRunner::class ) ) {
					return new \WP_Error(
						ErrorCodes::IMPORT_SYSTEM_ERROR,
						__( 'Import system not available. Please update Classified Listing plugin.', 'classified-listing' )
					);
				}

				// Prepare importer options for form association
				$importer_options = [];
				if ( ! empty( $options['default_form_id'] ) ) {
					$importer_options['default_form_id'] = absint( $options['default_form_id'] );
				}
				if ( ! empty( $options['default_form_slug'] ) ) {
					$importer_options['default_form_slug'] = sanitize_key( $options['default_form_slug'] );
				}

				// Create MCP importer with options
				$importer = new McpImporter( $source, $items, $importer_options );

				// Prepare runner options
				$runner_options = [
					'update_existing' => $options['update_existing'] ?? true,
				];

				if ( ! empty( $options['default_status'] ) ) {
					$allowed_statuses = [ 'publish', 'pending', 'draft' ];
					$status = sanitize_key( $options['default_status'] );
					if ( in_array( $status, $allowed_statuses, true ) ) {
						if ( 'publish' === $status && ! current_user_can( 'publish_rtcl_listings' ) ) {
							$runner_options['default_status'] = 'pending';
						} else {
							$runner_options['default_status'] = $status;
						}
					}
				}

				// Run the import
				$runner = new ImportRunner();
				// Options go in the 3rd argument ($opts); the 2nd ($params) is only passed to the importer's fetch().
				$result = $runner->run_with_importer( $importer, [], $runner_options );

				if ( is_wp_error( $result ) ) {
					return $result;
				}

				return self::formatRunResult( $result, count( $items ), $importer->get_source_key() );
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => false,
					'idempotent'  => false,
				],
			],
		] );
	}

	/**
	 * Register get import schema ability.
	 */
	private static function registerGetImportSchema() {
		wp_register_ability( 'rtcl/get-import-schema', [
			'label'       => __( 'Get Import Schema', 'classified-listing' ),
			'description' => __( 'Get the complete JSON schema for listing imports including all preset fields, custom field types, and example structure. Use this to understand the expected format before creating import files.', 'classified-listing' ),
			'category'    => 'rtcl-imports',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'include_example' => [
						'type'        => 'boolean',
						'description' => __( 'Include a complete example JSON structure. Default: true.', 'classified-listing' ),
						'default'     => true,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'item_schema'   => [ 'type' => 'object', 'description' => __( 'JSON Schema for each import item.', 'classified-listing' ) ],
					'field_types'   => [ 'type' => 'object', 'description' => __( 'Documentation for each field type.', 'classified-listing' ) ],
					'example'       => [ 'type' => 'object', 'description' => __( 'Complete example JSON structure.', 'classified-listing' ) ],
					'pro_features'  => [ 'type' => 'object', 'description' => __( 'Optional feature availability.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$include_example = $input['include_example'] ?? true;

				$result = [
					'item_schema' => self::getItemSchema(),
					'field_types' => [
						'text' => [
							'input'   => 'string',
							'example' => 'Hello World',
						],
						'textarea' => [
							'input'   => 'string',
							'example' => "Line 1\nLine 2\nLine 3",
						],
						'number' => [
							'input'   => 'number',
							'example' => 42.5,
						],
						'select' => [
							'input'   => 'string',
							'example' => 'option_value',
						],
						'radio' => [
							'input'   => 'string',
							'example' => 'option_value',
						],
						'checkbox' => [
							'input'   => 'boolean | string | array',
							'example' => [ 'option1', 'option2' ],
						],
						'date' => [
							'input'   => 'string (YYYY-MM-DD)',
							'example' => '2024-01-15',
						],
						'date_range' => [
							'input'   => 'object {start, end}',
							'example' => [ 'start' => '2024-01-01', 'end' => '2024-12-31' ],
						],
						'datetime' => [
							'input'   => 'string (YYYY-MM-DD HH:MM:SS)',
							'example' => '2024-01-15 14:30:00',
						],
						'url' => [
							'input'   => 'string (valid URL)',
							'example' => 'https://example.com',
						],
						'email' => [
							'input'   => 'string (valid email)',
							'example' => 'user@example.com',
						],
						'color' => [
							'input'   => 'string (#RRGGBB)',
							'example' => '#FF5500',
						],
						'file' => [
							'input'   => 'string (URL or local path) | integer (attachment ID)',
							'example' => 'https://example.com/document.pdf',
						],
						'geo_location' => [
							'input'   => 'object {latitude, longitude, address}',
							'example' => [ 'latitude' => 40.7128, 'longitude' => -74.0060, 'address' => '123 Main St, NY' ],
						],
						'business_hours' => [
							'input'       => 'object with day keys',
							'example'     => [ 'monday' => [ 'open' => '09:00', 'close' => '17:00' ] ],
							'requires_pro' => true,
						],
						'social_profiles' => [
							'input'       => 'object with network keys',
							'example'     => [ 'facebook' => 'https://facebook.com/page' ],
							'requires_pro' => true,
						],
					],
					'json_formats' => [
						'array_format' => [
							'description' => __( 'Simple array of items', 'classified-listing' ),
							'example'     => '[{...}, {...}]',
						],
						'object_format' => [
							'description' => __( 'Object with items, source, and options', 'classified-listing' ),
							'example'     => '{"source": "my-source", "options": {...}, "items": [{...}]}',
						],
						'supported_keys' => [ 'items', 'listings', 'data', 'records' ],
					],
					/**
					 * Filter the feature availability reported by the import schema.
					 * Add-ons flag themselves via `pro_active` and add the features they own.
					 *
					 * @param array $pro_features [ 'pro_active' => bool, 'features' => [ id => bool ] ].
					 */
					'pro_features' => apply_filters( 'rtcl_mcp_import_features', [
						'pro_active' => false,
						'features'   => [
							'video_urls'      => true,
							'business_hours'  => true,
							'social_profiles' => true,
						],
					] ),
				];

				if ( $include_example ) {
					$result['example'] = JsonImportService::getExampleStructure();
				}

				return $result;
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
	 * Get import results from post meta.
	 *
	 * @param string $source_key Source key.
	 * @param int    $page       Page number.
	 * @param int    $per_page   Per page limit.
	 * @param string $filter     Filter type (all, errors, success).
	 *
	 * @return array Results array.
	 */
	private static function get_import_results_from_meta( string $source_key, int $page, int $per_page, string $filter ): array {
		$offset = ( $page - 1 ) * $per_page;

		// Query posts with import meta
		$query_args = [
			'post_type'      => rtcl()->post_type,
			'post_status'    => 'any',
			'posts_per_page' => $per_page,
			'offset'         => $offset,
			'meta_query'     => [
				[
					'key'   => '_rtcl_import_source',
					'value' => $source_key,
				],
			],
			'orderby'        => 'ID',
			'order'          => 'DESC',
		];

		$query = new \WP_Query( $query_args );

		if ( empty( $query->posts ) ) {
			return [];
		}

		// Batch load all post meta to avoid N+1 queries
		$post_ids = wp_list_pluck( $query->posts, 'ID' );
		update_meta_cache( 'post', $post_ids );

		$results = [];
		foreach ( $query->posts as $post ) {
			$results[] = [
				'listing_id'  => $post->ID,
				'external_id' => get_post_meta( $post->ID, '_rtcl_import_source_id', true ),
				'title'       => $post->post_title,
				'status'      => $post->post_status,
				'imported_at' => get_post_meta( $post->ID, '_rtcl_imported_at', true ),
				'url'         => get_permalink( $post->ID ),
			];
		}

		return $results;
	}

	/**
	 * Keep only object items and cap the batch size (each item can create a listing and download images).
	 *
	 * @param mixed $items Raw items.
	 *
	 * @return array|\WP_Error
	 */
	private static function prepareItems( $items ) {
		$items = array_values( array_filter( (array) $items, 'is_array' ) );
		$max   = max( 1, (int) apply_filters( 'rtcl_mcp_max_import_items', 500 ) );

		if ( count( $items ) > $max ) {
			return new \WP_Error(
				'too_many_items',
				sprintf(
					/* translators: %d: maximum number of items */
					__( 'Too many items in one request. Maximum: %d. Split the import into smaller batches.', 'classified-listing' ),
					$max
				)
			);
		}

		return $items;
	}

	/**
	 * Import response from an ImportRunner result: the real outcome instead of a fixed "completed".
	 *
	 * @param array  $result      ImportRunner result (counters, run_id, errors).
	 * @param int    $total_items Items sent.
	 * @param string $source      Source key.
	 *
	 * @return array
	 */
	private static function formatRunResult( array $result, int $total_items, string $source ): array {
		$imported = (int) ( $result['imported'] ?? 0 );
		$updated  = (int) ( $result['updated'] ?? 0 );
		$skipped  = (int) ( $result['skipped'] ?? 0 );
		$errors   = array_values( array_filter( (array) ( $result['errors'] ?? [] ), 'is_scalar' ) );

		if ( $imported + $updated > 0 ) {
			$status = empty( $errors ) && 0 === $skipped ? 'completed' : 'completed_with_errors';
		} else {
			$status = empty( $errors ) ? 'completed' : 'failed';
		}

		return [
			'job_id'      => absint( $result['run_id'] ?? 0 ),
			'status'      => $status,
			'total_items' => $total_items,
			'imported'    => $imported,
			'updated'     => $updated,
			'skipped'     => $skipped,
			'errors'      => array_slice( $errors, 0, 20 ),
			'source'      => $source,
		];
	}
}
