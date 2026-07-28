<?php
/**
 * Single Listing Layout element: Listing Contact.
 *
 * Built-in preset that outputs the single-listing contact card (author info, location, contact
 * number, message to seller, chat, website, online status) by firing the rtcl_single_listing_sidebar
 * hook — the same hook the sidebar template uses (templates/global/sidebar.php). The base plugin
 * populates this hook (TemplateHooks::add_single_listing_sidebar), so it renders with any active
 * theme, and add-ons that hook it (e.g. business hours) are respected too. No sidebar wrapper is
 * emitted, so it drops cleanly into a builder container.
 *
 * @package ClassifiedListing/Templates
 * @version 5.5.0
 * @var Form $form
 * @var FBField $field
 * @var string $fieldUuid
 */

use Rtcl\Models\Listing;

defined( 'ABSPATH' ) || exit;

global $listing;

if ( ! is_a( $listing, Listing::class ) ) {
	return;
}
?>

<div class="listing-sidebar rtcl-sl-sidebar">
	<div class="rtcl-listing-user-info">
		<div class="rtcl-sl-section-header">
			<h3 class="rtcl-sl-section-title">Contact</h3>
		</div>
		<div class="rtcl-list-group">
			<?php do_action( 'rtcl_listing_seller_information', $listing ); ?>
		</div>
	</div>
</div>
