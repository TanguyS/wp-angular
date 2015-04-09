<?php

// define a global to pass data to partials & views
// =============================================================================

$_data;
$_args;

// get partial & view
// =============================================================================

function get_part($part, $object = array()) {
	global $_args; 

	$_args = $object;

	get_template_part( 'parts/' . $part );
}

// prepare data
// =============================================================================

function prepare_data($post) {
	return array(
		'id' 		=> $post->ID,
		'title' 	=> $post->post_title,
		'content' 	=> $post->post_content,
		'link'		=> get_permalink($post->ID)
	);
}




// Create excerpt
// =============================================================================
function st_create_excerpt($content, $chars) {
	$content = strip_tags($content);
	$chars = intval($chars);
	$content_count = strlen($content);

	if ($content_count > $chars)
		$content = substr($content, 0, $chars) . '...';

	return $content;
}


// cross in HTML
// =============================================================================

function cross_figure($leftTop = true, $rightTop = true, $leftBottom = true, $rightBottom = true, $mainClasses = '', $additionalClasses = '') {
	$html  =	'<figure class="cross clearfix relative ' . $mainClasses . '">' . PHP_EOL;
	$html .=		'<div class="crossWrapper">' . PHP_EOL;
	$html .=			'<div class="line">' . PHP_EOL;

	$html .=				'<span class="rotate-135 pull-left';
	if ($leftTop)
		$html .= ' visibility-hidden';
	$html .= ' ' . $additionalClasses . '"></span>' . PHP_EOL;

	$html .=				'<span class="rotate-45 pull-left';
	if ($rightTop)
		$html .= ' visibility-hidden';
	$html .= ' ' . $additionalClasses . '"></span>' . PHP_EOL;

	$html .=			'</div>' . PHP_EOL;
	$html .=			'<div class="line">' . PHP_EOL;

	$html .=				'<span class="rotate-45 pull-left';
	if ($leftBottom)
		$html .= ' visibility-hidden';
	$html .= ' ' . $additionalClasses . '"></span>' . PHP_EOL;

	$html .=				'<span class="rotate-135 pull-left';
	if ($rightBottom)
		$html .= ' visibility-hidden';
	$html .= ' ' . $additionalClasses . '"></span>' . PHP_EOL;

	$html .=			'</div>' . PHP_EOL;
	$html .=		'</div>' . PHP_EOL;
	$html .=	'</figure>' . PHP_EOL;

	return $html;
}



// get img
// =============================================================================

function img_tag($name, $options = array()) {
	$tag = '<img src="' . assets_path() . '/images/' . $name . '" ';

	$alt = 0;

	foreach ($options as $attr => $val) {
		if ($attr == 'alt')
			$alt = 1;

		$tag .= $attr . '="' . $val . '" ';
	}

	if ($alt == 0)
		$tag .= 'alt="' . pathinfo($name, PATHINFO_FILENAME) . '" ';

	$tag .= '/>';

	return $tag;
}

?>