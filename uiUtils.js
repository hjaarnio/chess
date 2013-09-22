
var popup = document.getElementById("popup");
function warning(message){
	popup.textContent = message;
	if (warning.timer) 
        window.clearTimeout(warning.timer);
    warning.timer = setTimeout(function(){
        popup.textContent = "";
    }, 1000);
}
window.warning = warning;

var letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

function convertNotationToMove(input){
	if(input.indexOf("-") == -1){
		warning("Improper input");
		return;
	}
	var coordinates = input.split("-");
	var x1 = letters.indexOf(coordinates[0].charAt(0));
	var y1 = 8 - parseInt(coordinates[0].charAt(1));
	
	var x2 = letters.indexOf(coordinates[1].charAt(0));
	var y2 = 8 - parseInt(coordinates[1].charAt(1));
	
	return [x1, y1, x2, y2];
}

function convertMoveToNotation(x1, y1, x2, y2){
	return letters[x1] + (8 - y1) + "-" + letters[x2] + (8 - y2);
}
