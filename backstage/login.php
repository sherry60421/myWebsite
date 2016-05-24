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
$result = $stmt->get_result();
$row = $result->num_rows;

$return = array('errorTag' => '*', 'message' => '');

// 有此帳號
if($row > 0){
  while($row = $result->fetch_array(MYSQLI_ASSOC)){
    if($password === $row['PASSWORD']){
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
