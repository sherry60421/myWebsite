<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");


$stmt = $conn->prepare("SELECT DISTINCT `NO`,`DESC` FROM `CATEGORY`");
echo $conn->error;

$stmt->execute();
$stmt->bind_result($no, $desc);

$return = array();

while($stmt->fetch()){
    $return[] = array('no' => $no, 'desc' => $desc);
}


$conn->close();
echo json_encode($return);

?>
