/**
  mazeValidate.js
  Validates Maze Generator input data for Portfolio

  @author Neil Gorham
  @version 1.0 07/24/2014
*/

/**
  This function returns an element.
  @return The element id
*/
var $ = function(id){
	return document.getElementById(id);
}

//Global Variables
var mazeSize = $("mazeSize");
var mazeSizeError = $("mazeSizeError");
var submit = $("submit");

//Onfocus fns
mazeSize.onfocus = function(){
	mazeSize.style.borderWidth = "1px";
	mazeSize.style.borderColor = "#CCC";
}

//Onblur fns
mazeSize.onblur = function(){
	var intMazeSize = parseInt(mazeSize.value);
	if(isNaN(intMazeSize)){
		mazeSizeError.style.color = "#F00";
		mazeSize.style.borderColor = "#F00";
		mazeSize.style.borderWidth = "2px";
		submit.style.display = "none";
	} else {
		if(intMazeSize < 3 || intMazeSize > 20){
			mazeSizeError.style.color = "#F00";
			mazeSize.style.borderColor = "#F00";
			mazeSize.style.borderWidth = "2px";
			submit.style.display = "none";
		} else {
			submit.style.display = "inline";
			mazeSizeError.style.color = "#000";
			mazeSize.style.borderWidth = "1px";
		}
	}
}

//Onkeyup fns
mazeSize.onkeyup = function(){
	var intMazeSize = parseInt(mazeSize.value);
	if(isNaN(intMazeSize)){
		mazeSizeError.style.color = "#F00";
		mazeSize.style.borderColor = "#F00";
		mazeSize.style.borderWidth = "2px";
		submit.style.display = "none";
	} else {
		if(intMazeSize < 3 || intMazeSize > 20){
			mazeSizeError.style.color = "#F00";
			mazeSize.style.borderColor = "#F00";
			mazeSize.style.borderWidth = "2px";
			submit.style.display = "none";
		} else {
			submit.style.display = "inline";
			mazeSizeError.style.color = "#000";
			mazeSize.style.borderWidth = "1px";
			mazeSize.style.borderColor = "#CCC";
		}
	}
}