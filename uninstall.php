<?php 

/**
 * Uninstall the table when user delete the Gozen Engage plugin.
 */

function deleteGzEngageTable($tablename) {

    // if (!defined('WP_UNINSTALL_PLUGIN')) {
    //     die;
    // }

    //Global variable
    global $wpdb;

    $wpdb->query( $wpdb->prepare("DROP TABLE IF EXISTS %s","$wpdb->prefix.$tablename") );

    delete_option("my_plugin_db_version"); 

}

?>