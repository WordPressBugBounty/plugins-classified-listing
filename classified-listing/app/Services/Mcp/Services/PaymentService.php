<?php
/**
 * Payment Service - Query and retrieve payment/order data.
 *
 * @package Rtcl\Services\Mcp
 */

namespace Rtcl\Services\Mcp\Services;

use Rtcl\Models\Payment;

defined( 'ABSPATH' ) || exit;

/**
 * Service for querying and retrieving payment data.
 */
class PaymentService {

	/**
	 * Get payment history with filtering.
	 *
	 * @param array $args Query arguments.
	 * @return array Payment history results.
	 */
	public function getPaymentHistory( array $args = [] ): array {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return [
				'error'   => true,
				'code'    => 'permission_denied',
				'message' => __( 'Administrator access required to view payment history.', 'classified-listing' ),
			];
		}

		// Ensure RTCL is active
		if ( ! function_exists( 'rtcl' ) ) {
			return [
				'error'   => true,
				'code'    => 'rtcl_not_active',
				'message' => __( 'Classified Listing plugin is not active.', 'classified-listing' ),
			];
		}

		// Default arguments
		$defaults = [
			'page'        => 1,
			'per_page'    => 20,
			'status'      => '',
			'customer_id' => 0,
			'listing_id'  => 0,
			'date_from'   => '',
			'date_to'     => '',
			'orderby'     => 'date',
			'order'       => 'DESC',
			'search'      => '',
		];

		$args = wp_parse_args( $args, $defaults );

		// Build query args
		$query_args = [
			'post_type'      => rtcl()->post_type_payment,
			'posts_per_page' => min( absint( $args['per_page'] ), 100 ),
			'paged'          => max( 1, absint( $args['page'] ) ),
			'orderby'        => $args['orderby'],
			'order'          => strtoupper( $args['order'] ) === 'ASC' ? 'ASC' : 'DESC',
		];

		// Status filter
		if ( ! empty( $args['status'] ) ) {
			$statuses = is_array( $args['status'] ) ? $args['status'] : [ $args['status'] ];
			// Ensure status has rtcl- prefix
			$statuses = array_map( function( $status ) {
				return strpos( $status, 'rtcl-' ) === 0 ? $status : 'rtcl-' . $status;
			}, $statuses );
			$query_args['post_status'] = $statuses;
		} else {
			// Get all payment statuses
			$query_args['post_status'] = array_keys( $this->getPaymentStatuses() );
		}

		// Meta query for filters
		$meta_query = [];

		// Customer filter
		if ( ! empty( $args['customer_id'] ) ) {
			$meta_query[] = [
				'key'     => 'customer_id',
				'value'   => absint( $args['customer_id'] ),
				'compare' => '=',
			];
		}

		// Listing filter
		if ( ! empty( $args['listing_id'] ) ) {
			$meta_query[] = [
				'key'     => 'listing_id',
				'value'   => absint( $args['listing_id'] ),
				'compare' => '=',
			];
		}

		if ( ! empty( $meta_query ) ) {
			$query_args['meta_query'] = $meta_query;
		}

		// Date range filter
		if ( ! empty( $args['date_from'] ) || ! empty( $args['date_to'] ) ) {
			$date_query = [];

			if ( ! empty( $args['date_from'] ) ) {
				$date_query['after'] = $args['date_from'];
			}

			if ( ! empty( $args['date_to'] ) ) {
				$date_query['before'] = $args['date_to'];
				$date_query['inclusive'] = true;
			}

			$query_args['date_query'] = [ $date_query ];
		}

		// Search
		if ( ! empty( $args['search'] ) ) {
			$query_args['s'] = sanitize_text_field( $args['search'] );
		}

		// Execute query
		$query = new \WP_Query( $query_args );

		// Format results
		$payments = [];
		foreach ( $query->posts as $post ) {
			$order = rtcl()->factory->get_order( $post->ID );
			if ( $order && $order->exists() ) {
				$payments[] = $this->formatPaymentSummary( $order );
			}
		}

		return [
			'payments'   => $payments,
			'total'      => (int) $query->found_posts,
			'page'       => (int) $args['page'],
			'per_page'   => (int) $args['per_page'],
			'total_pages' => (int) $query->max_num_pages,
			'filters'    => [
				'status'      => $args['status'],
				'customer_id' => $args['customer_id'],
				'listing_id'  => $args['listing_id'],
				'date_from'   => $args['date_from'],
				'date_to'     => $args['date_to'],
			],
		];
	}

	/**
	 * Get single payment details.
	 *
	 * @param int $payment_id Payment ID.
	 * @return array|Payment Payment data or error.
	 */
	public function getPayment( int $payment_id ): array {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return [
				'error'   => true,
				'code'    => 'permission_denied',
				'message' => __( 'Administrator access required to view payment details.', 'classified-listing' ),
			];
		}

		// Ensure RTCL is active
		if ( ! function_exists( 'rtcl' ) ) {
			return [
				'error'   => true,
				'code'    => 'rtcl_not_active',
				'message' => __( 'Classified Listing plugin is not active.', 'classified-listing' ),
			];
		}

		$order = rtcl()->factory->get_order( $payment_id );

		if ( ! $order || ! $order->exists() ) {
			return [
				'error'   => true,
				'code'    => 'payment_not_found',
				'message' => sprintf(
					/* translators: %d: payment ID */
					__( 'Payment #%d not found.', 'classified-listing' ),
					$payment_id
				),
			];
		}

		return $this->formatPaymentDetails( $order );
	}

	/**
	 * Get payment statistics with optional date filtering.
	 *
	 * @param array $args Query arguments.
	 * @return array Statistics data.
	 */
	public function getPaymentStatistics( array $args = [] ): array {
		// Check admin capability
		if ( ! current_user_can( 'manage_options' ) ) {
			return [
				'error'   => true,
				'code'    => 'permission_denied',
				'message' => __( 'Administrator access required to view payment statistics.', 'classified-listing' ),
			];
		}

		// Ensure RTCL is active
		if ( ! function_exists( 'rtcl' ) ) {
			return [
				'error'   => true,
				'code'    => 'rtcl_not_active',
				'message' => __( 'Classified Listing plugin is not active.', 'classified-listing' ),
			];
		}

		$defaults = [
			'date_from' => '',
			'date_to'   => '',
		];

		$args = wp_parse_args( $args, $defaults );

		// Get all statuses
		$statuses = $this->getPaymentStatuses();

		// Build base query args
		$base_args = [
			'post_type'      => rtcl()->post_type_payment,
			'posts_per_page' => -1,
			'fields'         => 'ids',
		];

		// Date range filter
		if ( ! empty( $args['date_from'] ) || ! empty( $args['date_to'] ) ) {
			$date_query = [];

			if ( ! empty( $args['date_from'] ) ) {
				$date_query['after'] = $args['date_from'];
			}

			if ( ! empty( $args['date_to'] ) ) {
				$date_query['before'] = $args['date_to'];
				$date_query['inclusive'] = true;
			}

			$base_args['date_query'] = [ $date_query ];
		}

		// Count by status
		$status_counts = [];
		$total_count = 0;

		foreach ( array_keys( $statuses ) as $status ) {
			$query_args = array_merge( $base_args, [ 'post_status' => $status ] );
			$query = new \WP_Query( $query_args );
			$count = $query->found_posts;
			$status_counts[ str_replace( 'rtcl-', '', $status ) ] = $count;
			$total_count += $count;
		}

		// Calculate total revenue (completed payments)
		$completed_args = array_merge( $base_args, [
			'post_status'    => 'rtcl-completed',
			'posts_per_page' => -1,
			'fields'         => 'ids',
		] );

		$completed_query = new \WP_Query( $completed_args );
		$total_revenue = 0;
		$currency = '';

		foreach ( $completed_query->posts as $payment_id ) {
			$order = rtcl()->factory->get_order( $payment_id );
			if ( $order && $order->exists() ) {
				$total_revenue += (float) $order->get_total();
				if ( empty( $currency ) ) {
					$currency = $order->get_currency();
				}
			}
		}

		// Get recent payments
		$recent_args = array_merge( $base_args, [
			'post_status'    => array_keys( $statuses ),
			'posts_per_page' => 5,
			'fields'         => 'ids',
			'orderby'        => 'date',
			'order'          => 'DESC',
		] );

		$recent_query = new \WP_Query( $recent_args );
		$recent_payments = [];

		foreach ( $recent_query->posts as $payment_id ) {
			$order = rtcl()->factory->get_order( $payment_id );
			if ( $order && $order->exists() ) {
				$recent_payments[] = $this->formatPaymentSummary( $order );
			}
		}

		return [
			'statistics' => [
				'total_payments'   => $total_count,
				'total_revenue'    => $total_revenue,
				'currency'         => $currency ?: 'USD',
				'by_status'        => $status_counts,
			],
			'filters' => [
				'date_from' => $args['date_from'],
				'date_to'   => $args['date_to'],
			],
			'recent_payments' => $recent_payments,
		];
	}

	/**
	 * Get all available payment statuses.
	 *
	 * @return array Status list with labels.
	 */
	public function getPaymentStatuses(): array {
		if ( ! function_exists( 'rtcl' ) || ! class_exists( 'Rtcl\Resources\Options' ) ) {
			return [
				'rtcl-created'    => __( 'Created', 'classified-listing' ),
				'rtcl-pending'    => __( 'Pending', 'classified-listing' ),
				'rtcl-processing' => __( 'Processing', 'classified-listing' ),
				'rtcl-on-hold'    => __( 'On Hold', 'classified-listing' ),
				'rtcl-completed'  => __( 'Completed', 'classified-listing' ),
				'rtcl-failed'     => __( 'Failed', 'classified-listing' ),
				'rtcl-cancelled'  => __( 'Cancelled', 'classified-listing' ),
				'rtcl-refunded'   => __( 'Refunded', 'classified-listing' ),
			];
		}

		return \Rtcl\Resources\Options::get_payment_status_list();
	}

	/**
	 * Format payment summary for list views.
	 *
	 * @param Payment $order Payment object.
	 * @return array Formatted summary.
	 */
	private function formatPaymentSummary( Payment $order ): array {
		return [
			'id'              => $order->get_id(),
			'order_number'    => $order->get_order_number(),
			'status'          => str_replace( 'rtcl-', '', $order->get_status() ),
			'status_label'    => $this->getStatusLabel( $order->get_status() ),
			'total'           => (float) $order->get_total(),
			'currency'        => $order->get_currency(),
			'formatted_total' => $this->formatPrice( $order->get_total(), $order->get_currency() ),
			'customer_id'     => absint( $order->get_customer_id() ), // Output schema is integer; legacy/membership rows can be null.
			'customer_name'   => $order->get_customer_full_name(),
			'customer_email'  => $order->get_customer_email(),
			'listing_id'      => absint( $order->get_listing_id() ),
			'listing_title'   => $order->get_listing_title(),
			'payment_method'  => $order->get_payment_method_title(),
			'created_at'      => get_the_date( 'Y-m-d H:i:s', $order->get_id() ),
			'date_paid'       => $order->get_date_paid() ?: null,
		];
	}

	/**
	 * Format full payment details.
	 *
	 * @param Payment $order Payment object.
	 * @return array Formatted details.
	 */
	private function formatPaymentDetails( Payment $order ): array {
		$details = $this->formatPaymentSummary( $order );

		// Add additional details
		$details['order_key']      = $order->get_order_key();
		$details['transaction_id'] = $order->get_transaction_id();
		$details['is_applied']     = $order->is_applied();
		$details['is_membership']  = $order->is_membership();
		$details['needs_payment']  = $order->needs_payment();
		$details['pricing_id']     = absint( $order->get_pricing_id() );
		$details['customer_ip']    = $order->get_customer_ip_address();

		// Billing information
		$details['billing'] = [
			'first_name' => $order->get_billing_first_name(),
			'last_name'  => $order->get_billing_last_name(),
			'company'    => $order->get_billing_company(),
			'address_1'  => $order->get_billing_address_1(),
			'address_2'  => $order->get_billing_address_2(),
			'city'       => $order->get_billing_city(),
			'state'      => $order->get_billing_state(),
			'postcode'   => $order->get_billing_postcode(),
			'country'    => $order->get_billing_country(),
			'email'      => $order->get_billing_email(),
			'phone'      => $order->get_billing_phone(),
		];

		// Payment method details
		$details['payment_method_id'] = $order->get_payment_method();

		// Pricing info
		if ( $order->pricing && method_exists( $order->pricing, 'getTitle' ) ) {
			$details['pricing_title'] = $order->pricing->getTitle();
		}

		// Listing URL
		if ( $order->get_listing_id() ) {
			// Both return false/null when the listing was deleted.
			$details['listing_url'] = get_permalink( $order->get_listing_id() ) ?: null;
			$details['listing_edit_url'] = get_edit_post_link( $order->get_listing_id(), 'raw' ) ?: null;
		}

		// Admin URLs
		$details['admin_url'] = get_edit_post_link( $order->get_id(), 'raw' ) ?: null;

		return $details;
	}

	/**
	 * Get status label from status key.
	 *
	 * @param string $status Status key.
	 * @return string Status label.
	 */
	private function getStatusLabel( string $status ): string {
		$statuses = $this->getPaymentStatuses();
		return $statuses[ $status ] ?? ucfirst( str_replace( 'rtcl-', '', $status ) );
	}

	/**
	 * Format price with currency.
	 *
	 * @param float  $price    Price amount.
	 * @param string $currency Currency code.
	 * @return string Formatted price.
	 */
	private function formatPrice( float $price, string $currency ): string {
		// method_exists() throws on null under PHP 8; rtcl()->functions is not defined on current versions.
		$functions = function_exists( 'rtcl' ) ? rtcl()->functions : null;
		if ( is_object( $functions ) && method_exists( $functions, 'price' ) ) {
			return $functions->price( $price, $currency );
		}

		return sprintf( '%s %s', $currency, number_format( $price, 2 ) );
	}
}
