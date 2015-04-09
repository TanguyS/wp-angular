<?php
Class Register_Json_Api {
	private $name;
	private $path;

	public function __construct($name, $path) {
		$this->name = $name;
		$this->path = $path;

		add_filter( 'json_api_controllers', array($this, 'add_controller') );
		add_filter('json_api_' . $this->name . '_controller_path', array($this, 'set_controller_path') );
	}

	public function add_controller($controllers) {
		$controllers[] = $this->name;
  		return $controllers;
	}

	public function set_controller_path() {
	  return $this->path;
	}
}

new Register_Json_Api( 'wpng', get_template_directory() . '/functions/api.php' );

?>