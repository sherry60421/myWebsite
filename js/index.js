

 // tag切換
 var tagClass = ["tag-success", "tag-info", "tag-warning", "tag-danger"];

 $(".tag").click(function(){
   var tag_class = $(this).attr("class").replace("tag ", "");
   for(i = 0; i < tagClass.length; i++){
     if(tag_class.indexOf(tagClass[i]) !== -1){
       $("#folder>.content").removeClass("content-success content-info content-warning content-danger");
       $("#folder>.content").addClass(tagClass[i].replace("tag", "content"));
     }
   }
 });
