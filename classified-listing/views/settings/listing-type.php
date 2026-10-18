<?php

use Rtcl\Helpers\Functions;

$types = Functions::get_listing_types();
?>
<div class="wrap rtcl" id="rtcl-listing-types-wrap">
	<div class="rtcl-lt-header">
		<div class="rtcl-lt-header-text">
			<h2><?php esc_html_e( "Listing Types", 'classified-listing' ) ?></h2>
			<p class="rtcl-lt-subtitle"><?php esc_html_e( 'Manage the ad types (e.g. Sell, Buy, Exchange) users can choose when posting a listing. Drag to reorder.', 'classified-listing' ); ?></p>
		</div>
	</div>
	<div class="rtcl-listing-types-wrapper">
		<div id="input-new-type-wrapper" class="rtcl-lt-card rtcl-lt-add-card">
			<div class="rtcl-lt-card-head">
				<span class="rtcl-lt-card-icon"><svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="M12 5v14"/></svg></span>
				<div>
					<h3><?php esc_html_e( 'Add new type', 'classified-listing' ); ?></h3>
					<p><?php esc_html_e( 'The ID is generated from the name and can be edited later.', 'classified-listing' ); ?></p>
				</div>
			</div>
			<form id="input-new-type-form">
				<div class="rtcl-form-group">
					<label class="rtcl-field-label" for="add-input-type"><?php esc_html_e( "Type name", "classified-listing" ); ?></label>
					<input type="text" name="type" id="add-input-type" class="rtcl-form-control"
						   placeholder="<?php esc_attr_e( 'e.g. Rent', 'classified-listing' ); ?>">
				</div>
				<?php do_action( 'rtcl_after_listing_type_input' ); ?>
				<div class="rtcl-form-group rtcl-lt-submit">
					<button class="rtcl-btn rtcl-lt-btn-primary" type="submit" id="rtcl-add-btn">
						<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
						<?php esc_html_e( "Add Type", "classified-listing" ); ?>
					</button>
				</div>
			</form>
		</div>
		<div class="rtcl-lt-card rtcl-lt-list-card" id="rtcl-listing-type-wrap">
			<div class="rtcl-lt-list-head">
				<h3>
					<?php esc_html_e( 'All types', 'classified-listing' ); ?>
					<span class="rtcl-lt-count"><?php echo esc_html( count( $types ) ); ?></span>
				</h3>
				<div class="rtcl-lt-cols" aria-hidden="true">
					<span class="rtcl-lt-col-name"><?php esc_html_e( 'Name', 'classified-listing' ); ?></span>
					<span class="rtcl-lt-col-id"><?php esc_html_e( 'ID', 'classified-listing' ); ?></span>
					<span class="rtcl-lt-col-actions"><?php esc_html_e( 'Actions', 'classified-listing' ); ?></span>
				</div>
			</div>
			<ul id="listing-types" class="rtcl-list-group">
				<?php
				foreach ( $types as $typeId => $type ) {
					$is_protected = Functions::is_protected_listing_type( $typeId );
					?>
					<li class="rtcl-list-group-item listing-type<?php echo $is_protected ? ' is-protected' : ''; ?>" data-id="<?php echo esc_attr( $typeId ); ?>">
						<div class="type-details">
							<span class="rtcl-lt-handle" title="<?php esc_attr_e( 'Drag to reorder', 'classified-listing' ); ?>"><svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg></span>
							<div class="type-info">
								<div class="rtcl-lt-name-cell">
									<div class="type-info-name"><?php echo esc_html( $type ); ?></div>
									<?php if ( $is_protected ) : ?>
										<span class="rtcl-lt-badge" title="<?php esc_attr_e( 'Job Manager needs this type, so its ID can\'t be changed and it can\'t be deleted.', 'classified-listing' ); ?>"><svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><?php esc_html_e( 'Required by Job Manager', 'classified-listing' ); ?></span>
									<?php endif; ?>
								</div>
								<code class="type-info-id"><?php echo esc_html( $typeId ); ?></code>
							</div>
							<div class="action">
								<button type="button" class="rtcl-lt-icon-btn edit" title="<?php esc_attr_e( 'Edit', 'classified-listing' ); ?>">
									<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
									<span class="screen-reader-text"><?php esc_html_e( 'Edit', 'classified-listing' ); ?></span>
								</button>
								<?php if ( $is_protected ) : ?>
									<button type="button" class="rtcl-lt-icon-btn rtcl-lt-danger delete disabled" disabled
											title="<?php esc_attr_e( 'Required by Job Manager, can\'t be deleted', 'classified-listing' ); ?>">
								<?php else : ?>
									<button type="button" class="rtcl-lt-icon-btn rtcl-lt-danger delete" title="<?php esc_attr_e( 'Delete', 'classified-listing' ); ?>">
								<?php endif; ?>
									<svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
									<span class="screen-reader-text"><?php esc_html_e( 'Delete', 'classified-listing' ); ?></span>
								</button>
							</div>
						</div>
						<div class="edit-action">
							<form class="input-update-type-form">
								<div class="rtcl-lt-edit-fields">
									<div class="rtcl-form-group">
										<label class="rtcl-field-label"><?php esc_html_e( 'Name', 'classified-listing' ); ?></label>
										<input type="text" name="name" class="rtcl-form-control"
											   value="<?php echo esc_attr( $type ); ?>">
									</div>
									<div class="rtcl-form-group">
										<label class="rtcl-field-label"><?php esc_html_e( 'ID', 'classified-listing' ); ?></label>
										<input type="text" name="id" class="rtcl-form-control"
											   value="<?php echo esc_attr( $typeId ); ?>"<?php echo $is_protected ? ' readonly' : ''; ?>>
										<?php if ( $is_protected ) : ?>
											<p class="rtcl-lt-field-hint"><?php esc_html_e( 'Locked: Job Manager uses this ID.', 'classified-listing' ); ?></p>
										<?php endif; ?>
									</div>
								</div>
								<?php do_action( 'rtcl_after_listing_type_input', $typeId ); ?>
								<div class="rtcl-lt-edit-actions">
									<button type="button" class="rtcl-btn rtcl-lt-btn-ghost cancel"><?php esc_html_e( 'Cancel', 'classified-listing' ); ?></button>
									<button type="submit" class="rtcl-btn rtcl-lt-btn-primary"><?php esc_html_e( 'Update', 'classified-listing' ); ?></button>
								</div>
							</form>
						</div>
					</li>
					<?php
				}
				?>
			</ul>
			<div class="rtcl-lt-empty"<?php echo ! empty( $types ) ? ' hidden' : ''; ?>>
				<span class="rtcl-lt-empty-icon"><svg class="rtcl-lt-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg></span>
				<p><?php esc_html_e( "No listing type found", "classified-listing" ); ?></p>
			</div>
		</div>
	</div>
</div>
