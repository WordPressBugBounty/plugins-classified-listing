<?php
/**
 *
 * @package ClassifiedListing/Templates
 * @version 5.2.0
 * @var Form $form
 * @var string $fieldUuid
 * @var FBField $field
 */

use Rtcl\Helpers\Functions;
use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\FBField;

defined( 'ABSPATH' ) || exit;
if ( !is_a( $field, FBField::class ) || in_array( $field->getElement(), [ 'custom_html', 'input_hidden', 'terms_and_condition', 'view_count' ] ) ) {
	return;
}
$elementFile = str_replace( [ '_' ], [ '-' ], strtolower( $field->getElement() ) );

$container_classes = [
	'rtcl-sl-element-wrap',
	'rtcl-sl-element-' . esc_attr( $fieldUuid ),
];

if ( ! empty( $field->getField()['css_class'] ) ) {
	$container_classes[] = esc_attr( $field->getField()['css_class'] );
}

$element_attr_id = ! empty( $field->getField()['id'] )
	? ' id="' . esc_attr( $field->getField()['id'] ) . '"'
	: '';

$data_element = esc_attr( $field->getElement() );

// Render the element into a buffer first so we can skip empty fields entirely.
ob_start();
Functions::get_template(
	'single-layout/elements/' . $elementFile,
	[
		'form'      => $form,
		'field'     => $field,
		'fieldUuid' => $fieldUuid,
	]
);
$element_html = ob_get_clean();

// Element templates emit an empty `.has-no-value` marker (or nothing) when the
// field has no value. Strip that marker and, if nothing meaningful remains, do
// not render the wrapper — so empty custom fields never show on the front-end.
$element_content = trim( preg_replace( '#<div\s+class=(["\'])has-no-value\1\s*>\s*</div>#i', '', $element_html ) );
if ( $element_content === '' ) {
	return;
}
?>

<div
	class="<?php echo implode( ' ', $container_classes ); ?>"
	data-element="<?php echo $data_element; ?>"<?php echo $element_attr_id; ?>>
	<?php echo $element_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>