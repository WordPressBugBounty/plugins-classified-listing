<?php
/* phpcs:disable WordPress.Security.NonceVerification.Recommended */

namespace Rtcl\Controllers\Ajax;


use Rtcl\Helpers\Functions;
use Rtcl\Models\RtclCFGField;
use Rtcl\Resources\Options;

class AjaxCFG {
	public function __construct() {
		add_action( 'wp_ajax_rtcl_edit_field_choose', [ $this, 'edit_field_choose' ] );
		add_action( 'wp_ajax_rtcl_edit_field_insert', [ $this, 'edit_field_insert' ] );
		add_action( 'wp_ajax_rtcl_edit_field_delete', [ $this, 'edit_field_delete' ] );
	}

	function edit_field_delete() {
		$data = null;
		$error = true;
		if ( !Functions::verify_nonce() ) {
			$msg = esc_html__( "Session expired", "classified-listing" );
		} elseif ( !current_user_can( 'manage_rtcl_options' ) ) {
			$msg = esc_html__( "You do not have permission to delete custom fields.", "classified-listing" );
		} else {
			$post_id = !empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : 0;
			if ( $post_id && ( $post = get_post( $post_id ) ) && $post->post_type === rtcl()->post_type_cf ) {
				$p = wp_delete_post( $post_id, true );
				if ( $p ) {
					delete_metadata( 'post', 0, '_field_' . $post_id, '', true );
				}
				$error = false;
				$data = $p;
				$msg = __( "Success", "classified-listing" );
			} else {
				$data = $_REQUEST;
				$msg = esc_html__( "Field was not selected", "classified-listing" );
			}
		}
		wp_send_json( [
			'data'  => $data,
			'error' => $error,
			'msg'   => $msg
		] );
	}

	/**
	 * Short, human readable description for each built-in field type.
	 *
	 * Keyed by field type. Types registered through the `rtcl_custom_field_list`
	 * filter simply fall back to no description.
	 *
	 * @return array
	 */
	private function get_field_type_descriptions() {
		return apply_filters( 'rtcl_custom_field_type_descriptions', [
			'text'     => esc_html__( 'A single line of plain text.', 'classified-listing' ),
			'textarea' => esc_html__( 'Multiple lines of plain text.', 'classified-listing' ),
			'url'      => esc_html__( 'A web address with link options.', 'classified-listing' ),
			'number'   => esc_html__( 'A number with optional min and max.', 'classified-listing' ),
			'date'     => esc_html__( 'A date picker, single date or range.', 'classified-listing' ),
			'select'   => esc_html__( 'A dropdown list to pick one option.', 'classified-listing' ),
			'radio'    => esc_html__( 'Radio buttons to pick one option.', 'classified-listing' ),
			'checkbox' => esc_html__( 'Checkboxes to pick one or more options.', 'classified-listing' ),
		] );
	}

	function edit_field_choose() {
		if ( !Functions::verify_nonce() ) {
			echo '<p class="rtcl-cf-modal__message is-error">' . esc_html__( "Session expired", "classified-listing" ) . '</p>';
			die();
		}
		if ( !current_user_can( 'manage_rtcl_options' ) ) {
			echo '<p class="rtcl-cf-modal__message is-error">' . esc_html__( "You do not have permission to view custom fields.", "classified-listing" ) . '</p>';
			die();
		}
		$fields = Options::get_custom_field_list();
		$descriptions = $this->get_field_type_descriptions();

		$html = '<div class="rtcl-cf-field-grid">';
		foreach ( $fields as $type => $field ) {
			$name = isset( $field['name'] ) ? $field['name'] : $type;
			$symbol = isset( $field['symbol'] ) ? $field['symbol'] : 'pencil';
			$description = isset( $descriptions[ $type ] ) ? $descriptions[ $type ] : '';
			// Lower-cased haystack used by the client side search box.
			$keywords = strtolower( $type . ' ' . $name . ' ' . $description );

			$html .= sprintf(
				'<button type="button" class="rtcl-cf-field-card rtcl-field-item rtcl-field-button-insert" data-type="%1$s" data-keywords="%2$s">'
				. '<span class="rtcl-cf-field-card__icon"><i class="rtcl-icon rtcl-icon-%3$s" aria-hidden="true"></i></span>'
				. '<span class="rtcl-cf-field-card__text">'
				. '<span class="rtcl-cf-field-card__name">%4$s</span>'
				. '%5$s'
				. '</span>'
				. '</button>',
				esc_attr( $type ),
				esc_attr( $keywords ),
				esc_attr( $symbol ),
				esc_html( $name ),
				$description ? '<span class="rtcl-cf-field-card__desc">' . esc_html( $description ) . '</span>' : ''
			);
		}
		$html .= '</div>';
		$html .= '<p class="rtcl-cf-modal__message rtcl-cf-no-result is-hidden">'
		         . esc_html__( 'No field type matches your search.', 'classified-listing' )
		         . '</p>';

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $html;
		die();
	}

	function edit_field_insert() {
		$data = null;
		$error = true;
		$type = !empty( $_REQUEST['type'] ) && array_key_exists( $_REQUEST['type'], Options::get_custom_field_list() ) ? esc_attr( $_REQUEST['type'] ) : 'text';
		if ( !Functions::verify_nonce() ) {
			$msg = esc_html__( "Session expired", "classified-listing" );
		} elseif ( !current_user_can( 'manage_rtcl_options' ) ) {
			$msg = esc_html__( "You do not have permission to insert custom fields.", "classified-listing" );
		} else {
			$parent_id = !empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : 0;
			if ( $type && $parent_id ) {
				$field_id = wp_insert_post( [
						'post_status' => 'draft',
						'post_type'   => 'rtcl_cf',
						'post_parent' => $parent_id
					]
				);
				update_post_meta( $field_id, '_type', $type );
				$field = new RtclCFGField( $field_id );
				$data = $field->get_field_data();
				$error = false;
				$msg = esc_html__( "Success", "classified-listing" );
			} else {
				$data = $_REQUEST;
				$msg = esc_html__( "Select a field type", "classified-listing" );
			}
		}
		wp_send_json( [
			'data'  => $data,
			'error' => $error,
			'msg'   => $msg
		] );
		die();
	}
}