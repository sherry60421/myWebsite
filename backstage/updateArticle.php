<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$no = isset($_POST['no']) ? intVal($_POST['no']) : 0;
$subNo = isset($_POST['subNo']) ? intVal($_POST['subNo']) : 0;

$category = isset($_POST['category']) ? intVal($_POST['category']) : 0;
$tags = isset($_POST['tags']) ? $_POST['tags'] : '';
$mainTitle = isset($_POST['mainTitle']) ? $_POST['mainTitle'] : '';
$subTitle = isset($_POST['subTitle']) ? $_POST['subTitle'] : '';
$mainTitleMenu = isset($_POST['mainTitleMenu']) ? $_POST['mainTitleMenu'] : '';
$subTitleMenu = isset($_POST['subTitleMenu']) ? $_POST['subTitleMenu'] : '';
$content = isset($_POST['content']) ? $_POST['content'] : '';
$memo = isset($_POST['memo']) ? $_POST['memo'] : '';
$createDate = isset($_POST['createDate']) ? $_POST['createDate'] : '';
$publishDate = isset($_POST['publishDate']) ? $_POST['publishDate'] : '';
$isVisible = isset($_POST['isVisible']) ? intVal($_POST['isVisible']) : 0;
$isMultiple = isset($_POST['isMultiple']) ? intVal($_POST['isMultiple']) : 0;
$isContinued = isset($_POST['isContinued']) ? intVal($_POST['isContinued']) : 0;
$commentUrl = isset($_POST['commentUrl']) ? $_POST['commentUrl'] : '';
$originUrl = isset($_POST['originUrl']) ? $_POST['originUrl'] : '';

$stmt = $conn->prepare("SELECT `CONTENT` FROM `ARTICLE` WHERE `NO` = ? AND `SUBNO` = ? LIMIT 1");
echo $conn->error;
$stmt->bind_param("ii", $no, $subNo);
$stmt->execute();
$stmt->bind_result($oldContentTmp);
while($stmt->fetch()){
  $oldContent = $oldContentTmp;
}
// 進入article_footprint
if($content != $oldContent){
  $stmt = $conn->prepare("INSERT INTO `ARTICLE_FOOTPOINT`(
    `NO`,
    `SUBNO`,
    `UPDATE_TIME`,
    `OLD_CONTENT`
  ) VALUES (?,?,CURRENT_TIMESTAMP,?)");
  $stmt->bind_param("iis", $no, $subNo, $oldContent);
  $stmt->execute();
}

$stmt = $conn->prepare("UPDATE `ARTICLE` SET
  `CATEGORY` = ?,
  `TAGS` = ?,
  `MAIN_TITLE` = ?,
  `MAIN_TITLE_MENU` = ?,
  `SUB_TITLE` = ?,
  `SUB_TITLE_MENU` = ?,
  `CONTENT` = ?,
  `CREATE_DATE` = ?,
  `PUBLISH_DATE` = ?,
  `IS_VISIBLE` = ?,
  `IS_MULTIPLE` = ?,
  `IS_CONTINUED` = ?,
  `COMMENT_URL` = ?,
  `ORIGIN_URL` = ?,
  `MEMO` = ?
 WHERE `NO` = ? AND `SUBNO` = ?");
echo $conn->error;
$stmt->bind_param("sssssssssssssssii", $category, $tags, $mainTitle, $mainTitleMenu, $subTitle, $subTitleMenu,
  $content, $createDate, $publishDate, $isVisible, $isMultiple, $isContinued, $commentUrl, $originUrl, $memo, $no, $subNo);
$stmt->execute();

$conn->close();
echo 'success';
?>
