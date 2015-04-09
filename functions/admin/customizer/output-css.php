<?php
 
// ouput css
// =============================================================================
 
if (!function_exists('hy_customize_css')) {

    function hy_customize_css() {

        // Commons
        $list = array('div', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'input', 'select');

        $web_fonts = array(
            'arial'         => 'Arial, Helvetica, sans-serif',
            'arial-black'   => '"Arial Black", Gadget, sans-serif',
            'courier'       => '"Courier New", Courier, monospace',
            'georgia'       => 'Georgia, "Times New Roman", Times, serif',
            'lucida'        => '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
            'tahoma'        => 'Tahoma, Geneva, sans-serif',
            'times'         => '"Times New Roman", Times, serif',
            'trebuchet'     => '"Trebuchet MS", Arial, Helvetica, sans-serif',
            'verdana'       => 'Verdana, Geneva, sans-serif'
        );


        // retrieve values
        $dark_color = get_theme_mod( 'setting_hy_dark_color' );
        $light_color = get_theme_mod( 'setting_hy_light_color' );
        $pattern = get_theme_mod( 'setting_hy_pattern' );

        $title_font = get_theme_mod( 'setting_hy_title_font' );
        $text_font = get_theme_mod( 'setting_hy_text_font' );

        /*
        // TODO; test it, set default values
        if (empty($dark_color))
            $dark_color = '#1a1a1a';

        if (empty($light_color))
            $light_color = '#fbfbfb';

        if (empty($title_font))
            $title_font = 'Arial, Helvetica, sans-serif';

        if (empty($text_font))
            $text_font ='Arial, Helvetica, sans-serif';
        */

        // prepare data
        $dark_classes = implode(", ", $list) . ", .dark";
        foreach($list as $l){
            $dark_classes .=  ", " . $l . ".dark, .dark " . $l; 
        }

        $light_classes = ".light";
        foreach($list as $l){
            $light_classes .=  ", " . $l . ".light, .light " . $l; 
        }


        // capture output
        ob_start();
        ?>

        <?php if (!array_key_exists($title_font, $web_fonts)): ?>
            <link href='http://fonts.googleapis.com/css?family=<?php echo urlencode($title_font); ?>' rel='stylesheet' type='text/css' />
        <?php endif; ?>
        <?php if (!array_key_exists($text_font, $web_fonts)): ?>
            <link href='http://fonts.googleapis.com/css?family=<?php echo urlencode($text_font); ?>' rel='stylesheet' type='text/css' />
        <?php endif; ?>

        <style type="text/css">

            /* light color */
            .light-background {
                background-color: <?php echo $light_color; ?>;
            }

            <?php echo $light_classes; ?> {
                color: <?php echo $light_color; ?>;
            }

            .light-border {
                border-color: <?php echo $light_color; ?>;
            }

            /* dark color */
            .dark-background {
                background-color: <?php echo $dark_color; ?>;
            }

            <?php echo $dark_classes; ?> {
                color: <?php echo $dark_color; ?>;
            }

            .dark-border {
                border-color: <?php echo $dark_color; ?>;
            }

            .formWrap .field textarea.dark {
                background-image: linear-gradient(<?php echo $dark_color; ?> 1px, transparent 1px);
            }

            /* pattern */
            <?php if (!empty($pattern)): ?>
                .pattern {
                    background-image: url(<?php echo $pattern; ?>)
                }
            <?php endif; ?>

            
            

            /* title font */
            /*
            <?php if (!array_key_exists($title_font, $web_fonts)): ?>
                h1,h2,h3,h4,h5,h6 {
                    font-family: '<?php echo $title_font; ?>'
                }
            <?php else: ?>
                h1,h2,h3,h4,h5,h6 {
                    font-family: <?php echo $title_font; ?>
                }
            <?php endif; ?>
            */
            
            /* text font */
            /*
            <?php if (!array_key_exists($text_font, $web_fonts)): ?>
                html,body {
                    font-family: '<?php echo $text_font; ?>'
                }
            <?php else: ?>
                html,body {
                    font-family: <?php echo $text_font; ?>
                }
            <?php endif; ?>
            */

        </style>

        <?php

        $css = ob_get_contents(); ob_end_clean();

        $output = preg_replace( '#/\*.*?\*/#s', '', $css ); 
        $output = preg_replace( '/\s*([{}|:;,])\s+/', '$1', $output );
        $output = preg_replace( '/\s\s+(.*)/', '$1', $output );

        echo $output;

    }

    add_action( 'wp_head', 'hy_customize_css', 1000, 0 );
}
?>