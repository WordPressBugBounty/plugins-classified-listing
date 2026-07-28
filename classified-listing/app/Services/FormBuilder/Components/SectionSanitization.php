<?php

namespace Rtcl\Services\FormBuilder\Components;

use Rtcl\Services\FormBuilder\AvailableFields;

class SectionSanitization {

	public $sections = [];
	public $fields   = [];

	public function __construct( $sections, $fields ) {
		$this->sections = ! empty( $sections ) ? $sections : [];
		$this->fields   = $fields;
	}

	public function validated() {
		return $this->sections;
	}

	public function get(): array {
		if ( ! empty( $this->sections ) ) {
			$sections = [];
			foreach ( $this->sections as $section ) {
				if ( empty( $section['element'] ) ) {
					continue;
				}
				$sanitizeSection = $this->sanitizeSection( $section );
				if ( ! empty( $sanitizeSection ) ) {
					$sections[] = $sanitizeSection;
				}
			}

			$this->sections = $sections;
		}

		return $this->sections;
	}

	private function sanitizeSection( $rawSection ): array {
		$defaultValues = AvailableFields::getSectionField();
		if ( empty( $defaultValues ) ) {
			return [];
		}
		$section = wp_parse_args( $rawSection, $defaultValues );

		if ( isset( $section['editor'] ) ) {
			unset( $section['editor'] );
		}
		$allowedDirections = [ 'row', 'column', 'row-reverse', 'column-reverse' ];
		$allowedAlignItems = [ 'start', 'center', 'end', 'stretch' ];
		if ( isset( $section['direction'] ) ) {
			$dir = sanitize_text_field( $section['direction'] );
			$section['direction'] = in_array( $dir, $allowedDirections, true ) ? $dir : 'row';
		}
		if ( isset( $section['align_items'] ) ) {
			$ai = sanitize_text_field( $section['align_items'] );
			$section['align_items'] = in_array( $ai, $allowedAlignItems, true ) ? $ai : 'stretch';
		}
		if ( isset( $section['row_gap'] ) ) {
			$section['row_gap'] = absint( $section['row_gap'] );
		}
		if ( isset( $section['column_gap'] ) ) {
			$section['column_gap'] = absint( $section['column_gap'] );
		}
		if ( ! isset( $section['wrap'] ) || ! in_array( $section['wrap'], [ 'wrap', 'nowrap' ], true ) ) {
			unset( $section['wrap'] );
		}

		// Responsive overrides for the section: `_md` (tablet) / `_sm` (mobile).
		foreach ( [ '_md', '_sm' ] as $sfx ) {
			if ( isset( $section[ 'direction' . $sfx ] ) ) {
				$d = sanitize_text_field( $section[ 'direction' . $sfx ] );
				if ( in_array( $d, $allowedDirections, true ) ) {
					$section[ 'direction' . $sfx ] = $d;
				} else {
					unset( $section[ 'direction' . $sfx ] );
				}
			}
			if ( isset( $section[ 'align_items' . $sfx ] ) ) {
				$a = sanitize_text_field( $section[ 'align_items' . $sfx ] );
				if ( in_array( $a, $allowedAlignItems, true ) ) {
					$section[ 'align_items' . $sfx ] = $a;
				} else {
					unset( $section[ 'align_items' . $sfx ] );
				}
			}
			if ( isset( $section[ 'wrap' . $sfx ] ) && ! in_array( $section[ 'wrap' . $sfx ], [ 'wrap', 'nowrap' ], true ) ) {
				unset( $section[ 'wrap' . $sfx ] );
			}
			if ( isset( $section[ 'row_gap' . $sfx ] ) && $section[ 'row_gap' . $sfx ] !== '' ) {
				$section[ 'row_gap' . $sfx ] = absint( $section[ 'row_gap' . $sfx ] );
			}
			if ( isset( $section[ 'column_gap' . $sfx ] ) && $section[ 'column_gap' . $sfx ] !== '' ) {
				$section[ 'column_gap' . $sfx ] = absint( $section[ 'column_gap' . $sfx ] );
			}
		}

		if ( ! empty( $section['containers'] ) ) {
			foreach ( $section['containers'] as $columnIndex => $column ) {
				// Strip JS-only meta keys before saving
				$section['containers'][ $columnIndex ] = array_diff_key( $column, array_flip( [ 'element', 'uuid', '_label' ] ) );
				$column                                 = $section['containers'][ $columnIndex ];
				if($column['width']){
					$section['containers'][ $columnIndex ]['width'] = absint( $column['width'] );
				}
				foreach ( [ 'width_md', 'width_sm' ] as $wKey ) {
					if ( isset( $column[ $wKey ] ) && $column[ $wKey ] !== '' ) {
						$section['containers'][ $columnIndex ][ $wKey ] = absint( $column[ $wKey ] );
					}
				}
				if ( isset( $column['title'] ) ) {
					$section['containers'][ $columnIndex ]['title'] = sanitize_text_field( $column['title'] );
				}
				if ( isset( $column['id'] ) ) {
					$section['containers'][ $columnIndex ]['id'] = sanitize_text_field( $column['id'] );
				}
				if ( isset( $column['css_class'] ) ) {
					$section['containers'][ $columnIndex ]['css_class'] = sanitize_text_field( $column['css_class'] );
				}
				if ( isset( $column['hide_title'] ) ) {
					$section['containers'][ $columnIndex ]['hide_title'] = (bool) $column['hide_title'];
				}
				$allowedDirections = [ 'row', 'column', 'row-reverse', 'column-reverse' ];
				$allowedAlignItems = [ 'start', 'center', 'end', 'stretch' ];
				if ( isset( $column['direction'] ) ) {
					$dir = sanitize_text_field( $column['direction'] );
					$section['containers'][ $columnIndex ]['direction'] = in_array( $dir, $allowedDirections, true ) ? $dir : 'column';
				}
				if ( isset( $column['align_items'] ) ) {
					$ai = sanitize_text_field( $column['align_items'] );
					$section['containers'][ $columnIndex ]['align_items'] = in_array( $ai, $allowedAlignItems, true ) ? $ai : 'stretch';
				}
				if ( isset( $column['row_gap'] ) ) {
					$section['containers'][ $columnIndex ]['row_gap'] = absint( $column['row_gap'] );
				}
				if ( isset( $column['column_gap'] ) ) {
					$section['containers'][ $columnIndex ]['column_gap'] = absint( $column['column_gap'] );
				}
				if ( isset( $column['wrap'] ) && in_array( $column['wrap'], [ 'wrap', 'nowrap' ], true ) ) {
					$section['containers'][ $columnIndex ]['wrap'] = $column['wrap'];
				} else {
					unset( $section['containers'][ $columnIndex ]['wrap'] );
				}
				// Responsive overrides for the container: `_md` (tablet) / `_sm` (mobile).
				foreach ( [ '_md', '_sm' ] as $sfx ) {
					if ( isset( $column[ 'direction' . $sfx ] ) ) {
						$d = sanitize_text_field( $column[ 'direction' . $sfx ] );
						if ( in_array( $d, $allowedDirections, true ) ) {
							$section['containers'][ $columnIndex ][ 'direction' . $sfx ] = $d;
						} else {
							unset( $section['containers'][ $columnIndex ][ 'direction' . $sfx ] );
						}
					}
					if ( isset( $column[ 'align_items' . $sfx ] ) ) {
						$a = sanitize_text_field( $column[ 'align_items' . $sfx ] );
						if ( in_array( $a, $allowedAlignItems, true ) ) {
							$section['containers'][ $columnIndex ][ 'align_items' . $sfx ] = $a;
						} else {
							unset( $section['containers'][ $columnIndex ][ 'align_items' . $sfx ] );
						}
					}
					if ( isset( $column[ 'wrap' . $sfx ] ) && ! in_array( $column[ 'wrap' . $sfx ], [ 'wrap', 'nowrap' ], true ) ) {
						unset( $section['containers'][ $columnIndex ][ 'wrap' . $sfx ] );
					}
					if ( isset( $column[ 'row_gap' . $sfx ] ) && $column[ 'row_gap' . $sfx ] !== '' ) {
						$section['containers'][ $columnIndex ][ 'row_gap' . $sfx ] = absint( $column[ 'row_gap' . $sfx ] );
					}
					if ( isset( $column[ 'column_gap' . $sfx ] ) && $column[ 'column_gap' . $sfx ] !== '' ) {
						$section['containers'][ $columnIndex ][ 'column_gap' . $sfx ] = absint( $column[ 'column_gap' . $sfx ] );
					}
				}
				if ( ! empty( $column['fields'] ) ) {
					foreach ( $column['fields'] as $fieldIndex => $fieldId ) {
						$_fieldId = sanitize_text_field( $fieldId );
						if ( ! empty( $this->fields[ $_fieldId ] ) ) {
							$section['containers'][ $columnIndex ]['fields'][ $fieldIndex ] = $_fieldId;
						}
					}
				} else {
					$section['containers'][ $columnIndex ]['fields'] = [];
				}
			}
		}

		foreach ( $section as $sectionKey => $value ) {
			if ( $sectionKey === 'logics' ) {
				if ( isset( $value['status'] ) && in_array( $value['status'], [ 'true', 'false' ], true ) ) {
					if ( $value['status'] === 'true' ) {
						$value['status'] = true;
					} else {
						$value = '';
					}
				}
				if ( ! empty( $value['status'] ) && ! empty( $value['conditions'] ) ) {
					$conditions = [];
					foreach ( $value['conditions'] as $condition ) {
						if ( ! empty( $condition['fieldId'] ) && ! empty( $condition['operator'] ) ) {
							$conditions[] = $condition;
						}
					}
					if ( empty( $conditions ) ) {
						$value = '';
					}
				}
				$section[ $sectionKey ] = $value;
			} if ( in_array( $sectionKey, [ 'title', 'uuid', 'id', 'css_class' ] ) ) {
				$section[ $sectionKey ] = sanitize_text_field( wp_unslash( $value ) );
			} else {

				if ( in_array( $value, [ 'true', 'false' ], true ) ) {
					$section[ $sectionKey ] = $value === 'true';
				}
			}
		}

		return $section;
	}
}