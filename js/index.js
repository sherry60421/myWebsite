
var tagOrder = ['tag-primary', 'tag-success', 'tag-warning', 'tag-danger'];
var isOpenMenu = false;// for mobile
// 抓現有的category建立folder tag(待加文章!!!)
$.ajax({
  url: "backstage/selectMenu.php",
  dataType: "json",
  success: function(data, textStatus, jqXHR){
    $div = $($("#novel").find(".folder")[0]);

    var categoryArr = getCategoryData(data);
    if(categoryArr.length == 0){
      return;
    }
    $("<div class='mobile-bar tag-primary'><span class='glyphicon glyphicon-menu-right'></span></div>").appendTo($div);
    $("<div class='folder-content folder-content-primary'></div>").appendTo($div);
    $("<div class='tags'></div>").appendTo($div);
    for(i=0; i<categoryArr.length; i++){
      $tags = $($div.find('.tags')[0]);
      var $newTag = $("<div class='tag'></div>").addClass(tagOrder[i%5]);
      $newTag.append('<a data-cateNo="' + categoryArr[i].categoryNo + '">' + categoryArr[i].categoryDesc + '</a>');
      $newTag.appendTo($tags);
    }
    //排序
    data = sortData(data, categoryArr);
    //先放第一個分類
    addMenu(data, categoryArr[0].categoryNo);
    $(".tag").click(function(){
      //內容調整
      $(".folder>.folder-content").html("");
      var category = $($(this).find("a[data-cateNo]")[0]).attr("data-cateNo");
      addMenu(data, Number(category));
      //背景樣式調整
      var tag_class = $(this).attr("class").replace("tag ", "");
      for(i = 0; i < tagOrder.length; i++){
        if(tag_class.indexOf(tagOrder[i]) !== -1){
          $(".folder>.folder-content").removeClass("folder-content-success folder-content-warning folder-content-danger folder-content-primary");
          $(".folder>.folder-content").addClass(tagOrder[i].replace("tag", "folder-content"));
          $(".folder>.mobile-bar").removeClass("tag-primary tag-success tag-warning tag-danger");
          $(".folder>.mobile-bar").addClass(tagOrder[i]);
        }
      }
    });
    //mobile-bar
    $(".mobile-bar").click(function(){
      if($(".folder > .mobile-bar").is(":hidden")){
        return;
      }
      isOpenMenu = !isOpenMenu;
      $($(".folder > .mobile-bar").find("span")[0]).removeClass("glyphicon-menu-right glyphicon-menu-left");
      // 是要開啟
      if(isOpenMenu){
        $(".folder > .folder-content").animate({"left": "0%"}, 500);
        $(".folder > .mobile-bar").animate({"opacity" : 1, "left": "93%"}, 500);
        $(".folder .tags").animate({"left": "0%"}, 500);
        $($(".folder > .mobile-bar").find("span")[0]).addClass("glyphicon-menu-left");
      }
      // 還是關上呢
      else{
        $(".folder > .folder-content").animate({"left": "-93%"}, 500);
        $(".folder > .mobile-bar").animate({"opacity" : 0.5, "left": "0%"}, 500);
        $(".folder .tags").animate({"left": "-93%"}, 500);
        $($(".folder > .mobile-bar").find("span")[0]).addClass("glyphicon-menu-right");
      }
    });
  },
  fail: function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  }
});

//取得分類
function getCategoryData(data){
  var categoryArr = [];
  var tmp_category = "";
  for(i=0;i<data.length;i++){
    if(tmp_category !== data[i].category){
      categoryArr.push({"categoryNo":data[i].category,"categoryDesc":data[i].categoryDesc});
    }
    tmp_category = data[i].category;
  }
  return categoryArr;
}

//排序:同分類下,每一篇文章依發布日期近=>遠
function sortData(data, categoryArr){
  var sortedData = [];
  for(i=0; i<categoryArr.length; i++){
    var categoryNo = categoryArr[i].categoryNo;
    var categoryArticle = [];
    for(j=0; j<data.length; j++){
      if(data[j].category === categoryNo){
        categoryArticle.push(data[j]);
      }
    }
    //排序,先按發布日期
    categoryArticle.sort(function(a, b){
      return (b.publishDate).localeCompare(a.publishDate) === 0 ?
      a.subNo-b.subNo : (b.publishDate).localeCompare(a.publishDate);
    });
    sortedData = sortedData.concat(categoryArticle);
  }
  return sortedData;
}

function addMenu(data, cateNo){
  //先匯整相同文章
  var tmp_article_no = 0;
  var articles = []; // [ [{},{}], [{}], [{}], ...]
  for(i=0;i<data.length;i++){
    if(data[i].category !== cateNo)
      continue;
    if(tmp_article_no !== data[i].no){
      var series_article = [];
      series_article.push(data[i]);
      articles.push(series_article);
    }
    else{
      articles[articles.length-1].push(data[i]);
    }
    tmp_article_no = data[i].no;
  }
  for(i=0; i<articles.length; i++){
    $newPara = $("<p/>");
    var articles_no = articles[i][0].no;
    //多篇
    if(articles[i].length > 1){
      $newPara.append(tagsFormatter(articles[i][0].tags) + "<br/>");
      var $mainTitle = $("<span/>").text(articles[i][0].mainTitleMenu).addClass("mainTitle");
      $newPara.append($mainTitle);
      $newPara.append("<br/>");
      for(j=0; j<articles[i].length; j++){
        var isNotEnd = articles[i][j].isEnd === 1 ? "(完)" : "(未完)";
        var thisTitleText = articles[i][j].subTitleMenu
                    + (j === articles[i].length-1 ? isNotEnd : "");
        var $subTitle = $("<a/>").attr("data-no", articles_no).attr("data-subno", articles[i][j].subNo)
        .text(thisTitleText).addClass("subTitle");
        $newPara.append($subTitle);
        $newPara.append(" ");
      }
    }
    //單篇
    else{
      $newPara.append(tagsFormatter(articles[i][0].tags)+"<br/>");
      var $mainTitle = $("<a/>").attr("data-no", articles_no).attr("data-subno", articles[i][0].subNo)
      .text(articles[i][0].mainTitleMenu).addClass("mainTitle");
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
      url: "backstage/querySingleArticle_front.php",
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

// tooltip
$('[data-toggle="tooltip"]').tooltip();
