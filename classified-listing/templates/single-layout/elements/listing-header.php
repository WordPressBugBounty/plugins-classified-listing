<?php
/**
 * Single Listing Layout element: Listing Header.
 *
 * Built-in preset that reproduces the single-listing details header, using the base plugin's own
 * renderers so it works with any active theme. Layouts (Customization → Layout):
 *   default     : [badges / title / meta | price / action buttons], then gallery
 *   gallery_top : gallery first, then the same details block
 *   split       : gallery on the left, details (badges, title, price, meta) on the right
 *
 * Element settings (all optional, stored on the single-layout field; unset = original behaviour):
 *   layout, title_tag (h1|h2), image_fit (cover|contain),
 *   gallery_height / gallery_height_md / gallery_height_sm (px, empty = auto), thumb_height (px),
 *   hide_category, hide_badges, hide_price, hide_meta, hide_gallery, hide_thumbs, show_actions.
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
use Rtcl\Services\FormBuilder\FBField;

defined( 'ABSPATH' ) || exit;

global $listing;

if ( ! is_a( $listing, Listing::class ) ) {
	return;
}

$rtcl_hd = is_a( $field, FBField::class ) && is_array( $field->getField() ) ? $field->getField() : [];

$rtcl_hd_layout = ! empty( $rtcl_hd['layout'] ) && in_array( $rtcl_hd['layout'], [ 'default', 'gallery_top', 'split' ], true )
	? $rtcl_hd['layout']
	: 'default';
$rtcl_hd_title_tag = ! empty( $rtcl_hd['title_tag'] ) && 'h2' === $rtcl_hd['title_tag'] ? 'h2' : 'h1';
$rtcl_hd_fit       = ! empty( $rtcl_hd['image_fit'] ) && 'contain' === $rtcl_hd['image_fit'] ? 'contain' : 'cover';

$rtcl_hd_show = [
	'category' => empty( $rtcl_hd['hide_category'] ),
	'badges'   => empty( $rtcl_hd['hide_badges'] ),
	'price'    => empty( $rtcl_hd['hide_price'] ) && $listing->can_show_price(),
	'meta'     => empty( $rtcl_hd['hide_meta'] ),
	'gallery'  => empty( $rtcl_hd['hide_gallery'] ),
	'actions'  => ! empty( $rtcl_hd['show_actions'] ),
];

// Gallery sizing → CSS custom properties consumed by .rtcl-sl-header--fixed-h (see SCSS).
$rtcl_hd_style = [];
foreach ( [ '' => 'lg', '_md' => 'md', '_sm' => 'sm' ] as $rtcl_hd_sfx => $rtcl_hd_bp ) {
	if ( ! empty( $rtcl_hd[ 'gallery_height' . $rtcl_hd_sfx ] ) && absint( $rtcl_hd[ 'gallery_height' . $rtcl_hd_sfx ] ) > 0 ) {
		$rtcl_hd_style[] = sprintf( '--rtcl-slh-h-%s:%dpx', $rtcl_hd_bp, absint( $rtcl_hd[ 'gallery_height' . $rtcl_hd_sfx ] ) );
	}
}
$rtcl_hd_fixed_h = ! empty( $rtcl_hd_style );
if ( ! empty( $rtcl_hd['thumb_height'] ) && absint( $rtcl_hd['thumb_height'] ) > 0 ) {
	$rtcl_hd_style[] = sprintf( '--rtcl-slh-thumb-h:%dpx', absint( $rtcl_hd['thumb_height'] ) );
}
$rtcl_hd_style[] = '--rtcl-slh-fit:' . $rtcl_hd_fit;

$rtcl_hd_classes = [
	'rtcl-sl-header',
	'rtcl-sl-header--' . $rtcl_hd_layout,
	'rtcl-sl-header--fit-' . $rtcl_hd_fit,
];
if ( $rtcl_hd_fixed_h ) {
	$rtcl_hd_classes[] = 'rtcl-sl-header--fixed-h';
}
if ( ! empty( $rtcl_hd['thumb_height'] ) && absint( $rtcl_hd['thumb_height'] ) > 0 ) {
	$rtcl_hd_classes[] = 'rtcl-sl-header--thumb-h';
}

// First category → rendered as a solid primary-colour chip (its counterpart in the meta row is
// hidden via CSS so the category is not shown twice).
$rtcl_header_cat      = null;
$rtcl_header_cat_link = '';
if ( $rtcl_hd_show['category'] && $listing->has_category() && $listing->can_show_category() ) {
	$rtcl_header_cats = $listing->get_categories();
	if ( ! empty( $rtcl_header_cats ) && is_array( $rtcl_header_cats ) ) {
		$rtcl_header_cat      = reset( $rtcl_header_cats );
		$rtcl_header_link     = $rtcl_header_cat ? get_term_link( $rtcl_header_cat ) : '';
		$rtcl_header_cat_link = ! is_wp_error( $rtcl_header_link ) ? $rtcl_header_link : '';
	}
}

if ( $rtcl_header_cat ) {
	$rtcl_hd_classes[] = 'rtcl-sl-header--has-cat';
}
if ( ! empty( $rtcl_hd['hide_thumbs'] ) ) {
	$rtcl_hd_classes[] = 'rtcl-sl-header--no-thumbs';
}

// Each header part is buffered once, then placed according to the chosen layout.
ob_start();
if ( $rtcl_header_cat || $rtcl_hd_show['badges'] ) {
	?>
	<div class="rtcl-sl-header__badges">
		<?php
		if ( $rtcl_header_cat ) {
			printf(
				'<a class="rtcl-sl-header__cat" href="%1$s"><i class="rtcl-icon rtcl-icon-tags"></i>%2$s</a>',
				esc_url( $rtcl_header_cat_link ),
				esc_html( $rtcl_header_cat->name )
			);
		}
		if ( $rtcl_hd_show['badges'] ) {
			$listing->the_badges();
		}
		?>
	</div>
	<?php
}
$rtcl_hd_badges_html = trim( ob_get_clean() );

ob_start();
if ( $rtcl_hd_show['price'] ) {
	?>
	<div class="rtcl-sl-header__price rtcl-price-wrap">
		<?php echo $listing->get_price_html(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
	<?php
}
$rtcl_hd_price_html = trim( ob_get_clean() );

ob_start();
?>
<div class="rtcl-sl-header__title rtcl-listing-title">
	<<?php echo esc_attr( $rtcl_hd_title_tag ); ?> class="entry-title"><?php $listing->the_title(); ?></<?php echo esc_attr( $rtcl_hd_title_tag ); ?>>
</div>
<?php
$rtcl_hd_title_html = trim( ob_get_clean() );

ob_start();
if ( $rtcl_hd_show['actions'] ) {
	// Social links are folded into a single Share button (dropdown) below, so they are kept out
	// of the shared actions template here — only for this render.
	$rtcl_hd_social    = $listing->the_social_share( false );
	$rtcl_hd_no_social = static function ( $args ) {
		$args['social'] = false;

		return $args;
	};
	add_filter( 'rtcl_listing_the_actions', $rtcl_hd_no_social, 999 );
	$listing->the_actions();
	remove_filter( 'rtcl_listing_the_actions', $rtcl_hd_no_social, 999 );

	if ( ! empty( $rtcl_hd_social ) ) {
		?>
		<div class="rtcl-sl-header__share">
			<button type="button" class="rtcl-sl-header__share-toggle" aria-expanded="false"
					aria-label="<?php esc_attr_e( 'Share', 'classified-listing' ); ?>"
					title="<?php esc_attr_e( 'Share', 'classified-listing' ); ?>">
				<i class="rtcl-icon rtcl-icon-share" aria-hidden="true"></i>
			</button>
			<div class="rtcl-sl-header__share-menu">
				<?php echo wp_kses_post( $rtcl_hd_social ); ?>
			</div>
		</div>
		<?php
	}
}
$rtcl_hd_actions_html = trim( ob_get_clean() );
if ( $rtcl_hd_actions_html !== '' ) {
	$rtcl_hd_actions_html = '<div class="rtcl-sl-header__actions">' . $rtcl_hd_actions_html . '</div>';
}

ob_start();
if ( $rtcl_hd_show['meta'] ) {
	?>
	<div class="rtcl-sl-header__meta rtcl-listing-meta">
		<?php $listing->the_meta(); ?>
	</div>
	<?php
}
$rtcl_hd_meta_html = trim( ob_get_clean() );

ob_start();
if ( $rtcl_hd_show['gallery'] ) {
	$listing->the_gallery();
}
$rtcl_hd_gallery_html = trim( ob_get_clean() );
if ( $rtcl_hd_gallery_html !== '' ) {
	$rtcl_hd_gallery_html = '<div class="rtcl-sl-header__gallery">' . $rtcl_hd_gallery_html . '</div>';
}

// Details block shared by Classic and Gallery First: badges / title / meta on the left,
// price with the action buttons on the right (stacks under the meta on small screens).
$rtcl_hd_aside_html = $rtcl_hd_price_html . $rtcl_hd_actions_html;
$rtcl_hd_head_html  = '<div class="rtcl-sl-header__head"><div class="rtcl-sl-header__main">'
	. $rtcl_hd_badges_html . $rtcl_hd_title_html . $rtcl_hd_meta_html . '</div>'
	. ( $rtcl_hd_aside_html !== '' ? '<div class="rtcl-sl-header__aside">' . $rtcl_hd_aside_html . '</div>' : '' )
	. '</div>';
?>
<div class="<?php echo esc_attr( implode( ' ', $rtcl_hd_classes ) ); ?>" style="<?php echo esc_attr( implode( ';', $rtcl_hd_style ) ); ?>">
	<?php
	// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
	if ( 'split' === $rtcl_hd_layout ) {
		if ( $rtcl_hd_gallery_html !== '' ) {
			echo '<div class="rtcl-sl-header__media">' . $rtcl_hd_gallery_html . '</div>';
		}
		echo '<div class="rtcl-sl-header__info">';
		echo $rtcl_hd_badges_html . $rtcl_hd_title_html . $rtcl_hd_price_html . $rtcl_hd_meta_html . $rtcl_hd_actions_html;
		echo '</div>';
	} elseif ( 'gallery_top' === $rtcl_hd_layout ) {
		echo $rtcl_hd_gallery_html . $rtcl_hd_head_html;
	} else {
		echo $rtcl_hd_head_html . $rtcl_hd_gallery_html;
	}
	// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
	?>
</div>
