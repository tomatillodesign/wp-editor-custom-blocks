<?php
/**
 * Plugin Name: Custom Gutenberg Editor Blocks
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Complete set of 5 custom blocks
 * Author: Chris Liu-Beers
 * Author URI: https://www.tomatillodesign.com/
 * Version: 1.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';




/**
* Register and Enqueue Scripts and Styles.
*
* @since 1.0.0
*/
function clb_enqueue_custom_scripts_styles_custom_blocks() {

	wp_register_script( 'clbcustombootstrapjs' , plugins_url( '/js/bootstrap-collapse.js',  __FILE__), array( 'jquery' ), '4.0.0', true );
	wp_enqueue_script( 'clbcustombootstrapjs' );

}
add_action( 'wp_enqueue_scripts',  'clb_enqueue_custom_scripts_styles_custom_blocks' );
