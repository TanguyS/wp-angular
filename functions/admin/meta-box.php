<?php
// Meta Boxes
// =============================================================================

if (class_exists('RW_Meta_Box')) {


	function st_register_meta_boxes() {

		// Declare vars
		// =============================================================================

		$prefix = 'meta_';

		$meta_boxes = array();

		// get polylang current language
		/*
		global $polylang;

		$lang = 'fr';
		if (!is_null($polylang) && isset($_GET['post']))
			$lang = $polylang->get_post_language($_GET['post'])->slug;
		else if (isset($_GET['new_lang']))
			$lang = $_GET['new_lang'];
		*/


		// Pages
		// =============================================================================

		/* commons */
		$meta_boxes[] = array(
			'id' => 'section-commons',
			'title' => 'Commons',
			'pages' => array('page'),
			'context' => 'normal',
			'priority' => 'high',
			'fields' => array(
				array(
					'name' => 'Intro',
					'id' => $prefix . 'intro',
					'type' => 'text'
				)
				,array(
					'name' => 'Images',
					'id' => $prefix . 'page_images',
					'type' => 'image_advanced'
				)
			)
		);

		return $meta_boxes;
	}

	// Register meta boxes
	// =============================================================================

	add_filter( 'rwmb_meta_boxes', 'st_register_meta_boxes' );
}
?>