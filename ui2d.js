var squareWidth = 64;
	squareHeight = 64;
	
var selected = null;

var pieceSrc = 'assets/pieces.png';
var pieceWidth = 64,
	pieceHeight = 64;
var pieceImg;

var c1, c2, c3, ctx1, ctx2, ctx3;

function initUI(){
	c1 = document.getElementById("uiBoard");
	ctx1 = c1.getContext("2d");
	c1.width = 8 * squareWidth;
	c1.height = 8 * squareHeight;
	
	c2 = document.getElementById("uiSelection");
	ctx2 = c2.getContext("2d");
	c2.width = 8 * squareWidth;
	c2.height = 8 * squareHeight;
	
	c3 = document.getElementById("uiPieces");
	ctx3 = c3.getContext("2d");
	c3.width = 8 * squareWidth;
	c3.height = 8 * squareHeight;
	
	pieceImg = new Image();
	pieceImg.onload = function(){
		draw(primaryGrid);
	}
	pieceImg.src = pieceSrc;
}

function draw(grid){
	drawBoard(grid);
	drawSelected(grid);
	drawPieces(grid);
}

function drawBoard(grid){
	 for(i = 0; i < grid.gridWidth; i++){
	 	for(j = 0; j < grid.gridHeight; j++){
	 		if((i +j ) % 2 == 1){
	 			ctx1.fillStyle = "black";
	 		} else {
	 			ctx1.fillStyle = "white";
	 		}
	 		ctx1.fillRect(i * squareWidth, j * squareHeight, squareWidth, squareHeight);
	 	}
	 }
}

function drawPieces(grid){
	ctx3.clearRect(0, 0, c3.width, c3.height);
	for(i = 0; i < grid.gridWidth; i++){
	 	for(j = 0; j < grid.gridHeight; j++){
	 		if(grid.squares[j][i].piece != null){
	 			ctx3.drawImage(pieceImg,
	 				grid.squares[j][i].piece.type * pieceWidth, grid.squares[j][i].piece.side * pieceHeight, pieceWidth, pieceHeight,
	 				i * squareWidth, j * squareHeight, squareWidth, squareHeight);
	 		}
	 	}
	}
}

function drawSelected(grid){
	ctx2.clearRect(0, 0, c2.width, c2.height);
	if(selected != null){
		var gradient = ctx2.createRadialGradient((selected.x + 0.5) * squareWidth, (selected.y  + 0.5) * squareHeight, squareWidth / 4,
									(selected.x + 0.5) * squareWidth, (selected.y  + 0.5) * squareHeight, squareWidth / 2);
		gradient.addColorStop(0, "yellow");
		gradient.addColorStop(1, "transparent");
		ctx2.fillStyle = gradient;
		ctx2.fillRect(selected.x * squareWidth, selected.y * squareHeight, squareWidth, squareHeight);
	}
	
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
		drawPieces(primaryGrid);
	}
	drawSelected(primaryGrid);
}

function calculateMouse(axis, x) {
	if(axis == "x")
		return parseInt(x / squareWidth);
	else if(axis == "y")
		return parseInt(x / squareHeight);
}