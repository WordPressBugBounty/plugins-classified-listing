<?php

namespace Rtcl\Services\FormBuilder\Components;

class SlugBuilderSanitization {

	public static function sanitize( array $raw ): ?array {
		$result = [
			'active'        => !empty( $raw['active'] ),
			'separator'     => isset( $raw['separator'] ) ? substr( sanitize_text_field( $raw['separator'] ), 0, 10 ) : '-',
			'path_segments' => [],
			'slug_fields'   => [],
		];

		foreach ( $raw['path_segments'] ?? [] as $seg ) {
			if ( !is_array( $seg ) ) continue;
			$type = in_array( $seg['type'] ?? '', [ 'category', 'location', 'custom' ], true ) ? $seg['type'] : '';
			if ( !$type ) continue;
			if ( $type === 'custom' ) {
				$result['path_segments'][] = [
					'uuid'  => sanitize_text_field( $seg['uuid'] ?? '' ),
					'type'  => 'custom',
					'field' => '',
					'value' => sanitize_text_field( $seg['value'] ?? '' ),
				];
				continue;
			}
			$field = in_array( $seg['field'] ?? '', [ 'rtcl_category', 'rtcl_location' ], true ) ? $seg['field'] : '';
			if ( !$field ) continue;
			$item_pick = in_array( $seg['item_pick'] ?? '', [ 'all', 'first', 'last' ], true ) ? $seg['item_pick'] : 'all';
			$result['path_segments'][] = [
				'uuid'      => sanitize_text_field( $seg['uuid'] ?? '' ),
				'type'      => $type,
				'field'     => $field,
				'prefix'    => sanitize_text_field( $seg['prefix'] ?? '' ),
				'postfix'   => sanitize_text_field( $seg['postfix'] ?? '' ),
				'item_pick' => $item_pick,
			];
		}

		foreach ( $raw['slug_fields'] ?? [] as $seg ) {
			if ( !is_array( $seg ) ) continue;
			$field_uuid = sanitize_text_field( $seg['field_uuid'] ?? '' );
			if ( !$field_uuid ) continue;
			if ( $field_uuid === '__custom__' ) {
				$result['slug_fields'][] = [
					'uuid'          => sanitize_text_field( $seg['uuid'] ?? '' ),
					'field_uuid'    => '__custom__',
					'field_name'    => '__custom__',
					'field_label'   => sanitize_text_field( $seg['field_label'] ?? '' ),
					'field_element' => 'custom',
					'value'         => sanitize_text_field( $seg['value'] ?? '' ),
					'prefix'        => '',
					'postfix'       => '',
					'separator'     => '',
				];
				continue;
			}
			$item_pick = in_array( $seg['item_pick'] ?? '', [ 'first', 'last', 'all' ], true ) ? $seg['item_pick'] : 'first';
			$result['slug_fields'][] = [
				'uuid'          => sanitize_text_field( $seg['uuid'] ?? '' ),
				'field_uuid'    => $field_uuid,
				'field_name'    => sanitize_key( $seg['field_name'] ?? '' ),
				'field_label'   => sanitize_text_field( $seg['field_label'] ?? '' ),
				'field_element' => sanitize_key( $seg['field_element'] ?? '' ),
				'prefix'        => sanitize_text_field( $seg['prefix'] ?? '' ),
				'postfix'       => sanitize_text_field( $seg['postfix'] ?? '' ),
				'separator'     => substr( sanitize_text_field( $seg['separator'] ?? '' ), 0, 10 ),
				'item_pick'     => $item_pick,
			];
		}

		return $result;
	}
}
