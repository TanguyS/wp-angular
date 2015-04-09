<?php
 
// ouput js
// =============================================================================
 
if (!function_exists('hy_customize_js')) {

    function hy_customize_js() {

    	// retrieve values
        $dark_color = get_theme_mod( 'setting_hy_dark_color' );
        $light_color = get_theme_mod( 'setting_hy_light_color' );


    	// capture output
        ob_start();
    	?>
    	<script type="text/javascript">
    		window.settings = window.settings || {};
    		window.settings.darkColor = "<?php echo $dark_color; ?>";
			window.settings.lightColor = "<?php echo $light_color; ?>";
    	</script>
        <?php

        $js = ob_get_contents(); ob_end_clean();

        $output = preg_replace( '#/\*.*?\*/#s', '', $js ); 
        $output = preg_replace( '/\s*([{}|:;,])\s+/', '$1', $output );
        $output = preg_replace( '/\s\s+(.*)/', '$1', $output );

        echo $output;

    }

    add_action( 'wp_footer', 'hy_customize_js', 1000, 0 );
}
?>