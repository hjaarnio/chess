var primaryGrid;
var whoseMove = 2;

function init(){
	primaryGrid = new Grid();
}


function Grid(){
	
	this.gridWidth = 8;
	this.gridHeight = 8;

	this.squares = new Array(this.gridWidth);
	
	for(i = 0; i < this.gridWidth; i++){
		this.squares[i] = new Array(this.gridHeight);
		for(j = 0; j < this.gridHeight; j++){
			this.squares[i][j] = {};
		}
	}
	
	this.squares[0] = kingRow(1);
	this.squares[1] = pawnRow(1);
	this.squares[6] = pawnRow(2);
	this.squares[7] = kingRow(2);
	
	
	this.copy = function(){ //returns a copy of the grid
		var result = new Grid();
		for(i = 0; i < this.gridWidth; i++){
			for(j = 0; j < this.gridHeight; j++){
				if(this.squares[i][j].piece == null){
					result.squares[i][j].piece = null;
				}else switch(this.squares[i][j].type){					
					case "P": result.squares[i][j].piece = new Pawn(this.squares[i][j].side); break;
					case "R": result.squares[i][j].piece = new Rook(this.squares[i][j].side); break;
					case "N": result.squares[i][j].piece = new Knight(this.squares[i][j].side); break;
					case "B": result.squares[i][j].piece = new Bishop(this.squares[i][j].side); break;
					case "Q": result.squares[i][j].piece = new Queen(this.squares[i][j].side); break;
					case "K": result.squares[i][j].piece = new King(this.squares[i][j].side); break;
				}
			}
		}
		return result;
	}
}

function kingRow(side){
	var row = [{},{},{},{},{},{},{},{}];
	row[0].piece = new Rook(side);
	row[1].piece = new Knight(side);
	row[2].piece = new Bishop(side);
	row[3].piece = new King(side);
	row[4].piece = new Queen(side);
	row[5].piece = new Bishop(side);
	row[6].piece = new Knight(side);
	row[7].piece = new Rook(side);
	
	return row;
}

function pawnRow(side){
	var row = [{},{},{},{},{},{},{},{}];
	for(i = 0; i < row.length ; i++){
		row[i].piece = new Pawn(side);
	}
	return row;
}

function move(x1, y1, x2, y2, grid){
	if (checkValidMove(x1, y1, x2, y2, grid)){
		if(grid.squares[y1][x1].piece.legalMove(x1, y1, x2, y2, grid)){
			grid.squares[y1][x1].piece.move(x1, y1, x2, y2, grid);
			if(whoseMove == 1){
				whoseMove = 2;
			} else whoseMove = 1;
			return true;
		} else {
			
		}
	} 
	
	return false;
}

function checkValidMove(x1, y1, x2, y2, grid){
	if(outsideBoard(x1, y1, grid) || outsideBoard(x2, y2, grid)){
		return false;
	}
	
	if(x1 == x2 && y1 == y2){
		return false;
	}
	
	if(grid.squares[y1][x1].piece != null && grid.squares[y1][x1].piece.side == whoseMove){
		return true;
	} else {
		alert("wrong turn")
		return false;
	}	
}

function outsideBoard(x, y, grid){
	return (x < 0 || x >= grid.gridWidth || y < 0 || y >= grid.gridHeight);
}
