<?php

namespace Rtcl\Resources;

class ThemeSupportCss
{

	/**
	 * @return string css
	 */
	public static function twentyTwenty() {
		ob_start();
		?>
		.entry-content > .rtcl{max-width: 1200px !important;}
		<?php
		return ob_get_clean();
	}

	/**
	 * @return string css
	 */
	public static function divi() {
		$content_width = function_exists('et_get_option') ? absint( et_get_option( 'content_width', '1080' ) ) : '1080';
		// Match Divi's own `.container` — 80% of the page, capped at the theme's
		// Content Width — so listing pages line up with the header and footer.
		// The 80% is taken of the viewport rather than of the parent: these
		// elements now sit inside the plugin's own `.rtcl-container`, and a
		// percentage of that narrower box made them noticeably narrower than
		// the header, with blank space either side.
		ob_start();
		?>
        #et-main-area .rtcl-breadcrumb {
            width: 100%;
            max-width: min(<?php echo esc_attr($content_width); ?>px, 80vw) !important;
            margin: auto;
            padding-top: 20px;
        }
        #et-main-area .rtcl-content-wrapper {
            width: 100%;
            max-width: min(<?php echo esc_attr($content_width); ?>px, 80vw) !important;
            margin: auto;
            min-width: auto;
            padding-top: 60px;
            padding-bottom: 60px;
        }
		<?php
		return ob_get_clean();
	}

}