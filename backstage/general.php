<?php

header("Content-Type:text/html; charset=utf-8");

$host = 'localhost';
$dbUsername = 'u439059547_admin';
$dbPassword = 'MxxBDNqJPv';
$dbName = 'u439059547_myweb';

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);
$conn->set_charset("utf8");

?>
