<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Services\ListingService;
use Rtcl\Services\Mcp\Services\SearchService;
use Rtcl\Services\Mcp\Services\StatisticsService;
use Rtcl\Services\Mcp\Services\FormAwareListingService;
use Rtcl\Services\Mcp\Services\Import\SchemaService;
use Rtcl\Services\Mcp\Services\Import\UpsertService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers all listing-related abilities with the WordPress Abilities API.
 */
class ListingAbilities {

	public static function register() {
		self::registerGetListing();
		self::registerSearchListings();
		self::registerGetListingStatistics();
		self::registerCreateListing();
		self::registerUpdateListing();
		self::registerDeleteListing();
		self::registerChangeListingStatus();
		self::registerUpdateListingFlags();
		self::registerUpdateListingPrice();
		self::registerSetFeaturedImage();
		self::registerAddGalleryImages();
		self::registerGetListingSchema();
		self::registerUpsertListing();
		self::registerGetFormFields();
		self::registerValidateListingData();
		// Gallery management abilities
		self::registerGetGalleryImages();
		self::registerDeleteGalleryImages();
		self::registerClearGalleryImages();
		self::registerRemoveFeaturedImage();
	}

	private static function registerGetListing() {
		wp_register_ability( 'rtcl/get-listing', [
			'label'       => __( 'Get Listing', 'classified-listing' ),
			'description' => __( 'Get details of a classified listing by its ID. Returns title, description, price, status, category, location, tags, images, contact info, custom fields, and more. Use when the user asks to view or inspect a specific listing.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'The listing ID to retrieve.', 'classified-listing' ),
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing' => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new ListingService();
				$result  = $service->getListing( absint( $input['listing_id'] ) );
				if ( is_wp_error( $result ) ) {
					return $result;
				}
				return [ 'listing' => $result ];
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
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

	private static function registerSearchListings() {
		wp_register_ability( 'rtcl/search-listings', [
			'label'       => __( 'Search Listings', 'classified-listing' ),
			'description' => __( 'Search and filter classified listings using keyword, category, location, price range, status, featured, tags, author, dates, listing type, form/directory, custom fields, and rating. Supports pagination and sorting. Use when the user asks to find, search, filter, list, or compare listings.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					// Basic search
					'keyword'      => [ 'type' => 'string', 'description' => __( 'Search keyword for titles and descriptions.', 'classified-listing' ) ],
					// Taxonomy filters - support ID, slug, name, or array
					'category_id'  => [ 'type' => 'integer', 'description' => __( 'Filter by category ID (includes children). Deprecated: use category instead.', 'classified-listing' ) ],
					'category'     => [
						'oneOf' => [
							[ 'type' => 'integer' ],
							[ 'type' => 'string' ],
							[ 'type' => 'array', 'items' => [ 'oneOf' => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ] ] ],
						],
						'description' => __( 'Filter by category ID, slug, name, or array of any. Includes children.', 'classified-listing' ),
					],
					'location_id'  => [ 'type' => 'integer', 'description' => __( 'Filter by location ID (includes children). Deprecated: use location instead.', 'classified-listing' ) ],
					'location'     => [
						'oneOf' => [
							[ 'type' => 'integer' ],
							[ 'type' => 'string' ],
							[ 'type' => 'array', 'items' => [ 'oneOf' => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ] ] ],
						],
						'description' => __( 'Filter by location ID, slug, name, or array of any. Includes children.', 'classified-listing' ),
					],
					'tags'         => [ 'type' => 'array', 'items' => [ 'type' => 'string' ], 'description' => __( 'Filter by tag names or slugs.', 'classified-listing' ) ],
					// Price filters
					'price_min'    => [ 'type' => 'number', 'description' => __( 'Minimum price filter.', 'classified-listing' ) ],
					'price_max'    => [ 'type' => 'number', 'description' => __( 'Maximum price filter.', 'classified-listing' ) ],
					'price_type'   => [ 'type' => 'string', 'enum' => [ 'regular', 'on_call', 'negotiable', 'fixed' ], 'description' => __( 'Filter by price type.', 'classified-listing' ) ],
					// Type and status
					'listing_type' => [ 'type' => 'string', 'enum' => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ], 'description' => __( 'Filter by listing type.', 'classified-listing' ) ],
					'status'       => [ 'type' => 'string', 'enum' => [ 'publish', 'pending', 'draft', 'rtcl-reviewed', 'rtcl-expired' ], 'description' => __( 'Filter by status. Default: publish.', 'classified-listing' ) ],
					// Flags
					'featured'     => [ 'type' => 'boolean', 'description' => __( 'Filter by featured status.', 'classified-listing' ) ],
					// Form/Directory filter
					'form_id'      => [ 'type' => 'integer', 'description' => __( 'Filter by Form Builder form ID (directory type).', 'classified-listing' ) ],
					// Author and dates
					'author'       => [ 'type' => 'integer', 'description' => __( 'Filter by author user ID.', 'classified-listing' ) ],
					'date_from'    => [ 'type' => 'string', 'description' => __( 'Filter from date (YYYY-MM-DD).', 'classified-listing' ) ],
					'date_to'      => [ 'type' => 'string', 'description' => __( 'Filter to date (YYYY-MM-DD).', 'classified-listing' ) ],
					// Rating filters
					'min_rating'   => [ 'type' => 'number', 'description' => __( 'Minimum average rating (1-5).', 'classified-listing' ) ],
					'max_rating'   => [ 'type' => 'number', 'description' => __( 'Maximum average rating (1-5).', 'classified-listing' ) ],
					'has_reviews'  => [ 'type' => 'boolean', 'description' => __( 'Filter to only listings with reviews.', 'classified-listing' ) ],
					// Custom fields filter
					'custom_fields' => [
						'type'        => 'object',
						'description' => __( 'Filter by custom field values. Keys are field names/meta_keys. Values can be: simple value (exact match), array (IN match), or object {value, compare, type} for advanced queries.', 'classified-listing' ),
						'additionalProperties' => true,
					],
					// Pagination and sorting
					'page'         => [ 'type' => 'integer', 'description' => __( 'Page number. Default: 1.', 'classified-listing' ), 'default' => 1 ],
					'per_page'     => [ 'type' => 'integer', 'description' => __( 'Results per page (1-100). Default: 20.', 'classified-listing' ), 'default' => 20 ],
					'orderby'      => [ 'type' => 'string', 'enum' => [ 'date', 'modified', 'title', 'price', 'views', 'rand', 'ID' ], 'description' => __( 'Sort field. Default: date.', 'classified-listing' ), 'default' => 'date' ],
					'order'        => [ 'type' => 'string', 'enum' => [ 'ASC', 'DESC' ], 'description' => __( 'Sort order. Default: DESC.', 'classified-listing' ), 'default' => 'DESC' ],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'total'    => [ 'type' => 'integer' ],
					'page'     => [ 'type' => 'integer' ],
					'per_page' => [ 'type' => 'integer' ],
					'listings' => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new SearchService();
				return $service->search( $input );
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
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

	private static function registerGetListingStatistics() {
		wp_register_ability( 'rtcl/get-listing-statistics', [
			'label'       => __( 'Get Listing Statistics', 'classified-listing' ),
			'description' => __( 'Get aggregate statistics: total listings by status (published, pending, draft, expired), featured count, and sold count. Supports filters by category, location, author, and date range. Use when the user asks about listing counts or overview numbers.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'category_id' => [ 'type' => 'integer', 'description' => __( 'Filter by category ID.', 'classified-listing' ) ],
					'location_id' => [ 'type' => 'integer', 'description' => __( 'Filter by location ID.', 'classified-listing' ) ],
					'author_id'   => [ 'type' => 'integer', 'description' => __( 'Filter by author user ID.', 'classified-listing' ) ],
					'date_from'   => [ 'type' => 'string', 'description' => __( 'From date (YYYY-MM-DD).', 'classified-listing' ) ],
					'date_to'     => [ 'type' => 'string', 'description' => __( 'To date (YYYY-MM-DD).', 'classified-listing' ) ],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'statistics' => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new StatisticsService();
				return [ 'statistics' => $service->getStatistics( $input ) ];
			},
			'permission_callback' => CapabilityHelper::getReadStatsCallback(),
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

	private static function registerCreateListing() {
		wp_register_ability( 'rtcl/create-listing', [
			'label'       => __( 'Create Listing', 'classified-listing' ),
			'description' => __( 'Create a new classified listing. SMART WORKFLOW: If form_id is not provided and multiple forms exist, returns action_required=true with form options for user selection. If required fields are missing, returns action_required=true with missing_fields list. When action_required=true, present the options/questions to the user, collect their response, and call this ability again with the collected data.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					// Form selection
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to use. If not provided, auto-detected from category or uses default form.', 'classified-listing' ),
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
					'slug' => [
						'type'        => 'string',
						'description' => __( 'URL slug. Auto-generated from title if not provided.', 'classified-listing' ),
					],
					'description' => [
						'type'        => 'string',
						'description' => __( 'Full listing description. HTML allowed.', 'classified-listing' ),
					],
					'excerpt' => [
						'type'        => 'string',
						'description' => __( 'Short summary.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'pending', 'draft', 'private' ],
						'description' => __( 'Listing status. Optional - if not specified, uses the site\'s "New Listing Status" setting (General Settings > Listings > New Listing Status). Publishing/private requires capability.', 'classified-listing' ),
					],
					// Taxonomies
					'category' => [
						'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
						'description' => __( 'Category ID, slug, name, or path (e.g., "Electronics > Phones").', 'classified-listing' ),
					],
					'location' => [
						'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
						'description' => __( 'Location ID, slug, name, or path.', 'classified-listing' ),
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
					'price_type' => [
						'type'        => 'string',
						'enum'        => [ 'regular', 'on_call', 'negotiable', 'fixed' ],
						'description' => __( 'Price type.', 'classified-listing' ),
					],
					'listing_type' => [
						'type'        => 'string',
						'enum'        => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ],
						'description' => __( 'Listing type (ad type).', 'classified-listing' ),
					],
					// Media
					'images' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Image URLs to download and attach. First becomes featured image.', 'classified-listing' ),
					],
					'video_urls' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'YouTube/Vimeo video URLs.', 'classified-listing' ),
					],
					// Contact info
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
							'latitude'  => [ 'type' => 'number' ],
							'longitude' => [ 'type' => 'number' ],
							'address'   => [ 'type' => 'string' ],
						],
						'description' => __( 'Geographic coordinates.', 'classified-listing' ),
					],
					// Contact person
					'contact_person' => [
						'type'        => 'string',
						'description' => __( 'Contact person name.', 'classified-listing' ),
					],
					// Business hours
					'business_hours' => [
						'type'        => 'object',
						'description' => __( 'Business hours by day. Format: {"monday": {"open": "09:00", "close": "17:00"}, ...}.', 'classified-listing' ),
						'additionalProperties' => [
							'type'       => 'object',
							'properties' => [
								'active' => [ 'type' => 'boolean', 'description' => __( 'Whether business is open this day.', 'classified-listing' ) ],
								'open'   => [ 'type' => 'string', 'description' => __( 'Opening time (HH:MM).', 'classified-listing' ) ],
								'close'  => [ 'type' => 'string', 'description' => __( 'Closing time (HH:MM).', 'classified-listing' ) ],
								'slots'  => [
									'type'  => 'array',
									'items' => [
										'type'       => 'object',
										'properties' => [
											'open'  => [ 'type' => 'string' ],
											'close' => [ 'type' => 'string' ],
										],
									],
									'description' => __( 'Multiple time slots for the day.', 'classified-listing' ),
								],
							],
						],
					],
					// Social profiles
					'social_profiles' => [
						'type'        => 'object',
						'description' => __( 'Social profile URLs. Format: {"facebook": "https://...", "twitter": "https://...", ...}.', 'classified-listing' ),
						'additionalProperties' => [ 'type' => 'string' ],
					],
					// Custom fields from form
					'custom_fields' => [
						'type'        => 'object',
						'description' => __( 'Custom field values. Keys must match field names from the selected form. Use rtcl/get-form-fields to discover available fields. Supports: text, textarea, number, select, radio, checkbox (array), date (YYYY-MM-DD), date_range ({start, end}), date_time, url, email, file (URL or ID), color_picker (#RRGGBB).', 'classified-listing' ),
					],
					// Validation options
					'strict_validation' => [
						'type'        => 'boolean',
						'description' => __( 'If true, fail if unknown custom_fields are provided. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
					'require_form' => [
						'type'        => 'boolean',
						'description' => __( 'If true, fail if no form can be resolved. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'title' ],
			],
			'output_schema' => [
				'oneOf' => [
					// Success response
					[
						'type'       => 'object',
						'properties' => [
							'listing_id' => [ 'type' => 'integer', 'description' => __( 'Created listing ID.', 'classified-listing' ) ],
							'title'      => [ 'type' => 'string', 'description' => __( 'Listing title.', 'classified-listing' ) ],
							'slug'       => [ 'type' => 'string', 'description' => __( 'Listing slug.', 'classified-listing' ) ],
							'status'     => [ 'type' => 'string', 'description' => __( 'Listing status.', 'classified-listing' ) ],
							'form_id'    => [ 'type' => 'integer', 'description' => __( 'Form ID used.', 'classified-listing' ) ],
							'url'        => [ 'type' => 'string', 'description' => __( 'Listing URL.', 'classified-listing' ) ],
							'message'    => [ 'type' => 'string', 'description' => __( 'Result message.', 'classified-listing' ) ],
						],
						// Each branch needs its own required key, otherwise every response matches both and oneOf fails.
						'required'   => [ 'listing_id' ],
					],
					// Interactive prompt - form selection
					[
						'type'       => 'object',
						'properties' => [
							'action_required' => [ 'type' => 'boolean', 'const' => true, 'description' => __( 'Indicates user input is needed.', 'classified-listing' ) ],
							'prompt_type'     => [ 'type' => 'string', 'enum' => [ 'form_selection', 'required_fields' ], 'description' => __( 'Type of prompt.', 'classified-listing' ) ],
							'message'         => [ 'type' => 'string', 'description' => __( 'Message to show user.', 'classified-listing' ) ],
							'instruction'     => [ 'type' => 'string', 'description' => __( 'Instructions for the AI client.', 'classified-listing' ) ],
							'options'         => [ 'type' => 'array', 'description' => __( 'Available options (for form_selection).', 'classified-listing' ) ],
							'missing_fields'  => [ 'type' => 'array', 'description' => __( 'Missing required fields (for required_fields).', 'classified-listing' ) ],
							'suggested_questions' => [ 'type' => 'array', 'description' => __( 'Natural language questions to ask user.', 'classified-listing' ) ],
						],
						'required'   => [ 'action_required' ],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormAwareListingService();
				return $service->createListing( $input );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerUpdateListing() {
		wp_register_ability( 'rtcl/update-listing', [
			'label'       => __( 'Update Listing', 'classified-listing' ),
			'description' => __( 'Update an existing listing with form-aware field validation. Uses the form associated with the listing, or specify a new form_id. Supports all preset and custom fields.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to update. Required.', 'classified-listing' ),
					],
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Change the form associated with this listing.', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'New title.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'New URL slug.', 'classified-listing' ),
					],
					'description' => [
						'type'        => 'string',
						'description' => __( 'New description.', 'classified-listing' ),
					],
					'excerpt' => [
						'type'        => 'string',
						'description' => __( 'New excerpt.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'pending', 'draft', 'private' ],
						'description' => __( 'New status. Optional - if not specified, uses the site\'s "Edited Listing Status" setting if configured (General Settings > Listings). Publishing/private requires capability.', 'classified-listing' ),
					],
					'category' => [
						'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
						'description' => __( 'New category.', 'classified-listing' ),
					],
					'location' => [
						'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
						'description' => __( 'New location.', 'classified-listing' ),
					],
					'tags' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'New tags.', 'classified-listing' ),
					],
					'price' => [
						'type'        => 'number',
						'description' => __( 'New price.', 'classified-listing' ),
					],
					'price_type' => [
						'type'        => 'string',
						'enum'        => [ 'regular', 'on_call', 'negotiable', 'fixed' ],
						'description' => __( 'New price type.', 'classified-listing' ),
					],
					'listing_type' => [
						'type'        => 'string',
						'enum'        => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ],
						'description' => __( 'New listing type.', 'classified-listing' ),
					],
					'images' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'New images (replaces existing).', 'classified-listing' ),
					],
					'contact' => [
						'type'        => 'object',
						'properties'  => [
							'email'          => [ 'type' => 'string' ],
							'phone'          => [ 'type' => 'string' ],
							'whatsapp'       => [ 'type' => 'string' ],
							'website'        => [ 'type' => 'string' ],
							'address'        => [ 'type' => 'string' ],
							'zipcode'        => [ 'type' => 'string' ],
							'contact_person' => [ 'type' => 'string' ],
						],
						'description' => __( 'Contact information.', 'classified-listing' ),
					],
					'geo_location' => [
						'type'        => 'object',
						'properties'  => [
							'latitude'  => [ 'type' => 'number' ],
							'longitude' => [ 'type' => 'number' ],
							'address'   => [ 'type' => 'string' ],
						],
						'description' => __( 'Geographic coordinates.', 'classified-listing' ),
					],
					'video_urls' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'YouTube/Vimeo video URLs.', 'classified-listing' ),
					],
					'business_hours' => [
						'type'        => 'object',
						'description' => __( 'Business hours by day.', 'classified-listing' ),
					],
					'social_profiles' => [
						'type'        => 'object',
						'description' => __( 'Social profile URLs.', 'classified-listing' ),
					],
					'custom_fields' => [
						'type'        => 'object',
						'description' => __( 'Custom field values keyed by field name. Supports: text, textarea, number, select, radio, checkbox, date, date_range, date_time, url, email, file, color_picker.', 'classified-listing' ),
					],
					'strict_validation' => [
						'type'        => 'boolean',
						'description' => __( 'Validate custom_fields against form schema.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer' ],
					'title'      => [ 'type' => 'string' ],
					'slug'       => [ 'type' => 'string' ],
					'status'     => [ 'type' => 'string' ],
					'form_id'    => [ 'type' => 'integer' ],
					'url'        => [ 'type' => 'string' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = absint( $input['listing_id'] ?? 0 );
				$post = get_post( $listing_id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}
				$listing = new \Rtcl\Models\Listing( $post );
				if ( ! $listing->can_edit() && ! current_user_can( 'edit_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot edit this listing.', 'classified-listing' ) );
				}
				$service = new FormAwareListingService();
				return $service->updateListing( $listing_id, $input );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerDeleteListing() {
		wp_register_ability( 'rtcl/delete-listing', [
			'label'       => __( 'Delete Listing', 'classified-listing' ),
			'description' => __( 'Delete a listing. By default moves to trash; use force_delete=true to permanently delete. Returns info about orphaned attachments (gallery images) which are not automatically deleted.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to delete. Required.', 'classified-listing' ),
					],
					'force_delete' => [
						'type'        => 'boolean',
						'description' => __( 'Permanently delete (bypass trash). Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'             => [ 'type' => 'integer', 'description' => __( 'Deleted listing ID.', 'classified-listing' ) ],
					'title'                  => [ 'type' => 'string', 'description' => __( 'Listing title.', 'classified-listing' ) ],
					'force_delete'           => [ 'type' => 'boolean', 'description' => __( 'Whether permanently deleted.', 'classified-listing' ) ],
					'orphaned_attachment_ids' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'integer' ],
						'description' => __( 'Gallery image attachment IDs not deleted.', 'classified-listing' ),
					],
					'message'                => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = absint( $input['listing_id'] ?? 0 );

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}

				$post = get_post( $listing_id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				// Check permissions - owner or admin
				if ( (int) $post->post_author !== get_current_user_id() && ! current_user_can( 'delete_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot delete this listing.', 'classified-listing' ) );
				}

				// Prompt user if force_delete not specified
				if ( ! array_key_exists( 'force_delete', $input ) ) {
					return [
						'action_required' => true,
						'prompt'          => sprintf(
							__( 'How would you like to delete listing "%s" (ID: %d)?', 'classified-listing' ),
							$post->post_title,
							$listing_id
						),
						'options'         => [
							[
								'value'       => 'trash',
								'label'       => __( 'Move to Trash', 'classified-listing' ),
								'description' => __( 'The listing can be restored later from the trash.', 'classified-listing' ),
							],
							[
								'value'       => 'permanent',
								'label'       => __( 'Delete Permanently', 'classified-listing' ),
								'description' => __( 'The listing will be permanently deleted and cannot be recovered.', 'classified-listing' ),
							],
						],
						'callback_params' => [
							'listing_id'   => $listing_id,
							'title'        => $post->post_title,
						],
						'instructions'    => __( 'Please call rtcl/delete-listing again with force_delete=false (trash) or force_delete=true (permanent).', 'classified-listing' ),
					];
				}

				$force_delete = ! empty( $input['force_delete'] );

				$service = new ListingService();
				return $service->deleteListing( $listing_id, $force_delete );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => false,
					'destructive' => true,
					'idempotent'  => false,
				],
			],
		] );
	}

	private static function registerChangeListingStatus() {
		wp_register_ability( 'rtcl/change-listing-status', [
			'label'       => __( 'Change Listing Status', 'classified-listing' ),
			'description' => __( 'Change listing status to publish, pending, draft, rtcl-reviewed, or rtcl-expired. Publishing requires the publish capability. Use when the user asks to publish, unpublish, or approve a listing.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer', 'description' => __( 'Listing ID.', 'classified-listing' ) ],
					'status'     => [ 'type' => 'string', 'enum' => [ 'publish', 'pending', 'draft', 'rtcl-reviewed', 'rtcl-expired' ], 'description' => __( 'New status.', 'classified-listing' ) ],
				],
				'required' => [ 'listing_id', 'status' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer' ],
					'old_status' => [ 'type' => 'string' ],
					'new_status' => [ 'type' => 'string' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$id     = absint( $input['listing_id'] );
				$status = sanitize_key( $input['status'] );
				$allowed = [ 'publish', 'pending', 'draft', 'rtcl-reviewed', 'rtcl-expired' ];
				if ( ! in_array( $status, $allowed, true ) ) {
					return new \WP_Error( 'invalid_status', __( 'Invalid status.', 'classified-listing' ) );
				}
				$post = get_post( $id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}
				if ( 'publish' === $status && ! current_user_can( 'publish_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot publish listings.', 'classified-listing' ) );
				}
				if ( (int) $post->post_author !== get_current_user_id() && ! current_user_can( 'edit_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot modify this listing.', 'classified-listing' ) );
				}
				$service = new ListingService();
				return $service->changeStatus( $id, $status );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerUpdateListingFlags() {
		wp_register_ability( 'rtcl/update-listing-flags', [
			'label'       => __( 'Update Listing Flags', 'classified-listing' ),
			'description' => __( 'Update listing flags such as featured status. Use when the user asks to mark a listing as featured or unfeatured.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer', 'description' => __( 'Listing ID.', 'classified-listing' ) ],
					'featured'   => [ 'type' => 'boolean', 'description' => __( 'Set featured status.', 'classified-listing' ) ],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer' ],
					'changes'    => [ 'type' => 'object' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$id = absint( $input['listing_id'] );
				$flags = [];
				if ( isset( $input['featured'] ) ) {
					$flags['featured'] = (bool) $input['featured'];
				}
				/**
				 * Filter the flags collected from the ability input, so add-ons can accept flags they own.
				 *
				 * @param array $flags Flags to update, e.g. [ 'featured' => true ].
				 * @param array $input Raw ability input.
				 */
				$flags = apply_filters( 'rtcl_mcp_listing_flags_input', $flags, $input );
				if ( empty( $flags ) ) {
					return new \WP_Error( 'invalid_parameter', __( 'Provide at least one flag to update.', 'classified-listing' ) );
				}
				$service = new ListingService();
				return $service->updateFlags( $id, $flags );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerUpdateListingPrice() {
		wp_register_ability( 'rtcl/update-listing-price', [
			'label'       => __( 'Update Listing Price', 'classified-listing' ),
			'description' => __( 'Update the price of a classified listing. Use when the user asks to change or set a listing\'s price.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer', 'description' => __( 'Listing ID.', 'classified-listing' ) ],
					'price'      => [ 'type' => 'number', 'description' => __( 'New price (non-negative).', 'classified-listing' ) ],
				],
				'required' => [ 'listing_id', 'price' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [ 'type' => 'integer' ],
					'old_price'  => [ 'type' => 'number' ],
					'new_price'  => [ 'type' => 'number' ],
					'message'    => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$id    = absint( $input['listing_id'] );
				$price = $input['price'];
				if ( ! is_numeric( $price ) || $price < 0 ) {
					return new \WP_Error( 'invalid_price', __( 'Price must be a non-negative number.', 'classified-listing' ) );
				}
				$post = get_post( $id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}
				if ( (int) $post->post_author !== get_current_user_id() && ! current_user_can( 'edit_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot modify this listing.', 'classified-listing' ) );
				}
				$service = new ListingService();
				return $service->updatePrice( $id, (float) $price );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerSetFeaturedImage() {
		wp_register_ability( 'rtcl/set-featured-image', [
			'label'       => __( 'Set Featured Image', 'classified-listing' ),
			'description' => __( 'Set or update the featured image for a listing. Accepts: (1) Image URL - downloaded and attached, (2) WordPress attachment ID, (3) Local file path on server, (4) Base64 encoded image data (with or without data:image/... prefix). Images are resized to max 1200px width.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to set featured image for.', 'classified-listing' ),
					],
					'image' => [
						'oneOf' => [
							[ 'type' => 'string', 'description' => __( 'Image URL, local file path, or base64 encoded data (with or without data:image/TYPE;base64, prefix).', 'classified-listing' ) ],
							[ 'type' => 'integer', 'description' => __( 'Existing WordPress attachment ID.', 'classified-listing' ) ],
						],
						'description' => __( 'Image source: URL, attachment ID, local path, or base64 data.', 'classified-listing' ),
					],
				],
				'required' => [ 'listing_id', 'image' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'        => [ 'type' => 'integer', 'description' => __( 'The listing ID.', 'classified-listing' ) ],
					'attachment_id'     => [ 'type' => 'integer', 'description' => __( 'The attachment ID of the featured image.', 'classified-listing' ) ],
					'url'               => [ 'type' => 'string', 'description' => __( 'URL of the featured image.', 'classified-listing' ) ],
					'dimensions'        => [
						'type'        => 'object',
						'description' => __( 'Image dimensions after processing (max 1200px width, maintains ratio).', 'classified-listing' ),
						'properties'  => [
							'width'  => [ 'type' => 'integer' ],
							'height' => [ 'type' => 'integer' ],
						],
					],
					'old_attachment_id' => [ 'type' => [ 'integer', 'null' ], 'description' => __( 'Previous featured image attachment ID (null if none).', 'classified-listing' ) ],
					'old_url'           => [ 'type' => [ 'string', 'null' ], 'description' => __( 'Previous featured image URL (null if none).', 'classified-listing' ) ],
					'message'           => [ 'type' => 'string', 'description' => __( 'Result message.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = absint( $input['listing_id'] ?? 0 );
				$image = $input['image'] ?? '';

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}
				if ( empty( $image ) ) {
					return new \WP_Error( 'missing_image', __( 'Image URL or attachment ID is required.', 'classified-listing' ) );
				}

				$post = get_post( $listing_id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				// Check ownership
				if ( (int) $post->post_author !== get_current_user_id() && ! current_user_can( 'edit_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot modify this listing.', 'classified-listing' ) );
				}

				$service = new ListingService();
				return $service->setFeaturedImage( $listing_id, $image );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerAddGalleryImages() {
		wp_register_ability( 'rtcl/add-gallery-images', [
			'label'       => __( 'Add Gallery Images', 'classified-listing' ),
			'description' => __( 'Add multiple images to a listing gallery. Supports URLs, local paths, base64 data, or attachment IDs. Optionally set the first image as featured.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID. Required.', 'classified-listing' ),
					],
					'images' => [
						'type'        => 'array',
						'items'       => [
							'oneOf' => [
								[ 'type' => 'string', 'description' => __( 'Image URL, local path, or base64 data.', 'classified-listing' ) ],
								[ 'type' => 'integer', 'description' => __( 'Existing attachment ID.', 'classified-listing' ) ],
							],
						],
						'description' => __( 'Array of images to add. Required.', 'classified-listing' ),
					],
					'set_featured' => [
						'type'        => 'boolean',
						'description' => __( 'Set first successfully added image as featured. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
					'position' => [
						'type'        => 'string',
						'enum'        => [ 'start', 'end' ],
						'description' => __( 'Where to add images in gallery. Default: end.', 'classified-listing' ),
						'default'     => 'end',
					],
				],
				'required' => [ 'listing_id', 'images' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'   => [ 'type' => 'integer' ],
					'added_count'  => [ 'type' => 'integer', 'description' => __( 'Number of images successfully added.', 'classified-listing' ) ],
					'failed_count' => [ 'type' => 'integer', 'description' => __( 'Number of images that failed.', 'classified-listing' ) ],
					'total_images' => [ 'type' => 'integer', 'description' => __( 'Total images in gallery after operation.', 'classified-listing' ) ],
					'added'        => [
						'type'        => 'array',
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'attachment_id' => [ 'type' => 'integer' ],
								'url'           => [ 'type' => 'string' ],
								'dimensions'    => [
									'type'       => 'object',
									'properties' => [
										'width'  => [ 'type' => 'integer' ],
										'height' => [ 'type' => 'integer' ],
									],
								],
							],
						],
						'description' => __( 'Successfully added images.', 'classified-listing' ),
					],
					'failed'       => [
						'type'        => 'array',
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'index' => [ 'type' => 'integer' ],
								'input' => [ 'type' => 'string' ],
								'error' => [ 'type' => 'string' ],
							],
						],
						'description' => __( 'Failed images with error details.', 'classified-listing' ),
					],
					'featured_image_id' => [ 'type' => 'integer', 'description' => __( 'Featured image ID if set.', 'classified-listing' ) ],
					'message'      => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = absint( $input['listing_id'] ?? 0 );
				$images = $input['images'] ?? [];

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}
				if ( empty( $images ) || ! is_array( $images ) ) {
					return new \WP_Error( 'missing_images', __( 'Images array is required.', 'classified-listing' ) );
				}

				$post = get_post( $listing_id );
				if ( ! $post || rtcl()->post_type !== $post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				// Check permissions
				if ( (int) $post->post_author !== get_current_user_id() && ! current_user_can( 'edit_others_rtcl_listings' ) ) {
					return new \WP_Error( 'permission_denied', __( 'You cannot modify this listing.', 'classified-listing' ) );
				}

				$options = [
					'set_featured' => ! empty( $input['set_featured'] ),
					'position'     => sanitize_key( $input['position'] ?? 'end' ),
				];

				$service = new ListingService();
				return $service->addGalleryImages( $listing_id, $images, $options );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerGetListingSchema() {
		wp_register_ability( 'rtcl/get-listing-schema', [
			'label'       => __( 'Get Listing Schema', 'classified-listing' ),
			'description' => __( 'Discover available listing fields, categories, locations, listing types, price types, and statuses. Optionally pass a category_id to include category-specific custom fields. Use before creating or importing listings to understand available options.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'category_id' => [
						'type'        => 'integer',
						'description' => __( 'Optional category ID to include category-specific custom fields.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'core_fields'    => [ 'type' => 'array', 'description' => __( 'Core listing fields (title, description, price, etc.).', 'classified-listing' ) ],
					'contact_fields' => [ 'type' => 'array', 'description' => __( 'Contact information fields.', 'classified-listing' ) ],
					'custom_fields'  => [ 'type' => 'array', 'description' => __( 'Category-specific custom fields.', 'classified-listing' ) ],
					'taxonomies'     => [ 'type' => 'object', 'description' => __( 'Available categories and locations.', 'classified-listing' ) ],
					'listing_types'  => [ 'type' => 'array', 'description' => __( 'Available listing types.', 'classified-listing' ) ],
					'price_types'    => [ 'type' => 'array', 'description' => __( 'Available price types.', 'classified-listing' ) ],
					'statuses'       => [ 'type' => 'array', 'description' => __( 'Available statuses.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new SchemaService();
				$category_id = isset( $input['category_id'] ) ? absint( $input['category_id'] ) : null;
				return $service->getListingSchema( $category_id );
			},
			'permission_callback' => CapabilityHelper::getSchemaDiscoveryCallback(),
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

	private static function registerUpsertListing() {
		wp_register_ability( 'rtcl/upsert-listing', [
			'label'       => __( 'Upsert Listing', 'classified-listing' ),
			'description' => __( 'Create or update a listing idempotently. For new listings, call rtcl/list-forms first to let user select a form. Two modes: (1) By slug - provide slug to find/update by URL slug, (2) By source+external_id - for external system sync. If listing exists, updates it; otherwise creates new.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'slug' => [
						'type'        => 'string',
						'description' => __( 'URL slug to find/create listing by (WordPress native). If not provided, auto-generated from title.', 'classified-listing' ),
					],
					'source' => [
						'type'        => 'string',
						'description' => __( 'Source identifier for external tracking (e.g., "dealer-feed"). Use with external_id.', 'classified-listing' ),
					],
					'external_id' => [
						'type'        => 'string',
						'description' => __( 'External ID from source system. Combined with source for unique identification.', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'Listing title. Required.', 'classified-listing' ),
					],
					'description' => [
						'type'        => 'string',
						'description' => __( 'Full listing description. HTML is allowed.', 'classified-listing' ),
					],
					'excerpt' => [
						'type'        => 'string',
						'description' => __( 'Short summary of the listing.', 'classified-listing' ),
					],
					'category' => [
						'oneOf'       => [
							[ 'type' => 'integer' ],
							[ 'type' => 'string' ],
						],
						'description' => __( 'Category ID, slug, name, or hierarchical path (e.g., "Electronics > Phones").', 'classified-listing' ),
					],
					'location' => [
						'oneOf'       => [
							[ 'type' => 'integer' ],
							[ 'type' => 'string' ],
						],
						'description' => __( 'Location ID, slug, name, or hierarchical path.', 'classified-listing' ),
					],
					'price' => [
						'type'        => 'number',
						'description' => __( 'Listing price.', 'classified-listing' ),
					],
					'price_type' => [
						'type'        => 'string',
						'enum'        => [ 'regular', 'on_call', 'negotiable', 'fixed' ],
						'description' => __( 'Price type.', 'classified-listing' ),
					],
					'listing_type' => [
						'type'        => 'string',
						'enum'        => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ],
						'description' => __( 'Listing type.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'pending', 'draft', 'private' ],
						'description' => __( 'Listing status. Optional - for new listings, uses site\'s "New Listing Status" setting; for updates, uses "Edited Listing Status" setting if configured. Publishing/private requires capability.', 'classified-listing' ),
					],
					'tags' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Array of tag names.', 'classified-listing' ),
					],
					'images' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Array of image URLs to download and attach. First image becomes featured.', 'classified-listing' ),
					],
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
						'description' => __( 'Contact information.', 'classified-listing' ),
					],
					'geo_location' => [
						'type'        => 'object',
						'properties'  => [
							'latitude'  => [ 'type' => 'number' ],
							'longitude' => [ 'type' => 'number' ],
							'address'   => [ 'type' => 'string' ],
						],
						'description' => __( 'Geographic coordinates.', 'classified-listing' ),
					],
					'video_urls' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'YouTube/Vimeo video URLs.', 'classified-listing' ),
					],
					'business_hours' => [
						'type'        => 'object',
						'description' => __( 'Business hours by day.', 'classified-listing' ),
					],
					'social_profiles' => [
						'type'        => 'object',
						'description' => __( 'Social profile URLs.', 'classified-listing' ),
					],
					'custom_fields' => [
						'type'        => 'object',
						'description' => __( 'Custom field key-value pairs. Supports: text, textarea, number, select, radio, checkbox, date, date_range, date_time, url, email, file, color_picker.', 'classified-listing' ),
					],
					'source_url' => [
						'type'        => 'string',
						'description' => __( 'Optional URL to the original listing in the source system.', 'classified-listing' ),
					],
					'update_existing' => [
						'type'        => 'boolean',
						'description' => __( 'Whether to update if existing listing found. Default: true.', 'classified-listing' ),
						'default'     => true,
					],
				],
				'required' => [ 'title' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'action'     => [ 'type' => 'string', 'enum' => [ 'created', 'updated', 'skipped' ], 'description' => __( 'Action taken.', 'classified-listing' ) ],
					'listing_id' => [ 'type' => 'integer', 'description' => __( 'The listing ID.', 'classified-listing' ) ],
					'slug'       => [ 'type' => 'string', 'description' => __( 'The listing slug.', 'classified-listing' ) ],
					'title'      => [ 'type' => 'string', 'description' => __( 'Listing title.', 'classified-listing' ) ],
					'status'     => [ 'type' => 'string', 'description' => __( 'Listing status.', 'classified-listing' ) ],
					'url'        => [ 'type' => 'string', 'description' => __( 'Listing URL.', 'classified-listing' ) ],
					'source'     => [ 'type' => 'string', 'description' => __( 'Source identifier used.', 'classified-listing' ) ],
					'external_id' => [ 'type' => 'string', 'description' => __( 'External ID used.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new UpsertService();

				$source = sanitize_key( $input['source'] ?? '' );
				$external_id = sanitize_text_field( $input['external_id'] ?? '' );
				$slug = sanitize_title( $input['slug'] ?? '' );

				$options = [
					'update_existing' => $input['update_existing'] ?? true,
				];

				// Mode 1: External system sync (source + external_id)
				if ( '' !== $source && '' !== $external_id ) {
					return $service->upsert( $source, $external_id, $input, $options );
				}

				// Mode 2: WordPress native (slug-based)
				$options['slug'] = $slug;
				return $service->upsertBySlug( $input, $options );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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

	private static function registerGetFormFields() {
		wp_register_ability( 'rtcl/get-form-fields', [
			'label'       => __( 'Get Form Fields', 'classified-listing' ),
			'description' => __( 'Call after user selects a form. Returns all fields with their required status. IMPORTANT: Check which fields have required=true and ask the user for any missing required data before calling rtcl/create-listing. Also returns field options for select/radio/checkbox types.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to get fields from (Form Builder).', 'classified-listing' ),
					],
					'form_slug' => [
						'type'        => 'string',
						'description' => __( 'Form slug to get fields from (alternative to form_id).', 'classified-listing' ),
					],
					'category_id' => [
						'type'        => 'integer',
						'description' => __( 'Category ID to discover associated legacy custom fields.', 'classified-listing' ),
					],
					'include_preset' => [
						'type'        => 'boolean',
						'description' => __( 'Include preset fields (title, description, price, etc.). Default: true.', 'classified-listing' ),
						'default'     => true,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_builder_enabled' => [
						'type'        => 'boolean',
						'description' => __( 'Whether Form Builder is enabled.', 'classified-listing' ),
					],
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID if found.', 'classified-listing' ),
					],
					'form_title' => [
						'type'        => 'string',
						'description' => __( 'Form title.', 'classified-listing' ),
					],
					'form_slug' => [
						'type'        => 'string',
						'description' => __( 'Form slug.', 'classified-listing' ),
					],
					'preset_fields' => [
						'type'        => 'array',
						'description' => __( 'Preset fields (title, price, category, etc.) with meta keys.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'name'     => [ 'type' => 'string', 'description' => __( 'Field name.', 'classified-listing' ) ],
								'meta_key' => [ 'type' => 'string', 'description' => __( 'Post meta key to use when storing value.', 'classified-listing' ) ],
								'label'    => [ 'type' => 'string', 'description' => __( 'Display label.', 'classified-listing' ) ],
								'type'     => [ 'type' => 'string', 'description' => __( 'Field type.', 'classified-listing' ) ],
								'required' => [ 'type' => 'boolean', 'description' => __( 'Whether field is required.', 'classified-listing' ) ],
								'options'  => [ 'type' => 'array', 'description' => __( 'Available options for select/radio/checkbox.', 'classified-listing' ) ],
							],
						],
					],
					'custom_fields' => [
						'type'        => 'array',
						'description' => __( 'Custom fields from Form Builder with meta keys.', 'classified-listing' ),
					],
					'legacy_fields' => [
						'type'        => 'array',
						'description' => __( 'Legacy custom fields (rtcl_cf post type) for the category.', 'classified-listing' ),
					],
					'required_fields' => [
						'type'        => 'array',
						'description' => __( 'Summary of all required fields. Ask user for any missing required data.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'name'  => [ 'type' => 'string', 'description' => __( 'Field name to use in create-listing.', 'classified-listing' ) ],
								'label' => [ 'type' => 'string', 'description' => __( 'Human-readable label to show user.', 'classified-listing' ) ],
								'type'  => [ 'type' => 'string', 'description' => __( 'Field type.', 'classified-listing' ) ],
							],
						],
					],
					'workflow_hint' => [
						'type'        => 'string',
						'description' => __( 'Next step guidance based on required fields.', 'classified-listing' ),
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new SchemaService();
				return $service->getFormFields( $input );
			},
			'permission_callback' => CapabilityHelper::getReadFormsCallback(),
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

	private static function registerValidateListingData() {
		wp_register_ability( 'rtcl/validate-listing-data', [
			'label'       => __( 'Validate Listing Data', 'classified-listing' ),
			'description' => __( 'Validate listing data against a form schema without creating the listing. Use this to check if your data is valid before creating, especially when mapping from external sources. Returns validation errors and the resolved form.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to validate against.', 'classified-listing' ),
					],
					'form_slug' => [
						'type'        => 'string',
						'description' => __( 'Form slug to validate against.', 'classified-listing' ),
					],
					'category' => [
						'oneOf'       => [ [ 'type' => 'integer' ], [ 'type' => 'string' ] ],
						'description' => __( 'Category for auto form detection.', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'Listing title.', 'classified-listing' ),
					],
					'description' => [
						'type'        => 'string',
						'description' => __( 'Listing description.', 'classified-listing' ),
					],
					'price' => [
						'type'        => 'number',
						'description' => __( 'Listing price.', 'classified-listing' ),
					],
					'contact' => [
						'type'        => 'object',
						'description' => __( 'Contact information.', 'classified-listing' ),
					],
					'custom_fields' => [
						'type'        => 'object',
						'description' => __( 'Custom field values to validate.', 'classified-listing' ),
					],
					'strict_validation' => [
						'type'        => 'boolean',
						'description' => __( 'Fail on unknown custom_fields.', 'classified-listing' ),
						'default'     => true,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'valid' => [
						'type'        => 'boolean',
						'description' => __( 'Whether data is valid.', 'classified-listing' ),
					],
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Resolved form ID.', 'classified-listing' ),
					],
					'form_title' => [
						'type'        => 'string',
						'description' => __( 'Resolved form title.', 'classified-listing' ),
					],
					'form_resolution_method' => [
						'type'        => 'string',
						'description' => __( 'How form was resolved (explicit_id, explicit_slug, auto_category, default).', 'classified-listing' ),
					],
					'errors' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Validation error messages.', 'classified-listing' ),
					],
					'available_fields' => [
						'type'        => 'array',
						'description' => __( 'Available field names in the resolved form.', 'classified-listing' ),
					],
					'unknown_fields' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'string' ],
						'description' => __( 'Custom fields provided that are not in the form.', 'classified-listing' ),
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormAwareListingService();

				// Resolve form
				$input['strict_validation'] = $input['strict_validation'] ?? true;
				$form_resolution = $service->resolveForm( $input );

				if ( is_wp_error( $form_resolution ) ) {
					return [
						'valid'                  => false,
						'form_id'                => null,
						'form_title'             => null,
						'form_resolution_method' => 'failed',
						'errors'                 => [ $form_resolution->get_error_message() ],
						'available_fields'       => [],
						'unknown_fields'         => [],
					];
				}

				$form = $form_resolution['form'];
				$result = [
					'valid'                  => true,
					'form_id'                => $form_resolution['form_id'],
					'form_title'             => $form ? $form->title : null,
					'form_resolution_method' => $form_resolution['method'],
					'errors'                 => [],
					'available_fields'       => [],
					'unknown_fields'         => [],
				];

				// No form, no validation
				if ( ! $form ) {
					$result['errors'][] = __( 'No form available for validation.', 'classified-listing' );
					$result['valid'] = false;
					return $result;
				}

				// Get available fields
				$fields = $form->getFields();
				if ( is_array( $fields ) ) {
					foreach ( $fields as $uuid => $field ) {
						$result['available_fields'][] = [
							'name'     => $field['name'] ?? '',
							'element'  => $field['element'] ?? '',
							'label'    => $field['label'] ?? '',
							'required' => ! empty( $field['validation']['required']['value'] ),
							'preset'   => ! empty( $field['preset'] ),
						];
					}
				}

				// Check for unknown fields
				if ( ! empty( $input['custom_fields'] ) && is_array( $input['custom_fields'] ) ) {
					$known_names = array_column( $result['available_fields'], 'name' );
					foreach ( array_keys( $input['custom_fields'] ) as $key ) {
						if ( ! in_array( $key, $known_names, true ) ) {
							$result['unknown_fields'][] = $key;
						}
					}
				}

				// Validate against form
				$validation = $service->validateAgainstForm( $form, $input, false );
				if ( is_wp_error( $validation ) ) {
					$result['valid'] = false;
					$error_data = $validation->get_error_data();
					$result['errors'] = $error_data['errors'] ?? [ $validation->get_error_message() ];
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getSchemaDiscoveryCallback(),
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
	 * Register get gallery images ability.
	 */
	private static function registerGetGalleryImages() {
		wp_register_ability( 'rtcl/get-gallery-images', [
			'label'       => __( 'Get Gallery Images', 'classified-listing' ),
			'description' => __( 'Get all gallery images for a listing. Returns attachment IDs, URLs, dimensions, and which image is featured.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to get images for.', 'classified-listing' ),
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'    => [ 'type' => 'integer' ],
					'featured_id'   => [ 'type' => [ 'integer', 'null' ] ], // null when the listing has no featured image.
					'featured_url'  => [ 'type' => [ 'string', 'null' ] ],
					'total_images'  => [ 'type' => 'integer' ],
					'images'        => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'attachment_id' => [ 'type' => 'integer' ],
								'url'           => [ 'type' => 'string' ],
								'is_featured'   => [ 'type' => 'boolean' ],
								'dimensions'    => [ 'type' => 'object' ],
							],
						],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = isset( $input['listing_id'] ) ? absint( $input['listing_id'] ) : 0;

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}

				$service = new ListingService();
				return $service->getGalleryImages( $listing_id );
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
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
	 * Register delete gallery images ability.
	 */
	private static function registerDeleteGalleryImages() {
		wp_register_ability( 'rtcl/delete-gallery-images', [
			'label'       => __( 'Delete Gallery Images', 'classified-listing' ),
			'description' => __( 'Remove specific images from a listing gallery by attachment ID. Optionally delete the attachment files from the media library.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to remove images from.', 'classified-listing' ),
					],
					'attachment_ids' => [
						'type'        => 'array',
						'items'       => [ 'type' => 'integer' ],
						'description' => __( 'Array of attachment IDs to remove from gallery.', 'classified-listing' ),
					],
					'delete_files' => [
						'type'        => 'boolean',
						'description' => __( 'Also permanently delete the attachment files. Default: false (only removes from gallery).', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_id', 'attachment_ids' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'       => [ 'type' => 'integer' ],
					'removed_count'    => [ 'type' => 'integer' ],
					'removed_ids'      => [ 'type' => 'array' ],
					'remaining_count'  => [ 'type' => 'integer' ],
					'files_deleted'    => [ 'type' => 'boolean' ],
					'featured_removed' => [ 'type' => 'boolean' ],
					'not_found'        => [ 'type' => 'array' ],
					'message'          => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = isset( $input['listing_id'] ) ? absint( $input['listing_id'] ) : 0;
				$attachment_ids = $input['attachment_ids'] ?? [];

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}

				// Only listings (the prompts below read the post's title and media).
				$listing_post = get_post( $listing_id );
				if ( ! $listing_post || rtcl()->post_type !== $listing_post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				if ( empty( $attachment_ids ) ) {
					return new \WP_Error( 'missing_attachment_ids', __( 'Attachment IDs array is required.', 'classified-listing' ) );
				}

				// Prompt user if delete_files not specified
				if ( ! array_key_exists( 'delete_files', $input ) ) {
					$post = get_post( $listing_id );
					$title = $post ? $post->post_title : "ID: $listing_id";
					$count = count( $attachment_ids );

					return [
						'action_required' => true,
						'prompt'          => sprintf(
							__( 'How would you like to handle the %d image(s) from listing "%s"?', 'classified-listing' ),
							$count,
							$title
						),
						'options'         => [
							[
								'value'       => 'keep',
								'label'       => __( 'Remove from Gallery Only', 'classified-listing' ),
								'description' => __( 'Images will be removed from the listing gallery but remain in the Media Library for other uses.', 'classified-listing' ),
							],
							[
								'value'       => 'delete',
								'label'       => __( 'Delete Permanently', 'classified-listing' ),
								'description' => __( 'Images will be permanently deleted from the Media Library and cannot be recovered.', 'classified-listing' ),
							],
						],
						'callback_params' => [
							'listing_id'     => $listing_id,
							'attachment_ids' => $attachment_ids,
						],
						'instructions'    => __( 'Please call rtcl/delete-gallery-images again with delete_files=false (keep) or delete_files=true (delete).', 'classified-listing' ),
					];
				}

				$delete_files = ! empty( $input['delete_files'] );

				$service = new ListingService();
				return $service->deleteGalleryImages( $listing_id, $attachment_ids, $delete_files );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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
	 * Register clear gallery images ability.
	 */
	private static function registerClearGalleryImages() {
		wp_register_ability( 'rtcl/clear-gallery-images', [
			'label'       => __( 'Clear Gallery Images', 'classified-listing' ),
			'description' => __( 'Remove ALL images from a listing gallery. Also removes the featured image. Optionally delete the attachment files.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to clear images from.', 'classified-listing' ),
					],
					'delete_files' => [
						'type'        => 'boolean',
						'description' => __( 'Also permanently delete the attachment files. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'    => [ 'type' => 'integer' ],
					'removed_count' => [ 'type' => 'integer' ],
					'files_deleted' => [ 'type' => 'boolean' ],
					'message'       => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = isset( $input['listing_id'] ) ? absint( $input['listing_id'] ) : 0;

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}

				// Only listings (the prompts below read the post's title and media).
				$listing_post = get_post( $listing_id );
				if ( ! $listing_post || rtcl()->post_type !== $listing_post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				// Get image count for prompt
				$gallery_images = get_post_meta( $listing_id, '_rtcl_images', true );
				$image_count = is_array( $gallery_images ) ? count( $gallery_images ) : 0;

				// Prompt user if delete_files not specified
				if ( ! array_key_exists( 'delete_files', $input ) ) {
					$post = get_post( $listing_id );
					$title = $post ? $post->post_title : "ID: $listing_id";

					return [
						'action_required' => true,
						'prompt'          => sprintf(
							__( 'How would you like to handle all %d image(s) from listing "%s"?', 'classified-listing' ),
							$image_count,
							$title
						),
						'options'         => [
							[
								'value'       => 'keep',
								'label'       => __( 'Remove from Gallery Only', 'classified-listing' ),
								'description' => __( 'Images will be removed from the listing gallery but remain in the Media Library for other uses.', 'classified-listing' ),
							],
							[
								'value'       => 'delete',
								'label'       => __( 'Delete Permanently', 'classified-listing' ),
								'description' => __( 'All images will be permanently deleted from the Media Library and cannot be recovered.', 'classified-listing' ),
							],
						],
						'callback_params' => [
							'listing_id'  => $listing_id,
							'image_count' => $image_count,
						],
						'instructions'    => __( 'Please call rtcl/clear-gallery-images again with delete_files=false (keep) or delete_files=true (delete).', 'classified-listing' ),
					];
				}

				$delete_files = ! empty( $input['delete_files'] );

				$service = new ListingService();
				return $service->clearGalleryImages( $listing_id, $delete_files );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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
	 * Register remove featured image ability.
	 */
	private static function registerRemoveFeaturedImage() {
		wp_register_ability( 'rtcl/remove-featured-image', [
			'label'       => __( 'Remove Featured Image', 'classified-listing' ),
			'description' => __( 'Remove the featured image (thumbnail) from a listing. Optionally delete the attachment file.', 'classified-listing' ),
			'category'    => 'rtcl-listings',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Listing ID to remove featured image from.', 'classified-listing' ),
					],
					'delete_file' => [
						'type'        => 'boolean',
						'description' => __( 'Also permanently delete the attachment file. Default: false.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_id'   => [ 'type' => 'integer' ],
					'removed_id'   => [ 'type' => 'integer' ],
					'removed_url'  => [ 'type' => 'string' ],
					'file_deleted' => [ 'type' => 'boolean' ],
					'message'      => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$listing_id = isset( $input['listing_id'] ) ? absint( $input['listing_id'] ) : 0;

				if ( ! $listing_id ) {
					return new \WP_Error( 'missing_listing_id', __( 'Listing ID is required.', 'classified-listing' ) );
				}

				// Only listings (the prompts below read the post's title and media).
				$listing_post = get_post( $listing_id );
				if ( ! $listing_post || rtcl()->post_type !== $listing_post->post_type ) {
					return new \WP_Error( 'listing_not_found', __( 'Listing not found.', 'classified-listing' ) );
				}

				// Check if listing has a featured image
				$featured_id = get_post_thumbnail_id( $listing_id );
				if ( ! $featured_id ) {
					return new \WP_Error( 'no_featured_image', __( 'Listing has no featured image.', 'classified-listing' ) );
				}

				// Prompt user if delete_file not specified
				if ( ! array_key_exists( 'delete_file', $input ) ) {
					$post = get_post( $listing_id );
					$title = $post ? $post->post_title : "ID: $listing_id";
					$image_url = wp_get_attachment_url( $featured_id );

					return [
						'action_required' => true,
						'prompt'          => sprintf(
							__( 'How would you like to handle the featured image from listing "%s"?', 'classified-listing' ),
							$title
						),
						'options'         => [
							[
								'value'       => 'keep',
								'label'       => __( 'Remove from Listing Only', 'classified-listing' ),
								'description' => __( 'The image will be unset as featured but remain in the Media Library.', 'classified-listing' ),
							],
							[
								'value'       => 'delete',
								'label'       => __( 'Delete Permanently', 'classified-listing' ),
								'description' => __( 'The image will be permanently deleted from the Media Library and cannot be recovered.', 'classified-listing' ),
							],
						],
						'callback_params' => [
							'listing_id'    => $listing_id,
							'attachment_id' => $featured_id,
							'image_url'     => $image_url,
						],
						'instructions'    => __( 'Please call rtcl/remove-featured-image again with delete_file=false (keep) or delete_file=true (delete).', 'classified-listing' ),
					];
				}

				$delete_file = ! empty( $input['delete_file'] );

				$service = new ListingService();
				return $service->removeFeaturedImage( $listing_id, $delete_file );
			},
			'permission_callback' => CapabilityHelper::getAdminWriteCallback(),
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
