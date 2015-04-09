<?php
class JSON_API_Sgdf_Controller {
	private $path;

	public function __construct() {
		$this->path = get_template_directory() . '/functions/api-folder-not-included/';
	}

	public function get_header() {
		include($this->path . 'header.php');

		return get_data();
	}

	public function get_footer() {
		include($this->path . 'footer.php');

		return get_data();
	}
}

?>