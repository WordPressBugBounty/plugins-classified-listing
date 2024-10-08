<?php


namespace Rtcl\Emails;


use Rtcl\Helpers\Functions;
use Rtcl\Models\Listing;
use Rtcl\Models\RtclEmail;

class ListingContactEmailToOwner extends RtclEmail {

	public $data = [];

	function __construct() {
		$this->db            = true;
		$this->id            = 'contact';
		$this->template_html = 'emails/listing-contact-email-to-owner';

		// Call parent constructor.
		parent::__construct();
	}


	/**
	 * Get email subject.
	 *
	 * @return string
	 */
	public function get_default_subject() {
		return __( '[{site_title}] Contact via - {listing_title}', 'classified-listing' );
	}

	/**
	 * Get email heading.
	 *
	 * @return string
	 */
	public function get_default_heading() {
		return esc_html__( 'Thank you for mail', 'classified-listing' );
	}

	/**
	 * Trigger the sending of this email.
	 *
	 * @param               $listing_id
	 * @param array         $data
	 *
	 * @return bool
	 * @throws \Exception
	 */
	public function trigger( $listing_id, $data = [] ) {
		$return = false;
		$this->setup_locale();

		$this->data = $data;
		$listing    = null;

		if ( $listing_id ) {
			$listing = new Listing( $listing_id );
		}

		if ( is_a( $listing, Listing::class ) ) {
			$this->object       = $listing;
			$this->placeholders = wp_parse_args( [ '{listing_title}' => html_entity_decode($listing->get_the_title()) ], $this->placeholders );
			$this->set_recipient( $listing->get_email() ?: $listing->get_owner_email() );
		}

		if ( $this->get_recipient() ) {
			if ( ! empty( $this->data['name'] ) && ! empty( $this->data['email'] ) ) {
				$this->set_replay_to_name( $this->data['name'] );
				$this->set_replay_to_email_address( $this->data['email'] );
			}
			if ( isset( $this->data['attachment'] ) ) {
				$this->set_attachments( $this->data['attachment'] );
			}
			$return = $this->send();
		}

		$this->restore_locale();

		return $return;
	}


	/**
	 * Get content html.
	 *
	 * @access public
	 * @return string
	 */
	public function get_content_html() {
		return Functions::get_template_html(
			$this->template_html, [
				'listing' => $this->object,
				'email'   => $this,
				'data'    => $this->data
			]
		);
	}

}