<?php

namespace Rtcl\Services\FormBuilder\Components;

/**
 * Sanitizes the single-layout grid: `rows[] → columns[](width) → sections[]`.
 *
 * Row and column meta (flex options, id, css_class, title, hide_title) are sanitized here; each
 * column's `sections` are delegated to {@see SectionSanitization} (same rules as the flat form
 * sections), then stripped of `logics`/`column` — single-layout sections have no conditional display.
 */
class SingleLayoutRowSanitization {

	private array $rows;
	private $fields;

	public function __construct( $rows, $fields ) {
		$this->rows   = is_array( $rows ) ? $rows : [];
		$this->fields = $fields;
	}

	public function get(): array {
		$out = [];
		foreach ( $this->rows as $row ) {
			if ( ! is_array( $row ) ) {
				continue;
			}
			$out[] = $this->sanitizeRow( $row );
		}

		return $out;
	}

	private function sanitizeRow( array $row ): array {
		$out         = [];
		$out['uuid'] = isset( $row['uuid'] ) ? sanitize_text_field( $row['uuid'] ) : '';
		$this->applyCommon( $out, $row );

		$columns = [];
		foreach ( $row['columns'] ?? [] as $column ) {
			if ( is_array( $column ) ) {
				$columns[] = $this->sanitizeColumn( $column );
			}
		}
		$out['columns'] = $columns;

		return $out;
	}

	private function sanitizeColumn( array $column ): array {
		$out         = [];
		$out['uuid'] = isset( $column['uuid'] ) ? sanitize_text_field( $column['uuid'] ) : '';
		// Keep an explicit width only; a blank width is omitted so the column flex-fills.
		// `width` = large (default); `width_md`/`width_sm` are the responsive overrides.
		foreach ( [ 'width', 'width_md', 'width_sm' ] as $wKey ) {
			$width = $column[$wKey] ?? '';
			if ( $width !== '' && $width !== null ) {
				$out[$wKey] = absint( $width );
			}
		}
		$this->applyCommon( $out, $column );

		$sections = ( new SectionSanitization( $column['sections'] ?? [], $this->fields ) )->get();
		// Single-layout sections have no conditional-display support — drop `logics` (and the stale
		// `column` key) the same way the flat single-layout sanitizer did.
		$sections = array_map( function ( $section ) {
			unset( $section['logics'], $section['column'] );

			return $section;
		}, $sections );

		$out['sections'] = array_values( $sections );

		return $out;
	}

	private function applyCommon( array &$out, array $src ): void {
		$allowedDirections = [ 'row', 'column', 'row-reverse', 'column-reverse' ];
		$allowedAlignItems = [ 'start', 'center', 'end', 'stretch' ];

		if ( isset( $src['direction'] ) ) {
			$dir             = sanitize_text_field( $src['direction'] );
			$out['direction'] = in_array( $dir, $allowedDirections, true ) ? $dir : 'row';
		}
		if ( isset( $src['align_items'] ) ) {
			$ai                = sanitize_text_field( $src['align_items'] );
			$out['align_items'] = in_array( $ai, $allowedAlignItems, true ) ? $ai : 'stretch';
		}
		if ( isset( $src['row_gap'] ) ) {
			$out['row_gap'] = absint( $src['row_gap'] );
		}
		if ( isset( $src['column_gap'] ) ) {
			$out['column_gap'] = absint( $src['column_gap'] );
		}
		if ( isset( $src['id'] ) ) {
			$out['id'] = sanitize_text_field( $src['id'] );
		}
		if ( isset( $src['css_class'] ) ) {
			$out['css_class'] = sanitize_text_field( $src['css_class'] );
		}
		if ( isset( $src['title'] ) ) {
			$out['title'] = sanitize_text_field( wp_unslash( $src['title'] ) );
		}
		if ( isset( $src['hide_title'] ) ) {
			$out['hide_title'] = (bool) $src['hide_title'];
		}
		if ( isset( $src['wrap'] ) && in_array( $src['wrap'], [ 'wrap', 'nowrap' ], true ) ) {
			$out['wrap'] = $src['wrap'];
		}

		// Responsive overrides: `_md` (tablet) and `_sm` (mobile) for direction/align/wrap.
		// Only kept when valid, so an unset breakpoint falls back to the large value.
		foreach ( [ '_md', '_sm' ] as $sfx ) {
			if ( isset( $src[ 'direction' . $sfx ] ) ) {
				$dir = sanitize_text_field( $src[ 'direction' . $sfx ] );
				if ( in_array( $dir, $allowedDirections, true ) ) {
					$out[ 'direction' . $sfx ] = $dir;
				}
			}
			if ( isset( $src[ 'align_items' . $sfx ] ) ) {
				$ai = sanitize_text_field( $src[ 'align_items' . $sfx ] );
				if ( in_array( $ai, $allowedAlignItems, true ) ) {
					$out[ 'align_items' . $sfx ] = $ai;
				}
			}
			if ( !empty( $src[ 'wrap' . $sfx ] ) && in_array( $src[ 'wrap' . $sfx ], [ 'wrap', 'nowrap' ], true ) ) {
				$out[ 'wrap' . $sfx ] = $src[ 'wrap' . $sfx ];
			}
			if ( isset( $src[ 'row_gap' . $sfx ] ) && $src[ 'row_gap' . $sfx ] !== '' ) {
				$out[ 'row_gap' . $sfx ] = absint( $src[ 'row_gap' . $sfx ] );
			}
			if ( isset( $src[ 'column_gap' . $sfx ] ) && $src[ 'column_gap' . $sfx ] !== '' ) {
				$out[ 'column_gap' . $sfx ] = absint( $src[ 'column_gap' . $sfx ] );
			}
		}
	}
}
