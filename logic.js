var primaryGrid;
var whoseMove = 1;

function init(){
	primaryGrid = new Grid();
}


function Grid(){
	
	this.gridWidth = 8;
	this.gridHeight = 8;
	
	//needed to check en passant but might prove useful later too
	this.currentMove = 0;

	this.squares = new Array(this.gridWidth);
	
	for(i = 0; i < this.gridWidth; i++){
		this.squares[i] = new Array(this.gridHeight);
		for(j = 0; j < this.gridHeight; j++){
			this.squares[i][j] = {};
		}
	}
	
	this.squares[0] = kingRow(0);
	this.squares[1] = pawnRow(0);
	this.squares[6] = pawnRow(1);
	this.squares[7] = kingRow(1);
	
	
	this.copy = function(){ //returns a copy of the grid
		var result = new Grid();
		for(i = 0; i < this.gridWidth; i++){
			for(j = 0; j < this.gridHeight; j++){
				if(this.squares[i][j].piece == null){
					result.squares[i][j].piece = null;
				}else switch(this.squares[i][j].piece.type){
					case "P": result.squares[i][j].piece = new Pawn(this.squares[i][j].piece.side); break;
					case "R": result.squares[i][j].piece = new Rook(this.squares[i][j].piece.side); break;
					case "N": result.squares[i][j].piece = new Knight(this.squares[i][j].piece.side); break;
					case "B": result.squares[i][j].piece = new Bishop(this.squares[i][j].piece.side); break;
					case "Q": result.squares[i][j].piece = new Queen(this.squares[i][j].piece.side); break;
					case "K": result.squares[i][j].piece = new King(this.squares[i][j].piece.side); break;
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
	row[3].piece = new Queen(side);
	row[4].piece = new King(side);
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
			var gridCopy = grid.copy();
			gridCopy.squares[y1][x1].piece.move(x1, y1, x2, y2, gridCopy);
			if(!isKingInCheck(whoseMove, gridCopy)){
				grid.squares[y1][x1].piece.move(x1, y1, x2, y2, grid);
				checkPawns(whoseMove, grid);
				if(whoseMove == 1){
					whoseMove = 0;
				} else whoseMove = 1;
				if(isKingInCheck(whoseMove, grid)){
					alert("check")
				}
				grid.currentMove++;
				return true;
			}
			
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

function checkPawns(side, grid){
	for(i = 0; i < grid.gridWidth; i++){
		if(grid.squares[-(side - 1) * 7][i].piece != null && grid.squares[-(side - 1) * 7][i].piece.type == "P"){
			alert("found pawn")
			grid.squares[-(side - 1) * 7][i].piece = new Queen(side);
		}
	}
}
