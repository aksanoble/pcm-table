Parse.initialize("glmuorycIXCYmPVdNggT14huclqEwrWSkPVNnnFC", "DQI2SNoFrREjmhopO9Au0MCaKwDDrEiaUfWzIs36");

$("td").removeClass("checked");

var clickCells = function(matrix) {
   $.map(matrix, function(n){
  ($("td")[n]).click();
  });
};

var currentUser = Parse.User.current();
if (currentUser) {
  $(".login").toggleClass("hidden");
  $(".pcm").toggleClass("hidden");
  var matrix = Parse.User.current().get("matrixKey");
  clickCells(matrix);
}

$("#signup").click(function(){
  $("td").removeClass("checked");
  var username = $("#inputEmail1").val();
  var password = $("#inputPassword1").val();
  var user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("matrixKey", [0,0,0]);
  user.signUp(null, {
    success: function(user) {
      $(".login").toggleClass("hidden");
      $(".pcm").toggleClass("hidden");
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      alert("Error: " + error.code + " " + error.message);
    }
  });
});

$("#login").click(function(){
  $("td").removeClass("checked");
  var username = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  Parse.User.logIn(username, password, {
  success: function(user) {
    $(".login").toggleClass("hidden");
    $(".pcm").toggleClass("hidden");
    var matrix = Parse.User.current().get("matrixKey");
    clickCells(matrix);
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
    alert("Error: " + error.code + " " + error.message);
  }
  });
});

$("#logout").click(function(event){
  Parse.User.logOut();
  $(".login").toggleClass("hidden");
  $(".pcm").toggleClass("hidden");
});

//Click Event Handler
$("td").click(function(e){                                 //add click event to td elements
  $(e.target).nextAll().removeClass("checked");               //remove checked for subsequent cells
  $(e.target).prevAll().addBack().addClass("checked");
  var matrix = Parse.User.current().get("matrixKey");
  var user = Parse.User.current();
  var cellIndex = $("td").index(e.target);                        //get cell index
  matrix[Math.floor(cellIndex/5)] = cellIndex;                //array indexed mapped to row index for unique mapping
  user.set("matrixKey", matrix);
  user.save();
  console.log(user.get("matrixKey"));
});
