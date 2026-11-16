<?php

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Helpers\Functions;
use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\FBHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Handles Form Builder form operations via MCP.
 *
 * Creates and manages listing forms with preset and custom fields.
 */
class FormService {

	/**
	 * Available preset field elements.
	 */
	private const PRESET_ELEMENTS = [
		'title',
		'description',
		'excerpt',
		'pricing',
		'category',
		'location',
		'tag',
		'listing_type',
		'images',
		'video_urls',
		'phone',
		'whatsapp',
		'email',
		'website',
		'address',
		'zipcode',
		'geo_location',
		'business_hours',
		'social_profiles',
		'terms_and_condition',
		'recaptcha',
		'view_count',
	];

	/**
	 * Available custom field types.
	 */
	private const CUSTOM_FIELD_TYPES = [
		'text',
		'textarea',
		'number',
		'select',
		'radio',
		'checkbox',
		'date',
		'url',
		'color_picker',
		'file',
		'switch',
		'input_hidden',
		'custom_html',
	];

	/**
	 * Check if Form Builder is available.
	 *
	 * @return bool
	 */
	public function isFormBuilderAvailable(): bool {
		return class_exists( 'Rtcl\Models\Form\Form' ) &&
			   class_exists( 'Rtcl\Services\FormBuilder\FBHelper' ) &&
			   FBHelper::isEnabled();
	}

	/**
	 * Create a new form.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param array $data Form data.
	 *
	 * @return array|\WP_Error Created form info or error.
	 */
	public function createForm( array $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to create forms.', 'classified-listing' ) );
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		// Validate required fields
		$title = trim( sanitize_text_field( $data['title'] ?? '' ) );
		if ( '' === $title ) {
			return new \WP_Error(
				'missing_title',
				__( 'Form title is required.', 'classified-listing' )
			);
		}

		// Clean up any previously failed empty forms with similar title
		$cleaned_up = $this->cleanupEmptyForms( $title );

		// Generate slug
		$slug = ! empty( $data['slug'] )
			? sanitize_title( $data['slug'] )
			: sanitize_title( $title );

		// Ensure unique slug
		$slug = $this->getUniqueSlug( $slug );

		// Build fields and sections
		$fields = [];
		$section_containers = [];

		// Process preset fields
		if ( ! empty( $data['preset_fields'] ) && is_array( $data['preset_fields'] ) ) {
			foreach ( $data['preset_fields'] as $preset_config ) {
				$field = $this->buildPresetField( $preset_config );
				if ( $field ) {
					$fields[ $field['uuid'] ] = $field;
					$section_containers[] = $field['uuid'];
				}
			}
		}

		// Process custom fields
		if ( ! empty( $data['custom_fields'] ) && is_array( $data['custom_fields'] ) ) {
			foreach ( $data['custom_fields'] as $custom_config ) {
				$field = $this->buildCustomField( $custom_config );
				if ( $field ) {
					$fields[ $field['uuid'] ] = $field;
					$section_containers[] = $field['uuid'];
				}
			}
		}

		// Build sections with field resolution support
		$sections = $this->buildSections( $data['sections'] ?? [], $section_containers, $fields );

		// Build settings
		$settings = [
			'submit_btn_text' => sanitize_text_field( $data['submit_button_text'] ?? __( 'Submit', 'classified-listing' ) ),
			'update_btn_text' => sanitize_text_field( $data['update_button_text'] ?? __( 'Update', 'classified-listing' ) ),
		];

		// Create form
		$form = new Form();
		$form->title      = $title;
		$form->slug       = $slug;
		$form->status     = self::sanitizeFormStatus( $data['status'] ?? 'publish' );
		$form->fields     = $fields;
		$form->sections   = $sections;
		$form->settings   = $settings;
		$form->default    = ! empty( $data['is_default'] ) ? 1 : 0;
		$form->created_by = get_current_user_id();

		// Save
		$form->save();

		if ( ! $form->id ) {
			return new \WP_Error(
				'form_creation_failed',
				__( 'Failed to create form.', 'classified-listing' )
			);
		}

		$result = [
			'form_id'     => $form->id,
			'title'       => $form->title,
			'slug'        => $form->slug,
			'status'      => $form->status,
			'is_default'  => (bool) $form->default,
			'field_count' => count( $fields ),
			'message'     => __( 'Form created successfully.', 'classified-listing' ),
		];

		// Add cleanup info if any empty forms were removed
		if ( $cleaned_up > 0 ) {
			$result['cleaned_up_empty_forms'] = $cleaned_up;
		}

		return $result;
	}

	/**
	 * Update an existing form.
	 *
	 * @param int   $form_id Form ID.
	 * Requires manage_options (admin) capability.
	 *
	 * @param array $data    Update data.
	 *
	 * @return array|\WP_Error Updated form info or error.
	 */
	public function updateForm( int $form_id, array $data ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to update forms.', 'classified-listing' ) );
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		$form = Form::query()->find( $form_id );
		if ( ! $form ) {
			return new \WP_Error(
				'form_not_found',
				__( 'Form not found.', 'classified-listing' )
			);
		}

		// Update title
		if ( isset( $data['title'] ) ) {
			$form->title = sanitize_text_field( $data['title'] );
		}

		// Update slug
		if ( isset( $data['slug'] ) ) {
			$new_slug = sanitize_title( $data['slug'] );
			if ( $new_slug !== $form->slug ) {
				$form->slug = $this->getUniqueSlug( $new_slug, $form_id );
			}
		}

		// Update status
		if ( isset( $data['status'] ) ) {
			$form->status = self::sanitizeFormStatus( $data['status'] );
		}

		// Update default
		if ( isset( $data['is_default'] ) ) {
			$form->default = $data['is_default'] ? 1 : 0;
		}

		// Update settings
		if ( isset( $data['submit_button_text'] ) || isset( $data['update_button_text'] ) ) {
			$settings = $form->settings ?? [];
			if ( isset( $data['submit_button_text'] ) ) {
				$settings['submit_btn_text'] = sanitize_text_field( $data['submit_button_text'] );
			}
			if ( isset( $data['update_button_text'] ) ) {
				$settings['update_btn_text'] = sanitize_text_field( $data['update_button_text'] );
			}
			$form->settings = $settings;
		}

		// Handle field updates (add new fields)
		if ( ! empty( $data['add_preset_fields'] ) || ! empty( $data['add_custom_fields'] ) ) {
			$fields = $form->fields ?? [];
			$sections = $form->sections ?? [];

			// Get or create default section
			$default_section_uuid = null;
			if ( ! empty( $sections ) ) {
				$default_section_uuid = $sections[0]['uuid'] ?? null;
			}

			$new_field_uuids = [];

			// Add preset fields
			if ( ! empty( $data['add_preset_fields'] ) && is_array( $data['add_preset_fields'] ) ) {
				foreach ( $data['add_preset_fields'] as $preset_config ) {
					$field = $this->buildPresetField( $preset_config );
					if ( $field ) {
						$fields[ $field['uuid'] ] = $field;
						$new_field_uuids[] = $field['uuid'];
					}
				}
			}

			// Add custom fields
			if ( ! empty( $data['add_custom_fields'] ) && is_array( $data['add_custom_fields'] ) ) {
				foreach ( $data['add_custom_fields'] as $custom_config ) {
					$field = $this->buildCustomField( $custom_config );
					if ( $field ) {
						$fields[ $field['uuid'] ] = $field;
						$new_field_uuids[] = $field['uuid'];
					}
				}
			}

			// Add new fields to first section's first container
			if ( ! empty( $new_field_uuids ) && ! empty( $sections ) ) {
				if ( ! isset( $sections[0]['containers'] ) ) {
					$sections[0]['containers'] = [ [ 'fields' => [] ] ];
				}
				if ( ! isset( $sections[0]['containers'][0]['fields'] ) ) {
					$sections[0]['containers'][0]['fields'] = [];
				}
				$sections[0]['containers'][0]['fields'] = array_merge(
					$sections[0]['containers'][0]['fields'],
					$new_field_uuids
				);
			}

			$form->fields = $fields;
			$form->sections = $sections;
		}

		// Handle field removal
		if ( ! empty( $data['remove_fields'] ) && is_array( $data['remove_fields'] ) ) {
			$fields = $form->fields ?? [];
			$sections = $form->sections ?? [];

			foreach ( $data['remove_fields'] as $field_identifier ) {
				$uuid_to_remove = $this->findFieldUuid( $fields, $field_identifier );
				if ( $uuid_to_remove ) {
					unset( $fields[ $uuid_to_remove ] );
					// Remove from sections
					$sections = $this->removeFieldFromSections( $sections, $uuid_to_remove );
				}
			}

			$form->fields = $fields;
			$form->sections = $sections;
		}

		$form->save();

		$fields = $form->fields ?? [];

		return [
			'form_id'     => $form->id,
			'title'       => $form->title,
			'slug'        => $form->slug,
			'status'      => $form->status,
			'is_default'  => (bool) $form->default,
			'field_count' => count( $fields ),
			'message'     => __( 'Form updated successfully.', 'classified-listing' ),
		];
	}

	/**
	 * Delete a form.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param int  $form_id      Form ID.
	 * @param bool $force_delete Whether to permanently delete (bypass trash). Default: false.
	 *
	 * @return array|\WP_Error Result or error.
	 */
	public function deleteForm( int $form_id, bool $force_delete = false ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to delete forms.', 'classified-listing' ) );
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		$form = Form::query()->find( $form_id );
		if ( ! $form ) {
			return new \WP_Error(
				'form_not_found',
				__( 'Form not found.', 'classified-listing' )
			);
		}

		// Don't allow deleting the default form
		if ( $form->default ) {
			return new \WP_Error(
				'cannot_delete_default',
				__( 'Cannot delete the default form.', 'classified-listing' )
			);
		}

		$title = $form->title;

		// Forms are rows of the rtcl_forms table, not posts: never use the WP post APIs with a form ID
		// (they would act on whatever post shares that ID).
		if ( $force_delete ) {
			if ( ! $form->delete() ) {
				return new \WP_Error( 'delete_failed', __( 'Failed to delete form.', 'classified-listing' ) );
			}
			$message    = __( 'Form permanently deleted.', 'classified-listing' );
			$new_status = 'deleted';
		} else {
			// Soft delete: unpublish the form.
			$form->status = 'draft';
			if ( false === $form->update() ) {
				return new \WP_Error( 'draft_failed', __( 'Failed to change form status to draft.', 'classified-listing' ) );
			}
			$message    = __( 'Form status changed to draft (soft delete).', 'classified-listing' );
			$new_status = 'draft';
		}

		return [
			'deleted'      => true,
			'form_id'      => $form_id,
			'title'        => $title,
			'force_delete' => $force_delete,
			'new_status'   => $new_status,
			'message'      => $message,
		];
	}

	/**
	 * Check if a form is empty (has no fields or only empty sections).
	 *
	 * @param Form|int $form Form object or ID.
	 *
	 * @return bool True if form is empty.
	 */
	public function isFormEmpty( $form ): bool {
		if ( is_int( $form ) ) {
			$form = Form::query()->find( $form );
		}

		if ( ! $form ) {
			return true;
		}

		// Check if fields array is empty
		$fields = $form->fields;
		if ( empty( $fields ) || ! is_array( $fields ) ) {
			return true;
		}

		// Check if sections have any fields
		$sections = $form->sections;
		if ( empty( $sections ) || ! is_array( $sections ) ) {
			return true;
		}

		// Check if any section has fields in its containers
		$has_fields_in_sections = false;
		foreach ( $sections as $section ) {
			$containers = $section['containers'] ?? [];
			foreach ( $containers as $container ) {
				if ( ! empty( $container['fields'] ) ) {
					$has_fields_in_sections = true;
					break 2;
				}
			}
		}

		return ! $has_fields_in_sections;
	}

	/**
	 * Form status: only the statuses the form builder uses.
	 *
	 * @param mixed $status Raw status.
	 *
	 * @return string
	 */
	private static function sanitizeFormStatus( $status ): string {
		$status = sanitize_key( (string) $status );

		return in_array( $status, [ 'publish', 'draft' ], true ) ? $status : 'draft';
	}

	/**
	 * Whether any listing is assigned to the form (`_rtcl_form_id` meta).
	 *
	 * @param int $form_id Form ID.
	 *
	 * @return bool
	 */
	private function isFormInUse( int $form_id ): bool {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching
		return (bool) $wpdb->get_var( $wpdb->prepare(
			"SELECT 1 FROM {$wpdb->postmeta} WHERE meta_key = '_rtcl_form_id' AND meta_value = %s LIMIT 1",
			(string) $form_id
		) );
	}

	/**
	 * Clean up empty forms with similar title.
	 * This removes forms that were created but left empty (failed creations).
	 *
	 * @param string $title_pattern Title or title pattern to match.
	 * @param int    $exclude_id    Form ID to exclude from cleanup.
	 *
	 * @return int Number of forms deleted.
	 */
	public function cleanupEmptyForms( string $title_pattern = '', int $exclude_id = 0 ): int {
		if ( ! current_user_can( 'manage_options' ) ) {
			return 0;
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return 0;
		}

		$deleted_count = 0;

		// Get all forms
		$forms = Form::query()->get();

		foreach ( $forms as $form ) {
			// Skip the excluded form
			if ( $exclude_id && $form->id === $exclude_id ) {
				continue;
			}

			// Skip default forms
			if ( $form->default ) {
				continue;
			}

			// If title pattern provided, check if form title matches
			if ( $title_pattern ) {
				$form_title_slug = sanitize_title( $form->title );
				$pattern_slug = sanitize_title( $title_pattern );

				// Exact title match only (a prefix match would also hit e.g. "Car" -> "Cars for Sale").
				if ( $form_title_slug !== $pattern_slug ) {
					continue;
				}
			}

			// Only empty forms that no listing uses.
			if ( $this->isFormEmpty( $form ) && ! $this->isFormInUse( (int) $form->id ) && $form->delete() ) {
				$deleted_count++;
			}
		}

		return $deleted_count;
	}

	/**
	 * Clean up ALL empty forms in the system.
	 *
	 * @param string $action Action to take: 'delete' (permanently delete) or 'draft' (set to draft status).
	 *
	 * @return array Result with counts and details.
	 */
	public function cleanupAllEmptyForms( string $action = 'delete' ): array {
		if ( ! current_user_can( 'manage_options' ) ) {
			return [
				'success' => false,
				'error'   => __( 'Administrator access required.', 'classified-listing' ),
			];
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'success' => false,
				'error'   => __( 'Form Builder is not available.', 'classified-listing' ),
			];
		}

		$processed = [];
		$skipped = [];

		// Get all forms
		$forms = Form::query()->get();

		foreach ( $forms as $form ) {
			// Skip default forms
			if ( $form->default ) {
				$skipped[] = [
					'form_id' => $form->id,
					'title'   => $form->title,
					'reason'  => 'default_form',
				];
				continue;
			}

			// Check if form is empty
			if ( $this->isFormEmpty( $form ) ) {
				if ( 'draft' === $action ) {
					// Set to draft
					$form->status = 'draft';
					$form->save();
					$processed[] = [
						'form_id' => $form->id,
						'title'   => $form->title,
						'action'  => 'set_to_draft',
					];
				} else {
					// Delete the form
					$form_id = $form->id;
					$form_title = $form->title;
					$form->delete();
					$processed[] = [
						'form_id' => $form_id,
						'title'   => $form_title,
						'action'  => 'deleted',
					];
				}
			}
		}

		$message = 'draft' === $action
			? sprintf(
				/* translators: %d: number of forms set to draft */
				__( '%d empty form(s) set to draft.', 'classified-listing' ),
				count( $processed )
			)
			: sprintf(
				/* translators: %d: number of forms deleted */
				__( '%d empty form(s) deleted.', 'classified-listing' ),
				count( $processed )
			);

		return [
			'success'         => true,
			'action'          => $action,
			'processed_count' => count( $processed ),
			'skipped_count'   => count( $skipped ),
			'processed'       => $processed,
			'skipped'         => $skipped,
			'message'         => $message,
		];
	}

	/**
	 * Clean up duplicate forms with the same base title.
	 * Keeps only the form with the most fields (the "best" version).
	 *
	 * This is useful when AI creates multiple iterations of a form,
	 * keeping only the final/best version.
	 *
	 * @param string $title      Base title to match.
	 * @param int    $keep_id    Form ID to always keep (optional).
	 *
	 * @return array Result with details of removed forms.
	 */
	public function cleanupDuplicateForms( string $title, int $keep_id = 0 ): array {
		if ( ! current_user_can( 'manage_options' ) ) {
			return [
				'success' => false,
				'error'   => __( 'Administrator access required.', 'classified-listing' ),
			];
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'success' => false,
				'error'   => __( 'Form Builder is not available.', 'classified-listing' ),
			];
		}

		if ( empty( $title ) ) {
			return [
				'success'       => true,
				'removed_count' => 0,
				'message'       => __( 'No title provided.', 'classified-listing' ),
			];
		}

		$title_slug = sanitize_title( $title );
		$matching_forms = [];

		// Get all forms
		$forms = Form::query()->get();

		foreach ( $forms as $form ) {
			// Skip default forms
			if ( $form->default ) {
				continue;
			}

			// Exact title match only (a prefix match would also hit e.g. "Car" -> "Cars for Sale").
			$form_slug = sanitize_title( $form->title );
			if ( $form_slug === $title_slug ) {
				$field_count = 0;
				if ( ! empty( $form->fields ) && is_array( $form->fields ) ) {
					$field_count = count( $form->fields );
				}

				$matching_forms[] = [
					'form'        => $form,
					'field_count' => $field_count,
				];
			}
		}

		// If 0 or 1 forms found, nothing to clean
		if ( count( $matching_forms ) <= 1 ) {
			return [
				'success'       => true,
				'removed_count' => 0,
				'message'       => __( 'No duplicate forms found.', 'classified-listing' ),
			];
		}

		// Sort by field count descending (most fields first)
		usort( $matching_forms, function ( $a, $b ) {
			return $b['field_count'] - $a['field_count'];
		} );

		// Determine which form to keep
		$form_to_keep = null;
		if ( $keep_id > 0 ) {
			// Find the form with the specified ID
			foreach ( $matching_forms as $item ) {
				if ( $item['form']->id === $keep_id ) {
					$form_to_keep = $item['form'];
					break;
				}
			}
		}

		// If no specific form to keep or not found, keep the one with most fields
		if ( ! $form_to_keep ) {
			$form_to_keep = $matching_forms[0]['form'];
		}

		// Remove all other matching forms
		$removed = [];
		foreach ( $matching_forms as $item ) {
			// Never delete a form that listings are assigned to.
			if ( $item['form']->id !== $form_to_keep->id && ! $this->isFormInUse( (int) $item['form']->id ) && $item['form']->delete() ) {
				$removed[] = [
					'form_id'     => $item['form']->id,
					'title'       => $item['form']->title,
					'field_count' => $item['field_count'],
				];
			}
		}

		return [
			'success'       => true,
			'removed_count' => count( $removed ),
			'kept_form'     => [
				'form_id'     => $form_to_keep->id,
				'title'       => $form_to_keep->title,
				'field_count' => count( $form_to_keep->fields ?? [] ),
			],
			'removed'       => $removed,
			'message'       => sprintf(
				/* translators: %1$d: number of forms removed, %2$s: kept form title */
				__( 'Removed %1$d duplicate form(s). Kept: %2$s', 'classified-listing' ),
				count( $removed ),
				$form_to_keep->title
			),
		];
	}

	/**
	 * Get available preset fields info.
	 *
	 * @return array Preset field definitions.
	 */
	public function getAvailablePresetFields(): array {
		$presets = [];

		foreach ( self::PRESET_ELEMENTS as $element ) {
			$presets[] = [
				'element'     => $element,
				'label'       => $this->getPresetFieldLabel( $element ),
				'description' => $this->getPresetFieldDescription( $element ),
			];
		}

		return $presets;
	}

	/**
	 * Get available custom field types.
	 *
	 * @return array Field type definitions.
	 */
	public function getAvailableFieldTypes(): array {
		$types = [];

		$descriptions = [
			'text'         => __( 'Single-line text input.', 'classified-listing' ),
			'textarea'     => __( 'Multi-line text area.', 'classified-listing' ),
			'number'       => __( 'Numeric input with min/max validation.', 'classified-listing' ),
			'select'       => __( 'Dropdown select menu.', 'classified-listing' ),
			'radio'        => __( 'Radio button group.', 'classified-listing' ),
			'checkbox'     => __( 'Checkbox group for multiple selections.', 'classified-listing' ),
			'date'         => __( 'Date/time picker.', 'classified-listing' ),
			'url'          => __( 'URL input with validation.', 'classified-listing' ),
			'color_picker' => __( 'Color selection input.', 'classified-listing' ),
			'file'         => __( 'File upload field.', 'classified-listing' ),
			'switch'       => __( 'Toggle switch (yes/no).', 'classified-listing' ),
			'input_hidden' => __( 'Hidden field.', 'classified-listing' ),
			'custom_html'  => __( 'Custom HTML content.', 'classified-listing' ),
		];

		foreach ( self::CUSTOM_FIELD_TYPES as $type ) {
			$types[] = [
				'type'        => $type,
				'description' => $descriptions[ $type ] ?? '',
			];
		}

		return $types;
	}

	/**
	 * Generate a unique UUID.
	 *
	 * @return string Hex UUID.
	 */
	private function generateUuid(): string {
		return dechex( wp_rand() );
	}

	/**
	 * Get unique form slug.
	 *
	 * @param string   $slug         Desired slug.
	 * @param int|null $except_id    Exclude form ID from check.
	 *
	 * @return string Unique slug.
	 */
	private function getUniqueSlug( string $slug, ?int $except_id = null ): string {
		$original_slug = $slug;
		$counter = 1;

		while ( true ) {
			$query = Form::query()->where( 'slug', $slug );
			if ( $except_id ) {
				$query->where( 'id', '!=', $except_id );
			}
			$exists = $query->first();

			if ( ! $exists ) {
				break;
			}

			$slug = $original_slug . '-' . $counter;
			$counter++;
		}

		return $slug;
	}

	/**
	 * Build a preset field from config.
	 *
	 * @param array|string $config Field config or element name.
	 *
	 * @return array|null Field data or null.
	 */
	private function buildPresetField( $config ): ?array {
		// Allow simple string for element name
		if ( is_string( $config ) ) {
			$config = [ 'element' => $config ];
		}

		$element = sanitize_key( $config['element'] ?? '' );
		if ( ! in_array( $element, self::PRESET_ELEMENTS, true ) ) {
			return null;
		}

		$uuid = $this->generateUuid();

		// Get default field structure from core plugin if available
		$defaults = $this->getPresetFieldDefaults( $element );

		$field = array_merge( $defaults, [
			'uuid'           => $uuid,
			'element'        => $element,
			'preset'         => 1,
			'name'           => $this->getPresetFieldName( $element ),
			'label'          => sanitize_text_field( $config['label'] ?? $this->getPresetFieldLabel( $element ) ),
			'placeholder'    => sanitize_text_field( $config['placeholder'] ?? $defaults['placeholder'] ?? '' ),
			'container_class' => sanitize_text_field( $config['css_class'] ?? '' ),
			'help_message'   => sanitize_text_field( $config['help_message'] ?? '' ),
			'label_placement' => '',
			'admin_use_only' => false,
			'validation'     => $this->buildPresetValidation( $element, $config['validation'] ?? [] ),
			'logics'         => [],
		] );

		// Element-specific properties
		switch ( $element ) {
			case 'title':
				$field['type'] = 'text';
				$field['default_value'] = '';
				break;

			case 'description':
				$field['editor_type'] = sanitize_key( $config['editor_type'] ?? 'textarea' );
				$field['rows'] = absint( $config['rows'] ?? 5 );
				$field['cols'] = '';
				break;

			case 'excerpt':
				$field['rows'] = absint( $config['rows'] ?? 3 );
				break;

			case 'pricing':
				$field['options'] = [ 'pricing_type', 'price_type' ];
				$field['class'] = '';
				$field['pricing_type'] = 'price';
				$field['price_type'] = 'fixed';
				$field['pricing_type_label'] = __( 'Pricing Type', 'classified-listing' );
				$field['price_type_label'] = __( 'Price Type', 'classified-listing' );
				$field['price_unit_label'] = __( 'Price Unit', 'classified-listing' );
				$field['price_label'] = __( 'Price', 'classified-listing' );
				break;

			case 'category':
				$field['type'] = 'single';
				break;

			case 'location':
				$field['is_unique'] = 'no';
				break;

			case 'tag':
				$field['allow_new'] = true;
				break;

			case 'listing_type':
				$field['default_value'] = '';
				break;

			case 'images':
				$field['validation'] = array_merge( $field['validation'], [
					'max_file_size' => [
						'value'      => 10,
						'_valueFrom' => 'MB',
						'message'    => __( 'Maximum file size limit is {value}MB', 'classified-listing' ),
					],
					'max_file_count' => [
						'value'   => absint( $config['max_images'] ?? 5 ),
						'message' => __( 'You can upload maximum {value} image', 'classified-listing' ),
					],
					'allowed_image_types' => [
						'value'   => [ 'jpeg', 'jpg', 'png', 'webp' ],
						'message' => __( 'Allowed image types does not match. {value}', 'classified-listing' ),
					],
				] );
				break;

			case 'video_urls':
				$field['placeholder'] = $config['placeholder'] ?? __( 'Only YouTube & Vimeo URLs.', 'classified-listing' );
				break;

			case 'phone':
			case 'whatsapp':
				$field['type'] = 'tel';
				$field['allow_whatsapp'] = false;
				break;

			case 'email':
				$field['type'] = 'email';
				$field['default_value'] = '';
				$field['validation']['email'] = [
					'value'   => true,
					'message' => __( 'This field must contain a valid email', 'classified-listing' ),
				];
				break;

			case 'address':
				$field['type'] = 'text';
				$field['is_unique'] = 'no';
				break;

			case 'geo_location':
				break;

			case 'business_hours':
				$field['time_format'] = 'H:i';
				break;

			case 'terms_and_condition':
				$field['type'] = 'checkbox';
				$field['default_value'] = false;
				$field['class'] = '';
				$field['admin_field_label'] = __( 'Terms & Conditions', 'classified-listing' );
				$field['tnc_html'] = $config['tnc_html'] ?? 'I have read and agree to the <a target="_blank" rel="noopener" href="#">Terms and Conditions</a> and <a target="_blank" rel="noopener" href="#">Privacy Policy</a>';
				$field['has_checkbox'] = true;
				break;

			case 'recaptcha':
				break;

			case 'view_count':
				$field['default_value'] = '';
				$field['admin_use_only'] = true;
				break;
		}

		return $field;
	}

	/**
	 * Get preset field meta key name.
	 *
	 * @param string $element Element name.
	 *
	 * @return string Meta key name.
	 */
	private function getPresetFieldName( string $element ): string {
		$names = [
			'tag'             => 'tags',
			'whatsapp'        => '_rtcl_whatsapp_number',
			'social_profiles' => '_rtcl_social_profiles',
			'video_urls'      => '_rtcl_video_urls',
			'business_hours'  => '_rtcl_bhs',
			'terms_and_condition' => 'rtcl_agree',
			'view_count'      => 'rtcl_view_count',
		];

		return $names[ $element ] ?? $element;
	}

	/**
	 * Get default field structure for preset fields.
	 *
	 * @param string $element Element name.
	 *
	 * @return array Default properties.
	 */
	private function getPresetFieldDefaults( string $element ): array {
		return [
			'default_value'   => '',
			'placeholder'     => '',
			'container_class' => '',
			'label_placement' => '',
			'help_message'    => '',
			'admin_use_only'  => false,
			'logics'          => [],
		];
	}

	/**
	 * Build validation for preset fields with proper defaults.
	 *
	 * @param string $element Element name.
	 * @param array  $config  Validation config.
	 *
	 * @return array Validation structure.
	 */
	private function buildPresetValidation( string $element, array $config ): array {
		$validation = [
			'required' => [
				'value'   => ! empty( $config['required'] ),
				'message' => sanitize_text_field( $config['required_message'] ?? __( 'This field is required', 'classified-listing' ) ),
			],
		];

		// Add min/max for text fields
		if ( in_array( $element, [ 'title', 'description', 'excerpt' ], true ) ) {
			$validation['min'] = [
				'value'   => $config['min'] ?? ( 'title' === $element ? 2 : '' ),
				'message' => __( 'Minimum {value} character', 'classified-listing' ),
			];
			$validation['max'] = [
				'value'   => $config['max'] ?? ( 'title' === $element ? 255 : '' ),
				'message' => __( 'Maximum {value} character', 'classified-listing' ),
			];
		}

		return $validation;
	}

	/**
	 * Build a custom field from config.
	 *
	 * @param array $config Field config.
	 *
	 * @return array|null Field data or null.
	 */
	private function buildCustomField( array $config ): ?array {
		$type = sanitize_key( $config['type'] ?? 'text' );
		if ( ! in_array( $type, self::CUSTOM_FIELD_TYPES, true ) ) {
			return null;
		}

		$name = sanitize_key( $config['name'] ?? '' );
		if ( '' === $name ) {
			return null;
		}

		$uuid = $this->generateUuid();
		$field = [
			'uuid'            => $uuid,
			'element'         => $type,
			'name'            => $name,
			'label'           => sanitize_text_field( $config['label'] ?? $name ),
			'placeholder'     => sanitize_text_field( $config['placeholder'] ?? '' ),
			'default_value'   => $this->sanitizeDefaultValue( $config['default_value'] ?? '', $type ),
			'container_class' => sanitize_text_field( $config['css_class'] ?? '' ),
			'id'              => '',
			'class'           => '',
			'label_placement' => '',
			'help_message'    => sanitize_text_field( $config['help_message'] ?? '' ),
			'filterable'      => ! empty( $config['filterable'] ),
			'single_view'     => $config['single_view'] ?? true,
			'archive_view'    => ! empty( $config['archive_view'] ),
			'order'           => absint( $config['order'] ?? 0 ),
			'validation'      => $this->buildCustomValidation( $type, $config['validation'] ?? [] ),
			'logics'          => [],
		];

		// Type-specific properties
		switch ( $type ) {
			case 'text':
				// Text has minimal extra properties
				break;

			case 'textarea':
				$field['rows'] = absint( $config['rows'] ?? 5 );
				$field['cols'] = absint( $config['cols'] ?? 2 );
				$field['editor_type'] = sanitize_key( $config['editor_type'] ?? 'textarea' );
				break;

			case 'number':
				$field['numeric_formatter'] = sanitize_text_field( $config['format'] ?? '' );
				$field['validation']['numeric'] = [
					'value'   => true,
					'message' => __( 'This field must contain numeric value', 'classified-listing' ),
				];
				if ( isset( $config['min'] ) ) {
					$field['validation']['min'] = [
						'value'   => $config['min'],
						'message' => __( 'Minimum value is {value}', 'classified-listing' ),
					];
				} else {
					$field['validation']['min'] = [
						'value'   => '',
						'message' => __( 'Minimum value is {value}', 'classified-listing' ),
					];
				}
				if ( isset( $config['max'] ) ) {
					$field['validation']['max'] = [
						'value'   => $config['max'],
						'message' => __( 'Maximum value is {value}', 'classified-listing' ),
					];
				} else {
					$field['validation']['max'] = [
						'value'   => '',
						'message' => __( 'Maximum value is {value}', 'classified-listing' ),
					];
				}
				$field['validation']['digits'] = [
					'value'   => '',
					'message' => __( 'The number of digits has to be {value}', 'classified-listing' ),
				];
				break;

			case 'url':
				$field['validation']['url'] = [
					'value'   => true,
					'message' => __( 'This field must contain a valid url', 'classified-listing' ),
				];
				break;

			case 'select':
				$has_deps = ! empty( $config['option_depends_on'] );
				$field['options'] = $this->buildOptions( $config['options'] ?? [], $has_deps );
				$field['values_visible'] = ! empty( $config['values_visible'] );
				$field['placeholder'] = $config['placeholder'] ?? __( '- Select -', 'classified-listing' );
				// Smart dependency: link to parent field UUID
				if ( ! empty( $config['option_depends_on'] ) ) {
					$field['option_depends_on'] = sanitize_text_field( $config['option_depends_on'] );
				}
				break;

			case 'radio':
				$has_deps = ! empty( $config['option_depends_on'] );
				$field['options'] = $this->buildOptions( $config['options'] ?? [], $has_deps );
				$field['values_visible'] = ! empty( $config['values_visible'] );
				$field['direction'] = sanitize_key( $config['direction'] ?? 'horizontal' );
				$field['enable_icon_class'] = ! empty( $config['enable_icons'] );
				// Smart dependency: link to parent field UUID
				if ( ! empty( $config['option_depends_on'] ) ) {
					$field['option_depends_on'] = sanitize_text_field( $config['option_depends_on'] );
				}
				break;

			case 'checkbox':
				$has_deps = ! empty( $config['option_depends_on'] );
				$field['options'] = $this->buildOptions( $config['options'] ?? [], $has_deps );
				$field['values_visible'] = ! empty( $config['values_visible'] );
				$field['direction'] = sanitize_key( $config['direction'] ?? 'horizontal' );
				$field['enable_icon_class'] = ! empty( $config['enable_icons'] );
				// Smart dependency: link to parent field UUID
				if ( ! empty( $config['option_depends_on'] ) ) {
					$field['option_depends_on'] = sanitize_text_field( $config['option_depends_on'] );
				}
				break;

			case 'switch':
				$field['label_placement'] = 'left';
				break;

			case 'date':
				$field['date_format'] = sanitize_text_field( $config['date_format'] ?? 'd/m/Y H:i' );
				$field['date_type'] = sanitize_key( $config['date_type'] ?? 'single' );
				$field['filterable_date_type'] = 'single';
				$field['date_config'] = '';
				$field['is_time_enabled'] = isset( $config['include_time'] ) ? ! empty( $config['include_time'] ) : true;
				break;

			case 'color_picker':
				if ( ! empty( $config['default_value'] ) ) {
					$field['default_value'] = sanitize_hex_color( $config['default_value'] );
				}
				break;

			case 'file':
				$field['btn_text'] = sanitize_text_field( $config['button_text'] ?? __( 'Choose File', 'classified-listing' ) );
				$field['file_location'] = sanitize_key( $config['file_location'] ?? 'default' );
				$field['validation'] = array_merge( $field['validation'], [
					'max_file_size' => [
						'value'      => absint( $config['max_file_size'] ?? 2 ),
						'_valueFrom' => 'MB',
						'message'    => __( 'Maximum file size limit is {value}MB', 'classified-listing' ),
					],
					'max_file_count' => [
						'value'   => absint( $config['max_files'] ?? 1 ),
						'message' => __( 'You can upload maximum {value} file', 'classified-listing' ),
					],
					'allowed_file_types' => [
						'value'   => $config['allowed_types'] ?? [ 'jpg|jpeg|webp|png|gif|bmp' ],
						'message' => __( 'Invalid file type', 'classified-listing' ),
					],
				] );
				break;

			case 'input_hidden':
				$field['admin_field_label'] = sanitize_text_field( $config['admin_label'] ?? '' );
				break;

			case 'custom_html':
				$field['html_codes'] = wp_kses_post( $config['html_content'] ?? $config['html_codes'] ?? 'Some description about this section' );
				break;
		}

		return $field;
	}

	/**
	 * Build validation for custom fields with proper defaults.
	 *
	 * @param string $type   Field type.
	 * @param array  $config Validation config.
	 *
	 * @return array Validation structure.
	 */
	private function buildCustomValidation( string $type, array $config ): array {
		$validation = [
			'required' => [
				'value'   => ! empty( $config['required'] ),
				'message' => sanitize_text_field( $config['required_message'] ?? __( 'This field is required', 'classified-listing' ) ),
			],
		];

		return $validation;
	}

	/**
	 * Build options array for select/radio/checkbox.
	 *
	 * @param array $options Raw options.
	 *
	 * @return array Formatted options.
	 */
	private function buildOptions( array $options, bool $with_dependencies = false ): array {
		$formatted = [];

		foreach ( $options as $opt ) {
			if ( is_array( $opt ) ) {
				$option = [
					'value'      => sanitize_text_field( $opt['value'] ?? '' ),
					'label'      => sanitize_text_field( $opt['label'] ?? $opt['value'] ?? '' ),
					'icon_class' => sanitize_text_field( $opt['icon'] ?? '' ),
				];

				// Support smart dependencies - depends_on specifies parent option values
				if ( $with_dependencies && isset( $opt['depends_on'] ) ) {
					$depends_on = $opt['depends_on'];
					if ( is_array( $depends_on ) ) {
						$option['depends_on'] = array_map( 'sanitize_text_field', $depends_on );
					} elseif ( is_string( $depends_on ) ) {
						$option['depends_on'] = [ sanitize_text_field( $depends_on ) ];
					}
				}

				// Support calculated value for pricing fields
				if ( isset( $opt['calc_value'] ) ) {
					$option['calc_value'] = sanitize_text_field( $opt['calc_value'] );
				}

				// Support image for option
				if ( isset( $opt['image'] ) ) {
					$option['image'] = esc_url_raw( $opt['image'] );
				}

				$formatted[] = $option;
			} else {
				// Simple string option
				$formatted[] = [
					'value'      => sanitize_text_field( $opt ),
					'label'      => sanitize_text_field( $opt ),
					'icon_class' => '',
				];
			}
		}

		return $formatted;
	}

	/**
	 * Build sections structure.
	 *
	 * @param array $sections_config Custom sections config.
	 * @param array $field_uuids     Field UUIDs to distribute.
	 * @param array $fields          Optional. Full fields array for name-to-UUID resolution.
	 *
	 * @return array Sections structure.
	 */
	private function buildSections( array $sections_config, array $field_uuids, array $fields = [] ): array {
		// Build name-to-UUID mapping for resolution
		$name_to_uuid = [];
		$element_to_uuid = [];
		foreach ( $fields as $uuid => $field ) {
			$name = $field['name'] ?? '';
			$element = $field['element'] ?? '';
			if ( $name ) {
				$name_to_uuid[ $name ] = $uuid;
			}
			if ( $element ) {
				// For preset fields, element name can also be used as reference
				$element_to_uuid[ $element ] = $uuid;
			}
		}

		// If no custom sections, create a default one
		if ( empty( $sections_config ) ) {
			return [
				[
					'uuid'            => $this->generateUuid(),
					'element'         => 'section',
					'title'           => __( 'Listing Details', 'classified-listing' ),
					'id'              => '',
					'container_class' => '',
					'icon'            => '',
					'logics'          => [],
					'containers'      => [
						[
							'fields' => $field_uuids,
						],
					],
				],
			];
		}

		// Build custom sections
		$sections = [];
		$assigned_fields = [];

		foreach ( $sections_config as $idx => $section_config ) {
			$section = [
				'uuid'            => $section_config['uuid'] ?? $this->generateUuid(),
				'element'         => 'section',
				'title'           => sanitize_text_field( $section_config['title'] ?? sprintf( __( 'Section %d', 'classified-listing' ), $idx + 1 ) ),
				'id'              => sanitize_key( $section_config['id'] ?? '' ),
				'container_class' => sanitize_text_field( $section_config['css_class'] ?? '' ),
				'icon'            => sanitize_text_field( $section_config['icon'] ?? '' ),
				'logics'          => $this->normalizeLogics( $section_config['logics'] ?? [] ),
				'containers'      => [],
			];

			// Build containers (columns)
			$containers = $section_config['containers'] ?? [ [ 'fields' => $section_config['fields'] ?? [] ] ];

			foreach ( $containers as $container_config ) {
				$container_fields = [];
				$field_refs = $container_config['fields'] ?? [];

				foreach ( $field_refs as $field_ref ) {
					$resolved_uuid = $this->resolveFieldReference( $field_ref, $field_uuids, $name_to_uuid, $element_to_uuid );
					if ( $resolved_uuid && ! in_array( $resolved_uuid, $assigned_fields, true ) ) {
						$container_fields[] = $resolved_uuid;
						$assigned_fields[] = $resolved_uuid;
					}
				}

				$section['containers'][] = [
					'title'  => sanitize_text_field( $container_config['title'] ?? '' ),
					'fields' => $container_fields,
				];
			}

			$sections[] = $section;
		}

		// Add unassigned fields to appropriate sections or last section
		$unassigned = array_diff( $field_uuids, $assigned_fields );
		if ( ! empty( $unassigned ) && ! empty( $sections ) ) {
			// Try to auto-organize fields into sections by matching field types to section names
			$remaining = $this->autoOrganizeFieldsIntoSections( $sections, $unassigned, $fields );

			// Any still unassigned go to last section
			if ( ! empty( $remaining ) ) {
				$last_idx = count( $sections ) - 1;
				if ( empty( $sections[ $last_idx ]['containers'] ) ) {
					$sections[ $last_idx ]['containers'] = [ [ 'fields' => [] ] ];
				}
				$sections[ $last_idx ]['containers'][0]['fields'] = array_merge(
					$sections[ $last_idx ]['containers'][0]['fields'],
					array_values( $remaining )
				);
			}
		}

		// Remove empty containers and empty sections
		$sections = array_filter(
			array_map(
				function ( $section ) {
					// Filter out empty containers
					$section['containers'] = array_values(
						array_filter(
							$section['containers'],
							function ( $container ) {
								return ! empty( $container['fields'] );
							}
						)
					);
					return $section;
				},
				$sections
			),
			function ( $section ) {
				// Keep section only if it has containers with fields
				return ! empty( $section['containers'] );
			}
		);

		return array_values( $sections );
	}

	/**
	 * Resolve a field reference to its UUID.
	 *
	 * @param string $field_ref       Field reference (UUID, name, or element).
	 * @param array  $field_uuids     All field UUIDs.
	 * @param array  $name_to_uuid    Name to UUID mapping.
	 * @param array  $element_to_uuid Element to UUID mapping.
	 *
	 * @return string|null Resolved UUID or null.
	 */
	private function resolveFieldReference( string $field_ref, array $field_uuids, array $name_to_uuid, array $element_to_uuid ): ?string {
		// Direct UUID match
		if ( in_array( $field_ref, $field_uuids, true ) ) {
			return $field_ref;
		}

		// Match by field name
		if ( isset( $name_to_uuid[ $field_ref ] ) ) {
			return $name_to_uuid[ $field_ref ];
		}

		// Match by element type (for preset fields)
		if ( isset( $element_to_uuid[ $field_ref ] ) ) {
			return $element_to_uuid[ $field_ref ];
		}

		// Try case-insensitive match
		$field_ref_lower = strtolower( $field_ref );
		foreach ( $name_to_uuid as $name => $uuid ) {
			if ( strtolower( $name ) === $field_ref_lower ) {
				return $uuid;
			}
		}
		foreach ( $element_to_uuid as $element => $uuid ) {
			if ( strtolower( $element ) === $field_ref_lower ) {
				return $uuid;
			}
		}

		return null;
	}

	/**
	 * Auto-organize unassigned fields into sections based on field type and section name matching.
	 *
	 * @param array $sections   Sections (modified by reference).
	 * @param array $unassigned Unassigned field UUIDs.
	 * @param array $fields     Full fields array.
	 *
	 * @return array Remaining unassigned UUIDs.
	 */
	private function autoOrganizeFieldsIntoSections( array &$sections, array $unassigned, array $fields ): array {
		$remaining = [];

		// Define field-to-section mapping based on common patterns
		$field_section_map = [
			// Basic/Core fields
			'title'       => [ 'basic', 'info', 'general', 'core', 'main' ],
			'description' => [ 'basic', 'info', 'general', 'core', 'main', 'detail' ],
			'excerpt'     => [ 'basic', 'info', 'general', 'core', 'main' ],
			'category'    => [ 'basic', 'info', 'general', 'core', 'main', 'classification' ],
			'tag'         => [ 'basic', 'info', 'general', 'core', 'main', 'tag' ],
			'listing_type' => [ 'basic', 'info', 'general', 'core', 'main', 'type', 'ad' ],

			// Pricing fields
			'pricing'     => [ 'price', 'pricing', 'cost', 'payment', 'rate' ],
			'price'       => [ 'price', 'pricing', 'cost', 'payment', 'rate' ],

			// Location fields
			'location'     => [ 'location', 'address', 'contact', 'where', 'place', 'area' ],
			'address'      => [ 'location', 'address', 'contact', 'where', 'place' ],
			'zipcode'      => [ 'location', 'address', 'contact', 'where', 'place' ],
			'geo_location' => [ 'location', 'address', 'map', 'where', 'place' ],
			'map'          => [ 'location', 'address', 'map', 'where', 'place' ],

			// Contact fields
			'phone'    => [ 'contact', 'communication', 'reach' ],
			'whatsapp' => [ 'contact', 'communication', 'reach' ],
			'email'    => [ 'contact', 'communication', 'reach' ],
			'website'  => [ 'contact', 'communication', 'reach', 'social', 'online' ],
			'social_profiles' => [ 'contact', 'social', 'online' ],

			// Media fields
			'images'     => [ 'media', 'image', 'photo', 'gallery', 'visual' ],
			'video_urls' => [ 'media', 'video', 'visual' ],

			// Business fields
			'business_hours' => [ 'business', 'hour', 'schedule', 'time', 'operation' ],

			// Terms
			'terms_and_condition' => [ 'term', 'submit', 'agreement', 'legal' ],
			'recaptcha'           => [ 'term', 'submit', 'security' ],
		];

		foreach ( $unassigned as $uuid ) {
			$field = $fields[ $uuid ] ?? [];
			$element = $field['element'] ?? '';
			$name = $field['name'] ?? '';
			$label = strtolower( $field['label'] ?? '' );

			$assigned = false;

			// Try to match field to a section
			foreach ( $sections as &$section ) {
				$section_title_lower = strtolower( $section['title'] ?? '' );

				// Check if field element or name matches section keywords
				$keywords = $field_section_map[ $element ] ?? $field_section_map[ $name ] ?? [];

				// Also add keywords from field label
				$label_keywords = explode( ' ', preg_replace( '/[^a-z0-9\s]/', '', $label ) );

				foreach ( $keywords as $keyword ) {
					if ( strpos( $section_title_lower, $keyword ) !== false ) {
						// Found a match - add to this section
						if ( empty( $section['containers'] ) ) {
							$section['containers'] = [ [ 'fields' => [] ] ];
						}
						$section['containers'][0]['fields'][] = $uuid;
						$assigned = true;
						break 2;
					}
				}

				// Try matching by label keywords
				foreach ( $label_keywords as $label_kw ) {
					if ( strlen( $label_kw ) > 3 && strpos( $section_title_lower, $label_kw ) !== false ) {
						if ( empty( $section['containers'] ) ) {
							$section['containers'] = [ [ 'fields' => [] ] ];
						}
						$section['containers'][0]['fields'][] = $uuid;
						$assigned = true;
						break 2;
					}
				}
			}
			unset( $section );

			if ( ! $assigned ) {
				$remaining[] = $uuid;
			}
		}

		return $remaining;
	}

	/**
	 * Find field UUID by name or UUID.
	 *
	 * @param array  $fields     Fields array.
	 * @param string $identifier Field name or UUID.
	 *
	 * @return string|null UUID or null.
	 */
	private function findFieldUuid( array $fields, string $identifier ): ?string {
		// Direct UUID match
		if ( isset( $fields[ $identifier ] ) ) {
			return $identifier;
		}

		// Search by name
		foreach ( $fields as $uuid => $field ) {
			if ( ( $field['name'] ?? '' ) === $identifier ) {
				return $uuid;
			}
		}

		return null;
	}

	/**
	 * Remove field UUID from all sections.
	 *
	 * @param array  $sections Sections array.
	 * @param string $uuid     Field UUID to remove.
	 *
	 * @return array Updated sections.
	 */
	private function removeFieldFromSections( array $sections, string $uuid ): array {
		foreach ( $sections as &$section ) {
			if ( ! empty( $section['containers'] ) ) {
				foreach ( $section['containers'] as &$container ) {
					if ( ! empty( $container['fields'] ) ) {
						$container['fields'] = array_values(
							array_filter( $container['fields'], fn( $f ) => $f !== $uuid )
						);
					}
				}
			}
		}
		return $sections;
	}

	/**
	 * Sanitize default value based on field type.
	 *
	 * @param mixed  $value Value to sanitize.
	 * @param string $type  Field type.
	 *
	 * @return mixed Sanitized value.
	 */
	private function sanitizeDefaultValue( $value, string $type ) {
		switch ( $type ) {
			case 'number':
				return is_numeric( $value ) ? $value : '';

			case 'url':
				return esc_url_raw( $value );

			case 'color_picker':
				return sanitize_hex_color( $value ) ?: '#000000';

			case 'checkbox':
				return is_array( $value ) ? array_map( 'sanitize_text_field', $value ) : [];

			default:
				return sanitize_text_field( $value );
		}
	}

	/**
	 * Get preset field label.
	 *
	 * @param string $element Element name.
	 *
	 * @return string Label.
	 */
	private function getPresetFieldLabel( string $element ): string {
		$labels = [
			'title'               => __( 'Title', 'classified-listing' ),
			'description'         => __( 'Description', 'classified-listing' ),
			'excerpt'             => __( 'Excerpt', 'classified-listing' ),
			'pricing'             => __( 'Price', 'classified-listing' ),
			'category'            => __( 'Category', 'classified-listing' ),
			'location'            => __( 'Location', 'classified-listing' ),
			'tag'                 => __( 'Tags', 'classified-listing' ),
			'listing_type'        => __( 'Listing Type', 'classified-listing' ),
			'images'              => __( 'Images', 'classified-listing' ),
			'video_urls'          => __( 'Video URLs', 'classified-listing' ),
			'phone'               => __( 'Phone', 'classified-listing' ),
			'whatsapp'            => __( 'WhatsApp', 'classified-listing' ),
			'email'               => __( 'Email', 'classified-listing' ),
			'website'             => __( 'Website', 'classified-listing' ),
			'address'             => __( 'Address', 'classified-listing' ),
			'zipcode'             => __( 'Zip Code', 'classified-listing' ),
			'geo_location'        => __( 'Map Location', 'classified-listing' ),
			'business_hours'      => __( 'Business Hours', 'classified-listing' ),
			'social_profiles'     => __( 'Social Profiles', 'classified-listing' ),
			'terms_and_condition' => __( 'Terms & Conditions', 'classified-listing' ),
			'recaptcha'           => __( 'reCAPTCHA', 'classified-listing' ),
			'view_count'          => __( 'View Count', 'classified-listing' ),
		];

		return $labels[ $element ] ?? ucwords( str_replace( '_', ' ', $element ) );
	}

	/**
	 * Get preset field description.
	 *
	 * @param string $element Element name.
	 *
	 * @return string Description.
	 */
	private function getPresetFieldDescription( string $element ): string {
		$descriptions = [
			'title'               => __( 'Main listing title.', 'classified-listing' ),
			'description'         => __( 'Full listing description with editor.', 'classified-listing' ),
			'excerpt'             => __( 'Short summary text.', 'classified-listing' ),
			'pricing'             => __( 'Price and price type configuration.', 'classified-listing' ),
			'category'            => __( 'Listing category selection.', 'classified-listing' ),
			'location'            => __( 'Geographic location selection.', 'classified-listing' ),
			'tag'                 => __( 'Tag selection with optional new tag creation.', 'classified-listing' ),
			'listing_type'        => __( 'Type of listing (sell, buy, exchange, etc.).', 'classified-listing' ),
			'images'              => __( 'Gallery images upload.', 'classified-listing' ),
			'video_urls'          => __( 'YouTube/Vimeo video links.', 'classified-listing' ),
			'phone'               => __( 'Contact phone number.', 'classified-listing' ),
			'whatsapp'            => __( 'WhatsApp contact number.', 'classified-listing' ),
			'email'               => __( 'Contact email address.', 'classified-listing' ),
			'website'             => __( 'Website URL.', 'classified-listing' ),
			'address'             => __( 'Street address.', 'classified-listing' ),
			'zipcode'             => __( 'Postal/ZIP code.', 'classified-listing' ),
			'geo_location'        => __( 'Map coordinates picker.', 'classified-listing' ),
			'business_hours'      => __( 'Weekly business hours schedule.', 'classified-listing' ),
			'social_profiles'     => __( 'Social media profile links.', 'classified-listing' ),
			'terms_and_condition' => __( 'Terms acceptance checkbox.', 'classified-listing' ),
			'recaptcha'           => __( 'Google reCAPTCHA verification.', 'classified-listing' ),
			'view_count'          => __( 'Listing view counter (admin only).', 'classified-listing' ),
		];

		return $descriptions[ $element ] ?? '';
	}

	/**
	 * Normalize fields to ensure all required properties exist.
	 *
	 * @param array $fields Fields array from import.
	 *
	 * @return array Normalized fields.
	 */
	private function normalizeFields( array $fields ): array {
		$normalized = [];

		foreach ( $fields as $uuid => $field ) {
			$element = $field['element'] ?? 'text';
			$is_preset = ! empty( $field['preset'] );

			// Ensure required base properties
			$field = array_merge( [
				'uuid'            => $uuid,
				'element'         => $element,
				'name'            => $field['name'] ?? $element,
				'label'           => $field['label'] ?? ucfirst( str_replace( '_', ' ', $element ) ),
				'placeholder'     => '',
				'default_value'   => '',
				'container_class' => $field['css_class'] ?? '',
				'id'              => '',
				'class'           => '',
				'label_placement' => '',
				'help_message'    => '',
				'admin_use_only'  => false,
				'logics'          => [],
				'validation'      => [],
			], $field );

			// Normalize logics (smart dependency / conditional logic)
			$field['logics'] = $this->normalizeLogics( $field['logics'] ?? [] );

			// Ensure validation.required exists
			if ( ! isset( $field['validation']['required'] ) ) {
				$field['validation']['required'] = [
					'value'   => false,
					'message' => __( 'This field is required', 'classified-listing' ),
				];
			}

			// Type-specific normalization
			if ( in_array( $element, [ 'select', 'radio', 'checkbox' ], true ) ) {
				if ( ! isset( $field['options'] ) || ! is_array( $field['options'] ) ) {
					$field['options'] = [];
				}

				// Normalize options with full structure including depends_on
				$field['options'] = $this->normalizeOptions( $field['options'] );

				$field['values_visible'] = $field['values_visible'] ?? false;

				// Support option_depends_on for cascading dropdowns
				if ( isset( $field['option_depends_on'] ) && ! empty( $field['option_depends_on'] ) ) {
					// Validate that the referenced field exists
					if ( isset( $fields[ $field['option_depends_on'] ] ) ) {
						$field['option_depends_on'] = $field['option_depends_on'];
					} else {
						unset( $field['option_depends_on'] );
					}
				}

				if ( in_array( $element, [ 'radio', 'checkbox' ], true ) ) {
					$field['direction'] = $field['direction'] ?? 'horizontal';
					$field['enable_icon_class'] = $field['enable_icon_class'] ?? false;
				}
			}

			// Custom field specific properties
			if ( ! $is_preset ) {
				$field['filterable'] = $field['filterable'] ?? false;
				$field['single_view'] = $field['single_view'] ?? true;
				$field['archive_view'] = $field['archive_view'] ?? false;
				$field['order'] = $field['order'] ?? 0;
			}

			$normalized[ $uuid ] = $field;
		}

		return $normalized;
	}

	/**
	 * Normalize logics (conditional field visibility).
	 *
	 * Structure:
	 * [
	 *   'status' => true|false,
	 *   'conditions' => [
	 *     [
	 *       'fieldId' => 'uuid_of_field',
	 *       'operator' => '=' | '!=' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with',
	 *       'value' => 'value_to_compare' | ['value1', 'value2']
	 *     ]
	 *   ]
	 * ]
	 *
	 * @param mixed $logics Raw logics value.
	 *
	 * @return array Normalized logics structure.
	 */
	private function normalizeLogics( $logics ): array {
		// Handle empty/invalid logics
		if ( empty( $logics ) || ! is_array( $logics ) ) {
			return [];
		}

		// Handle string 'true'/'false' for status
		if ( isset( $logics['status'] ) ) {
			if ( is_string( $logics['status'] ) ) {
				$logics['status'] = ( 'true' === $logics['status'] );
			}
			$logics['status'] = (bool) $logics['status'];
		} else {
			$logics['status'] = false;
		}

		// If status is false, return empty
		if ( ! $logics['status'] ) {
			return [];
		}

		// Validate and normalize conditions
		if ( empty( $logics['conditions'] ) || ! is_array( $logics['conditions'] ) ) {
			return [];
		}

		$valid_operators = [ '=', '!=', 'contains', 'not_contains', 'starts_with', 'ends_with', 'empty', 'not_empty' ];
		$normalized_conditions = [];

		foreach ( $logics['conditions'] as $condition ) {
			// Require fieldId and operator
			if ( empty( $condition['fieldId'] ) || empty( $condition['operator'] ) ) {
				continue;
			}

			// Normalize operator
			$operator = $condition['operator'];
			if ( ! in_array( $operator, $valid_operators, true ) ) {
				// Map common aliases
				$operator_map = [
					'eq'          => '=',
					'neq'         => '!=',
					'equal'       => '=',
					'not_equal'   => '!=',
					'equals'      => '=',
					'not_equals'  => '!=',
				];
				$operator = $operator_map[ $operator ] ?? '=';
			}

			$normalized_conditions[] = [
				'fieldId'  => sanitize_text_field( $condition['fieldId'] ),
				'operator' => $operator,
				'value'    => $condition['value'] ?? '',
			];
		}

		if ( empty( $normalized_conditions ) ) {
			return [];
		}

		return [
			'status'     => true,
			'conditions' => $normalized_conditions,
		];
	}

	/**
	 * Normalize options for select/radio/checkbox fields.
	 *
	 * Supports:
	 * - Simple string array: ['Option 1', 'Option 2']
	 * - Object array: [{'label': 'Option 1', 'value': 'opt1'}]
	 * - With dependencies: [{'label': 'Sub Option', 'value': 'sub', 'depends_on': ['parent_value']}]
	 *
	 * @param array $options Raw options array.
	 *
	 * @return array Normalized options.
	 */
	private function normalizeOptions( array $options ): array {
		return array_map( function ( $opt ) {
			// Simple string option
			if ( ! is_array( $opt ) ) {
				return [
					'value'      => sanitize_text_field( $opt ),
					'label'      => sanitize_text_field( $opt ),
					'icon_class' => '',
					'calc_value' => '',
					'image'      => '',
				];
			}

			// Full object option
			$normalized = [
				'value'      => sanitize_text_field( $opt['value'] ?? '' ),
				'label'      => sanitize_text_field( $opt['label'] ?? $opt['value'] ?? '' ),
				'icon_class' => sanitize_text_field( $opt['icon_class'] ?? $opt['icon'] ?? '' ),
				'calc_value' => sanitize_text_field( $opt['calc_value'] ?? '' ),
				'image'      => esc_url_raw( $opt['image'] ?? '' ),
			];

			// Support depends_on for cascading options
			if ( isset( $opt['depends_on'] ) && is_array( $opt['depends_on'] ) ) {
				$normalized['depends_on'] = array_map( 'sanitize_text_field', $opt['depends_on'] );
			}

			return $normalized;
		}, $options );
	}

	/**
	 * Validate and organize sections to ensure all fields are properly assigned.
	 *
	 * @param array $sections    Normalized sections.
	 * @param array $field_uuids All field UUIDs.
	 * @param array $fields      Full fields array.
	 *
	 * @return array Validated and organized sections.
	 */
	private function validateAndOrganizeSections( array $sections, array $field_uuids, array $fields ): array {
		// Track which fields are assigned
		$assigned_fields = [];

		// First pass: validate existing field assignments
		foreach ( $sections as &$section ) {
			if ( empty( $section['containers'] ) ) {
				$section['containers'] = [ [ 'fields' => [] ] ];
				continue;
			}

			foreach ( $section['containers'] as &$container ) {
				$valid_fields = [];
				foreach ( $container['fields'] ?? [] as $field_uuid ) {
					// Only keep UUIDs that actually exist in fields
					if ( in_array( $field_uuid, $field_uuids, true ) ) {
						$valid_fields[] = $field_uuid;
						$assigned_fields[] = $field_uuid;
					}
				}
				$container['fields'] = $valid_fields;
			}
			unset( $container );
		}
		unset( $section );

		// Find unassigned fields
		$unassigned = array_diff( $field_uuids, $assigned_fields );

		if ( ! empty( $unassigned ) && ! empty( $sections ) ) {
			// Auto-organize unassigned fields into sections
			$remaining = $this->autoOrganizeFieldsIntoSections( $sections, $unassigned, $fields );

			// Any remaining go to an appropriate section based on type
			if ( ! empty( $remaining ) ) {
				// Group remaining by type and add to most relevant section
				$remaining = $this->distributeRemainingFields( $sections, $remaining, $fields );

				// Final fallback: add to first section with non-contact/terms fields
				if ( ! empty( $remaining ) ) {
					$target_idx = 0;
					// Try to find a "main" or "basic" section
					foreach ( $sections as $idx => $section ) {
						$title_lower = strtolower( $section['title'] ?? '' );
						if ( strpos( $title_lower, 'term' ) === false &&
							strpos( $title_lower, 'submit' ) === false ) {
							$target_idx = $idx;
							break;
						}
					}

					if ( empty( $sections[ $target_idx ]['containers'] ) ) {
						$sections[ $target_idx ]['containers'] = [ [ 'fields' => [] ] ];
					}
					$sections[ $target_idx ]['containers'][0]['fields'] = array_merge(
						$sections[ $target_idx ]['containers'][0]['fields'],
						array_values( $remaining )
					);
				}
			}
		}

		return $sections;
	}

	/**
	 * Distribute remaining fields to sections based on field types.
	 *
	 * @param array $sections  Sections (modified by reference).
	 * @param array $remaining Remaining field UUIDs.
	 * @param array $fields    Full fields array.
	 *
	 * @return array Still unassigned field UUIDs.
	 */
	private function distributeRemainingFields( array &$sections, array $remaining, array $fields ): array {
		$still_unassigned = [];

		// Group fields by category
		$categories = [
			'basic'    => [],
			'pricing'  => [],
			'location' => [],
			'contact'  => [],
			'media'    => [],
			'business' => [],
			'features' => [],
			'terms'    => [],
			'other'    => [],
		];

		// Categorize each remaining field
		foreach ( $remaining as $uuid ) {
			$field = $fields[ $uuid ] ?? [];
			$element = $field['element'] ?? '';

			if ( in_array( $element, [ 'title', 'description', 'excerpt', 'category', 'listing_type', 'tag' ], true ) ) {
				$categories['basic'][] = $uuid;
			} elseif ( in_array( $element, [ 'pricing' ], true ) || strpos( strtolower( $field['label'] ?? '' ), 'price' ) !== false ) {
				$categories['pricing'][] = $uuid;
			} elseif ( in_array( $element, [ 'location', 'address', 'zipcode', 'geo_location', 'map' ], true ) ) {
				$categories['location'][] = $uuid;
			} elseif ( in_array( $element, [ 'phone', 'whatsapp', 'email', 'website', 'social_profiles' ], true ) ) {
				$categories['contact'][] = $uuid;
			} elseif ( in_array( $element, [ 'images', 'video_urls' ], true ) ) {
				$categories['media'][] = $uuid;
			} elseif ( in_array( $element, [ 'business_hours' ], true ) ) {
				$categories['business'][] = $uuid;
			} elseif ( in_array( $element, [ 'terms_and_condition', 'recaptcha' ], true ) ) {
				$categories['terms'][] = $uuid;
			} elseif ( in_array( $element, [ 'checkbox', 'radio', 'select', 'switch' ], true ) ) {
				$categories['features'][] = $uuid;
			} else {
				$categories['other'][] = $uuid;
			}
		}

		// Match categories to sections
		$category_section_keywords = [
			'basic'    => [ 'basic', 'info', 'general', 'main', 'detail' ],
			'pricing'  => [ 'price', 'pricing', 'cost' ],
			'location' => [ 'location', 'address', 'contact', 'area', 'where' ],
			'contact'  => [ 'contact', 'communication', 'reach', 'info' ],
			'media'    => [ 'media', 'image', 'photo', 'gallery', 'video' ],
			'business' => [ 'business', 'hour', 'schedule', 'operation' ],
			'features' => [ 'feature', 'amenity', 'option', 'detail', 'spec' ],
			'terms'    => [ 'term', 'submit', 'agreement' ],
		];

		foreach ( $categories as $category => $cat_fields ) {
			if ( empty( $cat_fields ) ) continue;

			$keywords = $category_section_keywords[ $category ] ?? [];
			$matched = false;

			foreach ( $sections as &$section ) {
				$title_lower = strtolower( $section['title'] ?? '' );

				foreach ( $keywords as $keyword ) {
					if ( strpos( $title_lower, $keyword ) !== false ) {
						if ( empty( $section['containers'] ) ) {
							$section['containers'] = [ [ 'fields' => [] ] ];
						}
						$section['containers'][0]['fields'] = array_merge(
							$section['containers'][0]['fields'],
							$cat_fields
						);
						$matched = true;
						break 2;
					}
				}
			}
			unset( $section );

			if ( ! $matched ) {
				$still_unassigned = array_merge( $still_unassigned, $cat_fields );
			}
		}

		return $still_unassigned;
	}

	/**
	 * Normalize sections to ensure all required properties exist.
	 *
	 * @param array $sections Sections array from import.
	 *
	 * @return array Normalized sections.
	 */
	private function normalizeSections( array $sections ): array {
		return array_map( function ( $section ) {
			$section = array_merge( [
				'uuid'            => $section['uuid'] ?? $this->generateUuid(),
				'element'         => 'section',
				'title'           => $section['title'] ?? __( 'Section', 'classified-listing' ),
				'id'              => '',
				'container_class' => $section['css_class'] ?? '',
				'icon'            => '',
				'logics'          => [],
				'containers'      => [],
			], $section );

			// Normalize logics (sections can also have conditional visibility)
			$section['logics'] = $this->normalizeLogics( $section['logics'] ?? [] );

			// Normalize containers (support both 'containers' and 'columns' format)
			$containers = $section['containers'] ?? $section['columns'] ?? [];
			if ( empty( $containers ) ) {
				$section['containers'] = [ [ 'fields' => [] ] ];
			} else {
				$section['containers'] = array_map( function ( $container ) {
					return [
						'width'  => $container['width'] ?? '',
						'fields' => $container['fields'] ?? [],
					];
				}, $containers );
			}

			// Remove columns if present (use containers only)
			unset( $section['columns'] );

			return $section;
		}, $sections );
	}

	/**
	 * Get a single form by ID.
	 *
	 * @param int $form_id Form ID.
	 *
	 * @return array|\WP_Error Form data or error.
	 */
	public function getForm( int $form_id ) {
		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		$form = Form::query()->find( $form_id );
		if ( ! $form ) {
			return new \WP_Error(
				'form_not_found',
				__( 'Form not found.', 'classified-listing' )
			);
		}

		return [
			'form_id'      => $form->id,
			'title'        => $form->title,
			'slug'         => $form->slug,
			'status'       => $form->status,
			'is_default'   => (bool) $form->default,
			'created_by'   => $form->created_by,
			'created_at'   => $form->created_at,
			'fields'       => $form->fields ?? [],
			'sections'     => $form->sections ?? [],
			'settings'     => $form->settings ?? [],
			'field_count'  => count( $form->fields ?? [] ),
			'section_count' => count( $form->sections ?? [] ),
		];
	}

	/**
	 * List all forms.
	 *
	 * @param array $args Query arguments.
	 *
	 * @return array Forms list.
	 */
	public function listForms( array $args = [] ): array {
		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'forms' => [],
				'total' => 0,
				'message' => __( 'Form Builder is not available or enabled.', 'classified-listing' ),
			];
		}

		$status = $args['status'] ?? '';
		$limit = min( absint( $args['limit'] ?? 50 ), 100 );
		$offset = absint( $args['offset'] ?? 0 );

		$query = Form::query();

		if ( $status ) {
			$query->where( 'status', $status );
		}

		$total = $query->count();
		$forms = $query->order_by( 'id', 'DESC' )->limit( $limit )->offset( $offset )->get();

		$result = [];
		foreach ( $forms as $form ) {
			$result[] = [
				'form_id'      => $form->id,
				'title'        => $form->title,
				'slug'         => $form->slug,
				'status'       => $form->status,
				'is_default'   => (bool) $form->default,
				'field_count'  => count( $form->fields ?? [] ),
				'section_count' => count( $form->sections ?? [] ),
				'created_at'   => $form->created_at,
			];
		}

		return [
			'forms'  => $result,
			'total'  => $total,
			'limit'  => $limit,
			'offset' => $offset,
		];
	}

	/**
	 * Export a form to JSON format.
	 *
	 * @param int $form_id Form ID.
	 *
	 * @return array|\WP_Error Export data or error.
	 */
	public function exportForm( int $form_id ) {
		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		$form = Form::query()->find( $form_id );
		if ( ! $form ) {
			return new \WP_Error(
				'form_not_found',
				__( 'Form not found.', 'classified-listing' )
			);
		}

		$export = [
			'version'     => '2.0',
			'exported_at' => current_time( 'c' ),
			'form'        => [
				'title'         => $form->title,
				'slug'          => $form->slug,
				'status'        => $form->status,
				'settings'      => $form->settings ?? [],
				'sections'      => $form->sections ?? [],
				'fields'        => $form->fields ?? [],
				'single_layout' => $form->single_layout ?? [],
				'slug_builder'  => $form->slug_builder ?? [],
			],
		];

		return [
			'success' => true,
			'export'  => $export,
			'json'    => wp_json_encode( $export, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ),
		];
	}

	/**
	 * Import a form from JSON.
	 *
	 * Requires manage_options (admin) capability.
	 *
	 * @param array|string $import_data Import data (array or JSON string).
	 * @param array        $options Import options.
	 *
	 * @return array|\WP_Error Import result or error.
	 */
	public function importForm( $import_data, array $options = [] ) {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'permission_denied', __( 'Administrator access required to import forms.', 'classified-listing' ) );
		}

		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error(
				'form_builder_disabled',
				__( 'Form Builder is not available or enabled.', 'classified-listing' )
			);
		}

		// Parse JSON if string
		if ( is_string( $import_data ) ) {
			$import_data = json_decode( $import_data, true );
			if ( json_last_error() !== JSON_ERROR_NONE ) {
				return new \WP_Error(
					'invalid_json',
					__( 'Invalid JSON format.', 'classified-listing' )
				);
			}
		}

		// Support both wrapped and unwrapped format
		$form_data = $import_data['form'] ?? $import_data;

		if ( empty( $form_data['title'] ) ) {
			return new \WP_Error(
				'missing_title',
				__( 'Form title is required.', 'classified-listing' )
			);
		}

		// Check for legacy format (pre-6.0)
		if ( isset( $form_data['fields'] ) && is_array( $form_data['fields'] ) ) {
			$first_field = reset( $form_data['fields'] );
			if ( $first_field && isset( $first_field['id'] ) && ! isset( $first_field['uuid'] ) ) {
				return new \WP_Error(
					'legacy_format',
					__( 'Legacy form format detected. Please export form from RTCL 6.0+ for import.', 'classified-listing' )
				);
			}
		}

		// Override title if provided
		if ( ! empty( $options['title'] ) ) {
			$form_data['title'] = $options['title'];
		}

		// Clean up any previously failed empty forms with similar title
		$cleaned_up = $this->cleanupEmptyForms( $form_data['title'] );

		// Generate unique slug
		$slug = ! empty( $form_data['slug'] )
			? sanitize_title( $form_data['slug'] )
			: sanitize_title( $form_data['title'] );
		$slug = $this->getUniqueSlug( $slug );

		// Normalize fields to ensure all required properties exist
		$fields = $this->normalizeFields( $form_data['fields'] ?? [] );
		$field_uuids = array_keys( $fields );

		// Validate that we have actual fields before creating
		if ( empty( $fields ) ) {
			return new \WP_Error(
				'empty_form',
				__( 'Cannot import form without any fields. Please provide valid field definitions.', 'classified-listing' )
			);
		}

		// Normalize sections and validate field assignments
		$sections = $this->normalizeSections( $form_data['sections'] ?? [] );

		// Verify all field UUIDs in sections actually exist, and organize unassigned fields
		$sections = $this->validateAndOrganizeSections( $sections, $field_uuids, $fields );

		// Validate that sections have fields
		$has_fields_in_sections = false;
		foreach ( $sections as $section ) {
			$containers = $section['containers'] ?? [];
			foreach ( $containers as $container ) {
				if ( ! empty( $container['fields'] ) ) {
					$has_fields_in_sections = true;
					break 2;
				}
			}
		}

		if ( ! $has_fields_in_sections ) {
			return new \WP_Error(
				'empty_sections',
				__( 'Cannot import form with empty sections. Fields must be assigned to sections.', 'classified-listing' )
			);
		}

		// Create form
		$form = new Form();
		$form->title       = sanitize_text_field( $form_data['title'] );
		$form->slug        = $slug;
		$form->status      = self::sanitizeFormStatus( $options['status'] ?? $form_data['status'] ?? 'publish' );
		$form->fields      = $fields;
		$form->sections    = $sections;
		$form->settings    = $form_data['settings'] ?? [];
		$form->single_layout = $form_data['single_layout'] ?? [];
		$form->slug_builder  = $form_data['slug_builder'] ?? [];
		$form->default     = 0;
		$form->created_by  = get_current_user_id();

		$form->save();

		if ( ! $form->id ) {
			return new \WP_Error(
				'import_failed',
				__( 'Failed to import form.', 'classified-listing' )
			);
		}

		$result = [
			'success'     => true,
			'form_id'     => $form->id,
			'title'       => $form->title,
			'slug'        => $form->slug,
			'status'      => $form->status,
			'field_count' => count( $form->fields ?? [] ),
			'message'     => __( 'Form imported successfully.', 'classified-listing' ),
		];

		// Add cleanup info if any empty forms were removed
		if ( $cleaned_up > 0 ) {
			$result['cleaned_up_empty_forms'] = $cleaned_up;
		}

		return $result;
	}

	/**
	 * Generate form fields using AI.
	 *
	 * @param string $prompt User description of form requirements.
	 * @param array  $options Generation options.
	 *
	 * @return array|\WP_Error Generated fields or error.
	 */
	public function generateFormFields( string $prompt, array $options = [] ) {
		if ( empty( $prompt ) ) {
			return new \WP_Error(
				'missing_prompt',
				__( 'Prompt is required for AI form generation.', 'classified-listing' )
			);
		}

		// Use the AI provider configured in Settings → AI Integration (ChatGPT, Gemini, DeepSeek or Claude),
		// like the form builder does. Factory::initializeAIService() is not used because it exits with
		// wp_send_json_error(), which would break the MCP REST response.
		$ai_tools = (string) Functions::get_option_item( 'rtcl_ai_settings', 'ai_tools', '' );
		if ( ! Functions::is_ai_enabled() || ! in_array( $ai_tools, [ 'OpenAI', 'Gemini', 'DeepSeek', 'Claude' ], true ) ) {
			return new \WP_Error(
				'ai_not_configured',
				__( 'AI field generation needs an AI provider (ChatGPT, Gemini, DeepSeek or Claude) with an API key in Classified Listing → Settings → AI Integration. Alternatively, design the fields yourself and call rtcl/create-form or rtcl/create-directory-form.', 'classified-listing' )
			);
		}

		$client_class = '\\Rtcl\\Services\\AIServices\\AIClients\\' . $ai_tools . 'Client';
		if ( ! class_exists( $client_class ) ) {
			return new \WP_Error( 'ai_not_available', __( 'The configured AI provider is not available.', 'classified-listing' ) );
		}

		try {
			$service = rtcl()->factory->createAIService( $ai_tools, new $client_class() );

			// Generate form fields
			$json_data = wp_json_encode( [ 'prompt' => $prompt ] );
			$result    = $service->generateFormFieldsResponse( $json_data );

			if ( is_wp_error( $result ) ) {
				return $result;
			}

			// Parse result
			$fields = is_string( $result ) ? json_decode( $result, true ) : $result;

			if ( json_last_error() !== JSON_ERROR_NONE || ! is_array( $fields ) ) {
				return new \WP_Error(
					'ai_parse_error',
					__( 'Failed to parse AI response.', 'classified-listing' )
				);
			}

			// Convert AI response to form builder structure
			$structured = $this->structureAIFields( $fields );

			return [
				'success'       => true,
				'fields'        => $structured['fields'],
				'sections'      => $structured['sections'],
				'field_count'   => count( $structured['fields'] ),
				'section_count' => count( $structured['sections'] ),
				'message'       => sprintf(
					/* translators: %1$d: field count, %2$d: section count */
					__( 'Generated %1$d fields in %2$d sections.', 'classified-listing' ),
					count( $structured['fields'] ),
					count( $structured['sections'] )
				),
			];

		} catch ( \Exception $e ) {
			return new \WP_Error(
				'ai_error',
				$e->getMessage()
			);
		}
	}

	/**
	 * Structure AI-generated fields into form builder format.
	 *
	 * @param array $ai_fields Fields from AI response.
	 *
	 * @return array Structured fields and sections.
	 */
	private function structureAIFields( array $ai_fields ): array {
		$fields = [];
		$sections = [];
		$section_map = [];

		foreach ( $ai_fields as $index => $ai_field ) {
			$uuid = $this->generateUuid();
			$section_name = $ai_field['section'] ?? __( 'General', 'classified-listing' );

			// Create section if doesn't exist
			if ( ! isset( $section_map[ $section_name ] ) ) {
				$section_uuid = $this->generateUuid();
				$section_map[ $section_name ] = $section_uuid;
				$sections[ $section_uuid ] = [
					'uuid'            => $section_uuid,
					'element'         => 'section',
					'id'              => sanitize_key( $section_name ),
					'title'           => $section_name,
					'container_class' => '',
					'icon'            => '',
					'logics'          => [],
					'containers'      => [
						[ 'fields' => [] ],
					],
				];
			}

			// Map field type
			$element = $this->mapAIFieldType( $ai_field['type'] ?? 'text' );
			$is_preset = in_array( $element, self::PRESET_ELEMENTS, true );

			// Build field using existing methods for proper structure
			if ( $is_preset ) {
				$field_config = [
					'element'     => $element,
					'label'       => $ai_field['label'] ?? '',
					'placeholder' => $ai_field['placeholder'] ?? '',
					'validation'  => [
						'required' => ! empty( $ai_field['required'] ),
					],
				];
				$field = $this->buildPresetField( $field_config );
				if ( $field ) {
					$field['uuid'] = $uuid; // Override UUID
				}
			} else {
				$field_config = [
					'type'        => $element,
					'name'        => sanitize_key( $ai_field['label'] ?? 'field_' . $index ),
					'label'       => $ai_field['label'] ?? '',
					'placeholder' => $ai_field['placeholder'] ?? '',
					'options'     => $ai_field['options'] ?? [],
					'validation'  => [
						'required' => ! empty( $ai_field['required'] ),
					],
				];
				$field = $this->buildCustomField( $field_config );
				if ( $field ) {
					$field['uuid'] = $uuid; // Override UUID
				}
			}

			if ( $field ) {
				$fields[ $uuid ] = $field;

				// Add field to section
				$section_uuid = $section_map[ $section_name ];
				$sections[ $section_uuid ]['containers'][0]['fields'][] = $uuid;
			}
		}

		return [
			'fields'   => $fields,
			'sections' => array_values( $sections ),
		];
	}

	/**
	 * Map AI field type to form builder element.
	 *
	 * @param string $type AI field type.
	 *
	 * @return string Form builder element name.
	 */
	private function mapAIFieldType( string $type ): string {
		$map = [
			'text'        => 'text',
			'textarea'    => 'textarea',
			'number'      => 'number',
			'email'       => 'email',
			'url'         => 'url',
			'phone'       => 'phone',
			'date'        => 'date',
			'select'      => 'select',
			'dropdown'    => 'select',
			'radio'       => 'radio',
			'checkbox'    => 'checkbox',
			'switch'      => 'switch',
			'toggle'      => 'switch',
			'file'        => 'file',
			'image'       => 'images',
			'images'      => 'images',
			'color'       => 'color_picker',
			'price'       => 'pricing',
			'pricing'     => 'pricing',
			'address'     => 'address',
			'location'    => 'location',
			'map'         => 'geo_location',
			'category'    => 'category',
			'tags'        => 'tag',
			'video'       => 'video_urls',
			'hours'       => 'business_hours',
			'social'      => 'social_profiles',
			'title'       => 'title',
			'description' => 'description',
		];

		$type = strtolower( trim( $type ) );
		return $map[ $type ] ?? 'text';
	}

	/**
	 * Discover forms - Natural language friendly discovery.
	 *
	 * @param array $args Arguments.
	 *
	 * @return array Discovery results.
	 */
	public function discoverForms( array $args = [] ): array {
		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'has_forms'       => false,
				'form_count'      => 0,
				'published_count' => 0,
				'draft_count'     => 0,
				'default_form'    => null,
				'forms'           => [],
				'summary'         => __( 'Form Builder is not available or enabled.', 'classified-listing' ),
				'suggestions'     => [
					__( 'Enable Form Builder in RTCL settings.', 'classified-listing' ),
				],
			];
		}

		$include_fields = $args['include_field_summary'] ?? true;

		// Get all forms
		$all_forms = Form::query()->get();

		$forms = [];
		$default_form = null;
		$published_count = 0;
		$draft_count = 0;

		foreach ( $all_forms as $form ) {
			$fields = $form->fields ?? [];
			$preset_count = 0;
			$custom_count = 0;
			$required_count = 0;

			foreach ( $fields as $field ) {
				if ( ! empty( $field['preset'] ) ) {
					$preset_count++;
				} else {
					$custom_count++;
				}
				if ( ! empty( $field['validation']['required']['value'] ) ) {
					$required_count++;
				}
			}

			$form_data = [
				'form_id'       => $form->id,
				'title'         => $form->title,
				'slug'          => $form->slug,
				'status'        => $form->status,
				'is_default'    => (bool) $form->default,
				'field_count'   => count( $fields ),
				'section_count' => count( $form->sections ?? [] ),
			];

			if ( $include_fields ) {
				$form_data['preset_field_count'] = $preset_count;
				$form_data['custom_field_count'] = $custom_count;
				$form_data['required_field_count'] = $required_count;
			}

			$forms[] = $form_data;

			if ( $form->default ) {
				$default_form = $form_data;
			}

			if ( 'publish' === $form->status ) {
				$published_count++;
			} else {
				$draft_count++;
			}
		}

		$total = count( $forms );
		$has_forms = $total > 0;

		// Build summary
		if ( ! $has_forms ) {
			$summary = __( 'No forms have been created yet.', 'classified-listing' );
			$suggestions = [
				__( 'Use rtcl/create-form to create a new form.', 'classified-listing' ),
				__( 'Use rtcl/generate-form-fields with AI to generate form fields.', 'classified-listing' ),
				__( 'Use rtcl/import-form to import a form from JSON.', 'classified-listing' ),
			];
		} else {
			$summary = sprintf(
				/* translators: %1$d: total forms, %2$d: published, %3$d: draft */
				__( 'Found %1$d form(s): %2$d published, %3$d draft.', 'classified-listing' ),
				$total,
				$published_count,
				$draft_count
			);

			if ( $default_form ) {
				$summary .= ' ' . sprintf(
					/* translators: %s: default form title */
					__( 'Default form: "%s".', 'classified-listing' ),
					$default_form['title']
				);
			}

			$suggestions = [
				__( 'Use rtcl/get-form-field-details to see fields in a specific form.', 'classified-listing' ),
				__( 'Use rtcl/get-forms-by-category to find forms for a category.', 'classified-listing' ),
				__( 'Use rtcl/export-form to export a form for backup.', 'classified-listing' ),
			];
		}

		return [
			'has_forms'       => $has_forms,
			'form_count'      => $total,
			'published_count' => $published_count,
			'draft_count'     => $draft_count,
			'default_form'    => $default_form,
			'forms'           => $forms,
			'summary'         => $summary,
			'suggestions'     => $suggestions,
		];
	}

	/**
	 * Get forms available for a specific category.
	 *
	 * @param array $args Arguments.
	 *
	 * @return array Results.
	 */
	public function getFormsByCategory( array $args ): array {
		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'category'           => null,
				'forms'              => [],
				'recommended_form'   => null,
				'category_fields'    => [],
				'conditional_fields' => [],
				'summary'            => __( 'Form Builder is not available.', 'classified-listing' ),
			];
		}

		$category_input = $args['category'] ?? null;
		$include_fields = $args['include_fields'] ?? true;
		$include_conditional = $args['include_conditional'] ?? true;

		// Resolve category
		$category = $this->resolveCategory( $category_input );
		if ( ! $category ) {
			return [
				'category'           => null,
				'forms'              => [],
				'recommended_form'   => null,
				'category_fields'    => [],
				'conditional_fields' => [],
				'summary'            => sprintf(
					/* translators: %s: category input */
					__( 'Category "%s" not found.', 'classified-listing' ),
					$category_input
				),
			];
		}

		$category_info = [
			'term_id' => $category->term_id,
			'name'    => $category->name,
			'slug'    => $category->slug,
			'parent'  => $category->parent,
		];

		// Get all published forms
		$all_forms = Form::query()->where( 'status', 'publish' )->get();

		$forms = [];
		$recommended_form = null;
		$category_fields = [];
		$conditional_fields = [];

		foreach ( $all_forms as $form ) {
			$fields = $form->fields ?? [];
			$form_conditional_fields = [];

			// Check for fields with category-based conditional logic
			foreach ( $fields as $field ) {
				$logics = $field['logics'] ?? [];

				if ( ! empty( $logics ) && is_array( $logics ) ) {
					foreach ( $logics as $logic ) {
						$conditions = $logic['conditions'] ?? [];
						foreach ( $conditions as $condition ) {
							// Check if condition references category
							if ( isset( $condition['field'] ) &&
								 ( 'category' === $condition['field'] || strpos( $condition['field'], 'category' ) !== false ) ) {

								$values = $condition['value'] ?? [];
								if ( ! is_array( $values ) ) {
									$values = [ $values ];
								}

								// Check if this category matches
								if ( in_array( $category->term_id, $values ) ||
									 in_array( $category->slug, $values ) ||
									 in_array( $category->name, $values ) ) {

									$form_conditional_fields[] = [
										'field_name'  => $field['name'] ?? '',
										'field_label' => $field['label'] ?? '',
										'element'     => $field['element'] ?? '',
										'condition'   => $condition,
									];
								}
							}
						}
					}
				}
			}

			$form_data = [
				'form_id'     => $form->id,
				'title'       => $form->title,
				'slug'        => $form->slug,
				'is_default'  => (bool) $form->default,
				'field_count' => count( $fields ),
			];

			if ( $include_fields ) {
				$preset_count = 0;
				$custom_count = 0;
				foreach ( $fields as $field ) {
					if ( ! empty( $field['preset'] ) ) {
						$preset_count++;
					} else {
						$custom_count++;
					}
				}
				$form_data['preset_field_count'] = $preset_count;
				$form_data['custom_field_count'] = $custom_count;
			}

			if ( ! empty( $form_conditional_fields ) ) {
				$form_data['has_category_conditions'] = true;
				$form_data['conditional_field_count'] = count( $form_conditional_fields );
				$conditional_fields = array_merge( $conditional_fields, $form_conditional_fields );
			}

			$forms[] = $form_data;

			// Recommend default form
			if ( $form->default ) {
				$recommended_form = $form_data;
			}
		}

		// If no default, recommend the first form
		if ( ! $recommended_form && ! empty( $forms ) ) {
			$recommended_form = $forms[0];
		}

		$summary = sprintf(
			/* translators: %1$s: category name, %2$d: form count */
			__( 'Found %2$d form(s) available for category "%1$s".', 'classified-listing' ),
			$category->name,
			count( $forms )
		);

		if ( ! empty( $conditional_fields ) ) {
			$summary .= ' ' . sprintf(
				/* translators: %d: count */
				__( '%d field(s) have category-based conditions.', 'classified-listing' ),
				count( $conditional_fields )
			);
		}

		return [
			'category'           => $category_info,
			'forms'              => $forms,
			'recommended_form'   => $recommended_form,
			'category_fields'    => $category_fields,
			'conditional_fields' => $include_conditional ? $conditional_fields : [],
			'summary'            => $summary,
		];
	}

	/**
	 * Get forms suitable for a listing type.
	 *
	 * @param array $args Arguments.
	 *
	 * @return array Results.
	 */
	public function getFormsByListingType( array $args ): array {
		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'listing_type'       => '',
				'listing_type_label' => '',
				'forms'              => [],
				'recommended_form'   => null,
				'total_forms'        => 0,
				'summary'            => __( 'Form Builder is not available.', 'classified-listing' ),
			];
		}

		$listing_type = sanitize_key( $args['listing_type'] ?? '' );
		$include_fields = $args['include_fields'] ?? false;

		$type_labels = [
			'sell'     => __( 'Sell', 'classified-listing' ),
			'buy'      => __( 'Buy', 'classified-listing' ),
			'exchange' => __( 'Exchange', 'classified-listing' ),
			'job'      => __( 'Job', 'classified-listing' ),
			'to_let'   => __( 'To Let / Rent', 'classified-listing' ),
		];

		if ( ! isset( $type_labels[ $listing_type ] ) ) {
			return [
				'listing_type'       => $listing_type,
				'listing_type_label' => '',
				'forms'              => [],
				'recommended_form'   => null,
				'total_forms'        => 0,
				'summary'            => sprintf(
					/* translators: %s: type */
					__( 'Invalid listing type "%s". Valid types: sell, buy, exchange, job, to_let.', 'classified-listing' ),
					$listing_type
				),
			];
		}

		// Get all published forms
		$all_forms = Form::query()->where( 'status', 'publish' )->get();

		$forms = [];
		$recommended_form = null;

		foreach ( $all_forms as $form ) {
			$fields = $form->fields ?? [];
			$has_listing_type_field = false;

			// Check if form has listing_type field
			foreach ( $fields as $field ) {
				if ( 'listing_type' === ( $field['element'] ?? '' ) ) {
					$has_listing_type_field = true;
					break;
				}
			}

			$form_data = [
				'form_id'               => $form->id,
				'title'                 => $form->title,
				'slug'                  => $form->slug,
				'is_default'            => (bool) $form->default,
				'field_count'           => count( $fields ),
				'has_listing_type_field' => $has_listing_type_field,
			];

			if ( $include_fields ) {
				$preset_names = [];
				foreach ( $fields as $field ) {
					if ( ! empty( $field['preset'] ) ) {
						$preset_names[] = $field['element'] ?? $field['name'] ?? '';
					}
				}
				$form_data['preset_fields'] = $preset_names;
			}

			$forms[] = $form_data;

			// Prefer form with listing_type field as recommended
			if ( $has_listing_type_field && ! $recommended_form ) {
				$recommended_form = $form_data;
			}

			// Fall back to default form
			if ( $form->default && ! $recommended_form ) {
				$recommended_form = $form_data;
			}
		}

		// If still no recommendation, use first form
		if ( ! $recommended_form && ! empty( $forms ) ) {
			$recommended_form = $forms[0];
		}

		$summary = sprintf(
			/* translators: %1$s: listing type label, %2$d: form count */
			__( 'Found %2$d form(s) available for "%1$s" listings.', 'classified-listing' ),
			$type_labels[ $listing_type ],
			count( $forms )
		);

		if ( $recommended_form ) {
			$summary .= ' ' . sprintf(
				/* translators: %s: form title */
				__( 'Recommended: "%s".', 'classified-listing' ),
				$recommended_form['title']
			);
		}

		return [
			'listing_type'       => $listing_type,
			'listing_type_label' => $type_labels[ $listing_type ],
			'forms'              => $forms,
			'recommended_form'   => $recommended_form,
			'total_forms'        => count( $forms ),
			'summary'            => $summary,
		];
	}

	/**
	 * Get detailed field information for a form.
	 *
	 * @param array $args Arguments.
	 *
	 * @return array|\WP_Error Results.
	 */
	public function getFormFieldDetails( array $args ) {
		if ( ! $this->isFormBuilderAvailable() ) {
			return new \WP_Error( 'form_builder_disabled', __( 'Form Builder is not available.', 'classified-listing' ) );
		}

		$form_id = absint( $args['form_id'] ?? 0 );
		$form_slug = $args['form_slug'] ?? '';

		// Resolve form
		$form = null;
		if ( $form_id ) {
			$form = Form::query()->find( $form_id );
		} elseif ( $form_slug ) {
			$form = Form::query()->where( 'slug', sanitize_key( $form_slug ) )->first();
		}

		if ( ! $form ) {
			return new \WP_Error( 'form_not_found', __( 'Form not found.', 'classified-listing' ) );
		}

		$field_type_filter = $args['field_type'] ?? '';
		$only_required = $args['only_required'] ?? false;
		$only_filterable = $args['only_filterable'] ?? false;
		$include_options = $args['include_options'] ?? true;

		$fields = $form->fields ?? [];

		$preset_fields = [];
		$custom_fields = [];
		$required_fields = [];
		$filterable_fields = [];
		$fields_by_type = [];

		foreach ( $fields as $uuid => $field ) {
			$element = $field['element'] ?? 'text';
			$is_preset = ! empty( $field['preset'] );
			$is_required = ! empty( $field['validation']['required']['value'] );
			$is_filterable = ! empty( $field['filterable'] );

			// Apply filters
			if ( $field_type_filter && $element !== $field_type_filter ) {
				continue;
			}
			if ( $only_required && ! $is_required ) {
				continue;
			}
			if ( $only_filterable && ! $is_filterable ) {
				continue;
			}

			$field_data = [
				'uuid'        => $uuid,
				'name'        => $field['name'] ?? '',
				'label'       => $field['label'] ?? '',
				'element'     => $element,
				'placeholder' => $field['placeholder'] ?? '',
				'required'    => $is_required,
				'filterable'  => $is_filterable,
				'single_view' => $field['single_view'] ?? true,
				'archive_view' => $field['archive_view'] ?? false,
			];

			// Include options for select/radio/checkbox
			if ( $include_options && in_array( $element, [ 'select', 'radio', 'checkbox' ], true ) ) {
				$options = $field['options'] ?? [];
				$field_data['options'] = array_map( function ( $opt ) {
					return [
						'value' => $opt['value'] ?? '',
						'label' => $opt['label'] ?? $opt['value'] ?? '',
					];
				}, $options );
				$field_data['option_count'] = count( $options );
			}

			// Validation info
			if ( ! empty( $field['validation'] ) ) {
				$validation = [];
				foreach ( $field['validation'] as $rule => $config ) {
					if ( isset( $config['value'] ) ) {
						$validation[ $rule ] = $config['value'];
					}
				}
				if ( ! empty( $validation ) ) {
					$field_data['validation'] = $validation;
				}
			}

			// Group by preset/custom
			if ( $is_preset ) {
				$preset_fields[] = $field_data;
			} else {
				$custom_fields[] = $field_data;
			}

			if ( $is_required ) {
				$required_fields[] = [
					'name'    => $field_data['name'],
					'label'   => $field_data['label'],
					'element' => $element,
				];
			}

			if ( $is_filterable ) {
				$filterable_fields[] = [
					'name'    => $field_data['name'],
					'label'   => $field_data['label'],
					'element' => $element,
				];
			}

			// Group by type
			if ( ! isset( $fields_by_type[ $element ] ) ) {
				$fields_by_type[ $element ] = [];
			}
			$fields_by_type[ $element ][] = $field_data;
		}

		$field_count = [
			'total'      => count( $preset_fields ) + count( $custom_fields ),
			'preset'     => count( $preset_fields ),
			'custom'     => count( $custom_fields ),
			'required'   => count( $required_fields ),
			'filterable' => count( $filterable_fields ),
		];

		$summary = sprintf(
			/* translators: %1$s: form title, %2$d: preset, %3$d: custom, %4$d: required */
			__( 'Form "%1$s" has %2$d preset field(s) and %3$d custom field(s). %4$d field(s) are required.', 'classified-listing' ),
			$form->title,
			$field_count['preset'],
			$field_count['custom'],
			$field_count['required']
		);

		return [
			'form' => [
				'form_id'    => $form->id,
				'title'      => $form->title,
				'slug'       => $form->slug,
				'is_default' => (bool) $form->default,
			],
			'preset_fields'     => $preset_fields,
			'custom_fields'     => $custom_fields,
			'required_fields'   => $required_fields,
			'filterable_fields' => $filterable_fields,
			'fields_by_type'    => $fields_by_type,
			'field_count'       => $field_count,
			'summary'           => $summary,
		];
	}

	/**
	 * Search for fields across all forms.
	 *
	 * @param array $args Arguments.
	 *
	 * @return array Results.
	 */
	public function searchFormFields( array $args ): array {
		if ( ! $this->isFormBuilderAvailable() ) {
			return [
				'search_term'        => '',
				'field_type'         => '',
				'total_matches'      => 0,
				'matches'            => [],
				'forms_with_matches' => [],
				'summary'            => __( 'Form Builder is not available.', 'classified-listing' ),
			];
		}

		$search = strtolower( trim( $args['search'] ?? '' ) );
		$field_type = $args['field_type'] ?? '';
		$preset_only = $args['preset_only'] ?? false;
		$custom_only = $args['custom_only'] ?? false;

		if ( empty( $search ) && empty( $field_type ) ) {
			return [
				'search_term'        => '',
				'field_type'         => '',
				'total_matches'      => 0,
				'matches'            => [],
				'forms_with_matches' => [],
				'summary'            => __( 'Please provide a search term or field type.', 'classified-listing' ),
			];
		}

		$all_forms = Form::query()->where( 'status', 'publish' )->get();

		$matches = [];
		$forms_with_matches = [];

		foreach ( $all_forms as $form ) {
			$fields = $form->fields ?? [];
			$form_matches = [];

			foreach ( $fields as $uuid => $field ) {
				$element = $field['element'] ?? 'text';
				$name = strtolower( $field['name'] ?? '' );
				$label = strtolower( $field['label'] ?? '' );
				$is_preset = ! empty( $field['preset'] );

				// Filter by preset/custom
				if ( $preset_only && ! $is_preset ) {
					continue;
				}
				if ( $custom_only && $is_preset ) {
					continue;
				}

				// Filter by field type
				if ( $field_type && $element !== $field_type ) {
					continue;
				}

				// Search in name and label
				$match = false;
				if ( $search ) {
					if ( strpos( $name, $search ) !== false || strpos( $label, $search ) !== false ) {
						$match = true;
					}
				} else {
					// No search term, just field type filter
					$match = true;
				}

				if ( $match ) {
					$match_data = [
						'form_id'    => $form->id,
						'form_title' => $form->title,
						'form_slug'  => $form->slug,
						'field_uuid' => $uuid,
						'field_name' => $field['name'] ?? '',
						'field_label' => $field['label'] ?? '',
						'element'    => $element,
						'is_preset'  => $is_preset,
						'required'   => ! empty( $field['validation']['required']['value'] ),
						'filterable' => ! empty( $field['filterable'] ),
					];

					$matches[] = $match_data;
					$form_matches[] = $match_data;
				}
			}

			if ( ! empty( $form_matches ) ) {
				$forms_with_matches[] = [
					'form_id'     => $form->id,
					'form_title'  => $form->title,
					'form_slug'   => $form->slug,
					'match_count' => count( $form_matches ),
				];
			}
		}

		// Build summary
		$summary_parts = [];
		if ( $search ) {
			$summary_parts[] = sprintf(
				/* translators: %s: search term */
				__( 'Searched for "%s"', 'classified-listing' ),
				$search
			);
		}
		if ( $field_type ) {
			$summary_parts[] = sprintf(
				/* translators: %s: field type */
				__( 'field type "%s"', 'classified-listing' ),
				$field_type
			);
		}

		$summary = implode( ', ', $summary_parts ) . '. ';
		$summary .= sprintf(
			/* translators: %1$d: match count, %2$d: form count */
			__( 'Found %1$d match(es) across %2$d form(s).', 'classified-listing' ),
			count( $matches ),
			count( $forms_with_matches )
		);

		return [
			'search_term'        => $search,
			'field_type'         => $field_type,
			'total_matches'      => count( $matches ),
			'matches'            => $matches,
			'forms_with_matches' => $forms_with_matches,
			'summary'            => $summary,
		];
	}

	/**
	 * Resolve category from various input types.
	 *
	 * @param mixed $input Category ID, slug, or name.
	 *
	 * @return \WP_Term|null Term or null.
	 */
	private function resolveCategory( $input ) {
		if ( empty( $input ) ) {
			return null;
		}

		$taxonomy = 'rtcl_category';

		// By ID
		if ( is_numeric( $input ) ) {
			$term = get_term( absint( $input ), $taxonomy );
			return ( $term && ! is_wp_error( $term ) ) ? $term : null;
		}

		// By slug
		$term = get_term_by( 'slug', sanitize_key( $input ), $taxonomy );
		if ( $term ) {
			return $term;
		}

		// By name
		$term = get_term_by( 'name', sanitize_text_field( $input ), $taxonomy );
		return $term ?: null;
	}

	/**
	 * Create cascading/dependent fields for directory-style forms.
	 *
	 * This method creates parent-child field relationships where child options
	 * are filtered based on the selected parent value (e.g., Make → Model).
	 *
	 * @param array $cascading_config Cascading field configuration.
	 *
	 * @return array Array with 'fields' and optional 'warnings' keys.
	 */
	public function buildCascadingFields( array $cascading_config ): array {
		$fields = [];
		$warnings = [];
		$uuid_map = [];           // Map field names to UUIDs for dependency linking
		$parent_options_map = []; // Map field names to their option values for validation

		foreach ( $cascading_config as $field_config ) {
			$name = sanitize_key( $field_config['name'] ?? '' );
			if ( empty( $name ) ) {
				continue;
			}

			$uuid = $this->generateUuid();
			$uuid_map[ $name ] = $uuid;

			// Store this field's option values for child field validation
			$option_values = [];
			if ( ! empty( $field_config['options'] ) ) {
				foreach ( $field_config['options'] as $opt ) {
					if ( is_array( $opt ) && isset( $opt['value'] ) ) {
						$option_values[] = sanitize_text_field( $opt['value'] );
					}
				}
			}
			$parent_options_map[ $name ] = $option_values;

			$type = sanitize_key( $field_config['type'] ?? 'select' );
			$depends_on_field_raw = $field_config['depends_on_field'] ?? null;

			// Sanitize depends_on_field to match uuid_map keys (which use sanitize_key)
			$depends_on_field = null;
			if ( $depends_on_field_raw ) {
				$depends_on_field = sanitize_key( $depends_on_field_raw );
			}

			// Resolve parent field UUID if this field depends on another
			$option_depends_on = null;
			if ( $depends_on_field && isset( $uuid_map[ $depends_on_field ] ) ) {
				$option_depends_on = $uuid_map[ $depends_on_field ];
			}

			// Validate depends_on values in options against parent field's options
			$options = $field_config['options'] ?? [];
			if ( $depends_on_field && isset( $parent_options_map[ $depends_on_field ] ) ) {
				$valid_parent_values = $parent_options_map[ $depends_on_field ];
				foreach ( $options as &$opt ) {
					if ( is_array( $opt ) && isset( $opt['depends_on'] ) && is_array( $opt['depends_on'] ) ) {
						$original_deps = $opt['depends_on'];
						// Filter out invalid depends_on values
						$opt['depends_on'] = array_filter( $opt['depends_on'], function( $val ) use ( $valid_parent_values ) {
							return in_array( sanitize_text_field( $val ), $valid_parent_values, true );
						} );
						// Re-index array
						$opt['depends_on'] = array_values( $opt['depends_on'] );

						// Track invalid values for warning
						$invalid_deps = array_diff( $original_deps, $opt['depends_on'] );
						if ( ! empty( $invalid_deps ) ) {
							$warnings[] = sprintf(
								'Option "%s" in field "%s" has invalid depends_on values: [%s]. Valid values from parent "%s" are: [%s]',
								$opt['label'] ?? $opt['value'] ?? 'unknown',
								$name,
								implode( ', ', $invalid_deps ),
								$depends_on_field,
								implode( ', ', $valid_parent_values )
							);
						}
					}
				}
				unset( $opt );
			}

			// Build field configuration
			$config = [
				'type'              => $type,
				'name'              => $name,
				'label'             => sanitize_text_field( $field_config['label'] ?? $name ),
				'placeholder'       => sanitize_text_field( $field_config['placeholder'] ?? '' ),
				'options'           => $options,
				'option_depends_on' => $option_depends_on,
				'filterable'        => $field_config['filterable'] ?? true,
				'single_view'       => $field_config['single_view'] ?? true,
				'validation'        => $field_config['validation'] ?? [],
			];

			$field = $this->buildCustomField( $config );
			if ( $field ) {
				$field['uuid'] = $uuid;
				$fields[ $uuid ] = $field;
			}
		}

		// Return fields and warnings
		return [
			'fields'   => $fields,
			'warnings' => $warnings,
		];
	}

	/**
	 * Create a complete directory form with cascading fields.
	 *
	 * @param array $config Form configuration including cascading_fields.
	 *
	 * @return array|\WP_Error Created form data or error.
	 */
	public function createDirectoryForm( array $config ) {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error(
				'permission_denied',
				__( 'Administrator access required to create forms.', 'classified-listing' )
			);
		}

		$title = sanitize_text_field( $config['title'] ?? '' );
		if ( empty( $title ) ) {
			return new \WP_Error( 'missing_title', __( 'Form title is required.', 'classified-listing' ) );
		}

		// Clean up any previously failed empty forms with similar title
		$cleaned_up = $this->cleanupEmptyForms( $title );

		// Build cascading fields first to get UUIDs
		$cascading_fields = [];
		$dependency_warnings = [];
		if ( ! empty( $config['cascading_fields'] ) ) {
			$cascading_result = $this->buildCascadingFields( $config['cascading_fields'] );
			$cascading_fields = $cascading_result['fields'] ?? [];
			$dependency_warnings = $cascading_result['warnings'] ?? [];
		}

		// Build preset fields
		$preset_fields = [];
		$preset_config = $config['preset_fields'] ?? [ 'title', 'pricing', 'category', 'location', 'images', 'description' ];
		foreach ( $preset_config as $preset ) {
			$element = is_array( $preset ) ? $preset['element'] : $preset;
			$field = $this->buildPresetField( is_array( $preset ) ? $preset : [ 'element' => $element ] );
			if ( $field ) {
				$preset_fields[ $field['uuid'] ] = $field;
			}
		}

		// Build additional custom fields
		$custom_fields = [];
		if ( ! empty( $config['custom_fields'] ) ) {
			foreach ( $config['custom_fields'] as $field_config ) {
				$field = $this->buildCustomField( $field_config );
				if ( $field ) {
					$custom_fields[ $field['uuid'] ] = $field;
				}
			}
		}

		// Merge all fields
		$all_fields = array_merge( $preset_fields, $cascading_fields, $custom_fields );

		// Build sections
		$sections_config = $config['sections'] ?? [];
		if ( empty( $sections_config ) ) {
			// Create default sections for directory form
			$sections_config = [
				[
					'title'  => __( 'Basic Information', 'classified-listing' ),
					'fields' => array_keys( $preset_fields ),
				],
			];

			if ( ! empty( $cascading_fields ) ) {
				$sections_config[] = [
					'title'  => __( 'Specifications', 'classified-listing' ),
					'fields' => array_keys( $cascading_fields ),
				];
			}

			if ( ! empty( $custom_fields ) ) {
				$sections_config[] = [
					'title'  => __( 'Additional Details', 'classified-listing' ),
					'fields' => array_keys( $custom_fields ),
				];
			}
		}

		$sections = $this->buildSections( $sections_config, array_keys( $all_fields ), $all_fields );

		// Validate that we have actual content before creating
		if ( empty( $all_fields ) ) {
			return new \WP_Error(
				'empty_form',
				__( 'Cannot create form without any fields. Please provide preset_fields, cascading_fields, or custom_fields.', 'classified-listing' )
			);
		}

		// Validate that sections have fields
		$has_fields_in_sections = false;
		foreach ( $sections as $section ) {
			$containers = $section['containers'] ?? [];
			foreach ( $containers as $container ) {
				if ( ! empty( $container['fields'] ) ) {
					$has_fields_in_sections = true;
					break 2;
				}
			}
		}

		if ( ! $has_fields_in_sections ) {
			return new \WP_Error(
				'empty_sections',
				__( 'Cannot create form with empty sections. Fields must be assigned to sections.', 'classified-listing' )
			);
		}

		// Create the form
		$form_data = [
			'title'    => $title,
			'slug'     => sanitize_title( $config['slug'] ?? $title ),
			'status'   => $config['status'] ?? 'publish',
			'fields'   => $all_fields,
			'sections' => $sections,
			'settings' => $config['settings'] ?? [],
		];

		$result = $this->createForm( $form_data );

		// Add warnings and cleanup info to result if form was created successfully
		if ( ! is_wp_error( $result ) ) {
			if ( $cleaned_up > 0 ) {
				$result['cleaned_up_empty_forms'] = $cleaned_up;
			}

			if ( ! empty( $dependency_warnings ) ) {
				$result['dependency_warnings'] = $dependency_warnings;
				$result['warning_message'] = sprintf(
					__( 'Form created with %d dependency warning(s). Some child options have invalid depends_on values that reference non-existent parent options. These invalid values were removed.', 'classified-listing' ),
					count( $dependency_warnings )
				);
			}
		}

		return $result;
	}

	/**
	 * Generate cascading options structure from hierarchical data.
	 *
	 * This helper converts hierarchical data (like Make→Model relationships)
	 * into the proper depends_on structure.
	 *
	 * @param array $hierarchy Hierarchical data array.
	 *                         Format: [ 'Toyota' => ['Corolla', 'Camry'], 'Honda' => ['Civic', 'Accord'] ]
	 *
	 * @return array Options array with depends_on structure.
	 */
	public function generateCascadingOptions( array $hierarchy ): array {
		$options = [];

		foreach ( $hierarchy as $parent_value => $children ) {
			$parent_key = sanitize_key( $parent_value );

			if ( is_array( $children ) ) {
				foreach ( $children as $child ) {
					if ( is_array( $child ) ) {
						// Child has custom label/value
						$options[] = [
							'label'      => sanitize_text_field( $child['label'] ?? $child['value'] ?? '' ),
							'value'      => sanitize_key( $child['value'] ?? $child['label'] ?? '' ),
							'depends_on' => [ $parent_key ],
						];
					} else {
						// Simple string child
						$options[] = [
							'label'      => sanitize_text_field( $child ),
							'value'      => sanitize_key( $child ),
							'depends_on' => [ $parent_key ],
						];
					}
				}
			}
		}

		return $options;
	}
}
