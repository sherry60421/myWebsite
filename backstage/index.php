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
    <link href="../tagsinput/bootstrap-tagsinput.css" rel="stylesheet">
    <link rel="stylesheet/less" type="text/css" href="../css/variables.less" />
    <!-- summernote -->
    <link href="../summernote/dist/summernote.css" rel="stylesheet">
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
    <!-- datetimepicker -->
    <link rel="stylesheet" href="../datetimepicker/css/bootstrap-datetimepicker.min.css">
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
      </div>
      <div id="toolbar">
        <div class="form-inline">
          <div class="form-group">
            <button class="btn btn-primary" data-toggle="modal" data-target="#newArticle">新增文章</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="table"
                 class="table table-hover"
                 data-toggle="table"
                 data-toolbar="#toolbar"
                 data-show-refresh="true"
                 data-show-columns="true"
                 data-query-params="queryParams"
                 data-response-handler="responseHandler"
                 data-pagination="true"
                 data-url="queryArticle.php">
              <thead>
              <tr>
                  <th data-field="category">分類</th>
                  <th data-field="tags">標籤</th>
                  <th data-field="mainTitle">主標題</th>
                  <th data-field="subTitle">次標題</th>
                  <th data-field="content">內容</th>
                  <th data-field="createDate">建立日期</th>
                  <th data-field="publishDate">發佈日期</th>
                  <th data-field="isVisible">是否發佈</th>
                  <th data-field="">編輯</th>
              </tr>
              </thead>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <form class="form-horizontal">
      <div class="modal fade" id="newArticle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg newArticle-modal" role="document">
          <div class="modal-content newArticle-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">請填入文章</h4>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="category" class="col-md-1 control-label">分類</label>
                        <div class="col-md-4">
                          <select class="form-control" name="category"></select>
                        </div>
                        <label for="tags" class="col-md-offset-1 col-md-1 control-label">標籤</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="tags" data-role="tagsinput">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="mainTitle" class="col-md-1 control-label">主標題</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="mainTitle">
                        </div>
                        <div class="col-md-1" style="text-align: right;">
                          <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-arrow-right"></span></button>
                        </div>
                        <label for="mainTitleMenu" class="control-label col-md-1">MENU</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="mainTitleMenu">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <div class="checkbox col-md-offset-1 col-md-12">
                          <label>
                            <input type="checkbox" name="isMultiple"> 是否多篇
                          </label>
                          <label style="display:none;">
                            <input type="checkbox" name="isContinued" checked> 是否未完結
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" style="display:none;" for="multiple">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="subTitle" class="col-md-1 control-label">次標題</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="subTitle">
                        </div>
                        <div class="col-md-1" style="text-align: right;">
                          <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-arrow-right"></span></button>
                        </div>
                        <label for="subTitleMenu" class="control-label col-md-1">MENU</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="subTitleMenu">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="mainTitle" class="col-md-1 control-label">建立日期</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="createDate"></input>
                        </div>
                        <div class="col-md-1" style="text-align: right;">
                          <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-arrow-right"></span></button>
                        </div>
                        <label for="mainTitleMenu" class="control-label col-md-1">發佈日期</label>
                        <div class="col-md-4">
                          <input type="text" class="form-control" name="publishDate"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div id="summernote"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="originUrl" class="col-md-1 control-label">文章原址</label>
                        <div class="col-md-6">
                          <input type="text" class="form-control" name="originUrl"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="originUrl" class="col-md-1 control-label">回應位址</label>
                        <div class="col-md-6">
                          <input type="text" class="form-control" name="originUrl"></input>
                        </div>
                        <div class="col-md-offset-1 col-md-4" style="text-align: right;">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox" name="isVisible"> 是否發布
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">回前頁</button>
              <button type="reset" class="btn btn-danger">清除</button>
              <button type="button" class="btn btn-primary">送出</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- end of modal -->
  <?php else : ?>
    <div class="container-fluid">
      <div class="row">
        您沒有權限！
      </div>
    </div>
  <?php endif; ?>
  </body>
</html>
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<!-- general -->
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../bootstrap-table/src/bootstrap-table.js"></script>
<script src="../bootstrap-table/src/locale/bootstrap-table-zh-TW.js"></script>
<!-- summernote -->
<script src="../summernote/dist/summernote.js"></script>
<script src="../summernote/dist/lang/summernote-zh-TW.js"></script>
<!-- tagsinput -->
<script src="../tagsinput/bootstrap-tagsinput.min.js"></script>
<!-- datetimepicker -->
<script type="text/javascript" src="../datetimepicker/js/moment.js"></script>
<script type="text/javascript" src="../datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="../js/backstage.js"></script>
