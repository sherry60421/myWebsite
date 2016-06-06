<?php

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
  `ARTICLE`.`NO`,
  `SUBNO`,
  `HITS`
  FROM `ARTICLE`, `CATEGORY` WHERE `ARTICLE`.`CATEGORY` = `CATEGORY`.`NO` ORDER BY `CREATE_DATE` DESC");
echo $conn->error;

$stmt->execute();
$stmt->store_result();
$num_row = $stmt->num_rows;
$stmt->bind_result($category, $tags, $mainTitle, $subTitle, $content, $createDate,
$publishDate, $isVisible, $no, $subNo, $hits);

$rows = array();

while($stmt->fetch()){
    $rows[] = array('category' => $category,
    'tags' => $tags,
    'mainTitle' => $mainTitle,
    'subTitle' => $subTitle,
    'content' => $content,
    'createDate' => $createDate,
    'publishDate' => $publishDate,
    'isVisible' => $isVisible,
    'no' => $no,
    'subNo' => $subNo,
    'hits' => $hits
    );
}
$return = array('total' => $num_row, 'rows' => $rows);
$conn->close();
echo json_encode($return);

?>
