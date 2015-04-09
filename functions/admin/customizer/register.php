<?php

// Register theme customizer
// =============================================================================

function hy_register_customizer( $wp_customize ) {

	// Declare global prefix
	// =============================================================================

	$prefix = 'hy_customizer_section_';



	// Declare sections, controls and settings
	// =============================================================================

	$customizer = array(
		/*
		$prefix . 'brand' => array(
			'title' 	=> __( 'Brand', 'hy' ), 
			'priority' 	=> 1,
			'controls' 	=> array(
				
				'hy_logo' => array(
					'type' => 'image',
					'controls' => array(
						'label' => __( 'Logo', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'refresh'
					)
				),

				'hy_address' => array(
					'type' => 'textarea',
					'controls' => array(
						'label' => __( 'Address', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				),

				'hy_contacts' => array(
					'type' => 'textarea',
					'controls' => array(
						'label' => __( 'Mail/Phone', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				),
			)
		),
		*/
		$prefix . 'configuration' => array(
			'title' 	=> __( 'Theme configuration', 'hy' ), 
			'priority' 	=> 2,
			'controls'	=> array(

			)
		),

		$prefix . 'color' => array(
			'title' 	=> __( 'Colors', 'hy' ), 
			'priority' 	=> 3,
			'controls'	=> array(

				'hy_light_color' => array(
					'type' => 'color',
					'controls' => array(
						'label' => __( 'Light Color', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '#fbfbfb',
						'transport' => 'postMessage'
					)
				),

				'hy_dark_color' => array(
					'type' => 'color',
					'controls' => array(
						'label' => __( 'Dark Color', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '#1a1a1a',
						'transport' => 'postMessage'
					)
				),

				'hy_pattern' => array(
					'type' => 'image',
					'controls' => array(
						'label' => __( 'Pattern image', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'refresh'
					)
				)

			)
		),
		/*
		$prefix . 'typography' => array(
			'title' 	=> __( 'Typography', 'hy' ), 
			'priority' 	=> 4,
			'controls'	=> array(

				'hy_title_font' => array(
					'type' => 'font',
					'controls' => array(
						'label' => __( 'Title font', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => "",
						'transport' => 'postMessage'
					)
				),

				'hy_text_font' => array(
					'type' => 'font',
					'controls' => array(
						'label' => __( 'Text font', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => "",
						'transport' => 'postMessage'
					)
				)

			)
		),
		*/
		$prefix . 'buttons' => array(
			'title' 	=> __( 'Buttons', 'hy' ), 
			'priority' 	=> 5,
			'controls'	=> array(

			)
		),

		$prefix . 'map' => array(
			'title' 	=> __( 'Map', 'hy' ), 
			'priority' 	=> 6,
			'controls'	=> array(
				'hy_gmaps_logo' => array(
					'type' => 'image',
					'controls' => array(
						'label' => __( 'Logo on map', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'refresh'
					)
				),

				'hy_gmaps_info' => array(
					'type' => 'info',
					'controls' => array(
						'label' => 'Get coordinates from http://itouchmap.com/latlong.html',
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				),

				'hy_gmaps_lat' => array(
					'type' => 'text',
					'controls' => array(
						'label' => __( 'Latitude', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				),

				'hy_gmaps_lng' => array(
					'type' => 'text',
					'controls' => array(
						'label' => __( 'Longitude', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				),

				'hy_contact email' => array(
					'type' => 'text',
					'controls' => array(
						'label' => __( 'Contact Email', 'hy' ),
						'priority' => 10
					),
					'settings' => array(
						'default' => '',
						'transport' => 'postMessage'
					)
				)
			)
		)
	);



	// Register new customizer
	// =============================================================================

	foreach ($customizer as $section_id => $section) {

		// Register section
		// =============================================================================

		$wp_customize->add_section($section_id, 
			array(
				'title' => $section['title'],
				'priority' => $section['priority'],
				'capability' => 'edit_theme_options'
			) 
		);



		// Register controls
		// =============================================================================

		foreach ($section['controls'] as $id => $data) {


			$wp_customize->add_setting( 'setting_' . $id,
				array(
					'default' => $data['settings']['default'],
					'type' => 'theme_mod',
					'capability' => 'edit_theme_options', 
					'transport' => $data['settings']['transport']
				) 
			);

			if ($data['type'] == 'color') {
				$wp_customize->add_control( new WP_Customize_Color_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
			else if ($data['type'] == 'image') {
				$wp_customize->add_control( new WP_Customize_Image_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
			else if ($data['type'] == 'font') {
				$wp_customize->add_control( new Google_Font_Dropdown_Custom_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
			else if ($data['type'] == 'editor') {
				$wp_customize->add_control( new Text_Editor_Custom_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
			else if ($data['type'] == 'textarea') {
				$wp_customize->add_control( new Textarea_Custom_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
			else if ($data['type'] == 'text') {
				$wp_customize->add_control(
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				);
			}
			else if ($data['type'] == 'info') {
				$wp_customize->add_control( new Info_Custom_Control( 
					$wp_customize,
					$id,
					array(
						'label' => $data['controls']['label'],
						'section' => $section_id, 
						'settings' => 'setting_' . $id,
						'priority' => $data['controls']['priority']
					) 
				) );
			}
		}
	}	
}

// Setup the Theme Customizer settings and controls
add_action( 'customize_register' , 'hy_register_customizer' );