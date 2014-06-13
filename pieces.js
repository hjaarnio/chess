function Piece(type, side, x, y){
	this.type = type;
	this.side = side;
	this.x = x;
	this.y = y;
	
	this.move = function (x2, y2, grid){ //moving function used by all pieces except king, rook, and pawn (which have to keep track of stuff)
		if(grid.squares[y2][x2].piece != null){
			removePiece(grid, x2, y2);
		}
		grid.squares[y2][x2].piece = this;
		grid.squares[this.y][this.x].piece = null;
		this.x = x2;
		this.y = y2;
	};
	
	this.legalMove = function(x2, y2, grid) {
		if(containsOwn(x2, y2, this.side, grid)){
			return false;
		}
		if(this.moveset(grid).lastIndexOf(grid.squares[y2][x2]) != -1){
			return true;
		} else return false;
	};
}

function containsOwn(x2, y2, side, grid){
	return grid.squares[y2][x2].piece != null && grid.squares[y2][x2].piece.side == side;
}
function emptyOrOpponent(x, y, side, grid){
	return !outsideBoard(x, y, grid) && (grid.squares[y][x].piece == null || grid.squares[y][x].piece.side != side);
}

function Pawn(side, x, y){
	Piece.call(this, 0, side, x, y);
	
	//these are needed to check conditions for en passant
	this.timesMoved = 0;
	this.lastMovedOn = 0;
	
	this.moveset = function(grid){
		
		var moveset = new Array();
		
		var direction = -((this.side * 2) - 1);
		
		if(this.y == this.side * 5 + 1){
			if(grid.squares[this.y + direction][this.x].piece == null && grid.squares[this.y + 2 * direction][this.x].piece == null){
				moveset.push(grid.squares[this.y + 2 * direction][this.x]);
			}
		}
		if(!outsideBoard(this.x, this.y + direction, grid) && grid.squares[this.y + direction][this.x].piece == null){
			moveset.push(grid.squares[this.y + direction][this.x]);
		}
		if(!outsideBoard(this.x - 1, this.y + direction, grid) && grid.squares[this.y + direction][this.x - 1].piece != null &&
			grid.squares[this.y + direction][this.x - 1].piece.side != this.side){
				moveset.push(grid.squares[this.y + direction][this.x - 1]);
		}
		if(!outsideBoard(this.x + 1, this.y + direction, grid) && grid.squares[this.y + direction][this.x + 1].piece != null &&
			grid.squares[this.y + direction][this.x + 1].piece.side != this.side){
				moveset.push(grid.squares[this.y + direction][this.x + 1]);
		}
		
		if(this.y == 4 - this.side && this.x - 1 > 0 && grid.squares[this.y][this.x - 1].piece != null &&
			grid.squares[this.y][this.x - 1].piece.type == 0 && grid.squares[this.y][this.x - 1].piece.timesMoved == 1 &&
			grid.squares[this.y][this.x - 1].piece.lastMovedOn + 1 == grid.currentMove){
				moveset.push(grid.squares[this.y + direction][this.x - 1]);
		} else if(this.y == 4 - this.side && this.x + 1 < grid.gridWidth && grid.squares[this.y][this.x + 1].piece != null &&
			grid.squares[this.y][this.x + 1].piece.type == 0 && grid.squares[this.y][this.x + 1].piece.timesMoved == 1 &&
			grid.squares[this.y][this.x + 1].piece.lastMovedOn + 1 == grid.currentMove){
				moveset.push(grid.squares[this.y + direction][this.x + 1]);
		} 
		
		return moveset;
	};
	
	this.move = function(x2, y2, grid){
		this.timesMoved++;
		this.lastMovedOn = grid.currentMove;
		
		if(this.x != x2 && this.y == 4 - this.side && grid.squares[this.y][x2].piece != null &&
			grid.squares[this.y][x2].piece.type == 0 && grid.squares[this.y][x2].piece.timesMoved == 1){
				removePiece(grid, x2, this.y);
		}
		
		if(grid.squares[y2][x2].piece != null){
			removePiece(grid, x2, y2);
		}
		
		grid.squares[y2][x2].piece = this;
		grid.squares[this.y][this.x].piece = null;
		this.y = y2;
		this.x = x2;
		
		if((this.y == 0 && this.side == 1) ||(this.y == 7 && this.side == 0)){
			this.promote();
		}
	};
	
	this.promote = function(){
		alert("promote pawn")
		Piece.call(this, 4, side, this.x, this.y);
		this.moveset = new Queen(this.side, this.x, this.y).moveset;
	};
}
Pawn.prototype = new Piece;

function Rook(side, x, y){
	Piece.call(this, 1, side, x, y);
	
	this.moveset = function(grid){
		moveset = new Array();
		var x, y;
		
		for(x = this.x, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x + 1, y = this.y; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		return moveset;
	};
	
	this.move = function(x2, y2, grid){
		this.hasMoved = true;
		
		if(grid.squares[y2][x2].piece != null){
			removePiece(grid, x2, y2);
		}
		
		grid.squares[y2][x2].piece = this;
		grid.squares[this.y][this.x].piece = null;
		this.x = x2;
		this.y = y2;
	};
}
Rook.prototype = new Piece;



function Bishop(side, x, y){
	Piece.call(this, 2, side, x, y);
	
	this.moveset = function(grid){
		moveset = new Array();
				
		var x, y;
		
		for(x = this.x + 1, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x + 1, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		return moveset;
	};
}
Bishop.prototype = new Piece;

function Knight(side, x, y){
	Piece.call(this, 3, side, x, y);
	
	this.moveset = function(grid){
		moveset = new Array();
		
		if(emptyOrOpponent(this.x - 1, this.y - 2, this.side, grid)){
			moveset.push(grid.squares[this.y - 2][this.x - 1]);
		}
		if(emptyOrOpponent(this.x + 1, this.y - 2, this.side, grid)){
			moveset.push(grid.squares[this.y - 2][this.x + 1]);
		}
		if(emptyOrOpponent(this.x - 1, this.y + 2, this.side, grid)){
			moveset.push(grid.squares[this.y + 2][this.x - 1]);
		}
		if(emptyOrOpponent(this.x + 1, this.y + 2, this.side, grid)){
			moveset.push(grid.squares[this.y + 2][this.x + 1]);
		}
		if(emptyOrOpponent(this.x - 2, this.y - 1, this.side, grid)){
			moveset.push(grid.squares[this.y - 1][this.x - 2]);
		}
		if(emptyOrOpponent(this.x + 2, this.y - 1, this.side, grid)){
			moveset.push(grid.squares[this.y - 1][this.x + 2]);
		}
		if(emptyOrOpponent(this.x - 2, this.y + 1, this.side, grid)){
			moveset.push(grid.squares[this.y + 1][this.x - 2]);
		}
		if(emptyOrOpponent(this.x + 2, this.y + 1, this.side, grid)){
			moveset.push(grid.squares[this.y + 1][this.x + 2]);
		}
		
		return moveset;
	};
}
Knight.prototype = new Piece;

function King(side, x, y){
	Piece.call(this, 5, side, x, y);
	this.hasMoved = false;
	
	this.moveset = function(grid){
		var moveset = new Array();
		
		for(x = this.x - 1; x <= this.x + 1; x++){
			for(y = this.y - 1; y <= this.y + 1; y++){
				if(!outsideBoard(x, y, grid) && (grid.squares[y][x].piece == null || grid.squares[y][x].piece.side != this.side)){
					moveset.push(grid.squares[y][x])
				}
			}
		}
		
		if(!this.hasMoved && grid.currentMove % 2 != this.side &&
			grid.squares[this.y][0].piece != null && grid.squares[this.y][0].piece.type == 1 && !grid.squares[this.y][0].piece.hasMoved &&
			grid.squares[this.y][1].piece == null && grid.squares[this.y][2].piece == null && grid.squares[this.y][3].piece == null &&
			!isSquareInCheck(2, this.y, this.side, grid) && !isSquareInCheck(3, this.y, this.side, grid) && !isSquareInCheck(4, this.y, this.side, grid)){
				moveset.push(grid.squares[this.y][2]);
		} else if(!this.hasMoved && grid.currentMove % 2 != this.side &&
			grid.squares[this.y][7].piece != null && grid.squares[this.y][7].piece.type == 1 && !grid.squares[this.y][7].piece.hasMoved &&
			grid.squares[this.y][6].piece == null && grid.squares[this.y][5].piece == null &&
			!isSquareInCheck(6, this.y, this.side, grid) && !isSquareInCheck(5, this.y, this.side, grid) && !isSquareInCheck(4, this.y, this.side, grid)){
				moveset.push(grid.squares[this.y][6]);
		}
		return moveset;
	};
	
	this.move = function(x2, y2, grid){
		if(!this.hasMoved && x2 == 2 && this.y == y2){ // move won't get called unless legalMove with stricter rules has been passed
			grid.squares[y2][3].piece = grid.squares[y2][0].piece;
			grid.squares[y2][0].piece = null;
		} else if(!this.hasMoved && x2 == 6 && this.y == y2){
			grid.squares[y2][5].piece = grid.squares[y2][7].piece;
			grid.squares[y2][7].piece = null;
		}
		this.hasMoved = true;
		
		if(grid.squares[y2][x2].piece != null){
			removePiece(grid, x2, y2);
		}
		
		grid.squares[y2][x2].piece = grid.squares[this.y][this.x].piece;
		grid.squares[this.y][this.x].piece = null;
		this.x = x2;
		this.y = y2;
	};
}
King.prototype = new Piece;

function Queen(side, x, y){
	Piece.call(this, 4, side, x, y);
	
	this.moveset = function(grid){
		moveset = new Array();
				
		var x, y;
		//between each check if the piece in way is enemy, in which case allow capturing it
		
		//first down, up, right, left
		for(x = this.x, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x + 1, y = this.y; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		//then diagonal, lower right, upper right, lower left, upper left
		
		for(x = this.x + 1, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x + 1, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x++){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y + 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y++, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		for(x = this.x - 1, y = this.y - 1; !outsideBoard(x, y, grid) && grid.squares[y][x].piece == null; y--, x--){
			moveset.push(grid.squares[y][x]);
		}
		if(!outsideBoard(x, y, grid) && grid.squares[y][x].piece.side != this.side){
			moveset.push(grid.squares[y][x]);
		}
		
		
		return moveset;
	};
}
Queen.prototype = new Piece;