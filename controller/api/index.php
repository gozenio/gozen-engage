<?php

//Required Files.
if ( ! defined( 'ABSPATH' ) ) exit; 
require_once(GOZEN_ENGAGE_PATH.'pages/login.php');
require_once(GOZEN_ENGAGE_PATH.'pages/index.php');
require_once(GOZEN_ENGAGE_PATH.'pages/initScript.php');
require_once(GOZEN_ENGAGE_PATH.'pages/template.php');
require_once(GOZEN_ENGAGE_PATH.'controller/api/gz_engage_env.php');


/**
 * payload 
 * @var object
 */



/*
 *Init the GoZen Engage Hook  
 */
class GzEngageApi{


    public function intiSetup () {


        /**
         * Check Admin status
         */


        if ( is_admin() || wp_doing_ajax() ){
            add_action('init',array(&$this,'initBasicHook'));
        }
        else {
            add_action('wp_footer',array(&$this,'inculdeScriptonPage'));
        }

    }

    //add Engage Menu in Wp Admin menu
    public function initBasicHook(){
        add_action('admin_menu',array(&$this,'initAdminMenu'));
    }

    /*
     * inculde  Menu, Style, script file. 
     */
    public function initAdminMenu() {

        
        $gz_forms_icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCA0MiA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM2LjQyMTkgMjYuNTc4MUMzOS41MDI2IDI2LjU3ODEgNDIgMjQuMDgwNyA0MiAyMUM0MiAxNy45MTkzIDM5LjUwMjYgMTUuNDIxOSAzNi40MjE5IDE1LjQyMTlDMzMuMzQxMiAxNS40MjE5IDMwLjg0MzggMTcuOTE5MyAzMC44NDM4IDIxQzMwLjg0MzggMjQuMDgwNyAzMy4zNDEyIDI2LjU3ODEgMzYuNDIxOSAyNi41NzgxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI0Ljk5MjIgMjYuNjI0MUwyOS44MTA2IDI1LjYxMDJMMzIuMjI3MSAzNy4wOTQzTDI3LjQwODYgMzguMTA4MkwyNC45OTIyIDI2LjYyNDFaTTI0Ljk4MzQgMTUuMzg1NUwyNy4zOTk5IDMuOTAxMzdMMzIuMjE4NCA0LjkxNTI3TDI5LjgwMTkgMTYuMzk5NEwyNC45ODM0IDE1LjM4NTVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjIuNTgxIDI3LjEwNjlMMTkuOTUyOSAyNy42NjEzQzE5LjQ4OCAyNy43NTkzIDE5LjAxNDIgMjcuODA4NiAxOC41MzkxIDI3LjgwODZDMTQuNzg0OCAyNy44MDg2IDExLjczMDUgMjQuNzU0MyAxMS43MzA1IDIxQzExLjczMDUgMTcuMjQ1NyAxNC43ODQ4IDE0LjE5MTQgMTguNTM5MSAxNC4xOTE0QzE5LjAxNDQgMTQuMTkxNCAxOS40OTAxIDE0LjI0MSAxOS45NTMgMTQuMzM4N0wyMi41ODEgMTQuODkzMUwyNS4wMDI3IDMuNDE1MzdMMjIuMzc1NSAyLjg2MTA5QzIxLjExNCAyLjU5NTE4IDE5LjgyODMgMi40NjEwOCAxOC41MzkxIDIuNDYwOTRDOC4zMTY1NyAyLjQ2MDk0IDAgMTAuNzc3NSAwIDIxQzAgMzEuMjIyNSA4LjMxNjU3IDM5LjUzOTEgMTguNTM5MSAzOS41MzkxQzE5LjgyNjkgMzkuNTM5MSAyMS4xMTc0IDM5LjQwNDQgMjIuMzc0NyAzOS4xMzkyTDI1LjAwMjcgMzguNTg0N0wyMi41ODEgMjcuMTA2OVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=' ;
       
        add_menu_page( 'GoZen Engage', 'GoZen Engage', "manage_options", "gozenengage", array(&$this,'renderPages'), $gz_forms_icon );

        wp_register_style('gzeng-style',GOZEN_ENGAGE_URL.'css/gzeng.css',array(),GOZEN_ENGAGE_VERSION);

        if(!GOZEN_ENGAGE_LOGIN_STATUS) wp_register_script('gzeng-script',GOZEN_ENGAGE_URL.'javascript/gzengScript.js',array('jquery'),GOZEN_ENGAGE_VERSION);

        if(GOZEN_ENGAGE_LOGIN_STATUS) {
            add_submenu_page('gozenengage',"Workspace","Workespace","manage_options","Workspace",array(&$this,'WorkSpacePage'));
            add_submenu_page('gozenengage',"Template Gallery","Template Gallery","manage_options","templates",array(&$this,'TemplatePage'));

            wp_register_script('gzeng-workspace',GOZEN_ENGAGE_URL.'javascript/gzengWorkspace.js',array('jquery'),GOZEN_ENGAGE_VERSION);
            wp_register_script('gzeng-template',GOZEN_ENGAGE_URL.'javascript/gzengTemplate.js',array('jquery'),GOZEN_ENGAGE_VERSION);
        }

    }

    // Login page
    public function renderPages () {

        wp_enqueue_style('gzeng-style');
        wp_enqueue_script('gzeng-script');

        if(GOZEN_ENGAGE_LOGIN_STATUS) wp_enqueue_script('gzeng-workspace');

        $add_nonce = wp_create_nonce("gzeng-plugin-js");
        $ajax_url = admin_url('admin-ajax.php');

        $sciptPayload =[
            'server_domain'=> GOZEN_ENGAGE_API_URI,
            'hostname'=> GOZEN_ENGAGE_LOGIN_HOST_URL,
            'Engagepage'=> GOZEN_ENGAGE_RE_URI,
            'Engage_Dashboard'=> GOZEN_ENGAGE_DASHBOARD_URI,
            'token' => GOZEN_ENGAGE_ACCESS_TOKEN,
        ];

        wp_localize_script('gzeng-script','gzeng_url',array('ajax_url'=>$ajax_url,'nonce'=>$add_nonce,'payload'=>$sciptPayload));

        if(GOZEN_ENGAGE_LOGIN_STATUS) return gzEngageRenderDashboard();
        return gzEngageRenderLoginPage();
    }

    //workspace page
    public function WorkSpacePage() {


        /**
         * add the script file and style file in wp.
         */

        wp_enqueue_style('gzeng-style');
        wp_enqueue_script('gzeng-workspace');

        $add_nonce = wp_create_nonce("gzeng-plugin-js");

        $ajax_url = admin_url('admin-ajax.php');

        $sciptPayload =[
            'server_domain'=> GOZEN_ENGAGE_API_URI,
            'hostname'=> GOZEN_ENGAGE_LOGIN_HOST_URL,
            'Engagepage'=> GOZEN_ENGAGE_RE_URI,
            'Engage_Dashboard'=> GOZEN_ENGAGE_DASHBOARD_URI,
            'token' => GOZEN_ENGAGE_ACCESS_TOKEN,
        ];


        wp_localize_script('gzeng-workspace','gzeng_url',array('ajax_url'=>$ajax_url,'nonce'=>$add_nonce,"payload"=>$sciptPayload));
        return gzEngageRenderDashboard();


    }

    /**
     * Render page content
     */
    public function TemplatePage() {

        wp_enqueue_style('gzeng-style');
        wp_enqueue_script('gzeng-template');

        $add_nonce = wp_create_nonce("gzeng-plugin-js");

        $ajax_url = admin_url('admin-ajax.php');
        
        $sciptPayload =[
            'server_domain'=> GOZEN_ENGAGE_API_URI,
            'hostname'=> GOZEN_ENGAGE_LOGIN_HOST_URL,
            'Engagepage'=> GOZEN_ENGAGE_RE_URI,
            'Engage_Dashboard'=> GOZEN_ENGAGE_DASHBOARD_URI,
            'token' => GOZEN_ENGAGE_ACCESS_TOKEN,
        ];

        wp_localize_script('gzeng-template','gzeng_url',array('ajax_url'=>$ajax_url,'nonce'=>$add_nonce,"payload"=>$sciptPayload));
        return gzEngageTemplateRender();


    }
    // inculde Script code
    public function inculdeScriptonPage() {

        return gzEngageRenderScript();

    }

} 

?>