<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$stmt = $conn->prepare("SELECT `DESC` AS `CATEGORY`,
  `TAGS`,
  `MAIN_TITLE`,
  `SUB_TITLE`,
  `CONTENT`,
  `CREATE_DATE`,
  `PUBLISH_DATE`,
  `IS_VISIBLE`,
  `CATEGORY` AS `CATEGORY_NO`,
  `ARTICLE`.`NO`,
  `SUBNO`
  FROM `ARTICLE`, `CATEGORY` WHERE `ARTICLE`.`CATEGORY` = `CATEGORY`.`NO` ORDER BY `CREATE_DATE` DESC");
echo $conn->error;

$stmt->execute();
$result = $stmt->get_result();
$num_row = $result->num_rows;

$rows = array();

if($num_row > 0){
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
      $rows[] = array('category' => $row['CATEGORY'],
      'tags' => $row['TAGS'],
      'mainTitle' => $row['MAIN_TITLE'],
      'subTitle' => $row['SUB_TITLE'],
      'content' => $row['CONTENT'],
      'createDate' => $row['CREATE_DATE'],
      'publishDate' => $row['PUBLISH_DATE'],
      'isVisible' => $row['IS_VISIBLE'],
      'categoryNo' => $row['CATEGORY_NO'],
      'no' => $row['NO'],
      'subNo' => $row['SUBNO']
      );
  }
}
$return = array('total' => $num_row, 'rows' => $rows);
$conn->close();
echo json_encode($return);

?>
