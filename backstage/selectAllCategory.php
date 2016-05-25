<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");


$stmt = $conn->prepare("SELECT DISTINCT `NO`,`DESC` FROM `CATEGORY`");
echo $conn->error;

$stmt->execute();
$result = $stmt->get_result();
$row = $result->num_rows;

$return = array();

if($row > 0){
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
      $return[] = array('no' => $row['NO'], 'desc' => $row['DESC']);
  }
}

$conn->close();
echo json_encode($return);

?>
