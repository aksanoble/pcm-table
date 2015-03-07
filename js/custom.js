//Retrieve cells clicked from local storage if available, else create storage
var matrix = JSON.parse(localStorage.getItem('matrixKey')) || [];
      if (matrix.length === 0) {
          localStorage.setItem('matrixKey', JSON.stringify(matrix));
      }
//Click on cells retrieved from local storage
$(function() {
   $.map(matrix, function(n){
  ($("td")[n]).click();
  });
});

//Click Event Handler
$("td").click(function(e){                                    //add click event to td elements
  $(e.target).nextAll().removeClass("checked");               //remove checked for subsequent cells
  $(e.target).prevAll().addBack().addClass("checked");        //checked class upto and including target
  cellIndex = $("td").index(e.target);                        //get cell index
  matrix[Math.floor(cellIndex/5)] = cellIndex;                //array indexed mapped to row index for unique mapping
  localStorage.setItem('matrixKey', JSON.stringify(matrix));  //update local storage
});
