var tagOrder = ['tag-primary', 'tag-success', 'tag-warning', 'tag-danger'];
// 抓現有的category建立folder tag(待加文章!!!)
$.ajax({
  url: "backstage/selectMenu.php",
  dataType: "json",
  success: function(data, textStatus, jqXHR){
    $div = $($("#novel").find(".folder")[0]);
    if(Object.keys(data).length == 0){
      return;
    }
    $("<div class='folder-content folder-content-primary'></div>").appendTo($div);
    $("<div class='tags'></div>").appendTo($div);
    for(i=0; i<Object.keys(data).length; i++){
      $tags = $($div.find('.tags')[0]);
      var $newTag = $("<div class='tag'></div>").addClass(tagOrder[i%5]);
      $newTag.append('<a data-cateNo="' + i + '">' + Object.keys(data)[i] + '</a>');
      $newTag.appendTo($tags);
    }
    // TODO 排序

    //先放第一個分類
    addMenu(data, 0);

    $(".tag").click(function(){
      //內容調整
      $(".folder>.folder-content").html("");
      var category = $($(this).find("a[data-cateNo]")[0]).attr("data-cateNo");
      addMenu(data, category);
      //背景樣式調整
      var tag_class = $(this).attr("class").replace("tag ", "");
      for(i = 0; i < tagOrder.length; i++){
        if(tag_class.indexOf(tagOrder[i]) !== -1){
          $(".folder>.folder-content").removeClass("folder-content-success folder-content-warning folder-content-danger folder-content-primary");
          $(".folder>.folder-content").addClass(tagOrder[i].replace("tag", "folder-content"));
        }
      }
    });
  },
  fail: function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});

function addMenu(data, cateNo){
  var firstData = data[Object.keys(data)[cateNo]];
  for(i=0; i<Object.keys(firstData).length; i++){
    $newPara = $("<p/>");
    var articles_no = Object.keys(firstData)[i];
    var articles = firstData[articles_no];
    //多篇
    if(articles.length > 1){
      $newPara.append(tagsFormatter(articles[0].tags) + "<br/>");
      var $mainTitle = $("<span/>").text(articles[0].mainTitleMenu).addClass("mainTitle");
      $newPara.append($mainTitle);
      $newPara.append("<br/>");
      for(j=0; j<articles.length; j++){
        var isNotEnd = articles[j].isContinued === "1" ? "(未完)" : "(完)";
        var thisTitleText = articles[j].subTitleMenu
                    + (j === articles.length-1 ? isNotEnd : "");
        var $subTitle = $("<a/>").attr("data-no", articles_no).attr("data-subno", articles[j].subNo)
        .text(thisTitleText).addClass("subTitle");
        $newPara.append($subTitle);
        $newPara.append(" ");
      }
    }
    //單篇
    else{
      $newPara.append(tagsFormatter(articles[0].tags)+"<br/>");
      var $mainTitle = $("<a/>").attr("data-no", articles_no).attr("data-subno", articles[0].subNo)
      .text(articles[0].mainTitleMenu).addClass("mainTitle");
      $newPara.append($mainTitle);
    }
    $(".folder>.folder-content").append($newPara);
  }
  registerMenuLink();
}

// tag Formatter
function tagsFormatter(value){
  var result = "";
  if(value.indexOf(",") > 0){
    var array = value.split(",");
    for(k=0; k<array.length; k++){
      result += "<span class='label label-info' style='margin: 2px;'>" + array[k] + "</span>";
    }
  }
  else
    result = "<span class='label label-info'>" + value + "</span>";
  return result;
}

// 註冊click行為,加文章
function registerMenuLink(){
  $(".folder-content>p>a").click(function(){
    var no = Number($(this).attr("data-no"));
    var subNo = Number($(this).attr("data-subno"));
    $.ajax({
      url: "backstage/querySingleArticle.php",
      method: "post",
      data: { "no" : no, "subNo" : subNo },
      dataType: "json",
      success: function(data, textStatus, jqXHR){
        $(".paper").html("");
        $(".paper").css("opacity", 0);
        var publishDate = moment(data.publishDate);
        var table_html = '<table><tr class="date-tr-1"><td>'
                          + publishDate.format("MMM")
                          + '</td><td>'
                          + publishDate.format("YYYY")
                          + '</td></tr><tr class="date-tr-2"><td colspan="2">'
                          + publishDate.format("DD")
                          + '</td></tr></table>';
        $date = $("<div/>").addClass("date").html(table_html);
        $title = $("<div/>").addClass("title").text(data.mainTitle + (data.subTitle === "" ? "" : "(" + data.subTitle + ")"));
        $content = $("<div/>").addClass("text").html(data.content);
        $memo = undefined; $comment = undefined;
        if(typeof(data.memo) !== "undefined" && data.memo !== ""){
          $memo = $("<div/>").addClass("memo").append('<a data-toggle="collapse" data-target="#memo">後記 <span class="glyphicon glyphicon-menu-down"></span></a>')
          .append('<div id="memo" class="collapse"><pre>'+data.memo+'</pre></div>');
        }
        if(typeof(data.commentUrl) !== "undefined" && data.commentUrl !== ""){
          $comment = $("<div/>").addClass("comment").append('<a data-toggle="collapse" data-target="#comment">回應(Lofter) <span class="glyphicon glyphicon-menu-down"></span></a>')
          .append('<div id="comment" class="collapse"><iframe src="'+data.commentUrl+'"></iframe></div>');
        }

        $heading = $("<div/>").addClass("heading");
        $heading.append($date);
        $heading.append($title);
        $(".paper").append($heading);
        $(".paper").append($content);
        $(".paper").append(typeof($memo) === "undefined" ? "" : $memo);
        $(".paper").append(typeof($comment) === "undefined" ? "" : $comment);
        // collapse event
        $('#memo,#comment').on('show.bs.collapse hide.bs.collapse', function (event) {
          var span = $($("#"+$(this).attr("id")).prev("a").find("span")[0]);
          span.removeClass("glyphicon-menu-down glyphicon-menu-up");
          if(event.type === "show")
            span.addClass("glyphicon-menu-up");
          else
            span.addClass("glyphicon-menu-down");
        });
        $(".paper").animate({"opacity" : 1}, 500);
      },
      fail: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
      }
    });
  });
}


/*
<div class="heading">
  <div class="date">
    <table>
      <tr class="date-tr-1">
        <td>Feb</td>
        <td>2016</td>
      </tr>
      <tr class="date-tr-2">
        <td colspan="2">13</td>
      </tr>
    </table>
  </div>
  <div class="title">倒是可以共同來檢討為何會心寒</div>
</div>
<div class="text">

</div>
<a href="#demo" data-toggle="collapse">Collapsible</a>

<div id="demo" class="collapse">
Lorem ipsum dolor text....
</div>
*/

// tooltip
$('[data-toggle="tooltip"]').tooltip();
