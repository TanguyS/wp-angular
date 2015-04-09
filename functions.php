<?php
// =============================================================================
// Set paths
// =============================================================================
$template_directory = get_template_directory();
$functions_path 	= $template_directory . '/functions/';

// =============================================================================
// Require Files
// =============================================================================
// declare recursive glob func
function rglob($pattern='*', $path='', $flags = 0) {
    $paths = glob($path.'*', GLOB_MARK|GLOB_ONLYDIR|GLOB_NOSORT);
    $files = glob($path.$pattern, $flags);
	if (!$files)
		$files = array();
	if (!$paths)
		$paths = array();

	foreach ($paths as $path) {
		if ( strstr($path, 'folder-not-included') )
			continue;

		$files = array_merge($files,rglob($pattern, $path, $flags));
	}
	
  	return $files;
}

// find php files
$files = rglob('*.php', $functions_path);

// require all files
foreach ($files as $file) {
	require_once($file);
}

add_filter( 'allowed_http_origin', '__return_true' )
?>