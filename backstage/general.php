<?php

header("Content-Type:text/html; charset=utf-8");

$host = 'fdb15.biz.nf'; // fdb15.biz.nf
$dbUsername = '2141104_myweb';
$dbPassword = 'MxxBDNqJPv0626';
$dbName = '2141104_myweb';

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);
$conn->set_charset("utf8");
echo $conn->error;
?>
