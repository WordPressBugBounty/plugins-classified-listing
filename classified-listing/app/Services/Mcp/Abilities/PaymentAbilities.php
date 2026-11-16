<?php
/**
 * Payment Abilities - MCP abilities for payment/order management.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Abilities;

use Rtcl\Services\Mcp\ErrorCodes;
use Rtcl\Services\Mcp\Helpers\CapabilityHelper;
use Rtcl\Services\Mcp\Services\PaymentService;

defined( 'ABSPATH' ) || exit;

/**
 * Register payment management MCP abilities.
 */
class PaymentAbilities {

	/**
	 * Register all payment abilities.
	 */
	public static function register() {
		// Only register if payment post type exists
		if ( ! function_exists( 'rtcl' ) || ! post_type_exists( rtcl()->post_type_payment ) ) {
			return;
		}

		self::registerGetPaymentHistory();
		self::registerGetPayment();
		self::registerGetPaymentStatistics();
		self::registerGetPaymentStatuses();
	}

	/**
	 * Register get payment history ability.
	 */
	private static function registerGetPaymentHistory() {
		wp_register_ability( 'rtcl/get-payment-history', [
			'label'       => __( 'Get Payment History', 'classified-listing' ),
			'description' => __( 'Get payment/order history with filtering by date, status, customer, or listing. Use date_from and date_to for date range filtering (YYYY-MM-DD format). Returns paginated results with payment summaries.', 'classified-listing' ),
			'category'    => 'rtcl-payments',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'page' => [
						'type'        => 'integer',
						'description' => __( 'Page number (default: 1).', 'classified-listing' ),
						'default'     => 1,
					],
					'per_page' => [
						'type'        => 'integer',
						'description' => __( 'Results per page, max 100 (default: 20).', 'classified-listing' ),
						'default'     => 20,
					],
					'status' => [
						'type'        => [ 'string', 'array' ],
						'description' => __( 'Filter by status: created, pending, processing, on-hold, completed, failed, cancelled, refunded. Can be single status or array of statuses.', 'classified-listing' ),
					],
					'customer_id' => [
						'type'        => 'integer',
						'description' => __( 'Filter by WordPress user ID.', 'classified-listing' ),
					],
					'listing_id' => [
						'type'        => 'integer',
						'description' => __( 'Filter by associated listing ID.', 'classified-listing' ),
					],
					'date_from' => [
						'type'        => 'string',
						'description' => __( 'Filter payments from this date (YYYY-MM-DD format). Example: 2024-01-01', 'classified-listing' ),
					],
					'date_to' => [
						'type'        => 'string',
						'description' => __( 'Filter payments up to this date (YYYY-MM-DD format). Example: 2024-12-31', 'classified-listing' ),
					],
					'orderby' => [
						'type'        => 'string',
						'enum'        => [ 'date', 'modified', 'ID', 'title' ],
						'description' => __( 'Order results by field (default: date).', 'classified-listing' ),
						'default'     => 'date',
					],
					'order' => [
						'type'        => 'string',
						'enum'        => [ 'ASC', 'DESC' ],
						'description' => __( 'Sort order (default: DESC).', 'classified-listing' ),
						'default'     => 'DESC',
					],
					'search' => [
						'type'        => 'string',
						'description' => __( 'Search payments by keyword.', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'payments' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'id'              => [ 'type' => 'integer' ],
								'order_number'    => [ 'type' => 'string' ],
								'status'          => [ 'type' => 'string' ],
								'status_label'    => [ 'type' => 'string' ],
								'total'           => [ 'type' => 'number' ],
								'currency'        => [ 'type' => 'string' ],
								'formatted_total' => [ 'type' => 'string' ],
								'customer_id'     => [ 'type' => 'integer' ],
								'customer_name'   => [ 'type' => [ 'string', 'null' ] ],
								'customer_email'  => [ 'type' => [ 'string', 'null' ] ],
								'listing_id'      => [ 'type' => 'integer' ],
								'listing_title'   => [ 'type' => [ 'string', 'null' ] ],
								'payment_method'  => [ 'type' => [ 'string', 'null' ] ],
								'created_at'      => [ 'type' => 'string' ],
								'date_paid'       => [ 'type' => [ 'string', 'null' ] ],
							],
						],
					],
					'total'       => [ 'type' => 'integer' ],
					'page'        => [ 'type' => 'integer' ],
					'per_page'    => [ 'type' => 'integer' ],
					'total_pages' => [ 'type' => 'integer' ],
					'filters'     => [ 'type' => 'object' ],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PaymentService();

				$args = [
					'page'        => isset( $input['page'] ) ? absint( $input['page'] ) : 1,
					'per_page'    => isset( $input['per_page'] ) ? absint( $input['per_page'] ) : 20,
					'status'      => $input['status'] ?? '',
					'customer_id' => isset( $input['customer_id'] ) ? absint( $input['customer_id'] ) : 0,
					'listing_id'  => isset( $input['listing_id'] ) ? absint( $input['listing_id'] ) : 0,
					'date_from'   => isset( $input['date_from'] ) ? sanitize_text_field( $input['date_from'] ) : '',
					'date_to'     => isset( $input['date_to'] ) ? sanitize_text_field( $input['date_to'] ) : '',
					'orderby'     => isset( $input['orderby'] ) ? sanitize_key( $input['orderby'] ) : 'date',
					'order'       => isset( $input['order'] ) ? strtoupper( sanitize_key( $input['order'] ) ) : 'DESC',
					'search'      => isset( $input['search'] ) ? sanitize_text_field( $input['search'] ) : '',
				];

				$result = $service->getPaymentHistory( $args );

				if ( isset( $result['error'] ) && $result['error'] ) {
					$code = $result['code'] ?? ErrorCodes::INTERNAL_ERROR;
					$message = $result['message'] ?? __( 'An unknown error occurred.', 'classified-listing' );
					return new \WP_Error( $code, $message );
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register get single payment ability.
	 */
	private static function registerGetPayment() {
		wp_register_ability( 'rtcl/get-payment', [
			'label'       => __( 'Get Payment Details', 'classified-listing' ),
			'description' => __( 'Get full details of a specific payment/order by ID. Returns complete payment information including billing details, transaction info, and associated listing.', 'classified-listing' ),
			'category'    => 'rtcl-payments',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'payment_id' => [
						'type'        => 'integer',
						'description' => __( 'Payment/order ID.', 'classified-listing' ),
					],
				],
				'required' => [ 'payment_id' ],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'id'              => [ 'type' => 'integer' ],
					'order_number'    => [ 'type' => 'string' ],
					'order_key'       => [ 'type' => 'string' ],
					'status'          => [ 'type' => 'string' ],
					'status_label'    => [ 'type' => 'string' ],
					'total'           => [ 'type' => 'number' ],
					'currency'        => [ 'type' => 'string' ],
					'formatted_total' => [ 'type' => 'string' ],
					'customer_id'     => [ 'type' => 'integer' ],
					'customer_name'   => [ 'type' => [ 'string', 'null' ] ],
					'customer_email'  => [ 'type' => [ 'string', 'null' ] ],
					'customer_ip'     => [ 'type' => 'string' ],
					'listing_id'      => [ 'type' => 'integer' ],
					'listing_title'   => [ 'type' => [ 'string', 'null' ] ],
					'listing_url'     => [ 'type' => [ 'string', 'null' ] ],
					'payment_method'  => [ 'type' => [ 'string', 'null' ] ],
					'payment_method_id' => [ 'type' => 'string' ],
					'transaction_id'  => [ 'type' => 'string' ],
					'pricing_id'      => [ 'type' => 'integer' ],
					'pricing_title'   => [ 'type' => [ 'string', 'null' ] ],
					'is_applied'      => [ 'type' => 'boolean' ],
					'is_membership'   => [ 'type' => 'boolean' ],
					'needs_payment'   => [ 'type' => 'boolean' ],
					'billing'         => [
						'type'       => 'object',
						'properties' => [
							'first_name' => [ 'type' => 'string' ],
							'last_name'  => [ 'type' => 'string' ],
							'company'    => [ 'type' => 'string' ],
							'address_1'  => [ 'type' => 'string' ],
							'address_2'  => [ 'type' => 'string' ],
							'city'       => [ 'type' => 'string' ],
							'state'      => [ 'type' => 'string' ],
							'postcode'   => [ 'type' => 'string' ],
							'country'    => [ 'type' => 'string' ],
							'email'      => [ 'type' => 'string' ],
							'phone'      => [ 'type' => 'string' ],
						],
					],
					'created_at'      => [ 'type' => 'string' ],
					'date_paid'       => [ 'type' => [ 'string', 'null' ] ],
					'admin_url'       => [ 'type' => [ 'string', 'null' ] ],
				],
			],
			'execute_callback' => function ( $input ) {
				$payment_id = isset( $input['payment_id'] ) ? absint( $input['payment_id'] ) : 0;

				if ( ! $payment_id ) {
					return new \WP_Error( 'missing_payment_id', __( 'Payment ID is required.', 'classified-listing' ) );
				}

				$service = new PaymentService();
				$result = $service->getPayment( $payment_id );

				if ( isset( $result['error'] ) && $result['error'] ) {
					$code = $result['code'] ?? ErrorCodes::INTERNAL_ERROR;
					$message = $result['message'] ?? __( 'An unknown error occurred.', 'classified-listing' );
					return new \WP_Error( $code, $message );
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register get payment statistics ability.
	 */
	private static function registerGetPaymentStatistics() {
		wp_register_ability( 'rtcl/get-payment-statistics', [
			'label'       => __( 'Get Payment Statistics', 'classified-listing' ),
			'description' => __( 'Get aggregate payment statistics including total revenue, counts by status, and recent payments. Use date_from and date_to for date range filtering (YYYY-MM-DD format).', 'classified-listing' ),
			'category'    => 'rtcl-payments',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [
					'date_from' => [
						'type'        => 'string',
						'description' => __( 'Filter statistics from this date (YYYY-MM-DD format).', 'classified-listing' ),
					],
					'date_to' => [
						'type'        => 'string',
						'description' => __( 'Filter statistics up to this date (YYYY-MM-DD format).', 'classified-listing' ),
					],
				],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'statistics' => [
						'type'       => 'object',
						'properties' => [
							'total_payments'   => [ 'type' => 'integer' ],
							'total_revenue'    => [ 'type' => 'number' ],
							'currency'         => [ 'type' => 'string' ],
							'by_status'        => [
								'type'       => 'object',
								'properties' => [
									'created'    => [ 'type' => 'integer' ],
									'pending'    => [ 'type' => 'integer' ],
									'processing' => [ 'type' => 'integer' ],
									'on-hold'    => [ 'type' => 'integer' ],
									'completed'  => [ 'type' => 'integer' ],
									'failed'     => [ 'type' => 'integer' ],
									'cancelled'  => [ 'type' => 'integer' ],
									'refunded'   => [ 'type' => 'integer' ],
								],
							],
						],
					],
					'filters' => [
						'type'       => 'object',
						'properties' => [
							'date_from' => [ 'type' => 'string' ],
							'date_to'   => [ 'type' => 'string' ],
						],
					],
					'recent_payments' => [
						'type'  => 'array',
						'items' => [ 'type' => 'object' ],
					],
				],
			],
			'execute_callback' => function ( $input ) {
				$service = new PaymentService();

				$args = [
					'date_from' => isset( $input['date_from'] ) ? sanitize_text_field( $input['date_from'] ) : '',
					'date_to'   => isset( $input['date_to'] ) ? sanitize_text_field( $input['date_to'] ) : '',
				];

				$result = $service->getPaymentStatistics( $args );

				if ( isset( $result['error'] ) && $result['error'] ) {
					$code = $result['code'] ?? ErrorCodes::INTERNAL_ERROR;
					$message = $result['message'] ?? __( 'An unknown error occurred.', 'classified-listing' );
					return new \WP_Error( $code, $message );
				}

				return $result;
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}

	/**
	 * Register get payment statuses ability.
	 */
	private static function registerGetPaymentStatuses() {
		wp_register_ability( 'rtcl/get-payment-statuses', [
			'label'       => __( 'Get Payment Statuses', 'classified-listing' ),
			'description' => __( 'Get all available payment statuses with their labels. Useful for understanding status options when filtering payment history.', 'classified-listing' ),
			'category'    => 'rtcl-payments',
			'input_schema' => [
				'type'       => 'object',
				'properties' => [],
			],
			'output_schema' => [
				'type'       => 'object',
				'properties' => [
					'statuses' => [
						'type'  => 'array',
						'items' => [
							'type'       => 'object',
							'properties' => [
								'value' => [ 'type' => 'string' ],
								'label' => [ 'type' => 'string' ],
							],
						],
					],
				],
			],
			'execute_callback' => function () {
				$service = new PaymentService();
				$statuses = $service->getPaymentStatuses();

				$formatted = [];
				foreach ( $statuses as $key => $label ) {
					$formatted[] = [
						'value' => str_replace( 'rtcl-', '', $key ),
						'label' => $label,
					];
				}

				return [
					'statuses' => $formatted,
				];
			},
			'permission_callback' => CapabilityHelper::getManageOptionsCallback(),
			'meta' => [
				'public' => true,
				'mcp'    => [ 'public' => true ],
				'annotations' => [
					'readonly'    => true,
					'destructive' => false,
					'idempotent'  => true,
				],
			],
		] );
	}
}
