<?php

header("Content-Type:text/html; charset=utf-8");

if($_SERVER["HTTP_HOST"] == "localhost"){
  $host = 'localhost';
  $dbUsername = 'adminCMBRcMd'; // 2141104_myweb / adminCMBRcMd
  $dbPassword = 'yk819N-UCj3x'; // MxxBDNqJPv0626 / yk819N-UCj3x
  $dbName = 'myweb'; // 2141104_myweb / myweb
}
else{
  $host = 'localhost';
  $dbUsername = 'adminCMBRcMd'; // 2141104_myweb / adminCMBRcMd
  $dbPassword = 'yk819N-UCj3x'; // MxxBDNqJPv0626 / yk819N-UCj3x
  $dbName = 'myweb'; // 2141104_myweb / myweb
}
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);
$conn->set_charset("utf8");
echo $conn->error;
?>
