$("td").click(function(e){
  $(e.target).nextAll().removeClass("checked")
  $(e.target).prevAll().addBack().addClass("checked");
});
