<?php
session_start();

require('general.php');
header("Content-Type:application/json; charset=utf-8");

$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

$stmt = $conn->prepare("SELECT `USERNAME`,`PASSWORD` FROM `USER` WHERE `USERNAME` = ?");
echo $conn->error;
$stmt->bind_param("s", $username);

$stmt->execute();
$stmt->store_result();
$row = $stmt->num_rows;

$return = array('errorTag' => '*', 'message' => '');

// 有此帳號
if($row > 0){
  $stmt->bind_result($f1_username, $f2_password);
  while($stmt->fetch()){
    if($password === $f2_password){
      $return['errorTag'] = '';
      $_SESSION['username'] = $username;
    }
  }
  $return['message'] = '密碼輸入錯誤！';
}
// 無此帳號
else{
  $return['message'] = '無此帳號！';
}
$conn->close();
echo json_encode($return);

?>
