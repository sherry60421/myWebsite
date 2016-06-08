<?php
ini_set('memory_limit', '256M');

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$no = isset($_POST['no']) ? intVal($_POST['no']) : 0;
$subNo = isset($_POST['subNo']) ? intVal($_POST['subNo']) : 0;

$stmt = $conn->prepare("SELECT `MAIN_TITLE`,
  `SUB_TITLE`,
  `PUBLISH_DATE`,
  `CONTENT`,
  `COMMENT_URL`,
  `ORIGIN_URL`,
  `MEMO`,
  `HITS`
  FROM `ARTICLE`
  WHERE `NO` = ? AND `SUBNO` = ? LIMIT 1");
echo $conn->error;
$stmt->bind_param("ii", $no, $subNo);
$stmt->execute();
$stmt->bind_result($mainTitle, $subTitle, $publishDate, $content, $commentUrl, $originUrl, $memo, $hits);

while($stmt->fetch()){
    $return = array(
    'mainTitle' => $mainTitle,
    'subTitle' => $subTitle,
    'content' => $content,
    'publishDate' => $publishDate,
    'commentUrl' => $commentUrl,
    'originUrl' => $originUrl,
    'memo' => $memo
    );
    $old_hits = $hits;
}

$stmt = $conn->prepare("UPDATE `ARTICLE` SET `HITS` = ?
 WHERE `NO` = ? AND `SUBNO` = ?");
echo $conn->error;
$old_hits = $old_hits + 1;
$stmt->bind_param("iii", $old_hits, $no, $subNo);
$stmt->execute();

$conn->close();
echo json_encode($return);

?>
