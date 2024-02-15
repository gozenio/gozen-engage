<?php

/**
 * Plugin name: GoZen Engage
 * Plugin URI: https://gozen.io/engage/
 * Description: Generate Leads With AI-Powered Interactive Content And Gamification
 * Author:GozenHQ
 * Version:1.0.0
 * Requires at least: 4.6.1
 * Requires PHP:      7.2
 * Text Domain:gozenengage
 * Domain Path: /languages/
 * License: GPL v2 or later
 * License URI:https://www.gnu.org/licenses/gpl-2.0.html
 * Contributors:GozenHq
 */


 /**
  * Set Wpdb globaly
  */
if ( ! defined( 'ABSPATH' ) ) exit; 
global $wpdb;

/**
 * Define plugins path, URL, Version.
 */

defined('GOZEN_ENGAGE_VERSION') or define('GOZEN_ENGAGE_VERSION','1.0.0');
defined('GOZEN_ENGAGE_PATH') or define('GOZEN_ENGAGE_PATH',plugin_dir_path(__FILE__));
defined('GOZEN_ENGAGE_URL') or define('GOZEN_ENGAGE_URL',plugin_dir_URL(__FILE__));

//Init Required files
require_once(GOZEN_ENGAGE_PATH.'controller/api/index.php');
require_once(GOZEN_ENGAGE_PATH.'controller/env/index.php');

//Setup plugin
$GZ_Engage = new GzEngageApi();
$GZ_Engage->intiSetup();


?>