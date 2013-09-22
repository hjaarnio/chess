var squareWidth = 64;
	squareHeight = 64;
	
var selected = null;

var pieceSrc = 'assets/pieces2.png';
var pieceWidth = 64,
	pieceHeight = 128;
var pieceImg;

var bX = 32, bY = 64; //border around the board

var c1, c2, c3, ctx1, ctx2, ctx3;

function initUI(){
	c1 = document.getElementById("uiBoard");
	ctx1 = c1.getContext("2d");
	c1.width = 8 * squareWidth + 2 * bX;
	c1.height = 8 * squareHeight + 2 * bY;
	
	c2 = document.getElementById("uiSelection");
	ctx2 = c2.getContext("2d");
	c2.width = 8 * squareWidth + 2 * bX;
	c2.height = 8 * squareHeight + 2 * bY;
	
	c3 = document.getElementById("uiPieces");
	ctx3 = c3.getContext("2d");
	c3.width = 8 * squareWidth + 2 * bX;
	c3.height = 8 * squareHeight + 2 * bY;
	
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
	 		ctx1.fillRect(i * squareWidth + bX, j * squareHeight + bY, squareWidth, squareHeight);
	 	}
	 }
	 ctx1.strokeRect(bX, bY, grid.gridWidth * squareWidth, grid.gridHeight * squareHeight);
}

function drawPieces(grid){
	ctx3.clearRect(0, 0, c3.width, c3.height);
	for(i = 0; i < grid.gridWidth; i++){
	 	for(j = 0; j < grid.gridHeight; j++){
	 		if(grid.squares[j][i].piece != null){
	 			ctx3.drawImage(pieceImg,
	 				grid.squares[j][i].piece.type * pieceWidth, grid.squares[j][i].piece.side * pieceHeight, pieceWidth, pieceHeight,
	 				i * squareWidth + bX, j * squareHeight + (squareHeight - pieceHeight) + bY, squareWidth, pieceHeight);
	 		}
	 	}
	}
}

function drawSelected(grid){
	ctx2.clearRect(0, 0, c2.width, c2.height);
	if(selected != null){
		var gradient = ctx2.createRadialGradient(
									(selected.x + 0.5) * squareWidth + bX, (selected.y  + 0.5) * squareHeight + bY, squareWidth / 4,
									(selected.x + 0.5) * squareWidth + bX, (selected.y  + 0.5) * squareHeight + bY, squareWidth / 2);
		gradient.addColorStop(0, "yellow");
		gradient.addColorStop(1, "transparent");
		ctx2.fillStyle = gradient;
		ctx2.fillRect(selected.x * squareWidth + bX, selected.y * squareHeight + bY, squareWidth, squareHeight);
	}
	
}

function mouseClick(event){
	var x = calculateMouse("x", event.clientX - document.getElementById("ui").offsetLeft - bX);
	var y = calculateMouse("y", event.clientY - document.getElementById("ui").offsetTop - bY);
	
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