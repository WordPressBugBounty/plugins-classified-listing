<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Services\Mcp\Helpers\ComplexFieldProcessor;

use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\FBHelper;
use Rtcl\Services\Mcp\Helpers\ImageHelper;
use Rtcl\Services\Mcp\Helpers\InteractivePromptHelper;
use Rtcl\Services\Mcp\Services\Import\SchemaService;

defined( 'ABSPATH' ) || exit;

/**
 * Form-aware listing creation service.
 *
 * Validates listing data against form schema and ensures all required
 * fields are present before creating/updating listings.
 */
class FormAwareListingService {

	/**
	 * Non-fatal problems of the current create/update (unmatched terms, failed images), returned to the client.
	 *
	 * @var string[]
	 */
	private $warnings = [];

	/**
	 * @var SchemaService
	 */
	private $schema_service;

	/**
	 * Preset field meta key mapping.
	 */
	private const PRESET_META_KEYS = [
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
		'phone'           => 'phone',
		'whatsapp'        => '_rtcl_whatsapp_number',
		'email'           => 'email',
		'website'         => 'website',
		'address'         => 'address',
		'zipcode'         => 'zipcode',
		'geo_location'    => '_rtcl_geo_address',
		'business_hours'  => '_rtcl_bhs',
		'social_profiles' => '_rtcl_social_profiles',
		'contact_person'  => '_rtcl_contact_person',
	];

	/**
	 * Supported custom field element types.
	 */
	private const SUPPORTED_FIELD_ELEMENTS = [
		'text',
		'textarea',
		'number',
		'select',
		'radio',
		'checkbox',
		'date',
		'date_range',
		'date_time',
		'date_time_range',
		'url',
		'email',
		'file',
		'color_picker',
		'hidden',
		'range',
	];

	public function __construct( ?SchemaService $schema_service = null ) {
		$this->schema_service = $schema_service ?: new SchemaService();
	}

	/**
	 * Create a listing with form validation.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * If form_id is not provided and multiple forms exist, returns an interactive
	 * prompt for form selection. If required fields are missing, returns a prompt
	 * for collecting missing data.
	 *
	 * @param array $data Listing data.
	 *
	 * @return array|\WP_Error Result, interactive prompt, or error.
	 */
	public function createListing( array $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to create listings.', 'classified-listing' ) );
		}
		$this->warnings = [];

		// Check if we need form selection (no form_id and multiple forms available)
		$form_selection_check = $this->checkFormSelection( $data );
		if ( $form_selection_check ) {
			return $form_selection_check;
		}

		// Resolve the form to use
		$form_resolution = $this->resolveForm( $data );
		if ( is_wp_error( $form_resolution ) ) {
			return $form_resolution;
		}

		$form = $form_resolution['form'];
		$form_id = $form_resolution['form_id'];

		// Check for missing required fields BEFORE creating the listing
		$missing_fields_check = $this->checkMissingRequiredFields( $form, $data, $form_id );
		if ( $missing_fields_check ) {
			return $missing_fields_check;
		}

		// Validate data against form schema
		$validation = $this->validateAgainstForm( $form, $data );
		if ( is_wp_error( $validation ) ) {
			return $validation;
		}

		// Prepare post data
		$postarr = [
			'post_type'    => rtcl()->post_type,
			'post_title'   => sanitize_text_field( $data['title'] ?? '' ),
			'post_content' => wp_kses_post( $data['description'] ?? '' ),
			'post_excerpt' => sanitize_textarea_field( $data['excerpt'] ?? '' ),
			'post_status'  => $this->resolveStatus( $data['status'] ?? '' ),
			'post_author'  => get_current_user_id(),
		];

		if ( ! empty( $data['slug'] ) ) {
			$postarr['post_name'] = sanitize_title( $data['slug'] );
		}

		// Insert post
		$post_id = wp_insert_post( $postarr, true );
		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}

		// Store form ID with listing
		if ( $form_id ) {
			update_post_meta( $post_id, '_rtcl_form_id', $form_id );
		}

		// Process all fields
		$this->processFormFields( $post_id, $form, $data );

		$post = get_post( $post_id );

		return [
			'listing_id' => $post_id,
			'title'      => $post->post_title,
			'slug'       => $post->post_name,
			'status'     => $post->post_status,
			'form_id'    => $form_id,
			'url'        => get_permalink( $post_id ),
			'message'    => __( 'Listing created successfully.', 'classified-listing' ),
		] + $this->warningsResponse();
	}

	/**
	 * Check if form selection is needed.
	 *
	 * Returns an interactive prompt if:
	 * - No form_id/form_slug provided
	 * - No category provided (can't auto-detect)
	 * - Multiple published forms exist
	 *
	 * @param array $data Input data.
	 *
	 * @return array|null Interactive prompt or null if no selection needed.
	 */
	private function checkFormSelection( array $data ): ?array {
		// Skip if form is explicitly provided
		if ( ! empty( $data['form_id'] ) || ! empty( $data['form_slug'] ) ) {
			return null;
		}

		// Skip if category is provided (form can be auto-detected)
		if ( ! empty( $data['category'] ) ) {
			return null;
		}

		// Skip if form builder is not enabled
		if ( ! $this->isFormBuilderEnabled() ) {
			return null;
		}

		// Get all published forms
		$forms = Form::query()->where( 'status', 'publish' )->get();

		// If only one form or no forms, no selection needed
		if ( empty( $forms ) || count( $forms ) <= 1 ) {
			return null;
		}

		// Multiple forms available - need user selection
		$forms_data = [];
		foreach ( $forms as $form ) {
			$fields = $form->getFields();
			$forms_data[] = [
				'id'          => $form->id,
				'title'       => $form->title,
				'slug'        => $form->slug,
				'is_default'  => (bool) $form->default,
				'field_count' => is_array( $fields ) ? count( $fields ) : 0,
			];
		}

		return InteractivePromptHelper::createFormSelectionPrompt( $forms_data );
	}

	/**
	 * Check for missing required fields.
	 *
	 * Returns an interactive prompt if required fields from the form are not provided.
	 *
	 * @param Form|null $form    Form instance.
	 * @param array     $data    Input data.
	 * @param int|null  $form_id Form ID.
	 *
	 * @return array|null Interactive prompt or null if all required fields present.
	 */
	private function checkMissingRequiredFields( ?Form $form, array $data, ?int $form_id ): ?array {
		if ( ! $form ) {
			// No form, just check title
			if ( empty( $data['title'] ) ) {
				return InteractivePromptHelper::createRequiredFieldsPrompt(
					[
						[
							'name'  => 'title',
							'label' => __( 'Title', 'classified-listing' ),
							'type'  => 'text',
						],
					],
					$data,
					0,
					__( 'Listing', 'classified-listing' )
				);
			}
			return null;
		}

		$fields = $form->getFields();
		if ( ! is_array( $fields ) ) {
			return null;
		}

		$missing_fields = [];

		// Only fields the form would actually show for this data count (section/field conditional logic,
		// e.g. category-specific fields), the same way FBHelper::formDataValidation() validates.
		$visible = $this->getVisibleFieldIds( $form, $this->buildLogicFormData( $form, $data ) );

		foreach ( $fields as $uuid => $field ) {
			// Check if field is required
			$is_required = ! empty( $field['validation']['required']['value'] );
			if ( ! $is_required ) {
				continue;
			}

			if ( null !== $visible && empty( $visible[ $uuid ] ) ) {
				continue;
			}

			// Front-end-only consent/captcha fields do not apply to listings created through the API.
			if ( in_array( $field['element'] ?? '', [ 'terms_and_condition', 'recaptcha' ], true ) ) {
				continue;
			}

			$element = $field['element'] ?? '';
			$name = $field['name'] ?? '';
			$label = $field['label'] ?? $name;
			$is_preset = ! empty( $field['preset'] );

			// Check if value is provided
			$has_value = false;

			if ( $is_preset ) {
				$has_value = $this->hasPresetValue( $element, $data );
			} else {
				// Custom field
				$has_value = isset( $data['custom_fields'][ $name ] ) && '' !== $data['custom_fields'][ $name ];
			}

			if ( ! $has_value ) {
				$field_info = [
					'name'    => $is_preset ? $element : $name,
					'label'   => $label,
					'type'    => $this->mapElementToType( $element ),
					'element' => $element,
					'preset'  => $is_preset,
				];

				// Include options for select/radio/checkbox
				if ( ! empty( $field['options'] ) && is_array( $field['options'] ) ) {
					$field_info['options'] = array_map( function( $opt ) {
						return [
							'value' => $opt['value'] ?? $opt,
							'label' => $opt['label'] ?? $opt['value'] ?? $opt,
						];
					}, $field['options'] );
				}

				$missing_fields[] = $field_info;
			}
		}

		if ( empty( $missing_fields ) ) {
			return null;
		}

		return InteractivePromptHelper::createRequiredFieldsPrompt(
			$missing_fields,
			$data,
			$form_id ?? 0,
			$form->title ?? __( 'Listing', 'classified-listing' )
		);
	}

	/**
	 * Form data keyed by field name, shaped like the front-end submission, for evaluating conditional logic.
	 *
	 * @param Form  $form Form.
	 * @param array $data Listing input.
	 *
	 * @return array
	 */
	private function buildLogicFormData( Form $form, array $data ): array {
		$form_data = [];
		$fields    = is_array( $form->fields ) ? $form->fields : [];

		foreach ( $fields as $field ) {
			$name = $field['name'] ?? '';
			if ( '' === $name ) {
				continue;
			}
			$element = $field['element'] ?? '';

			if ( 'category' === $element ) {
				$form_data[ $name ] = $this->resolveTermIdsForLogic( $data['category'] ?? $data['category_id'] ?? null, rtcl()->category );
			} elseif ( 'location' === $element ) {
				$form_data[ $name ] = $this->resolveTermIdsForLogic( $data['location'] ?? $data['location_id'] ?? null, rtcl()->location );
			} elseif ( 'listing_type' === $element ) {
				$form_data[ $name ] = $data['listing_type'] ?? null;
			} elseif ( isset( $data['custom_fields'][ $name ] ) ) {
				$form_data[ $name ] = $data['custom_fields'][ $name ];
			} elseif ( isset( $data[ $name ] ) ) {
				$form_data[ $name ] = $data[ $name ];
			}
		}

		return $form_data;
	}

	/**
	 * Term IDs (with ancestors) for a category/location input: ID, slug, name or "Parent > Child" path.
	 *
	 * @param mixed  $value    Input value.
	 * @param string $taxonomy Taxonomy.
	 *
	 * @return int[]
	 */
	private function resolveTermIdsForLogic( $value, string $taxonomy ): array {
		if ( null === $value || '' === $value || ! taxonomy_exists( $taxonomy ) ) {
			return [];
		}

		$values = is_array( $value ) ? $value : [ $value ];
		$ids    = [];
		foreach ( $values as $item ) {
			if ( is_array( $item ) ) {
				$item = $item['id'] ?? $item['term_id'] ?? $item['name'] ?? '';
			}
			if ( is_numeric( $item ) ) {
				$term = get_term( (int) $item, $taxonomy );
			} else {
				$parts = array_map( 'trim', explode( '>', (string) $item ) );
				$leaf  = (string) end( $parts );
				$term  = get_term_by( 'slug', sanitize_title( $leaf ), $taxonomy ) ?: get_term_by( 'name', $leaf, $taxonomy );
			}
			if ( $term && ! is_wp_error( $term ) ) {
				$ids[] = (int) $term->term_id;
				$ids   = array_merge( $ids, array_map( 'intval', get_ancestors( $term->term_id, $taxonomy, 'taxonomy' ) ) );
			}
		}

		return array_values( array_unique( $ids ) );
	}

	/**
	 * Field UUIDs the form shows for the given data, or null when the form has no sections.
	 *
	 * @param Form  $form      Form.
	 * @param array $form_data Form data keyed by field name.
	 *
	 * @return array<string, true>|null
	 */
	private function getVisibleFieldIds( Form $form, array $form_data ): ?array {
		$sections = is_array( $form->sections ) ? $form->sections : [];
		$fields   = is_array( $form->fields ) ? $form->fields : [];
		if ( empty( $sections ) ) {
			return null;
		}

		$visible = [];
		foreach ( $sections as $section ) {
			$logics = $section['logics'] ?? [];
			if ( is_array( $logics ) && in_array( $logics['status'] ?? null, [ true, 'true' ], true ) && ! FBHelper::isValidateCondition( $form_data, $logics, $fields ) ) {
				continue;
			}
			foreach ( (array) ( $section['containers'] ?? [] ) as $column ) {
				foreach ( (array) ( $column['fields'] ?? [] ) as $field_id ) {
					$field = $fields[ $field_id ] ?? null;
					if ( ! $field ) {
						continue;
					}
					$field_logics = $field['logics'] ?? [];
					if ( is_array( $field_logics ) && in_array( $field_logics['status'] ?? null, [ true, 'true' ], true ) && ! FBHelper::isValidateCondition( $form_data, $field_logics, $fields ) ) {
						continue;
					}
					$visible[ $field_id ] = true;
				}
			}
		}

		return $visible;
	}

	/**
	 * Check if a preset field has a value in the data.
	 *
	 * @param string $element Preset element type.
	 * @param array  $data    Input data.
	 *
	 * @return bool True if value is present.
	 */
	private function hasPresetValue( string $element, array $data ): bool {
		switch ( $element ) {
			case 'title':
				return ! empty( $data['title'] );

			case 'description':
				return ! empty( $data['description'] );

			case 'excerpt':
				return ! empty( $data['excerpt'] );

			case 'pricing':
				return isset( $data['price'] ) && '' !== $data['price'];

			case 'category':
				return ! empty( $data['category'] );

			case 'location':
				return ! empty( $data['location'] );

			case 'tag':
				return ! empty( $data['tags'] );

			case 'images':
				return ! empty( $data['images'] );

			case 'video_urls':
				return ! empty( $data['video_urls'] );

			case 'listing_type':
				return ! empty( $data['listing_type'] );

			case 'phone':
				return ! empty( $data['contact']['phone'] ) || ! empty( $data['phone'] );

			case 'email':
				return ! empty( $data['contact']['email'] ) || ! empty( $data['email'] );

			case 'whatsapp':
				return ! empty( $data['contact']['whatsapp'] ) || ! empty( $data['whatsapp'] );

			case 'website':
				return ! empty( $data['contact']['website'] ) || ! empty( $data['website'] );

			case 'address':
				return ! empty( $data['contact']['address'] ) || ! empty( $data['address'] );

			case 'zipcode':
				return ! empty( $data['contact']['zipcode'] ) || ! empty( $data['zipcode'] );

			case 'contact_person':
				return ! empty( $data['contact']['contact_person'] ) || ! empty( $data['contact_person'] );

			case 'geo_location':
				return ! empty( $data['geo_location'] );

			case 'business_hours':
				return ! empty( $data['business_hours'] );

			case 'social_profiles':
				return ! empty( $data['social_profiles'] );

			default:
				return false;
		}
	}

	/**
	 * Update a listing with form validation.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int   $listing_id Listing ID.
	 * @param array $data       Update data.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function updateListing( int $listing_id, array $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update listings.', 'classified-listing' ) );
		}
		$this->warnings = [];

		$post = get_post( $listing_id );
		if ( ! $post || rtcl()->post_type !== $post->post_type ) {
			return new \WP_Error(
				'listing_not_found',
				__( 'Listing not found.', 'classified-listing' )
			);
		}

		// Get form from listing or resolve new one
		$existing_form_id = (int) get_post_meta( $listing_id, '_rtcl_form_id', true );

		if ( ! empty( $data['form_id'] ) ) {
			$form_id = absint( $data['form_id'] );
		} else {
			$form_id = $existing_form_id ?: null;
		}

		$form = null;
		if ( $form_id && $this->isFormBuilderEnabled() ) {
			$form = Form::query()->find( $form_id );
		}

		// If still no form, try to get default
		if ( ! $form && $this->isFormBuilderEnabled() ) {
			$form = Form::query()->where( 'default', 1 )->first();
			$form_id = $form ? $form->id : null;
		}

		// Validate if we have a form
		if ( $form ) {
			$validation = $this->validateAgainstForm( $form, $data, true );
			if ( is_wp_error( $validation ) ) {
				return $validation;
			}
		}

		// Prepare update data
		$postarr = [ 'ID' => $listing_id ];

		if ( isset( $data['title'] ) ) {
			$postarr['post_title'] = sanitize_text_field( $data['title'] );
		}
		if ( isset( $data['description'] ) ) {
			$postarr['post_content'] = wp_kses_post( $data['description'] );
		}
		if ( isset( $data['excerpt'] ) ) {
			$postarr['post_excerpt'] = sanitize_textarea_field( $data['excerpt'] );
		}
		// Handle status - use RTCL settings for edited listings when not explicitly provided
		$new_status = $this->resolveUpdateStatus( $data['status'] ?? '', $post->post_status );
		if ( $new_status !== $post->post_status ) {
			$postarr['post_status'] = $new_status;
		}

		if ( isset( $data['slug'] ) ) {
			$postarr['post_name'] = sanitize_title( $data['slug'] );
		}

		// Update post
		$result = wp_update_post( $postarr, true );
		if ( is_wp_error( $result ) ) {
			return $result;
		}

		// Update form ID if changed
		if ( $form_id && $form_id !== $existing_form_id ) {
			update_post_meta( $listing_id, '_rtcl_form_id', $form_id );
		}

		// Process fields
		if ( $form ) {
			$this->processFormFields( $listing_id, $form, $data, true );
		} else {
			$this->processFieldsWithoutForm( $listing_id, $data );
		}

		$post = get_post( $listing_id );

		return [
			'listing_id' => $listing_id,
			'title'      => $post->post_title,
			'slug'       => $post->post_name,
			'status'     => $post->post_status,
			'form_id'    => $form_id,
			'url'        => get_permalink( $listing_id ),
			'message'    => __( 'Listing updated successfully.', 'classified-listing' ),
		] + $this->warningsResponse();
	}

	/**
	 * Resolve which form to use for listing.
	 *
	 * Priority:
	 * 1. Explicit form_id
	 * 2. Explicit form_slug
	 * 3. Auto-detect from category (if category has associated form)
	 * 4. Default form
	 *
	 * @param array $data Listing data.
	 *
	 * @return array|\WP_Error Form resolution result.
	 */
	public function resolveForm( array $data ) {
		if ( ! $this->isFormBuilderEnabled() ) {
			return [
				'form'    => null,
				'form_id' => null,
				'method'  => 'disabled',
			];
		}

		$form = null;
		$method = 'none';

		// 1. Explicit form_id
		if ( ! empty( $data['form_id'] ) ) {
			$form = Form::query()->find( absint( $data['form_id'] ) );
			if ( ! $form ) {
				return new \WP_Error(
					'form_not_found',
					__( 'Specified form not found.', 'classified-listing' )
				);
			}
			$method = 'explicit_id';
		}

		// 2. Explicit form_slug
		if ( ! $form && ! empty( $data['form_slug'] ) ) {
			$form = Form::query()->where( 'slug', sanitize_title( $data['form_slug'] ) )->first();
			if ( ! $form ) {
				return new \WP_Error(
					'form_not_found',
					__( 'Specified form slug not found.', 'classified-listing' )
				);
			}
			$method = 'explicit_slug';
		}

		// 3. Auto-detect from category
		if ( ! $form && ! empty( $data['category'] ) ) {
			$category_form = $this->getFormForCategory( $data['category'] );
			if ( $category_form ) {
				$form = $category_form;
				$method = 'auto_category';
			}
		}

		// 4. Default form
		if ( ! $form ) {
			$form = Form::query()->where( 'default', 1 )->first();
			if ( $form ) {
				$method = 'default';
			}
		}

		// If still no form and auto_form is required, error
		if ( ! $form && ! empty( $data['require_form'] ) ) {
			return new \WP_Error(
				'no_form_available',
				__( 'No form available. Please specify a form_id or ensure a default form exists.', 'classified-listing' )
			);
		}

		return [
			'form'    => $form,
			'form_id' => $form ? $form->id : null,
			'method'  => $method,
		];
	}

	/**
	 * Get form associated with a category.
	 *
	 * @param mixed $category Category ID, slug, or name.
	 *
	 * @return Form|null
	 */
	private function getFormForCategory( $category ): ?Form {
		// Resolve category to term
		$term = null;
		if ( is_numeric( $category ) ) {
			$term = get_term( (int) $category, rtcl()->category );
		} else {
			$term = get_term_by( 'slug', sanitize_title( $category ), rtcl()->category );
			if ( ! $term ) {
				$term = get_term_by( 'name', $category, rtcl()->category );
			}
		}

		if ( ! $term || is_wp_error( $term ) ) {
			return null;
		}

		// Check for category-specific form (stored in term meta)
		$form_id = get_term_meta( $term->term_id, '_rtcl_form_id', true );
		if ( $form_id ) {
			$form = Form::query()->find( (int) $form_id );
			if ( $form ) {
				return $form;
			}
		}

		// Check parent categories
		if ( $term->parent ) {
			return $this->getFormForCategory( $term->parent );
		}

		return null;
	}

	/**
	 * Validate listing data against form schema.
	 *
	 * @param Form  $form      Form object.
	 * @param array $data      Listing data.
	 * @param bool  $is_update Whether this is an update (partial data allowed).
	 *
	 * @return true|\WP_Error
	 */
	public function validateAgainstForm( Form $form, array $data, bool $is_update = false ) {
		$fields = $form->getFields();
		if ( ! is_array( $fields ) ) {
			return true;
		}

		$errors = [];
		$available_fields = [];

		// Build list of available field names/meta keys
		foreach ( $fields as $uuid => $field ) {
			$name = $field['name'] ?? '';
			$element = $field['element'] ?? '';

			if ( $name ) {
				$available_fields[ $name ] = $field;
			}
			if ( $element ) {
				$available_fields[ $element ] = $field;
			}
		}

		// Validate required fields (only for create, not update)
		if ( ! $is_update ) {
			// Same visibility rules as checkMissingRequiredFields(): hidden conditional fields are not required.
			$visible = $this->getVisibleFieldIds( $form, $this->buildLogicFormData( $form, $data ) );

			foreach ( $fields as $uuid => $field ) {
				$is_required = ! empty( $field['validation']['required']['value'] );
				if ( ! $is_required ) {
					continue;
				}

				if ( ( null !== $visible && empty( $visible[ $uuid ] ) ) || in_array( $field['element'] ?? '', [ 'terms_and_condition', 'recaptcha' ], true ) ) {
					continue;
				}

				$name = $field['name'] ?? '';
				$element = $field['element'] ?? '';
				$label = $field['label'] ?? $name;

				// Check if required field is provided
				$has_value = false;

				// Check preset field mappings
				if ( ! empty( $field['preset'] ) ) {
					switch ( $element ) {
						case 'title':
							$has_value = ! empty( $data['title'] );
							break;
						case 'description':
							$has_value = ! empty( $data['description'] );
							break;
						case 'pricing':
							$has_value = isset( $data['price'] ) && '' !== $data['price'];
							break;
						case 'category':
							$has_value = ! empty( $data['category'] ) || ! empty( $data['category_id'] );
							break;
						case 'location':
							$has_value = ! empty( $data['location'] ) || ! empty( $data['location_id'] );
							break;
						case 'images':
							$has_value = ! empty( $data['images'] );
							break;
						case 'phone':
							$has_value = ! empty( $data['contact']['phone'] ) || ! empty( $data['phone'] );
							break;
						case 'email':
							$has_value = ! empty( $data['contact']['email'] ) || ! empty( $data['email'] );
							break;
						default:
							// Check in contact or directly
							$has_value = ! empty( $data['contact'][ $element ] ) || ! empty( $data[ $element ] );
					}
				} else {
					// Custom field - check in custom_fields array
					$has_value = isset( $data['custom_fields'][ $name ] ) && '' !== $data['custom_fields'][ $name ];
				}

				if ( ! $has_value ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( 'Required field "%s" is missing.', 'classified-listing' ),
						$label
					);
				}
			}
		}

		// Validate custom_fields exist in form
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			$unknown_fields = [];
			foreach ( array_keys( $data['custom_fields'] ) as $field_key ) {
				if ( ! isset( $available_fields[ $field_key ] ) ) {
					$unknown_fields[] = $field_key;
				}
			}

			if ( ! empty( $unknown_fields ) && ! empty( $data['strict_validation'] ) ) {
				$errors[] = sprintf(
					/* translators: %s: field names */
					__( 'Unknown custom fields: %s. These fields are not in the selected form.', 'classified-listing' ),
					implode( ', ', $unknown_fields )
				);
			}
		}

		// Validate field values against validation rules
		foreach ( $fields as $uuid => $field ) {
			$name = $field['name'] ?? '';
			$element = $field['element'] ?? '';
			$validation = $field['validation'] ?? [];
			$label = $field['label'] ?? $name;

			// Get field value
			$value = null;
			if ( ! empty( $field['preset'] ) ) {
				// Map preset field to data
				$value = $this->getPresetFieldValue( $element, $data );
			} else {
				$value = $data['custom_fields'][ $name ] ?? null;
			}

			if ( null === $value || '' === $value ) {
				continue; // Skip validation for empty non-required fields
			}

			// Validate based on element type
			$type_errors = $this->validateFieldByType( $element, $value, $label, $field );
			$errors = array_merge( $errors, $type_errors );

			// Validate min/max
			if ( isset( $validation['min']['value'] ) && '' !== $validation['min']['value'] && is_numeric( $validation['min']['value'] ) ) {
				$min = $validation['min']['value'];
				if ( is_numeric( $value ) && $value < $min ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: minimum value */
						__( '%1$s must be at least %2$s.', 'classified-listing' ),
						$label,
						$min
					);
				} elseif ( is_string( $value ) && strlen( $value ) < $min ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: minimum length */
						__( '%1$s must be at least %2$s characters.', 'classified-listing' ),
						$label,
						$min
					);
				}
			}

			if ( isset( $validation['max']['value'] ) && '' !== $validation['max']['value'] && is_numeric( $validation['max']['value'] ) ) {
				$max = $validation['max']['value'];
				if ( is_numeric( $value ) && $value > $max ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: maximum value */
						__( '%1$s must be at most %2$s.', 'classified-listing' ),
						$label,
						$max
					);
				} elseif ( is_string( $value ) && strlen( $value ) > $max ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: maximum length */
						__( '%1$s must be at most %2$s characters.', 'classified-listing' ),
						$label,
						$max
					);
				}
			}

			// Validate minLength/maxLength (Form Builder uses both)
			if ( isset( $validation['minLength']['value'] ) && '' !== $validation['minLength']['value'] && is_numeric( $validation['minLength']['value'] ) && is_string( $value ) ) {
				$minLen = (int) $validation['minLength']['value'];
				if ( $minLen > 0 && strlen( $value ) < $minLen ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: minimum length */
						__( '%1$s must be at least %2$s characters.', 'classified-listing' ),
						$label,
						$minLen
					);
				}
			}

			if ( isset( $validation['maxLength']['value'] ) && '' !== $validation['maxLength']['value'] && is_numeric( $validation['maxLength']['value'] ) && is_string( $value ) ) {
				$maxLen = (int) $validation['maxLength']['value'];
				if ( $maxLen > 0 && strlen( $value ) > $maxLen ) {
					$errors[] = sprintf(
						/* translators: 1: field label, 2: maximum length */
						__( '%1$s must be at most %2$s characters.', 'classified-listing' ),
						$label,
						$maxLen
					);
				}
			}

			// Validate pattern
			if ( ! empty( $validation['regex']['value'] ) || ! empty( $validation['pattern']['value'] ) ) {
				$pattern = $validation['regex']['value'] ?? $validation['pattern']['value'];
				if ( is_string( $value ) && ! preg_match( '/' . $pattern . '/', $value ) ) {
					$errors[] = $validation['regex']['message'] ?? $validation['pattern']['message'] ?? sprintf(
						/* translators: %s: field label */
						__( '%s does not match the required format.', 'classified-listing' ),
						$label
					);
				}
			}

			// Validate select/radio/checkbox options
			if ( in_array( $element, [ 'select', 'radio', 'checkbox' ], true ) && ! empty( $field['options'] ) ) {
				$valid_values = array_column( $field['options'], 'value' );
				$check_values = is_array( $value ) ? $value : [ $value ];

				foreach ( $check_values as $v ) {
					if ( '' !== $v && ! in_array( (string) $v, array_map( 'strval', $valid_values ), true ) ) {
						$errors[] = sprintf(
							/* translators: 1: value, 2: field label */
							__( '"%1$s" is not a valid option for %2$s.', 'classified-listing' ),
							$v,
							$label
						);
					}
				}
			}
		}

		if ( ! empty( $errors ) ) {
			return new \WP_Error(
				'validation_failed',
				implode( ' ', $errors ),
				[ 'errors' => $errors ]
			);
		}

		return true;
	}

	/**
	 * Get form field schema for API response.
	 *
	 * @param Form $form Form object.
	 *
	 * @return array Field schema.
	 */
	public function getFormFieldSchema( Form $form ): array {
		$fields = $form->getFields();
		if ( ! is_array( $fields ) ) {
			return [];
		}

		$schema = [
			'preset_fields'  => [],
			'custom_fields'  => [],
		];

		foreach ( $fields as $uuid => $field ) {
			$is_preset = ! empty( $field['preset'] );
			$element = $field['element'] ?? '';
			$name = $field['name'] ?? '';

			$field_schema = [
				'name'        => $name,
				'element'     => $element,
				'label'       => $field['label'] ?? '',
				'type'        => $this->mapElementToType( $element ),
				'required'    => ! empty( $field['validation']['required']['value'] ),
				'meta_key'    => $this->getFieldMetaKey( $field ),
				'input_key'   => $this->getFieldInputKey( $field ),
			];

			// Add placeholder
			if ( ! empty( $field['placeholder'] ) ) {
				$field_schema['placeholder'] = $field['placeholder'];
			}

			// Add help text
			if ( ! empty( $field['help_message'] ) ) {
				$field_schema['help_text'] = $field['help_message'];
			}

			// Add options
			if ( ! empty( $field['options'] ) ) {
				$field_schema['options'] = array_map( function( $opt ) {
					return [
						'value' => $opt['value'] ?? '',
						'label' => $opt['label'] ?? $opt['value'] ?? '',
					];
				}, $field['options'] );
			}

			// Add validation rules
			if ( ! empty( $field['validation'] ) ) {
				$field_schema['validation'] = $this->formatValidationRules( $field['validation'] );
			}

			if ( $is_preset ) {
				$schema['preset_fields'][] = $field_schema;
			} else {
				$schema['custom_fields'][] = $field_schema;
			}
		}

		return $schema;
	}

	/**
	 * Process form fields and save to listing.
	 *
	 * @param int   $post_id   Post ID.
	 * @param Form  $form      Form object.
	 * @param array $data      Listing data.
	 * @param bool  $is_update Is this an update.
	 */
	private function processFormFields( int $post_id, Form $form, array $data, bool $is_update = false ): void {
		$fields = $form->getFields();
		if ( ! is_array( $fields ) ) {
			$this->processFieldsWithoutForm( $post_id, $data );
			return;
		}

		// Process preset fields
		$this->processPresetFields( $post_id, $data );

		// Process custom fields from form
		foreach ( $fields as $uuid => $field ) {
			if ( ! empty( $field['preset'] ) ) {
				continue; // Already handled
			}

			$name = $field['name'] ?? '';
			$element = $field['element'] ?? '';

			if ( ! $name ) {
				continue;
			}

			// Get value from custom_fields
			if ( ! isset( $data['custom_fields'][ $name ] ) ) {
				continue;
			}

			$value = $data['custom_fields'][ $name ];
			$sanitized = $this->sanitizeFieldValue( $value, $element, $field );

			// Handle special field types that need different storage
			$this->saveCustomFieldValue( $post_id, $name, $element, $sanitized, $field );
		}
	}

	/**
	 * Save custom field value with proper handling for different types.
	 *
	 * @param int    $post_id   Post ID.
	 * @param string $name      Field name/meta key.
	 * @param string $element   Field element type.
	 * @param mixed  $value     Sanitized value.
	 * @param array  $field     Field configuration.
	 */
	private function saveCustomFieldValue( int $post_id, string $name, string $element, $value, array $field ): void {
		switch ( $element ) {
			case 'date_range':
			case 'date_time_range':
				// Date ranges store start/end in separate meta keys
				if ( is_array( $value ) ) {
					update_post_meta( $post_id, $name . '_start', $value['start'] ?? '' );
					update_post_meta( $post_id, $name . '_end', $value['end'] ?? '' );
					// Also store combined value for compatibility
					update_post_meta( $post_id, $name, $value );
				}
				break;

			case 'file':
				// Handle file uploads - sideload URLs if needed
				$file_ids = $this->processFileField( $post_id, $value );
				update_post_meta( $post_id, $name, $file_ids );
				break;

			case 'checkbox':
				// Checkbox arrays need serialization handling
				if ( is_array( $value ) ) {
					update_post_meta( $post_id, $name, $value );
				} else {
					update_post_meta( $post_id, $name, $value );
				}
				break;

			default:
				update_post_meta( $post_id, $name, $value );
				break;
		}
	}

	/**
	 * Process file field - handle URLs and attachment IDs.
	 *
	 * @param int   $post_id Post ID.
	 * @param mixed $value   File value (URL, ID, or array).
	 *
	 * @return array|int Attachment ID(s).
	 */
	private function processFileField( int $post_id, $value ) {
		if ( empty( $value ) ) {
			return '';
		}

		// Single file
		if ( ! is_array( $value ) ) {
			return $this->processFileSingle( $post_id, $value );
		}

		// Multiple files
		$attachment_ids = [];
		foreach ( $value as $file ) {
			$id = $this->processFileSingle( $post_id, $file );
			if ( $id ) {
				$attachment_ids[] = $id;
			}
		}

		return $attachment_ids;
	}

	/**
	 * Process single file - sideload URL or validate attachment ID.
	 *
	 * @param int   $post_id Post ID.
	 * @param mixed $value   File value.
	 *
	 * @return int|string Attachment ID or empty string.
	 */
	private function processFileSingle( int $post_id, $value ) {
		// Already an attachment ID
		if ( is_numeric( $value ) ) {
			$attachment = get_post( absint( $value ) );
			if ( $attachment && 'attachment' === $attachment->post_type ) {
				return absint( $value );
			}
			return '';
		}

		// URL - sideload
		if ( is_string( $value ) && filter_var( $value, FILTER_VALIDATE_URL ) ) {
			if ( ! function_exists( 'media_sideload_image' ) ) {
				require_once ABSPATH . 'wp-admin/includes/media.php';
				require_once ABSPATH . 'wp-admin/includes/file.php';
				require_once ABSPATH . 'wp-admin/includes/image.php';
			}

			// Use media_handle_sideload for non-image files
			$tmp = download_url( $value, 30 );
			if ( is_wp_error( $tmp ) ) {
				return '';
			}

			$file_array = [
				'name'     => basename( parse_url( $value, PHP_URL_PATH ) ),
				'tmp_name' => $tmp,
			];

			$attachment_id = media_handle_sideload( $file_array, $post_id );
			if ( is_wp_error( $attachment_id ) ) {
				@unlink( $tmp );
				return '';
			}

			return $attachment_id;
		}

		return '';
	}

	/**
	 * Process fields without form schema.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $data    Listing data.
	 */
	private function processFieldsWithoutForm( int $post_id, array $data ): void {
		$this->processPresetFields( $post_id, $data );

		// Process custom fields directly
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			foreach ( $data['custom_fields'] as $key => $value ) {
				$safe_key = sanitize_key( $key );
				if ( ! ComplexFieldProcessor::isWritableCustomFieldKey( $safe_key ) ) {
					continue;
				}

				$sanitized = is_array( $value )
					? array_map( 'sanitize_text_field', $value )
					: sanitize_text_field( $value );

				update_post_meta( $post_id, $safe_key, $sanitized );
			}
		}
	}

	/**
	 * Process preset (standard) fields.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $data    Listing data.
	 */
	private function processPresetFields( int $post_id, array $data ): void {
		// Price
		if ( isset( $data['price'] ) && is_numeric( $data['price'] ) ) {
			update_post_meta( $post_id, 'price', (float) $data['price'] );
			update_post_meta( $post_id, '_rtcl_price', (float) $data['price'] );
		}

		// Price type
		if ( ! empty( $data['price_type'] ) ) {
			$allowed = [ 'regular', 'on_call', 'negotiable', 'fixed' ];
			$price_type = sanitize_key( $data['price_type'] );
			if ( in_array( $price_type, $allowed, true ) ) {
				update_post_meta( $post_id, 'price_type', $price_type );
			}
		}

		// Listing type (ad_type)
		if ( ! empty( $data['listing_type'] ) ) {
			$allowed = [ 'sell', 'buy', 'exchange', 'job', 'to_let' ];
			$listing_type = sanitize_key( $data['listing_type'] );
			if ( in_array( $listing_type, $allowed, true ) ) {
				update_post_meta( $post_id, 'ad_type', $listing_type );
			}
		}

		// Category
		if ( ! empty( $data['category'] ) || ! empty( $data['category_id'] ) ) {
			$this->setTaxonomyTerm( $post_id, $data['category'] ?? $data['category_id'], rtcl()->category );
		}

		// Location
		if ( ! empty( $data['location'] ) || ! empty( $data['location_id'] ) ) {
			$this->setTaxonomyTerm( $post_id, $data['location'] ?? $data['location_id'], rtcl()->location );
		}

		// Tags
		if ( ! empty( $data['tags'] ) && is_array( $data['tags'] ) ) {
			$tag_ids = [];
			foreach ( $data['tags'] as $tag_name ) {
				$tag_name = trim( sanitize_text_field( $tag_name ) );
				if ( '' === $tag_name ) {
					continue;
				}
				$check = term_exists( $tag_name, rtcl()->tag );
				if ( ! $check ) {
					$check = wp_insert_term( $tag_name, rtcl()->tag );
				}
				if ( ! is_wp_error( $check ) && ! empty( $check['term_id'] ) ) {
					$tag_ids[] = (int) $check['term_id'];
				}
			}
			if ( ! empty( $tag_ids ) ) {
				wp_set_object_terms( $post_id, $tag_ids, rtcl()->tag );
			}
		}

		// Contact info (can be in 'contact' array or flat)
		$contact = $data['contact'] ?? [];

		$contact_fields = [
			'email'    => 'email',
			'phone'    => 'phone',
			'whatsapp' => '_rtcl_whatsapp_number',
			'website'  => 'website',
			'address'  => 'address',
			'zipcode'  => 'zipcode',
		];

		foreach ( $contact_fields as $key => $meta_key ) {
			$value = $contact[ $key ] ?? $data[ $key ] ?? null;
			if ( null !== $value && '' !== $value ) {
				if ( 'email' === $key ) {
					update_post_meta( $post_id, $meta_key, sanitize_email( $value ) );
				} elseif ( 'website' === $key ) {
					update_post_meta( $post_id, $meta_key, esc_url_raw( $value ) );
				} else {
					update_post_meta( $post_id, $meta_key, sanitize_text_field( $value ) );
				}
			}
		}

		// Images
		if ( ! empty( $data['images'] ) && is_array( $data['images'] ) ) {
			$this->processImages( $post_id, $data['images'] );
		}

		// Video URLs
		if ( ! empty( $data['video_urls'] ) && is_array( $data['video_urls'] ) ) {
			$video_urls = array_filter( array_map( 'esc_url_raw', $data['video_urls'] ) );
			update_post_meta( $post_id, '_rtcl_video_urls', $video_urls );
		}

		// Geo location
		if ( ! empty( $data['geo_location'] ) ) {
			$geo = $data['geo_location'];
			if ( ! empty( $geo['latitude'] ) && ! empty( $geo['longitude'] ) ) {
				update_post_meta( $post_id, '_rtcl_geo_address', sanitize_text_field( $geo['address'] ?? '' ) );
				update_post_meta( $post_id, '_rtcl_latitude', floatval( $geo['latitude'] ) );
				update_post_meta( $post_id, '_rtcl_longitude', floatval( $geo['longitude'] ) );
			}
		}

		// Contact person
		$contact_person = $contact['contact_person'] ?? $data['contact_person'] ?? null;
		if ( null !== $contact_person && '' !== $contact_person ) {
			update_post_meta( $post_id, '_rtcl_contact_person', sanitize_text_field( $contact_person ) );
		}

		// Business hours
		if ( ! empty( $data['business_hours'] ) ) {
			$business_hours = $this->sanitizeBusinessHours( $data['business_hours'] );
			if ( ! empty( $business_hours ) ) {
				update_post_meta( $post_id, '_rtcl_bhs', $business_hours );
				// Enable business hours feature for this listing
				update_post_meta( $post_id, '_rtcl_active_bhs', '1' );
			}
		}

		// Social profiles
		if ( ! empty( $data['social_profiles'] ) ) {
			$social_profiles = $this->sanitizeSocialProfiles( $data['social_profiles'] );
			if ( ! empty( $social_profiles ) ) {
				update_post_meta( $post_id, '_rtcl_social_profiles', $social_profiles );
			}
		}
	}

	/**
	 * Sanitize business hours data.
	 *
	 * RTCL Form Builder expects this structure:
	 *
	 * For 24/7 (open all day, every day):
	 * { "active": 1, "type": "247" }
	 *
	 * For selective hours:
	 * {
	 *   "active": 1,
	 *   "type": "selective",
	 *   "days": {
	 *     "1": { "open": 1, "times": [{ "start": "HH:MM", "end": "HH:MM" }] },
	 *     "2": { "open": 1, "times": [...] }
	 *   }
	 * }
	 * Days use numeric indices: 0=Sunday, 1=Monday, ..., 6=Saturday
	 *
	 * Accepts multiple input formats and normalizes to RTCL format.
	 *
	 * @param mixed $hours Business hours data.
	 *
	 * @return array Sanitized business hours.
	 */
	private function sanitizeBusinessHours( $hours ): array {
		if ( ! is_array( $hours ) ) {
			return [];
		}

		// Check for 24/7 mode
		$is_247 = false;
		if ( isset( $hours['type'] ) ) {
			$type = strtolower( trim( (string) $hours['type'] ) );
			if ( in_array( $type, [ '247', '24/7', '24-7', 'always', 'all_day', 'allday' ], true ) ) {
				$is_247 = true;
			}
		}
		// Also check for explicit 24/7 flags
		if ( ! empty( $hours['24_7'] ) || ! empty( $hours['247'] ) || ! empty( $hours['always_open'] ) || ! empty( $hours['all_day'] ) ) {
			$is_247 = true;
		}

		// Return 24/7 format
		if ( $is_247 ) {
			return [
				'active' => 1,
				'type'   => '247',
			];
		}

		// Map day names to numeric indices (0=Sunday, 1=Monday, ..., 6=Saturday)
		$day_name_to_index = [
			'sunday'    => 0,
			'monday'    => 1,
			'tuesday'   => 2,
			'wednesday' => 3,
			'thursday'  => 4,
			'friday'    => 5,
			'saturday'  => 6,
			// Short forms
			'sun'       => 0,
			'mon'       => 1,
			'tue'       => 2,
			'wed'       => 3,
			'thu'       => 4,
			'fri'       => 5,
			'sat'       => 6,
			// String numeric keys (from JSON)
			'0'         => 0,
			'1'         => 1,
			'2'         => 2,
			'3'         => 3,
			'4'         => 4,
			'5'         => 5,
			'6'         => 6,
		];

		$days = [];
		$has_open_day = false;

		foreach ( $hours as $day_key => $day_data ) {
			// Skip non-day keys
			if ( in_array( $day_key, [ 'type', 'active', '24_7', '247', 'always_open', 'all_day' ], true ) ) {
				continue;
			}

			// Convert day key to numeric index
			$day_index = null;
			if ( is_string( $day_key ) ) {
				$day_key_lower = strtolower( trim( $day_key ) );
				if ( isset( $day_name_to_index[ $day_key_lower ] ) ) {
					$day_index = $day_name_to_index[ $day_key_lower ];
				}
			} elseif ( is_int( $day_key ) && $day_key >= 0 && $day_key <= 6 ) {
				$day_index = $day_key;
			}

			if ( null === $day_index ) {
				continue; // Unknown day
			}

			// Handle non-array values (false, 'off', 'closed')
			if ( ! is_array( $day_data ) ) {
				if ( false === $day_data || 'off' === strtolower( (string) $day_data ) || 'closed' === strtolower( (string) $day_data ) ) {
					$days[ $day_index ] = [ 'open' => false ];
				}
				continue;
			}

			// Determine if day is open
			$is_open = true;
			if ( isset( $day_data['open'] ) ) {
				$is_open = ! empty( $day_data['open'] );
			} elseif ( isset( $day_data['active'] ) ) {
				$is_open = ! empty( $day_data['active'] );
			} elseif ( isset( $day_data['closed'] ) && $day_data['closed'] ) {
				$is_open = false;
			} elseif ( isset( $day_data['off'] ) && $day_data['off'] ) {
				$is_open = false;
			}

			if ( ! $is_open ) {
				$days[ $day_index ] = [ 'open' => false ];
				continue;
			}

			// Collect time slots
			$times = [];

			// Check for 'times' array (RTCL native format)
			if ( isset( $day_data['times'] ) && is_array( $day_data['times'] ) ) {
				foreach ( $day_data['times'] as $slot ) {
					if ( is_array( $slot ) ) {
						$start = $this->sanitizeTime( $slot['start'] ?? $slot['open'] ?? '' );
						$end   = $this->sanitizeTime( $slot['end'] ?? $slot['close'] ?? '' );
						if ( $start && $end ) {
							$times[] = [ 'start' => $start, 'end' => $end ];
						}
					}
				}
			}

			// Check for 'slots' array (alternative format with open/close)
			if ( empty( $times ) && isset( $day_data['slots'] ) && is_array( $day_data['slots'] ) ) {
				foreach ( $day_data['slots'] as $slot ) {
					if ( is_array( $slot ) ) {
						$start = $this->sanitizeTime( $slot['open'] ?? $slot['start'] ?? '' );
						$end   = $this->sanitizeTime( $slot['close'] ?? $slot['end'] ?? '' );
						if ( $start && $end ) {
							$times[] = [ 'start' => $start, 'end' => $end ];
						}
					}
				}
			}

			// Check for direct open/close or start/end (single time slot)
			if ( empty( $times ) ) {
				$start = $this->sanitizeTime( $day_data['start'] ?? '' );
				$end   = $this->sanitizeTime( $day_data['end'] ?? '' );
				// Also check open/close as time values (not boolean)
				if ( ! $start && isset( $day_data['open'] ) && is_string( $day_data['open'] ) ) {
					$start = $this->sanitizeTime( $day_data['open'] );
				}
				if ( ! $end && isset( $day_data['close'] ) ) {
					$end = $this->sanitizeTime( $day_data['close'] );
				}
				if ( $start && $end ) {
					$times[] = [ 'start' => $start, 'end' => $end ];
				}
			}

			// Build the day entry
			if ( ! empty( $times ) ) {
				$days[ $day_index ] = [
					'open'  => 1,
					'times' => $times,
				];
				$has_open_day = true;
			} else {
				// Day is marked open but 24 hours (no specific times)
				$days[ $day_index ] = [ 'open' => 1 ];
				$has_open_day = true;
			}
		}

		// If no days have data, return empty
		if ( empty( $days ) || ! $has_open_day ) {
			return [];
		}

		// Build the final structure
		return [
			'active' => 1,
			'type'   => 'selective',
			'days'   => $days,
		];
	}

	/**
	 * Sanitize time string to HH:MM format.
	 *
	 * @param string $time Time string.
	 *
	 * @return string Sanitized time (HH:MM).
	 */
	private function sanitizeTime( string $time ): string {
		$time = sanitize_text_field( $time );

		// Already in HH:MM format
		if ( preg_match( '/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/', $time ) ) {
			return $time;
		}

		// Try to parse
		$timestamp = strtotime( $time );
		if ( $timestamp ) {
			return date( 'H:i', $timestamp );
		}

		return '';
	}

	/**
	 * Sanitize social profiles data.
	 *
	 * Expected format:
	 * {
	 *   "facebook": "https://facebook.com/...",
	 *   "twitter": "https://twitter.com/...",
	 *   "instagram": "https://instagram.com/...",
	 *   ...
	 * }
	 *
	 * @param mixed $profiles Social profiles data.
	 *
	 * @return array Sanitized social profiles.
	 */
	private function sanitizeSocialProfiles( $profiles ): array {
		if ( ! is_array( $profiles ) ) {
			return [];
		}

		$allowed_networks = [
			'facebook',
			'twitter',
			'instagram',
			'linkedin',
			'youtube',
			'pinterest',
			'tiktok',
			'snapchat',
			'telegram',
			'whatsapp',
			'github',
			'dribbble',
			'behance',
			'vimeo',
			'website',
		];

		$sanitized = [];

		foreach ( $profiles as $network => $url ) {
			$network = sanitize_key( $network );
			if ( ! in_array( $network, $allowed_networks, true ) ) {
				continue;
			}

			$url = esc_url_raw( $url );
			if ( ! empty( $url ) ) {
				$sanitized[ $network ] = $url;
			}
		}

		return $sanitized;
	}

	/**
	 * Set taxonomy term for listing.
	 *
	 * @param int    $post_id   Post ID.
	 * @param mixed  $term_ref  Term ID, slug, name, or path.
	 * @param string $taxonomy  Taxonomy name.
	 */
	private function setTaxonomyTerm( int $post_id, $term_ref, string $taxonomy ): void {
		$term_ids  = [];
		$unmatched = [];

		// Handle hierarchy path
		if ( is_string( $term_ref ) && strpos( $term_ref, '>' ) !== false ) {
			$segments = array_map( 'trim', explode( '>', $term_ref ) );
			$parent = 0;

			foreach ( $segments as $segment ) {
				$term = get_term_by( 'name', $segment, $taxonomy );
				if ( ! $term ) {
					$term = get_term_by( 'slug', sanitize_title( $segment ), $taxonomy );
				}
				if ( $term ) {
					$term_ids[] = $term->term_id;
					$parent = $term->term_id;
				} else {
					$unmatched[] = $segment;
				}
			}
		} elseif ( is_numeric( $term_ref ) ) {
			// By ID - get full hierarchy
			$term_ids = $this->getTermHierarchy( (int) $term_ref, $taxonomy );
		} else {
			// By slug or name
			$term = get_term_by( 'slug', sanitize_title( $term_ref ), $taxonomy );
			if ( ! $term ) {
				$term = get_term_by( 'name', $term_ref, $taxonomy );
			}
			if ( $term ) {
				$term_ids = $this->getTermHierarchy( $term->term_id, $taxonomy );
			} elseif ( is_scalar( $term_ref ) && '' !== (string) $term_ref ) {
				$unmatched[] = (string) $term_ref;
			}
		}

		if ( ! empty( $term_ids ) ) {
			wp_set_object_terms( $post_id, $term_ids, $taxonomy );
		}

		// Terms are not created implicitly (category/location trees are curated); tell the client instead.
		if ( $unmatched ) {
			$is_location     = rtcl()->location === $taxonomy;
			$this->warnings[] = sprintf(
				/* translators: 1: taxonomy label, 2: term names, 3: tool name */
				__( '%1$s not found and not assigned: %2$s. Create it with %3$s (or use an existing one) and update the listing.', 'classified-listing' ),
				$is_location ? __( 'Location', 'classified-listing' ) : __( 'Category', 'classified-listing' ),
				implode( ' > ', array_map( 'sanitize_text_field', $unmatched ) ),
				$is_location ? 'rtcl/create-location-hierarchy' : 'rtcl/create-category-hierarchy'
			);
		}
	}

	/**
	 * Warnings part of a create/update response.
	 *
	 * @return array
	 */
	private function warningsResponse(): array {
		return $this->warnings ? [ 'warnings' => array_values( array_unique( $this->warnings ) ) ] : [];
	}

	/**
	 * Get term hierarchy (term + all ancestors).
	 *
	 * @param int    $term_id  Term ID.
	 * @param string $taxonomy Taxonomy name.
	 *
	 * @return array Term IDs.
	 */
	private function getTermHierarchy( int $term_id, string $taxonomy ): array {
		$ids = [ $term_id ];
		$ancestors = get_ancestors( $term_id, $taxonomy, 'taxonomy' );
		return array_merge( $ids, $ancestors );
	}

	/**
	 * Process and attach images.
	 *
	 * Images are processed according to RTCL misc_media settings:
	 * - Maximum width: 1200px
	 * - Aspect ratio maintained based on gallery settings
	 * - RTCL-specific image sizes generated (rtcl-gallery, rtcl-thumbnail, etc.)
	 *
	 * @param int   $post_id Post ID.
	 * @param array $images  Image URLs or attachment IDs.
	 */
	private function processImages( int $post_id, array $images ): void {
		$attachment_ids = [];

		foreach ( ImageHelper::limitImages( $images ) as $image ) {
			// If it's already an attachment ID
			if ( is_numeric( $image ) ) {
				$attachment_id = absint( $image );
				if ( wp_attachment_is_image( $attachment_id ) ) {
					$attachment_ids[] = $attachment_id;
				}
				continue;
			}

			if ( ! is_string( $image ) || '' === trim( $image ) ) {
				continue;
			}

			// URL, local path or base64: resized (max 1200px, ratio kept) with RTCL sizes generated.
			$attachment_id = ImageHelper::processImageInput( trim( $image ), $post_id );
			if ( is_wp_error( $attachment_id ) ) {
				$this->warnings[] = sprintf(
					/* translators: 1: image reference, 2: error message */
					__( 'Image not added (%1$s): %2$s', 'classified-listing' ),
					0 === strpos( trim( $image ), 'data:' ) ? 'base64' : esc_url_raw( wp_basename( trim( $image ) ) ),
					$attachment_id->get_error_message()
				);
				continue;
			}
			$attachment_ids[] = $attachment_id;
		}

		if ( ! empty( $attachment_ids ) ) {
			// Use ImageHelper to set images with proper attachment
			ImageHelper::setListingImages( $post_id, $attachment_ids, ! has_post_thumbnail( $post_id ) );
		}
	}

	/**
	 * Sanitize field value based on type.
	 *
	 * @param mixed  $value   Value to sanitize.
	 * @param string $element Field element type.
	 * @param array  $field   Field configuration.
	 *
	 * @return mixed Sanitized value.
	 */
	private function sanitizeFieldValue( $value, string $element, array $field ) {
		switch ( $element ) {
			case 'number':
			case 'range':
				return is_numeric( $value ) ? floatval( $value ) : '';

			case 'url':
			case 'website':
				return esc_url_raw( $value );

			case 'email':
				return sanitize_email( $value );

			case 'textarea':
				return sanitize_textarea_field( $value );

			case 'checkbox':
				// Checkbox can be single boolean or array of values
				if ( is_bool( $value ) ) {
					return $value ? '1' : '0';
				}
				if ( is_array( $value ) ) {
					return array_map( 'sanitize_text_field', $value );
				}
				return sanitize_text_field( $value );

			case 'select':
			case 'radio':
				// Single selection - validate against options if available
				$sanitized = sanitize_text_field( $value );
				if ( ! empty( $field['options'] ) ) {
					$valid_values = array_column( $field['options'], 'value' );
					if ( ! in_array( $sanitized, $valid_values, true ) ) {
						return ''; // Invalid option
					}
				}
				return $sanitized;

			case 'color_picker':
				return sanitize_hex_color( $value ) ?: '';

			case 'date':
				// Validate date format (Y-m-d)
				$date = sanitize_text_field( $value );
				if ( $date && preg_match( '/^\d{4}-\d{2}-\d{2}$/', $date ) ) {
					return $date;
				}
				// Try to parse other formats
				$timestamp = strtotime( $date );
				return $timestamp ? date( 'Y-m-d', $timestamp ) : '';

			case 'date_time':
				// Validate datetime format (Y-m-d H:i:s or Y-m-d\TH:i:s)
				$datetime = sanitize_text_field( $value );
				if ( $datetime ) {
					$timestamp = strtotime( $datetime );
					return $timestamp ? date( 'Y-m-d H:i:s', $timestamp ) : '';
				}
				return '';

			case 'date_range':
				// Date range can be array [start, end] or object {start, end}
				return $this->sanitizeDateRange( $value, 'Y-m-d' );

			case 'date_time_range':
				// DateTime range
				return $this->sanitizeDateRange( $value, 'Y-m-d H:i:s' );

			case 'file':
				// File can be URL or attachment ID
				if ( is_numeric( $value ) ) {
					return absint( $value );
				}
				if ( is_string( $value ) && filter_var( $value, FILTER_VALIDATE_URL ) ) {
					return esc_url_raw( $value );
				}
				if ( is_array( $value ) ) {
					// Multiple files
					return array_map( function( $v ) {
						return is_numeric( $v ) ? absint( $v ) : esc_url_raw( $v );
					}, $value );
				}
				return '';

			case 'hidden':
				return sanitize_text_field( $value );

			case 'text':
			default:
				return sanitize_text_field( $value );
		}
	}

	/**
	 * Sanitize date range value.
	 *
	 * @param mixed  $value  Date range value.
	 * @param string $format Date format.
	 *
	 * @return array Sanitized date range [start, end].
	 */
	private function sanitizeDateRange( $value, string $format ): array {
		$result = [ 'start' => '', 'end' => '' ];

		if ( is_array( $value ) ) {
			// Handle indexed array [start, end] or associative {start, end}
			$start = $value['start'] ?? $value[0] ?? '';
			$end   = $value['end'] ?? $value[1] ?? '';
		} elseif ( is_object( $value ) ) {
			$start = $value->start ?? '';
			$end   = $value->end ?? '';
		} else {
			return $result;
		}

		// Parse and format dates
		if ( $start ) {
			$timestamp = strtotime( sanitize_text_field( $start ) );
			$result['start'] = $timestamp ? date( $format, $timestamp ) : '';
		}

		if ( $end ) {
			$timestamp = strtotime( sanitize_text_field( $end ) );
			$result['end'] = $timestamp ? date( $format, $timestamp ) : '';
		}

		return $result;
	}

	/**
	 * Get preset field value from data.
	 *
	 * @param string $element Element name.
	 * @param array  $data    Listing data.
	 *
	 * @return mixed Value.
	 */
	private function getPresetFieldValue( string $element, array $data ) {
		$contact = $data['contact'] ?? [];

		switch ( $element ) {
			case 'title':
				return $data['title'] ?? null;
			case 'description':
				return $data['description'] ?? null;
			case 'excerpt':
				return $data['excerpt'] ?? null;
			case 'pricing':
				return $data['price'] ?? null;
			case 'listing_type':
				return $data['listing_type'] ?? null;
			case 'category':
				return $data['category'] ?? $data['category_id'] ?? null;
			case 'location':
				return $data['location'] ?? $data['location_id'] ?? null;
			case 'tag':
				return $data['tags'] ?? null;
			case 'images':
				return $data['images'] ?? null;
			case 'video_urls':
				return $data['video_urls'] ?? null;
			case 'phone':
				return $contact['phone'] ?? $data['phone'] ?? null;
			case 'email':
				return $contact['email'] ?? $data['email'] ?? null;
			case 'whatsapp':
				return $contact['whatsapp'] ?? $data['whatsapp'] ?? null;
			case 'website':
				return $contact['website'] ?? $data['website'] ?? null;
			case 'address':
				return $contact['address'] ?? $data['address'] ?? null;
			case 'zipcode':
				return $contact['zipcode'] ?? $data['zipcode'] ?? null;
			case 'geo_location':
				return $data['geo_location'] ?? null;
			case 'contact_person':
				return $contact['contact_person'] ?? $data['contact_person'] ?? null;
			case 'business_hours':
				return $data['business_hours'] ?? null;
			case 'social_profiles':
				return $data['social_profiles'] ?? null;
			default:
				return $data[ $element ] ?? $contact[ $element ] ?? null;
		}
	}

	/**
	 * Get field meta key for storage.
	 *
	 * @param array $field Field configuration.
	 *
	 * @return string Meta key.
	 */
	private function getFieldMetaKey( array $field ): string {
		$element = $field['element'] ?? '';

		if ( ! empty( $field['preset'] ) && isset( self::PRESET_META_KEYS[ $element ] ) ) {
			return self::PRESET_META_KEYS[ $element ];
		}

		return $field['name'] ?? '';
	}

	/**
	 * Get field input key for API input.
	 *
	 * @param array $field Field configuration.
	 *
	 * @return string Input key path.
	 */
	private function getFieldInputKey( array $field ): string {
		$element = $field['element'] ?? '';

		if ( ! empty( $field['preset'] ) ) {
			$input_keys = [
				'title'       => 'title',
				'description' => 'description',
				'excerpt'     => 'excerpt',
				'pricing'     => 'price',
				'listing_type' => 'listing_type',
				'category'    => 'category',
				'location'    => 'location',
				'tag'         => 'tags',
				'images'      => 'images',
				'phone'       => 'contact.phone',
				'email'       => 'contact.email',
				'whatsapp'    => 'contact.whatsapp',
				'website'     => 'contact.website',
				'address'     => 'contact.address',
				'zipcode'     => 'contact.zipcode',
			];

			return $input_keys[ $element ] ?? $element;
		}

		return 'custom_fields.' . ( $field['name'] ?? '' );
	}

	/**
	 * Map element to standard type.
	 *
	 * @param string $element Element name.
	 *
	 * @return string Type.
	 */
	private function mapElementToType( string $element ): string {
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
			'tag'             => 'tags',
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
	 * Validate field value by element type.
	 *
	 * @param string $element Field element type.
	 * @param mixed  $value   Field value.
	 * @param string $label   Field label.
	 * @param array  $field   Field configuration.
	 *
	 * @return array Validation errors.
	 */
	private function validateFieldByType( string $element, $value, string $label, array $field ): array {
		$errors = [];

		switch ( $element ) {
			case 'email':
				if ( ! is_email( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid email address.', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'url':
			case 'website':
				if ( ! filter_var( $value, FILTER_VALIDATE_URL ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid URL.', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'number':
			case 'range':
				if ( ! is_numeric( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a number.', 'classified-listing' ),
						$label
					);
				}
				// Validate step if specified
				if ( is_numeric( $value ) && ! empty( $field['step'] ) ) {
					$step = (float) $field['step'];
					$min = (float) ( $field['validation']['min']['value'] ?? 0 );
					if ( $step > 0 && fmod( ( $value - $min ), $step ) !== 0.0 ) {
						$errors[] = sprintf(
							/* translators: 1: field label, 2: step value */
							__( '%1$s must be in increments of %2$s.', 'classified-listing' ),
							$label,
							$step
						);
					}
				}
				break;

			case 'date':
				if ( ! $this->isValidDate( $value, 'Y-m-d' ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid date (YYYY-MM-DD).', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'date_time':
				if ( ! $this->isValidDateTime( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid datetime.', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'date_range':
			case 'date_time_range':
				$range_errors = $this->validateDateRange( $value, $label, $element === 'date_time_range' );
				$errors = array_merge( $errors, $range_errors );
				break;

			case 'color_picker':
				if ( ! preg_match( '/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/', $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be a valid hex color (e.g., #FF0000).', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'file':
				// Validate file URLs or attachment IDs
				$file_values = is_array( $value ) ? $value : [ $value ];
				foreach ( $file_values as $file ) {
					if ( ! is_numeric( $file ) && ! filter_var( $file, FILTER_VALIDATE_URL ) ) {
						$errors[] = sprintf(
							/* translators: %s: field label */
							__( '%s must be a valid file URL or attachment ID.', 'classified-listing' ),
							$label
						);
						break;
					}
				}
				break;

			case 'checkbox':
				// Checkbox can be boolean, single value, or array
				if ( ! is_bool( $value ) && ! is_string( $value ) && ! is_array( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s has an invalid value type.', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'business_hours':
				if ( ! is_array( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be an object with day names as keys.', 'classified-listing' ),
						$label
					);
				}
				break;

			case 'social_profiles':
				if ( ! is_array( $value ) ) {
					$errors[] = sprintf(
						/* translators: %s: field label */
						__( '%s must be an object with social network names as keys.', 'classified-listing' ),
						$label
					);
				}
				break;
		}

		return $errors;
	}

	/**
	 * Check if value is a valid date.
	 *
	 * @param string $date   Date string.
	 * @param string $format Expected format.
	 *
	 * @return bool
	 */
	private function isValidDate( string $date, string $format = 'Y-m-d' ): bool {
		$d = \DateTime::createFromFormat( $format, $date );
		return $d && $d->format( $format ) === $date;
	}

	/**
	 * Check if value is a valid datetime.
	 *
	 * @param string $datetime Datetime string.
	 *
	 * @return bool
	 */
	private function isValidDateTime( string $datetime ): bool {
		// Accept multiple formats
		$formats = [ 'Y-m-d H:i:s', 'Y-m-d\TH:i:s', 'Y-m-d H:i', 'Y-m-d\TH:i' ];
		foreach ( $formats as $format ) {
			$d = \DateTime::createFromFormat( $format, $datetime );
			if ( $d && $d->format( $format ) === $datetime ) {
				return true;
			}
		}
		// Also accept strtotime-parseable strings
		return strtotime( $datetime ) !== false;
	}

	/**
	 * Validate date range value.
	 *
	 * @param mixed  $value       Date range value.
	 * @param string $label       Field label.
	 * @param bool   $is_datetime Whether this is a datetime range.
	 *
	 * @return array Validation errors.
	 */
	private function validateDateRange( $value, string $label, bool $is_datetime = false ): array {
		$errors = [];

		if ( ! is_array( $value ) && ! is_object( $value ) ) {
			$errors[] = sprintf(
				/* translators: %s: field label */
				__( '%s must be an object or array with start and end values.', 'classified-listing' ),
				$label
			);
			return $errors;
		}

		$arr = (array) $value;
		$start = $arr['start'] ?? $arr[0] ?? null;
		$end = $arr['end'] ?? $arr[1] ?? null;

		if ( $start ) {
			$valid = $is_datetime ? $this->isValidDateTime( $start ) : $this->isValidDate( $start );
			if ( ! $valid ) {
				$errors[] = sprintf(
					/* translators: %s: field label */
					__( '%s start date is invalid.', 'classified-listing' ),
					$label
				);
			}
		}

		if ( $end ) {
			$valid = $is_datetime ? $this->isValidDateTime( $end ) : $this->isValidDate( $end );
			if ( ! $valid ) {
				$errors[] = sprintf(
					/* translators: %s: field label */
					__( '%s end date is invalid.', 'classified-listing' ),
					$label
				);
			}
		}

		// Validate end is after start
		if ( $start && $end ) {
			$start_ts = strtotime( $start );
			$end_ts = strtotime( $end );
			if ( $start_ts && $end_ts && $end_ts < $start_ts ) {
				$errors[] = sprintf(
					/* translators: %s: field label */
					__( '%s end date must be after start date.', 'classified-listing' ),
					$label
				);
			}
		}

		return $errors;
	}

	/**
	 * Format validation rules for API response.
	 *
	 * @param array $validation Raw validation.
	 *
	 * @return array Formatted rules.
	 */
	private function formatValidationRules( array $validation ): array {
		$rules = [];

		if ( ! empty( $validation['required']['value'] ) ) {
			$rules['required'] = true;
		}
		if ( isset( $validation['min']['value'] ) ) {
			$rules['min'] = $validation['min']['value'];
		}
		if ( isset( $validation['max']['value'] ) ) {
			$rules['max'] = $validation['max']['value'];
		}
		if ( ! empty( $validation['regex']['value'] ) ) {
			$rules['pattern'] = $validation['regex']['value'];
		}

		return $rules;
	}

	/**
	 * Resolve listing status for new listings.
	 *
	 * Uses RTCL settings for default status when not explicitly provided.
	 *
	 * @param string $status Requested status (empty string to use settings default).
	 *
	 * @return string Resolved status.
	 */
	private function resolveStatus( string $status ): string {
		$allowed = [ 'publish', 'pending', 'draft', 'private' ];
		$status = sanitize_key( $status );

		// If no status provided, use RTCL settings for new listings
		if ( empty( $status ) || ! in_array( $status, $allowed, true ) ) {
			$status = \Rtcl\Helpers\Functions::get_option_item( 'rtcl_general_settings', 'new_listing_status', 'pending' );
		}

		// Validate status against allowed values
		if ( ! in_array( $status, $allowed, true ) ) {
			$status = 'pending';
		}

		// Publish/private requires capability
		if ( in_array( $status, [ 'publish', 'private' ], true ) && ! current_user_can( 'publish_rtcl_listings' ) ) {
			$status = \Rtcl\Helpers\Functions::get_option_item( 'rtcl_general_settings', 'new_listing_status', 'pending' );
			// Ensure fallback is valid
			if ( in_array( $status, [ 'publish', 'private' ], true ) ) {
				$status = 'pending';
			}
		}

		return $status;
	}

	/**
	 * Resolve listing status for updated listings.
	 *
	 * Uses RTCL settings for "edited listing status" when not explicitly provided.
	 *
	 * @param string $status      Requested status (empty string to use settings default).
	 * @param string $current_status Current listing status.
	 *
	 * @return string Resolved status.
	 */
	private function resolveUpdateStatus( string $status, string $current_status ): string {
		$allowed = [ 'publish', 'pending', 'draft', 'private' ];
		$status = sanitize_key( $status );

		// If no status provided, check RTCL settings for edited listings
		if ( empty( $status ) ) {
			$edited_status = \Rtcl\Helpers\Functions::get_option_item( 'rtcl_general_settings', 'edited_listing_status', '' );
			if ( ! empty( $edited_status ) && in_array( $edited_status, $allowed, true ) ) {
				$status = $edited_status;
			} else {
				// Keep current status if no setting configured
				return $current_status;
			}
		}

		// Validate status against allowed values
		if ( ! in_array( $status, $allowed, true ) ) {
			return $current_status;
		}

		// Publish/private requires capability
		if ( in_array( $status, [ 'publish', 'private' ], true ) && ! current_user_can( 'publish_rtcl_listings' ) ) {
			return $current_status;
		}

		return $status;
	}

	/**
	 * Check if Form Builder is enabled.
	 *
	 * @return bool
	 */
	private function isFormBuilderEnabled(): bool {
		return class_exists( 'Rtcl\Models\Form\Form' ) &&
			   class_exists( 'Rtcl\Services\FormBuilder\FBHelper' ) &&
			   FBHelper::isEnabled();
	}
}
