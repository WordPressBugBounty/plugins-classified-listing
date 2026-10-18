<?php
/**
 * Pricing table block — style 3.
 *
 * The markup itself lives in {@see \Rtcl\Helpers\PricingBox}, which the
 * Elementor widget in classified-listing-toolkits calls too, so the block and
 * the widget cannot render differently. This file stays a real template so a
 * theme can still override `classified-listing/block/pricing-table/view-3.php`
 * and render whatever it likes instead.
 *
 * @author  RadiusTheme
 * @since   1.0
 * @version 2.0
 *
 * @var array  $settings          Block attributes.
 * @var string $style             Style number.
 * @var string $content_alignment left|center|right.
 * @var string $currency_position `currency-left` or `currency-right`.
 * @var string $pricing_label     Badge text.
 * @var string $feature_html      Pre-escaped feature list.
 * @var string $btn               Pre-escaped button.
 * @var string $box_icon          Pre-escaped icon markup.
 */

use Rtcl\Helpers\BlockFns;
use Rtcl\Helpers\PricingBox;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$wrap_class = '';

if ( isset( $settings['blockId'] ) ) {
	$wrap_class .= 'rtcl-block-' . $settings['blockId'];
}

$wrap_class .= ' rtcl-block-frontend ';

if ( isset( $settings['className'] ) ) {
	$wrap_class .= $settings['className'];
}
?>
<div class="<?php echo esc_attr( $wrap_class ); ?>">
	<?php
	// PricingBox escapes the plain-text values; the three HTML fragments are
	// escaped here, with the block's SVG-aware rules.
	echo PricingBox::render(
		[
			'style'             => $style,
			'align'             => $content_alignment,
			'prefix'            => 'gb',
			'featured'          => ! empty( $settings['featured'] ),
			'hover_translate'   => ! empty( $settings['hover_translate'] ),
			'watermark_url'     => isset( $settings['watermark_image']['url'] ) ? $settings['watermark_image']['url'] : '',
			'badge'             => $pricing_label,
			'title'             => $settings['title'],
			'sub_title'         => isset( $settings['sub_title'] ) ? $settings['sub_title'] : '',
			'currency'          => $settings['currency'],
			'price'             => $settings['price'],
			'unit'              => $settings['unit'],
			'currency_position' => 'currency-right' === $currency_position ? 'right' : 'left',
			'show_per_sign'     => ! empty( $settings['show_per_sign'] ),
			'icon_html'         => wp_kses( $box_icon, BlockFns::kses_allowed_svg() ),
			'features_html'     => wp_kses( $feature_html, BlockFns::kses_allowed_svg() ),
			'button_html'       => wp_kses( $btn, BlockFns::kses_allowed_svg() ),
		]
	); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above and inside PricingBox.
	?>
</div>
