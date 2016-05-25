

// tooltip
$('[data-toggle="tooltip"]').tooltip();

 // tag切換
 var tagClass = ["tag-success","tag-info","tag-warning","tag-danger","tag-primary"];

 $(".tag").click(function(){
   var tag_class = $(this).attr("class").replace("tag ", "");
   for(i = 0; i < tagClass.length; i++){
     if(tag_class.indexOf(tagClass[i]) !== -1){
       $(".folder>.folder-content").removeClass("folder-content-success folder-content-info folder-content-warning folder-content-danger folder-content-primary");
       $(".folder>.folder-content").addClass(tagClass[i].replace("tag", "folder-content"));
     }
   }
 });
