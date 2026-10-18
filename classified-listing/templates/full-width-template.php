<?php
/**
 * "CL Full Width" page template.
 *
 * Renders the theme header and footer but drops the theme's content
 * container/sidebar so the page content spans the full viewport width,
 * the same shape as Elementor's "Full Width" page template.
 *
 * @package classified-listing
 */

defined( 'ABSPATH' ) || exit;

get_header();

do_action( 'rtcl_full_width_template_before_content' );
?>
<div id="rtcl-full-width-content" class="rtcl-full-width-content">
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>
</div>
<?php
do_action( 'rtcl_full_width_template_after_content' );

get_footer();
