var primaryGrid;
var whoseMove = 1;

function init(){
	primaryGrid = new Grid(true);
	initUI();
}


function Grid(setup){
	
	this.gridWidth = 8;
	this.gridHeight = 8;
	
	//needed to check en passant but might prove useful later too
	this.currentMove = 0;

	//follows y, x notation!
	this.squares = new Array(this.gridWidth);
	
	for(i = 0; i < this.gridWidth; i++){
		this.squares[i] = new Array(this.gridHeight);
		for(j = 0; j < this.gridHeight; j++){
			this.squares[i][j] = {};
		}
	}
	
	if(setup){
		this.squares[0] = kingRow(0);
		this.squares[1] = pawnRow(0);
		this.squares[6] = pawnRow(1);
		this.squares[7] = kingRow(1);
		this.pieces = [[], []];
		for(i = 0; i < this.squares[0].concat(this.squares[1]).length; i++){
			this.pieces[0].push(this.squares[0].concat(this.squares[1])[i].piece)
		}
		for(i = 0; i < this.squares[6].concat(this.squares[7]).length; i++){
			this.pieces[1].push(this.squares[6].concat(this.squares[7])[i].piece)
		}
		
	}
	
	this.allPieces = function(){
		return this.pieces[0].concat(this.pieces[1]);
	};
	
	this.copy = function(){ //returns a copy of the grid
		var result = new Grid(false);
		result.pieces = [[], []];
		for(i = 0; i < this.gridWidth; i++){
			for(j = 0; j < this.gridHeight; j++){
				piece = this.squares[i][j].piece;
				if(piece == null){
					result.squares[i][j].piece = null;
				}else switch(this.squares[i][j].piece.type){
					case 0: result.squares[i][j].piece = new Pawn(piece.side, piece.x, piece.y); break;
					case 1: result.squares[i][j].piece = new Rook(piece.side, piece.x, piece.y); break;
					case 3: result.squares[i][j].piece = new Knight(piece.side, piece.x, piece.y); break;
					case 2: result.squares[i][j].piece = new Bishop(piece.side, piece.x, piece.y); break;
					case 4: result.squares[i][j].piece = new Queen(piece.side, piece.x, piece.y); break;
					case 5: result.squares[i][j].piece = new King(piece.side, piece.x, piece.y); break;
				}
				if(result.squares[i][j].piece != null){
					result.pieces[result.squares[i][j].piece.side].push(result.squares[i][j].piece);
				}
			}
		}
		return result;
	};
}

function kingRow(side){
	var row = [{},{},{},{},{},{},{},{}];
	var backrow = side * 7;
	
	row[0].piece = new Rook(side, 0, backrow);
	row[1].piece = new Knight(side, 1, backrow);
	row[2].piece = new Bishop(side, 2, backrow);
	row[3].piece = new Queen(side, 3, backrow);
	row[4].piece = new King(side, 4, backrow);
	row[5].piece = new Bishop(side, 5, backrow);
	row[6].piece = new Knight(side, 6, backrow);
	row[7].piece = new Rook(side, 7, backrow);
	
	return row;
}

function pawnRow(side){
	var row = [{},{},{},{},{},{},{},{}];
	for(i = 0; i < row.length ; i++){
		row[i].piece = new Pawn(side, i, side * 5 + 1);
	}
	return row;
}

function move(x1, y1, x2, y2, grid){
	if (checkValidMove(x1, y1, x2, y2, grid)){
		if(grid.squares[y1][x1].piece.legalMove(x2, y2, grid)){
			var gridCopy = grid.copy();
			gridCopy.squares[y1][x1].piece.move(x2, y2, gridCopy);
			if(!isKingInCheck(whoseMove, gridCopy)){
				grid.squares[y1][x1].piece.move(x2, y2, grid);
				checkPawns(whoseMove, grid);
				if(whoseMove == 1){
					whoseMove = 0;
				} else whoseMove = 1;
				if(isKingInCheck(whoseMove, grid)){
					warning("Check.");
				}
				grid.currentMove++;
				return true;
			} else warning("King checked");
			
		} else warning("move not legal")
	} else warning("move not valid")
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
		warning("Wrong turn");
		return false;
	}	
}

function outsideBoard(x, y, grid){
	return (x < 0 || x >= grid.gridWidth || y < 0 || y >= grid.gridHeight);
}

function checkPawns(side, grid){
	for(i = 0; i < grid.gridWidth; i++){
		if(grid.squares[-(side - 1) * 7][i].piece != null && grid.squares[-(side - 1) * 7][i].piece.type == 0){
			grid.squares[-(side - 1) * 7][i].piece.promote();//updateQueen(i, -(side - 1) * 7, side, grid);
		}
	}
}


function debugPieces(grid){
	var output = "";
	for(i = 0; i < grid.pieces[0].length; i++){
			output += grid.pieces[0][i].type + " ";
		}
	alert(output)
	output = ""
	for(i = 0; i < grid.pieces[1].length; i++){
			output += grid.pieces[1][i].type + " ";
		}
	alert(output)
}
