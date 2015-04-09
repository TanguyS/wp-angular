<?php

// Theme Setup
// =============================================================================
if ( ! function_exists( 'st_activate_theme' ) ) :
    function st_activate_theme() {

        // Responsive images.
        // =============================================================================

        update_option('thumbnail_size_w', 640);
        update_option('thumbnail_size_h', 377);

        update_option('medium_size_w', 1280);
        update_option('medium_size_h', 753);

        update_option('large_size_w', 1920);
        update_option('large_size_h', 1130);

    }
add_action('after_switch_theme', 'st_activate_theme'); 
endif;



if ( ! function_exists( 'st_setup_theme' ) ) :
    function st_setup_theme() {

        // Automatic feed links.
        // Adds RSS feed links to <head> for posts and comments.
        // =============================================================================

        add_theme_support( 'automatic-feed-links' );



        // Post formats.
        // =============================================================================

        add_theme_support( 'post-formats', array( 'quote' ) );



        // WordPress menus
        // =============================================================================

        register_nav_menus( array(
          'primary' => __( 'Primary Menu', 'hy' ),
          'footer'  => __( 'Footer Menu', 'hy' )
        ) );


        // Allow shortcodes in widgets.
        // =============================================================================

        add_filter( 'widget_text', 'do_shortcode' );



        // Remove unnecessary stuff.
        //
        // 1. Version number (for security).
        // 2. Really simple discovery.
        // 3. Windows live writer.
        // 4. Post relational links.
        // =============================================================================

        remove_action( 'wp_head', 'wp_generator' );                    // 1
        remove_action( 'wp_head', 'rsd_link' );                        // 2
        remove_action( 'wp_head', 'wlwmanifest_link' );                // 3
        remove_action( 'wp_head', 'start_post_rel_link' );             // 4
        remove_action( 'wp_head', 'index_rel_link' );                  // 4
        remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' ); // 4



        // Remove unneeded widgets that have undesirable query overhead
        // =============================================================================
        
        add_action( 'widgets_init', 'remove_unneeded_widgets' );

        function remove_unneeded_widgets() {
            unregister_widget('WP_Widget_Pages');
            unregister_widget('WP_Widget_Calendar');
            unregister_widget('WP_Widget_Tag_Cloud');
            unregister_widget('WP_Nav_Menu_Widget');
        }


        // Register sidebars
        // =============================================================================

        function st_widgets_init() {
            register_sidebar(
                array(
                    'name' => 'footer',
                    'id' => 'widget-footer-area',
                    'description' => __( 'Here the Widget for the footer.'),
                    'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
                    'after_widget' => "</li>",
                    'before_title' => '<p>',
                    'after_title' => '</p>'
                )
            );
        }
        // Add the widget areas
        add_action( 'init', 'st_widgets_init' );



        // Hide admin bar
        // =============================================================================
        
        add_filter( 'show_admin_bar', '__return_false' );


        // Fix inputs length
        // =============================================================================

        add_action("admin_head", 'fix_text_inputs_length');

        function fix_text_inputs_length() {
            ?>
            <style>
            .rwmb-input input[type="text"] { width: 100%; }
            </style>
            <?
        }


        // Remove notices for non-administrators
        // =============================================================================

        if (!current_user_can('update_plugins')) {
            add_action('admin_init', create_function(false,"remove_action('admin_notices', 'update_nag', 3);"));
        }


        // Remove bar for non-administrators
        // =============================================================================

        if (!current_user_can('update_plugins')) {
            add_filter('show_admin_bar', '__return_false');
        }


        // Remove bar for non-administrators
        // =============================================================================

        add_action( 'init', 'remove_page_editor', 10 );
        function remove_page_editor() {
            remove_post_type_support( 'page', 'editor' );
        }


        // remember me ticked by default
        // =============================================================================

        function st_check_rememberme(){
            global $rememberme;
            $rememberme = 1;
        }
        add_action("login_form", "st_check_rememberme");


        // change template choice place
        // =============================================================================

        function change_template_place(){
            add_meta_box( 
                'page-selection',
                'choix-page', 
                'choix-callback', 
                'choix', 
                'normal',
                'high', 
                'pass-callback' 
            );
        }
        add_action("add_meta_boxes", "change_template_place");


        // add template page in edit.php
        // =============================================================================

        add_action("manage_pages_custom_column",  "page_custom_columns");
        add_filter("manage_edit-page_columns", "page_edit_columns");

        function page_edit_columns($columns) {
            $columns = array(
                'cb' => '<input type="checkbox" />',
                'title' => __( 'Page' ),
                'template' => __( 'Template' ),
                'date' => __( 'Date' )
            );
            return $columns;
        }

        function page_custom_columns($column){
            global $post;

            switch ($column) {
                case "template":
                    $template = get_post_meta( $post->ID, '_wp_page_template', true );
                    echo (!empty($template)) ? str_replace('.php', '', $template) : __( 'page' );
                    break;
            }    
        }


        // set default page
        // =============================================================================

        function loginRedirect( $redirect_to, $request, $user ){
            if( is_array( $user->roles ) ) { // check if user has a role
                return "/wp-admin/edit.php?post_type=page";
            }
        }
        add_filter("login_redirect", "loginRedirect", 10, 3);




        // Remove unused menus
        // =============================================================================

        function remove_menus(){
            remove_menu_page( 'index.php' );                  //Dashboard
            remove_menu_page( 'edit.php' );                   //Posts
            // remove_menu_page( 'upload.php' );                 //Media
            // remove_menu_page( 'edit.php?post_type=page' );    //Pages
            remove_menu_page( 'edit-comments.php' );          //Comments
            // remove_menu_page( 'themes.php' );                 //Appearance
            // remove_menu_page( 'plugins.php' );                //Plugins
            // remove_menu_page( 'users.php' );                  //Users
            // remove_menu_page( 'tools.php' );                  //Tools
            // remove_menu_page( 'options-general.php' );        //Settings

            if (!current_user_can('update_plugins')) {
                remove_menu_page( 'themes.php' );                 //Appearance
                remove_menu_page( 'plugins.php' );                //Plugins
                remove_menu_page( 'users.php' );                  //Users
                remove_menu_page( 'tools.php' );                  //Tools
                remove_menu_page( 'options-general.php' );        //Settings
            }
        }
        add_action( 'admin_menu', 'remove_menus' );

    }
    add_action( 'after_setup_theme', 'st_setup_theme' );
endif;
?>