<?php
/**
 *
 * @package ClassifiedListing/Templates
 * @version 5.2.0
 */

use Rtcl\Models\Listing;

defined( 'ABSPATH' ) || exit;
global $listing;

if ( ! is_a( $listing, Listing::class ) ) {
	return;
}

// Chat is a Pro feature. A layout saved while Pro was active can still contain
// this element after Pro is deactivated — render nothing instead of fatally
// erroring on the missing RtclPro class.
if ( ! class_exists( \RtclPro\Controllers\Hooks\TemplateHooks::class ) ) {
	return;
}

\RtclPro\Controllers\Hooks\TemplateHooks::add_chat_link( $listing );