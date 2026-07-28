<?php
/**
 * Single Listing Layout element: Listing Header.
 *
 * Built-in preset that reproduces the single-listing details header, using the base plugin's own
 * renderers so it works with any active theme. Layout (matches the details page):
 *   Row 1: category badge + status badges (left)      |  price (right)
 *   Row 2: title (left)                               |  action buttons (right)
 *   Row 3: meta (date, author, location, views)
 *   Row 4: gallery
 *
 * All styling is scoped under the parent class .rtcl-sl-header (see _single_layout.scss) and uses
 * var(--rtcl-primary-color) for the accent colour so it adapts to the site's palette.
 *
 * @package ClassifiedListing/Templates
 * @version 5.5.0
 * @var Form   $form
 * @var FBField $field
 * @var string  $fieldUuid
 */

use Rtcl\Models\Listing;

defined( 'ABSPATH' ) || exit;

global $listing;

if ( ! is_a( $listing, Listing::class ) ) {
	return;
}

// First category → rendered as a solid primary-colour chip (its counterpart in the meta row is
// hidden via CSS so the category is not shown twice).
$rtcl_header_cat      = null;
$rtcl_header_cat_link = '';
if ( $listing->has_category() && $listing->can_show_category() ) {
	$rtcl_header_cats = $listing->get_categories();
	if ( ! empty( $rtcl_header_cats ) && is_array( $rtcl_header_cats ) ) {
		$rtcl_header_cat = reset( $rtcl_header_cats );
		$rtcl_header_link = $rtcl_header_cat ? get_term_link( $rtcl_header_cat ) : '';
		$rtcl_header_cat_link = ! is_wp_error( $rtcl_header_link ) ? $rtcl_header_link : '';
	}
}
?>
<div class="rtcl-sl-header">
	<div class="rtcl-sl-header__top">
		<div class="rtcl-sl-header__badges">
			<?php
			if ( $rtcl_header_cat ) {
				printf(
					'<a class="rtcl-sl-header__cat" href="%1$s"><i class="rtcl-icon rtcl-icon-tags"></i>%2$s</a>',
					esc_url( $rtcl_header_cat_link ),
					esc_html( $rtcl_header_cat->name )
				);
			}
			$listing->the_badges();
			?>
		</div>

		<?php if ( $listing->can_show_price() ) : ?>
			<div class="rtcl-sl-header__price rtcl-price-wrap">
				<?php echo $listing->get_price_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="rtcl-sl-header__bar">
		<div class="rtcl-sl-header__title rtcl-listing-title">
			<h1 class="entry-title"><?php $listing->the_title(); ?></h1>
		</div>
	</div>

	<div class="rtcl-sl-header__meta rtcl-listing-meta">
		<?php $listing->the_meta(); ?>
	</div>

	<div class="rtcl-sl-header__gallery">
		<?php $listing->the_gallery(); ?>
	</div>
</div>
