<?php
/**
 * Listing block — grid layout, style 1.
 *
 * Renders the shared Listing Showcase card design. The markup mirrors the
 * Elementor widget's `templates/elementor/listing-ads/grid/style-1.php` in
 * classified-listing-toolkits class for class, because both are styled by the
 * one stylesheet in `src/sass/partials/_listing-showcase.scss` — scoped to
 * `.rtcl.rtcl-listings-sc-wrapper`, which `ListingShowcase::wrapper_class()`
 * emits below.
 *
 * The per-card fragments come from `ListingShowcase::parts()` so the ten block
 * layouts cannot drift from each other; this file owns only the arrangement,
 * which is what makes each layout different and what a theme overriding
 * `classified-listing/block/listing-ads/grid/style-1.php` wants to change.
 *
 * @author     RadiusTheme
 * @package    classified-listing/templates
 * @version    2.0.0
 */

use Rtcl\Helpers\Functions;
use Rtcl\Helpers\Icons;
use Rtcl\Helpers\ListingShowcase;
use Rtcl\Helpers\Pagination;

defined( 'ABSPATH' ) || exit;

?>
<div class="<?php echo esc_attr( ListingShowcase::wrapper_class( $instance ) ); ?>">
	<div class="rtcl-listings-wrapper">

		<div class="<?php echo esc_attr( ListingShowcase::listings_class( $instance, 'grid', $style ) ); ?>">
			<?php
			if ( ! empty( $the_loops['posts'] ) ) {
				foreach ( $the_loops['posts'] as $the_loop ) {
					$parts = ListingShowcase::parts( $the_loop, $instance, [ 'description' => 'grid_content' ] );

					// One `wp_kses()` over the assembled card rather than per
					// fragment: `wp_kses_post()` strips SVG, so the icon set
					// needs the widened allowlist that `Icons` publishes.
					$card = sprintf(
						'%s<div class="rtin-content-area"><div class="item-content">%s %s %s %s %s %s <div class="rtin-right">%s</div></div></div>',
						$parts['thumb'],
						$parts['labels'],
						$parts['category'],
						$parts['title'],
						$parts['custom_field'],
						$parts['meta'],
						$parts['description'],
						$parts['price']
					);
					?>
					<div <?php Functions::listing_class( $the_loop['classes'] ); ?>>
						<?php echo wp_kses( $card, Icons::allowed_html() ); ?>
					</div>
					<?php
				}
			}
			?>
		</div>

		<?php if ( ListingShowcase::shows( $instance, 'pagination' ) && ! empty( $the_loops['query_obj'] ) && ! is_wp_error( $the_loops['query_obj'] ) ) : ?>
			<?php Pagination::pagination( $the_loops['query_obj'], true ); ?>
		<?php endif; ?>

	</div>
</div>
