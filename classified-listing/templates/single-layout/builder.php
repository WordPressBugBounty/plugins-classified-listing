<?php
/**
 * The template for displaying single listing builder
 *
 * This template can be overridden by copying it to yourtheme/classified-listing/single-layout/builder.php.
 *
 * @package ClassifiedListing/Templates
 * @version 6.1.0
 * @var array $singleLayout
 * @var Form $form
 */

use Rtcl\Helpers\Functions;
use Rtcl\Models\Form\Form;
use Rtcl\Services\FormBuilder\FBField;

defined( 'ABSPATH' ) || exit;
global $listing;

$singleLayout       = $form->getSingleLayout();
$slRows             = $form->getSingleLayoutRows();
$singleLayoutFields = $form->getSingleLayoutFields();
$fields             = $form->getFields();

// Global style settings (Single Listing Layout → Settings). Only the ones that are set are printed,
// so an empty setting keeps the theme / design-style default. Values are validated on save
// (hex colours, clamped px) and re-checked here.
$slStyle    = !empty( $singleLayout['settings'] ) && is_array( $singleLayout['settings'] ) ? $singleLayout['settings'] : [];
$slStyleCss = '';
$slScope    = '#rtcl-listing-' . absint( get_the_ID() ) . ' .rtcl-sl-sections';
$slColor    = static function ( $key ) use ( $slStyle ) {
	$c = isset( $slStyle[ $key ] ) && is_string( $slStyle[ $key ] ) ? strtolower( $slStyle[ $key ] ) : '';
	return preg_match( '/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/', $c ) ? $c : '';
};
$slPx       = static function ( $key ) use ( $slStyle ) {
	return isset( $slStyle[ $key ] ) && $slStyle[ $key ] !== '' && is_numeric( $slStyle[ $key ] ) ? absint( $slStyle[ $key ] ) : null;
};
$slRules    = [
	// [ selectors (relative to the scope), property, value ]
	[ [ '.rtcl-slf-label' ], 'color', $slColor( 'label_color' ) ],
	[ [ '.rtcl-slf-value' ], 'color', $slColor( 'value_color' ) ],
	[ [ '.rtcl-field-icon', '.rtcl-field-icon i' ], 'color', $slColor( 'icon_color' ) ],
	[ [ '.rtcl-slf-label' ], 'font-size', null !== $slPx( 'label_font_size' ) ? $slPx( 'label_font_size' ) . 'px' : '' ],
	[ [ '.rtcl-slf-value' ], 'font-size', null !== $slPx( 'value_font_size' ) ? $slPx( 'value_font_size' ) . 'px' : '' ],
	[ [ '.rtcl-sl-container-body--bordered > .rtcl-sl-element-wrap' ], 'border-bottom-color', $slColor( 'divider_color' ) ],
	[ [ '.rtcl-sl-section-header:before' ], 'background-color', $slColor( 'divider_color' ) ],
	[ [ '.rtcl-sl-section-title', '.rtcl-sl-section-header', '.rtcl-sl-section-icon i' ], 'color', $slColor( 'section_title_color' ) ],
	[ [ '.rtcl-sl-section' ], 'background-color', $slColor( 'section_bg' ) ],
	[ [ '.rtcl-sl-section' ], 'border-color', $slColor( 'section_border_color' ) ],
	[ [ '.rtcl-sl-section' ], 'border-radius', null !== $slPx( 'section_radius' ) ? $slPx( 'section_radius' ) . 'px' : '' ],
	[ [ '.rtcl-sl-section' ], 'padding', null !== $slPx( 'section_padding' ) ? $slPx( 'section_padding' ) . 'px' : '' ],
];
foreach ( $slRules as $slRule ) {
	if ( $slRule[2] === '' || $slRule[2] === null ) {
		continue;
	}
	$slSelectors = array_map( static function ( $sel ) use ( $slScope ) {
		return $slScope . ' ' . $sel;
	}, $slRule[0] );
	$slStyleCss .= implode( ',', $slSelectors ) . '{' . $slRule[1] . ':' . $slRule[2] . ' !important;}';
}
// Mobile section padding (the desktop value above would otherwise also apply on phones).
// Not set for mobile but set for desktop → cap phones at 20px (the design's mobile padding).
if ( null !== $slPx( 'section_padding_sm' ) ) {
	$slStyleCss .= sprintf( '@media (max-width:767px){%s .rtcl-sl-section{padding:%dpx !important;}}', $slScope, $slPx( 'section_padding_sm' ) );
} elseif ( null !== $slPx( 'section_padding' ) ) {
	$slStyleCss .= sprintf( '@media (max-width:767px){%s .rtcl-sl-section{padding:%dpx !important;}}', $slScope, min( 20, $slPx( 'section_padding' ) ) );
}

do_action( 'rtcl_before_single_listing' );
?>
	<div id="rtcl-listing-<?php the_ID(); ?>" <?php Functions::listing_class( Functions::is_modern_single_listing() ? 'rtcl-single-modern rtcl-single-modern--builder' : '', $listing ); ?>>
		<div class="rtcl-sl-sections">
			<?php
			$allowedDirections = [ 'row', 'column', 'row-reverse', 'column-reverse' ];
			$allowedAlignItems = [ 'start', 'center', 'end', 'stretch' ];
			$flexStyle = static function ( $node, $defaultDirection ) use ( $allowedDirections, $allowedAlignItems ) {
				$direction = !empty( $node['direction'] ) && in_array( $node['direction'], $allowedDirections, true ) ? $node['direction'] : $defaultDirection;
				$align = !empty( $node['align_items'] ) && in_array( $node['align_items'], $allowedAlignItems, true ) ? $node['align_items'] : 'stretch';
				$rowGap = isset( $node['row_gap'] ) && $node['row_gap'] !== '' ? absint( $node['row_gap'] ) : 20;
				$columnGap = isset( $node['column_gap'] ) && $node['column_gap'] !== '' ? absint( $node['column_gap'] ) : 20;
				$wrap = ( !empty( $node['wrap'] ) && in_array( $node['wrap'], [ 'wrap', 'nowrap' ], true ) ) ? $node['wrap'] : '';

				return sprintf(
					'display:flex;flex-direction:%s;align-items:%s;row-gap:%dpx;column-gap:%dpx;',
					esc_attr( $direction ),
					esc_attr( $align ),
					$rowGap,
					$columnGap
				) . ( $wrap ? 'flex-wrap:' . esc_attr( $wrap ) . ';' : '' );
			};

			// Container content columns (1–6); 0 = not set.
			$ctnCols = static function ( $value ) {
				return ( $value !== null && $value !== '' ) ? max( 1, min( 6, absint( $value ) ) ) : 0;
			};

			// Responsive Row/Column controls (Column: Width/Wrap; Row: Direction/Align/Wrap)
			// render inline for large (>=1341px); `_md` (<=1340px) and `_sm` (<=767px) can't
			// live in an inline style, so they're emitted as scoped media-query CSS here.
			$responsiveCss     = '';
			$nodeHasResponsive = static function ( $node ) {
				foreach ( [ 'width', 'direction', 'align_items', 'wrap', 'row_gap', 'column_gap' ] as $p ) {
					if ( isset( $node[ $p . '_md' ] ) && $node[ $p . '_md' ] !== '' ) {
						return true;
					}
					if ( isset( $node[ $p . '_sm' ] ) && $node[ $p . '_sm' ] !== '' ) {
						return true;
					}
				}
				return false;
			};
			$flexProps = [ 'direction', 'align_items', 'wrap', 'row_gap', 'column_gap' ];
			$allProps  = array_merge( [ 'width' ], $flexProps );
			// Emit media-query overrides for the requested $props only. Width is kept
			// separate so a container's width targets the container (not its body).
			$nodeResponsiveCss = static function ( $node, $selector, $props ) use ( $allowedDirections, $allowedAlignItems ) {
				$css = '';
				foreach ( [ 'md' => 1340, 'sm' => 767 ] as $sfx => $maxWidth ) {
					$decls = '';
					if ( in_array( 'width', $props, true ) && isset( $node[ 'width_' . $sfx ] ) && $node[ 'width_' . $sfx ] !== '' ) {
						$decls .= sprintf( 'flex:0 1 %1$d%% !important;max-width:%1$d%% !important;min-width:0 !important;', absint( $node[ 'width_' . $sfx ] ) );
					}
					if ( in_array( 'direction', $props, true ) && !empty( $node[ 'direction_' . $sfx ] ) && in_array( $node[ 'direction_' . $sfx ], $allowedDirections, true ) ) {
						$decls .= 'flex-direction:' . $node[ 'direction_' . $sfx ] . ' !important;';
					}
					if ( in_array( 'align_items', $props, true ) && !empty( $node[ 'align_items_' . $sfx ] ) && in_array( $node[ 'align_items_' . $sfx ], $allowedAlignItems, true ) ) {
						$decls .= 'align-items:' . $node[ 'align_items_' . $sfx ] . ' !important;';
					}
					if ( in_array( 'wrap', $props, true ) && !empty( $node[ 'wrap_' . $sfx ] ) && in_array( $node[ 'wrap_' . $sfx ], [ 'wrap', 'nowrap' ], true ) ) {
						$decls .= 'flex-wrap:' . $node[ 'wrap_' . $sfx ] . ' !important;';
					}
					if ( in_array( 'row_gap', $props, true ) && isset( $node[ 'row_gap_' . $sfx ] ) && $node[ 'row_gap_' . $sfx ] !== '' ) {
						$decls .= sprintf( 'row-gap:%dpx !important;', absint( $node[ 'row_gap_' . $sfx ] ) );
					}
					if ( in_array( 'column_gap', $props, true ) && isset( $node[ 'column_gap_' . $sfx ] ) && $node[ 'column_gap_' . $sfx ] !== '' ) {
						$decls .= sprintf( 'column-gap:%dpx !important;', absint( $node[ 'column_gap_' . $sfx ] ) );
					}
					if ( $decls !== '' ) {
						$css .= sprintf( '@media (max-width:%dpx){%s{%s}}', $maxWidth, $selector, $decls );
					}
				}
				return $css;
			};

			if ( !empty( $slRows ) && is_array( $slRows ) ) {
				foreach ( $slRows as $rowIndex => $row ) {
					$rowToken      = !empty( $row['uuid'] )
						? preg_replace( '/[^A-Za-z0-9_-]/', '', $row['uuid'] )
						: ( 'r' . $rowIndex );
					$rowRspClass   = 'rtcl-sl-row-' . $rowToken;
					$responsiveCss .= $nodeResponsiveCss( $row, '.' . $rowRspClass, $flexProps );
					$rowResponsive = $nodeHasResponsive( $row );
					foreach ( ( $row['columns'] ?? [] ) as $__col ) {
						if ( $nodeHasResponsive( $__col ) ) {
							$rowResponsive = true;
							break;
						}
					}
					?>
					<div
						class="rtcl-sl-row <?php echo esc_attr( $rowRspClass ) ?><?php echo $rowResponsive ? ' rtcl-sl-row-rsp' : '' ?><?php echo !empty( $row['css_class'] ) ? ' ' . esc_attr( $row['css_class'] ) : '' ?>"
						id="<?php echo !empty( $row['id'] ) ? esc_attr( $row['id'] ) : '' ?>"
						data-index="<?php echo absint( $rowIndex ) ?>"
						style="<?php echo esc_attr( $flexStyle( $row, 'row' ) ) ?>">
						<?php
						if ( !empty( $row['columns'] ) && is_array( $row['columns'] ) ) {
							foreach ( $row['columns'] as $columnIndex => $column ) {
								$hasWidth = isset( $column['width'] ) && $column['width'] !== '';
								$colStyle = $hasWidth
									? sprintf( 'flex:0 1 %1$d%%;max-width:%1$d%%;min-width:0;', absint( $column['width'] ) )
									: 'flex:1 1 0;min-width:0;';
								$colToken    = !empty( $column['uuid'] )
									? preg_replace( '/[^A-Za-z0-9_-]/', '', $column['uuid'] )
									: ( 'r' . $rowIndex . 'c' . $columnIndex );
								$colRspClass = 'rtcl-sl-col-' . $colToken;
								$responsiveCss .= $nodeResponsiveCss( $column, '.' . $colRspClass, $allProps );
								?>
								<div
									class="rtcl-sl-column <?php echo esc_attr( $colRspClass ) ?><?php echo !empty( $column['css_class'] ) ? ' ' . esc_attr( $column['css_class'] ) : '' ?>"
									id="<?php echo !empty( $column['id'] ) ? esc_attr( $column['id'] ) : '' ?>"
									data-index="<?php echo absint( $columnIndex ) ?>"
									style="<?php echo esc_attr( $colStyle ) ?><?php echo esc_attr( $flexStyle( $column, 'column' ) ) ?>">
									<?php
									if ( !empty( $column['sections'] ) && is_array( $column['sections'] ) ) {
										foreach ( $column['sections'] as $sectionIndex => $section ) {
											$secToken  = !empty( $section['uuid'] )
												? preg_replace( '/[^A-Za-z0-9_-]/', '', $section['uuid'] )
												: ( 'r' . $rowIndex . 'c' . $columnIndex . 's' . $sectionIndex );
											$secwClass = 'rtcl-sl-secw-' . $secToken;
											$presets   = $section['presets'] ?? '';

											// Build the section's containers into a buffer first, skipping any
											// container whose fields all resolved to empty (no rendered field →
											// no `rtcl-sl-element-wrap` marker). This lets us drop the whole
											// section — title and all — when nothing inside it has a value.
											$containersInner = '';
											if ( !empty( $section['containers'] ) && is_array( $section['containers'] ) ) {
												ob_start();
												foreach ( $section['containers'] as $sContainerIndex => $sContainer ) {
													// Containers have no uuid after sanitization → index-based token.
													$ctnClass = 'rtcl-sl-ctn-' . $secToken . 'x' . absint( $sContainerIndex );

													// Render this container's fields into a buffer.
													$fieldsHtml = '';
													if ( !empty( $sContainer['fields'] ) && is_array( $sContainer['fields'] ) ) {
														ob_start();
														foreach ( $sContainer['fields'] as $fieldIndex => $fieldUuid ) {
															$field = !empty( $fields[$fieldUuid] ) ? new FBField( $fields[$fieldUuid] ) : null;
															$singleLayoutField = !empty( $singleLayoutFields[$fieldUuid] ) ? $singleLayoutFields[$fieldUuid] : null;
															if ( !$field && $singleLayoutField ) {
																$field = new FBField( $singleLayoutField );
															} elseif ( $field && $singleLayoutField ) {
																$field->setSlField( $singleLayoutField );
															}

															if ( !empty( $field ) ) {
																Functions::get_template( 'single-layout/render-element', [ 'form' => $form, 'field' => $field, 'fieldUuid' => $fieldUuid ] );
															} // End field exist
														} // End Sections fields loop
														$fieldsHtml = ob_get_clean();
													}

													// No field rendered → skip this container (and its title).
													if ( strpos( $fieldsHtml, 'rtcl-sl-element-wrap' ) === false ) {
														continue;
													}

													// Container direction/align/wrap responsive → both the container and its body.
													// Width targets the container box; flex props target the container + its body.
													$responsiveCss .= $nodeResponsiveCss( $sContainer, '.' . $ctnClass, [ 'width' ] );
													$responsiveCss .= $nodeResponsiveCss( $sContainer, '.' . $ctnClass . ',.' . $ctnClass . '>.rtcl-sl-container-body', $flexProps );

													// Content columns: lays the container's fields out in a grid. Unset tablet
													// falls back to min(desktop, 2) and unset mobile to 1 column.
													$colsLg    = $ctnCols( $sContainer['columns'] ?? '' );
													$colsMd    = $ctnCols( $sContainer['columns_md'] ?? '' );
													$colsSm    = $ctnCols( $sContainer['columns_sm'] ?? '' );
													$isGridCtn = max( $colsLg, $colsMd, $colsSm ) > 1;
													$bodyStyle = $flexStyle( $sContainer, 'column' );
													if ( $isGridCtn ) {
														$colsLg    = $colsLg ?: 1;
														$colsMd    = $colsMd ?: min( $colsLg, 2 );
														$colsSm    = $colsSm ?: 1;
														$bodyStyle .= sprintf( 'display:grid;grid-template-columns:repeat(%d,minmax(0,1fr));', $colsLg );
														foreach ( [ 1340 => $colsMd, 767 => $colsSm ] as $bpMax => $bpCols ) {
															$responsiveCss .= sprintf(
																'@media (max-width:%dpx){.%s>.rtcl-sl-container-body{grid-template-columns:repeat(%d,minmax(0,1fr)) !important;}}',
																$bpMax,
																$ctnClass,
																$bpCols
															);
														}
													}
													?>
													<div
														class="rtcl-sl-container <?php echo esc_attr( $ctnClass ) ?> <?php echo esc_attr( $presets ) ?><?php echo !empty( $sContainer['css_class'] ) ? ' ' . esc_attr( $sContainer['css_class'] ) : '' ?>"
														id="<?php echo !empty( $sContainer['id'] ) ? esc_attr( $sContainer['id'] ) : '' ?>"
														data-index="<?php echo absint( $sContainerIndex ) ?>"
														style="<?php echo !empty( $sContainer['width'] ) ? 'flex:0 1 ' . absint( $sContainer['width'] ) . '%;min-width:0;' : '' ?><?php echo esc_attr( $flexStyle( $sContainer, 'column' ) ) ?>">
														<?php if ( empty( $sContainer['hide_title'] ) && !empty( $sContainer['title'] ) ) { ?>
															<div class="rtcl-sl-container-header">
																<h4 class="rtcl-sl-container-title"><?php echo esc_html( $sContainer['title'] ) ?></h4>
															</div>
														<?php } // End container title ?>
														<div class="rtcl-sl-container-body rtcl-sl-section-column<?php echo $isGridCtn ? ' rtcl-sl-container-body--grid' : '' ?><?php echo !empty( $sContainer['field_border'] ) ? ' rtcl-sl-container-body--bordered' : '' ?>" style="<?php echo esc_attr( $bodyStyle ) ?>">
															<?php echo $fieldsHtml; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
														</div>
													</div>
													<?php
												} // End Sections columns loop
												$containersInner = ob_get_clean();
											} // End Sections columns exist

											// Nothing rendered in any container → skip the whole section (title included).
											if ( strpos( $containersInner, 'rtcl-sl-element-wrap' ) === false ) {
												continue;
											}

											// Section direction/align/wrap responsive → the containers wrapper.
											$responsiveCss .= $nodeResponsiveCss( $section, '.' . $secwClass, $flexProps );
											?>
											<div
												class="rtcl-sl-section<?php echo !empty( $section['uuid'] ) ? ' rtcl-sl-section-' . esc_attr( $section['uuid'] ) : '' ?><?php echo !empty( $section['css_class'] ) ? ' ' . esc_attr( $section['css_class'] ) : '' ?>"
												id="<?php echo !empty( $section['id'] ) ? esc_attr( $section['id'] ) : '' ?>"
												data-index="<?php echo absint( $sectionIndex ) ?>">
												<?php if ( empty( $section['hide_title'] ) && ( !empty( $section['title'] ) || !empty( $section['icon']['class'] ) ) ) { ?>
													<div class="rtcl-sl-section-header">
														<?php if ( !empty( $section['icon']['class'] ) ) { ?>
															<div class="rtcl-sl-section-icon">
																<i class="<?php echo esc_attr( $section['icon']['class'] ) ?>"></i>
															</div> <?php } // End Section icon ?>
														<?php if ( !empty( $section['title'] ) ) { ?>
															<h3 class="rtcl-sl-section-title">
																<?php echo esc_html( $section['title'] ) ?>
															</h3> <?php } // End Section title ?>
													</div>
												<?php } // End Section title wrap ?>
												<div class="rtcl-sl-section-containers rtcl-sl-section-columns <?php echo esc_attr( $secwClass ) ?>"
												     style="<?php echo esc_attr( $flexStyle( $section, 'row' ) ) ?>">
													<?php echo $containersInner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
												</div>
											</div>
											<?php
										} // End Sections loop
									} // End Sections exist
									?>
								</div>
								<?php
							} // End Columns loop
						} // End Columns exist
						?>
					</div>
					<?php
				} // End Rows loop
			} // End Rows exist

			if ( $responsiveCss !== '' ) {
				// Values are absint()/whitelisted in $colResponsiveCss.
				echo '<style>' . $responsiveCss . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			if ( $slStyleCss !== '' ) {
				// Hex colours / absint px only (validated above).
				echo '<style>' . $slStyleCss . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
			?>

			<!-- Related Listing -->
			<?php $listing->the_related_listings(); ?>

			<!-- Review  -->
			<?php do_action( 'rtcl_single_listing_review' ) ?>
		</div>
	</div>
<?php
do_action( 'rtcl_after_single_listing' );
