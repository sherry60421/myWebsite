<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$no = isset($_POST['no']) ? intVal($_POST['no']) : '';
$subNo = isset($_POST['subNo']) ? intVal($_POST['subNo']) : '';

$category = isset($_POST['category']) ? intVal($_POST['category']) : 0;
$tags = isset($_POST['tags']) ? $_POST['tags'] : '';
$mainTitle = isset($_POST['mainTitle']) ? $_POST['mainTitle'] : '';
$subTitle = isset($_POST['subTitle']) ? $_POST['subTitle'] : '';
$mainTitleMenu = isset($_POST['mainTitleMenu']) ? $_POST['mainTitleMenu'] : '';
$subTitleMenu = isset($_POST['subTitleMenu']) ? $_POST['subTitleMenu'] : '';
$content = isset($_POST['content']) ? $_POST['content'] : '';
$createDate = isset($_POST['createDate']) ? $_POST['createDate'] : '';
$publishDate = isset($_POST['publishDate']) ? $_POST['publishDate'] : '';
$isVisible = isset($_POST['isVisible']) ? intVal($_POST['isVisible']) : 0;
$isMultiple = isset($_POST['isMultiple']) ? intVal($_POST['isMultiple']) : 0;
$isContinued = isset($_POST['isContinued']) ? intVal($_POST['isContinued']) : 0;
$commentUrl = isset($_POST['commentUrl']) ? $_POST['commentUrl'] : '';
$originUrl = isset($_POST['originUrl']) ? $_POST['originUrl'] : '';

// 先取得no, subNo
$stmt = $conn->prepare("SELECT `NO`, `SUBNO` FROM `ARTICLE` WHERE `MAIN_TITLE` = ? ORDER BY `SUBNO` DESC LIMIT 1");
echo $conn->error;
$stmt->bind_param("s", $mainTitle);
$stmt->execute();
$stmt->store_result();
$row = $stmt->num_rows;
$stmt->bind_result($speficNo, $maxSubNo);
if($row > 0){
  while($stmt->fetch()){
    $no = intVal($speficNo);
    $subNo = intVal($maxSubNo) + 1;
  }
}
else{
  $stmt = $conn->prepare("SELECT `NO` FROM `ARTICLE` ORDER BY `NO` DESC LIMIT 1");
  echo $conn->error;
  $stmt->execute();
  $stmt->store_result($maxNo);
  while($stmt->fetch()){
    $no = intVal($maxNo) + 1;
    $subNo = 1;
  }
}

$stmt = $conn->prepare("INSERT INTO `ARTICLE`(
  `NO`,
  `SUBNO`,
  `CATEGORY`,
  `TAGS`,
  `MAIN_TITLE`,
  `SUB_TITLE`,
  `MAIN_TITLE_MENU`,
  `SUB_TITLE_MENU`,
  `CONTENT`,
  `CREATE_DATE`,
  `PUBLISH_DATE`,
  `IS_VISIBLE`,
  `IS_MULTIPLE`,
  `IS_CONTINUED`,
  `COMMENT_URL`,
  `ORIGIN_URL`,
  `HITS`
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)");
echo $conn->error;
$stmt->bind_param("iiissssssssiiiss", $no, $subNo, $category, $tags, $mainTitle, $subTitle, $mainTitleMenu, $subTitleMenu,
  $content, $createDate, $publishDate, $isVisible, $isMultiple, $isContinued, $commentUrl, $originUrl);

$stmt->execute();
$conn->close();
echo 'success';
?>
