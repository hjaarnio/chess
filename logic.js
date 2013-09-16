var grid;
var whoseMove = 1;

function init(){
	grid = new Grid();
}


function Grid(){
	
	this.gridWidth = 8;
	this.gridHeight = 8;

	this.squares = new Array(this.gridWidth);
	
	for(i = 0; i < this.gridWidth; i++){
		this.squares[i] = new Array(this.gridHeight);
	}
	
	this.squares[0] = [new Rook(1), new Knight(1), new Bishop(1), new Queen(1), new King(1), new Bishop(1), new Knight(1), new Rook(1)];
	this.squares[1] = [new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1)];
	
	this.squares[7] = [new Rook(2), new Knight(2), new Bishop(2), new Queen(2), new King(2), new Bishop(2), new Knight(2), new Rook(2)];
	this.squares[6] = [new Pawn(2), new Pawn(2), new Pawn(2), new Pawn(2), new Pawn(2), new Pawn(2), new Pawn(2), new Pawn(2)];
}

function move(x1, y1, x2, y2){
	if (checkValidMove(x1, y1, x2, y2)){
		if(grid.squares[y1][x1].legalMove(x1, y1, x2, y2)){
			grid.squares[y1][x1].move(x1, y1, x2, y2);
			if(whoseMove == 1){
				whoseMove = 2;
			} else whoseMove = 1;
			return true;
		} else {
			alert("piece denies");
		}
	} 
	
	return false;
}

function checkValidMove(x1, y1, x2, y2){
	if(x1 < 0 || x1 >= grid.gridWidth || y1 < 0 || y1 >= grid.gridHeight || 
	   x2 < 0 || x2 >= grid.gridWidth || y2 < 0 || y2 >= grid.gridHeight ){
		return false;
	}
	
	if(x1 == x2 && y1 == y2){
		return false;
	}
	
	if(grid.squares[y1][x1] != null && grid.squares[y1][x1].side == whoseMove){
		return true;
	} else {
		alert("wrong turn (or no piece)")
		return false;
	}
	
}
