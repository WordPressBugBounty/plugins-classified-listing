<?php
/**
 *
 * @package ClassifiedListing/Templates
 * @version 6.1.0
 * @var Form $form
 * @var string $fieldUuid
 * @var FBField $field
 * @var Listing $listing
 */

use Rtcl\Models\Form\Form;
use Rtcl\Models\Listing;
use Rtcl\Services\FormBuilder\FBField;

defined( 'ABSPATH' ) || exit;
global $listing;
if ( !is_a( $field, FBField::class ) || !is_a( $listing, Listing::class ) ) {
	return;
}
$telegram = get_post_meta( $listing->get_id(), '_rtcl_telegram', true );

if ( empty( $telegram ) ) {
	return;
}

$telegram_url = 'https://t.me/' . ltrim( $telegram, '@' );
$icon         = $field->getIconData();
$labelPlacement = !empty( $field->getSlField()['label_placement'] ) ? $field->getSlField()['label_placement'] : '';
?>
<div class="rtcl-sl-element label-<?php echo esc_attr( $labelPlacement ); ?>">
	<?php if ( ( !empty( $icon['type'] ) && 'class' === $icon['type'] && !empty( $icon['class'] ) ) || !empty( $field->getLabel() ) ) { ?>
		<div class="rtcl-slf-label-wrap">
			<?php if ( !empty( $icon['type'] ) && 'class' === $icon['type'] && !empty( $icon['class'] ) ) { ?>
				<div class="rtcl-field-icon"><i class="<?php echo esc_attr( $icon['class'] ); ?>"></i></div>
			<?php } ?>
			<?php if ( !empty( $field->getLabel() ) ) { ?>
				<div class="rtcl-slf-label"><?php echo esc_html( $field->getLabel() ); ?></div>
			<?php } ?>
		</div>
	<?php } ?>
	<div class="rtcl-slf-value">
		<a href="<?php echo esc_url( $telegram_url ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $telegram ); ?></a>
	</div>
</div>
