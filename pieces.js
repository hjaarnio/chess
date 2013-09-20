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
	Piece.call(this, "P", side);
	
	this.legalMove = function(x1, y1, x2, y2, grid) {
		var direction = (this.side * 2) - 3;
		
		if(grid.squares[y2][x2].piece == null){
			if(x1 == x2 && y1 - y2 == direction){
			//	alert("normal move")
				return true;
			} else if (y1 == (this.side - 1) * 5 + 1 && x1 == x2 && y1 - y2 == direction * 2 
							&& grid.squares[y1 - direction][x2].piece == null){
			//	alert("move two")
				return true;
			} else {
			//	alert("illegal move")
				return false;
			} //en passant goes here with the form if (x1 - x2 = +-1), y1 - y2 = direction
		} else if(grid.squares[y2][x2].piece.side != this.side && Math.abs(x1 - x2) == 1){
			return true;
		}
		else return false;
		
	}
}
Pawn.prototype = new Piece;

function Rook(side){
	Piece.call(this, "R", side);
	
	this.legalMove = function(x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(x1 != x2 && y1 != y2){ //move must be exactly horizontal or vertical
			return false;
		}
		if(x1 == x2){
			if(y1 > y2){
				for(var i = y1 - 1; i > y2; i--){
					if(grid.squares[i][x1].piece != null){
						return false;
					}
				}
			} else {
				for(var i = y1 + 1; i < y2; i++){
					if(grid.squares[i][x1].piece != null){
						return false;
					}
				}
			}
			return true;
		}
		if(y1 == y2){
			if(x1 > x2){
				for(var i = x1 - 1; i > x2; i--){
					if(grid.squares[y1][i].piece != null){
						return false;
					}
				}
			} else {
				for(var i = x1 + 1; i < x2; i++){
					if(grid.squares[y1][i].piece != null){
						return false;
					}
				}
			}
			return true;
		}
	}
}
Rook.prototype = new Piece;



function Bishop(side){
	Piece.call(this, "B", side);
	
	this.legalMove = function (x1, y1, x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(Math.abs(x1 - x2) != Math.abs(y1 - y2)){ //must be diagonal
			return false;
		}
		if(x1 > x2 && y1 > y2){
			for(var i = x1 - 1, j = y1 - 1; i > x2; i--, j--){
				if(grid.squares[j][i].piece != null){
					return false;
				}
			}
		} else if (x1 < x2 && y1 > y2){
			for(var i = x1 + 1, j = y1 - 1; i < x2; i++, j--){
				if(grid.squares[j][i].piece != null){
					return false;
				}
			}
		} else if (x1 > x2 && y1 < y2){
			for(var i = x1 - 1, j = y1 + 1; i > x2; i--, j++){
				if(grid.squares[j][i].piece != null){
					return false;
				}
			}
		} else if (x1 < x2 && y1 < y2){
			for(var i = x1 + 1, j = y1 + 1; i < x2; i++, j++){
				if(grid.squares[j][i].piece != null){
					return false;
				}
			}
		}
		return true;
	}
}
Bishop.prototype = new Piece;

function Knight(side){
	Piece.call(this, "N", side);
	
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
		alert("exit knight moveset")
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
	Piece.call(this, "K", side);
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
		this.hasMoved = true;
		this.__proto__.move(x1, y1, x2, y2, grid);
	}
}
King.prototype = new Piece;

function Queen(side){
	Piece.call(this, "Q", side);
	
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