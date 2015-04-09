<?php

// convert email to prevent SPAM
// =============================================================================

function st_protect_email($content) {
	$pattern = '/(\w+@[\w\.]+)/e';
	$replace = "st_encode_email('$1')";
	$content = preg_replace($pattern, $replace, $content);
	return $content;
}

function st_encode_email($e) {
	$output = '';
	for ($i = 0; $i < strlen($e); $i++) { $output .= '&#'.ord($e[$i]).';'; }
	return $output;
}


// send mail
// =============================================================================
add_filter('wp_mail_content_type',create_function('', 'return "text/html"; '));

function st_send_mail($txt, $to, $subject, $from, $from_addr, $cc="", $bcc="") {
	
	//$srvr = get_path();
	$srvr = "http://" . $_SERVER['SERVER_NAME'] . "/";
	
	$txt = preg_replace(
		array("/\"img\//", 
			   "/href=\"(?!(http|mailto))/",
			  "/url\(/"
			), 
		array("\"".$srvr."/img/", 
			  "href=\"".$srvr,
			  "url(".$srvr
			), 
		$txt
		);

	$headers[] = "From: " . $from . "<" . $from_addr . ">";
	if ($cc)
		$headers[] = "Cc: " . $cc;
	if ($bcc)
		$headers[] = "Bcc: " . $bcc;
	return wp_mail($to, $subject,	$txt, $headers);
}


// check mail
// =============================================================================

function st_checkmail($email) {
	$atom   = '[-a-z0-9!#$%&\'*+\\/=?^_`{|}~]';
	$domain = '([a-z0-9]([-a-z0-9]*[a-z0-9]+)?)'; 
								   
	$regex = '/^' . $atom . '+' .  
	'(\.' . $atom . '+)*' .      
									
	'@' .                          
	'(' . $domain . '{1,63}\.)+' . 
									
	$domain . '{2,63}$/i';         
	
	if (preg_match($regex, $email)) {
		return TRUE;
	} else {
		return FALSE;
	}
}

// generate tree for ng menus
// =============================================================================

function generate_ng_url( $id, $object, $url ) {
    $ng_url = null;
    if ( $object === 'custom' ) {
        $ng_url =  $url;
    }
    else if ( $object === 'category' ) {
        $ng_url = '/#/cat/' . $id;
    }
    else if ( $object === 'post' ) {
        $cats = get_the_category( $id );

        # get first category to make the link
        $category = $cats[0];

        $ng_url = '/#/cat/' . $category->cat_ID . '?article=' . $id;
    }
    // TODO: parent is a page
    else if ( $object === 'question' ) {
        if ($id)
            $ng_url = '/#/question?id=' . $id;
        else
            $ng_url = '/#/question';
    }
    else if ( $object === 'temoignage' ) {
        if ($id)
            $ng_url = '/#/temoignage?id=' . $id;
        else
            $ng_url = '/#/temoignage';
    }
    else if ( $object === 'reveillemoi' ) {
        $ng_url = '/#/reveille';
    }
    else if ( $object === 'jeu' ) {
        $ng_url = '/#/jouer';
    }
    else if ( $object === 'page'  ) {
        
        $template = get_page_template_slug( $id );

        if ( $template === false ) {
            // this is an error
            $ng_url = false;
        }
        else if ( empty( $template ) ) {
            $ng_url = '/#/page/' . $id;
        }
        else if ( $template === 'contact.php') {
            $ng_url = '/#/contact';
        }
        else if ( $template === 'aventure.php') {
            $ng_url = '/#/aventure';
        }
        else if ( $template === 'question.php') {
            $ng_url = '/#/question';
        }
        else if ( $template === 'temoignage.php') {
            $ng_url = '/#/temoignage';
        }
        else if ( $template === 'videos.php') {
            $ng_url = '/#/videos';
        }
        else if ( $template === 'jouer.php') {
            $ng_url = '/#/jouer';
        }
        else if ( $template === 'reveille.php') {
            $ng_url = '/#/reveille';
        }
        else {
            $ng_url = '/#/' . str_replace( '.php', '', $template ) . '/' . $id;
        }
    }

    return $ng_url;
}

function generateTree($datas, $parent = 0, $depth=0){
    if ($depth > 1000) return ''; // Make sure not to have an endless recursion

    $tree = array();
    for($i=0, $ni=count($datas); $i < $ni; $i++){
        if($datas[$i]->menu_item_parent == $parent){
            $n_tree = generateTree($datas, $datas[$i]->ID, $depth+1);
            
            $image = false;

            if ( $parent == 0 && has_post_thumbnail( $datas[$i]->ID ) ) {

                $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $datas[$i]->ID, 'thumb' ) );
                $image = $thumbnail[0];

            	// if ( $datas[$i]->type === 'taxonomy' && $datas[$i]->object === 'category' && $parent === 0 ) {
            		// $image = get_field('cat_image' , 'category_' . $datas[$i]->object_id);
				// }
			}

            $ng_url = generate_ng_url( $datas[$i]->object_id, $datas[$i]->object, $datas[$i]->url );

			if ( !is_null($image) ) {
	            if (!empty($n_tree)) {
	            	$tree[] = array(
                        'title' => $datas[$i]->title, 
                        'wp_url' => $datas[$i]->url,
                        'ng_url' => $ng_url,
                        'image' => $image, 
                        'submenu' => $n_tree
                    );
	            }
	            else {
	            	$tree[] = array(
                        'title' => $datas[$i]->title, 
                        'wp_url' => $datas[$i]->url, 
                        'ng_url' => $ng_url,
                        'image' => $image 
                    );
	            }
            }
            else {
            	if (!empty($n_tree)) {
	            	$tree[] = array(
                        'title' => $datas[$i]->title, 
                        'wp_url' => $datas[$i]->url, 
                        'ng_url' => $ng_url,
                        'submenu' => $n_tree
                    );
	            }
	            else {
	            	$tree[] = array(
                        'title' => $datas[$i]->title, 
                        'ng_url' => $ng_url,
                        'wp_url' => $datas[$i]->url
                    );
	            }
            }
        }
    }

    return $tree;
}

function my_excerpt_content($content, $post = '', $query = ''){
    global $meta_boxes;
    foreach($meta_boxes as $m) {
        foreach ($m['fields'] as $lst) {
            $fields[] = $lst['id'];
        }
    }
    if (!empty($fields)) {
        foreach($fields as $field){
            $field_value = get_post_meta($post->ID, $field, TRUE);
            if (stristr($field_value, $query) !== FALSE)
                $content .= ' '. $field_value;
        }
    }
    return $content;
}


?>