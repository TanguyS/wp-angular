<?php

// Setup Customizer Links
// =============================================================================

function hy_remove_customize_submenu_page() {
	remove_submenu_page( 'themes.php', 'customize.php' );
}

add_action( 'admin_menu', 'hy_remove_customize_submenu_page' );


function hy_add_customizer_menu() {
    add_menu_page( 'Customize', 'Customize', 'edit_theme_options', 'customize.php', NULL, NULL, 61 );
    add_submenu_page( 'customize.php', 'Customizer Import', 'Import', 'edit_theme_options', 'import', 'x_customizer_import_option_page' );
    add_submenu_page( 'customize.php', 'Customizer Export', 'Export', 'edit_theme_options', 'export', 'x_customizer_export_option_page' );
}

add_action( 'admin_menu', 'hy_add_customizer_menu' );



// Remove Unused Native Sections
// =============================================================================

function hy_remove_customizer_sections( $wp_customize ) {
	$wp_customize->remove_section( 'nav' );
	// $wp_customize->remove_section( 'colors' );
	$wp_customize->remove_section( 'title_tagline' );
	// $wp_customize->remove_section( 'background_image' );
	$wp_customize->remove_section( 'static_front_page' );

	// $wp_customize->remove_panel( 'widgets' );
}

add_action( 'customize_register', 'hy_remove_customizer_sections' );



// Add customizer scripts
// =============================================================================

if ( ! function_exists( 'hy_enqueue_customizer_preview' ) ) :
	function hy_enqueue_customizer_preview() {

		wp_enqueue_script( 'absurd-js', get_template_directory_uri() . '/core/functions/admin/customizer/js/absurd.min.js', array( 'jquery' , 'customize-preview' ), '1.0.0', true );
		wp_enqueue_script( 'webfont-js', 'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', null, true );
		wp_enqueue_script( 'hy-customizer-preview-js', get_template_directory_uri() . '/core/functions/admin/customizer/js/customizer-preview.js', array( 'jquery' , 'customize-preview', 'absurd-js' ), '1.0.0', true );

	}
	add_action( 'customize_preview_init', 'hy_enqueue_customizer_preview' );

endif;

?>