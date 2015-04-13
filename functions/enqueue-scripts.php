<?php

// Enqueue front-end scripts
// =============================================================================

if ( ! function_exists( 'st_enqueue_site_scripts' ) ) :
  function st_enqueue_site_scripts() {
	  	wp_deregister_script( 'jquery' );
		wp_register_script( 'jquery', get_template_directory_uri() . '/js/jquery-1.11.2.min.js');
		wp_enqueue_script( 'jquery' );

  		wp_enqueue_script( 'production',  get_template_directory_uri() . '/js/production.js', array('jquery'), '1.0.0', false );
	
  		wp_localize_script( 'production', 'blogInfo', array( 
  			'views' => get_bloginfo('template_directory') . '/coffee/views', 
        		'modules' => get_bloginfo('template_directory') . '/coffee/modules', 
  			'site' => get_bloginfo('wpurl'), 
        		'img' => get_bloginfo('template_directory') . '/img', 
  			'api' => get_bloginfo('wpurl').'/api/wpng/' ) 
  		);
  	
  	
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
