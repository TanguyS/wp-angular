<?php
/* see https://github.com/justintadlock/theme-mediaelement */

class Customize_Media_Element {

	private $path;
	private $version;

	public function __construct() {
		$this->version = '1.0.0';
		$this->path = get_template_directory_uri() . '/functions/vendor/customize_media_element';

		// enqueue style sheet and JavaScript.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'deregister_styles' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'deregister_scripts' ) );

	}

	public function deregister_styles() {

		wp_deregister_style( 'mediaelement' );
    	wp_deregister_style( 'wp-mediaelement' );

	}

	public function enqueue_styles() {

		wp_enqueue_style( 'customize_media_element', $this->path . '/mediaelement.css', array(), $this->version );
		
	}

	public function deregister_scripts() {

		wp_deregister_script( 'wp-mediaelement' );

	}

	public function enqueue_scripts() {

		wp_enqueue_script( 'media_element', $this->path . '/mediaelement-and-player.min.js', array(), $this->version, true );
		wp_enqueue_script( 'customize_media_element', $this->path . '/mediaelement.js', array(), $this->version, true );
		
	}

	
}

?>