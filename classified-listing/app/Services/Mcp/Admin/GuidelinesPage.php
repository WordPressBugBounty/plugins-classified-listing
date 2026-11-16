<?php

namespace Rtcl\Services\Mcp\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * "MCP Guidelines" admin page under the Classified Listing menu.
 *
 * Shows the MCP endpoint, client configuration snippets, troubleshooting and
 * links to the online documentation (example prompts, available tools).
 */
class GuidelinesPage {

	/**
	 * Admin page slug.
	 */
	const SLUG = 'rtcl-mcp-guidelines';

	/**
	 * Register the submenu page.
	 */
	public static function add_menu() {
		add_submenu_page(
			'rtcl-admin',
			__( 'MCP Guidelines', 'classified-listing' ),
			__( 'MCP Guidelines', 'classified-listing' ),
			'manage_options',
			self::SLUG,
			[ __CLASS__, 'render' ]
		);
	}

	/**
	 * Remove admin notices from other plugins/themes on the guidelines page.
	 */
	public static function remove_admin_notices() {
		$screen = get_current_screen();
		if ( $screen && 'classified-listing_page_' . self::SLUG === $screen->id ) {
			remove_all_actions( 'admin_notices' );
			remove_all_actions( 'all_admin_notices' );
		}
	}

	/**
	 * Render the admin info page.
	 */
	public static function render() {
		$endpoint = rest_url( 'mcp/mcp-adapter-default-server' );
		$is_ssl   = is_ssl();
		$mcp_active = defined( 'WP_MCP_VERSION' );

		// Styles for the admin page - Classified Listing style.
		$styles = '
			<style>
				:root {
					--rtcl-primary: #3232ff;
					--rtcl-primary-dark: #0202c9;
					--rtcl-primary-light: #f1f2fe;
					--rtcl-primary-hover: #dedffe;
					--rtcl-success: #10b981;
					--rtcl-warning: #f59e0b;
					--rtcl-danger: #ef4444;
					--rtcl-text: #1e293b;
					--rtcl-text-light: #64748b;
					--rtcl-border: #e2e8f0;
					--rtcl-bg: #f8fafc;
				}
				.rtcl-mcp-wrap { margin: 0 -20px -20px -20px; background: var(--rtcl-bg); min-height: 100vh; }
				.rtcl-mcp-header { background: linear-gradient(135deg, var(--rtcl-primary) 0%, var(--rtcl-primary-dark) 100%); padding: 30px 40px; color: #fff; }
				.rtcl-mcp-header h1 { margin: 0 0 8px; font-size: 28px; font-weight: 600; color: #fff; }
				.rtcl-mcp-header p { margin: 0; opacity: 0.9; font-size: 15px; }
				.rtcl-mcp-status { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); padding: 8px 16px; border-radius: 50px; margin-top: 15px; font-size: 13px; }
				.rtcl-mcp-status-dot { width: 10px; height: 10px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }
				@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
				.rtcl-mcp-main { padding: 30px 40px; }
				.rtcl-mcp-two-col { display: flex; gap: 30px; align-items: flex-start; }
				.rtcl-mcp-two-col .rtcl-mcp-column { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 24px; }
				.rtcl-mcp-two-col .rtcl-mcp-column:last-child .rtcl-mcp-card { display: flex; flex-direction: column; }
				.rtcl-mcp-two-col .rtcl-mcp-column:last-child .rtcl-mcp-card .rtcl-mcp-card-body { overflow-y: auto; }
				@media (max-width: 1400px) {
					.rtcl-mcp-two-col { flex-direction: column; }
					.rtcl-mcp-two-col .rtcl-mcp-column:last-child .rtcl-mcp-card { max-height: none !important; }
				}
				@media (max-width: 1024px) {
					.rtcl-mcp-header { padding: 24px 24px; }
					.rtcl-mcp-header h1 { font-size: 24px; }
					.rtcl-mcp-main { padding: 24px 24px; }
				}
				@media (max-width: 782px) {
					.rtcl-mcp-wrap { margin: 0 -10px -10px -10px; }
					.rtcl-mcp-header { padding: 20px 16px; }
					.rtcl-mcp-header h1 { font-size: 20px; }
					.rtcl-mcp-header p { font-size: 13px; }
					.rtcl-mcp-status { padding: 6px 12px; font-size: 12px; }
					.rtcl-mcp-main { padding: 16px; }
					.rtcl-mcp-two-col { gap: 16px; }
					.rtcl-mcp-two-col .rtcl-mcp-column { gap: 16px; }
					.rtcl-mcp-card-header { padding: 16px; }
					.rtcl-mcp-card-header h2 { font-size: 16px; }
					.rtcl-mcp-card-header .icon { width: 36px; height: 36px; font-size: 16px; }
					.rtcl-mcp-card-body { padding: 16px; }
					.rtcl-mcp-info-grid { grid-template-columns: 1fr; gap: 12px; }
					.rtcl-mcp-tabs { flex-wrap: wrap; }
					.rtcl-mcp-tab { flex: 1 1 auto; min-width: 100px; padding: 8px 12px; font-size: 12px; }
					.rtcl-mcp-code { padding: 12px; font-size: 11px; }
					.rtcl-mcp-steps li { padding: 12px 12px 12px 48px; }
					.rtcl-mcp-steps li::before { width: 24px; height: 24px; line-height: 24px; font-size: 12px; left: 12px; top: 12px; }
				}
				@media (max-width: 480px) {
					.rtcl-mcp-header { padding: 16px 12px; }
					.rtcl-mcp-header h1 { font-size: 18px; }
					.rtcl-mcp-main { padding: 12px; }
					.rtcl-mcp-card-header { padding: 12px; flex-wrap: wrap; }
					.rtcl-mcp-card-body { padding: 12px; }
					.rtcl-mcp-tabs { padding: 2px; }
					.rtcl-mcp-tab { padding: 6px 8px; font-size: 11px; min-width: 80px; }
					.rtcl-mcp-code { padding: 10px; font-size: 10px; }
					.rtcl-mcp-code-header { flex-wrap: wrap; gap: 8px; }
					.rtcl-mcp-info-box { padding: 12px; }
					.rtcl-mcp-info-box code { font-size: 10px; padding: 4px 8px; }
					.rtcl-mcp-steps li { padding: 10px 10px 10px 44px; font-size: 13px; }
					.rtcl-mcp-steps li::before { width: 22px; height: 22px; line-height: 22px; font-size: 11px; left: 10px; top: 10px; }
				}
				.rtcl-mcp-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
				.rtcl-mcp-card-header { padding: 20px 24px; border-bottom: 1px solid var(--rtcl-border); display: flex; align-items: center; gap: 12px; }
				.rtcl-mcp-card-header h2 { margin: 0; font-size: 18px; font-weight: 600; color: var(--rtcl-text); }
				.rtcl-mcp-card-header .icon { width: 40px; height: 40px; background: var(--rtcl-primary-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--rtcl-primary); font-size: 18px; }
				.rtcl-mcp-card-body { padding: 24px; }
				.rtcl-mcp-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
				.rtcl-mcp-info-box { background: var(--rtcl-primary-light); border-radius: 10px; padding: 16px; }
				.rtcl-mcp-info-box h4 { margin: 0 0 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--rtcl-primary); }
				.rtcl-mcp-info-box code { background: #fff; padding: 6px 10px; border-radius: 6px; font-size: 11px; display: block; word-break: break-all; color: var(--rtcl-text); }
				.rtcl-mcp-info-box-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
				.rtcl-mcp-info-box-header h4 { margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--rtcl-primary); }
				.rtcl-mcp-copy-icon { background: var(--rtcl-primary); color: #fff; border: none; min-width: 24px; height: 24px; padding: 0 8px; border-radius: 4px; cursor: pointer; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; white-space: nowrap; }
				.rtcl-mcp-copy-icon:hover { background: var(--rtcl-primary-dark); transform: scale(1.05); }
				.rtcl-mcp-copy-icon.copied { background: var(--rtcl-success); min-width: 60px; }
				.rtcl-mcp-info-box .badge { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--rtcl-text); }
				.rtcl-mcp-steps { counter-reset: step; list-style: none; padding: 0; margin: 0; }
				.rtcl-mcp-steps li { counter-increment: step; padding: 16px 16px 16px 56px; position: relative; border-bottom: 1px solid var(--rtcl-border); }
				.rtcl-mcp-steps li:last-child { border-bottom: none; }
				.rtcl-mcp-steps li::before { content: counter(step); position: absolute; left: 16px; top: 16px; width: 28px; height: 28px; background: linear-gradient(135deg, var(--rtcl-primary) 0%, var(--rtcl-primary-dark) 100%); color: #fff; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 600; }
				.rtcl-mcp-steps li strong { display: block; margin-bottom: 4px; color: var(--rtcl-text); }
				.rtcl-mcp-steps li span { color: var(--rtcl-text-light); font-size: 13px; }
				.rtcl-mcp-tabs { display: flex; gap: 0; background: var(--rtcl-bg); border-radius: 8px; padding: 4px; margin-bottom: 16px; }
				.rtcl-mcp-tab { flex: 1; padding: 10px 16px; cursor: pointer; border: none; background: transparent; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--rtcl-text-light); transition: all 0.2s; text-align: center; }
				.rtcl-mcp-tab:hover { color: var(--rtcl-primary); }
				.rtcl-mcp-tab.active { background: #fff; color: var(--rtcl-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
				.rtcl-mcp-tab-content { display: none; }
				.rtcl-mcp-tab-content.active { display: block; }
				.rtcl-mcp-code { background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 12px; line-height: 1.6; font-family: "SF Mono", Monaco, monospace; }
				.rtcl-mcp-code-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
				.rtcl-mcp-code-header span { font-size: 11px; color: #94a3b8; }
				.rtcl-mcp-copy-btn { background: rgba(255,255,255,0.1); color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; transition: background 0.2s; }
				.rtcl-mcp-copy-btn:hover { background: rgba(255,255,255,0.2); }
				.rtcl-mcp-alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; display: flex; align-items: flex-start; gap: 10px; margin-top: 16px; }
				.rtcl-mcp-alert-warning { background: #fef3c7; color: #92400e; }
				.rtcl-mcp-alert-info { background: var(--rtcl-primary-light); color: var(--rtcl-primary); }
				.rtcl-mcp-docs { margin-top: 30px; }
				.rtcl-mcp-docs .rtcl-mcp-card-header { justify-content: space-between; flex-wrap: wrap; }
				.rtcl-mcp-docs .rtcl-mcp-card-header .title { display: flex; align-items: center; gap: 12px; }
				.rtcl-mcp-docs-lead { margin: 4px 0 0; font-size: 13px; color: var(--rtcl-text-light); }
				.rtcl-mcp-docs-grid { display: flex; flex-wrap: wrap; gap: 12px; }
				.rtcl-mcp-docs-item { flex: 1 1 240px; min-width: 0; display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; background: var(--rtcl-bg); border: 1px solid var(--rtcl-border); border-radius: 10px; text-decoration: none; color: var(--rtcl-text); transition: all 0.2s; }
				.rtcl-mcp-docs-item:hover, .rtcl-mcp-docs-item:focus { background: var(--rtcl-primary-light); border-color: var(--rtcl-primary); color: var(--rtcl-text); }
				.rtcl-mcp-docs-item .icon { flex: 0 0 auto; width: 36px; height: 36px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
				.rtcl-mcp-docs-item .text { display: flex; flex-direction: column; gap: 4px; }
				.rtcl-mcp-docs-item strong { font-size: 13px; font-weight: 600; color: var(--rtcl-primary); }
				.rtcl-mcp-docs-item .text > span { font-size: 12px; color: var(--rtcl-text-light); line-height: 1.5; }
				.rtcl-mcp-trouble { margin-top: 30px; }
				.rtcl-mcp-trouble h2 { font-size: 20px; margin-bottom: 16px; color: var(--rtcl-text); }
				.rtcl-mcp-trouble table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
				.rtcl-mcp-trouble th { background: var(--rtcl-primary-light); color: var(--rtcl-primary); font-size: 13px; font-weight: 600; text-align: left; padding: 14px 16px; }
				.rtcl-mcp-trouble td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid var(--rtcl-border); }
				.rtcl-mcp-trouble tr:last-child td { border-bottom: none; }
				.rtcl-mcp-check { list-style: none; margin: 0 0 8px; padding: 0; }
				.rtcl-mcp-check li { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid var(--rtcl-border); font-size: 13px; color: var(--rtcl-text); }
				.rtcl-mcp-check li:last-child { border-bottom: none; }
				.rtcl-mcp-check .st { flex: 0 0 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }
				.rtcl-mcp-check .st.ok { background: var(--rtcl-success); }
				.rtcl-mcp-check .st.bad { background: var(--rtcl-danger); }
				.rtcl-mcp-check .st.info { background: var(--rtcl-warning); }
				.rtcl-mcp-check small { display: block; color: var(--rtcl-text-light); margin-top: 2px; }
				.rtcl-mcp-step { border: 1px solid var(--rtcl-border); border-radius: 10px; padding: 18px; margin-top: 16px; }
				.rtcl-mcp-step h3 { margin: 0 0 6px; font-size: 15px; color: var(--rtcl-text); display: flex; align-items: center; gap: 10px; }
				.rtcl-mcp-step h3 .num { flex: 0 0 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, var(--rtcl-primary) 0%, var(--rtcl-primary-dark) 100%); color: #fff; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; }
				.rtcl-mcp-step p { margin: 0 0 12px; font-size: 13px; color: var(--rtcl-text-light); line-height: 1.6; }
				.rtcl-mcp-step ol.howto { margin: 0 0 12px 18px; padding: 0; font-size: 13px; color: var(--rtcl-text); line-height: 1.7; }
				.rtcl-mcp-field { margin-bottom: 12px; }
				.rtcl-mcp-field label { display: block; font-size: 12px; font-weight: 600; color: var(--rtcl-text); margin-bottom: 4px; }
				.rtcl-mcp-field input[type=text], .rtcl-mcp-field input[type=password] { width: 100%; max-width: 100%; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--rtcl-border); font-size: 13px; }
				.rtcl-mcp-inline { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
				.rtcl-mcp-inline input { flex: 1 1 220px; }
				.rtcl-mcp-inline select { flex: 0 1 260px; max-width: 100%; min-height: 34px; border-radius: 6px; border-color: var(--rtcl-border); }
				.rtcl-mcp-field input[readonly] { background: var(--rtcl-bg); }
				.rtcl-mcp-btn { background: var(--rtcl-primary) !important; border-color: var(--rtcl-primary) !important; color: #fff !important; }
				.rtcl-mcp-btn-outline { background: transparent !important; border-color: var(--rtcl-primary) !important; color: var(--rtcl-primary) !important; }
				.rtcl-mcp-result { display: none; margin-top: 12px; background: var(--rtcl-primary-light); border-radius: 8px; padding: 12px; }
				.rtcl-mcp-result code { display: block; word-break: break-all; background: #fff; padding: 8px 10px; border-radius: 6px; font-size: 12px; margin: 6px 0 8px; }
				.rtcl-mcp-msg { margin-top: 10px; font-size: 13px; }
				.rtcl-mcp-msg.ok { color: #047857; }
				.rtcl-mcp-msg.err { color: #b91c1c; }
				.rtcl-mcp-msg.wait { color: var(--rtcl-text-light); }
				.rtcl-mcp-hint { font-size: 12px; color: var(--rtcl-text-light); margin: 8px 0 0; }
				.rtcl-mcp-security { background: #fef3c7; color: #92400e; border-radius: 8px; padding: 12px 14px; font-size: 12px; margin-top: 16px; line-height: 1.6; }

				/* Setup guide */
				.rtcl-mcp-guide .rtcl-mcp-card-header { justify-content: space-between; flex-wrap: wrap; }
				.rtcl-mcp-guide .rtcl-mcp-card-header .title { display: flex; align-items: center; gap: 12px; }
				.rtcl-mcp-guide .rtcl-mcp-card-header .sub { font-size: 13px; color: var(--rtcl-text-light); }
				.rtcl-mcp-stepper { display: flex; gap: 0; padding: 18px 24px; border-bottom: 1px solid var(--rtcl-border); background: var(--rtcl-bg); counter-reset: none; }
				.rtcl-mcp-stepper .s { flex: 1; display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--rtcl-text-light); position: relative; text-decoration: none; background: none; border: 0; padding: 4px 0; margin: 0; cursor: pointer; font-family: inherit; text-align: left; }
				.rtcl-mcp-stepper .s:hover .l { color: var(--rtcl-primary); }
				.rtcl-mcp-stepper .s:focus-visible { outline: 2px solid var(--rtcl-primary); outline-offset: 4px; border-radius: 6px; }
				.rtcl-mcp-stepper .s.active { color: var(--rtcl-primary); }
				.rtcl-mcp-stepper .s.active .n { border-color: var(--rtcl-primary); color: var(--rtcl-primary); box-shadow: 0 0 0 4px var(--rtcl-primary-light); }
				.rtcl-mcp-stepper .s.active .l { text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px; }
				.rtcl-mcp-stepper .s.done.active .n { color: #fff; }
				.rtcl-mcp-stepper .s:not(:last-child)::after { content: ""; flex: 1; height: 2px; background: var(--rtcl-border); margin: 0 12px; }
				.rtcl-mcp-stepper .s .n { flex: 0 0 28px; height: 28px; border-radius: 50%; border: 2px solid var(--rtcl-border); background: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; }
				.rtcl-mcp-stepper .s.current { color: var(--rtcl-primary); }
				.rtcl-mcp-stepper .s.current .n { border-color: var(--rtcl-primary); color: var(--rtcl-primary); }
				.rtcl-mcp-stepper .s.done { color: var(--rtcl-text); }
				.rtcl-mcp-stepper .s.done .n { border-color: var(--rtcl-success); background: var(--rtcl-success); color: #fff; }
				.rtcl-mcp-stepper .s.done:not(:last-child)::after { background: var(--rtcl-success); }
				.rtcl-mcp-guide-grid { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 24px; padding: 24px; align-items: start; }
				.rtcl-mcp-gstep[hidden] { display: none; }
				.rtcl-mcp-gstep { border: 1px solid var(--rtcl-border); border-radius: 12px; padding: 20px 22px; margin-bottom: 0; background: #fff; transition: border-color .2s, box-shadow .2s; }
				.rtcl-mcp-gstep:last-child { margin-bottom: 0; }
				.rtcl-mcp-gstep.current { border-color: var(--rtcl-primary); box-shadow: 0 0 0 3px var(--rtcl-primary-light); }
				.rtcl-mcp-gstep-head { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
				.rtcl-mcp-gstep-head .n { flex: 0 0 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--rtcl-primary) 0%, var(--rtcl-primary-dark) 100%); color: #fff; font-weight: 700; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; }
				.rtcl-mcp-gstep.done .rtcl-mcp-gstep-head .n { background: var(--rtcl-success); }
				.rtcl-mcp-gstep-head h3 { margin: 0; font-size: 16px; color: var(--rtcl-text); flex: 1; }
				.rtcl-mcp-pill { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 50px; background: #dcfce7; color: #166534; display: none; }
				.rtcl-mcp-gstep.done .rtcl-mcp-pill { display: inline-block; }
				.rtcl-mcp-lead { margin: 0 0 14px 42px; font-size: 13px; color: var(--rtcl-text-light); line-height: 1.6; }
				.rtcl-mcp-gstep-body { margin-left: 42px; }
				.rtcl-mcp-more { margin-top: 12px; font-size: 12px; color: var(--rtcl-text-light); }
				.rtcl-mcp-more summary { cursor: pointer; color: var(--rtcl-primary); font-weight: 600; }
				.rtcl-mcp-more p, .rtcl-mcp-more ul { margin: 8px 0 0; line-height: 1.6; }
				.rtcl-mcp-more ul { padding-left: 18px; list-style: disc; }
				.rtcl-mcp-account-line { display: block; font-size: 12px; color: var(--rtcl-text-light); background: var(--rtcl-bg); border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; }
				.rtcl-mcp-account-line strong { color: var(--rtcl-text); }
				.rtcl-mcp-side-box { border: 1px solid var(--rtcl-border); border-radius: 12px; padding: 16px 18px; margin-bottom: 16px; background: #fff; }
				.rtcl-mcp-side-box h4 { margin: 0 0 12px; font-size: 13px; font-weight: 700; color: var(--rtcl-text); text-transform: uppercase; letter-spacing: .4px; }
				.rtcl-mcp-side-box dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 12px; }
				.rtcl-mcp-side-box dt { color: var(--rtcl-text-light); }
				.rtcl-mcp-side-box dd { margin: 0; color: var(--rtcl-text); font-weight: 600; text-align: right; }
				.rtcl-mcp-endpoint { display: flex; gap: 8px; align-items: center; background: var(--rtcl-bg); border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; }
				.rtcl-mcp-endpoint code { flex: 1; font-size: 11px; word-break: break-all; background: transparent; padding: 0; }
				.rtcl-mcp-side-box ul.tips { margin: 0; padding-left: 18px; list-style: disc; font-size: 12px; color: var(--rtcl-text-light); line-height: 1.6; }
				.rtcl-mcp-side-box.warn { background: #fffbeb; border-color: #fde68a; }
				.rtcl-mcp-tabs.pills { background: transparent; padding: 0; gap: 8px; flex-wrap: wrap; }
				.rtcl-mcp-tabs.pills .rtcl-mcp-tab { flex: 0 0 auto; border: 1px solid var(--rtcl-border); border-radius: 50px; padding: 7px 16px; background: #fff; }
				.rtcl-mcp-tabs.pills .rtcl-mcp-tab.active { border-color: var(--rtcl-primary); background: var(--rtcl-primary); color: #fff; box-shadow: none; }
				@media (max-width: 1200px) { .rtcl-mcp-guide-grid { grid-template-columns: 1fr; } }
				@media (max-width: 900px) {
					.rtcl-mcp-stepper { gap: 12px; }
					.rtcl-mcp-stepper .s { flex: 1 1 0; min-width: 0; }
					.rtcl-mcp-stepper .s::after { display: none; }
					.rtcl-mcp-lead, .rtcl-mcp-gstep-body { margin-left: 0; }
				}

				.rtcl-mcp-gstep-nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--rtcl-border); }
				.rtcl-mcp-next.attention { animation: rtclMcpPulse 1.6s ease-in-out 3; }
				@keyframes rtclMcpPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(50, 50, 255, .45); } 50% { box-shadow: 0 0 0 8px rgba(50, 50, 255, 0); } }
				details.rtcl-mcp-side-box summary { list-style: none; cursor: pointer; }
				details.rtcl-mcp-side-box summary::-webkit-details-marker { display: none; }
				details.rtcl-mcp-side-box summary h4 { margin: 0; display: flex; justify-content: space-between; }
				details.rtcl-mcp-side-box summary h4::after { content: "+"; font-weight: 400; }
				details.rtcl-mcp-side-box[open] summary h4 { margin-bottom: 12px; }
				details.rtcl-mcp-side-box[open] summary h4::after { content: "–"; }

				.rtcl-mcp-variants-wrap { border: 1px solid var(--rtcl-border); border-radius: 10px; padding: 14px 16px; background: var(--rtcl-bg); }
				.rtcl-mcp-variants-q { margin: 0 0 10px; font-size: 13px; font-weight: 600; color: var(--rtcl-text); }
				.rtcl-mcp-variants { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
				.rtcl-mcp-variant { border: 1px solid var(--rtcl-border); background: #fff; color: var(--rtcl-text); border-radius: 8px; padding: 7px 12px; font-size: 12px; font-weight: 600; cursor: pointer; }
				.rtcl-mcp-variant:hover { border-color: var(--rtcl-primary); color: var(--rtcl-primary); }
				.rtcl-mcp-variant.active { border-color: var(--rtcl-primary); background: var(--rtcl-primary-light); color: var(--rtcl-primary); }
				.rtcl-mcp-variant-panel[hidden] { display: none; }
				.rtcl-mcp-variant-what { margin: 0 0 6px; font-size: 13px; color: var(--rtcl-text); }
				.rtcl-mcp-example { margin: 8px 0 0; background: #fff; border: 1px dashed var(--rtcl-border); border-radius: 8px; padding: 10px 12px; font-size: 12px; line-height: 1.6; white-space: pre; overflow-x: auto; color: var(--rtcl-text); }

				/* Equal-height columns: the open step fills the row (nav pinned to the bottom); the sidebar stays in view when a step is taller. */
				.rtcl-mcp-guide-grid { align-items: stretch; }
				.rtcl-mcp-guide-main { display: flex; flex-direction: column; min-width: 0; }
				.rtcl-mcp-gstep:not([hidden]) { flex: 1 1 auto; display: flex; flex-direction: column; }
				.rtcl-mcp-gstep-body { flex: 1 1 auto; }
				.rtcl-mcp-gstep-nav { margin-top: auto; }
				.rtcl-mcp-gstep-body + .rtcl-mcp-gstep-nav { margin-top: 20px; }
				.rtcl-mcp-guide-side { align-self: start; position: sticky; top: 46px; }
				.rtcl-mcp-guide-side > :last-child { margin-bottom: 0; }
				.rtcl-mcp-side-box .rtcl-mcp-check li { padding: 6px 0; }
				details.rtcl-mcp-side-box summary h4 { align-items: center; text-align: left; }
				details.rtcl-mcp-side-box summary h4 span { flex: 1; }
				.rtcl-mcp-guide .rtcl-mcp-config { margin: 0; white-space: pre; overflow: auto; max-height: 360px; }
				@media (max-width: 1200px) { .rtcl-mcp-guide-side { position: static; } }

				.rtcl-mcp-sub { padding: 14px 0; border-top: 1px dashed var(--rtcl-border); }
				.rtcl-mcp-sub:first-child { border-top: 0; padding-top: 0; }
				.rtcl-mcp-sub .rtcl-mcp-inline input[type=text] { padding: 6px 10px; border-radius: 6px; border: 1px solid var(--rtcl-border); font-size: 13px; }
				.rtcl-mcp-sub input[readonly] { background: var(--rtcl-bg); color: var(--rtcl-text); box-shadow: none; }
				.rtcl-mcp-sub-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--rtcl-text); margin-bottom: 10px; }
				.rtcl-mcp-sub-title .k { flex: 0 0 22px; height: 22px; border-radius: 6px; background: var(--rtcl-primary-light); color: var(--rtcl-primary); font-size: 12px; display: inline-flex; align-items: center; justify-content: center; }
				.rtcl-mcp-or { display: flex; align-items: center; gap: 10px; margin: 4px 0 10px; font-size: 11px; text-transform: uppercase; letter-spacing: .4px; color: var(--rtcl-text-light); }
				.rtcl-mcp-or::before, .rtcl-mcp-or::after { content: ""; flex: 1; height: 1px; background: var(--rtcl-border); }

				/* App tab timeline */
				.rtcl-mcp-chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0 14px; }
				.rtcl-mcp-chip { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 50px; background: var(--rtcl-bg); border: 1px solid var(--rtcl-border); color: var(--rtcl-text); }
				.rtcl-mcp-chip.warn { background: #fffbeb; border-color: #fde68a; color: #92400e; }
				.rtcl-mcp-chip.ok { background: #ecfdf5; border-color: #a7f3d0; color: #065f46; }
				.rtcl-mcp-stages { list-style: none; margin: 0; padding: 0; }
				.rtcl-mcp-stage { position: relative; padding: 0 0 22px 42px; margin: 0; }
				.rtcl-mcp-stage::before { content: ""; position: absolute; left: 13px; top: 30px; bottom: 4px; width: 2px; background: var(--rtcl-border); }
				.rtcl-mcp-stage:last-child { padding-bottom: 0; }
				.rtcl-mcp-stage:last-child::before { display: none; }
				.rtcl-mcp-stage .dot { position: absolute; left: 0; top: 0; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 2px solid var(--rtcl-primary); color: var(--rtcl-primary); font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
				.rtcl-mcp-stage h4 { margin: 4px 0 6px; font-size: 14px; font-weight: 600; color: var(--rtcl-text); }
				.rtcl-mcp-stage p { margin: 0 0 6px; font-size: 13px; color: var(--rtcl-text); line-height: 1.6; }
				.rtcl-mcp-stage .rtcl-mcp-stage-hint { font-size: 12px; color: var(--rtcl-text-light); }
				.rtcl-mcp-stage .rtcl-mcp-code { margin-top: 10px; }
				.rtcl-mcp-variants-wrap { border: 0; padding: 0; background: transparent; }
				.rtcl-mcp-variants-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 2px 0 10px; }
				.rtcl-mcp-variants-q { font-size: 13px; font-weight: 600; color: var(--rtcl-text); }
				.rtcl-mcp-variants { display: inline-flex; flex-wrap: wrap; gap: 0; margin: 0; border: 1px solid var(--rtcl-border); border-radius: 8px; overflow: hidden; background: #fff; }
				.rtcl-mcp-variant { border: 0; border-right: 1px solid var(--rtcl-border); border-radius: 0; padding: 7px 14px; }
				.rtcl-mcp-variant:last-child { border-right: 0; }
				.rtcl-mcp-variant.active { background: var(--rtcl-primary); color: #fff; }
				.rtcl-mcp-variant.active:hover { color: #fff; }
				.rtcl-mcp-variant-how { margin: 0 0 4px; font-size: 13px; color: var(--rtcl-text-light); }
				.rtcl-mcp-http-note { margin: 10px 0 0; font-size: 12px; color: #92400e; }

				/* Test your connection */
				#rtcl-mcp-site-check { margin-top: 2px; }
				.rtcl-mcp-stage p.rtcl-mcp-app-checks { margin: 0; font-size: 12px; color: var(--rtcl-text-light); }
				.rtcl-mcp-app-checks strong { color: var(--rtcl-text); font-weight: 600; }
				.rtcl-mcp-test-prompt { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: var(--rtcl-primary-light); border-radius: 8px; padding: 10px 12px; margin: 4px 0 6px; font-size: 13px; font-weight: 600; color: var(--rtcl-text); }
				.rtcl-mcp-try-result { margin-top: 14px; padding: 12px 16px; border: 1px solid #fecaca; background: #fef2f2; border-radius: 10px; font-size: 13px; color: var(--rtcl-text); }
				.rtcl-mcp-try-result strong { color: #b91c1c; }
				.rtcl-mcp-try-result ul { margin: 6px 0 0; padding-left: 18px; list-style: disc; }
				.rtcl-mcp-try-result li { margin: 2px 0; font-size: 12px; line-height: 1.6; }
				/* Responsive */
				.rtcl-mcp-card-header .icon, .rtcl-mcp-docs-item .icon { flex: 0 0 auto; }
				.rtcl-mcp-tabs.pills .rtcl-mcp-tab { min-width: 0; }
				.rtcl-mcp-gstep-nav { flex-wrap: wrap; }
				.rtcl-mcp-gstep-nav .button { height: auto; min-height: 32px; white-space: normal; text-align: center; }
				.rtcl-mcp-test-prompt { flex-wrap: wrap; }
				.rtcl-mcp-side-box dd { overflow-wrap: anywhere; }
				@media (max-width: 782px) {
					.rtcl-mcp-trouble table, .rtcl-mcp-trouble tbody, .rtcl-mcp-trouble tr, .rtcl-mcp-trouble td { display: block; width: 100%; box-sizing: border-box; }
					.rtcl-mcp-trouble thead { display: none; }
					.rtcl-mcp-trouble tr { padding: 12px 14px; border-bottom: 1px solid var(--rtcl-border); }
					.rtcl-mcp-trouble tr:last-child { border-bottom: none; }
					.rtcl-mcp-trouble td { padding: 0; border: 0; font-size: 13px; line-height: 1.6; }
					.rtcl-mcp-trouble td:first-child { font-weight: 600; color: var(--rtcl-primary); margin-bottom: 4px; }
					.rtcl-mcp-trouble h2 { font-size: 18px; }
					.rtcl-mcp-docs { margin-top: 20px; }
					.rtcl-mcp-trouble { margin-top: 20px; }
				}
				@media (max-width: 600px) {
					.rtcl-mcp-stepper { padding: 14px 12px; gap: 6px; }
					.rtcl-mcp-stepper .s { flex-direction: column; text-align: center; gap: 6px; font-size: 12px; }
					.rtcl-mcp-stepper .s.active .l { text-underline-offset: 4px; }
					.rtcl-mcp-stepper .s .n { flex: 0 0 auto; width: 28px; height: 28px; box-sizing: border-box; }
					.rtcl-mcp-guide-grid { padding: 12px; gap: 16px; }
					.rtcl-mcp-gstep { padding: 16px 14px; }
					.rtcl-mcp-stage { padding-left: 36px; }
					.rtcl-mcp-stage::before { left: 12px; }
					.rtcl-mcp-stage .dot { width: 26px; height: 26px; font-size: 12px; }
					.rtcl-mcp-variants { display: flex; flex-direction: column; width: 100%; }
					.rtcl-mcp-variant { border-right: 0; border-bottom: 1px solid var(--rtcl-border); text-align: left; }
					.rtcl-mcp-variant:last-child { border-bottom: 0; }
					.rtcl-mcp-gstep-nav .button { flex: 1 1 auto; }
					.rtcl-mcp-gstep-nav > span:empty { display: none; }
					.rtcl-mcp-sub > span.rtcl-mcp-hint { display: block; margin: 8px 0 0 !important; }
					.rtcl-mcp-docs .rtcl-mcp-card-header .title { align-items: flex-start; }
					.rtcl-mcp-docs .rtcl-mcp-card-header > .button { width: 100%; text-align: center; }
					.rtcl-mcp-side-box { padding: 14px; }
				}
			</style>
		';

		echo $styles; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo '<div class="rtcl-mcp-wrap">';

		// Header.
		echo '<div class="rtcl-mcp-header">';
		echo '<h1>' . esc_html__( 'MCP Guidelines', 'classified-listing' ) . '</h1>';
		echo '<p>' . esc_html__( 'Connect AI assistants to manage your classified listings through the Model Context Protocol.', 'classified-listing' ) . '</p>';
		if ( $mcp_active ) {
			echo '<div class="rtcl-mcp-status"><span class="rtcl-mcp-status-dot"></span> ' . esc_html__( 'MCP Adapter Active', 'classified-listing' ) . '</div>';
		}
		echo '</div>';

		echo '<div class="rtcl-mcp-main">';

		// Setup guide (full width): stepper, steps, "at a glance" sidebar.
		self::render_setup_guide( $endpoint, $is_ssl );

		// Troubleshooting.
		echo '<div class="rtcl-mcp-trouble" id="rtcl-mcp-troubleshooting">';
		echo '<h2>' . esc_html__( 'Troubleshooting', 'classified-listing' ) . '</h2>';
		echo '<table>';
		echo '<thead><tr><th>' . esc_html__( 'Problem', 'classified-listing' ) . '</th><th>' . esc_html__( 'Solution', 'classified-listing' ) . '</th></tr></thead>';
		echo '<tbody>';
		echo '<tr><td>' . esc_html__( 'Connection refused', 'classified-listing' ) . '</td><td>' . esc_html__( 'Check if WordPress site is running and accessible', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( '401 Unauthorized', 'classified-listing' ) . '</td><td>' . esc_html__( 'Verify Base64 credentials are correct (username:app_password)', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( '404 Not Found', 'classified-listing' ) . '</td><td>' . esc_html__( 'Check MCP endpoint URL and ensure MCP Adapter plugin is active', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( 'SSL certificate error', 'classified-listing' ) . '</td><td>' . esc_html__( 'Add --allow-http flag for local HTTP development', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( 'Abilities not visible', 'classified-listing' ) . '</td><td>' . esc_html__( 'Completely quit and restart your AI client after config changes', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( '"npx" / "node" not found', 'classified-listing' ) . '</td><td>' . esc_html__( 'Install Node.js (LTS) from nodejs.org, then completely restart your AI app. On Windows, if it still fails, use "command": "cmd" and put "/c", "npx" at the start of "args".', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( 'Test connection says "credentials rejected" although they are correct', 'classified-listing' ) . '</td><td>' . esc_html__( 'Some servers remove the Authorization header. Ask your host to pass it to PHP (Apache: add "SetEnvIf Authorization (.+) HTTP_AUTHORIZATION=$1" to .htaccess), or disable security plugins that block Application Passwords.', 'classified-listing' ) . '</td></tr>';
		echo '<tr><td>' . esc_html__( 'Application Passwords not available', 'classified-listing' ) . '</td><td>' . esc_html__( 'WordPress only allows them on HTTPS sites (or local development sites). Enable SSL for your site, or ask your host / security plugin to allow Application Passwords.', 'classified-listing' ) . '</td></tr>';
		echo '</tbody></table>';
		echo '</div>';

		// Documentation: example prompts, available tools and guides live online to keep this page short.
		$docs_base  = 'https://www.radiustheme.com/docs/classified-listing/docs/mcp-integration/';
		$docs_links = [
			[ 'brief/', '📖', __( 'Overview', 'classified-listing' ), __( 'What MCP is, what your AI assistant can do and example prompts.', 'classified-listing' ) ],
			[ 'install-enable-mcp-adapter-plugin/', '🔌', __( 'Install & Enable MCP Adapter Plugin', 'classified-listing' ), __( 'Install the required plugin and switch MCP on.', 'classified-listing' ) ],
			// TODO: point to the dedicated Example Prompts / Available Tools doc pages once they are published.
			[ 'test-your-connection/', '💬', __( 'Example Prompts', 'classified-listing' ), __( 'Ready-to-use prompts for listings, forms, filters and pages.', 'classified-listing' ) ],
			[ 'test-your-connection/', '🧰', __( 'Available Tools', 'classified-listing' ), __( 'Everything your AI assistant can do on your site.', 'classified-listing' ) ],
		];
		echo '<div class="rtcl-mcp-docs" id="rtcl-mcp-prompts">';
		echo '<div class="rtcl-mcp-card">';
		echo '<div class="rtcl-mcp-card-header"><div class="title"><div class="icon">📘</div><div><h2>' . esc_html__( 'Documentation', 'classified-listing' ) . '</h2>';
		echo '<p class="rtcl-mcp-docs-lead">' . esc_html__( 'Example prompts, available tools and step-by-step guides are in the online documentation.', 'classified-listing' ) . '</p></div></div>';
		echo '<a class="button button-primary rtcl-mcp-btn" href="' . esc_url( $docs_base . 'brief/' ) . '" target="_blank" rel="noopener noreferrer">' . esc_html__( 'Open documentation ↗', 'classified-listing' ) . '</a>';
		echo '</div>';
		echo '<div class="rtcl-mcp-card-body"><div class="rtcl-mcp-docs-grid">';
		foreach ( $docs_links as $doc ) {
			echo '<a class="rtcl-mcp-docs-item" href="' . esc_url( $docs_base . $doc[0] ) . '" target="_blank" rel="noopener noreferrer">';
			echo '<span class="icon" aria-hidden="true">' . esc_html( $doc[1] ) . '</span>';
			echo '<span class="text"><strong>' . esc_html( $doc[2] ) . '</strong><span>' . esc_html( $doc[3] ) . '</span></span>';
			echo '</a>';
		}
		echo '</div></div>';
		echo '</div></div>'; // .rtcl-mcp-card, .rtcl-mcp-docs

		echo '</div>'; // .rtcl-mcp-main
		echo '</div>'; // .rtcl-mcp-wrap

		// Tab switching, copy functions, and column height matching JavaScript.
		echo '<script>
			// Fallback copy function for older browsers
			function rtclFallbackCopy(text) {
				var textArea = document.createElement("textarea");
				textArea.value = text;
				textArea.style.position = "fixed";
				textArea.style.left = "-9999px";
				textArea.style.top = "0";
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				var success = false;
				try {
					success = document.execCommand("copy");
				} catch (err) {
					console.error("Fallback copy failed:", err);
				}
				document.body.removeChild(textArea);
				return success;
			}

			// Copy text to clipboard with visual feedback (for info boxes)
			function rtclMcpCopy(btn, text) {
				var showSuccess = function() {
					var originalContent = btn.innerHTML;
					btn.innerHTML = "' . esc_js( __( 'Copied', 'classified-listing' ) ) . '";
					btn.classList.add("copied");
					setTimeout(function() {
						btn.innerHTML = originalContent;
						btn.classList.remove("copied");
					}, 2000);
				};

				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(text).then(showSuccess).catch(function() {
						if (rtclFallbackCopy(text)) {
							showSuccess();
						}
					});
				} else {
					if (rtclFallbackCopy(text)) {
						showSuccess();
					}
				}
			}

			// Copy code block content (for config tabs)
			function rtclMcpCopyCode(btn) {
				var pre = btn.parentElement.nextElementSibling;
				if (!pre || !pre.textContent) return;

				var text = pre.textContent;
				var showSuccess = function() {
					var originalText = btn.textContent;
					btn.textContent = "' . esc_js( __( 'Copied', 'classified-listing' ) ) . '";
					btn.style.background = "rgba(16, 185, 129, 0.4)";
					btn.style.color = "#fff";
					setTimeout(function() {
						btn.textContent = originalText;
						btn.style.background = "";
						btn.style.color = "";
					}, 2000);
				};

				if (navigator.clipboard && navigator.clipboard.writeText) {
					navigator.clipboard.writeText(text).then(showSuccess).catch(function() {
						if (rtclFallbackCopy(text)) {
							showSuccess();
						}
					});
				} else {
					if (rtclFallbackCopy(text)) {
						showSuccess();
					}
				}
			}

			document.querySelectorAll(".rtcl-mcp-tab").forEach(function(tab) {
				tab.addEventListener("click", function() {
					document.querySelectorAll(".rtcl-mcp-tab").forEach(function(t) { t.classList.remove("active"); });
					document.querySelectorAll(".rtcl-mcp-tab-content").forEach(function(c) { c.classList.remove("active"); });
					this.classList.add("active");
					document.getElementById("tab-" + this.dataset.tab).classList.add("active");
				});
			});

		</script>';
	}

	/**
	 * Placeholder replaced in the config snippets once credentials are created on the page.
	 */
	const CREDENTIALS_PLACEHOLDER = 'YOUR_BASE64_CREDENTIALS';

	/**
	 * Setup guide: progress stepper, four steps (Application Password, credentials, AI app, try it) and an
	 * "at a glance" sidebar (endpoint, requirements, safety tips).
	 *
	 * The Base64 credentials are created in the browser; the Application Password is never sent to or stored by
	 * Classified Listing (it is created through the WordPress core REST endpoint, like Profile → Application Passwords).
	 *
	 * @param string $endpoint MCP endpoint URL.
	 * @param bool   $is_ssl   Whether the site runs on HTTPS.
	 */
	private static function render_setup_guide( string $endpoint, bool $is_ssl ) {
		$user          = wp_get_current_user();
		$app_pw_ok     = function_exists( 'wp_is_application_passwords_available_for_user' ) && wp_is_application_passwords_available_for_user( $user );
		$app_pw_global = function_exists( 'wp_is_application_passwords_available' ) && wp_is_application_passwords_available();
		$profile_url   = admin_url( 'profile.php#application-passwords-section' );
		$ph            = self::CREDENTIALS_PLACEHOLDER;
		$accounts      = self::get_admin_accounts();

		echo '<div class="rtcl-mcp-card rtcl-mcp-guide">';
		echo '<div class="rtcl-mcp-card-header"><div class="title"><div class="icon">⚙️</div><h2>' . esc_html__( 'Connect your AI assistant', 'classified-listing' ) . '</h2></div>';
		echo '<span class="sub">' . esc_html__( 'About 5 minutes · no coding needed', 'classified-listing' ) . '</span></div>';

		// Progress.
		$steps = [
			'credentials' => __( 'Get your credentials', 'classified-listing' ),
			'connect'     => __( 'Connect your app', 'classified-listing' ),
			'try'         => __( 'Test it', 'classified-listing' ),
		];
		// Stepper = navigation: every step can be opened at any time (no step is locked).
		echo '<nav class="rtcl-mcp-stepper" aria-label="' . esc_attr__( 'Setup steps', 'classified-listing' ) . '">';
		$i = 0;
		foreach ( $steps as $key => $label ) {
			$i++;
			printf(
				'<button type="button" class="s%4$s" data-step="%1$s" data-goto="%1$s" aria-controls="rtcl-mcp-step-%1$s"%5$s><span class="n">%2$d</span><span class="l">%3$s</span></button>',
				esc_attr( $key ),
				(int) $i,
				esc_html( $label ),
				1 === $i ? ' active' : '',
				1 === $i ? ' aria-current="step"' : ''
			);
		}
		echo '</nav>';

		echo '<div class="rtcl-mcp-guide-grid">';
		echo '<div class="rtcl-mcp-guide-main">';

		// Step 1: account → Application Password (generate or paste) → credentials, all in one step.
		self::step_open( 'credentials', 1, __( 'Get your credentials', 'classified-listing' ), __( 'Your AI app signs in with one code made from an administrator username and an Application Password — a separate password only for apps that you can revoke any time. The code is made in your browser and never saved.', 'classified-listing' ) );

		// A. Account.
		echo '<div class="rtcl-mcp-sub"><div class="rtcl-mcp-sub-title"><span class="k">A</span>' . esc_html__( 'Choose the administrator account', 'classified-listing' ) . '</div>';
		echo '<div class="rtcl-mcp-inline"><input type="text" id="rtcl-mcp-user" autocomplete="off" readonly aria-label="' . esc_attr__( 'Username', 'classified-listing' ) . '" value="' . esc_attr( $user->user_login ) . '" /> ';
		echo '<select id="rtcl-mcp-account" aria-label="' . esc_attr__( 'Administrator account', 'classified-listing' ) . '">';
		foreach ( $accounts as $account ) {
			printf(
				'<option value="%1$d"%2$s>%3$s</option>',
				(int) $account['id'],
				selected( (int) $account['id'], (int) $user->ID, false ),
				esc_html( $account['label'] )
			);
		}
		echo '</select></div>';
		echo '<p class="rtcl-mcp-hint">' . esc_html__( 'Only administrators are listed: the AI assistant gets the permissions of this account.', 'classified-listing' ) . '</p></div>';

		// B. Application Password: generate or paste.
		echo '<div class="rtcl-mcp-sub"><div class="rtcl-mcp-sub-title"><span class="k">B</span>' . esc_html__( 'Get an Application Password', 'classified-listing' ) . '</div>';
		if ( $app_pw_ok ) {
			echo '<div class="rtcl-mcp-field"><label for="rtcl-mcp-app-name">' . esc_html__( 'Create a new one — name (to recognize it later)', 'classified-listing' ) . '</label>';
			echo '<div class="rtcl-mcp-inline"><input type="text" id="rtcl-mcp-app-name" value="' . esc_attr( sprintf( 'Classified Listing MCP – %s', wp_date( 'Y-m-d' ) ) ) . '" /> ';
			echo '<button type="button" class="button button-primary rtcl-mcp-btn" id="rtcl-mcp-generate">' . esc_html__( 'Generate Application Password', 'classified-listing' ) . '</button></div></div>';
			echo '<div class="rtcl-mcp-msg" id="rtcl-mcp-generate-msg" role="status" aria-live="polite"></div>';
			echo '<div class="rtcl-mcp-or"><span>' . esc_html__( 'or paste an existing one', 'classified-listing' ) . '</span></div>';
		} else {
			echo '<div class="rtcl-mcp-alert rtcl-mcp-alert-warning" style="margin:0 0 12px;">⚠️ ' . esc_html__( 'Application Passwords are not available on this site, so one cannot be created here. See "Requirements" on the right.', 'classified-listing' ) . '</div>';
		}
		echo '<div class="rtcl-mcp-field"><label for="rtcl-mcp-pass">' . esc_html__( 'Application Password', 'classified-listing' ) . '</label>';
		echo '<div class="rtcl-mcp-inline"><input type="password" id="rtcl-mcp-pass" autocomplete="new-password" placeholder="xxxx xxxx xxxx xxxx xxxx xxxx" /> ';
		echo '<button type="button" class="button rtcl-mcp-btn-outline" id="rtcl-mcp-toggle">' . esc_html__( 'Show', 'classified-listing' ) . '</button></div>';
		echo '<details class="rtcl-mcp-more" style="margin-top:8px;"><summary>' . esc_html__( 'Prefer to create it yourself?', 'classified-listing' ) . '</summary><p>' . sprintf(
			/* translators: %s: link to the profile page */
			esc_html__( 'Open %s, enter a name, click "Add New Application Password" and copy the password (it is shown only once). Then paste it above.', 'classified-listing' ),
			'<a id="rtcl-mcp-profile-link" href="' . esc_url( $profile_url ) . '">' . esc_html__( 'the account\'s profile → Application Passwords', 'classified-listing' ) . '</a>'
		) . '</p></details></div></div>';

		// C. Credentials.
		echo '<div class="rtcl-mcp-sub"><div class="rtcl-mcp-sub-title"><span class="k">C</span>' . esc_html__( 'Create your credentials', 'classified-listing' ) . '</div>';
		echo '<button type="button" class="button button-primary rtcl-mcp-btn" id="rtcl-mcp-make">' . esc_html__( 'Create credentials', 'classified-listing' ) . '</button>';
		echo '<span class="rtcl-mcp-hint" style="margin-left:8px;">' . esc_html__( 'Done automatically when you generate a password.', 'classified-listing' ) . '</span>';
		echo '<div class="rtcl-mcp-msg" id="rtcl-mcp-make-msg" role="status" aria-live="polite"></div>';
		echo '<div class="rtcl-mcp-result" id="rtcl-mcp-result">';
		echo '<strong style="font-size:12px;">' . esc_html__( 'Your credentials', 'classified-listing' ) . '</strong><code id="rtcl-mcp-b64"></code>';
		echo '<div class="rtcl-mcp-inline">';
		echo '<button type="button" class="button button-primary rtcl-mcp-btn" id="rtcl-mcp-copy-b64">' . esc_html__( 'Copy', 'classified-listing' ) . '</button> ';
		echo '<button type="button" class="button rtcl-mcp-btn-outline" id="rtcl-mcp-test">' . esc_html__( 'Test connection', 'classified-listing' ) . '</button> ';
		echo '<button type="button" class="button" id="rtcl-mcp-clear">' . esc_html__( 'Clear', 'classified-listing' ) . '</button>';
		echo '</div>';
		echo '<div class="rtcl-mcp-msg" id="rtcl-mcp-test-msg" role="status" aria-live="polite"></div>';
		echo '<p class="rtcl-mcp-hint">' . esc_html__( 'Added to the code in the next step. Clear it before sharing your screen.', 'classified-listing' ) . '</p>';
		echo '</div></div>';
		self::step_close( '', 'connect', $steps['connect'] );

		// Step 2: per-app configuration.
		$args = [ '-y', 'mcp-remote', $endpoint ];
		if ( ! $is_ssl ) {
			$args[] = '--allow-http';
		}
		$args = array_merge( $args, [ '--header', 'Authorization: Basic ' . $ph ] );
		$json = function ( $data ) {
			return wp_json_encode( $data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
		};
		$stdio_server  = [ 'command' => 'npx', 'args' => $args ];
		$vscode_server = [ 'type' => 'stdio', 'command' => 'npx', 'args' => $args ];
		$claude_code   = 'claude mcp add --transport http classified-listing ' . $endpoint . ' --header "Authorization: Basic ' . $ph . '"';

		self::step_open( 'connect', 2, __( 'Add the connection to your AI app', 'classified-listing' ), __( 'Choose your app, follow its short steps and copy the ready-made code — it already contains your credentials from step 1.', 'classified-listing' ) );
		echo '<div class="rtcl-mcp-tabs pills">';
		echo '<div class="rtcl-mcp-tab active" data-tab="claude-desktop">' . esc_html__( 'Claude Desktop', 'classified-listing' ) . '</div>';
		echo '<div class="rtcl-mcp-tab" data-tab="claude-code">' . esc_html__( 'Claude Code', 'classified-listing' ) . '</div>';
		echo '<div class="rtcl-mcp-tab" data-tab="codex">' . esc_html__( 'Codex', 'classified-listing' ) . '</div>';
		echo '<div class="rtcl-mcp-tab" data-tab="cursor">' . esc_html__( 'Cursor', 'classified-listing' ) . '</div>';
		echo '<div class="rtcl-mcp-tab" data-tab="vscode">' . esc_html__( 'VS Code', 'classified-listing' ) . '</div>';
		echo '</div>';

		$node_chip = [ __( 'Needs Node.js', 'classified-listing' ), 'warn' ];
		$http_note = ! $is_ssl;

		self::render_app_tab( 'claude-desktop', true, [ $node_chip, [ __( 'File: claude_desktop_config.json', 'classified-listing' ), '' ] ], [
			[
				'title' => __( 'Open the config file', 'classified-listing' ),
				'text'  => __( 'In Claude Desktop, open Settings, go to Desktop app → Extensions and click Edit Config.', 'classified-listing' ),
				'nb'    => __( 'On older versions it is under Settings → Developer → Edit Config. Can\'t find it? Type "Developer" in the Settings search.', 'classified-listing' ),
				'hint'  => __( 'Opens claude_desktop_config.json (created if it does not exist). macOS: ~/Library/Application Support/Claude/ · Windows: %APPDATA%\Claude\\', 'classified-listing' ),
			],
			[
				'title' => __( 'Add the code', 'classified-listing' ),
				'json'  => [ 'root' => 'mcpServers', 'server' => $stdio_server, 'file' => 'claude_desktop_config.json', 'http' => $http_note ],
			],
			[
				'title' => __( 'Restart Claude', 'classified-listing' ),
				'text'  => __( 'Save the file, quit Claude completely (also from the menu bar / system tray) and open it again.', 'classified-listing' ),
			],
		] );

		self::render_app_tab( 'claude-code', false, [ [ __( 'No Node.js needed', 'classified-listing' ), 'ok' ], [ __( 'Terminal command', 'classified-listing' ), '' ] ], [
			[
				'title' => __( 'Run this command once', 'classified-listing' ),
				'text'  => __( 'Open a terminal and run:', 'classified-listing' ),
				'code'  => [ __( 'Terminal', 'classified-listing' ), $claude_code ],
			],
			[
				'title' => __( 'Check the connection', 'classified-listing' ),
				'text'  => __( 'Start Claude Code and type /mcp — "classified-listing" should show as connected.', 'classified-listing' ),
			],
		] );

		// Codex (OpenAI): ~/.codex/config.toml, [mcp_servers.<name>] table. TOML basic strings use JSON-compatible escaping.
		$toml_str   = function ( $value ) {
			return wp_json_encode( (string) $value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
		};
		$codex_toml = implode( "\n", [
			'[mcp_servers.classified-listing]',
			'command = ' . $toml_str( $stdio_server['command'] ),
			'args = [' . implode( ', ', array_map( $toml_str, $stdio_server['args'] ) ) . ']',
		] );
		self::render_app_tab( 'codex', false, [ $node_chip, [ __( 'File: ~/.codex/config.toml', 'classified-listing' ), '' ] ], [
			[
				'title' => __( 'Open the config file', 'classified-listing' ),
				'text'  => __( 'Open config.toml in the .codex folder of your home directory in any text editor. Create the folder and file if they do not exist.', 'classified-listing' ),
				'hint'  => __( 'macOS / Linux: ~/.codex/config.toml · Windows: %USERPROFILE%\\.codex\\config.toml', 'classified-listing' ),
			],
			[
				'title' => __( 'Add the code', 'classified-listing' ),
				'text'  => __( 'Paste this block at the end of the file — no commas or nesting needed. If a [mcp_servers.classified-listing] block already exists, replace it.', 'classified-listing' ),
				'code'  => [ 'config.toml', $codex_toml ],
				'note'  => $http_note ? __( 'HTTP site: the code includes --allow-http. Use HTTPS on a live site.', 'classified-listing' ) : '',
			],
			[
				'title' => __( 'Restart Codex', 'classified-listing' ),
				'text'  => __( 'Save the file and start a new Codex session; type /mcp to see "classified-listing" in the list.', 'classified-listing' ),
			],
		] );

		self::render_app_tab( 'cursor', false, [ $node_chip, [ __( 'File: mcp.json', 'classified-listing' ), '' ] ], [
			[
				'title' => __( 'Open the config file', 'classified-listing' ),
				'text'  => __( 'In Cursor, go to Settings → Cursor Settings → MCP → Add new MCP server.', 'classified-listing' ),
				'hint'  => __( 'Opens ~/.cursor/mcp.json. For one project only, use .cursor/mcp.json inside the project.', 'classified-listing' ),
			],
			[
				'title' => __( 'Add the code', 'classified-listing' ),
				'json'  => [ 'root' => 'mcpServers', 'server' => $stdio_server, 'file' => 'mcp.json', 'http' => $http_note ],
			],
			[
				'title' => __( 'Check the connection', 'classified-listing' ),
				'text'  => __( 'Save the file. The server shows a green dot when connected — restart Cursor if it does not.', 'classified-listing' ),
			],
		] );

		self::render_app_tab( 'vscode', false, [ $node_chip, [ __( 'File: mcp.json', 'classified-listing' ), '' ] ], [
			[
				'title' => __( 'Open the config file', 'classified-listing' ),
				'text'  => __( 'Open the Command Palette and run "MCP: Open User Configuration".', 'classified-listing' ),
				'hint'  => __( 'Or create .vscode/mcp.json in your project. Note: VS Code uses "servers" (not "mcpServers").', 'classified-listing' ),
			],
			[
				'title' => __( 'Add the code', 'classified-listing' ),
				'json'  => [ 'root' => 'servers', 'server' => $vscode_server, 'file' => 'mcp.json', 'http' => $http_note ],
			],
			[
				'title' => __( 'Start the server', 'classified-listing' ),
				'text'  => __( 'Save the file, click "Start" above the server entry, then use Copilot Chat in Agent mode.', 'classified-listing' ),
			],
		] );

		self::step_close( 'credentials', 'try', $steps['try'] );

		// Step 3: test the connection — the site from this page, then the AI app.
		self::step_open( 'try', 3, __( 'Test your connection', 'classified-listing' ), __( 'Check your site first, then your AI app.', 'classified-listing' ) );

		echo '<div class="rtcl-mcp-sub"><div class="rtcl-mcp-sub-title"><span class="k">A</span>' . esc_html__( 'Check your site', 'classified-listing' ) . '</div>';
		echo '<button type="button" class="button button-primary rtcl-mcp-btn" id="rtcl-mcp-site-check">' . esc_html__( 'Run site check', 'classified-listing' ) . '</button>';
		echo '<div class="rtcl-mcp-msg" id="rtcl-mcp-site-check-msg" role="status" aria-live="polite"></div>';
		echo '</div>';

		$app_checks = [
			__( 'Claude Desktop', 'classified-listing' ) => __( 'Settings → Desktop app → Extensions', 'classified-listing' ),
			__( 'Claude Code / Codex', 'classified-listing' ) => __( 'type /mcp', 'classified-listing' ),
			__( 'Cursor', 'classified-listing' )         => __( 'Settings → MCP', 'classified-listing' ),
			__( 'VS Code', 'classified-listing' )        => __( 'Command Palette → MCP: List Servers', 'classified-listing' ),
		];
		$test_prompt = __( 'What can you do with my Classified Listing site?', 'classified-listing' );

		echo '<div class="rtcl-mcp-sub"><div class="rtcl-mcp-sub-title"><span class="k">B</span>' . esc_html__( 'Check your AI app', 'classified-listing' ) . '</div>';
		echo '<ol class="rtcl-mcp-stages">';
		echo '<li class="rtcl-mcp-stage"><span class="dot" aria-hidden="true">1</span><h4>' . esc_html__( 'Quit the app fully and reopen it', 'classified-listing' ) . '</h4></li>';
		echo '<li class="rtcl-mcp-stage"><span class="dot" aria-hidden="true">2</span><h4>' . esc_html__( 'Check "classified-listing" is listed and running', 'classified-listing' ) . '</h4>';
		echo '<p class="rtcl-mcp-app-checks">';
		$parts = [];
		foreach ( $app_checks as $app => $where ) {
			$parts[] = '<strong>' . esc_html( $app ) . '</strong>: ' . esc_html( $where );
		}
		echo implode( ' &nbsp;·&nbsp; ', $parts ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- parts escaped above.
		echo '</p></li>';
		echo '<li class="rtcl-mcp-stage"><span class="dot" aria-hidden="true">3</span><h4>' . esc_html__( 'Ask', 'classified-listing' ) . '</h4>';
		echo '<div class="rtcl-mcp-test-prompt"><span>"' . esc_html( $test_prompt ) . '"</span>';
		echo '<button type="button" class="rtcl-mcp-copy-icon" onclick="rtclMcpCopy(this, ' . esc_attr( wp_json_encode( $test_prompt ) ) . ')">' . esc_html__( 'Copy', 'classified-listing' ) . '</button></div>';
		echo '<p class="rtcl-mcp-stage-hint">' . esc_html__( 'Allow the tool if asked. The reply should list Classified Listing tools.', 'classified-listing' ) . '</p></li>';
		echo '</ol></div>';

		echo '<div class="rtcl-mcp-try-result"><strong>' . esc_html__( 'Not working?', 'classified-listing' ) . '</strong><ul>';
		echo '<li>' . esc_html__( 'Site check fails or the reply mentions an administrator account: create new administrator credentials in step 1.', 'classified-listing' ) . '</li>';
		echo '<li>' . esc_html__( 'Server missing in the app: recheck where you pasted the configuration (step 2), then restart the app.', 'classified-listing' ) . '</li>';
		echo '<li>' . sprintf(
			/* translators: %s: link to the troubleshooting section */
			esc_html__( 'Still stuck? See %s.', 'classified-listing' ),
			'<a href="#rtcl-mcp-troubleshooting">' . esc_html__( 'Troubleshooting', 'classified-listing' ) . '</a>'
		) . '</li>';
		echo '</ul></div>';
		self::step_close( 'connect', '', '' );

		echo '</div>'; // .rtcl-mcp-guide-main

		// Sidebar.
		echo '<aside class="rtcl-mcp-guide-side">';

		echo '<div class="rtcl-mcp-side-box"><h4>' . esc_html__( 'At a glance', 'classified-listing' ) . '</h4>';
		echo '<div class="rtcl-mcp-endpoint"><code>' . esc_html( $endpoint ) . '</code><button type="button" class="rtcl-mcp-copy-icon" onclick="rtclMcpCopy(this, ' . esc_attr( wp_json_encode( $endpoint ) ) . ')">' . esc_html__( 'Copy', 'classified-listing' ) . '</button></div>';
		echo '<dl>';
		echo '<dt>' . esc_html__( 'Connection', 'classified-listing' ) . '</dt><dd>' . ( $is_ssl ? '🔒 HTTPS' : '⚠️ ' . esc_html__( 'HTTP (local)', 'classified-listing' ) ) . '</dd>';
		echo '<dt>' . esc_html__( 'Sign-in', 'classified-listing' ) . '</dt><dd>🔑 ' . esc_html__( 'Application Password', 'classified-listing' ) . '</dd>';
		echo '<dt>' . esc_html__( 'Access', 'classified-listing' ) . '</dt><dd>👤 ' . esc_html__( 'Administrator', 'classified-listing' ) . '</dd>';
		echo '</dl>';
		echo '<p class="rtcl-mcp-hint" style="margin-top:12px;">' . sprintf(
			/* translators: %s: link to the troubleshooting section */
			esc_html__( 'Problems connecting? See %s.', 'classified-listing' ),
			'<a href="#rtcl-mcp-troubleshooting">' . esc_html__( 'Troubleshooting', 'classified-listing' ) . '</a>'
		) . '</p></div>';

		echo '<div class="rtcl-mcp-side-box"><h4>' . esc_html__( 'Requirements', 'classified-listing' ) . '</h4><ul class="rtcl-mcp-check">';
		self::check_item( true, __( 'MCP Integration and MCP Adapter active', 'classified-listing' ) );
		self::check_item( current_user_can( 'manage_options' ), __( 'Signed in as an administrator', 'classified-listing' ) );
		if ( $app_pw_ok ) {
			self::check_item( true, __( 'Application Passwords available', 'classified-listing' ) );
		} else {
			self::check_item(
				false,
				__( 'Application Passwords not available', 'classified-listing' ),
				$app_pw_global
					? __( 'Disabled for your account (e.g. by a security plugin).', 'classified-listing' )
					: __( 'They need HTTPS (or a local site) and may be disabled by a plugin or your host.', 'classified-listing' )
			);
		}
		self::check_item( null, __( 'Node.js on your computer', 'classified-listing' ), __( 'For Claude Desktop, Cursor and VS Code (nodejs.org, LTS).', 'classified-listing' ) );
		echo '</ul></div>';

		echo '<details class="rtcl-mcp-side-box warn"><summary><h4><span>🔐 ' . esc_html__( 'Keep it safe', 'classified-listing' ) . '</span></h4></summary><ul class="tips">';
		echo '<li>' . esc_html__( 'The credentials work like a password for the selected administrator.', 'classified-listing' ) . '</li>';
		echo '<li>' . esc_html__( 'Never paste them into chats, emails or screenshots.', 'classified-listing' ) . '</li>';
		echo '<li>' . esc_html__( 'Use one Application Password per app.', 'classified-listing' ) . '</li>';
		echo '<li>' . esc_html__( 'Revoke it in Users → Profile → Application Passwords when an app is no longer used.', 'classified-listing' ) . '</li>';
		echo '</ul></details>';

		echo '</aside>';
		echo '</div>'; // .rtcl-mcp-guide-grid
		echo '</div>'; // .rtcl-mcp-guide

		self::render_setup_script( $app_pw_ok, $accounts );
	}

	/**
	 * Open a guide step.
	 *
	 * @param string $key   Step key (stepper anchor).
	 * @param int    $num   Step number.
	 * @param string $title Title.
	 * @param string $lead  One-line explanation.
	 */
	private static function step_open( string $key, int $num, string $title, string $lead ) {
		// Only the first step is visible initially; the script switches panels (and restores the step from the URL).
		printf(
			'<section class="rtcl-mcp-gstep" id="rtcl-mcp-step-%1$s" data-step="%1$s" aria-labelledby="rtcl-mcp-step-%1$s-title"%6$s><div class="rtcl-mcp-gstep-head"><span class="n">%2$d</span><h3 id="rtcl-mcp-step-%1$s-title">%3$s</h3><span class="rtcl-mcp-pill">%4$s</span></div><p class="rtcl-mcp-lead">%5$s</p><div class="rtcl-mcp-gstep-body">',
			esc_attr( $key ),
			(int) $num,
			esc_html( $title ),
			esc_html__( '✓ Done', 'classified-listing' ),
			esc_html( $lead ),
			1 === $num ? '' : ' hidden'
		);
	}

	/**
	 * Close a guide step with its Back / Next navigation (never blocked).
	 *
	 * @param string $prev       Previous step key ('' for none).
	 * @param string $next       Next step key ('' on the last step).
	 * @param string $next_label Next step label.
	 */
	private static function step_close( string $prev = '', string $next = '', string $next_label = '' ) {
		echo '</div>';
		echo '<div class="rtcl-mcp-gstep-nav">';
		if ( $prev ) {
			printf( '<button type="button" class="button rtcl-mcp-btn-outline" data-goto="%1$s">← %2$s</button>', esc_attr( $prev ), esc_html__( 'Back', 'classified-listing' ) );
		} else {
			echo '<span></span>';
		}
		if ( $next ) {
			printf(
				'<button type="button" class="button button-primary rtcl-mcp-btn rtcl-mcp-next" data-goto="%1$s">%2$s</button>',
				esc_attr( $next ),
				/* translators: %s: next step name */
				esc_html( sprintf( __( 'Next: %s →', 'classified-listing' ), $next_label ) )
			);
		} else {
			printf( '<a class="button button-primary rtcl-mcp-btn" href="#rtcl-mcp-prompts">%s</a>', esc_html__( 'See example prompts ↓', 'classified-listing' ) );
		}
		echo '</div>';
		echo '</section>';
	}

	/**
	 * Administrator accounts that credentials can be created for (Administrator role only; other roles are
	 * never offered). appPassUrl is only set when the current user may create Application Passwords for the
	 * account (WordPress' create_app_password check); the REST endpoint checks it again.
	 *
	 * @return array<int, array{id: int, login: string, label: string, appPassUrl: string, profileUrl: string}>
	 */
	private static function get_admin_accounts(): array {
		$current = wp_get_current_user();
		$users   = get_users( [
			'role'    => 'administrator',
			'orderby' => 'display_name',
			'number'  => 200,
		] );

		// The signed-in user (e.g. a multisite super admin without the role on this site) always comes first.
		$by_id = [ $current->ID => $current ];
		foreach ( $users as $u ) {
			$by_id[ $u->ID ] = $u;
		}

		$accounts = [];
		foreach ( $by_id as $u ) {
			if ( ! $u->exists() || ! user_can( $u, 'manage_options' ) ) {
				continue;
			}
			$can_create = function_exists( 'wp_is_application_passwords_available_for_user' )
				&& wp_is_application_passwords_available_for_user( $u )
				&& current_user_can( 'create_app_password', $u->ID );
			$is_me      = $u->ID === $current->ID;

			$accounts[] = [
				'id'         => (int) $u->ID,
				'login'      => $u->user_login,
				'label'      => $u->display_name && $u->display_name !== $u->user_login ? sprintf( '%s (%s)', $u->display_name, $u->user_login ) : $u->user_login,
				'appPassUrl' => $can_create ? rest_url( $is_me ? 'wp/v2/users/me/application-passwords' : 'wp/v2/users/' . $u->ID . '/application-passwords' ) : '',
				'profileUrl' => $is_me ? admin_url( 'profile.php#application-passwords-section' ) : admin_url( 'user-edit.php?user_id=' . $u->ID . '#application-passwords-section' ),
			];
		}

		return $accounts;
	}

	/**
	 * One requirement row. $state: true = ok, false = problem, null = info (cannot be checked here).
	 *
	 * @param bool|null $state Status.
	 * @param string    $label Label.
	 * @param string    $help  Optional explanation.
	 */
	private static function check_item( $state, string $label, string $help = '' ) {
		$class = null === $state ? 'info' : ( $state ? 'ok' : 'bad' );
		$icon  = null === $state ? 'i' : ( $state ? '✓' : '✕' );
		printf(
			'<li><span class="st %1$s" aria-hidden="true">%2$s</span><span>%3$s%4$s</span></li>',
			esc_attr( $class ),
			esc_html( $icon ),
			esc_html( $label ),
			$help ? '<small>' . esc_html( $help ) . '</small>' : ''
		);
	}

	/**
	 * App tab: requirement chips + a short timeline of titled stages (open the file, add the code, restart/check).
	 *
	 * @param string $id     Tab id.
	 * @param bool   $active Whether the tab is shown first.
	 * @param array  $chips  [ label, style ('warn'|'ok'|'') ] pairs.
	 * @param array  $stages Stages: title + text/hint, or code => [ label, code ], or json => [ root, server, file, http ].
	 */
	private static function render_app_tab( string $id, bool $active, array $chips, array $stages ) {
		echo '<div class="rtcl-mcp-tab-content' . ( $active ? ' active' : '' ) . '" id="tab-' . esc_attr( $id ) . '">';
		echo '<div class="rtcl-mcp-chips">';
		foreach ( $chips as $chip ) {
			echo '<span class="rtcl-mcp-chip ' . esc_attr( $chip[1] ) . '">' . esc_html( $chip[0] ) . '</span>';
		}
		echo '</div>';

		echo '<ol class="rtcl-mcp-stages">';
		$n = 0;
		foreach ( $stages as $stage ) {
			$n++;
			echo '<li class="rtcl-mcp-stage"><span class="dot" aria-hidden="true">' . (int) $n . '</span>';
			echo '<h4>' . esc_html( $stage['title'] ) . '</h4>';
			if ( ! empty( $stage['text'] ) ) {
				echo '<p>' . esc_html( $stage['text'] ) . '</p>';
			}
			if ( ! empty( $stage['nb'] ) ) {
				echo '<p class="rtcl-mcp-stage-hint"><strong>' . esc_html__( 'N.B.:', 'classified-listing' ) . '</strong> ' . esc_html( $stage['nb'] ) . '</p>';
			}
			if ( ! empty( $stage['hint'] ) ) {
				echo '<p class="rtcl-mcp-stage-hint">' . esc_html( $stage['hint'] ) . '</p>';
			}
			if ( ! empty( $stage['code'] ) ) {
				self::render_code_block( $stage['code'][0], $stage['code'][1] );
			}
			if ( ! empty( $stage['note'] ) ) {
				echo '<p class="rtcl-mcp-http-note">⚠️ ' . esc_html( $stage['note'] ) . '</p>';
			}
			if ( ! empty( $stage['json'] ) ) {
				self::render_json_variants( $stage['json']['root'], $stage['json']['server'], $stage['json']['file'], ! empty( $stage['json']['http'] ) );
			}
			echo '</li>';
		}
		echo '</ol>';
		echo '</div>';
	}

	/**
	 * Code block whose credentials placeholder is filled by the helper script.
	 *
	 * @param string $label Header label.
	 * @param string $code  Code template.
	 */
	private static function render_code_block( string $label, string $code ) {
		echo '<div class="rtcl-mcp-code"><div class="rtcl-mcp-code-header"><span>' . esc_html( $label ) . '</span><button type="button" class="rtcl-mcp-copy-btn" onclick="rtclMcpCopyCode(this)">' . esc_html__( 'Copy', 'classified-listing' ) . '</button></div>';
		echo '<pre class="rtcl-mcp-config" data-template="' . esc_attr( $code ) . '">' . esc_html( $code ) . '</pre></div>';
	}

	/**
	 * Readable JSON: 2-space indentation, short lists / small flat objects on one line.
	 *
	 * @param mixed $data  Data.
	 * @param int   $level Nesting level.
	 *
	 * @return string
	 */
	private static function compact_json( $data, int $level = 0 ): string {
		$enc = function ( $value ) {
			return wp_json_encode( $value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
		};
		if ( ! is_array( $data ) ) {
			return $enc( $data );
		}
		$is_list = array_keys( $data ) === range( 0, count( $data ) - 1 );
		if ( empty( $data ) ) {
			return $is_list ? '[]' : '{}';
		}
		if ( ! array_filter( $data, 'is_array' ) ) {
			$inline = $is_list
				? '[' . implode( ', ', array_map( $enc, $data ) ) . ']'
				: '{ ' . implode( ', ', array_map( function ( $k, $v ) use ( $enc ) {
					return $enc( (string) $k ) . ': ' . $enc( $v );
				}, array_keys( $data ), $data ) ) . ' }';
			if ( strlen( $inline ) <= 90 ) {
				return $inline;
			}
		}
		$pad   = str_repeat( '  ', $level );
		$items = [];
		foreach ( $data as $k => $v ) {
			$items[] = $pad . '  ' . ( $is_list ? '' : $enc( (string) $k ) . ': ' ) . self::compact_json( $v, $level + 1 );
		}

		return ( $is_list ? '[' : '{' ) . "\n" . implode( ",\n", $items ) . "\n" . $pad . ( $is_list ? ']' : '}' );
	}

	/**
	 * "My file is: …" — the right code and where to put it for a new/empty file, a file with other settings,
	 * or a file that already lists servers.
	 *
	 * @param string $root      Server list key ("mcpServers" or "servers").
	 * @param array  $server    The "classified-listing" server entry.
	 * @param string $filename  Config file name.
	 * @param bool   $http_note Show the --allow-http note (HTTP site).
	 */
	private static function render_json_variants( string $root, array $server, string $filename, bool $http_note = false ) {
		$variants = [
			'new'     => [
				'label' => __( 'Empty or new', 'classified-listing' ),
				/* translators: %s: config file name */
				'how'   => sprintf( __( 'Replace everything in %s with this code.', 'classified-listing' ), $filename ),
				'code'  => self::compact_json( [ $root => [ 'classified-listing' => $server ] ] ),
				/* translators: %s: config file name */
				'code_label' => sprintf( __( 'Complete %s', 'classified-listing' ), $filename ),
				'example'    => '',
			],
			'section' => [
				'label' => __( 'Has other settings', 'classified-listing' ),
				/* translators: %s: server list key */
				'how'   => sprintf( __( 'Keep your settings. Add a comma after the last one, then paste this section just before the final closing }. (Use this when there is no "%s" yet.)', 'classified-listing' ), $root ),
				'code'  => '"' . $root . '": ' . self::compact_json( [ 'classified-listing' => $server ] ),
				/* translators: %s: server list key */
				'code_label' => sprintf( __( '"%s" section', 'classified-listing' ), $root ),
				'example'    => implode( "\n", [
					'{',
					'  "preferences": { … },      ← ' . __( 'add this comma', 'classified-listing' ),
					'  "' . $root . '": { … }      ← ' . __( 'pasted section', 'classified-listing' ),
					'}',
				] ),
			],
			'entry'   => [
				/* translators: %s: server list key */
				'label' => sprintf( __( 'Already has "%s"', 'classified-listing' ), $root ),
				/* translators: %s: server list key */
				'how'   => sprintf( __( 'Inside "%s", add a comma after the last server, then paste this entry before its closing }. If an old "classified-listing" entry exists, replace it instead.', 'classified-listing' ), $root ),
				'code'  => '"classified-listing": ' . self::compact_json( $server ),
				'code_label' => __( '"classified-listing" entry', 'classified-listing' ),
				'example'    => implode( "\n", [
					'{',
					'  "' . $root . '": {',
					'    "other-server": { … },        ← ' . __( 'add this comma', 'classified-listing' ),
					'    "classified-listing": { … }   ← ' . __( 'pasted entry', 'classified-listing' ),
					'  }',
					'}',
				] ),
			],
		];

		echo '<div class="rtcl-mcp-variants-wrap">';
		echo '<div class="rtcl-mcp-variants-row"><span class="rtcl-mcp-variants-q">' . esc_html__( 'My file is:', 'classified-listing' ) . '</span>';
		echo '<div class="rtcl-mcp-variants" role="group" aria-label="' . esc_attr__( 'What your config file looks like', 'classified-listing' ) . '">';
		$first = true;
		foreach ( $variants as $key => $v ) {
			printf(
				'<button type="button" class="rtcl-mcp-variant%3$s" data-variant="%1$s" aria-pressed="%4$s">%2$s</button>',
				esc_attr( $key ),
				esc_html( $v['label'] ),
				$first ? ' active' : '',
				$first ? 'true' : 'false'
			);
			$first = false;
		}
		echo '</div></div>';

		$first = true;
		foreach ( $variants as $key => $v ) {
			echo '<div class="rtcl-mcp-variant-panel" data-variant="' . esc_attr( $key ) . '"' . ( $first ? '' : ' hidden' ) . '>';
			echo '<p class="rtcl-mcp-variant-how">' . esc_html( $v['how'] ) . '</p>';
			self::render_code_block( $v['code_label'], $v['code'] );
			if ( $v['example'] ) {
				echo '<details class="rtcl-mcp-more"><summary>' . esc_html__( 'Show where it goes', 'classified-listing' ) . '</summary><pre class="rtcl-mcp-example">' . esc_html( $v['example'] ) . '</pre>';
				echo '<p>💡 ' . esc_html__( 'Inside each { }, every entry except the last one ends with a comma. If the app reports an error after saving, a comma is usually missing or there is one too many.', 'classified-listing' ) . '</p></details>';
			}
			echo '</div>';
			$first = false;
		}
		if ( $http_note ) {
			echo '<p class="rtcl-mcp-http-note">⚠️ ' . esc_html__( 'HTTP site: the code includes --allow-http. Use HTTPS on a live site.', 'classified-listing' ) . '</p>';
		}
		echo '</div>';
	}

	/**
	 * Credentials helper script.
	 *
	 * @param bool  $app_pw_ok Whether Application Passwords can be created for the current user.
	 * @param array $accounts  Administrator accounts (see get_admin_accounts()).
	 */
	private static function render_setup_script( bool $app_pw_ok, array $accounts ) {
		$config = [
			'placeholder' => self::CREDENTIALS_PLACEHOLDER,
			'appPassUrl'  => $app_pw_ok ? rest_url( 'wp/v2/users/me/application-passwords' ) : '',
			'accounts'    => $accounts,
			'nonce'       => wp_create_nonce( 'wp_rest' ),
			'mcpUrl'      => rest_url( 'mcp/mcp-adapter-default-server' ),
			'i18n'        => [
				'generating'  => __( 'Creating the Application Password…', 'classified-listing' ),
				'noGenerate'  => __( 'You cannot create Application Passwords for this account. Create one in its profile, or choose another administrator.', 'classified-listing' ),
				'generated'   => __( 'Application Password created and filled in below — your credentials are ready. The password is not shown again; the credentials are all you need.', 'classified-listing' ),
				'genFailed'   => __( 'Could not create the Application Password:', 'classified-listing' ),
				'missing'     => __( 'Enter your username and Application Password first.', 'classified-listing' ),
				'made'        => __( 'Credentials created and added to the configuration code below.', 'classified-listing' ),
				'testing'     => __( 'Testing the connection…', 'classified-listing' ),
				'testOk'      => __( 'Your site accepts these credentials — the MCP endpoint is working.', 'classified-listing' ),
				'testAuth'    => __( 'The site rejected these credentials. Check the username and Application Password (or see Troubleshooting).', 'classified-listing' ),
				'testFail'    => __( 'The connection test failed:', 'classified-listing' ),
				'noToken'     => __( 'No credentials yet — create them in step 1 first (they are not kept after the page reloads).', 'classified-listing' ),
				'copied'      => __( 'Copied', 'classified-listing' ),
				'copy'        => __( 'Copy', 'classified-listing' ),
				'show'        => __( 'Show', 'classified-listing' ),
				'hide'        => __( 'Hide', 'classified-listing' ),
			],
		];
		?>
		<script>
			( function () {
				var cfg = <?php echo wp_json_encode( $config ); ?>;
				var $ = function ( id ) { return document.getElementById( id ); };
				var token = '';

				function msg( id, text, type ) {
					var el = $( id );
					if ( el ) { el.textContent = text; el.className = 'rtcl-mcp-msg ' + ( type || '' ); }
				}
				function fill( value ) {
					document.querySelectorAll( '.rtcl-mcp-config' ).forEach( function ( pre ) {
						pre.textContent = pre.getAttribute( 'data-template' ).split( cfg.placeholder ).join( value || cfg.placeholder );
					} );
				}
				function makeCredentials() {
					var user = ( $( 'rtcl-mcp-user' ).value || '' ).trim();
					var pass = ( $( 'rtcl-mcp-pass' ).value || '' ).replace( /\s+/g, '' );
					if ( ! user || ! pass ) {
						msg( 'rtcl-mcp-make-msg', cfg.i18n.missing, 'err' );
						return false;
					}
					token = btoa( unescape( encodeURIComponent( user + ':' + pass ) ) );
					$( 'rtcl-mcp-b64' ).textContent = token;
					$( 'rtcl-mcp-result' ).style.display = 'block';
					msg( 'rtcl-mcp-make-msg', cfg.i18n.made, 'ok' );
					msg( 'rtcl-mcp-test-msg', '', '' );
					fill( token );
					updateProgress();
					return true;
				}

				// Steps work like tabs with Back / Next — nothing is locked, any step can be opened at any time.
				var STEPS = [ 'credentials', 'connect', 'try' ];
				function goTo( key, scroll ) {
					if ( STEPS.indexOf( key ) < 0 ) { return; }
					STEPS.forEach( function ( k ) {
						var panel = $( 'rtcl-mcp-step-' + k );
						if ( panel ) { panel.hidden = k !== key; }
					} );
					document.querySelectorAll( '.rtcl-mcp-stepper .s' ).forEach( function ( b ) {
						var on = b.getAttribute( 'data-step' ) === key;
						b.classList.toggle( 'active', on );
						if ( on ) { b.setAttribute( 'aria-current', 'step' ); } else { b.removeAttribute( 'aria-current' ); }
					} );
					if ( window.history && history.replaceState ) { history.replaceState( null, '', '#mcp-step-' + key ); }
					var guide = document.querySelector( '.rtcl-mcp-guide' );
					if ( scroll && guide && guide.getBoundingClientRect().top < 0 ) { guide.scrollIntoView( { behavior: 'smooth', block: 'start' } ); }
				}
				// "What does your config file look like?" choices (per app tab).
				document.querySelectorAll( '.rtcl-mcp-variants-wrap' ).forEach( function ( wrap ) {
					wrap.querySelectorAll( '.rtcl-mcp-variant' ).forEach( function ( btn ) {
						btn.addEventListener( 'click', function () {
							var key = this.getAttribute( 'data-variant' );
							wrap.querySelectorAll( '.rtcl-mcp-variant' ).forEach( function ( b ) {
								var on = b === btn;
								b.classList.toggle( 'active', on );
								b.setAttribute( 'aria-pressed', on ? 'true' : 'false' );
							} );
							wrap.querySelectorAll( '.rtcl-mcp-variant-panel' ).forEach( function ( p ) {
								p.hidden = p.getAttribute( 'data-variant' ) !== key;
							} );
						} );
					} );
				} );

				document.querySelectorAll( '.rtcl-mcp-guide [data-goto]' ).forEach( function ( b ) {
					b.addEventListener( 'click', function () { goTo( this.getAttribute( 'data-goto' ), true ); } );
				} );

				// Progress: credentials → connect (a code was copied) → try. Shown as "done", never blocking.
				var progress = { credentials: false, connect: false, 'try': false };
				function updateProgress() {
					progress.credentials = !! token;
					STEPS.forEach( function ( key ) {
						document.querySelectorAll( '[data-step="' + key + '"]' ).forEach( function ( el ) {
							el.classList.toggle( 'done', !! progress[ key ] );
						} );
					} );
					var next = document.querySelector( '#rtcl-mcp-step-credentials .rtcl-mcp-next' );
					if ( next ) { next.classList.toggle( 'attention', progress.credentials ); }
				}
				$( 'rtcl-mcp-pass' ).addEventListener( 'input', updateProgress );
				document.querySelectorAll( '.rtcl-mcp-guide .rtcl-mcp-copy-btn' ).forEach( function ( btn ) {
					btn.addEventListener( 'click', function () { if ( token ) { progress.connect = true; updateProgress(); } } );
				} );

				var account = null;
				function selectAccount( id ) {
					account = null;
					( cfg.accounts || [] ).forEach( function ( a ) { if ( String( a.id ) === String( id ) ) { account = a; } } );
					if ( ! account ) { return; }
					$( 'rtcl-mcp-user' ).value = account.login;
					if ( $( 'rtcl-mcp-gen-account' ) ) { $( 'rtcl-mcp-gen-account' ).textContent = account.login; }
					if ( $( 'rtcl-mcp-profile-link' ) ) { $( 'rtcl-mcp-profile-link' ).setAttribute( 'href', account.profileUrl ); }
					var g = $( 'rtcl-mcp-generate' );
					if ( g ) { g.disabled = ! account.appPassUrl; }
					msg( 'rtcl-mcp-generate-msg', account.appPassUrl ? '' : cfg.i18n.noGenerate, account.appPassUrl ? '' : 'err' );
				}
				var accountSelect = $( 'rtcl-mcp-account' );
				if ( accountSelect ) {
					accountSelect.addEventListener( 'change', function () {
						// Never mix a password/credentials of one account with another account.
						$( 'rtcl-mcp-clear' ).click();
						selectAccount( this.value );
					} );
					selectAccount( accountSelect.value );
				}
				updateProgress();
				var fromHash = ( window.location.hash || '' ).replace( '#mcp-step-', '' );
				goTo( STEPS.indexOf( fromHash ) > -1 ? fromHash : STEPS[0], false );

				var gen = $( 'rtcl-mcp-generate' );
				if ( gen && cfg.appPassUrl ) {
					gen.addEventListener( 'click', function () {
						gen.disabled = true;
						msg( 'rtcl-mcp-generate-msg', cfg.i18n.generating, 'wait' );
						if ( ! account || ! account.appPassUrl ) {
							gen.disabled = false;
							msg( 'rtcl-mcp-generate-msg', cfg.i18n.noGenerate, 'err' );
							return;
						}
						fetch( account.appPassUrl, {
							method: 'POST',
							credentials: 'same-origin',
							headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': cfg.nonce },
							body: JSON.stringify( { name: ( $( 'rtcl-mcp-app-name' ).value || 'Classified Listing MCP' ).trim() } )
						} ).then( function ( r ) {
							return r.json().then( function ( d ) { return { ok: r.ok, d: d }; } );
						} ).then( function ( res ) {
							gen.disabled = false;
							if ( ! res.ok || ! res.d || ! res.d.password ) {
								msg( 'rtcl-mcp-generate-msg', cfg.i18n.genFailed + ' ' + ( ( res.d && res.d.message ) || '' ), 'err' );
								return;
							}
							$( 'rtcl-mcp-pass' ).value = res.d.password;
							msg( 'rtcl-mcp-generate-msg', cfg.i18n.generated, 'ok' );
							makeCredentials();
						} ).catch( function ( e ) {
							gen.disabled = false;
							msg( 'rtcl-mcp-generate-msg', cfg.i18n.genFailed + ' ' + e.message, 'err' );
						} );
					} );
				}

				$( 'rtcl-mcp-make' ).addEventListener( 'click', makeCredentials );
				$( 'rtcl-mcp-toggle' ).addEventListener( 'click', function () {
					var input = $( 'rtcl-mcp-pass' ), show = 'password' === input.type;
					input.type = show ? 'text' : 'password';
					this.textContent = show ? cfg.i18n.hide : cfg.i18n.show;
				} );
				$( 'rtcl-mcp-copy-b64' ).addEventListener( 'click', function () {
					if ( token && window.rtclMcpCopy ) { window.rtclMcpCopy( this, token ); }
				} );
				$( 'rtcl-mcp-clear' ).addEventListener( 'click', function () {
					token = '';
					$( 'rtcl-mcp-pass' ).value = '';
					$( 'rtcl-mcp-b64' ).textContent = '';
					$( 'rtcl-mcp-result' ).style.display = 'none';
					msg( 'rtcl-mcp-make-msg', '', '' );
					msg( 'rtcl-mcp-generate-msg', '', '' );
					fill( '' );
					progress.connect = false;
					updateProgress();
				} );
				function siteCheck( msgId ) {
					if ( ! token ) { msg( msgId, cfg.i18n.noToken, 'err' ); return; }
					msg( msgId, cfg.i18n.testing, 'wait' );
					// credentials: 'omit' — test the Application Password itself, not the browser login.
					fetch( cfg.mcpUrl, {
						method: 'POST',
						credentials: 'omit',
						headers: {
							'Authorization': 'Basic ' + token,
							'Content-Type': 'application/json',
							'Accept': 'application/json, text/event-stream',
							'MCP-Protocol-Version': '2025-11-25'
						},
						body: JSON.stringify( { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-11-25', capabilities: {}, clientInfo: { name: 'rtcl-setup-check', version: '1.0' } } } )
					} ).then( function ( r ) {
						if ( r.ok ) {
							msg( msgId, cfg.i18n.testOk, 'ok' );
						} else if ( 401 === r.status || 403 === r.status ) {
							msg( msgId, cfg.i18n.testAuth, 'err' );
						} else {
							msg( msgId, cfg.i18n.testFail + ' HTTP ' + r.status, 'err' );
						}
					} ).catch( function ( e ) {
						msg( msgId, cfg.i18n.testFail + ' ' + e.message, 'err' );
					} );
				}
				$( 'rtcl-mcp-test' ).addEventListener( 'click', function () { siteCheck( 'rtcl-mcp-test-msg' ); } );
				$( 'rtcl-mcp-site-check' ).addEventListener( 'click', function () { siteCheck( 'rtcl-mcp-site-check-msg' ); } );
			} )();
		</script>
		<?php
	}
}
