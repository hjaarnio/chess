var squareWidth = document.getElementById("dummy").clientWidth / 8,
	squareHeight = document.getElementById("dummy").clientHeight;
	
var selected = null;

//var pieces = [["p", "r", "b", "n", "q", "k"] , ["P", "R", "B", "N", "Q", "K"]];
var pieces = [["&#9823", "&#9820", "&#9821", "&#9822", "&#9819", "&#9818"] , ["&#9817", "&#9814", "&#9815", "&#9816", "&#9813", "&#9812"]];

function initUI(){
	
}

function draw(grid){
	var output = "";
	for (var i = 0; i < grid.gridWidth; i++){
		for (var j = 0; j < grid.gridHeight; j++){
			if (grid.squares[i][j].piece != null){
				if(selected != null && selected.y == i && selected.x == j){
					output += "<FONT style='BACKGROUND-COLOR: yellow'>";
				}
				output += pieces[grid.squares[i][j].piece.side][grid.squares[i][j].piece.type];
				if(selected != null && selected.y == i && selected.x == j){
					output += "</FONT>";
				}
				
			} else {
				output += ".";
			}
			output += " ";
		}
		output += "<br>";
	}
	document.getElementById("ui").innerHTML = output;
}

function clicked(){
	alert("clicked begin")
	var x1 = parseInt(document.getElementById("from1").value);
	var y1 = parseInt(document.getElementById("from2").value);
	var x2 = parseInt(document.getElementById("to1").value);
	var y2 = parseInt(document.getElementById("to2").value);
	
	alert(x1+ " " + x2 + " " + y1 + " " + y2)
	move(x1, y1, x2, y2, primaryGrid);
	draw(primaryGrid);
	
}

function mouseClick(event){
	var x = calculateMouse("x", event.clientX - document.getElementById("ui").offsetLeft);
	var y = calculateMouse("y", event.clientY - document.getElementById("ui").offsetTop);
	
	//alert(x + " " + y);
	
	if(selected == null && primaryGrid.squares[y][x].piece != null){
		selected = {x: x , y: y};
	} else {
		move(selected.x, selected.y, x, y, primaryGrid);
		selected = null;
	}
	draw(primaryGrid);
}

function calculateMouse(axis, x) {
	if(axis == "x")
		return parseInt(x / squareWidth);
	else if(axis == "y")
		return parseInt(x / squareHeight);
}