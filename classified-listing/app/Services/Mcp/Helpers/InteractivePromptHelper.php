<?php

namespace Rtcl\Services\Mcp\Helpers;

defined( 'ABSPATH' ) || exit;

/**
 * Helper for creating interactive prompts for MCP clients.
 *
 * When form selection or required fields are missing, this helper creates
 * structured responses that guide the AI client to collect information from users.
 */
class InteractivePromptHelper {

	/**
	 * Prompt type constants.
	 */
	const PROMPT_FORM_SELECTION     = 'form_selection';
	const PROMPT_REQUIRED_FIELDS    = 'required_fields';
	const PROMPT_FIELD_OPTIONS      = 'field_options';

	/**
	 * Create a form selection prompt.
	 *
	 * @param array $forms Available forms.
	 *
	 * @return array Structured prompt response.
	 */
	public static function createFormSelectionPrompt( array $forms ): array {
		$options = [];
		$default_form_id = null;

		foreach ( $forms as $form ) {
			$option = [
				'id'          => $form['id'],
				'title'       => $form['title'],
				'field_count' => $form['field_count'] ?? 0,
			];

			if ( ! empty( $form['is_default'] ) ) {
				$option['is_default'] = true;
				$default_form_id = $form['id'];
			}

			$options[] = $option;
		}

		return [
			'action_required'  => true,
			'prompt_type'      => self::PROMPT_FORM_SELECTION,
			'message'          => __( 'Multiple listing forms are available. Please select which form to use for this listing.', 'classified-listing' ),
			'instruction'      => __( 'Ask the user to choose one of the available forms, then call rtcl/create-listing again with the selected form_id.', 'classified-listing' ),
			'options'          => $options,
			'default_form_id'  => $default_form_id,
			'display_format'   => 'selection_list',
			'example_response' => [
				'user_prompt' => __( 'Which form would you like to use for your listing?', 'classified-listing' ),
				'options_display' => array_map( function( $opt ) {
					$label = $opt['title'];
					if ( ! empty( $opt['is_default'] ) ) {
						$label .= ' (Default)';
					}
					$label .= ' - ' . $opt['field_count'] . ' fields';
					return [
						'label' => $label,
						'value' => $opt['id'],
					];
				}, $options ),
			],
		];
	}

	/**
	 * Create a required fields prompt.
	 *
	 * @param array  $missing_fields Missing required fields.
	 * @param array  $provided_data  Data already provided.
	 * @param int    $form_id        Form ID being used.
	 * @param string $form_title     Form title.
	 *
	 * @return array Structured prompt response.
	 */
	public static function createRequiredFieldsPrompt( array $missing_fields, array $provided_data, int $form_id, string $form_title ): array {
		$fields_info = [];
		$questions = [];

		foreach ( $missing_fields as $field ) {
			$field_info = [
				'name'     => $field['name'],
				'label'    => $field['label'],
				'type'     => $field['type'] ?? 'text',
				'required' => true,
			];

			// Add options for select/radio/checkbox fields
			if ( ! empty( $field['options'] ) ) {
				$field_info['options'] = $field['options'];
			}

			// Add validation rules if present
			if ( ! empty( $field['validation'] ) ) {
				$field_info['validation'] = $field['validation'];
			}

			$fields_info[] = $field_info;

			// Generate a natural language question
			$questions[] = self::generateFieldQuestion( $field );
		}

		return [
			'action_required' => true,
			'prompt_type'     => self::PROMPT_REQUIRED_FIELDS,
			'message'         => sprintf(
				/* translators: 1: form title, 2: count of missing fields */
				__( 'The "%1$s" form requires %2$d more field(s) to create the listing.', 'classified-listing' ),
				$form_title,
				count( $missing_fields )
			),
			'instruction'     => __( 'Ask the user for the missing required fields listed below. Once collected, call rtcl/create-listing again with all the data including form_id.', 'classified-listing' ),
			'form_id'         => $form_id,
			'form_title'      => $form_title,
			'missing_fields'  => $fields_info,
			'provided_data'   => self::summarizeProvidedData( $provided_data ),
			'suggested_questions' => $questions,
			'display_format'  => 'field_collection',
		];
	}

	/**
	 * Create a field options prompt for select/radio fields.
	 *
	 * @param string $field_name  Field name.
	 * @param string $field_label Field label.
	 * @param array  $options     Available options.
	 *
	 * @return array Structured prompt response.
	 */
	public static function createFieldOptionsPrompt( string $field_name, string $field_label, array $options ): array {
		return [
			'action_required' => true,
			'prompt_type'     => self::PROMPT_FIELD_OPTIONS,
			'message'         => sprintf(
				/* translators: %s: field label */
				__( 'Please select a value for "%s".', 'classified-listing' ),
				$field_label
			),
			'field_name'      => $field_name,
			'field_label'     => $field_label,
			'options'         => $options,
			'display_format'  => 'selection_list',
		];
	}

	/**
	 * Generate a natural language question for a field.
	 *
	 * @param array $field Field info.
	 *
	 * @return string Question to ask user.
	 */
	private static function generateFieldQuestion( array $field ): string {
		$label = $field['label'] ?? $field['name'];
		$type = $field['type'] ?? 'text';

		switch ( $type ) {
			case 'select':
			case 'radio':
				if ( ! empty( $field['options'] ) ) {
					$options_str = implode( ', ', array_column( $field['options'], 'label' ) );
					return sprintf(
						/* translators: 1: field label, 2: options list */
						__( 'What %1$s would you like? Options: %2$s', 'classified-listing' ),
						strtolower( $label ),
						$options_str
					);
				}
				return sprintf( __( 'Please select the %s.', 'classified-listing' ), strtolower( $label ) );

			case 'checkbox':
				return sprintf( __( 'Which %s would you like to select? (You can choose multiple)', 'classified-listing' ), strtolower( $label ) );

			case 'number':
				return sprintf( __( 'What is the %s?', 'classified-listing' ), strtolower( $label ) );

			case 'date':
				return sprintf( __( 'What is the %s? (Format: YYYY-MM-DD)', 'classified-listing' ), strtolower( $label ) );

			case 'email':
				return sprintf( __( 'What is the %s?', 'classified-listing' ), strtolower( $label ) );

			case 'url':
				return sprintf( __( 'What is the %s URL?', 'classified-listing' ), strtolower( $label ) );

			case 'textarea':
				return sprintf( __( 'Please provide the %s.', 'classified-listing' ), strtolower( $label ) );

			case 'taxonomy':
				return sprintf( __( 'Which %s should this listing be in?', 'classified-listing' ), strtolower( $label ) );

			case 'price':
				return __( 'What is the price for this listing?', 'classified-listing' );

			default:
				return sprintf( __( 'What is the %s?', 'classified-listing' ), strtolower( $label ) );
		}
	}

	/**
	 * Summarize provided data for display.
	 *
	 * @param array $data Provided data.
	 *
	 * @return array Summarized data.
	 */
	private static function summarizeProvidedData( array $data ): array {
		$summary = [];

		// Core fields
		if ( ! empty( $data['title'] ) ) {
			$summary['title'] = $data['title'];
		}
		if ( ! empty( $data['description'] ) ) {
			$summary['description'] = mb_substr( strip_tags( $data['description'] ), 0, 100 ) . '...';
		}
		if ( isset( $data['price'] ) ) {
			$summary['price'] = $data['price'];
		}
		if ( ! empty( $data['category'] ) ) {
			$summary['category'] = $data['category'];
		}
		if ( ! empty( $data['location'] ) ) {
			$summary['location'] = $data['location'];
		}

		return $summary;
	}

	/**
	 * Check if a response is an interactive prompt.
	 *
	 * @param mixed $response Response to check.
	 *
	 * @return bool True if it's an interactive prompt.
	 */
	public static function isInteractivePrompt( $response ): bool {
		return is_array( $response ) && ! empty( $response['action_required'] );
	}
}
