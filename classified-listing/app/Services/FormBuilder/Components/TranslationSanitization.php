<?php

namespace Rtcl\Services\FormBuilder\Components;

use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\ElementCustomization;

class TranslationSanitization {

	/**
	 * @var array|mixed
	 */
	private $translations;
	/**
	 * @var Form
	 */
	private $form;

	public function __construct( $form, $translations ) {
		$this->form         = $form;
		$this->translations = ! empty( $translations ) ? $translations : [];
	}


	public function get(): ?array {
		$translations = [];
		if ( ! empty( $this->translations ) ) {
			foreach ( $this->translations as $lngCode => $rawTranslations ) {
				if ( ! empty( $rawTranslations ) ) {

					// Slug builder prefix/postfix translations (stored under a reserved top-level key).
					if ( !empty( $rawTranslations['slug_builder'] ) && is_array( $rawTranslations['slug_builder'] ) ) {
						foreach ( $rawTranslations['slug_builder'] as $uuid => $segTr ) {
							if ( !empty( $segTr['prefix'] ) ) {
								$translations[ $lngCode ]['slug_builder'][ $uuid ]['prefix'] = sanitize_text_field( $segTr['prefix'] );
							}
							if ( !empty( $segTr['postfix'] ) ) {
								$translations[ $lngCode ]['slug_builder'][ $uuid ]['postfix'] = sanitize_text_field( $segTr['postfix'] );
							}
						}
					}

					foreach ( $rawTranslations as $fieldUuid => $_translations ) {
						if ( $fieldUuid === 'slug_builder' ) {
							continue;
						}
						if ( is_array( $_translations ) ) {
							foreach ( $_translations as $fieldKey => $_translation ) {
								if ( empty( $_translation ) ) {
									continue;
								}
								if ( $fieldKey === 'fields' ) {
									// manage repeater fields
									if ( is_array( $_translation ) ) {
										foreach ( $_translation as $repeaterFieldUuid => $repeaterFieldTs ) {
											if ( empty( $repeaterFieldTs ) ) {
												continue;
											}
											foreach ( $repeaterFieldTs as $innerFieldKey => $_innerTranslation ) {
												$innerValue = $this->sanitize( $innerFieldKey, $_innerTranslation );
												if ( ! empty( $innerValue ) ) {
													$translations[ $lngCode ][ $fieldUuid ]['fields'][ $repeaterFieldUuid ][ $innerFieldKey ] = $innerValue;
												}
											}
										}
									}
								} else {
									$value = $this->sanitize( $fieldKey, $_translation );
									if ( ! empty( $value ) ) {
										$translations[ $lngCode ][ $fieldUuid ][ $fieldKey ] = $value;
									}
								}
							}
						}
					}
				}
			}
		}
		
		return ! empty( $translations ) ? $translations : null;
	}

	public function sanitize( $fieldKey, $_trValue ) {
		$value = '';
		if ( $fieldKey === 'options' || $fieldKey === 'advanced_options' ) {
			if ( is_array( $_trValue ) ) {
				$options = [];
				foreach ( $_trValue as $index => $option ) {
					if ( ! empty( $option['label'] ) ) {
						$options[ $index ]['label'] = sanitize_text_field( wp_unslash( $option['label'] ) );
					}
				}
				if ( ! empty( $options ) ) {
					$value = $options;
				}
			}
		} elseif ( $fieldKey === 'validation' ) {
			if ( is_array( $_trValue ) ) {
				$validation = [];
				foreach ( $_trValue as $ruleKey => $_validation ) {
					if ( ! empty( $_validation['message'] ) ) {
						$validation[ $ruleKey ]['message'] = sanitize_text_field( wp_unslash( $_validation['message'] ) );
					}
					if ( ! empty( $_validation['message_plural'] ) ) {
						$validation[ $ruleKey ]['message_plural'] = sanitize_text_field( wp_unslash( $_validation['message_plural'] ) );
					}
				}
				if ( ! empty( $validation ) ) {
					$value = $validation;
				}
			}
		} elseif ( 'tnc_html' === $fieldKey ) {
			$value = stripslashes( wp_kses( $_trValue, ElementCustomization::allowedHtml( $fieldKey ) ) );
		} elseif ( in_array( $fieldKey, [ 'tnc_html', 'html_codes' ] ) ) {
			$value = stripslashes( wp_kses_post( $_trValue ) );
		} elseif ( 'help_message' === $fieldKey ) {
			$value = sanitize_textarea_field( wp_unslash( $_trValue ) );
		} else {
			$value = sanitize_text_field( wp_unslash( $_trValue ) );
		}

		return $value;
	}
}