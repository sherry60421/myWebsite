var tagOrder = ['tag-primary', 'tag-info', 'tag-success', 'tag-warning', 'tag-danger'];
// 抓現有的category建立folder tag(待加文章!!!)
$.ajax({
  url: "backstage/selectAllCategory.php",
  dataType: "json",
  success: function(data, textStatus, jqXHR){
    $div = $($("#novel").find(".folder")[0]);
    if(data.length > 0){
      $("<div class='folder-content folder-content-primary'></div>").appendTo($div);
      $("<div class='tags'></div>").appendTo($div);
    }
    for(i=0; i<data.length; i++){
      $tags = $($div.find('.tags')[0]);
      var $newTag = $("<div class='tag'></div>").addClass(tagOrder[i%5]);
      $newTag.append('<a data-category="#' + data[i].no + '">' + data[i].desc + '</a>');
      $newTag.appendTo($tags);
    }

    //完成才有 一次載完 存於json日後切換
    $(".tag").click(function(){
      var tag_class = $(this).attr("class").replace("tag ", "");
      for(i = 0; i < tagOrder.length; i++){
        if(tag_class.indexOf(tagOrder[i]) !== -1){
          $(".folder>.folder-content").removeClass("folder-content-success folder-content-info folder-content-warning folder-content-danger folder-content-primary");
          $(".folder>.folder-content").addClass(tagOrder[i].replace("tag", "folder-content"));
        }
      }
    });

  },
  fail: function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});


// tooltip
$('[data-toggle="tooltip"]').tooltip();
