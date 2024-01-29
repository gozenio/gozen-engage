<?php
/**
 * check the current in env with 'wp_get_environment_type'.
 * and inculde Env variable based on current enviroment.
 */

switch(wp_get_environment_type()){

    case "development":

        require_once(GOZEN_ENGAGE_PATH.'controller/env/development.php');
        break;

    case "production":

        require_once(GOZEN_ENGAGE_PATH.'controller/env/production.php');
        break;

    case "local":

        require_once(GOZEN_ENGAGE_PATH.'controller/env/development.php');
        break;

}

?>