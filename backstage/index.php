<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- <link rel="icon" href="../../favicon.ico"> -->
    <title>後台管理</title>
    <!-- Bootstrap core CSS -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../bootstrap-table/src/bootstrap-table.css" rel="stylesheet">
    <link rel="stylesheet/less" type="text/css" href="../css/variables.less" />
    <!-- Custom styles for this template -->
    <link href="../css/general.css" rel="stylesheet">
    <link rel="stylesheet/less" type="text/css" href="../css/bootswatch.less" />
    <link rel="stylesheet" href="../css/article.css" />
    <!-- less -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/less.js/1.7.0/less.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="../assets/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../assets/ie-emulation-modes-warning.js"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    <?php
    session_start();
    if(isset($_SESSION['username'])) :
    ?>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h2>Hello, <?php echo $_SESSION['username']; ?></h2>
        </div>
        <div class="col-md-12">
          <button class="btn btn-primary">新增文章</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover" data-toggle="table">
              <thead>
                  <tr>
                      <th data-field="id">Item ID</th>
                      <th data-field="name">Item Name</th>
                      <th data-field="price">Item Price</th>
                  </tr>
              </thead>
          </table>
        </div>
      </div>
    </div> <!-- /container -->
  <?php else : ?>
    <div class="container-fluid">
      <div class="row">
        您沒有權限！
      </div>
    </div> <!-- /container -->
  <?php endif; ?>
  </body>
</html>
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../bootstrap-table/src/bootstrap-table.js"></script>
<script src="../bootstrap-table/src/locale/bootstrap-table-zh-TW.js"></script>

<script>

</script>
