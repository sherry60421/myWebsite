<?php

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$no = isset($_POST['no']) ? intVal($_POST['no']) : 0;
$subNo = isset($_POST['subNo']) ? intVal($_POST['subNo']) : 0;

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
  `MEMO`,
  `ARTICLE`.`NO`,
  `SUBNO`
  FROM `ARTICLE`, `CATEGORY`
  WHERE `ARTICLE`.`CATEGORY` = `CATEGORY`.`NO`
    AND `ARTICLE`.`NO` = ?
    AND `SUBNO` = ? LIMIT 1");
echo $conn->error;
$stmt->bind_param("ii", $no, $subNo);
$stmt->execute();
$stmt->bind_result($category, $tags, $mainTitle, $mainTitleMenu, $subTitle, $subTitleMenu, $isMultiple, $isContinued,
$createDate, $publishDate, $content, $commentUrl, $originUrl, $isVisible, $memo, $no, $subNo);

while($stmt->fetch()){
    $return = array('category' => $category,
    'tags' => $tags,
    'mainTitle' => $mainTitle,
    'subTitle' => $subTitle,
    'mainTitleMenu' => $mainTitleMenu,
    'subTitleMenu' => $subTitleMenu,
    'isMultiple' => $isMultiple,
    'isContinued' => $isContinued,
    'content' => $content,
    'createDate' => $createDate,
    'publishDate' => $publishDate,
    'isVisible' => $isVisible,
    'commentUrl' => $commentUrl,
    'originUrl' => $originUrl,
    'memo' => $memo,
    'no' => $no,
    'subNo' => $subNo
    );
}
$conn->close();
echo json_encode($return);

?>
