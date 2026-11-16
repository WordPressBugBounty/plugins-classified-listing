<?php

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\Helpers\CapabilityHelper;

defined( 'ABSPATH' ) || exit;

/**
 * Registers membership/pricing-related abilities.
 */
class MembershipAbilities {

	public static function register() {
		if ( ! post_type_exists( 'rtcl_pricing' ) ) {
			return;
		}

		self::registerGetMemberships();
	}

	private static function registerGetMemberships() {
		wp_register_ability( 'rtcl/get-memberships', [
			'label'       => __( 'Get Memberships', 'classified-listing' ),
			'description' => __( 'Get available pricing/membership plans for classified listings. Returns plan names, prices, durations, and features. Use when the user asks about pricing plans, membership packages, or subscription options.', 'classified-listing' ),
			'category'    => 'rtcl-memberships',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'status' => [
						'type'        => 'string',
						'enum'        => [ 'publish', 'draft' ],
						'description' => __( 'Filter by status. Default: publish.', 'classified-listing' ),
						'default'     => 'publish',
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'total' => [ 'type' => 'integer' ],
					'plans' => [ 'type' => 'array' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$status = isset( $input['status'] ) ? sanitize_key( $input['status'] ) : 'publish';
				if ( ! in_array( $status, [ 'publish', 'draft' ], true ) ) {
					$status = 'publish';
				}

				$query = new \WP_Query( [
					'post_type'      => rtcl()->post_type_pricing,
					'post_status'    => $status,
					'posts_per_page' => 50,
					'orderby'        => 'menu_order',
					'order'          => 'ASC',
				] );

				$plans = [];
				foreach ( $query->posts as $post ) {
					$plans[] = [
						'id'          => $post->ID,
						'title'       => $post->post_title,
						'description' => $post->post_content,
						'price'       => get_post_meta( $post->ID, 'price', true ),
						'duration'    => get_post_meta( $post->ID, 'visible', true ),
						'featured'    => (bool) absint( get_post_meta( $post->ID, 'featured', true ) ),
						'status'      => $post->post_status,
					];
				}

				return [
					'total' => count( $plans ),
					'plans' => $plans,
				];
			},
			'permission_callback' => CapabilityHelper::getReadListingCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [ 'readonly' => true, 'destructive' => false, 'idempotent' => true ],
			],
		] );
	}
}
