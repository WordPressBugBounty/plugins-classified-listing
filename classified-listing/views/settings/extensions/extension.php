<?php

use Rtcl\Resources\Options;

$addons      = Options::addons();
$themes      = Options::themes();
$addon_count = '22+';
$theme_count = '18+';
$total_count = $addon_count + $theme_count;

/**
 * Render a Lucide-style SVG icon by key.
 */
function rtcl_ext_icon( $key, $size = 24 ) {
	$icons = [
		'grid'        => '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
		'smartphone'  => '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
		'crown'       => '<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5.21 16.5h13.58"/>',
		'store'       => '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
		'globe'       => '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
		'layers'      => '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
		'phone'       => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
		'shield'      => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
		'calendar'    => '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
		'users'       => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
		'banknote'    => '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
		'layout'      => '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/>',
		'map-pin'     => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
		'palette'     => '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
		'home'        => '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
		'compass'     => '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
		'car'         => '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
		'utensils'    => '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
		'heart-pulse' => '<path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/><path d="M3 12h4l2 -3l4 6l2 -3h4"/>',
		'heart'       => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
		'briefcase'   => '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
		'list'        => '<line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>',
	];

	$path = isset( $icons[ $key ] ) ? $icons[ $key ] : $icons['grid'];

	return '<svg xmlns="http://www.w3.org/2000/svg" width="' . (int) $size . '" height="' . (int) $size . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' . $path . '</svg>';
}

/**
 * Render a single extension card.
 */
function rtcl_ext_render_card( $item, $context = 'addon' ) {
	$item = wp_parse_args( $item, [
		'title'        => '',
		'description'  => '',
		'img_url'      => '',
		'demo_url'     => '',
		'buy_url'      => '',
		'download_url' => '',
		'type'         => 'premium',
		'badge'        => '',
		'tags'         => [],
		'icon'         => 'grid',
		'thumb_colors' => [ '#6366f1', '#4f46e5' ],
		'rating'       => '',
		'installs'     => '',
	] );

	$tags_attr  = ! empty( $item['tags'] ) ? implode( ',', $item['tags'] ) : '';
	$type_value = strtolower( $item['type'] );
	$badge      = ! empty( $item['badge'] ) ? $item['badge'] : '';
	$has_ribbon = ( 'bundle' === $badge || 'free' === $type_value );
	$title_url  = ! empty( $item['buy_url'] ) ? $item['buy_url'] : ( ! empty( $item['demo_url'] ) ? $item['demo_url'] : '' );
	$c1         = esc_attr( $item['thumb_colors'][0] ?? '#6366f1' );
	$c2         = esc_attr( $item['thumb_colors'][1] ?? '#4f46e5' );
	?>
	<div class="rtcl-ext-card"
		 data-tags="<?php echo esc_attr( $tags_attr ); ?>,<?php echo esc_attr( $type_value ); ?>"
		 data-name="<?php echo esc_attr( strtolower( $item['title'] ) ); ?>">

		<?php if ( ! empty( $item['img_url'] ) ) : ?>
		<div class="rtcl-ext-card__thumb rtcl-ext-card__thumb--img">
			<img src="<?php echo esc_url( $item['img_url'] ); ?>" alt="<?php echo esc_attr( $item['title'] ); ?>" loading="lazy">
		<?php else : ?>
		<div class="rtcl-ext-card__thumb" style="background:linear-gradient(135deg,<?php echo $c1; ?>,<?php echo $c2; ?>)">
			<div class="rtcl-ext-card__glyph">
				<span class="rtcl-ext-card__ic">
					<?php echo rtcl_ext_icon( $item['icon'], 24 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</span>
				<span class="rtcl-ext-card__lab"><?php echo esc_html( $item['title'] ); ?></span>
			</div>
		<?php endif; ?>

			<?php if ( 'addon' === $context && ! empty( $item['tags'] ) ) : ?>
				<div class="rtcl-ext-card__badges">
					<?php
					$tag_icons = [
						'popular'  => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
						'new'      => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
						'trending' => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
					];
					foreach ( $item['tags'] as $tag ) :
						$icon_svg = isset( $tag_icons[ $tag ] ) ? $tag_icons[ $tag ] : '';
					?>
						<span class="rtcl-ext-badge rtcl-ext-badge--<?php echo esc_attr( $tag ); ?>">
							<?php echo $icon_svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php echo esc_html( ucfirst( $tag ) ); ?>
						</span>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<?php if ( $has_ribbon ) : ?>
				<span class="rtcl-ext-ribbon rtcl-ext-ribbon--<?php echo esc_attr( 'bundle' === $badge ? 'bundle' : 'free' ); ?>">
					<span><?php echo 'bundle' === $badge ? esc_html__( 'Bundle', 'classified-listing' ) : esc_html__( 'Free', 'classified-listing' ); ?></span>
				</span>
			<?php endif; ?>
		</div>

		<div class="rtcl-ext-card__body">
			<?php if ( 'theme' === $context && ! empty( $item['tags'] ) ) : ?>
				<div class="rtcl-ext-card__tags-inline">
					<?php
					$tag_icons = [
						'popular'  => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
						'new'      => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
						'trending' => '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
					];
					foreach ( $item['tags'] as $tag ) :
						$icon_svg = isset( $tag_icons[ $tag ] ) ? $tag_icons[ $tag ] : '';
					?>
						<span class="rtcl-ext-badge rtcl-ext-badge--<?php echo esc_attr( $tag ); ?>">
							<?php echo $icon_svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php echo esc_html( ucfirst( $tag ) ); ?>
						</span>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
			<h3>
				<?php if ( ! empty( $title_url ) ) : ?>
					<a href="<?php echo esc_url( $title_url ); ?>" target="_blank"><?php echo esc_html( $item['title'] ); ?></a>
				<?php else : ?>
					<?php echo esc_html( $item['title'] ); ?>
				<?php endif; ?>
			</h3>
			<?php if ( ! empty( $item['description'] ) ) : ?>
				<p class="rtcl-ext-card__desc"><?php echo esc_html( $item['description'] ); ?></p>
			<?php endif; ?>

			<?php if ( ! empty( $item['rating'] ) || ! empty( $item['installs'] ) ) : ?>
				<div class="rtcl-ext-card__meta">
					<?php if ( ! empty( $item['rating'] ) ) : ?>
						<span class="rtcl-ext-card__meta-item">
							<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
							<?php echo esc_html( $item['rating'] ); ?>
						</span>
					<?php endif; ?>
					<?php if ( ! empty( $item['installs'] ) ) : ?>
						<span class="rtcl-ext-card__meta-item">
							<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
							<?php echo esc_html( $item['installs'] ); ?> <?php esc_html_e( 'active', 'classified-listing' ); ?>
						</span>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

		<div class="rtcl-ext-card__foot">
			<?php if ( ! empty( $item['download_url'] ) ) : ?>
				<a class="rtcl-ext-btn rtcl-ext-btn--success" href="<?php echo esc_url( $item['download_url'] ); ?>" target="_blank">
					<?php esc_html_e( 'Download', 'classified-listing' ); ?>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
				</a>
			<?php elseif ( ! empty( $item['buy_url'] ) ) : ?>
				<a class="rtcl-ext-btn rtcl-ext-btn--primary" href="<?php echo esc_url( $item['buy_url'] ); ?>" target="_blank">
					<?php esc_html_e( 'Buy Now', 'classified-listing' ); ?>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
				</a>
			<?php endif; ?>
			<?php if ( ! empty( $item['demo_url'] ) ) : ?>
				<a class="rtcl-ext-btn rtcl-ext-btn--ghost" href="<?php echo esc_url( $item['demo_url'] ); ?>" target="_blank">
					<?php esc_html_e( 'Live Demo', 'classified-listing' ); ?>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
				</a>
			<?php endif; ?>
		</div>
	</div>
	<?php
}
?>
<div id="rtcl" class="rtcl-admin-wrap rtcl-extensions">

	<!-- ── Header ── -->
	<div class="rtcl-ext-head">
		<span class="rtcl-ext-head__icon">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
		</span>
		<div>
			<h1><?php esc_html_e( 'Get Add-ons & Themes', 'classified-listing' ); ?></h1>
			<p><?php esc_html_e( 'Extend and restyle your classified listing site with premium add-ons and themes.', 'classified-listing' ); ?></p>
		</div>
	</div>

	<!-- ── Controls ── -->
	<div class="rtcl-ext-controls">
		<div class="rtcl-ext-seg" data-filter-type="view">
			<button class="rtcl-ext-seg__btn active" data-filter="all">
				<?php esc_html_e( 'All', 'classified-listing' ); ?>
				<span class="rtcl-ext-seg__count" id="rtcl-count-all"><?php echo esc_html( $total_count ); ?></span>
			</button>
			<button class="rtcl-ext-seg__btn" data-filter="addon">
				<?php esc_html_e( 'Add-ons', 'classified-listing' ); ?>
				<span class="rtcl-ext-seg__count" id="rtcl-count-addon"><?php echo esc_html( $addon_count ); ?></span>
			</button>
			<button class="rtcl-ext-seg__btn" data-filter="theme">
				<?php esc_html_e( 'Themes', 'classified-listing' ); ?>
				<span class="rtcl-ext-seg__count" id="rtcl-count-theme"><?php echo esc_html( $theme_count ); ?></span>
			</button>
		</div>

		<div class="rtcl-ext-search">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
			<input type="text" id="rtcl-ext-search" placeholder="<?php esc_attr_e( 'Search...', 'classified-listing' ); ?>">
		</div>

		<div class="rtcl-ext-chips" data-filter-type="tag">
			<button class="rtcl-ext-chip active" data-filter="all">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
				<?php esc_html_e( 'All tags', 'classified-listing' ); ?>
			</button>
			<button class="rtcl-ext-chip" data-filter="popular">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
				<?php esc_html_e( 'Popular', 'classified-listing' ); ?>
			</button>
			<button class="rtcl-ext-chip" data-filter="new">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
				<?php esc_html_e( 'New', 'classified-listing' ); ?>
			</button>
			<button class="rtcl-ext-chip" data-filter="free">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
				<?php esc_html_e( 'Free', 'classified-listing' ); ?>
			</button>
		</div>
	</div>

	<!-- ── Add-ons Section ── -->
	<section class="rtcl-ext-section" data-group="addon">
		<div class="rtcl-ext-sec-head rtcl-ext-sec-head--addons">
			<span class="rtcl-ext-sec-head__icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>
			</span>
			<h2><?php esc_html_e( 'Add-ons', 'classified-listing' ); ?></h2>
			<span class="rtcl-ext-sec-head__count" id="rtcl-sec-count-addon"><?php echo esc_html( $addon_count ); ?> <?php esc_html_e( 'items', 'classified-listing' ); ?></span>
			<span class="rtcl-ext-sec-head__rule"></span>
			<a class="rtcl-ext-sec-head__see" href="https://www.radiustheme.com/classified-listing-addons/" target="_blank">
				<?php esc_html_e( 'See all', 'classified-listing' ); ?>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
		<div class="rtcl-ext-grid" id="rtcl-grid-addon">
			<?php foreach ( $addons as $item ) { rtcl_ext_render_card( $item ); } ?>
		</div>
		<div class="rtcl-ext-empty" style="display:none;">
			<p><?php esc_html_e( 'No add-ons match your filters.', 'classified-listing' ); ?></p>
		</div>
		<div class="rtcl-ext-sec-foot">
			<a class="rtcl-ext-btn rtcl-ext-btn--ghost rtcl-ext-btn--wide" href="https://www.radiustheme.com/classified-listing-addons/" target="_blank">
				<?php esc_html_e( 'See all add-ons', 'classified-listing' ); ?>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
	</section>

	<!-- ── Themes Section ── -->
	<section class="rtcl-ext-section" data-group="theme">
		<div class="rtcl-ext-sec-head rtcl-ext-sec-head--themes">
			<span class="rtcl-ext-sec-head__icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
			</span>
			<h2><?php esc_html_e( 'Themes', 'classified-listing' ); ?></h2>
			<span class="rtcl-ext-sec-head__count" id="rtcl-sec-count-theme"><?php echo esc_html( $theme_count ); ?> <?php esc_html_e( 'items', 'classified-listing' ); ?></span>
			<span class="rtcl-ext-sec-head__rule"></span>
			<a class="rtcl-ext-sec-head__see" href="https://www.radiustheme.com/classified-listing-themes/" target="_blank">
				<?php esc_html_e( 'See all', 'classified-listing' ); ?>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
		<div class="rtcl-ext-grid" id="rtcl-grid-theme">
			<?php foreach ( $themes as $item ) { rtcl_ext_render_card( $item, 'theme' ); } ?>
		</div>
		<div class="rtcl-ext-empty" style="display:none;">
			<p><?php esc_html_e( 'No themes match your filters.', 'classified-listing' ); ?></p>
		</div>
		<div class="rtcl-ext-sec-foot">
			<a class="rtcl-ext-btn rtcl-ext-btn--ghost rtcl-ext-btn--wide" href="https://www.radiustheme.com/classified-listing-themes/" target="_blank">
				<?php esc_html_e( 'See all themes', 'classified-listing' ); ?>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
		</div>
	</section>

</div>

<script>
(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var activeView = 'all';
		var activeTag  = 'all';
		var query      = '';

		var sections  = document.querySelectorAll('.rtcl-ext-section');
		var segBtns   = document.querySelectorAll('.rtcl-ext-seg__btn');
		var chipBtns  = document.querySelectorAll('.rtcl-ext-chip');
		var searchBox = document.getElementById('rtcl-ext-search');

		function applyFilters() {
			sections.forEach(function(sec) {
				var group = sec.getAttribute('data-group');
				var sectionVisible = (activeView === 'all' || activeView === group);
				sec.style.display = sectionVisible ? '' : 'none';
				if (!sectionVisible) return;

				var cards = sec.querySelectorAll('.rtcl-ext-card');
				var visibleCount = 0;

				cards.forEach(function(card) {
					var cardTags = (card.getAttribute('data-tags') || '').split(',').filter(Boolean);
					var cardName = card.getAttribute('data-name') || '';

					var tagMatch   = activeTag === 'all' || cardTags.indexOf(activeTag) !== -1;
					var queryMatch = !query || cardName.indexOf(query) !== -1;

					if (tagMatch && queryMatch) {
						card.style.display = '';
						visibleCount++;
					} else {
						card.style.display = 'none';
					}
				});

				// Show/hide empty state
				var emptyEl = sec.querySelector('.rtcl-ext-empty');
				var gridEl  = sec.querySelector('.rtcl-ext-grid');
				var footEl  = sec.querySelector('.rtcl-ext-sec-foot');
				if (emptyEl) emptyEl.style.display = visibleCount === 0 ? '' : 'none';
				if (gridEl)  gridEl.style.display  = visibleCount > 0 ? '' : 'none';
				if (footEl)  footEl.style.display   = visibleCount > 0 ? '' : 'none';
			});
		}

		// View segmented control
		segBtns.forEach(function(btn) {
			btn.addEventListener('click', function() {
				segBtns.forEach(function(b) { b.classList.remove('active'); });
				this.classList.add('active');
				activeView = this.getAttribute('data-filter');
				applyFilters();
			});
		});

		// Tag chips
		chipBtns.forEach(function(btn) {
			btn.addEventListener('click', function() {
				chipBtns.forEach(function(b) { b.classList.remove('active'); });
				this.classList.add('active');
				activeTag = this.getAttribute('data-filter');
				applyFilters();
			});
		});

		// Search
		if (searchBox) {
			searchBox.addEventListener('input', function() {
				query = this.value.toLowerCase().trim();
				applyFilters();
			});
		}
	});
})();
</script>
