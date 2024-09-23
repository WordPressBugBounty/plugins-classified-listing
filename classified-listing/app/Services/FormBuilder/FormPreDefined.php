<?php

namespace Rtcl\Services\FormBuilder;

use Rtcl\Models\Form\Form;

class FormPreDefined {

	public static function blank(): array {
		$availableFields = AvailableFields::get();
		$title = $availableFields['title'];
		$title['uuid'] = uniqid();
		$description = $availableFields['description'];
		$description['uuid'] = uniqid();
		$section = AvailableFields::getSectionField();
		$section['uuid'] = uniqid();
		$section['columns'] = [
			[ 'width' => 100, 'fields' => [ $title['uuid'], $description['uuid'] ] ]
		];

		return [
			'title'      => __( 'Blank Form', 'classified-listing' ),
			'slug'       => 'blank-form',
			'status'     => 'publish',
			'created_by' => get_current_user_id(),
			'settings'   => SettingFields::get(),
			'sections'   => [
				$section
			],
			'fields'     => [
				$title['uuid']       => $title,
				$description['uuid'] => $description
			]
		];
	}

	public static function sample(): array {
		$availableFields = AvailableFields::get();

		$listingType = $availableFields['listing_type'];
		$listingType['uuid'] = uniqid();
		$category = $availableFields['category'];
		$category['uuid'] = uniqid();

		$title = $availableFields['title'];
		$title['uuid'] = uniqid();

		$pricing = $availableFields['pricing'];
		$pricing['uuid'] = uniqid();
		$pricing['logics'] = [
			"status"     => true,
			"conditions" => [
				[
					"value"    => "job",
					"fieldId"  => $listingType['uuid'],
					"operator" => "!="
				]
			]
		];

		$condition = $availableFields['radio'];
		$condition['uuid'] = uniqid();
		$condition['name'] = $condition['element'] . '_' . $condition['uuid'];
		$condition['label'] = __( "Condition", 'classified-listing' );
		$condition['direction'] = "vertical";
		$condition['options'] = [
			[
				'label'      => 'New',
				'value'      => 'new',
				'calc_value' => '',
				'image'      => '',
			],
			[
				'label'      => 'Used',
				'value'      => 'used',
				'calc_value' => '',
				'image'      => '',
			],
		];

		$features = $availableFields['checkbox'];
		$features['uuid'] = uniqid();
		$features['label'] = __( "Features", 'classified-listing' );
		$features['direction'] = "vertical";
		$features['options'] = [
			[
				"image"      => "",
				"label"      => "256GB PCI flash storage",
				"value"      => "256GB_PCI_flash_storage",
				"calc_value" => ""
			],
			[
				"image"      => "",
				"label"      => "Turbo Boost up to 3.1GHz",
				"value"      => "Turbo_Boost_up_to_3.1GHz",
				"calc_value" => ""
			],
			[
				"label"      => "Intel Iris Graphics 6100",
				"value"      => "Intel_Iris_Graphics_6100",
				"calc_value" => ""
			],
			[
				"label"      => "1 Year international warranty",
				"value"      => "1_Year_international_warranty",
				"calc_value" => ""
			],
			[
				"label"      => "10 hour battery life",
				"value"      => "10_hour_battery_life",
				"calc_value" => ""
			],
			[
				"label"      => "Intact Box",
				"value"      => "Intact_Box",
				"calc_value" => ""
			]
		];
		$features['name'] = $features['element'] . '_' . $features['uuid'];

		$description = $availableFields['description'];
		$description['uuid'] = uniqid();
		$description['editor_type'] = "wp_editor";

		$tag = $availableFields['tag'];
		$tag['uuid'] = uniqid();

		$images = $availableFields['images'];
		$images['uuid'] = uniqid();

		$videoUrl = $availableFields['video_urls'];
		$videoUrl['uuid'] = uniqid();


		$location = $availableFields['location'];
		$location['uuid'] = uniqid();
		$location['validation'] = [
			"required" => [
				'value'   => true,
				'message' => __( 'This field is required', 'classified-listing' ),
			]
		];

		$zipcode = $availableFields['zipcode'];
		$zipcode['uuid'] = uniqid();

		$address = $availableFields['address'];
		$address['uuid'] = uniqid();

		$phone = $availableFields['phone'];
		$phone['uuid'] = uniqid();
		$phone['validation'] = [
			"required" => [
				'value'   => true,
				'message' => __( 'This field is required', 'classified-listing' ),
			]
		];


		$whatsapp = $availableFields['whatsapp'];
		$whatsapp['uuid'] = uniqid();

		$email = $availableFields['email'];
		$email['uuid'] = uniqid();
		$email['default_value'] = "{user.user_email}";

		$website = $availableFields['website'];
		$website['uuid'] = uniqid();

		$map = $availableFields['map'];
		$map['uuid'] = uniqid();

		$business_hours = $availableFields['business_hours'];
		$business_hours['uuid'] = uniqid();

		$social_profiles = $availableFields['social_profiles'];
		$social_profiles['uuid'] = uniqid();
		$tnc = $availableFields['terms_and_condition'];
		$tnc['uuid'] = uniqid();


		$basicInfoSection = $productInfoSection = $gallerySection = $videoUrlSection = $bhSection = $sProfileSection = $contactDetailSection = AvailableFields::getSectionField();
		$basicInfoSection['uuid'] = uniqid();
		$basicInfoSection['title'] = __( "Basic Information", 'classified-listing' );
		$basicInfoSection['columns'] = [ [ 'width' => 100, 'fields' => [ $listingType['uuid'], $category['uuid'] ] ] ];

		$productInfoSection['uuid'] = uniqid();
		$productInfoSection['title'] = __( "Product Information", 'classified-listing' );
		$productInfoSection['columns'] = [
			[
				'width'  => 100,
				'fields' => [
					$title['uuid'],
					$pricing['uuid'],
					$condition['uuid'],
					$features['uuid'],
					$description['uuid'],
					$tag['uuid']
				]
			]
		];

		$gallerySection['uuid'] = uniqid();
		$gallerySection['title'] = __( 'Featured & Gallery Images', 'classified-listing' );
		$gallerySection['columns'] = [ [ 'width' => 100, 'fields' => [ $images['uuid'] ] ] ];

		$videoUrlSection['uuid'] = uniqid();
		$videoUrlSection['title'] = __( 'Video URL', 'classified-listing' );
		$videoUrlSection['columns'] = [ [ 'width' => 100, 'fields' => [ $videoUrl['uuid'] ] ] ];

		$contactDetailSection['uuid'] = uniqid();
		$contactDetailSection['title'] = __( 'Contact Details', 'classified-listing' );
		$contactDetailSection['columns'] = [
			[
				'width'  => 100,
				'fields' => [
					$location['uuid'],
					$zipcode['uuid'],
					$address['uuid'],
					$phone['uuid'],
					$whatsapp['uuid'],
					$email['uuid'],
					$website['uuid'],
					$map['uuid']
				]
			]
		];


		$bhSection['uuid'] = uniqid();
		$bhSection['title'] = __( 'Business Hours', 'classified-listing' );
		$bhSection['columns'] = [ [ 'width' => 100, 'fields' => [ $business_hours['uuid'] ] ] ];


		$sProfileSection['uuid'] = uniqid();
		$sProfileSection['title'] = __( 'Social Profiles', 'classified-listing' );
		$sProfileSection['columns'] = [ [ 'width' => 100, 'fields' => [ $social_profiles['uuid'], $tnc['uuid'] ] ] ];


		$default = Form::query()->where( 'default', 1 )->one() ? 0 : 1;

		return [
			'title'      => __( 'Sample Form', 'classified-listing' ),
			'slug'       => 'sample-form',
			'status'     => 'publish',
			'default'    => $default,
			'created_by' => get_current_user_id(),
			'settings'   => SettingFields::get(),
			'fields'     => [
				$listingType['uuid']     => $listingType,
				$category['uuid']        => $category,
				$title['uuid']           => $title,
				$pricing['uuid']         => $pricing,
				$condition['uuid']       => $condition,
				$features['uuid']        => $features,
				$description['uuid']     => $description,
				$tag['uuid']             => $tag,
				$images['uuid']          => $images,
				$videoUrl['uuid']        => $videoUrl,
				$location['uuid']        => $location,
				$zipcode['uuid']         => $zipcode,
				$address['uuid']         => $address,
				$phone['uuid']           => $phone,
				$email['uuid']           => $email,
				$website['uuid']         => $website,
				$map['uuid']             => $map,
				$business_hours['uuid']  => $business_hours,
				$social_profiles['uuid'] => $social_profiles,
				$tnc['uuid']             => $tnc,
			],
			'sections'   => [
				$basicInfoSection,
				$productInfoSection,
				$gallerySection,
				$contactDetailSection,
				$bhSection,
				$sProfileSection
			]
		];

	}
}