<?php
// Custom Post types
// =============================================================================

// post_type_singular, plural lowercase
function register_type( $post_type_singular, $post_type_plural, $options = array() ) {

	$text_domain = 'sgdf';

	$labels = array(
		'name'               => _x( ucwords( $post_type_plural ), 'post type general name', $text_domain ),
		'singular_name'      => _x( ucwords( $post_type_singular ), 'post type singular name', $text_domain ),
		'menu_name'          => _x( ucwords( $post_type_plural ), 'admin menu', $text_domain ),
		'name_admin_bar'     => _x( ucwords( $post_type_singular ), 'add new on admin bar', $text_domain ),
		'add_new'            => _x( 'Add New', 'book', $text_domain ),
		'add_new_item'       => __( 'Add New ' . ucwords( $post_type_singular ), $text_domain ),
		'new_item'           => __( 'New ' . ucwords( $post_type_singular ), $text_domain ),
		'edit_item'          => __( 'Edit ' . ucwords( $post_type_singular ), $text_domain ),
		'view_item'          => __( 'View ' . ucwords( $post_type_singular ), $text_domain ),
		'all_items'          => __( 'All ' . ucwords( $post_type_plural ), $text_domain ),
		'search_items'       => __( 'Search ' . ucwords( $post_type_plural ), $text_domain ),
		'parent_item_colon'  => __( 'Parent ' . ucwords( $post_type_plural ) . ':', $text_domain ),
		'not_found'          => __( 'No ' . $post_type_plural . ' found.', $text_domain ),
		'not_found_in_trash' => __( 'No ' . $post_type_plural . ' found in Trash.', $text_domain )
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => $post_type_singular ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'menu_icon'       	 => null,
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
	);

	foreach ($options as $key => $option) {
		$args[$key] = $option;
	}

	return register_post_type( $post_type_singular, $args );
}

add_action('init', 'st_register_post_types');

function st_register_post_types() {

	$version = (floatval( get_bloginfo( 'version' ) ) >= '3.8');

	$menu_icon = ( $version ) ? 'dashicons-format-chat' : NULL;
	register_type( 'question', 'questions', array(
		'menu_icon'		=> $menu_icon,
		'supports'           => array( 'title' )
	) );

}


// register taxonomy
function add_custom_taxonomies( $taxonomy_singular, $taxonomy_plural, $post_type, $options = array() ) {
	// Add new "Locations" taxonomy to Posts
	$args = array(
		// Hierarchical taxonomy (like categories)
		'hierarchical' => true,
		// This array of options controls the labels displayed in the WordPress Admin UI
		'labels' => array(
		'name' => _x( ucwords( $taxonomy_plural ), 'taxonomy general name' ),
		'singular_name' => _x( ucwords( $taxonomy_singular ), 'taxonomy singular name' ),
		'search_items' =>  __( 'Search ' . ucwords( $taxonomy_plural ) ),
		'all_items' => __( 'All ' . ucwords( $taxonomy_plural ) ),
		'parent_item' => __( 'Parent ' . ucwords( $taxonomy_singular ) ),
		'parent_item_colon' => __( 'Parent ' . ucwords( $taxonomy_singular ) . ':' ),
		'edit_item' => __( 'Edit ' . ucwords( $taxonomy_singular ) ),
		'update_item' => __( 'Update ' . ucwords( $taxonomy_singular ) ),
		'add_new_item' => __( 'Add New ' . ucwords( $taxonomy_singular ) ),
		'new_item_name' => __( 'New ' . ucwords( $taxonomy_singular ) . ' Name' ),
		'menu_name' => __( ucwords( $taxonomy_plural ) ),
		),
		// Control the slugs used for this taxonomy
		'rewrite' => array(
			'slug' => $taxonomy_plural,
			'with_front' => false,
			'hierarchical' => true 
		)
	);

	foreach ($options as $key => $option) {
		$args[$key] = $option;
	}

	return register_taxonomy($taxonomy_singular, $post_type, $args );
}

add_action( 'init', 'st_register_taxonomies' );

function st_register_taxonomies() {
	add_custom_taxonomies( 'question_tag', 'question_tags', 'page', array(
		'hierarchical'		=> false
	) );
}

?>
