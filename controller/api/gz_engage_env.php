<?php

/**
 * Login status
 * @var boolean 
 */

$status = (isset($_COOKIE['gz_engage_access_token'])) ;

/**
 * protocal
 * @var string
 */

$protocal = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";


/**
 * Cookie
 * @var string
 */

$Cookie = (isset($_COOKIE['gz_engage_access_token'])) ? $cookie = sanitize_text_field($_COOKIE['gz_engage_access_token']) : "" ;

/**
 * Host Url
 * @var string
 */

$host_url = sanitize_text_field(get_site_url());

/**
 * Define required Fields.
 */
define("GOZEN_ENGAGE_LOGIN_STATUS",$status);
define("GOZEN_ENGAGE_LOGIN_HOST_URL",$host_url);
define("GOZEN_ENGAGE_ACCESS_TOKEN",$Cookie);



?>