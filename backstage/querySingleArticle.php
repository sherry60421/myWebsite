<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$no = isset($_POST['no']) ? $_POST['no'] : '';
$subNo = isset($_POST['subNo']) ? $_POST['subNo'] : '';

$stmt = $conn->prepare("SELECT `CATEGORY`,
  `TAGS`,
  `MAIN_TITLE`,
  `MAIN_TITLE_MENU`,
  `SUB_TITLE`,
  `SUB_TITLE_MENU`,
  `IS_MULTIPLE`,
  `IS_CONTINUED`,
  `CREATE_DATE`,
  `PUBLISH_DATE`,
  `CONTENT`,
  `COMMENT_URL`,
  `ORIGIN_URL`,
  `IS_VISIBLE`,
  `ARTICLE`.`NO`,
  `SUBNO`
  FROM `ARTICLE`, `CATEGORY`
  WHERE `ARTICLE`.`CATEGORY` = `CATEGORY`.`NO`
    AND `ARTICLE`.`NO` = ?
    AND `SUBNO` = ? LIMIT 1");
echo $conn->error;
$stmt->bind_param("ss", $no, $subNo);
$stmt->execute();
$result = $stmt->get_result();
$num_row = $result->num_rows;

if($num_row > 0){
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
      $return = array('category' => $row['CATEGORY'],
      'tags' => $row['TAGS'],
      'mainTitle' => $row['MAIN_TITLE'],
      'subTitle' => $row['SUB_TITLE'],
      'mainTitleMenu' => $row['MAIN_TITLE_MENU'],
      'subTitleMenu' => $row['SUB_TITLE_MENU'],
      'isMultiple' => $row['IS_MULTIPLE'],
      'isContinued' => $row['IS_CONTINUED'],
      'content' => $row['CONTENT'],
      'createDate' => $row['CREATE_DATE'],
      'publishDate' => $row['PUBLISH_DATE'],
      'isVisible' => $row['IS_VISIBLE'],
      'commentUrl' => $row['COMMENT_URL'],
      'originUrl' => $row['ORIGIN_URL'],
      'no' => $row['NO'],
      'subNo' => $row['SUBNO']
      );
  }
}
$conn->close();
echo json_encode($return);

?>
