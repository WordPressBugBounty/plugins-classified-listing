<?php

namespace Rtcl\Controllers\Blocks;

use Rtcl\Helpers\Functions;
use Rtcl\Resources\Options;

class AdminAjaxController {
	public function __construct() {
		//get categories for inspector controller
		add_action( 'wp_ajax_rtcl_gb_categories', [ $this, 'rtcl_gb_categories' ] );
		add_action( 'wp_ajax_nopriv_rtcl_gb_categories', [ $this, 'rtcl_gb_categories' ] );
		//get locations for inspector controller
		add_action( 'wp_ajax_rtcl_gb_location_ajax', [ $this, 'rtcl_gb_location_ajax' ] );
		add_action( 'wp_ajax_nopriv_rtcl_gb_location_ajax', [ $this, 'rtcl_gb_location_ajax' ] );
		//get listing type for inspector controller
		add_action( 'wp_ajax_rtcl_gb_listing_type_ajax', [ $this, 'rtcl_gb_listing_type_ajax' ] );
		add_action( 'wp_ajax_nopriv_rtcl_gb_listing_type_ajax', [ $this, 'rtcl_gb_listing_type_ajax' ] );
		//get promotion for inspector controller
		add_action( 'wp_ajax_rtcl_gb_listing_promotion_ajax', [ $this, 'rtcl_gb_listing_promotion_ajax' ] );
		add_action( 'wp_ajax_nopriv_rtcl_gb_listing_promotion_ajax', [ $this, 'rtcl_gb_listing_promotion_ajax' ] );
		//get categories for category box block
		add_action( 'wp_ajax_nopriv_rtcl_gb_listing_cat_box', [ $this, 'rtcl_gb_listing_cat_box' ] );
		add_action( 'wp_ajax_rtcl_gb_listing_cat_box', [ $this, 'rtcl_gb_listing_cat_box' ] );

		//get location for all location block
		add_action( 'wp_ajax_nopriv_rtcl_gb_all_locations', [ $this, 'rtcl_gb_all_locations' ] );
		add_action( 'wp_ajax_rtcl_gb_all_locations', [ $this, 'rtcl_gb_all_locations' ] );

		//get location for all location block
		add_action( 'wp_ajax_nopriv_rtcl_gb_single_location', [ $this, 'rtcl_gb_single_location' ] );
		add_action( 'wp_ajax_rtcl_gb_single_location', [ $this, 'rtcl_gb_single_location' ] );

		//get categories for category box block
		add_action( 'wp_ajax_nopriv_rtcl_gb_get_all_image_size_ajax', [ $this, 'rtcl_gb_get_all_image_size_ajax' ] );
		add_action( 'wp_ajax_rtcl_gb_get_all_image_size_ajax', [ $this, 'rtcl_gb_get_all_image_size_ajax' ] );

		// report
		add_action( 'wp_ajax_rtcl_revenue_order_search', [ $this, 'revenue_order_search' ] );
		add_action( 'wp_ajax_rtcl_ad_views_range', [ $this, 'ad_views_range' ] );
		add_action( 'wp_ajax_rtcl_revenue_range', [ $this, 'revenue_range' ] );
		add_action( 'wp_ajax_rtcl_top_listings_by_views', [ $this, 'top_listings_by_views' ] );
	}

	public static function ad_views_range() {
		if ( ! isset( $_POST[ rtcl()->nonceId ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ rtcl()->nonceId ] ) ), rtcl()->nonceText ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		if ( ! current_user_can( 'manage_rtcl_options' ) ) {
			wp_send_json_error( esc_html__( 'You do not have permission to access it.', 'classified-listing' ) );
		}

		$range = isset( $_POST['range'] ) ? sanitize_text_field( wp_unslash( $_POST['range'] ) ) : 'weekly';

		if ( 'custom' === $range ) {
			$start_date = isset( $_POST['start_date'] ) ? sanitize_text_field( wp_unslash( $_POST['start_date'] ) ) : '';
			$end_date   = isset( $_POST['end_date'] ) ? sanitize_text_field( wp_unslash( $_POST['end_date'] ) ) : '';
			$response   = Functions::get_ad_views_by_custom_range( $start_date, $end_date );
		} else {
			$allowed  = [ 'weekly', 'monthly', 'yearly' ];
			$range    = in_array( $range, $allowed, true ) ? $range : 'weekly';
			$response = Functions::get_ad_views_by_range( $range );
		}

		wp_send_json_success( $response );
	}

	public static function revenue_range() {
		if ( ! isset( $_POST[ rtcl()->nonceId ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ rtcl()->nonceId ] ) ), rtcl()->nonceText ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		if ( ! current_user_can( 'manage_rtcl_options' ) ) {
			wp_send_json_error( esc_html__( 'You do not have permission to access it.', 'classified-listing' ) );
		}

		$range   = isset( $_POST['range'] ) ? sanitize_text_field( wp_unslash( $_POST['range'] ) ) : 'weekly';
		$allowed = [ 'weekly', 'monthly', 'yearly' ];
		$range   = in_array( $range, $allowed, true ) ? $range : 'weekly';

		wp_send_json_success( Functions::get_revenue_by_range( $range ) );
	}

	public static function top_listings_by_views() {
		if ( ! isset( $_POST[ rtcl()->nonceId ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ rtcl()->nonceId ] ) ), rtcl()->nonceText ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		if ( ! current_user_can( 'manage_rtcl_options' ) ) {
			wp_send_json_error( esc_html__( 'You do not have permission to access it.', 'classified-listing' ) );
		}

		$limit = isset( $_POST['limit'] ) ? absint( wp_unslash( $_POST['limit'] ) ) : 5;
		$limit = min( max( $limit, 1 ), 20 );

		wp_send_json_success( Functions::get_top_listings_by_views( $limit ) );
	}

	public static function revenue_order_search() {
		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
		if ( ! isset( $_POST[ rtcl()->nonceId ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ rtcl()->nonceId ] ) ), rtcl()->nonceText ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		if ( ! current_user_can( 'manage_rtcl_options' ) ) {
			wp_send_json_error( esc_html__( 'You do not have permission to access it.', 'classified-listing' ) );
		}

		$start_date = isset( $_POST['start_date'] ) ? sanitize_text_field( wp_unslash( $_POST['start_date'] ) ) : '';
		$end_date   = isset( $_POST['end_date'] ) ? sanitize_text_field( wp_unslash( $_POST['end_date'] ) ) : '';

		$response = Functions::get_order_total_by_date_range( $start_date, $end_date );

		wp_send_json_success( $response );
	}

	public static function rtcl_gb_single_location_query( $data ) {
		$results = [];
		if ( isset( $data['location'] ) && ! empty( $data['location'] ) ) {
			$term = get_term( $data['location'], 'rtcl_location' );
			if ( $term && ! is_wp_error( $term ) ) {
				$results['title']     = $term->name;
				$results['count']     = $term->count;
				$results['permalink'] = get_term_link( $term );
				$results['term_id']   = $term->term_id;
				$image                = get_term_meta( $term->term_id, '_rtcl_image', true );
				if ( $image ) {
					$image_src            = wp_get_attachment_image_src( $image, 'full' );
					$results['image_src'] = ! empty( $image_src[0] ) ? $image_src[0] : '';
				}
			}
		} else {
			$results['title']     = __( 'Please Select a Location and Background', 'classified-listing' );
			$results['count']     = '';
			$results['permalink'] = '#';
		}

		return $results;
	}

	public function rtcl_gb_single_location() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'], 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}
		$data = $_POST['attributes'];

		$results = self::rtcl_gb_single_location_query( $data );

		if ( ! empty( $results ) ) {
			wp_send_json_success( $results );
		} else {
			wp_send_json_error( "no post found" );
		}
	}

	/**
	 * Real pixel dimensions of the image `wp_get_attachment_image_src()` gave us.
	 *
	 * When a registered crop size was never generated for an attachment — a size
	 * added after the image was uploaded, or one the theme no longer makes —
	 * WordPress falls back to serving the FULL image, but the width and height it
	 * reports are the requested size constrained by
	 * `image_constrain_size_for_editor()`. Those can come back as `1` and `1`, so
	 * the markup said `<img … width="1" height="1">` while the `src` pointed at a
	 * full-size photo. The browser then reserved a 1x1 box for it and the image
	 * was effectively invisible.
	 *
	 * So: trust the reported size only when it is plausible, and otherwise read
	 * the attachment's own metadata, which describes the file actually being
	 * served. Returns zeros when neither is usable, and the caller omits the
	 * attributes rather than emitting a wrong one.
	 *
	 * @param int   $image_id Attachment ID.
	 * @param array $image    Result of `wp_get_attachment_image_src()`.
	 *
	 * @return array [ int $width, int $height ]
	 */
	private static function image_dimensions( $image_id, $image ) {
		$width  = ! empty( $image[1] ) ? (int) $image[1] : 0;
		$height = ! empty( $image[2] ) ? (int) $image[2] : 0;

		// A real crop is never a couple of pixels square; that is the constrained
		// fallback, not a photo.
		if ( $width > 1 && $height > 1 ) {
			return [ $width, $height ];
		}

		$meta = wp_get_attachment_metadata( $image_id );

		if ( ! empty( $meta['width'] ) && ! empty( $meta['height'] ) ) {
			return [ (int) $meta['width'], (int) $meta['height'] ];
		}

		return [ 0, 0 ];
	}

	public static function rtcl_gb_all_location_query( $data ) {
		$results                = [];
		$data['location_limit'] = isset( $data['location_limit'] ) ? $data['location_limit'] : 5;

		$args = [
			'taxonomy'   => 'rtcl_location',
			'hide_empty' => $data['hide_empty'] == 'true' ? true : false,
		];

		if ( $data['orderby'] == 'custom' ) {
			$args['orderby']  = 'meta_value_num';
			$args['order']    = $data['sortby'] ?: 'asc';
			$args['meta_key'] = '_rtcl_order'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
		} else {
			$args['orderby'] = $data['orderby'] ?: 'date';
			$args['order']   = $data['sortby'] ?: 'asc';
		}

		if ( $data['enable_parent'] == 'true' ) {
			$args["parent"] = 0;
		}

		if ( 'selected' == $data['location_type'] && ! empty( $data['locations'] ) ) {
			$data['locations'] = wp_list_pluck( $data['locations'], 'value' );
			$args['include']   = ! empty( $data['locations'] ) ? $data['locations'] : [];
		} elseif ( 'selected' == $data['location_type'] && empty( $data['locations'] ) ) {
			return [];
		}
		$terms = get_terms( $args );

		if ( 'all' == $data['location_type'] && $data['location_limit'] && ! is_wp_error( $terms ) ) {
			$number = ! empty( $data['location_limit'] ) ? $data['location_limit'] : 4;
			$terms  = array_slice( $terms, 0, $number );
		}

		if ( ! is_wp_error( $terms ) ) :
			//image size
			$image_size = $data['image_size'] ?? 'rtcl-thumbnail';
			if ( 'custom' == $image_size ) {
				if ( isset( $data['custom_image_width'] ) && isset( $data['custom_image_height'] ) ) {
					$image_size = [
						$data['custom_image_width'],
						$data['custom_image_height'],
					];
				}
			}
			foreach ( $terms as $term ) {
				$image_html = '';
				$image_url  = '';
				$image_id   = absint( get_term_meta( $term->term_id, '_rtcl_image', true ) );

				if ( $image_id ) {
					// `wp_get_attachment_image_src()` returns false when the
					// attachment has been deleted, so this is guarded — reading
					// `[1]` off `false` raised a PHP 8 warning and emitted
					// `<img src="">`.
					$image = wp_get_attachment_image_src( $image_id, $image_size );

					if ( ! empty( $image[0] ) ) {
						// List style 2 paints the photo as a CSS background, so it
						// needs the bare URL as well as the `<img>` the other
						// layouts print.
						$image_url = $image[0];

						list( $width, $height ) = self::image_dimensions( $image_id, $image );

						// Width and height are omitted entirely when they cannot
						// be determined, rather than guessed. The Elementor
						// widget never prints them at all, so an image with no
						// dimensions is a shape this design already handles.
						$size_attr = ( $width && $height )
							? sprintf( ' width="%d" height="%d"', $width, $height )
							: '';

						$image_html = sprintf(
							'<img src="%s" alt="%s"%s />',
							esc_url( $image[0] ),
							esc_attr( $term->name ),
							$size_attr
						);
					}
				}
				$order       = get_term_meta( $term->term_id, '_rtcl_order', true );
				$count       = $term->count;
				$child_html  = '';
				$child_args  = [
					'taxonomy'   => 'rtcl_location',
					'parent'     => $term->term_id,
					'number'     => $data['sub_location_limit'],
					'hide_empty' => false,
					'orderby'    => 'count',
					'order'      => 'DESC',
				];
				$child_terms = get_terms( $child_args );
				if ( ! empty( $child_terms ) && ! is_wp_error( $child_terms ) ) {
					foreach ( $child_terms as $child_trm ) {
						// Same shape the category block already uses (see
						// `rtcl_gb_category_query()` below) and the same one the
						// Elementor location widget emits: a circle bullet, the
						// name, and the count as its own element so it can sit
						// right-aligned as a badge instead of running inline in
						// brackets. `has-items` / `no-items` is what tints a
						// populated count and greys an empty one.
						$child_html .= sprintf(
							'<li class="%s"><i class="rtcl-icon rtcl-icon-circle"></i><a href="%s"><span class="term-name">%s</span><span class="term-count">%s</span></a></li>',
							intval( $child_trm->count ) > 0 ? 'has-items' : 'no-items',
							esc_url( get_term_link( $child_trm ) ),
							esc_html( $child_trm->name ),
							intval( $child_trm->count )
						);
					}
				}

				$results[] = [
					'name'        => $term->name,
					'description' => $term->description,
					'image'       => $image_html,
					'image_url'   => $image_url,
					'order'       => (int) $order,
					'permalink'   => get_term_link( $term ),
					'count'       => $count,
					'child_html'  => $child_html,
				];

				$child_html = '';

				if ( 'count' == $args['orderby'] ) {
					if ( 'desc' == $args['order'] ) {
						usort( $results, function ( $a, $b ) {
							return $b['count'] - $a['count'];
						} );
					}
					if ( 'asc' == $args['order'] ) {
						usort( $results, function ( $a, $b ) {
							return $a['count'] - $b['count'];
						} );
					}
				}
			}
		endif;

		return $results;
	}

	public function rtcl_gb_all_locations() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'], 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}
		// Booleans arrive from the editor as the strings "true"/"false"; coerce
		// before anything reads them. See `AllLocation::normalize_settings()`.
		$data    = AllLocation::normalize_settings( $_POST['attributes'] );
		$results = self::rtcl_gb_all_location_query( $data );

		if ( empty( $results ) ) {
			wp_send_json_error( "no post found" );
		}

		// The editor renders this HTML directly rather than rebuilding the
		// layouts in React, so the canvas and the published page come from one
		// set of templates and cannot drift apart. The plain `terms` array stays
		// in the payload because it is a shared surface — add-ons and site
		// customisations read it — so this is additive, not a replacement.
		wp_send_json_success(
			[
				'terms' => $results,
				'html'  => AllLocation::render( $data ),
			]
		);
	}

	public function rtcl_gb_get_all_image_size_ajax() {
		global $_wp_additional_image_sizes;
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'] ?? '', 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		$sizes            = [];
		$image_name_sizes = [];
		foreach ( get_intermediate_image_sizes() as $s ) {
			$sizes[ $s ] = [ 0, 0 ];
			if ( in_array( $s, [ 'thumbnail', 'medium', 'medium_large', 'large' ] ) ) {
				$sizes[ $s ][0] = get_option( $s . '_size_w' );
				$sizes[ $s ][1] = get_option( $s . '_size_h' );
			} else {
				if ( isset( $_wp_additional_image_sizes ) && isset( $_wp_additional_image_sizes[ $s ] ) ) {
					$sizes[ $s ] = [ $_wp_additional_image_sizes[ $s ]['width'], $_wp_additional_image_sizes[ $s ]['height'] ];
				}
			}
		}
		foreach ( $sizes as $size => $atts ) {
			$remove_uh_sizes           = str_replace( '_', ' ', $size );
			$remove_uh_sizes           = ucwords( str_replace( '-', ' ', $remove_uh_sizes ) );
			$image_name_sizes[ $size ] = $remove_uh_sizes . ' ' . implode( 'x', $atts );
		}
		// `get_intermediate_image_sizes()` never includes the original, so it has
		// to be added by hand — without it there is no way to pick an uncropped
		// image, which is what a category icon usually wants.
		$image_name_sizes['full']   = __( 'Full Size', 'classified-listing' );
		$image_name_sizes['custom'] = __( 'Custom', 'classified-listing' );

		if ( ! empty( $image_name_sizes ) ) {
			wp_send_json_success( $image_name_sizes );
		} else {
			wp_send_json_error( "no image size" );
		}
		wp_die();
	}

	public function rtcl_gb_listing_promotion_ajax() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'] ?? '', 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}
		$promotions = Options::get_listing_promotions();
		if ( ! empty( $promotions ) ) :
			wp_send_json( $promotions );
		endif;
		wp_die();
	}

	public function rtcl_gb_listing_type_ajax() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'] ?? '', 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		$listing_types_arr = [ "all" => "All" ];
		$listing_types     = Functions::get_listing_types();

		if ( ! empty( $listing_types ) && ! is_wp_error( $listing_types ) ) {
			foreach ( $listing_types as $id => $name ) {
				$listing_types_arr[ $id ] = $name;
			}
		}

		if ( ! empty( $listing_types_arr ) ) :
			wp_send_json( $listing_types_arr );
		endif;
		wp_die();
	}

	public function rtcl_gb_location_ajax() {
		$rtcl_nonce = $_POST['rtcl_nonce']; /* phpcs:ignore WordPress.Security.NonceVerification.Missing */
		if ( ! wp_verify_nonce( $rtcl_nonce, 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		$args = [
			'taxonomy'     => 'rtcl_location',
			'fields'       => 'id=>name',
			'height_empty' => true,
		];

		$location_dropdown = [];
		$terms             = get_terms( $args );
		if ( ! is_wp_error( $terms ) ) {
			foreach ( $terms as $id => $name ) {
				$location_dropdown[ $id ] = $name;
			}
		}

		if ( ! empty( $location_dropdown ) ) :
			wp_send_json( $location_dropdown );
		endif;

		wp_reset_postdata();
		wp_die();
	}

	public static function rtcl_cat_box_query( $data ) {
		$results                    = [];
		$data['sub_category_limit'] = isset( $data['sub_category_limit'] ) ? $data['sub_category_limit'] : 5;
		$data['category_limit']     = isset( $data['category_limit'] ) ? $data['category_limit'] : 8;

		$data['hide_empty']  = $data['hide_empty'] == 'true' ? true : false;
		$data['count_child'] = $data['count_child'] == 'true' ? 1 : 0;
		// Arrives as a real bool from the render callback and as the string
		// 'true'/'false' over AJAX from the editor. `== 'true'` reads both; a
		// plain truthiness check would treat the string 'false' as on.
		// Absent means the attribute default, which is on.
		$data['enable_parent'] = ! isset( $data['enable_parent'] ) || $data['enable_parent'] == 'true';

		if ( ! empty( $data['cats'] ) ) :
			$data['cats'] = wp_list_pluck( $data['cats'], 'value' );
		endif;

		$args = [
			'include'      => isset( $data['cats'] ) ? $data['cats'] : [],
			'hide_empty'   => $data['hide_empty'],
			'taxonomy'     => rtcl()->category,
			'hierarchical' => false,
			'order'        => $data['sortby'] ?: 'asc',
		];

		if ( $data['orderby'] == 'custom' ) {
			$args['orderby']  = 'meta_value_num';
			$args['meta_key'] = '_rtcl_order'; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
		} else {
			$args['orderby'] = $data['orderby'] ?: 'date';
		}

		// Top level categories only, which is what the Elementor widget always
		// does — otherwise child terms come back alongside their parents and get
		// rendered as cards of their own, and style 2's sub-category list is
		// empty because a leaf has no children.
		//
		// Skipped when specific categories were picked: `include` and `parent`
		// are ANDed by get_terms(), so choosing a child category would otherwise
		// return nothing at all.
		if ( $data['enable_parent'] && empty( $args['include'] ) ) {
			$args['parent'] = 0;
		}

		$terms = get_terms( $args );

		if ( ! empty( $data['category_limit'] ) && ! is_wp_error( $terms ) ) {
			$number = $data['category_limit'];
			$terms  = array_slice( $terms, 0, $number );
		}

		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) :
			foreach ( $terms as $term ) {
				$order     = get_term_meta( $term->term_id, '_rtcl_order', true );
				$icon_html = '';
				if ( $data['icon_type'] == 'icon' ) {
					$icon = get_term_meta( $term->term_id, '_rtcl_icon', true );
					if ( $icon && ! is_array( $icon ) ) {
						if ( ! str_contains( $icon, 'fa-' ) ) {
							$icon = 'rtcl-icon-' . $icon;
						}
						$icon_html = sprintf( '<span class="rtcl-icon %s"></span>', $icon );
					}
				} elseif ( $data['icon_type'] == 'image' ) {
					//image size
					// Matches the `image_size` attribute default in ListingCatBox.
					$image_size  = isset( $data['image_size'] ) ? $data['image_size'] : 'full';
					$image_attrs = [ 'alt' => $term->name ];

					if ( 'custom' === $image_size ) {
						// Custom asks for dimensions WordPress has almost certainly
						// never generated a file for. Passing [ w, h ] makes
						// wp_get_attachment_image() hunt for a matching intermediate
						// size and come back empty when there is none — which is why
						// picking Custom rendered no image at all.
						//
						// Serve the original and size it in CSS instead. `cover`
						// crops rather than stretches, which is what a hard-cropped
						// custom size would have looked like.
						$width  = isset( $data['custom_image_width'] ) ? absint( $data['custom_image_width'] ) : 0;
						$height = isset( $data['custom_image_height'] ) ? absint( $data['custom_image_height'] ) : 0;
						$style  = '';

						if ( $width ) {
							$style .= 'width:' . $width . 'px;';
						}
						if ( $height ) {
							$style .= 'height:' . $height . 'px;';
						}
						if ( $style ) {
							$image_attrs['style'] = $style . 'object-fit:cover;';
						}

						$image_size = 'full';
					}
					// Cast: the meta is saved with absint() but older rows can hold
					// the id as a string, and wp_get_attachment_image() wants an
					// int. Elementor's widget casts here too, which is part of
					// why it renders images where this did not.
					$image_id = (int) get_term_meta( $term->term_id, '_rtcl_image', true );

					if ( $image_id ) {
						// Returns '' when the attachment is gone or is not an
						// image. The old code called wp_get_attachment_image_src()
						// and read [0], [1], [2] off the result without checking
						// it — on a `false` return that produced
						// `<img src="" width="" height="">`, which renders as
						// nothing at all and looks exactly like a missing image.
						$icon_html = wp_get_attachment_image(
							$image_id,
							$image_size,
							false,
							$image_attrs
						);
					}

					// No image on the term, or the attachment no longer resolves.
					if ( ! $icon_html ) {
						$icon = get_term_meta( $term->term_id, '_rtcl_icon', true );
						if ( $icon && ! is_array( $icon ) ) {
							if ( ! str_contains( $icon, 'fa-' ) ) {
								$icon = 'rtcl-icon-' . $icon;
							}
							$icon_html = sprintf( '<span class="rtcl-icon %s"></span>', $icon );
						}
					}
				}

				//category children list
				$child_html  = '';
				$child_args  = [
					'taxonomy'   => 'rtcl_category',
					'parent'     => $term->term_id,
					'number'     => $data['sub_category_limit'],
					'hide_empty' => false,
					'orderby'    => 'count',
					'order'      => 'DESC',
				];
				$child_terms = get_terms( $child_args );
				if ( ! empty( $child_terms ) && ! is_wp_error( $child_terms ) ) {
					foreach ( $child_terms as $child_trm ) {
						// Same markup as the Elementor widget's style-2 template
						// so both can share one stylesheet: the count is a pill
						// on the right, and has-items/no-items colours it.
						$child_count = Functions::get_listings_count_by_taxonomy(
							$child_trm->term_id,
							rtcl()->category,
							$data['count_child']
						);

						$child_html .= sprintf(
							'<li class="%s"><i class="rtcl-icon rtcl-icon-circle"></i><a href="%s"><span class="term-name">%s</span><span class="term-count">%s</span></a></li>',
							intval( $child_count ) > 0 ? 'has-items' : 'no-items',
							esc_url( get_term_link( $child_trm ) ),
							esc_html( $child_trm->name ),
							intval( $child_count )
						);
					}
				}
				$count      = Functions::get_listings_count_by_taxonomy(
					$term->term_id,
					rtcl()->category,
					$data['count_child'],
				);
				$results[]  = [
					'name'        => $term->name,
					'description' => $term->description,
					'order'       => (int) $order,
					'permalink'   => get_term_link( $term ),
					'count'       => $count,
					'icon_html'   => $icon_html,
					'child_html'  => $child_html,
					// Empty unless a theme supplies one via `rtcl_category_color`.
					// Resolved here rather than in the template so the editor
					// preview, which reads this same payload over AJAX, colours
					// itself the same as the front end.
					'color'       => Functions::get_category_color( $term->term_id ),
				];
				$child_html = '';

				// if ('count' == $args['orderby']) {
				// 	if ('desc' == $args['order']) {
				// 		usort($results, function ($a, $b) {
				// 			return $b['count'] - $a['count'];
				// 		});
				// 	}
				// 	if ('asc' == $args['order']) {
				// 		usort($results, function ($a, $b) {
				// 			return $a['count'] - $b['count'];
				// 		});
				// 	}
				// }
			}
		endif;

		return $results;
	}

	public function rtcl_gb_listing_cat_box() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'], 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}
		$data    = $_POST['attributes'];
		$results = self::rtcl_cat_box_query( $data );

		if ( ! empty( $results ) ) {
			wp_send_json_success( $results );
		} else {
			wp_send_json_error( "no post found" );
		}
	}

	public function rtcl_gb_categories() {
		if ( ! wp_verify_nonce( $_POST['rtcl_nonce'] ?? '', 'rtcl-nonce' ) ) {
			wp_send_json_error( esc_html__( 'Session Expired!!', 'classified-listing' ) );
		}

		$args = [
			'taxonomy' => 'rtcl_category',
			'fields'   => 'id=>name',
		];

		if ( $_POST['portion'] === 'listing' ) :
			$category_dropdown  = [];
			$args['hide_empty'] = true;
		elseif ( $_POST['portion'] === 'catbox' ) :
			$category_dropdown  = [];
			$args['hide_empty'] = false;
			$args['parent']     = 0;
		else :
			$category_dropdown = [];
		endif;

		$terms = get_terms( $args );

		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $id => $name ) {
				$category_dropdown[ $id ] = html_entity_decode( $name );
			}
		}

		if ( ! empty( $category_dropdown ) ) :
			wp_send_json( $category_dropdown );
		endif;

		wp_reset_postdata();
		wp_die();
	}
}
