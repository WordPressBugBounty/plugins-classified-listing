<?php
/**
 *
 * @package ClassifiedListing/Templates
 * @version 6.2.0.1
 * @var Form $form
 * @var string $fieldUuid
 * @var FBField $field
 * @var Listing $field
 */

use Rtcl\Helpers\Functions;
use Rtcl\Models\Form\Form;
use Rtcl\Models\Listing;
use Rtcl\Services\FormBuilder\FBField;
use Rtcl\Services\FormBuilder\FBHelper;

defined( 'ABSPATH' ) || exit;
global $listing;
if ( !is_a( $field, FBField::class ) || !is_a( $listing, Listing::class ) ) {
	return;
}
$website = get_post_meta( $listing->get_id(), 'website', true );

if ( empty( $website ) ) {
	return;
}
$link_options = Functions::get_listing_website_link_options( $listing, $website );
?>
<a href="<?php echo esc_url( $website ); ?>"<?php echo $link_options['new_window'] ? ' target="_blank"' : ''; ?><?php echo Functions::is_listing_website_nofollow( $listing, $website ) ? ' rel="nofollow"' : ''; ?>><?php _e( 'Website', 'classified-listing' ); ?></a>