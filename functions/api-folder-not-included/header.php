<?php
function get_data() {
	$data = array();

	// logo
	$data['logo'] = get_theme_mod( 'setting_sgdf_logo' );

	// sas communication
    $original_blog_id = get_current_blog_id();
    $blog_linked_id = get_theme_mod( 'setting_sgdf_blog_linked' );

    $sites = array(
        $original_blog_id,
        $blog_linked_id
    );

    // get info for first home
    $data['home'] = array();
    foreach ($sites as $site) {
        // switch to other site if neeeded
        if ( $site != $original_blog_id )
            switch_to_blog( $site );

        $image = get_theme_mod( 'setting_sgdf_sas_image' );

        list( $width, $height, $type, $attr ) = getimagesize( $image );

        // get infos
        $data['home'][] = array(
            'title' => get_theme_mod( 'setting_sgdf_sas_titre' ),
            'picto' => get_theme_mod( 'setting_sgdf_picto' ),
            'link'  => home_url()
        );

        // get back to original blog
        if ( $site != $original_blog_id )
            switch_to_blog( $original_blog_id );
    }

    // custom walker for menu
    $menu = wp_get_nav_menu_items( 'primary' );

    $data['menu'] = generateTree($menu);

    // social links
	$links = get_social_links();
    foreach ($links as $sn => $link):
        if ($sn == "twitter"):
        	$data['twitter'] = $link['link'];
        elseif ($sn == "facebook"):
        	$data['facebook'] =  $link['link'];
        endif;
    endforeach;

    // get rss link 
    $data['rss'] = home_url( '/feed' );


	return $data;
}
?>