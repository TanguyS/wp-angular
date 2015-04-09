<?php
// Custom Post types
// =============================================================================

add_action('init', 'st_register_post_types');

function st_register_post_types() {

	$version = (floatval( get_bloginfo( 'version' ) ) >= '3.8');
	
}

?>