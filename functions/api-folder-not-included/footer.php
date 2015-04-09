<?php
function get_data() {
	$data = array();

	// get widget scouts
	ob_start();

	dynamic_sidebar( 'footer' );

	$data['widget'] = ob_get_clean();

	// get social links
	if ( get_theme_mod( 'setting_sgdf_footer_social_all' ) == true ) {
		$data['social'] = array();
		$links = get_social_links();
	    foreach ($links as $sn => $link):
	        if ($sn == "twitter"):
	        	$data['social']['twitter'] = $link['link'];
	        elseif ($sn == "facebook"):
	        	$data['social']['facebook'] =  $link['link'];
	        endif;
	    endforeach;
    }

    // button docenstock
    if ( get_theme_mod( 'setting_sgdf_docenstock' ) == true ) {
    	$link = "docenstock_link";

    	$data['docenstock'] = array(
    		'link' => $link
    	);
    }


	// custom walker for menu
	$data['menu'] = array();

    $menu = wp_get_nav_menu_items( 'footer' );

    $data['menu'] = generateTree($menu);


    // custom walker for header menu
    $menu = wp_get_nav_menu_items( 'primary' );

    $data['headermenu'] = generateTree($menu);



	return $data;
}
?>