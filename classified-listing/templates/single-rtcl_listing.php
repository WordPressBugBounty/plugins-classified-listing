<?php
/**
 *
 * @author     RadiusTheme
 * @package    classified-listing/templates
 * @version    1.0.0
 */

use Rtcl\Controllers\Hooks\TemplateHooks;
use Rtcl\Helpers\Functions;
use Rtcl\Services\FormBuilder\FBHelper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( Functions::is_block_theme() ) {
	if ( function_exists( 'wp_load_block_template' ) ) {
		wp_load_block_template();
	}

	if ( function_exists( 'block_header_area' ) ) {
		block_header_area();
	}
} else {
	get_header( 'listing' );
}
?>

<?php do_action( 'rtcl_before_content_wrapper' ); ?>

<?php
/**
 * rtcl_before_main_content hook.
 *
 * @hooked rtcl_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked rtcl_breadcrumb - 20
 */
do_action( 'rtcl_before_main_content' );
global $listing;
$enableBuilder = FBHelper::isEnableSingleBuilder( $listing );
// Modern default view carries its own price/seller aside (and the single sidebar
// widgets), so the page-level listing sidebar is not rendered beside it.
// A theme that overrides the classic content template keeps its own design.
$modernLayout = ! $enableBuilder && Functions::is_modern_single_listing()
                && ! Functions::is_template_overridden_by_theme( 'content-single-rtcl_listing.php' );
if ( $modernLayout ) {
	remove_action( 'rtcl_sidebar', [ TemplateHooks::class, 'get_sidebar' ], 10 );
}
?>

<?php while ( have_posts() ) : ?>
	<?php the_post(); ?>

	<?php if ( $enableBuilder ) {
		$form = $listing->getForm();
		Functions::get_template( 'single-layout/builder', [ 'form' => $form ] );
	} elseif ( $modernLayout ) {
		Functions::get_template( 'content-single-rtcl_listing-modern' );
	} else {
		Functions::get_template_part( 'content', 'single-rtcl_listing' );
	} ?>

<?php endwhile; // end of the loop. ?>

<?php
/**
 * rtcl_after_main_content hook.
 *
 * @hooked rtcl_output_content_wrapper_end - 10 (outputs closing divs for the content)
 */
do_action( 'rtcl_after_main_content' );
?>

<?php
if ( ! $enableBuilder ) {
	/**
	 * rtcl_sidebar hook.
	 *
	 * @hooked rtcl_get_sidebar - 10
	 */
	do_action( 'rtcl_sidebar' );
}
?>

<?php do_action( 'rtcl_after_content_wrapper' ); ?>

<?php
if ( Functions::is_block_theme() ) {
	if ( function_exists( 'block_footer_area' ) ) {
		block_footer_area();
	}
} else {
	get_footer( 'listing' );
}
