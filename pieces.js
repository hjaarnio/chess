function Piece(type, side){
	this.type = type;
	this.side = side;
	
	this.move = function (x1, y1, x2, y2){ //moving function used by all pieces except king in special case
		//alert("piece move")
		grid.squares[y2][x2] = grid.squares[y1][x1];
		grid.squares[y1][x1] = null;
	}
	
	this.legalMove = function(x1, y1, x2, y2) {
		alert("piece legal move"); //we should never come here, each piece goes to own one.
		return false;
	}
}

function containsOwn(x2, y2, side){
	return grid.squares[y2][x2] != null && grid.squares[y2][x2].side == side;
}

function Pawn(side){
	Piece.call(this, "P", side);
	
	this.legalMove = function(x1, y1, x2, y2) {
		var direction = (this.side * 2) - 3;
		
		if(grid.squares[y2][x2] == null){
			if(x1 == x2 && y1 - y2 == direction){
			//	alert("normal move")
				return true;
			} else if (y1 == (this.side - 1) * 5 + 1 && x1 == x2 && y1 - y2 == direction * 2 
							&& grid.squares[y1 - direction][x2] == null){
			//	alert("move two")
				return true;
			} else {
			//	alert("illegal move")
				return false;
			} //en passant goes here with the form if (x1 - x2 = +-1), y1 - y2 = direction
		} else if(grid.squares[y2][x2].side != this.side && Math.abs(x1 - x2) == 1){
			return true;
		}
		else return false;
		
	}
}
Pawn.prototype = new Piece;

function Rook(side){
	Piece.call(this, "R", side);
	
	this.legalMove = function(x1, y1, x2, y2) {
		if(containsOwn(x2, y2, this.side)){
			return false;
		}
		if(x1 != x2 && y1 != y2){ //move must be exactly horizontal or vertical
			return false;
		}
		if(x1 == x2){
			if(y1 > y2){
				for(var i = y1 - 1; i > y2; i--){
					if(grid.squares[i][x1] != null){
						return false;
					}
				}
			} else {
				for(var i = y1 + 1; i < y2; i++){
					if(grid.squares[i][x1] != null){
						return false;
					}
				}
			}
			return true;
		}
		if(y1 == y2){
			if(x1 > x2){
				for(var i = x1 - 1; i > x2; i--){
					if(grid.squares[y1][i] != null){
						return false;
					}
				}
			} else {
				for(var i = x1 + 1; i < x2; i++){
					if(grid.squares[y1][i] != null){
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
	
	this.legalMove = function (x1, y1, x2, y2) {
		if(containsOwn(x2, y2, this.side)){
			return false;
		}
		if(Math.abs(x1 - x2) != Math.abs(y1 - y2)){ //must be diagonal
			return false;
		}
		if(x1 > x2 && y1 > y2){
			for(var i = x1 - 1, j = y1 - 1; i > x2; i--, j--){
				if(grid.squares[j][i] != null){
					return false;
				}
			}
		} else if (x1 < x2 && y1 > y2){
			for(var i = x1 + 1, j = y1 - 1; i < x2; i++, j--){
				if(grid.squares[j][i] != null){
					return false;
				}
			}
		} else if (x1 > x2 && y1 < y2){
			for(var i = x1 - 1, j = y1 + 1; i > x2; i--, j++){
				if(grid.squares[j][i] != null){
					return false;
				}
			}
		} else if (x1 < x2 && y1 < y2){
			for(var i = x1 + 1, j = y1 + 1; i < x2; i++, j++){
				if(grid.squares[j][i] != null){
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
	
	this.legalMove = function (x1, y1, x2, y2) {
		if(containsOwn(x2, y2, this.side)){
			return false;
		}
		if((Math.abs(x1-x2) == 1 && Math.abs(y1-y2) == 2) ||(Math.abs(x1-x2) == 2 && Math.abs(y1-y2) == 1)){
			return true;
		}
		return false;
	}
}
Knight.prototype = new Piece;

function King(side){
	Piece.call(this, "K", side);
	
	this.legalMove = function (x1, y1, x2, y2) {
		return false;
	}
}
King.prototype = new Piece;

function Queen(side){
	Piece.call(this, "Q", side);
	
	this.legalMove = function (x1, y1, x2, y2) 
	{
		if (containsOwn(x2, y2, this.side)) {
			return false;
		}
		
		if (x1 == x2 || y1 == y2) { //move like rook
			if (x1 == x2) {
				if (y1 > y2) {
					for (var i = y1 - 1; i > y2; i--) {
						if (grid.squares[i][x1] != null) {
							return false;
						}
					}
				} else {
					for (var i = y1 + 1; i < y2; i++) {
						if (grid.squares[i][x1] != null) {
							return false;
						}
					}
				}
				return true;
			}
			if (y1 == y2) {
				if (x1 > x2) {
					for (var i = x1 - 1; i > x2; i--) {
						if (grid.squares[y1][i] != null) {
							return false;
						}
					}
				} else {
					for (var i = x1 + 1; i < x2; i++) {
						if (grid.squares[y1][i] != null) {
							return false;
						}
					}
				}
				return true;
			}
		
		} else if (Math.abs(x1 - x2) == Math.abs(y1 - y2)) { //move like bishop
			alert("move like bishop")
			if (x1 > x2 && y1 > y2) {
				for (var i = x1 - 1, j = y1 - 1; i > x2; i--, j--) {
					if (grid.squares[j][i] != null) {
						return false;
					}
				}
			} else if (x1 < x2 && y1 > y2) {
				for (var i = x1 + 1, j = y1 - 1; i < x2; i++, j--) {
					if (grid.squares[j][i] != null) {
						return false;
					}
				}
			} else if (x1 > x2 && y1 < y2) {
				for (var i = x1 - 1, j = y1 + 1; i > x2; i--, j++) {
					if (grid.squares[j][i] != null) {
						return false;
					}
				}
			} else if (x1 < x2 && y1 < y2) {
				for (var i = x1 + 1, j = y1 + 1; i < x2; i++, j++) {
					if (grid.squares[j][i] != null) {
						return false;
					}
				}
			}
			return true;
		}


		return false;
	}

}
Queen.prototype = new Piece;