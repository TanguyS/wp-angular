<?php

// Theme customizer controls (https://github.com/paulund/wordpress-theme-customizer-custom-controls)
// =============================================================================

function hy_add_customizer_custom_controls( $wp_customize ) {

    // Check if the customizer exists
    // =============================================================================

    if ( ! class_exists( 'WP_Customize_Control' ) )
        return NULL;


    // Info
    // =============================================================================

    class Info_Custom_Control extends WP_Customize_Control {

        public function render_content() {
        ?>
          <p class="customize-description"><span>INFO:</span> <?php echo esc_html( $this->label ); ?></p>
        <?php
        }
    }



    // Text Editor
    // =============================================================================

    class Text_Editor_Custom_Control extends WP_Customize_Control {

        public function render_content() { ?>
            <label>
                <span class="customize-text_editor"><?php echo esc_html( $this->label ); ?></span>
                <?php
                    $settings = array(
                        'textarea_name' => $this->id
                    );

                    wp_editor($this->value(), $this->id, $settings );
                ?>
            </label>
        <?php
        }
    }



    // Textarea
    // =============================================================================

    class Textarea_Custom_Control extends WP_Customize_Control {

        public function render_content() {
            ?>
            <label>
                <span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
                <textarea class="large-text" cols="20" rows="5" <?php $this->link(); ?>>
                    <?php echo esc_textarea( $this->value() ); ?>
                </textarea>
            </label>
            <?php
        }
    }



    // Google fonts
    // =============================================================================
    function customizer_sort_by_family($a, $b) {
        $a = trim($a['family']);
        $b = trim($b['family']);
        return strcmp($a,$b);
    }


    class Google_Font_Dropdown_Custom_Control extends WP_Customize_Control {
        private $fonts = false;

        public function __construct($manager, $id, $args = array(), $options = array()) {
            $this->fonts = $this->get_fonts();
            parent::__construct( $manager, $id, $args );
        }

        public function render_content()
        {
            if(!empty($this->fonts))
            {
                ?>
                    <label>
                        <span class="customize-category-select-control"><?php echo esc_html( $this->label ); ?></span>
                        <select <?php $this->link(); ?>>
                            <?php
                                uasort($this->fonts,'customizer_sort_by_family');

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

                                foreach ( $web_fonts as $k => $v )
                                {
                                    printf('<option value="%s" %s>%s</option>', $k, selected($this->value(), $k, false), $k);
                                }

                                foreach ( $this->fonts as $k => $v )
                                {
                                    printf('<option value="%s" %s>%s</option>', $v['family'], selected($this->value(), $k, false), $v['family']);
                                }
                            ?>
                        </select>
                    </label>
                <?php
            }
        }

        // cache google fonts list
        // =============================================================================

        public function get_fonts( $amount = 'all' ) {
            $content = json_decode(file_get_contents(get_template_directory_uri() . '/core/functions/admin/customizer/google-fonts.json'), true);

            if($amount == 'all') {
                return $content['items'];
            } 
            else {
                return array_slice($content['items'], 0, $amount);
            }
        }
     }



    // Date Picker
    // =============================================================================

    class Date_Picker_Custom_Control extends WP_Customize_Control {

        public function enqueue() {
            wp_enqueue_style( 'jquery-ui-datepicker' );
        }

        public function render_content() {
        ?>
            <label>
                <span class="customize-date-picker-control"><?php echo esc_html( $this->label ); ?></span>
                <input type="date" id="<?php echo $this->id; ?>" name="<?php echo $this->id; ?>" value="<?php echo $this->value(); ?>" class="datepicker" />
            </label>
        <?php
        }
    }

}

add_action( 'customize_register', 'hy_add_customizer_custom_controls' );

?>