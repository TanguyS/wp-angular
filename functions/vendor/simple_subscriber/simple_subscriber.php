<?php

/**
 * Simple Subscriber
 * Description: Simple subscription form with administration export
 * Version: 1.0.0
 * Author: Tanguy Sauvin http://www.impertinents.com
 * License: MIT
 */


// Simple subscriber setup
// =============================================================================

if ( ! function_exists( 'simple_subscriber_install' ) ) :

	function simple_subscriber_install() {
		global $wpdb;
		$simple_subscriber_table = 'wp_simple_subscriber';
		
		// Charset
		$charset = '';
		if($wpdb->supports_collation()) {
			if (!empty($wpdb->charset))
				$charset .= "DEFAULT CHARACTER SET $wpdb->charset";
			if (!empty($wpdb->collate))
				$charset .= " COLLATE $wpdb->collate";
		}

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
			

		// if table not exist
		if($wpdb->get_var("SHOW TABLES LIKE '$simple_subscriber_table'") != $simple_subscriber_table) {
			$sql = "CREATE TABLE `".$simple_subscriber_table."` (";
			$sql.= "`id` INT NOT NULL AUTO_INCREMENT ,";
			$sql.= "`site` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "`site_id` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "`lang` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "`name` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "`email` VARCHAR( 255 ) NOT NULL ,";
			$sql.= "`creation` DATETIME NOT NULL ,";
			$sql.= "PRIMARY KEY ( `id` )";
			$sql.="	) ".$charset." ;";  

			dbDelta($sql);
		}
	}

	add_action('after_switch_theme', 'simple_subscriber_install'); 

endif;



// Enqueue JS
// =============================================================================

if (!function_exists('simple_subscriber_scripts')):

	function simple_subscriber_scripts() {
		$path = get_template_directory_uri() . '/functions/vendor/simple_subscriber';

		wp_enqueue_script( 'simple_subscriber-scripts', $path . '/js/simple_subscriber.js', array( ), '1.0.0', true );
	}

	add_action( 'wp_enqueue_scripts', 'simple_subscriber_scripts' );

endif;


// Simple subscriber shortcode
// =============================================================================

if ( ! function_exists( 'simple_subscriber_form' ) ) :

	function simple_subscriber_form( $atts ) { ?>
		<div style="display: none;" class="data-simple-subscriber">
			<div class="thank-you"><?php _e("Thank you.", "simple_subscribers"); ?></div>
			<div class="invalid"><?php _e("Invalid email", "simple_subscribers"); ?></div>
		</div>
		<div id="simple_subscriber">
			<form name="simple_subscriber" id="simple_subscriber-box" class="simple_subscriber-box" method="POST" action="">
				<div style="float: left;">
					<input type="text" name="eaddr" value="<?php _e("email", "simple_subscribers"); ?>" default="<?php _e("email", "simple_subscribers"); ?>" />
				</div>
				<div style="display: none;">
					<input type="text" name="email" value="" />
				</div>
				<input type="hidden" name="simple_subscriber_ok" value="ok" />
				<div style="float: right; margin-left: 20px;">
					<input type="submit" name="submit" value="<?php _e("ok", "simple_subscribers"); ?>" />
				</div>
			</form>
		</div>

		<?php
	}
	add_shortcode('simple_subscriber_form', 'simple_subscriber_form');

endif;



// Post data treatment
// =============================================================================

if ( ! function_exists( 'simple_subscriber_save' ) ) :
	function simple_subscriber_save( ) {
		if (isset($_POST) && isset($_POST['simple_subscriber_ok']) &&  $_POST['simple_subscriber_ok'] == 'ok') {

			// check for spam
			if (!empty($_POST['email']))
				die();

			// save data
			global $wpdb;
			$simple_subscriber_table = 'wp_simple_subscriber';

			$query = $wpdb->query("INSERT INTO " . $simple_subscriber_table . " SET email='" . mysql_real_escape_string(trim($_POST['eaddr'])) . "',  lang='" . pll_current_language('slug') . "',  site_id='" . get_current_blog_id() . "',  site='" . get_bloginfo('name') . "', creation=now()");

			if ($query) {
				$result = array("result" => "subscribed");
			}
			else {
				$result = array("result" => "error");
			}
			echo json_encode($result);

			die();
		}
	}
	add_action('init', 'simple_subscriber_save');

endif;



// Administration button
// =============================================================================

function simple_subscriber_menu() {
    add_menu_page( 'Subscribers', 'Subscribers', 'edit_theme_options', 'subscribers', 'simple_subscribers_interface', 'dashicons-tag', 63 );
}

add_action( 'admin_menu', 'simple_subscriber_menu' );



// Admin interface
// =============================================================================

function simple_subscribers_interface() {
	global $wpdb;
	$simple_subscriber_table = 'wp_simple_subscriber';

	$sql = "SELECT COUNT(*) FROM {$simple_subscriber_table}";
    $number_emails = $wpdb->get_var($sql);

	?>
	<h1><?php _e("Subscribers", "simple_subscribers"); ?></h1>
	<p><?php _e("You have currently", "simple_subscribers"); ?> <?php echo $number_emails; ?> <?php _e("email(s).", "simple_subscribers"); ?></p>
	<form method="POST" action="">
		<input type="hidden" name="simple_subscribers_export" value="1" />
		<input type="submit" value="export" />
	</form>
	<?php
}



// Export emails
// =============================================================================

if ( !function_exists('simple_subscriber_export') ) :
	function simple_subscriber_export() {

		if (isset($_POST) && isset($_POST['simple_subscribers_export']) && $_POST['simple_subscribers_export'] == '1') {
			global $wpdb;
			$simple_subscriber_table = 'wp_simple_subscriber';

			// basic security
			if (!current_user_can('edit_theme_options'))
				die();

			// export function
			$sql = "SHOW COLUMNS FROM " . $simple_subscriber_table;
			$rows = $wpdb->get_results($sql, 'ARRAY_N');

			// provoquer le dialogue de téléchargement
			header('Content-Description: File Transfer');
			//header("content-type: application/ms-excel, charset=UTF-8; encoding=UTF-8'");
			header("content-type: application/vnd.ms-excel, charset=UTF-8; encoding=UTF-8'");
			header("Content-Disposition: attachment; filename=export-".date("d-m-Y").".xls");
			
			// écrit l'entête
			foreach($rows as $row)
				echo $row[0]."\t";
			echo "\r\n";
			
			// nombre de d'enregistrement
			$sql = "SELECT * FROM " . $simple_subscriber_table;
			if ($cond)
				$sql.= " WHERE ".$cond;
			if ($start && $finish)
				$sql.= " LIMIT ".$start.",".$finish;
			
			$sql = stripslashes($sql);

			$rows = $wpdb->get_results($sql, 'ARRAY_A');
			// écrit le fichier
			foreach($rows as $row)
			{
				foreach ($row as $k=> $item)
				{
					$item = str_replace(chr(13), "", $item);
					$item = str_replace(chr(10), "", $item);
					$item = str_replace(
					        array(
					            'à', 'â', 'ä', 'á', 'ã', 'å',
					            'î', 'ï', 'ì', 'í', 
					            'ô', 'ö', 'ò', 'ó', 'õ', 'ø', 
					            'ù', 'û', 'ü', 'ú', 
					            'é', 'è', 'ê', 'ë', 
					            'ç', 'ÿ', 'ñ', 
					        ),
					        array(
					            'a', 'a', 'a', 'a', 'a', 'a', 
					            'i', 'i', 'i', 'i', 
					            'o', 'o', 'o', 'o', 'o', 'o', 
					            'u', 'u', 'u', 'u', 
					            'e', 'e', 'e', 'e', 
					            'c', 'y', 'n', 
					        ),
					        $item
					    );


					echo utf8_decode(stripslashes($item))."\t";
				}
				echo "\r\n";
			}
		    exit;

		}
	}
	add_action('admin_init', 'simple_subscriber_export');

endif;

?>