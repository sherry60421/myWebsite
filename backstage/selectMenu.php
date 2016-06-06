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
$stmt = $conn->prepare("SELECT `CATEGORY`,`ARTICLE`.`NO`,`SUBNO`,`TAGS`,`MAIN_TITLE_MENU`,`SUB_TITLE_MENU`,`PUBLISH_DATE`,`IS_CONTINUED`
  FROM `ARTICLE`,`CATEGORY`
  WHERE `CATEGORY`.`NO` = `ARTICLE`.`CATEGORY`
  AND `PUBLISH_DATE` <= CURRENT_TIMESTAMP
  AND `IS_VISIBLE` = 1
  ORDER BY `CATEGORY`, `ARTICLE`.`NO`, `SUBNO`");
echo $conn->error;
$stmt->execute();
$stmt->bind_result($category, $no, $subNo, $tags, $mainTitleMenu, $subTitleMenu, $publishDate, $isContinued);

//先匯整
$tmp_category = "";
$tmp_no = "";
while($stmt->fetch()){
  $article = array('tags' => $tags, 'mainTitleMenu' => $mainTitleMenu, 'subTitleMenu' => $subTitleMenu,
                   'subNo' => $subNo, 'publishDate' => $publishDate, 'isContinued' => $isContinued);
  //與前篇不同分類
  if($category !== $tmp_category){
    $return[$category] = array($no => array($article));
  }
  //與前篇同分類,不同主篇
  else if($category === $tmp_category && $no !== $tmp_no){
    $return[$category][$no] = array($article);
  }
  //與前篇同分類,同主篇
  else{
    array_push($return[$category][$no], $article);
  }
  $tmp_category = $category;
  $tmp_no = $no;
}
//補上分類名
$newArr = array();
foreach($return as $key => $value) {
  $newArr[$allCategory[$key]] = $value;
}
/*
{
'[category]':{'[no]':[{'tags':'', mainTitleMenu:'', subTitleMenu: '', subNo: '', publishDate:'', isContinued:''},{}...], },
'[category]':[]
}
*/
$conn->close();
echo json_encode($newArr);

?>
