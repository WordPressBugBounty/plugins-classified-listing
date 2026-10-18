<?php

namespace Rtcl\Controllers\Blocks;

/**
 * Container block.
 *
 * A static block — the markup and its CSS custom properties are produced by
 * save.js, so there is no render callback. All this class does is register the
 * type.
 *
 * The stylesheet that maps those custom properties to real properties across the
 * four breakpoints is `src/sass/partials/_gb-container-block.scss`, built into
 * the shared `gb-frontend-block.css` and enqueued by
 * `BlockController::block_assets()` on `enqueue_block_assets` — one request for
 * the front end, the editor document and the editor iframe.
 */
class Container {

	public function __construct() {
		add_action( 'init', [ $this, 'register_block' ] );
	}

	public function register_block() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		register_block_type( RTCL_PATH . 'block-metadata/container' );
	}
}
