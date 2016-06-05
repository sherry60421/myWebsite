// 分類ajax
$.ajax({
  url: "selectAllCategory.php",
  dataType: "json",
  success: function(data, textStatus, jqXHR){
    for(i=0; i<data.length; i++){
      $("<option/>").text(data[i].desc).val(data[i].no).appendTo($("[name='category']"));
    }
  },
  fail: function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});

// bootstrap table
var $table = $('#table');
function tagsFormatter(value, row, index){
  var result = "";
  if(value.indexOf(",") > 0){
    var array = value.split(",");
    for(i=0; i<array.length; i++){
      result += "<span class='tag label label-info' style='margin: 2px;'>" + array[i] + "</span>";
    }
  }
  else
    result = "<span class='tag label label-info'>" + value + "</span>";
  return result;
}
function contentFormatter(value, row, index){
  var regEx = /<[^>]*>/g;
  var cleanContent = value.replace(regEx, "").replace("　", "").replace(" ", "");
  return cleanContent.substring(0, 15);
}

function isVisibleFormatter(value, row, index){
  if(value === 0)
    return "<span style='color: red;'>未發佈</span>";
  else if(value === 1 && row.publishDate > moment().format('YYYY-MM-DD HH:mm:ss'))
    return "<span style='color: cornflowerblue;'>自動發佈</span>";
  else if(value === 1)
    return "<span style='color: lightgreen;'>已發佈</span>";
  return value;
}

function editFormatter(value, row, index){
  return "<button class='btn btn-xs btn-success' data-toggle='modal' data-target='#newArticle' "
  + "' edit-key-no='" + row.no + "' edit-key-subno='" + row.subNo + "' editable>"
  + "<span class='glyphicon glyphicon-pencil'></span>"
  + "</button>";
}
function responseHandler(res){
  return res.rows;
}

// 編輯鈕
$table.on('load-success.bs.table', function () {
  $("button[editable]").click(function(){
    var no = Number($(this).attr("edit-key-no"));
    var subNo = Number($(this).attr("edit-key-subno"));
    $.ajax({
      url: "querySingleArticle.php",
      method: "post",
      data: { "no" : no, "subNo" : subNo },
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        putArticleAttribute(data, "update");
      },
      fail: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
      }
    });
  });
});

// 新增鈕
$("button[insert]").click(function(){
  putArticleAttribute(null, "insert");
});

// 放入文章屬性
function putArticleAttribute(data, opt){
  if(opt === "insert"){
    $("#ArticleLabel").text("請填入文章");
    var categoryOptions = $("select[name='category']").find("option");
    for(i=0; i<categoryOptions.length; i++){
      $(categoryOptions[i]).prop("selected", false);
    }
    $("[name='tags']").tagsinput('removeAll');
    $("[name='mainTitle']").val("");
    $("[name='mainTitleMenu']").val("");
    $("[name='isMultiple']").prop("checked", false);
    $("[name='isMultiple']").change();
    $("[name='isContinued']").prop("checked", true);
    $("[name='subTitle']").val("");
    $("[name='subTitleMenu']").val("");
    $("[name='createDate']").val("");
    $("[name='publishDate']").val("");
    $("#article-content").summernote("code", "");
    $("#article-memo").summernote("code", "");
    $("[name='originUrl']").val("");
    $("[name='commentUrl']").val("");
    $("[name='isVisible']").prop("checked", false);
    $($(".modal-footer").find("button[is-new-article]")[0]).attr("is-new-article", 1);
  }
  else if(opt === "update"){
    $("#ArticleLabel").text("請修改文章");
    var categoryOptions = $("select[name='category']").find("option");
    for(i=0; i<categoryOptions.length; i++){
      if($(categoryOptions[i]).val() === data.category)
        $(categoryOptions[i]).prop("selected", true);
    }
    var result = "";
    if(data.tags.indexOf(",") > 0){
      var array = data.tags.split(",");
      for(i=0; i<array.length; i++){
        $("[name='tags']").tagsinput('add', array[i]);
      }
    }
    else if(data.tags !== '')
      $("[name='tags']").tagsinput('add', data.tags);
    else
      $("[name='tags']").tagsinput('removeAll');
    $("[name='mainTitle']").val(data.mainTitle);
    $("[name='mainTitleMenu']").val(data.mainTitleMenu);
    if(data.isMultiple === 1)
      $("[name='isMultiple']").prop("checked", true);
    else if(data.isMultiple === 0)
      $("[name='isMultiple']").prop("checked", false);
    $("[name='isMultiple']").change();
    if(data.isContinued === 1)
      $("[name='isContinued']").prop("checked", true);
    else if(data.isContinued === 0)
      $("[name='isContinued']").prop("checked", false);
    $("[name='subTitle']").val(data.subTitle);
    $("[name='subTitleMenu']").val(data.subTitleMenu);
    $("[name='createDate']").val(data.createDate);
    $("[name='publishDate']").val(data.publishDate);
    $("#article-content").summernote("code", data.content);
    $("#article-memo").summernote("code", data.memo);
    $("[name='originUrl']").val(data.originUrl);
    $("[name='commentUrl']").val(data.commentUrl);
    if(data.isVisible === 1)
      $("[name='isVisible']").prop("checked", true);
    else if(data.isVisible === 0)
      $("[name='isVisible']").prop("checked", false);
    $("[name='oldCategory']").val(data.category);
    $("[name='no']").val(data.no);
    $("[name='subNo']").val(data.subNo);
    $($(".modal-footer").find("button[is-new-article]")[0]).attr("is-new-article", 0);
  }
}

// tab切換
$('#article-content').on('summernote.init', function() {
  $(this).next(".note-editor").attr("id", "article-content-editor");
  $(this).next(".note-editor").addClass("tab-pane fade in active");
});
$('#article-memo').on('summernote.init', function() {
  $(this).next(".note-editor").attr("id", "article-memo-editor");
  $(this).next(".note-editor").addClass("tab-pane fade");
});

// 送出文章
$("button[is-new-article]").click(function(){
  $($(this).closest("div").find("small")[0]).remove();
  $btn = $(this);
  var isNew = $(this).attr("is-new-article");
  //是新增
  if(isNew === "1"){
    $.ajax({
      url: "insertArticle.php",
      method: "post",
      data: getAllFieldValue(),
      dataType: "text",
      success: function(data, textStatus, jqXHR){
        if(data === "success")
          $("<small class='success-text'>新增成功！</small>").insertBefore($($btn.closest("div").find("button")[0]));
        else
          $("<small class='warning-text'>新增失敗！</small>").insertBefore($($btn.closest("div").find("button")[0]));
      },
      fail: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
      }
    });
  }
  //是修改
  else{
    $.ajax({
      url: "updateArticle.php",
      method: "post",
      data: getAllFieldValue(),
      dataType: "text",
      success: function(data, textStatus, jqXHR){
        if(data === "success")
          $("<small class='success-text'>修改成功！</small>").insertBefore($($btn.closest("div").find("button")[0]));
        else
          $("<small class='warning-text'>修改失敗！</small>").insertBefore($($btn.closest("div").find("button")[0]));d
      },
      fail: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
      }
    });
  }
});

// 抓文章畫面上的所有欄位
function getAllFieldValue(){
  var data = {
    "no" : $("[name='no']").val(),
    "subNo" : $("[name='subNo']").val(),
    "category" : $("select[name='category']").val(),
    "tags" : $("[name='tags']").val(),
    "mainTitle" : $("[name='mainTitle']").val(),
    "mainTitleMenu" : $("[name='mainTitleMenu']").val(),
    "isMultiple" : $("[name='isMultiple']").prop("checked") ? "1" : "0",
    "isContinued" : $("[name='isContinued']").prop("checked") ? "1" : "0",
    "subTitle" : $("[name='subTitle']").val(),
    "subTitleMenu" : $("[name='subTitleMenu']").val(),
    "createDate" : $("[name='createDate']").val(),
    "publishDate" : $("[name='publishDate']").val(),
    "content" : $("#article-content").summernote("code"),
    "memo" : $("#article-memo").summernote("code"),
    "originUrl" : $("[name='originUrl']").val(),
    "commentUrl" : $("[name='commentUrl']").val(),
    "isVisible" : $("[name='isVisible']").prop("checked") ? "1" : "0"
  };
  return data;
}

// 關閉modal時刪掉提示訊息
$("#newArticle").on('hidden.bs.modal', function () {
  $($(this).closest("div").find("small")[0]).remove();
  $table.bootstrapTable('refresh');
});

//開啟modal時
$("#newArticle").on('show.bs.modal', function(){
  if($("[name='createDate']").data("DateTimePicker") !== undefined
    && $("[name='publishDate']").data("DateTimePicker") !== undefined){
    $("[name='createDate']").data("DateTimePicker").destroy();
    $("[name='publishDate']").data("DateTimePicker").destroy();
  }
  $("[name='createDate']").datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss',
    defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
  });
  $("[name='publishDate']").datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss',
    defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
  });
});

// button複製
$("button.copy").click(function(){
  var inputs = $(this).closest("div.form-group").find("input");
  $(inputs[1]).val($(inputs[0]).val());
});

// summernote
$("#article-content").summernote({
  lang: "zh-TW",
  height: 500,
  toolbar: [
    ["style", ["bold", "italic", "underline", "strikethrough", "clear"]],
    ["font", ["superscript", "subscript","fontname","fontsize","color"]],
    ["insert", ["link", "table", "hr", "picture", "video"]],
    ["para", ["style", "ul", "ol", "paragraph", "height"]],
    ["misc",["codeview", "undo", "redo", "help"]]
  ],
  placeholder: "輸入內容"
});
$("#article-memo").summernote({
  lang: "zh-TW",
  height: 300,
  toolbar: [
    ["style", ["bold", "italic", "underline", "strikethrough", "clear"]],
    ["font", ["superscript", "subscript","fontsize","color"]],
    ["insert", ["link", "table", "hr", "picture", "video"]],
    ["para", ["style", "ul", "ol", "paragraph", "height"]],
    ["misc",["codeview", "undo", "redo", "help"]]
  ],
  placeholder: "輸入後記"
});

// 多篇控制項
$("[name='isMultiple']").change(function(){
  checked = $(this).prop("checked");
  // 多篇
  if(checked){
    $("[name='isContinued']").closest("label").css("display", "initial");
    $("div[for='multiple']").css("display", "inherit");
    // 多篇預設未完結
    $("[name='isContinued']").prop("checked", true);
  }
  // 單篇
  else{
    $("[name='isContinued']").closest("label").css("display", "none");
    $("div[for='multiple']").css("display", "none");
    // 單篇預設已完結
    $("[name='isContinued']").prop("checked", false);
    $("[name='subTitle']").val("");
    $("[name='subTitleMenu']").val("");
  }
});

//清除防堵
var isClickReset = false;
$("button[type='reset']").click(function(e){
  $($(this).closest("div").find("small")[0]).remove();
  if(!isClickReset){
    $("<small class='warning-text'>確定要清除嗎？</small>").insertBefore($($(this).closest("div").find("button")[0]));
    e.preventDefault();
  }
  else{
    // 補清除
    $("#article-content").summernote("code", "");
    $("#article-memo").summernote("code", "");
    $("[name='tags']").tagsinput('removeAll');
  }
  isClickReset = !isClickReset;
});
