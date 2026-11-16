<?php

namespace Rtcl\Services\Mcp\Services\Import;

use Rtcl\Helpers\Functions;
use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\FBHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Discovers available RTCL listing fields for schema introspection.
 *
 * Allows MCP clients to understand what fields are available before
 * creating or importing listings.
 */
class SchemaService {

	/**
	 * @var TaxonomyResolver
	 */
	private $taxonomy_resolver;

	public function __construct( ?TaxonomyResolver $taxonomy_resolver = null ) {
		$this->taxonomy_resolver = $taxonomy_resolver ?: new TaxonomyResolver();
	}

	/**
	 * Get form fields for a specific form or category.
	 *
	 * This method discovers all custom fields/meta keys configured for a listing form,
	 * helping AI clients map external data to the correct field keys.
	 *
	 * @param array $params {
	 *     @type int    $form_id     Form ID to get fields from.
	 *     @type int    $category_id Category ID to discover associated fields.
	 *     @type string $form_slug   Form slug to get fields from.
	 *     @type bool   $include_preset Include preset fields (title, description, etc.).
	 * }
	 *
	 * @return array|\WP_Error Form fields with meta keys.
	 */
	public function getFormFields( array $params = [] ) {
		$form_id     = isset( $params['form_id'] ) ? absint( $params['form_id'] ) : 0;
		$form_slug   = isset( $params['form_slug'] ) ? sanitize_title( $params['form_slug'] ) : '';
		$category_id = isset( $params['category_id'] ) ? absint( $params['category_id'] ) : 0;
		$include_preset = $params['include_preset'] ?? true;

		$result = [
			'form_builder_enabled' => $this->is_form_builder_enabled(),
			'preset_fields'        => [],
			'custom_fields'        => [],
			'legacy_fields'        => [],
		];

		// Try to get Form Builder form
		$form = null;

		if ( $form_id ) {
			$form = $this->get_form_by_id( $form_id );
		} elseif ( $form_slug ) {
			$form = $this->get_form_by_slug( $form_slug );
		}

		// If we have a Form Builder form, extract its fields
		if ( $form && $result['form_builder_enabled'] ) {
			$form_data = $this->extract_form_builder_fields( $form, $include_preset );
			$result['form_id']       = $form->id;
			$result['form_title']    = $form->title;
			$result['form_slug']     = $form->slug;
			$result['preset_fields'] = $form_data['preset'];
			$result['custom_fields'] = $form_data['custom'];
		}

		// Also get legacy custom fields for the category
		if ( $category_id ) {
			$result['category_id']   = $category_id;
			$result['legacy_fields'] = $this->get_legacy_custom_fields( $category_id );
		}

		// If no form but category provided, try to find the default form
		if ( ! $form && $category_id && $result['form_builder_enabled'] ) {
			$default_form = $this->get_default_form();
			if ( $default_form ) {
				$form_data = $this->extract_form_builder_fields( $default_form, $include_preset );
				$result['form_id']       = $default_form->id;
				$result['form_title']    = $default_form->title;
				$result['form_slug']     = $default_form->slug;
				$result['preset_fields'] = $form_data['preset'];
				$result['custom_fields'] = $form_data['custom'];
			}
		}

		// Build required fields summary for easy reference
		$required_fields = [];
		foreach ( $result['preset_fields'] as $field ) {
			if ( ! empty( $field['required'] ) ) {
				$required_fields[] = [
					'name'  => $field['name'],
					'label' => $field['label'],
					'type'  => $field['type'],
				];
			}
		}
		foreach ( $result['custom_fields'] as $field ) {
			if ( ! empty( $field['required'] ) ) {
				$required_fields[] = [
					'name'  => $field['name'],
					'label' => $field['label'],
					'type'  => $field['type'],
				];
			}
		}
		$result['required_fields'] = $required_fields;

		// Add workflow guidance
		if ( ! empty( $required_fields ) ) {
			$required_names = array_column( $required_fields, 'label' );
			$result['workflow_hint'] = sprintf(
				/* translators: %s: comma-separated list of required field names */
				__( 'REQUIRED FIELDS: %s. Ask the user for any of these that are missing from their request before calling rtcl/create-listing.', 'classified-listing' ),
				implode( ', ', $required_names )
			);
		} else {
			$result['workflow_hint'] = __( 'No required fields. You can proceed to rtcl/create-listing with the available data.', 'classified-listing' );
		}

		return $result;
	}

	/**
	 * List all available published forms.
	 *
	 * Returns forms that can be used for creating listings. Each form has different
	 * preset fields and custom fields configured. AI agents should present these
	 * forms to users and ask which one to use before creating listings.
	 *
	 * @param bool $include_field_summary Include summary of preset fields for each form.
	 *
	 * @return array List of forms with info and workflow guidance.
	 */
	public function listForms( bool $include_field_summary = false ): array {
		if ( ! $this->is_form_builder_enabled() ) {
			return [
				'form_builder_enabled' => false,
				'forms'                => [],
				'workflow_hint'        => __( 'Form Builder is not enabled. Listings will use default preset fields.', 'classified-listing' ),
			];
		}

		$forms = Form::query()
			->where( 'status', 'publish' )
			->get();

		// Sort: default form first, then alphabetically by title
		if ( ! empty( $forms ) ) {
			usort( $forms, function ( $a, $b ) {
				// Default form comes first
				if ( $a->default && ! $b->default ) {
					return -1;
				}
				if ( ! $a->default && $b->default ) {
					return 1;
				}
				// Then sort by title
				return strcasecmp( $a->title, $b->title );
			} );
		}

		if ( empty( $forms ) ) {
			return [
				'form_builder_enabled' => true,
				'forms'                => [],
				'workflow_hint'        => __( 'No published forms available. Please create and publish a form in the Form Builder.', 'classified-listing' ),
			];
		}

		$result = [];
		foreach ( $forms as $form ) {
			$fields = $form->getFields();
			$field_count = is_array( $fields ) ? count( $fields ) : 0;

			$form_data = [
				'id'          => $form->id,
				'title'       => $form->title,
				'slug'        => $form->slug,
				'is_default'  => (bool) $form->default,
				'field_count' => $field_count,
			];

			// Include preset field summary if requested
			if ( $include_field_summary && is_array( $fields ) ) {
				$preset_summary = [];
				foreach ( $fields as $field ) {
					if ( ! empty( $field['preset'] ) ) {
						$preset_summary[] = [
							'name'  => $field['name'] ?? '',
							'label' => $field['label'] ?? '',
						];
					}
				}
				$form_data['preset_fields'] = $preset_summary;
				$form_data['custom_field_count'] = $field_count - count( $preset_summary );
			}

			$result[] = $form_data;
		}

		// Build workflow hint
		$workflow_hint = __( 'IMPORTANT: Show ALL forms to the user and let them select which one to use. Do NOT auto-select a form. After user selects a form, call rtcl/get-form-fields with the form_id to discover required fields, then ask the user for any missing required data before creating the listing.', 'classified-listing' );

		return [
			'form_builder_enabled' => true,
			'forms'                => $result,
			'total_forms'          => count( $result ),
			'workflow_hint'        => $workflow_hint,
			'next_steps'           => [
				'1' => __( 'Present ALL forms to user with their titles and field counts', 'classified-listing' ),
				'2' => __( 'Wait for user to select a form', 'classified-listing' ),
				'3' => __( 'Call rtcl/get-form-fields with selected form_id', 'classified-listing' ),
				'4' => __( 'Check required fields and ask user for any missing data', 'classified-listing' ),
				'5' => __( 'Call rtcl/create-listing with form_id and complete data', 'classified-listing' ),
			],
		];
	}

	/**
	 * Check if Form Builder is enabled.
	 *
	 * @return bool
	 */
	private function is_form_builder_enabled(): bool {
		if ( ! class_exists( 'Rtcl\Services\FormBuilder\FBHelper' ) ) {
			return false;
		}
		return FBHelper::isEnabled();
	}

	/**
	 * Get form by ID.
	 *
	 * @param int $form_id Form ID.
	 *
	 * @return Form|null
	 */
	private function get_form_by_id( int $form_id ): ?Form {
		if ( ! class_exists( 'Rtcl\Models\Form\Form' ) ) {
			return null;
		}
		return Form::query()->find( $form_id );
	}

	/**
	 * Get form by slug.
	 *
	 * @param string $slug Form slug.
	 *
	 * @return Form|null
	 */
	private function get_form_by_slug( string $slug ): ?Form {
		if ( ! class_exists( 'Rtcl\Models\Form\Form' ) ) {
			return null;
		}
		return Form::query()->where( 'slug', $slug )->first();
	}

	/**
	 * Get the default form.
	 *
	 * @return Form|null
	 */
	private function get_default_form(): ?Form {
		if ( ! class_exists( 'Rtcl\Models\Form\Form' ) ) {
			return null;
		}
		return Form::query()->where( 'default', 1 )->first();
	}

	/**
	 * Extract fields from a Form Builder form.
	 *
	 * @param Form $form           Form object.
	 * @param bool $include_preset Include preset fields.
	 *
	 * @return array{preset: array, custom: array}
	 */
	private function extract_form_builder_fields( Form $form, bool $include_preset = true ): array {
		$fields = $form->getFields();
		$preset = [];
		$custom = [];

		if ( ! is_array( $fields ) ) {
			return [ 'preset' => $preset, 'custom' => $custom ];
		}

		foreach ( $fields as $uuid => $field ) {
			$is_preset = ! empty( $field['preset'] );

			$field_data = [
				'uuid'        => $uuid,
				'name'        => $field['name'] ?? '',
				'meta_key'    => $this->get_fb_field_meta_key( $field ),
				'element'     => $field['element'] ?? '',
				'label'       => $field['label'] ?? '',
				'type'        => $this->map_fb_element_to_type( $field['element'] ?? '' ),
				'required'    => ! empty( $field['validation']['required']['value'] ),
				'searchable'  => ! empty( $field['searchable'] ),
				'listable'    => ! empty( $field['listable'] ),
			];

			// Add placeholder if set
			if ( ! empty( $field['placeholder'] ) ) {
				$field_data['placeholder'] = $field['placeholder'];
			}

			// Add description/help text if set
			if ( ! empty( $field['description'] ) ) {
				$field_data['description'] = $field['description'];
			}

			// Add default value if set
			if ( isset( $field['defaultValue'] ) && '' !== $field['defaultValue'] ) {
				$field_data['default_value'] = $field['defaultValue'];
			}

			// Add options for select/radio/checkbox fields
			if ( ! empty( $field['options'] ) && is_array( $field['options'] ) ) {
				$field_data['options'] = $this->format_fb_options( $field['options'] );
			}

			// Add validation rules
			if ( ! empty( $field['validation'] ) ) {
				$field_data['validation'] = $this->format_fb_validation( $field['validation'] );
			}

			// Add conditional logic info
			if ( ! empty( $field['logics'] ) ) {
				$field_data['has_conditional_logic'] = true;
			}

			if ( $is_preset ) {
				if ( $include_preset ) {
					$field_data['preset'] = true;
					$preset[] = $field_data;
				}
			} else {
				$field_data['preset'] = false;
				$custom[] = $field_data;
			}
		}

		return [ 'preset' => $preset, 'custom' => $custom ];
	}

	/**
	 * Get meta key for a Form Builder field.
	 *
	 * @param array $field Field data.
	 *
	 * @return string Meta key.
	 */
	private function get_fb_field_meta_key( array $field ): string {
		// Preset fields have specific meta keys
		$preset_meta_keys = [
			'title'           => 'post_title',
			'description'     => 'post_content',
			'excerpt'         => 'post_excerpt',
			'pricing'         => 'price',
			'listing_type'    => 'ad_type',
			'category'        => 'rtcl_category',
			'location'        => 'rtcl_location',
			'tag'             => 'rtcl_tag',
			'images'          => '_rtcl_images',
			'video_urls'      => '_rtcl_video_urls',
			'contact_person'  => '_rtcl_contact_person',
			'phone'           => 'phone',
			'whatsapp'        => '_rtcl_whatsapp_number',
			'email'           => 'email',
			'website'         => 'website',
			'address'         => 'address',
			'zipcode'         => 'zipcode',
			'geo_location'    => '_rtcl_geo_address',
			'business_hours'  => '_rtcl_bhs',
			'social_profiles' => '_rtcl_social_profiles',
		];

		$element = $field['element'] ?? '';
		$name = $field['name'] ?? '';

		// Check if it's a preset field
		if ( ! empty( $field['preset'] ) && isset( $preset_meta_keys[ $element ] ) ) {
			return $preset_meta_keys[ $element ];
		}

		// Custom fields use their 'name' as the meta key
		return $name;
	}

	/**
	 * Map Form Builder element types to standard types.
	 *
	 * @param string $element Element type.
	 *
	 * @return string Standard type.
	 */
	private function map_fb_element_to_type( string $element ): string {
		$map = [
			// Text-based fields
			'text'            => 'text',
			'textarea'        => 'textarea',
			'hidden'          => 'hidden',

			// Numeric fields
			'number'          => 'number',
			'range'           => 'range',

			// Selection fields
			'select'          => 'select',
			'radio'           => 'radio',
			'checkbox'        => 'checkbox',

			// Date/Time fields
			'date'            => 'date',
			'date_range'      => 'date_range',
			'date_time'       => 'datetime',
			'date_time_range' => 'datetime_range',
			'time'            => 'time',

			// URL/Email fields
			'url'             => 'url',
			'email'           => 'email',

			// File fields
			'file'            => 'file',

			// Special fields
			'color_picker'    => 'color',

			// Preset fields
			'pricing'         => 'price',
			'title'           => 'text',
			'description'     => 'richtext',
			'excerpt'         => 'textarea',
			'category'        => 'taxonomy',
			'location'        => 'taxonomy',
			'tag'             => 'taxonomy',
			'images'          => 'gallery',
			'video_urls'      => 'video',
			'phone'           => 'phone',
			'website'         => 'url',
			'address'         => 'address',
			'zipcode'         => 'text',
			'geo_location'    => 'geo',
			'business_hours'  => 'business_hours',
			'social_profiles' => 'social',
			'contact_person'  => 'text',
			'whatsapp'        => 'phone',
			'listing_type'    => 'select',
		];

		return $map[ $element ] ?? 'text';
	}

	/**
	 * Get field type documentation.
	 *
	 * @return array Field type documentation.
	 */
	public function getFieldTypeDocumentation(): array {
		return [
			'text' => [
				'input_type'  => 'string',
				'description' => __( 'Single line text input.', 'classified-listing' ),
				'example'     => 'Hello World',
			],
			'textarea' => [
				'input_type'  => 'string',
				'description' => __( 'Multi-line text input.', 'classified-listing' ),
				'example'     => "Line 1\nLine 2",
			],
			'number' => [
				'input_type'  => 'number',
				'description' => __( 'Numeric value. May have min/max/step validation.', 'classified-listing' ),
				'example'     => 42.5,
			],
			'range' => [
				'input_type'  => 'number',
				'description' => __( 'Numeric value within a range.', 'classified-listing' ),
				'example'     => 50,
			],
			'select' => [
				'input_type'  => 'string',
				'description' => __( 'Single selection from predefined options.', 'classified-listing' ),
				'example'     => 'option_value',
			],
			'radio' => [
				'input_type'  => 'string',
				'description' => __( 'Single selection from radio buttons.', 'classified-listing' ),
				'example'     => 'option_value',
			],
			'checkbox' => [
				'input_type'  => 'boolean|string|array',
				'description' => __( 'Single boolean, single value, or array of values for multi-select.', 'classified-listing' ),
				'example'     => [ 'option1', 'option2' ],
			],
			'date' => [
				'input_type'  => 'string',
				'description' => __( 'Date in YYYY-MM-DD format.', 'classified-listing' ),
				'example'     => '2024-01-15',
			],
			'date_range' => [
				'input_type'  => 'object',
				'description' => __( 'Date range with start and end dates.', 'classified-listing' ),
				'example'     => [ 'start' => '2024-01-01', 'end' => '2024-12-31' ],
			],
			'datetime' => [
				'input_type'  => 'string',
				'description' => __( 'DateTime in YYYY-MM-DD HH:MM:SS or ISO format.', 'classified-listing' ),
				'example'     => '2024-01-15 14:30:00',
			],
			'datetime_range' => [
				'input_type'  => 'object',
				'description' => __( 'DateTime range with start and end.', 'classified-listing' ),
				'example'     => [ 'start' => '2024-01-15 09:00:00', 'end' => '2024-01-15 17:00:00' ],
			],
			'url' => [
				'input_type'  => 'string',
				'description' => __( 'Valid URL.', 'classified-listing' ),
				'example'     => 'https://example.com',
			],
			'email' => [
				'input_type'  => 'string',
				'description' => __( 'Valid email address.', 'classified-listing' ),
				'example'     => 'user@example.com',
			],
			'file' => [
				'input_type'  => 'string|integer|array',
				'description' => __( 'File URL to sideload, attachment ID, or array of either.', 'classified-listing' ),
				'example'     => 'https://example.com/document.pdf',
			],
			'color' => [
				'input_type'  => 'string',
				'description' => __( 'Hex color code.', 'classified-listing' ),
				'example'     => '#FF5500',
			],
			'business_hours' => [
				'input_type'  => 'object',
				'description' => __( 'Business hours keyed by day name.', 'classified-listing' ),
				'example'     => [
					'monday' => [ 'open' => '09:00', 'close' => '17:00' ],
					'tuesday' => [ 'active' => false ],
				],
			],
			'social' => [
				'input_type'  => 'object',
				'description' => __( 'Social profile URLs keyed by network name.', 'classified-listing' ),
				'example'     => [
					'facebook' => 'https://facebook.com/page',
					'twitter'  => 'https://twitter.com/user',
				],
			],
		];
	}

	/**
	 * Format Form Builder field options.
	 *
	 * @param array $options Raw options.
	 *
	 * @return array Formatted options.
	 */
	private function format_fb_options( array $options ): array {
		$formatted = [];
		foreach ( $options as $opt ) {
			if ( is_array( $opt ) ) {
				$formatted[] = [
					'value' => $opt['value'] ?? '',
					'label' => $opt['label'] ?? $opt['value'] ?? '',
				];
			} else {
				$formatted[] = [
					'value' => $opt,
					'label' => $opt,
				];
			}
		}
		return $formatted;
	}

	/**
	 * Format Form Builder validation rules.
	 *
	 * @param array $validation Raw validation.
	 *
	 * @return array Formatted validation.
	 */
	private function format_fb_validation( array $validation ): array {
		$formatted = [];

		if ( ! empty( $validation['required']['value'] ) ) {
			$formatted['required'] = true;
		}

		if ( ! empty( $validation['min']['value'] ) ) {
			$formatted['min'] = $validation['min']['value'];
		}

		if ( ! empty( $validation['max']['value'] ) ) {
			$formatted['max'] = $validation['max']['value'];
		}

		if ( ! empty( $validation['minLength']['value'] ) ) {
			$formatted['min_length'] = $validation['minLength']['value'];
		}

		if ( ! empty( $validation['maxLength']['value'] ) ) {
			$formatted['max_length'] = $validation['maxLength']['value'];
		}

		if ( ! empty( $validation['pattern']['value'] ) ) {
			$formatted['pattern'] = $validation['pattern']['value'];
		}

		return $formatted;
	}

	/**
	 * Get legacy custom fields for a category.
	 *
	 * @param int $category_id Category ID.
	 *
	 * @return array Legacy field definitions with meta keys.
	 */
	private function get_legacy_custom_fields( int $category_id ): array {
		$field_ids = Functions::get_custom_field_ids( $category_id );
		if ( empty( $field_ids ) ) {
			return [];
		}

		$fields = [];
		foreach ( $field_ids as $field_id ) {
			$cf = rtcl()->factory->get_custom_field( $field_id );
			if ( ! $cf ) {
				continue;
			}

			$field_data = [
				'id'          => $field_id,
				'slug'        => $cf->getSlug(),
				'meta_key'    => '_field_' . $field_id,
				'label'       => $cf->getLabel(),
				'type'        => $this->map_field_type( $cf->getType() ),
				'required'    => $cf->isRequired(),
				'searchable'  => (bool) $cf->getSearchable(),
				'listable'    => (bool) $cf->getListable(),
			];

			// Add description
			$description = $cf->getDescription();
			if ( $description ) {
				$field_data['description'] = $description;
			}

			// Add placeholder
			$placeholder = $cf->getPlaceholder();
			if ( $placeholder ) {
				$field_data['placeholder'] = $placeholder;
			}

			// Add options for select/radio/checkbox fields
			$options = $cf->getOptions();
			if ( ! empty( $options ) ) {
				$field_data['options'] = [];
				foreach ( $options as $value => $label ) {
					$field_data['options'][] = [
						'value' => $value,
						'label' => $label,
					];
				}
			}

			// Add validation info
			$validation = $cf->getValidation();
			if ( $validation ) {
				$field_data['validation'] = [ 'pattern' => $validation ];
			}

			// Get min/max for number fields
			$type = $cf->getType();
			if ( 'number' === $type ) {
				$min = $cf->getMin();
				$max = $cf->getMax();
				$step = $cf->getStepSize();
				if ( '' !== $min ) {
					$field_data['validation']['min'] = $min;
				}
				if ( '' !== $max ) {
					$field_data['validation']['max'] = $max;
				}
				if ( $step ) {
					$field_data['validation']['step'] = $step;
				}
			}

			// Date field specifics
			if ( 'date' === $type ) {
				$date_type = $cf->getDateType();
				if ( $date_type ) {
					$field_data['date_type'] = $date_type;
					// Date range fields have separate meta keys
					if ( in_array( $date_type, [ 'date_range', 'date_time_range' ], true ) ) {
						$field_data['meta_key_start'] = '_field_' . $field_id . '_start';
						$field_data['meta_key_end']   = '_field_' . $field_id . '_end';
					}
				}
			}

			$fields[] = $field_data;
		}

		return $fields;
	}

	/**
	 * Get the complete listing schema.
	 *
	 * @param int|null $category_id Optional category ID to include category-specific custom fields.
	 *
	 * @return array Schema information.
	 */
	public function getListingSchema( ?int $category_id = null ): array {
		return [
			'core_fields'        => $this->get_core_fields(),
			'contact_fields'     => $this->get_contact_fields(),
			'custom_fields'      => $this->get_custom_fields( $category_id ),
			'taxonomies'         => $this->get_taxonomies(),
			'listing_types'      => $this->get_listing_types(),
			'price_types'        => $this->get_price_types(),
			'statuses'           => $this->get_statuses(),
			'pro_features'       => $this->get_pro_features_info(),
			'field_type_formats' => $this->getFieldTypeDocumentation(),
		];
	}

	/**
	 * Get optional feature availability information.
	 *
	 * @return array Features info.
	 */
	private function get_pro_features_info(): array {
		$info = [
			'pro_active' => false,
			'features'   => [
				[
					'id'          => 'video_urls',
					'label'       => __( 'Video URLs', 'classified-listing' ),
					'available'   => true,
					'description' => __( 'Attach YouTube/Vimeo video URLs to listings.', 'classified-listing' ),
				],
				[
					'id'          => 'business_hours',
					'label'       => __( 'Business Hours', 'classified-listing' ),
					'available'   => true,
					'description' => __( 'Set business hours for listings.', 'classified-listing' ),
				],
				[
					'id'          => 'social_profiles',
					'label'       => __( 'Social Profiles', 'classified-listing' ),
					'available'   => true,
					'description' => __( 'Add social profile links to listings.', 'classified-listing' ),
				],
			],
		];

		/**
		 * Filter the feature availability reported by the listing schema.
		 * Add-ons flag themselves via `pro_active` and add the features they own.
		 *
		 * @param array $info [ 'pro_active' => bool, 'features' => list of { id, label, available, description } ].
		 */
		return apply_filters( 'rtcl_mcp_listing_schema_features', $info );
	}

	/**
	 * Get core listing fields.
	 *
	 * @return array Core field definitions.
	 */
	private function get_core_fields(): array {
		return [
			[
				'id'          => 'title',
				'label'       => __( 'Title', 'classified-listing' ),
				'type'        => 'text',
				'required'    => true,
				'description' => __( 'The listing title.', 'classified-listing' ),
			],
			[
				'id'          => 'description',
				'label'       => __( 'Description', 'classified-listing' ),
				'type'        => 'textarea',
				'required'    => false,
				'description' => __( 'Full listing description. HTML is allowed.', 'classified-listing' ),
			],
			[
				'id'          => 'excerpt',
				'label'       => __( 'Excerpt', 'classified-listing' ),
				'type'        => 'textarea',
				'required'    => false,
				'description' => __( 'Short summary of the listing.', 'classified-listing' ),
			],
			[
				'id'          => 'price',
				'label'       => __( 'Price', 'classified-listing' ),
				'type'        => 'number',
				'required'    => false,
				'description' => __( 'Listing price. Use 0 for free items.', 'classified-listing' ),
			],
			[
				'id'          => 'category',
				'label'       => __( 'Category', 'classified-listing' ),
				'type'        => 'taxonomy',
				'required'    => false,
				'description' => __( 'Category ID, slug, name, or hierarchical path (e.g., "Electronics > Phones").', 'classified-listing' ),
			],
			[
				'id'          => 'location',
				'label'       => __( 'Location', 'classified-listing' ),
				'type'        => 'taxonomy',
				'required'    => false,
				'description' => __( 'Location ID, slug, name, or hierarchical path.', 'classified-listing' ),
			],
			[
				'id'          => 'tags',
				'label'       => __( 'Tags', 'classified-listing' ),
				'type'        => 'array',
				'required'    => false,
				'description' => __( 'Array of tag names.', 'classified-listing' ),
			],
			[
				'id'          => 'images',
				'label'       => __( 'Images', 'classified-listing' ),
				'type'        => 'array',
				'required'    => false,
				'description' => __( 'Array of image URLs to download and attach. First image becomes featured.', 'classified-listing' ),
			],
		];
	}

	/**
	 * Get contact fields.
	 *
	 * @return array Contact field definitions.
	 */
	private function get_contact_fields(): array {
		return [
			[
				'id'          => 'email',
				'label'       => __( 'Email', 'classified-listing' ),
				'type'        => 'email',
				'required'    => false,
				'description' => __( 'Contact email address.', 'classified-listing' ),
			],
			[
				'id'          => 'phone',
				'label'       => __( 'Phone', 'classified-listing' ),
				'type'        => 'text',
				'required'    => false,
				'description' => __( 'Contact phone number.', 'classified-listing' ),
			],
			[
				'id'          => 'whatsapp',
				'label'       => __( 'WhatsApp', 'classified-listing' ),
				'type'        => 'text',
				'required'    => false,
				'description' => __( 'WhatsApp number.', 'classified-listing' ),
			],
			[
				'id'          => 'website',
				'label'       => __( 'Website', 'classified-listing' ),
				'type'        => 'url',
				'required'    => false,
				'description' => __( 'Contact website URL.', 'classified-listing' ),
			],
			[
				'id'          => 'address',
				'label'       => __( 'Address', 'classified-listing' ),
				'type'        => 'text',
				'required'    => false,
				'description' => __( 'Street address.', 'classified-listing' ),
			],
			[
				'id'          => 'zipcode',
				'label'       => __( 'Zip Code', 'classified-listing' ),
				'type'        => 'text',
				'required'    => false,
				'description' => __( 'Postal / ZIP code.', 'classified-listing' ),
			],
		];
	}

	/**
	 * Get custom fields for a category.
	 *
	 * @param int|null $category_id Category ID.
	 *
	 * @return array Custom field definitions.
	 */
	private function get_custom_fields( ?int $category_id ): array {
		if ( ! $category_id ) {
			return [];
		}

		$field_ids = Functions::get_custom_field_ids( $category_id );
		if ( empty( $field_ids ) ) {
			return [];
		}

		$fields = [];
		foreach ( $field_ids as $field_id ) {
			$cf = rtcl()->factory->get_custom_field( $field_id );
			if ( ! $cf ) {
				continue;
			}

			$field_data = [
				'id'       => $cf->getSlug() ?: 'field_' . $field_id,
				'label'    => $cf->getLabel(),
				'type'     => $this->map_field_type( $cf->getType() ),
				'required' => $cf->isRequired(),
			];

			// Add options for select/radio/checkbox fields
			$options = $cf->getOptions();
			if ( ! empty( $options ) ) {
				$field_data['options'] = array_values( $options );
			}

			// Add validation info if available
			$validation = $cf->getValidation();
			if ( $validation ) {
				$field_data['validation'] = $validation;
			}

			$fields[] = $field_data;
		}

		return $fields;
	}

	/**
	 * Get taxonomy information for categories and locations.
	 *
	 * @return array Taxonomy information.
	 */
	private function get_taxonomies(): array {
		$categories = $this->taxonomy_resolver->getAllCategories();
		$locations = $this->taxonomy_resolver->getAllLocations();

		return [
			'categories' => [
				'description' => __( 'Hierarchical listing categories. Use ID, slug, or path like "Parent > Child".', 'classified-listing' ),
				'items'       => array_slice( $categories, 0, 100 ), // Limit for response size
				'total'       => count( $categories ),
			],
			'locations'  => [
				'description' => __( 'Hierarchical locations. Use ID, slug, or path like "Country > State > City".', 'classified-listing' ),
				'items'       => array_slice( $locations, 0, 100 ),
				'total'       => count( $locations ),
			],
		];
	}

	/**
	 * Get available listing types.
	 *
	 * @return array Listing type options.
	 */
	private function get_listing_types(): array {
		$types = Functions::get_listing_types();
		$result = [];

		foreach ( $types as $key => $label ) {
			$result[] = [
				'value' => $key,
				'label' => $label,
			];
		}

		return $result;
	}

	/**
	 * Get available price types.
	 *
	 * @return array Price type options.
	 */
	private function get_price_types(): array {
		return [
			[ 'value' => 'regular', 'label' => __( 'Regular', 'classified-listing' ) ],
			[ 'value' => 'on_call', 'label' => __( 'On Call', 'classified-listing' ) ],
			[ 'value' => 'negotiable', 'label' => __( 'Negotiable', 'classified-listing' ) ],
			[ 'value' => 'fixed', 'label' => __( 'Fixed', 'classified-listing' ) ],
		];
	}

	/**
	 * Get available statuses.
	 *
	 * @return array Status options.
	 */
	private function get_statuses(): array {
		return [
			[ 'value' => 'publish', 'label' => __( 'Published', 'classified-listing' ), 'requires_capability' => 'publish_rtcl_listings' ],
			[ 'value' => 'pending', 'label' => __( 'Pending Review', 'classified-listing' ) ],
			[ 'value' => 'draft', 'label' => __( 'Draft', 'classified-listing' ) ],
		];
	}

	/**
	 * Map RTCL field types to schema types.
	 *
	 * @param string $rtcl_type RTCL field type.
	 *
	 * @return string Schema type.
	 */
	private function map_field_type( string $rtcl_type ): string {
		$map = [
			'text'     => 'text',
			'textarea' => 'textarea',
			'select'   => 'select',
			'radio'    => 'radio',
			'checkbox' => 'checkbox',
			'date'     => 'date',
			'number'   => 'number',
			'url'      => 'url',
		];

		return $map[ $rtcl_type ] ?? 'text';
	}
}
