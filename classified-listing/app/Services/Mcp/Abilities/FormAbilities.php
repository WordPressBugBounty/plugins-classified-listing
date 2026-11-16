<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Services\FormService;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers Form Builder related abilities with the WordPress Abilities API.
 */
class FormAbilities {

	public static function register() {
		// Form Builder is part of core RTCL - register abilities
		// Individual methods check if Form Builder is enabled when needed
		self::registerGetForm();
		self::registerListForms();
		self::registerCreateForm();
		self::registerUpdateForm();
		self::registerDeleteForm();
		self::registerGetAvailableFields();
		self::registerExportForm();
		self::registerImportForm();
		self::registerGenerateFormFields();
		// Discovery abilities for natural language queries
		self::registerDiscoverForms();
		self::registerGetFormsByCategory();
		self::registerGetFormsByListingType();
		self::registerGetFormFieldDetails();
		self::registerSearchFormFields();
		// Directory form with cascading fields
		self::registerCreateDirectoryForm();
		// Cleanup abilities
		self::registerCleanupEmptyForms();
		self::registerCleanupDuplicateForms();
	}

	private static function registerCreateForm() {
		wp_register_ability( 'rtcl/create-form', [
			'label'       => __( 'Create Form', 'classified-listing' ),
			'description' => __( 'Create a new listing form with preset and custom fields. Use this to set up different forms for different listing types or categories. Supports all preset fields (title, price, category, etc.) and custom fields (text, select, checkbox, date, etc.) with validation rules.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Form title. Required.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'URL-friendly slug. Auto-generated from title if not provided.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft' ],
						'description' => __( 'Form status. Default: publish.', 'classified-listing' ),
						'default'     => 'publish',
					],
					'is_default' => [
						'type'        => 'boolean',
						'description' => __( 'Set as the default form for new listings.', 'classified-listing' ),
						'default'     => false,
					],
					'submit_button_text' => [
						'type'        => 'string',
						'description' => __( 'Text for the submit button. Default: Submit.', 'classified-listing' ),
					],
					'update_button_text' => [
						'type'        => 'string',
						'description' => __( 'Text for the update button. Default: Update.', 'classified-listing' ),
					],
					'preset_fields' => [
						'type'        => 'array',
						'description' => __( 'Preset fields to include. Can be element names (strings) or objects with configuration.', 'classified-listing' ),
						'items'       => [
							'oneOf' => [
								[ 'type' => 'string' ],
								[
									'type'       => 'object',
									'properties' => [
										'element' => [
											'type'        => 'string',
											'enum'        => [ 'title', 'description', 'excerpt', 'pricing', 'category', 'location', 'tag', 'listing_type', 'images', 'video_urls', 'phone', 'whatsapp', 'email', 'website', 'address', 'zipcode', 'geo_location', 'business_hours', 'social_profiles', 'terms_and_condition', 'recaptcha' ],
											'description' => __( 'Preset field element name.', 'classified-listing' ),
										],
										'label'       => [ 'type' => 'string', 'description' => __( 'Custom label.', 'classified-listing' ) ],
										'placeholder' => [ 'type' => 'string', 'description' => __( 'Placeholder text.', 'classified-listing' ) ],
										'help_message' => [ 'type' => 'string', 'description' => __( 'Help text shown below field.', 'classified-listing' ) ],
										'validation'  => [
											'type'       => 'object',
											'properties' => [
												'required' => [ 'type' => 'boolean' ],
												'min'      => [ 'type' => 'number' ],
												'max'      => [ 'type' => 'number' ],
											],
										],
									],
								],
							],
						],
					],
					'custom_fields' => [
						'type'        => 'array',
						'description' => __( 'Custom fields to add to the form.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'type' => [
									'type'        => 'string',
									'enum'        => [ 'text', 'textarea', 'number', 'select', 'radio', 'checkbox', 'date', 'url', 'color_picker', 'file', 'switch' ],
									'description' => __( 'Field type. Required.', 'classified-listing' ),
								],
								'name' => [
									'type'        => 'string',
									'description' => __( 'Field name/meta key. Required. Must be unique and URL-safe.', 'classified-listing' ),
								],
								'label' => [
									'type'        => 'string',
									'description' => __( 'Display label.', 'classified-listing' ),
								],
								'placeholder' => [
									'type'        => 'string',
									'description' => __( 'Placeholder text.', 'classified-listing' ),
								],
								'default_value' => [
									'description' => __( 'Default value for the field.', 'classified-listing' ),
								],
								'help_message' => [
									'type'        => 'string',
									'description' => __( 'Help text shown below field.', 'classified-listing' ),
								],
								'options' => [
									'type'        => 'array',
									'description' => __( 'Options for select/radio/checkbox. Array of {value, label} objects or simple strings.', 'classified-listing' ),
									'items'       => [
										'oneOf' => [
											[ 'type' => 'string' ],
											[
												'type'       => 'object',
												'properties' => [
													'value' => [ 'type' => 'string' ],
													'label' => [ 'type' => 'string' ],
													'icon'  => [ 'type' => 'string' ],
												],
											],
										],
									],
								],
								'validation' => [
									'type'       => 'object',
									'description' => __( 'Validation rules.', 'classified-listing' ),
									'properties' => [
										'required'        => [ 'type' => 'boolean', 'description' => __( 'Field is required.', 'classified-listing' ) ],
										'min'             => [ 'type' => 'number', 'description' => __( 'Minimum value or length.', 'classified-listing' ) ],
										'max'             => [ 'type' => 'number', 'description' => __( 'Maximum value or length.', 'classified-listing' ) ],
										'pattern'         => [ 'type' => 'string', 'description' => __( 'Regex pattern for validation.', 'classified-listing' ) ],
										'max_file_size'   => [ 'type' => 'integer', 'description' => __( 'Max file size in MB (for file fields).', 'classified-listing' ) ],
										'max_files'       => [ 'type' => 'integer', 'description' => __( 'Max number of files (for file fields).', 'classified-listing' ) ],
										'allowed_types'   => [ 'type' => 'array', 'items' => [ 'type' => 'string' ], 'description' => __( 'Allowed file types (for file fields).', 'classified-listing' ) ],
									],
								],
								'filterable' => [
									'type'        => 'boolean',
									'description' => __( 'Show in listing filters.', 'classified-listing' ),
									'default'     => false,
								],
								'single_view' => [
									'type'        => 'boolean',
									'description' => __( 'Show on single listing page.', 'classified-listing' ),
									'default'     => true,
								],
								'archive_view' => [
									'type'        => 'boolean',
									'description' => __( 'Show on listing archive/list.', 'classified-listing' ),
									'default'     => false,
								],
								'rows' => [
									'type'        => 'integer',
									'description' => __( 'Number of rows for textarea.', 'classified-listing' ),
								],
								'date_format' => [
									'type'        => 'string',
									'description' => __( 'Date format for date fields (e.g., d/m/Y).', 'classified-listing' ),
								],
								'date_type' => [
									'type'        => 'string',
									'enum'        => [ 'single', 'range' ],
									'description' => __( 'Single date or date range.', 'classified-listing' ),
								],
								'include_time' => [
									'type'        => 'boolean',
									'description' => __( 'Include time picker for date fields.', 'classified-listing' ),
								],
								'direction' => [
									'type'        => 'string',
									'enum'        => [ 'horizontal', 'vertical' ],
									'description' => __( 'Layout direction for radio/checkbox.', 'classified-listing' ),
								],
							],
							'required' => [ 'type', 'name' ],
						],
					],
					'sections' => [
						'type'        => 'array',
						'description' => __( 'Custom form sections. If not provided, all fields go into a default section.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'title'     => [ 'type' => 'string', 'description' => __( 'Section title.', 'classified-listing' ) ],
								'icon'      => [ 'type' => 'string', 'description' => __( 'Section icon class.', 'classified-listing' ) ],
								'css_class' => [ 'type' => 'string', 'description' => __( 'Custom CSS class.', 'classified-listing' ) ],
								'fields'    => [
									'type'        => 'array',
									'items'       => [ 'type' => 'string' ],
									'description' => __( 'Field names or UUIDs to include in this section.', 'classified-listing' ),
								],
							],
						],
					],
				],
				'required' => [ 'title' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id'     => [ 'type' => 'integer', 'description' => __( 'Created form ID.', 'classified-listing' ) ],
					'title'       => [ 'type' => 'string', 'description' => __( 'Form title.', 'classified-listing' ) ],
					'slug'        => [ 'type' => 'string', 'description' => __( 'Form slug.', 'classified-listing' ) ],
					'status'      => [ 'type' => 'string', 'description' => __( 'Form status.', 'classified-listing' ) ],
					'is_default'  => [ 'type' => 'boolean', 'description' => __( 'Is default form.', 'classified-listing' ) ],
					'field_count' => [ 'type' => 'integer', 'description' => __( 'Total field count.', 'classified-listing' ) ],
					'message'     => [ 'type' => 'string', 'description' => __( 'Result message.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				$result = $service->createForm( $input );

				if ( is_wp_error( $result ) ) {
					// Clean up any empty forms that might have been created
					$title = $input['title'] ?? '';
					if ( $title ) {
						$service->cleanupEmptyForms( $title );
					}
					return $result;
				}

				// Post-creation cleanup: Remove any empty forms with the same title (excluding the one just created)
				$title          = $input['title'] ?? ( $result['title'] ?? '' );
				$cleanup_result = $title ? $service->cleanupEmptyForms( $title, $result['form_id'] ?? 0 ) : 0;
				if ( $cleanup_result > 0 ) {
					$result['cleaned_up_empty_forms'] = ( $result['cleaned_up_empty_forms'] ?? 0 ) + $cleanup_result;
				}

				// Clean up duplicate forms with same title, keep this one (most recent with fields)
				$title = $input['title'] ?? '';
				if ( $title && ! empty( $result['form_id'] ) ) {
					$dup_cleanup = $service->cleanupDuplicateForms( $title, $result['form_id'] );
					if ( ! empty( $dup_cleanup['removed_count'] ) ) {
						$result['removed_duplicate_forms'] = $dup_cleanup['removed_count'];
					}
				}

				return $result;
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

	private static function registerUpdateForm() {
		wp_register_ability( 'rtcl/update-form', [
			'label'       => __( 'Update Form', 'classified-listing' ),
			'description' => __( 'Update an existing listing form. Can modify settings, add new fields, or remove existing fields.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to update. Required.', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'New form title.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'New form slug.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft' ],
						'description' => __( 'Form status.', 'classified-listing' ),
					],
					'is_default' => [
						'type'        => 'boolean',
						'description' => __( 'Set as default form.', 'classified-listing' ),
					],
					'submit_button_text' => [
						'type'        => 'string',
						'description' => __( 'Submit button text.', 'classified-listing' ),
					],
					'update_button_text' => [
						'type'        => 'string',
						'description' => __( 'Update button text.', 'classified-listing' ),
					],
					'add_preset_fields' => [
						'type'        => 'array',
						'description' => __( 'New preset fields to add.', 'classified-listing' ),
						'items'       => [
							'oneOf' => [
								[ 'type' => 'string' ],
								[ 'type' => 'object' ],
							],
						],
					],
					'add_custom_fields' => [
						'type'        => 'array',
						'description' => __( 'New custom fields to add.', 'classified-listing' ),
						'items'       => [ 'type' => 'object' ],
					],
					'remove_fields' => [
						'type'        => 'array',
						'description' => __( 'Field names or UUIDs to remove from the form.', 'classified-listing' ),
						'items'       => [ 'type' => 'string' ],
					],
				],
				'required' => [ 'form_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id'     => [ 'type' => 'integer' ],
					'title'       => [ 'type' => 'string' ],
					'slug'        => [ 'type' => 'string' ],
					'status'      => [ 'type' => 'string' ],
					'is_default'  => [ 'type' => 'boolean' ],
					'field_count' => [ 'type' => 'integer' ],
					'message'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				$form_id = absint( $input['form_id'] ?? 0 );
				return $service->updateForm( $form_id, $input );
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

	private static function registerDeleteForm() {
		wp_register_ability( 'rtcl/delete-form', [
			'label'       => __( 'Delete Form', 'classified-listing' ),
			'description' => __( 'Delete a listing form. Cannot delete the default form. By default performs soft delete (changes status to draft); use force_delete=true to permanently remove.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to delete. Required.', 'classified-listing' ),
					],
					'force_delete' => [
						'type'        => 'boolean',
						'description' => __( 'Permanently delete the form. If false (default), changes status to draft (soft delete).', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'form_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'deleted'      => [ 'type' => 'boolean' ],
					'form_id'      => [ 'type' => 'integer' ],
					'title'        => [ 'type' => 'string' ],
					'force_delete' => [ 'type' => 'boolean' ],
					'new_status'   => [ 'type' => 'string' ],
					'message'      => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$form_id = absint( $input['form_id'] ?? 0 );

				if ( ! $form_id ) {
					return new \WP_Error( 'missing_form_id', __( 'Form ID is required.', 'classified-listing' ) );
				}

				// Default to soft delete (force_delete=false) - changes status to draft
				$force_delete = array_key_exists( 'force_delete', $input ) && ! empty( $input['force_delete'] );

				// Forms live in the rtcl_forms table; FormService works on that table (not on posts).
				return ( new FormService() )->deleteForm( $form_id, $force_delete );
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

	private static function registerGetAvailableFields() {
		wp_register_ability( 'rtcl/get-available-form-fields', [
			'label'       => __( 'Get Available Form Fields', 'classified-listing' ),
			'description' => __( 'Get all available preset fields and custom field types that can be used when creating forms.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'preset_fields' => [
						'type'        => 'array',
						'description' => __( 'Available preset fields.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'element'     => [ 'type' => 'string' ],
								'label'       => [ 'type' => 'string' ],
								'description' => [ 'type' => 'string' ],
							],
						],
					],
					'custom_field_types' => [
						'type'        => 'array',
						'description' => __( 'Available custom field types.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'type'        => [ 'type' => 'string' ],
								'description' => [ 'type' => 'string' ],
							],
						],
					],
				],
			],
			'execute_callback' => function () {
				$service = new FormService();
				return [
					'preset_fields'      => $service->getAvailablePresetFields(),
					'custom_field_types' => $service->getAvailableFieldTypes(),
				];
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

	private static function registerGetForm() {
		wp_register_ability( 'rtcl/get-form', [
			'label'       => __( 'Get Form', 'classified-listing' ),
			'description' => __( 'Get full details of a listing form including all fields, sections, and settings.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to retrieve. Required.', 'classified-listing' ),
					],
				],
				'required' => [ 'form_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id'       => [ 'type' => 'integer' ],
					'title'         => [ 'type' => 'string' ],
					'slug'          => [ 'type' => 'string' ],
					'status'        => [ 'type' => 'string' ],
					'is_default'    => [ 'type' => 'boolean' ],
					'fields'        => [ 'type' => 'object' ],
					'sections'      => [ 'type' => 'array' ],
					'settings'      => [ 'type' => 'object' ],
					'field_count'   => [ 'type' => 'integer' ],
					'section_count' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$form_id = absint( $input['form_id'] ?? 0 );
				if ( ! $form_id ) {
					return new \WP_Error( 'missing_form_id', __( 'Form ID is required.', 'classified-listing' ) );
				}
				$service = new FormService();
				return $service->getForm( $form_id );
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

	private static function registerListForms() {
		wp_register_ability( 'rtcl/list-forms', [
			'label'       => __( 'List Forms', 'classified-listing' ),
			'description' => __( 'List all listing forms with summary information.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft', '' ],
						'description' => __( 'Filter by status.', 'classified-listing' ),
					],
					'limit' => [
						'type'        => 'integer',
						'description' => __( 'Maximum forms to return (max 100). Default: 50.', 'classified-listing' ),
						'default'     => 50,
					],
					'offset' => [
						'type'        => 'integer',
						'description' => __( 'Offset for pagination. Default: 0.', 'classified-listing' ),
						'default'     => 0,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'forms'  => [ 'type' => 'array' ],
					'total'  => [ 'type' => 'integer' ],
					'limit'  => [ 'type' => 'integer' ],
					'offset' => [ 'type' => 'integer' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->listForms( $input );
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

	private static function registerExportForm() {
		wp_register_ability( 'rtcl/export-form', [
			'label'       => __( 'Export Form', 'classified-listing' ),
			'description' => __( 'Export a listing form to JSON format for backup or transfer to another site.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to export. Required.', 'classified-listing' ),
					],
				],
				'required' => [ 'form_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success' => [ 'type' => 'boolean' ],
					'export'  => [ 'type' => 'object' ],
					'json'    => [ 'type' => 'string', 'description' => __( 'JSON string ready for download/import.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$form_id = absint( $input['form_id'] ?? 0 );
				if ( ! $form_id ) {
					return new \WP_Error( 'missing_form_id', __( 'Form ID is required.', 'classified-listing' ) );
				}
				$service = new FormService();
				return $service->exportForm( $form_id );
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

	private static function registerImportForm() {
		wp_register_ability( 'rtcl/import-form', [
			'label'       => __( 'Import Form', 'classified-listing' ),
			'description' => __( 'Import a listing form from JSON. Accepts export format from export-form or a simplified format with fields array.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'import_data' => [
						'description' => __( 'JSON string or object with form data. Must include title and fields.', 'classified-listing' ),
					],
					'title' => [
						'type'        => 'string',
						'description' => __( 'Override form title from import data.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft' ],
						'description' => __( 'Override form status.', 'classified-listing' ),
					],
				],
				'required' => [ 'import_data' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'     => [ 'type' => 'boolean' ],
					'form_id'     => [ 'type' => 'integer' ],
					'title'       => [ 'type' => 'string' ],
					'slug'        => [ 'type' => 'string' ],
					'field_count' => [ 'type' => 'integer' ],
					'message'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$import_data = $input['import_data'] ?? null;
				if ( empty( $import_data ) ) {
					return new \WP_Error( 'missing_import_data', __( 'Import data is required.', 'classified-listing' ) );
				}

				$options = [];
				if ( ! empty( $input['title'] ) ) {
					$options['title'] = $input['title'];
				}
				if ( ! empty( $input['status'] ) ) {
					$options['status'] = $input['status'];
				}

				$service = new FormService();
				$result = $service->importForm( $import_data, $options );

				if ( is_wp_error( $result ) ) {
					// Clean up any empty forms that might have been created
					$title = $input['title'] ?? '';
					if ( $title ) {
						$service->cleanupEmptyForms( $title );
					}
					return $result;
				}

				// Post-creation cleanup: Remove any empty forms with the same title (excluding the one just created)
				$title          = $input['title'] ?? ( $result['title'] ?? '' );
				$cleanup_result = $title ? $service->cleanupEmptyForms( $title, $result['form_id'] ?? 0 ) : 0;
				if ( $cleanup_result > 0 ) {
					$result['cleaned_up_empty_forms'] = ( $result['cleaned_up_empty_forms'] ?? 0 ) + $cleanup_result;
				}

				// Clean up duplicate forms with same title, keep this one
				$title = $result['title'] ?? $input['title'] ?? '';
				if ( $title && ! empty( $result['form_id'] ) ) {
					$dup_cleanup = $service->cleanupDuplicateForms( $title, $result['form_id'] );
					if ( ! empty( $dup_cleanup['removed_count'] ) ) {
						$result['removed_duplicate_forms'] = $dup_cleanup['removed_count'];
					}
				}

				return $result;
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

	private static function registerGenerateFormFields() {
		wp_register_ability( 'rtcl/generate-form-fields', [
			'label'       => __( 'Generate Form Fields with AI', 'classified-listing' ),
			'description' => __( 'Use AI to generate form fields from a natural language description. Describe what kind of listing form you need (e.g., "car sales form with make, model, year, mileage, condition, price") and the AI will suggest appropriate fields organized into sections. Optionally create the form immediately.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'prompt' => [
						'type'        => 'string',
						'description' => __( 'Natural language description of the form requirements. Be specific about what fields you need.', 'classified-listing' ),
					],
					'create_form' => [
						'type'        => 'boolean',
						'description' => __( 'If true, immediately create the form with generated fields. If false (default), only return the field structure for review.', 'classified-listing' ),
						'default'     => false,
					],
					'form_title' => [
						'type'        => 'string',
						'description' => __( 'Title for the form if create_form is true.', 'classified-listing' ),
					],
				],
				'required' => [ 'prompt' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'       => [ 'type' => 'boolean' ],
					'fields'        => [ 'type' => 'object', 'description' => __( 'Generated fields with UUIDs as keys.', 'classified-listing' ) ],
					'sections'      => [ 'type' => 'array', 'description' => __( 'Generated sections.', 'classified-listing' ) ],
					'field_count'   => [ 'type' => 'integer' ],
					'section_count' => [ 'type' => 'integer' ],
					'form_created'  => [ 'type' => 'boolean', 'description' => __( 'Whether form was created.', 'classified-listing' ) ],
					'form_id'       => [ 'type' => 'integer', 'description' => __( 'Created form ID if form_created is true.', 'classified-listing' ) ],
					'message'       => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$prompt = $input['prompt'] ?? '';
				if ( empty( $prompt ) ) {
					return new \WP_Error( 'missing_prompt', __( 'Prompt is required.', 'classified-listing' ) );
				}

				$service = new FormService();
				$result = $service->generateFormFields( $prompt );

				if ( is_wp_error( $result ) ) {
					return $result;
				}

				// If create_form is true, create the form immediately using import
				if ( ! empty( $input['create_form'] ) ) {
					$form_title = $input['form_title'] ?? __( 'AI Generated Form', 'classified-listing' );

					// Use importForm which handles the full structure with fields and sections
					$create_result = $service->importForm( [
						'title'    => $form_title,
						'status'   => 'publish',
						'fields'   => $result['fields'],
						'sections' => $result['sections'],
						'settings' => [
							'submit_btn_text' => __( 'Submit', 'classified-listing' ),
							'update_btn_text' => __( 'Update', 'classified-listing' ),
						],
					] );

					if ( is_wp_error( $create_result ) ) {
						// Clean up any empty forms that might have been created
						$service->cleanupEmptyForms( $form_title );
						return $create_result;
					}

					$result['form_created'] = true;
					$result['form_id'] = $create_result['form_id'];
					$result['form_title'] = $form_title;

					// Post-creation cleanup: Remove any empty forms (excluding the one just created)
					$cleanup_result = $form_title ? $service->cleanupEmptyForms( $form_title, $create_result['form_id'] ) : 0;
					if ( $cleanup_result > 0 ) {
						$result['cleaned_up_empty_forms'] = $cleanup_result;
					}

					// Clean up duplicate forms with same title, keep only the best one (this one)
					$dup_cleanup = $service->cleanupDuplicateForms( $form_title, $create_result['form_id'] );
					if ( ! empty( $dup_cleanup['removed_count'] ) ) {
						$result['removed_duplicate_forms'] = $dup_cleanup['removed_count'];
					}
				} else {
					$result['form_created'] = false;
				}

				return $result;
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
	 * Discover Forms - Natural language friendly form discovery
	 * Answers: "Are there any forms?", "How many forms exist?", "What forms are available?"
	 */
	private static function registerDiscoverForms() {
		wp_register_ability( 'rtcl/discover-forms', [
			'label'       => __( 'Discover Forms', 'classified-listing' ),
			'description' => __( 'Natural language friendly form discovery. Use this to answer questions like: "Are there any forms?", "Do forms exist?", "What forms are available?", "Is there a default form?". Returns summary information with natural language responses.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'question' => [
						'type'        => 'string',
						'description' => __( 'Optional question context (e.g., "any forms for vehicles?", "default form?").', 'classified-listing' ),
					],
					'include_field_summary' => [
						'type'        => 'boolean',
						'description' => __( 'Include summary of fields for each form.', 'classified-listing' ),
						'default'     => true,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'has_forms'       => [ 'type' => 'boolean', 'description' => __( 'Whether any forms exist.', 'classified-listing' ) ],
					'form_count'      => [ 'type' => 'integer', 'description' => __( 'Total number of forms.', 'classified-listing' ) ],
					'published_count' => [ 'type' => 'integer', 'description' => __( 'Number of published forms.', 'classified-listing' ) ],
					'draft_count'     => [ 'type' => 'integer', 'description' => __( 'Number of draft forms.', 'classified-listing' ) ],
					'default_form'    => [ 'type' => 'object', 'description' => __( 'The default form if one exists.', 'classified-listing' ) ],
					'forms'           => [ 'type' => 'array', 'description' => __( 'List of all forms with summaries.', 'classified-listing' ) ],
					'summary'         => [ 'type' => 'string', 'description' => __( 'Human-readable summary.', 'classified-listing' ) ],
					'suggestions'     => [ 'type' => 'array', 'description' => __( 'Suggested next actions.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->discoverForms( $input );
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

	/**
	 * Get Forms by Category - Find forms that work with a specific category
	 */
	private static function registerGetFormsByCategory() {
		wp_register_ability( 'rtcl/get-forms-by-category', [
			'label'       => __( 'Get Forms by Category', 'classified-listing' ),
			'description' => __( 'Find forms that are available for a specific category. Categories may have form assignments or conditional fields. Use this to answer: "Which form should I use for Electronics?", "What fields are available for the Cars category?"', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'category' => [
						'description' => __( 'Category ID, slug, or name.', 'classified-listing' ),
					],
					'include_fields' => [
						'type'        => 'boolean',
						'description' => __( 'Include field details for matching forms.', 'classified-listing' ),
						'default'     => true,
					],
					'include_conditional' => [
						'type'        => 'boolean',
						'description' => __( 'Include fields with category-based conditional logic.', 'classified-listing' ),
						'default'     => true,
					],
				],
				'required' => [ 'category' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'category'           => [ 'type' => 'object', 'description' => __( 'Resolved category info.', 'classified-listing' ) ],
					'forms'              => [ 'type' => 'array', 'description' => __( 'Forms available for this category.', 'classified-listing' ) ],
					'recommended_form'   => [ 'type' => 'object', 'description' => __( 'Recommended form for this category.', 'classified-listing' ) ],
					'category_fields'    => [ 'type' => 'array', 'description' => __( 'Fields specific to this category.', 'classified-listing' ) ],
					'conditional_fields' => [ 'type' => 'array', 'description' => __( 'Fields with category conditions.', 'classified-listing' ) ],
					'summary'            => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->getFormsByCategory( $input );
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

	/**
	 * Get Forms by Listing Type - Find forms for sell/buy/job/etc.
	 */
	private static function registerGetFormsByListingType() {
		wp_register_ability( 'rtcl/get-forms-by-listing-type', [
			'label'       => __( 'Get Forms by Listing Type', 'classified-listing' ),
			'description' => __( 'Find forms suitable for a specific listing type (sell, buy, exchange, job, to_let). Use this to answer: "Which forms support job listings?", "Is there a form for selling items?", "What form should I use for rentals?"', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_type' => [
						'type'        => 'string',
						'enum'        => [ 'sell', 'buy', 'exchange', 'job', 'to_let' ],
						'description' => __( 'Listing type to filter by.', 'classified-listing' ),
					],
					'include_fields' => [
						'type'        => 'boolean',
						'description' => __( 'Include field summary for each form.', 'classified-listing' ),
						'default'     => false,
					],
				],
				'required' => [ 'listing_type' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'listing_type'     => [ 'type' => 'string' ],
					'listing_type_label' => [ 'type' => 'string' ],
					'forms'            => [ 'type' => 'array' ],
					'recommended_form' => [ 'type' => 'object' ],
					'total_forms'      => [ 'type' => 'integer' ],
					'summary'          => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->getFormsByListingType( $input );
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

	/**
	 * Get Form Field Details - Detailed field info for a specific form
	 */
	private static function registerGetFormFieldDetails() {
		wp_register_ability( 'rtcl/get-form-field-details', [
			'label'       => __( 'Get Form Field Details', 'classified-listing' ),
			'description' => __( 'Get detailed information about all fields in a form, organized by type. Use this to answer: "What preset fields does form X have?", "What custom fields are in the Vehicle form?", "What fields are required in this form?", "Show me the select/dropdown fields in this form."', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'form_id' => [
						'type'        => 'integer',
						'description' => __( 'Form ID to get field details for.', 'classified-listing' ),
					],
					'form_slug' => [
						'type'        => 'string',
						'description' => __( 'Form slug (alternative to form_id).', 'classified-listing' ),
					],
					'field_type' => [
						'type'        => 'string',
						'description' => __( 'Filter by field type (e.g., "select", "text", "checkbox").', 'classified-listing' ),
					],
					'only_required' => [
						'type'        => 'boolean',
						'description' => __( 'Only return required fields.', 'classified-listing' ),
						'default'     => false,
					],
					'only_filterable' => [
						'type'        => 'boolean',
						'description' => __( 'Only return filterable fields.', 'classified-listing' ),
						'default'     => false,
					],
					'include_options' => [
						'type'        => 'boolean',
						'description' => __( 'Include options for select/radio/checkbox fields.', 'classified-listing' ),
						'default'     => true,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'form'            => [ 'type' => 'object', 'description' => __( 'Form info.', 'classified-listing' ) ],
					'preset_fields'   => [ 'type' => 'array', 'description' => __( 'Preset/built-in fields.', 'classified-listing' ) ],
					'custom_fields'   => [ 'type' => 'array', 'description' => __( 'Custom fields.', 'classified-listing' ) ],
					'required_fields' => [ 'type' => 'array', 'description' => __( 'All required fields.', 'classified-listing' ) ],
					'filterable_fields' => [ 'type' => 'array', 'description' => __( 'Fields available for filtering.', 'classified-listing' ) ],
					'fields_by_type'  => [ 'type' => 'object', 'description' => __( 'Fields grouped by element type.', 'classified-listing' ) ],
					'field_count'     => [ 'type' => 'object', 'description' => __( 'Count by category.', 'classified-listing' ) ],
					'summary'         => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->getFormFieldDetails( $input );
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

	/**
	 * Search Form Fields - Search across all forms for specific fields
	 */
	private static function registerSearchFormFields() {
		wp_register_ability( 'rtcl/search-form-fields', [
			'label'       => __( 'Search Form Fields', 'classified-listing' ),
			'description' => __( 'Search for specific fields across all forms. Use this to answer: "Which forms have a price field?", "Find forms with a mileage field", "What forms have checkbox fields?", "Is there a form with a bedrooms field?"', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'search' => [
						'type'        => 'string',
						'description' => __( 'Search term for field name or label.', 'classified-listing' ),
					],
					'field_type' => [
						'type'        => 'string',
						'description' => __( 'Filter by field element type (text, select, checkbox, number, date, etc.).', 'classified-listing' ),
					],
					'preset_only' => [
						'type'        => 'boolean',
						'description' => __( 'Only search preset fields.', 'classified-listing' ),
						'default'     => false,
					],
					'custom_only' => [
						'type'        => 'boolean',
						'description' => __( 'Only search custom fields.', 'classified-listing' ),
						'default'     => false,
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'search_term'  => [ 'type' => 'string' ],
					'field_type'   => [ 'type' => 'string' ],
					'total_matches' => [ 'type' => 'integer' ],
					'matches'      => [ 'type' => 'array', 'description' => __( 'Matching fields with their form info.', 'classified-listing' ) ],
					'forms_with_matches' => [ 'type' => 'array', 'description' => __( 'Forms that contain matching fields.', 'classified-listing' ) ],
					'summary'      => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				return $service->searchFormFields( $input );
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

	/**
	 * Register create directory form ability with cascading fields.
	 */
	private static function registerCreateDirectoryForm() {
		wp_register_ability( 'rtcl/create-directory-form', [
			'label'       => __( 'Create Directory Form', 'classified-listing' ),
			'description' => __( 'Create a directory-style form with cascading/dependent fields. Use this for forms where child options depend on parent selection (e.g., Car Make → Model, Country → City). The cascading_fields array defines parent-child relationships using option_depends_on and depends_on properties.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Form title. Required.', 'classified-listing' ),
					],
					'slug' => [
						'type'        => 'string',
						'description' => __( 'URL-friendly slug. Auto-generated from title if not provided.', 'classified-listing' ),
					],
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft' ],
						'description' => __( 'Form status. Default: publish.', 'classified-listing' ),
						'default'     => 'publish',
					],
					'preset_fields' => [
						'type'        => 'array',
						'description' => __( 'Preset fields to include: title, pricing, category, location, images, description, etc.', 'classified-listing' ),
						'items'       => [ 'type' => 'string' ],
						'default'     => [ 'title', 'pricing', 'category', 'location', 'images', 'description' ],
					],
					'cascading_fields' => [
						'type'        => 'array',
						'description' => __( 'Array of cascading field definitions. Fields are processed in order, so parent fields must come before child fields. Use depends_on_field to reference the parent field name, and depends_on in options to specify which parent values show each option.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'name' => [
									'type'        => 'string',
									'description' => __( 'Field name (key). Used as reference for child fields. Example: "make", "model".', 'classified-listing' ),
								],
								'label' => [
									'type'        => 'string',
									'description' => __( 'Display label. Example: "Car Make", "Model".', 'classified-listing' ),
								],
								'type' => [
									'type'        => 'string',
									'enum'        => [ 'select', 'radio', 'checkbox' ],
									'description' => __( 'Field type. Default: select.', 'classified-listing' ),
									'default'     => 'select',
								],
								'placeholder' => [
									'type'        => 'string',
									'description' => __( 'Placeholder text for select fields.', 'classified-listing' ),
								],
								'depends_on_field' => [
									'type'        => 'string',
									'description' => __( 'Name of the parent field this field depends on. Only set for child fields. Example: "make" for a model field.', 'classified-listing' ),
								],
								'options' => [
									'type'        => 'array',
									'description' => __( 'Field options. For child fields, include depends_on array to specify which parent values show each option.', 'classified-listing' ),
									'items'       => [
										'type'       => 'object',
										'properties' => [
											'label' => [
												'type'        => 'string',
												'description' => __( 'Display label.', 'classified-listing' ),
											],
											'value' => [
												'type'        => 'string',
												'description' => __( 'Option value (stored in database).', 'classified-listing' ),
											],
											'depends_on' => [
												'type'        => 'array',
												'description' => __( 'Array of parent option values that make this option visible. Empty array = always visible.', 'classified-listing' ),
												'items'       => [ 'type' => 'string' ],
											],
										],
									],
								],
								'filterable' => [
									'type'        => 'boolean',
									'description' => __( 'Allow filtering listings by this field. Default: true.', 'classified-listing' ),
									'default'     => true,
								],
								'validation' => [
									'type'       => 'object',
									'properties' => [
										'required' => [ 'type' => 'boolean' ],
									],
								],
							],
							'required' => [ 'name', 'label', 'options' ],
						],
					],
					'custom_fields' => [
						'type'        => 'array',
						'description' => __( 'Additional custom fields (non-cascading).', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'type'        => [ 'type' => 'string' ],
								'name'        => [ 'type' => 'string' ],
								'label'       => [ 'type' => 'string' ],
								'placeholder' => [ 'type' => 'string' ],
								'options'     => [ 'type' => 'array' ],
								'validation'  => [ 'type' => 'object' ],
							],
						],
					],
					'sections' => [
						'type'        => 'array',
						'description' => __( 'Custom section configuration. If not provided, default sections are created.', 'classified-listing' ),
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'title'  => [ 'type' => 'string' ],
								'fields' => [ 'type' => 'array', 'items' => [ 'type' => 'string' ] ],
							],
						],
					],
				],
				'required' => [ 'title', 'cascading_fields' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'     => [ 'type' => 'boolean' ],
					'form_id'     => [ 'type' => 'integer' ],
					'title'       => [ 'type' => 'string' ],
					'slug'        => [ 'type' => 'string' ],
					'status'      => [ 'type' => 'string' ],
					'field_count' => [ 'type' => 'integer' ],
					'cascading_field_count' => [ 'type' => 'integer' ],
					'dependency_map' => [
						'type'        => 'object',
						'description' => __( 'Map of field dependencies showing parent-child relationships.', 'classified-listing' ),
					],
					'message'     => [ 'type' => 'string' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();

				$config = [
					'title'            => $input['title'] ?? '',
					'slug'             => $input['slug'] ?? '',
					'status'           => $input['status'] ?? 'publish',
					'preset_fields'    => $input['preset_fields'] ?? [ 'title', 'pricing', 'category', 'location', 'images', 'description' ],
					'cascading_fields' => $input['cascading_fields'] ?? [],
					'custom_fields'    => $input['custom_fields'] ?? [],
					'sections'         => $input['sections'] ?? [],
				];

				$result = $service->createDirectoryForm( $config );

				if ( is_wp_error( $result ) ) {
					// Clean up any empty forms that might have been created
					$service->cleanupEmptyForms( $config['title'] );
					return $result;
				}

				// Build dependency map for response
				$dependency_map = [];
				$cascading_count = 0;
				if ( ! empty( $input['cascading_fields'] ) ) {
					foreach ( $input['cascading_fields'] as $field ) {
						$name = $field['name'] ?? '';
						$depends_on = $field['depends_on_field'] ?? null;
						if ( $name ) {
							$dependency_map[ $name ] = [
								'depends_on' => $depends_on,
								'option_count' => count( $field['options'] ?? [] ),
							];
							$cascading_count++;
						}
					}
				}

				$result['cascading_field_count'] = $cascading_count;
				$result['dependency_map'] = $dependency_map;

				// Post-creation cleanup: Remove any empty forms (excluding the one just created)
				$cleanup_result = ( ! empty( $config['title'] ) ? $service->cleanupEmptyForms( $config['title'], $result['form_id'] ?? 0 ) : 0 );
				if ( $cleanup_result > 0 ) {
					$result['cleaned_up_empty_forms'] = ( $result['cleaned_up_empty_forms'] ?? 0 ) + $cleanup_result;
				}

				// Clean up duplicate forms with same title, keep only this one (the best version)
				$title = $config['title'] ?? '';
				if ( $title && ! empty( $result['form_id'] ) ) {
					$dup_cleanup = $service->cleanupDuplicateForms( $title, $result['form_id'] );
					if ( ! empty( $dup_cleanup['removed_count'] ) ) {
						$result['removed_duplicate_forms'] = $dup_cleanup['removed_count'];
					}
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getManageFormsCallback(),
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
	 * Register cleanup empty forms ability.
	 */
	private static function registerCleanupEmptyForms() {
		wp_register_ability( 'rtcl/cleanup-empty-forms', [
			'label'       => __( 'Cleanup Empty Forms', 'classified-listing' ),
			'description' => __( 'Clean up empty forms that have no fields. These may be leftover from failed form creation processes. You can choose to delete them permanently or set them to draft status. Use this to maintain a clean form library.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'action' => [
						'type'        => 'string',
						'enum'        => [ 'delete', 'draft' ],
						'description' => __( 'Action to take: "delete" permanently removes empty forms, "draft" sets them to draft status. Default: delete.', 'classified-listing' ),
						'default'     => 'delete',
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'         => [ 'type' => 'boolean', 'description' => __( 'Whether cleanup was successful.', 'classified-listing' ) ],
					'action'          => [ 'type' => 'string', 'description' => __( 'Action taken.', 'classified-listing' ) ],
					'processed_count' => [ 'type' => 'integer', 'description' => __( 'Number of empty forms processed.', 'classified-listing' ) ],
					'skipped_count'   => [ 'type' => 'integer', 'description' => __( 'Number of forms skipped (e.g., default forms).', 'classified-listing' ) ],
					'processed'       => [ 'type' => 'array', 'description' => __( 'Details of processed forms.', 'classified-listing' ) ],
					'skipped'         => [ 'type' => 'array', 'description' => __( 'Details of skipped forms.', 'classified-listing' ) ],
					'message'         => [ 'type' => 'string', 'description' => __( 'Result message.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				$action = sanitize_key( $input['action'] ?? 'delete' );

				// Validate action
				if ( ! in_array( $action, [ 'delete', 'draft' ], true ) ) {
					$action = 'delete';
				}

				return $service->cleanupAllEmptyForms( $action );
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
	 * Register cleanup duplicate forms ability.
	 */
	private static function registerCleanupDuplicateForms() {
		wp_register_ability( 'rtcl/cleanup-duplicate-forms', [
			'label'       => __( 'Cleanup Duplicate Forms', 'classified-listing' ),
			'description' => __( 'Clean up duplicate forms with the same title. When AI creates multiple iterations of a form, this keeps only the best version (with the most fields) and removes the rest. Useful for maintenance after form creation sessions.', 'classified-listing' ),
			'category'    => 'rtcl-forms',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'title' => [
						'type'        => 'string',
						'description' => __( 'Form title to search for duplicates. Required.', 'classified-listing' ),
					],
					'keep_form_id' => [
						'type'        => 'integer',
						'description' => __( 'Specific form ID to keep. If not provided, keeps the form with the most fields.', 'classified-listing' ),
					],
				],
				'required' => [ 'title' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'success'       => [ 'type' => 'boolean', 'description' => __( 'Whether cleanup was successful.', 'classified-listing' ) ],
					'removed_count' => [ 'type' => 'integer', 'description' => __( 'Number of duplicate forms removed.', 'classified-listing' ) ],
					'kept_form'     => [ 'type' => 'object', 'description' => __( 'Details of the form that was kept.', 'classified-listing' ) ],
					'removed'       => [ 'type' => 'array', 'description' => __( 'Details of removed forms.', 'classified-listing' ) ],
					'message'       => [ 'type' => 'string', 'description' => __( 'Result message.', 'classified-listing' ) ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new FormService();
				$title = sanitize_text_field( $input['title'] ?? '' );
				$keep_id = absint( $input['keep_form_id'] ?? 0 );

				if ( empty( $title ) ) {
					return new \WP_Error( 'missing_title', __( 'Title is required.', 'classified-listing' ) );
				}

				return $service->cleanupDuplicateForms( $title, $keep_id );
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
