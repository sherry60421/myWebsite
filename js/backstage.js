// ajax
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

var $table = $('#table');
function queryParams() {
}
function responseHandler(res) {
    return res.rows;
}

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

$("[name='isMultiple']").change(function(){
  checked = $(this).prop("checked");
  if(checked){
    $("[name='isContinued']").closest("label").css("display", "initial");
    $("div[for='multiple']").css("display", "inherit");
  }
  else{
    $("[name='isContinued']").closest("label").css("display", "none");
    $("div[for='multiple']").css("display", "none");
    $("[name='isContinued']").prop("checked", true);
    $("[name='subTitle']").val("");
    $("[name='subTitleMenu']").val("");
  }
});

$("[name='createDate']").datetimepicker({
  format: 'YYYY-MM-DD HH:mm:ss',
  defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
});
$("[name='publishDate']").datetimepicker({
  format: 'YYYY-MM-DD HH:mm:ss',
  defaultDate: moment().format('YYYY-MM-DD HH:mm:ss')
});

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
