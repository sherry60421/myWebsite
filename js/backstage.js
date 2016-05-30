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
  else if(value === 1)
    return "<span style='color: lightgreen;'>已發佈</span>";
  return value;
}

function editFormatter(value, row, index){
  return "<button class='btn btn-xs btn-success' data-toggle='modal' data-target='#newArticle' "
  + "edit-key-category='" + row.categoryNo + "' edit-key-no='" + row.no + "' edit-key-subno='" + row.subNo + "' editable>"
  + "<span class='glyphicon glyphicon-pencil'></span>"
  + "</button>";
}
function responseHandler(res){
  return res.rows;
}

// 編輯鈕
$table.on('load-success.bs.table', function () {
  $("button[editable]").click(function(){
    var categoryNo = Number($(this).attr("edit-key-category"));
    var no = Number($(this).attr("edit-key-no"));
    var subNo = Number($(this).attr("edit-key-subno"));
    $.ajax({
      url: "querySingleArticle.php",
      method: "post",
      data: { "categoryNo" : categoryNo, "no" : no, "subNo" : subNo },
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        $("#ArticleLabel").text("請修改文章");
        var categoryOptions = $("select[name='category']").find("option");
        for(i=0; i<categoryOptions.length; i++){
          if($(categoryOptions[i]).val() === data.category)
            $(categoryOptions[i]).prop("selected", true);
        }
        $("[name='tags']").val(data.tags);
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
        $("#summernote").summernote("code", data.content);
        $("[name='originUrl']").val(data.originUrl);
        $("[name='commentUrl']").val(data.commentUrl);
        if(data.isVisible === 1)
          $("[name='isVisible']").prop("checked", true);
        else if(data.isVisible === 0)
          $("[name='isVisible']").prop("checked", false);
        //data.no
        //data.subNo
      },
      fail: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
      }
    });
  });
});

// 新增鈕
$("button[insert]").click(function(){
  $("#ArticleLabel").text("請填入文章");
  var categoryOptions = $("select[name='category']").find("option");
  for(i=0; i<categoryOptions.length; i++){
    $(categoryOptions[i]).prop("selected", false);
  }
  $("[name='tags']").val("");
  $("[name='mainTitle']").val("");
  $("[name='mainTitleMenu']").val("");
  $("[name='isMultiple']").prop("checked", false);
  $("[name='isMultiple']").change();
  $("[name='isContinued']").prop("checked", true);
  $("[name='subTitle']").val("");
  $("[name='subTitleMenu']").val("");
  $("[name='createDate']").val("");
  $("[name='publishDate']").val("");
  $("#summernote").html("");
  $("[name='originUrl']").val("");
  $("[name='commentUrl']").val("");
  $("[name='isVisible']").prop("checked", false);
});

// summernote
$("#summernote").summernote({
  lang: "zh-TW",
  height: 500,
  toolbar: [
    ["style", ["bold", "italic", "underline", "strikethrough", "clear"]],
    ["font", ["superscript", "subscript","fontname","fontsize","color"]],
    ["insert", ["link", "table", "hr", "picture", "video"]],
    ["para", ["style", "ul", "ol", "paragraph", "height"]],
    ["misc",["fullscreen", "codeview", "undo", "redo", "help"]]
  ],
  placeholder: "測試中，插入影片和圖片先不要用喔~~"
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

//日期
$("[name='createDate']").datetimepicker({
  format: 'YYYY-MM-DD HH:mm:ss',
  defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
});
$("[name='publishDate']").datetimepicker({
  format: 'YYYY-MM-DD HH:mm:ss',
  defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
});

//清除防堵
var isClickReset = false;
$("button[type='reset']").click(function(e){
  if(!isClickReset){
    $("<small class='warning-text'>確定要清除嗎？</small>").insertBefore($($(this).closest("div").find("button")[0]));
    e.preventDefault();
  }
  else{
    $($(this).closest("div").find("small")[0]).remove();
  }
  isClickReset = !isClickReset;
});
