<?php

namespace Rtcl\Emails;

use Rtcl\Helpers\Functions;
use Rtcl\Models\Listing;
use Rtcl\Models\RtclEmail;

class ListingUpdateEmailToAdmin extends RtclEmail {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->id            = 'listing_updated';
		$this->template_html = 'emails/listing-updated-email-to-admin';

		// Call parent constructor.
		parent::__construct();

	}


	/**
	 * Get email subject.
	 * @return string
	 */
	public function get_default_subject() {
		return __( '[{site_title}] {listing_title} - is updated', 'classified-listing' );
	}

	/**
	 * Get email heading.
	 * @return string
	 */
	public function get_default_heading() {
		return esc_html__( 'Listing is updated', 'classified-listing' );
	}

	/**
	 * Trigger the sending of this email.
	 *
	 * @param               $listing_id
	 * @param Listing|false $listing  Listing object.
	 *
	 * @throws \Exception
	 */
	public function trigger( $listing_id, $listing = false ) {
		$this->setup_locale();

		if ( $listing_id && ! is_a( $listing, Listing::class ) ) {
			$listing = new Listing( $listing_id );
		}

		if ( is_a( $listing, Listing::class ) ) {
			$this->object       = $listing;
			$this->placeholders = wp_parse_args( array(
				'{listing_title}' => html_entity_decode($listing->get_the_title())
			), $this->placeholders );
			$this->set_recipient( Functions::get_admin_email_id_s() );
		}

		if ( $this->get_recipient() ) {
			$this->send();
		}

		$this->restore_locale();
	}


	/**
	 * Get content html.
	 * @access public
	 * @return string
	 */
	public function get_content_html() {
		return Functions::get_template_html(
            $this->template_html, array(
                'listing' => $this->object,
                'email'   => $this,
            )
		);
	}

}