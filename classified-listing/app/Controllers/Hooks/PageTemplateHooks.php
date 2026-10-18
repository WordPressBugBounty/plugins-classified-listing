<?php

namespace Rtcl\Controllers\Hooks;

use WP_Block_Editor_Context;

/**
 * Front-end and block editor behaviour for the plugin's page templates.
 *
 * The templates themselves are registered in FilterHooks (theme_page_templates /
 * template_include). This class only handles what a template needs on top of the
 * markup: the body class, the front-end full width CSS, and making the Gutenberg
 * canvas edge to edge so what is built matches what is rendered.
 */
class PageTemplateHooks {

	/**
	 * `_wp_page_template` value of the full width template.
	 */
	const FULL_WIDTH_TEMPLATE = 'rtcl-full-width_template';

	/**
	 * Class toggled on the editor canvas while the full width template is selected.
	 */
	const EDITOR_CLASS = 'rtcl-fullwidth-editor';

	public static function init() {
		add_filter( 'body_class', [ __CLASS__, 'body_class' ] );
		add_action( 'wp_head', [ __CLASS__, 'frontend_css' ], 99 );
		// Priority 20 so BlockController has already registered `rtcl-gb-blocks-js`.
		add_action( 'enqueue_block_editor_assets', [ __CLASS__, 'editor_css' ], 20 );
		add_filter( 'block_editor_settings_all', [ __CLASS__, 'block_editor_settings' ], 10, 2 );
	}

	/**
	 * Is the page currently being displayed using the full width template.
	 *
	 * @return bool
	 */
	public static function is_full_width_page() {
		return is_page() && is_page_template( self::FULL_WIDTH_TEMPLATE );
	}

	/**
	 * Add a targetable class so themes and users can hook their own CSS onto it.
	 *
	 * @param array $classes Body classes.
	 *
	 * @return array
	 */
	public static function body_class( $classes ) {
		if ( self::is_full_width_page() ) {
			$classes[] = 'rtcl-page-template-full-width';
		}

		return $classes;
	}

	/**
	 * Print the front-end full width CSS, only on pages using the template.
	 *
	 * @return void
	 */
	public static function frontend_css() {
		if ( ! self::is_full_width_page() ) {
			return;
		}

		$css = self::frontend_styles();

		if ( ! $css ) {
			return;
		}

		printf(
			'<style id="rtcl-full-width-template-css">%s</style>' . "\n",
			wp_strip_all_tags( $css ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		);
	}

	/**
	 * Editor CSS for the non iframed canvas.
	 *
	 * The iframed canvas is handled by block_editor_settings(); both are scoped by
	 * self::EDITOR_CLASS which the editor script toggles, so loading both is safe.
	 *
	 * @return void
	 */
	public static function editor_css() {
		$css = self::editor_styles();

		wp_register_style( 'rtcl-page-template-editor', false, [], RTCL_VERSION );
		wp_enqueue_style( 'rtcl-page-template-editor' );
		wp_add_inline_style( 'rtcl-page-template-editor', $css );

		/**
		 * Hand the same CSS to the editor script.
		 *
		 * Theme editor styles (add_editor_style / theme.json) are injected into the
		 * DOM by the editor at runtime, so they land after any stylesheet enqueued
		 * here. The script re-appends this CSS as the last node in the canvas head
		 * so source order can never decide the cascade against us.
		 */
		$handle = wp_script_is( 'rtcl-gb-blocks-js', 'enqueued' ) ? 'rtcl-gb-blocks-js' : 'wp-blocks';

		wp_add_inline_script(
			$handle,
			'window.rtclPageTemplate = ' . wp_json_encode(
				[
					'fullWidthTemplate' => self::FULL_WIDTH_TEMPLATE,
					'canvasClass'       => self::EDITOR_CLASS,
					'css'               => $css,
				]
			) . ';',
			'before'
		);
	}

	/**
	 * Push the canvas CSS inside the iframed editor and turn on wide/full
	 * alignment for pages already saved with the full width template.
	 *
	 * Live template switches are handled by the editor script, which flips
	 * alignWide through the block editor store without a reload.
	 *
	 * @param array                   $settings Block editor settings.
	 * @param WP_Block_Editor_Context $context  Editor context.
	 *
	 * @return array
	 */
	public static function block_editor_settings( $settings, $context ) {
		if ( empty( $context->post ) || 'page' !== $context->post->post_type ) {
			return $settings;
		}

		if ( ! isset( $settings['styles'] ) || ! is_array( $settings['styles'] ) ) {
			$settings['styles'] = [];
		}

		$settings['styles'][] = [
			'css'            => self::editor_styles(),
			'__unstableType' => 'plugin',
		];

		if ( self::FULL_WIDTH_TEMPLATE === get_page_template_slug( $context->post ) ) {
			$settings['alignWide'] = true;
		}

		return $settings;
	}

	/**
	 * CSS that breaks the content out of whatever container the theme opened.
	 *
	 * @return string
	 */
	protected static function frontend_styles() {
		$css = 'html{overflow-x:hidden;overflow-x:clip}'
			. 'body.rtcl-page-template-full-width{overflow-x:hidden;overflow-x:clip}'
			. '.rtcl-full-width-content{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);padding-left:0;padding-right:0}'
			. '.rtcl-full-width-content > .alignwide,'
			. '.rtcl-full-width-content > .alignfull{max-width:none;width:auto;margin-left:0;margin-right:0}';

		return apply_filters( 'rtcl_full_width_template_css', $css );
	}

	/**
	 * CSS that removes the editor's constrained content width.
	 *
	 * Only the root container is unconstrained; nested Group/Row blocks keep their
	 * own layout width so intentional inner containers still behave.
	 *
	 * @return string
	 */
	protected static function editor_styles() {
		$class = '.' . self::EDITOR_CLASS;

		// `!important` is deliberate: theme editor styles are injected after ours and
		// match on equal specificity, so nothing short of this reliably wins.
		$css = "{$class} .editor-styles-wrapper,"
			. "{$class}.editor-styles-wrapper{max-width:none!important;padding-left:0!important;padding-right:0!important}"
			// The root container holds the theme's centred content width.
			. "{$class} .is-root-container,"
			. "{$class} .block-editor-block-list__layout.is-root-container{max-width:none!important;padding-left:0!important;padding-right:0!important;margin-left:0!important;margin-right:0!important}"
			// Only top level blocks are unconstrained — nested Group/Row blocks keep
			// their own layout width so intentional inner containers still behave.
			// The Container block is excluded: its own Content Width control owns
			// its max-width, and this rule would otherwise flatten every boxed
			// container to full bleed.
			. "{$class} .is-root-container > *:not(.rtcl-gb-container){max-width:none!important}"
			. "{$class} .is-root-container > .alignwide,"
			. "{$class} .is-root-container > .alignfull,"
			. "{$class} .is-root-container > .wp-block[data-align=\"wide\"],"
			. "{$class} .is-root-container > .wp-block[data-align=\"full\"]{width:auto!important;margin-left:0!important;margin-right:0!important}"
			// Keep the post title aligned with the now full width content.
			. "{$class} .edit-post-visual-editor__post-title-wrapper,"
			. "{$class} .editor-visual-editor__post-title-wrapper{max-width:none!important;padding-left:0!important;padding-right:0!important}";

		return apply_filters( 'rtcl_full_width_template_editor_css', $css );
	}
}
