<?php

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$stmt = $conn->prepare("SELECT DISTINCT `CATEGORY`.`NO`, `DESC` AS CATEGORY
  FROM `ARTICLE`,`CATEGORY`
  WHERE `CATEGORY`.`NO` = `ARTICLE`.`CATEGORY`
  AND `PUBLISH_DATE` <= CURRENT_TIMESTAMP AND `IS_VISIBLE` = 1");
echo $conn->error;
$stmt->execute();
$stmt->bind_result($no, $desc);

$allCategory = array();
while($stmt->fetch()){
  $allCategory[$no] = $desc;
}

$return = array();
$stmt = $conn->prepare("SELECT `CATEGORY`,`DESC`,`ARTICLE`.`NO`,`SUBNO`,`TAGS`,`MAIN_TITLE_MENU`,`SUB_TITLE_MENU`, `MAX_PUBLISH_DATE` AS `PUBLISH_DATE`,`IS_CONTINUED`
  FROM `ARTICLE`,`CATEGORY`,
  ( SELECT `ARTICLE`.`NO`, MAX(`PUBLISH_DATE`) AS `MAX_PUBLISH_DATE`
    FROM `ARTICLE`
    WHERE `PUBLISH_DATE` <= CURRENT_TIMESTAMP
    AND `IS_VISIBLE` = 1
    GROUP BY `ARTICLE`.`NO`) AS `M`
  WHERE `CATEGORY`.`NO` = `ARTICLE`.`CATEGORY`
  AND `M`.`NO` = `ARTICLE`.`NO`
  AND `PUBLISH_DATE` <= CURRENT_TIMESTAMP
  AND `IS_VISIBLE` = 1
  ORDER BY `CATEGORY`, `ARTICLE`.`NO`, `SUBNO`");
echo $conn->error;
$stmt->execute();
$stmt->bind_result($category, $categoryDesc, $no, $subNo, $tags, $mainTitleMenu, $subTitleMenu, $publishDate, $isContinued);

//先匯整
$tmp_category = "";
$tmp_no = "";
$return = [];
while($stmt->fetch()){
  $article = array('category'=> $category,
  'categoryDesc' => $categoryDesc,
  'no' => $no,
  'subNo' => $subNo,
  'tags' => $tags,
  'mainTitleMenu' => $mainTitleMenu,
  'subTitleMenu' => $subTitleMenu,
  'publishDate' => $publishDate,
  'isContinued' => $isContinued);
  array_push($return, $article);
}
// //補上分類名
// $newArr = array();
// foreach($return as $key => $value) {
//   $newArr[$allCategory[$key]] = $value;
// }
/*
**all**
[{"categoryNo": [novels], }, {"categoryNo" : [ ] }, ... ]
**novels**
[{"no":[{},{},{}], "no":[{}], ... }]
*/
$conn->close();
echo json_encode($return);

?>
