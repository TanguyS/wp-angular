<?php

/**
 * Social Links
 * Description: Add social links
 * Version: 1.0.0
 * Author: Tanguy Sauvin http://www.impertinents.com
 * License: MIT
 */


class Social_links {
	
	private $fields;
	private $prefix;
	private $langs;
	private $path;

    public function __construct(){
    	$this->path = get_template_directory_uri() . '/core/functions/vendor/social-links';

        if (is_admin()) {
        	$this->prefix = 'social_links';
        	$this->set_links();

		    add_action('admin_menu', array($this, 'add_menu_page'));
		    add_action('admin_init', array($this, 'page_init'));
		}

		// add_action( 'wp_enqueue_scripts', array($this, 'enqueue_styles') );

		$this->langs = array();
		// compatibility with wpml
		if (!empty($sitepress)) {
			global $sitepress;
	    	
	    	$this->langs[] = 'fr';

			$tswf_active_languages = $sitepress->get_active_languages();
			$tswf_default_language = $sitepress->get_default_language();

			foreach ($tswf_active_languages as $tswf_lang) {
				if ($tswf_lang['code'] == $tswf_default_language) 
					continue;

				$this->langs[] = $tswf_lang['code'];
			} 
		}

		// compatibility with polylang
		else if (function_exists('pll_languages_list')) {
			$this->langs = pll_languages_list(array('fields' => 'slug'));
		}
		else {
			$this->langs[] = 'fr';
		}
    }

    protected function set_links() {
    	$this->fields = array(
			'facebook' => 'Facebook',
			'twitter' => 'Twitter',
			'linkedin' => 'Linkedin',
			'google' => 'Google +',
			'youtube' => 'Youtube',
			'tumblr' => 'Tumblr',
			'pinterest' => 'Pinterest',
			'foursquare' => 'Foursquare'
		);

    }
	
    public function add_menu_page(){
		add_menu_page( 'Social Links', 'Social Links', 'edit_theme_options', $this->prefix . '-setting-admin', array($this, 'create_admin_page'), 'dashicons-format-status', 62 );
    }

    public function create_admin_page() { ?>
	<div class="wrap">
	    <h2>Social Links</h2>			
	    <form method="post" action="options.php">
	        <?php
            // This prints out all hidden setting fields
		    settings_fields($this->prefix . '_option_group');	
		    do_settings_sections($this->prefix . '-setting-admin');
			?>
	        <?php submit_button(); ?>
	    </form>
	</div>
	<?php 
	}
	
    public function page_init(){
    	if( false === get_option( $this->prefix . '_setting' ) ) {
	    	foreach ($this->fields as $k => $f)
	    		$inputs[$k] = '';
			add_option( $this->prefix . '_settings', $inputs);
		}

   		register_setting(
			$this->prefix . '_option_group', 
			$this->prefix . '_settings', 
			array($this, 'sl_update_options')
		);
		
	    add_settings_section(
		    $this->prefix . '_setting_section_id',
		    'Setting',
		    array($this, 'print_section_info'),
		    $this->prefix . '-setting-admin'
		);	

		foreach ($this->fields as $id => $name) {
			foreach ($this->langs as $lang) {
				add_settings_field(
				    $id . '_' . $lang, 
				    $name . ' ' . strtoupper($lang), 
				    array(&$this, 'create_text_field'),
				    $this->prefix . '-setting-admin',
				    $this->prefix . '_setting_section_id',
				    $id . '_' . $lang
				);
			}
		}
    }
	
    public function sl_update_options ($inputs) {
		$new_input = array();

        foreach ($inputs as $key => $input)
            $new_input[$key] = sanitize_text_field( $input );

        return $new_input;
    }
	
    public function print_section_info(){
		print 'Social Links Settings :';
    }
	
    public function create_text_field($id){ 
    	$options = get_option($this->prefix . '_settings');
    	?>
    	<input type='text' style="width: 500px;" id="<?=$id;?>" name='<?php echo $this->prefix; ?>_settings[<?php echo $id; ?>]' value='<?php echo $options[$id]; ?>'>
    	<?php
    }
}



/**
* Initialize class
*/

new Social_links();



/**
* Helper to get value
*
* @return array
*/

if (!function_exists('get_social_links')) {
	function get_social_links($img_directory = '') {
		$options = get_option('social_links_settings');

		if ( defined(ICL_LANGUAGE_CODE) )
			$current_language = ICL_LANGUAGE_CODE;
		else if (function_exists('pll_current_language'))
			$current_language = pll_current_language();
		else
			$current_language = 'fr';

		if (!empty($img_directory))
			$dir = $img_directory;
		else
			$dir = get_template_directory_uri() . '/core/functions/vendor/social-links/img/';

		$social = array();
		foreach ($options as $key => $option) {
			if (empty($option) || !strstr($key, '_' . $current_language))
				continue;

			$fin = substr($key, 0, -3);

			$social[$fin] = array(
				'link' => $option,
				'img' => $dir . $fin . '.png',
				'alt' => $dir . $fin . '-white.png'
			);
		}

		return $social;
	}	
}

?>
