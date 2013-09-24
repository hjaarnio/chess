function Piece(type, side){
	this.type = type;
	this.side = side;
	
	this.move = function (x1, y1, x2, y2, grid){ //moving function used by all pieces except king in special case
		//alert("piece move")
		grid.squares[y2][x2].piece = grid.squares[y1][x1].piece;
		grid.squares[y1][x1].piece = null;
	}
	
	this.legalMove = function(x1, y1, x2, y2, grid) {
		alert("piece legal move"); //we should never come here, each piece goes to own one.
		return false;
	}
}

function containsOwn(x2, y2, side, grid){
	return grid.squares[y2][x2].piece != null && grid.squares[y2][x2].piece.side == side;
}
function emptyOrOpponent(x, y, side, grid){
	return !outsideBoard(x, y, grid) && (grid.squares[y][x].piece == null || grid.squares[y][x].piece.side != side);
}

function Pawn(side){
	Piece.call(this, 0, side);
	
	//these are needed to check conditions for en passant
	this.timesMoved = 0;
	this.lastMovedOn = 0;
	
	this.moveset = function(x1, y1, grid){
		var moveset = new Array();
		
		var direction = -((this.side * 2) - 1);
		
		if(y1 == this.side * 5 + 1){
			if(grid.squares[y1 + direction][x1].piece == null && grid.squares[y1 + 2 * direction][x1].piece == null){
				moveset.push(grid.squares[y1 + 2 * direction][x1]);
			}
		}
		if(!outsideBoard(x1, y1 + direction, grid) && grid.squares[y1 + direction][x1].piece == null){
			moveset.push(grid.squares[y1 + direction][x1]);
		}
		if(!outsideBoard(x1 - 1, y1 + direction, grid) && grid.squares[y1 + direction][x1 - 1].piece != null &&
			grid.squares[y1 + direction][x1 - 1].piece.side != this.side){
				moveset.push(grid.squares[y1 + direction][x1 - 1]);
		}
		if(!outsideBoard(x1 + 1, y1 + direction, grid) && grid.squares[y1 + direction][x1 + 1].piece != null &&
			grid.squares[y1 + direction][x1 + 1].piece.side != this.side){
				moveset.push(grid.squares[y1 + direction][x1 + 1]);
		}
		
		if(y1 == 4 - this.side && x1 - 1 > 0 && grid.squares[y1][x1 - 1].piece != null &&
			grid.squares[y1][x1 - 1].piece.type == 0 && grid.squares[y1][x1 - 1].piece.timesMoved == 1 &&
			grid.squares[y1][x1 - 1].piece.lastMovedOn + 1 == grid.currentMove){
				moveset.push(grid.squares[y1 + direction][x1 - 1]);
		} else if(y1 == 4 - this.side && x1 + 1 < grid.gridWidth && grid.squares[y1][x1 + 1].piece != null &&
			grid.squares[y1][x1 + 1].piece.type == 0 && grid.squares[y1][x1 + 1].piece.timesMoved == 1 &&
			grid.squares[y1][x1 + 1].piece.lastMovedOn + 1 == grid.currentMove){
				moveset.push(grid.squares[y1 + direction][x1 + 1]);
		} 
		
		return moveset;
	}
	
	this.legalMove = function(x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	}
	
	this.move = function(x1, y1, x2, y2, grid){
		this.timesMoved++;
		this.lastMovedOn = grid.currentMove;
		
		if(x1 != x2 && y1 == 4 - this.side && grid.squares[y1][x2].piece != null &&
			grid.squares[y1][x2].piece.type == 0 && grid.squares[y1][x2].piece.timesMoved == 1){
				grid.squares[y1][x2].piece = null;
		}
		grid.squares[y2][x2].piece = grid.squares[y1][x1].piece;
		grid.squares[y1][x1].piece = null;		
	}
}
Pawn.prototype = new Piece;

function Rook(side){
	Piece.call(this, 1, side);
	
	this.moveset = function(x1, y1, grid){
		moveset = new Array();
				
		var x, y;
		
		for(x = x1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 + 1, y = y1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		return moveset;
	}
	
	this.legalMove = function(x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	}
	
	this.move = function(x1, y1, x2, y2, grid){
		this.hasMoved = true;
		this.__proto__.move(x1, y1, x2, y2, grid);
	}
}
Rook.prototype = new Piece;



function Bishop(side){
	Piece.call(this, 2, side);
	
	this.moveset = function(x1, y1, grid){
		moveset = new Array();
				
		var x, y;
		
		for(x = x1 + 1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 + 1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		return moveset;
	}
	
	this.legalMove = function (x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	}
}
Bishop.prototype = new Piece;

function Knight(side){
	Piece.call(this, 3, side);
	
	this.moveset = function(x1, y1, grid){
		moveset = new Array();
		
		if(emptyOrOpponent(x1 - 1, y1 - 2, this.side, grid)){
			moveset.push(grid.squares[y1 - 2][x1 - 1]);
		}
		if(emptyOrOpponent(x1 + 1, y1 - 2, this.side, grid)){
			moveset.push(grid.squares[y1 - 2][x1 + 1]);
		}
		if(emptyOrOpponent(x1 - 1, y1 + 2, this.side, grid)){
			moveset.push(grid.squares[y1 + 2][x1 - 1]);
		}
		if(emptyOrOpponent(x1 + 1, y1 + 2, this.side, grid)){
			moveset.push(grid.squares[y1 + 2][x1 + 1]);
		}
		if(emptyOrOpponent(x1 - 2, y1 - 1, this.side, grid)){
			moveset.push(grid.squares[y1 - 1][x1 - 2]);
		}
		if(emptyOrOpponent(x1 + 2, y1 - 1, this.side, grid)){
			moveset.push(grid.squares[y1 - 1][x1 + 2]);
		}
		if(emptyOrOpponent(x1 - 2, y1 + 1, this.side, grid)){
			moveset.push(grid.squares[y1 + 1][x1 - 2]);
		}
		if(emptyOrOpponent(x1 + 2, y1 + 1, this.side, grid)){
			moveset.push(grid.squares[y1 + 1][x1 + 2]);
		}
		
		return moveset;
	}
	
	this.legalMove = function (x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	}
}
Knight.prototype = new Piece;

function King(side){
	Piece.call(this, 5, side);
	this.hasMoved = false;
	
	this.moveset = function(x1, y1, grid){
		var moveset = new Array();
		
		for(x = x1 - 1; x <= x1 + 1; x++){
			for(y = y1 - 1; y <= y1 + 1; y++){
				if(!outsideBoard(x, y, grid) && (grid.squares[y][x].piece == null || grid.squares[y][x].piece.side != this.side)){
					moveset.push(grid.squares[y][x])
				}
			}
		}
		
		if(!this.hasMoved && grid.currentMove % 2 != this.side &&
			grid.squares[y1][0].piece != null && grid.squares[y1][0].piece.type == 1 && !grid.squares[y1][0].piece.hasMoved &&
			grid.squares[y1][1].piece == null && grid.squares[y1][2].piece == null && grid.squares[y1][3].piece == null &&
			!isSquareInCheck(2, y1, this.side, grid) && !isSquareInCheck(3, y1, this.side, grid) && !isSquareInCheck(4, y1, this.side, grid)){
				moveset.push(grid.squares[y1][2]);
		} else if(!this.hasMoved && grid.currentMove % 2 != this.side &&
			grid.squares[y1][7].piece != null && grid.squares[y1][7].piece.type == 1 && !grid.squares[y1][7].piece.hasMoved &&
			grid.squares[y1][6].piece == null && grid.squares[y1][5].piece == null &&
			!isSquareInCheck(6, y1, this.side, grid) && !isSquareInCheck(5, y1, this.side, grid) && !isSquareInCheck(4, y1, this.side, grid)){
				moveset.push(grid.squares[y1][6]);
		}
		return moveset;
	}
	
	this.legalMove = function (x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
		
	} 
	
	this.move = function(x1, y1, x2, y2, grid){
		if(!this.hasMoved && x2 == 2 && y1 == y2){ // move won't get called unless legalMove with stricter rules has been passed
			grid.squares[y2][3].piece = grid.squares[y2][0].piece;
			grid.squares[y2][0].piece = null;
		} else if(!this.hasMoved && x2 == 6 && y1 == y2){
			grid.squares[y2][5].piece = grid.squares[y2][7].piece;
			grid.squares[y2][7].piece = null;
		}
		this.hasMoved = true;
		
		grid.squares[y2][x2].piece = grid.squares[y1][x1].piece;
		grid.squares[y1][x1].piece = null;
	}
}
King.prototype = new Piece;

function Queen(side){
	Piece.call(this, 4, side);
	
	this.moveset = function(x1, y1, grid){
		moveset = new Array();
				
		var x, y;
		//between each check if the piece in way is enemy, in which case allow capturing it
		
		//first down, up, right, left
		for(x = x1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 + 1, y = y1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		//then diagonal, lower right, upper right, lower left, upper left
		
		for(x = x1 + 1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 + 1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1 + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = x1 - 1, y = y1 - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		
		return moveset;
	}
	
	this.legalMove = function (x1, y1, x2, y2, grid) 
	{
		if (containsOwn(x2, y2, this.side, grid)) {
			return false;
		}
		
		if(this.moveset(x1, y1, grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	}

}
Queen.prototype = new Piece;