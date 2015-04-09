<?php

// Enqueue front-end styles
// =============================================================================

if ( ! function_exists( 'st_enqueue_site_styles' ) ) :
  function st_enqueue_site_styles() {

		// require main app styles
		wp_enqueue_style( 'production', get_template_directory_uri() . '/css/production.css', NULL, NULL, 'all' );

	}

	add_action( 'wp_enqueue_scripts', 'st_enqueue_site_styles' );
endif;


// Enqueue admin styles
// =============================================================================

if ( ! function_exists( 'st_enqueue_admin_styles' ) ) :
  function st_enqueue_admin_styles() {

  		// TODO
		$admin_css_dir = get_template_directory() . '/assets/css/admin/';

	}

	add_action( 'admin_enqueue_scripts', 'st_enqueue_admin_styles' );
endif;

?>