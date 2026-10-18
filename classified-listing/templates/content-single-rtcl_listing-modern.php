<?php
/**
 * Modern listing details layout (default view).
 *
 * Used when Listing Details Style is Modern and the theme does not override
 * `content-single-rtcl_listing.php`. Every hook of the classic template still
 * fires, so add-ons keep rendering; only the arrangement differs:
 * header → [ main column | price & seller aside ] → related listings.
 *
 * This template can be overridden by copying it to yourtheme/classified-listing/content-single-rtcl_listing-modern.php.
 *
 * @package ClassifiedListing/Templates
 * @version 6.0.5.1
 */

use Rtcl\Controllers\Hooks\TemplateHooks;
use Rtcl\Helpers\Functions;

defined( 'ABSPATH' ) || exit;

global $listing;

if ( post_password_required() ) {
	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo get_the_password_form();

	return;
}

$sidebar_position = Functions::get_option_item( 'rtcl_single_listing_settings', 'detail_page_sidebar_position', 'right' );
$sidebar_position = in_array( $sidebar_position, [ 'left', 'right', 'bottom' ], true ) ? $sidebar_position : 'right';

// Title and meta move into the page header; the rest of the content hook (gallery,
// add-on output) renders in the main column. Only what is still hooked is moved,
// so a site that removed the title keeps it removed.
$show_title = remove_action( 'rtcl_single_listing_content', [ TemplateHooks::class, 'add_single_listing_title' ], 5 );
$show_meta  = remove_action( 'rtcl_single_listing_content', [ TemplateHooks::class, 'add_single_listing_meta' ], 10 );
// Favourite / share / report move from under the custom fields to the aside.
$show_actions = remove_action( 'rtcl_single_listing_inner_sidebar', [ TemplateHooks::class, 'add_single_listing_inner_sidebar_action' ], 20 );

/**
 * Buffer a hook so an empty one does not leave an empty card behind.
 *
 * @param string $hook Action name.
 * @param mixed  ...$args Action arguments.
 *
 * @return string
 */
$rtcl_capture = static function ( $hook, ...$args ) {
	ob_start();
	do_action( $hook, ...$args );

	return trim( ob_get_clean() );
};

$media_html    = $rtcl_capture( 'rtcl_single_listing_content' );
$details_html  = $rtcl_capture( 'rtcl_single_listing_inner_sidebar' );
$before_html   = $rtcl_capture( 'rtcl_single_listing_before_content' );
$map_html      = $rtcl_capture( 'rtcl_single_listing_content_end', $listing );
$hours_html    = $rtcl_capture( 'rtcl_single_listing_business_hours' );
$social_html   = $rtcl_capture( 'rtcl_single_listing_social_profiles' );
$review_html   = $rtcl_capture( 'rtcl_single_listing_review' );
$sidebar_html  = $rtcl_capture( 'rtcl_single_listing_sidebar' );
// Empty by default; sites can add their own buyer-safety note via the filter.
$safety_note   = apply_filters( 'rtcl_single_listing_safety_note', '', $listing );

// Restore the hooks for anything rendered after this template (widgets, shortcodes).
if ( $show_title ) {
	add_action( 'rtcl_single_listing_content', [ TemplateHooks::class, 'add_single_listing_title' ], 5 );
}
if ( $show_meta ) {
	add_action( 'rtcl_single_listing_content', [ TemplateHooks::class, 'add_single_listing_meta' ], 10 );
}
if ( $show_actions ) {
	add_action( 'rtcl_single_listing_inner_sidebar', [ TemplateHooks::class, 'add_single_listing_inner_sidebar_action' ], 20 );
}

/**
 * Hook: rtcl_before_single_listing.
 *
 * @hooked rtcl_print_notices - 10
 */
do_action( 'rtcl_before_single_listing' );
?>
<div id="rtcl-listing-<?php the_ID(); ?>" <?php Functions::listing_class( 'rtcl-single-modern rtcl-single-modern--default', $listing ); ?>>

	<?php if ( $show_title || $show_meta ) : ?>
		<header class="rtcl-sm-header">
			<?php if ( $show_meta ) : ?>
				<?php $listing->the_badges(); ?>
			<?php endif; ?>
			<?php if ( $show_title ) : ?>
				<div class="rtcl-listing-title">
					<h1 class="entry-title"><?php $listing->the_title(); ?></h1>
				</div>
			<?php endif; ?>
			<?php if ( $show_meta ) : ?>
				<div class="rtcl-listing-meta">
					<?php $listing->the_meta(); ?>
				</div>
			<?php endif; ?>
			<?php if ( $listing->can_show_price() && ( $header_price = $listing->get_price_html() ) ) : ?>
				<?php // Small screens only: the contact card (with its price) moves below the content. ?>
				<div class="rtcl-price-wrap rtcl-sm-header-price"><?php
					// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo $header_price; ?></div>
			<?php endif; ?>
		</header>
	<?php endif; ?>

	<div class="rtcl-sm-layout rtcl-sm-aside-<?php echo esc_attr( $sidebar_position ); ?>">

		<aside class="rtcl-sm-aside">
			<div class="rtcl-sm-card rtcl-sm-contact">
				<?php if ( $listing->can_show_price() && ( $price_html = $listing->get_price_html() ) ) : ?>
					<div class="rtcl-price-wrap"><?php
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
						echo $price_html; ?></div>
				<?php endif; ?>

				<?php
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo $sidebar_html;
				?>

				<?php if ( $show_actions ) : ?>
					<?php
					// Favourite | Share | Print row. The share services move into a panel the
					// Share button opens (the list's own social item is hidden by CSS), and the
					// Report link moves to the card footer (single-listing.js). The footer sits
					// inside this wrapper because the Report popup script looks the modal up here.
					$share_html = $listing->the_social_share( false );
					// Sites that never saved the setting keep the button.
					$show_print = (bool) Functions::get_option_item( 'rtcl_single_listing_settings', 'has_print_icon', true, 'checkbox' );
					$show_print = apply_filters( 'rtcl_single_listing_show_print', $show_print, $listing );
					$rtcl_extra_actions = static function () use ( $share_html, $show_print ) {
						if ( $share_html ) {
							printf(
								'<li class="rtcl-sm-action-share"><button type="button" class="rtcl-sm-share-toggle" aria-expanded="false" aria-controls="rtcl-sm-share-panel">%s</button></li>',
								esc_html__( 'Share', 'classified-listing' )
							);
						}
						if ( $show_print ) {
							printf( '<li class="rtcl-sm-action-print"><button type="button" class="rtcl-sm-print">%s</button></li>', esc_html__( 'Print', 'classified-listing' ) );
						}
					};
					add_action( 'rtcl_single_action_after_list_item', $rtcl_extra_actions, 5 );

					// Short favourite labels so Favourite | Share | Print share one row at
					// equal width; single-listing.js re-applies them after the Ajax toggle.
					$fav_label_add   = __( 'Favourite', 'classified-listing' );
					$fav_label_saved = __( 'Saved', 'classified-listing' );
					$rtcl_fav_add    = static function () use ( $fav_label_add ) {
						return $fav_label_add;
					};
					$rtcl_fav_saved  = static function () use ( $fav_label_saved ) {
						return $fav_label_saved;
					};
					add_filter( 'rtcl_text_add_to_favourite', $rtcl_fav_add );
					add_filter( 'rtcl_text_remove_from_favourite', $rtcl_fav_saved );
					?>
					<div class="single-listing-custom-fields-action rtcl-sm-actions"
						 data-fav-add="<?php echo esc_attr( $fav_label_add ); ?>"
						 data-fav-saved="<?php echo esc_attr( $fav_label_saved ); ?>">
						<?php
						$listing->the_actions();
						remove_filter( 'rtcl_text_add_to_favourite', $rtcl_fav_add );
						remove_filter( 'rtcl_text_remove_from_favourite', $rtcl_fav_saved );
						?>

						<?php if ( $share_html ) : ?>
							<div class="rtcl-sm-share-panel" id="rtcl-sm-share-panel" hidden>
								<button type="button" class="rtcl-sm-copy-link"
										data-url="<?php echo esc_url( $listing->get_the_permalink() ); ?>"
										data-copied="<?php esc_attr_e( 'Copied', 'classified-listing' ); ?>"><span><?php esc_html_e( 'Copy link', 'classified-listing' ); ?></span></button>
								<?php
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
								echo $share_html;
								?>
							</div>
						<?php endif; ?>

						<?php // Always printed: single-listing.js moves the Report link in here. Hidden by CSS while empty. ?>
						<div class="rtcl-sm-safety"><?php if ( $safety_note ) : ?><span class="rtcl-sm-safety-note"><?php echo esc_html( $safety_note ); ?></span><?php endif; ?></div>
					</div>
					<?php remove_action( 'rtcl_single_action_after_list_item', $rtcl_extra_actions, 5 ); ?>
				<?php elseif ( $safety_note ) : ?>
					<div class="rtcl-sm-safety"><span class="rtcl-sm-safety-note"><?php echo esc_html( $safety_note ); ?></span></div>
				<?php endif; ?>
			</div>

			<?php if ( is_active_sidebar( 'rtcl-single-sidebar' ) ) : ?>
				<div class="rtcl-sm-widgets rtcl-sidebar-wrapper">
					<?php dynamic_sidebar( 'rtcl-single-sidebar' ); ?>
				</div>
			<?php endif; ?>
		</aside>

		<div class="rtcl-sm-main">
			<?php if ( $media_html ) : ?>
				<div class="rtcl-sm-card rtcl-sm-media">
					<?php
					// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo $media_html;
					?>
				</div>
			<?php endif; ?>

			<?php $has_description = '' !== trim( get_the_content() ); ?>
			<?php if ( $details_html || $before_html || $has_description ) : ?>
				<section class="rtcl-sm-card rtcl-sm-overview">
					<?php
					// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo $details_html . $before_html;
					?>
					<?php if ( $has_description ) : ?>
						<div class="rtcl-sm-description">
							<h2 class="rtcl-sm-title"><?php esc_html_e( 'Description', 'classified-listing' ); ?></h2>
							<div class="rtcl-listing-description"><?php $listing->the_content(); ?></div>
						</div>
					<?php endif; ?>
				</section>
			<?php endif; ?>

			<?php
			foreach ( [ $map_html, $hours_html, $social_html, $review_html ] as $rtcl_section_html ) {
				if ( $rtcl_section_html ) {
					// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo '<div class="rtcl-sm-card rtcl-sm-section">' . $rtcl_section_html . '</div>';
				}
			}
			?>
		</div>
	</div>

	<!-- Related Listing -->
	<?php $listing->the_related_listings(); ?>
</div>

<?php do_action( 'rtcl_after_single_listing' ); ?>
