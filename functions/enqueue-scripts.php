<?php

// Enqueue front-end scripts
// =============================================================================

if ( ! function_exists( 'st_enqueue_site_scripts' ) ) :
  function st_enqueue_site_scripts() {
	  	wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', get_template_directory_uri() . '/assets/js/vendor/jquery-1.10.2.min.js');
		wp_enqueue_script( 'jquery' );

  		wp_enqueue_script( 'production',  get_template_directory_uri() . '/js/production.js', array('jquery'), '1.0.0', false );
	}

	add_action( 'wp_enqueue_scripts', 'st_enqueue_site_scripts' );
endif;


// Enqueue admin scripts
// =============================================================================

if ( ! function_exists( 'st_enqueue_admin_scripts' ) ) :
  function st_enqueue_admin_scripts() {
  		wp_enqueue_script( 'admin_scripts',  get_template_directory_uri() . '/js/admin.js', array('jquery'), '1.0.0', false );
	}

	add_action( 'admin_enqueue_scripts', 'st_enqueue_admin_scripts' );
endif;

?>