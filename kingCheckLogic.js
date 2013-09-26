//checks if king is in check position in the current configuration of the field.
//used to check if move is legal after move is executed on a copy of the field,
//and in the end of turn to see if the move checked the opposing king
function isKingInCheck(side, grid){
	var x, y; //location of king
	for(i = 0; i < grid.pieces[side].length; i++){
		if(grid.pieces[side][i].type == 5){
			x = grid.pieces[side][i].x;
			y = grid.pieces[side][i].y;
		}
	}
	return isSquareInCheck(x, y, side, grid);
}

function isSquareInCheck(x, y, side, grid){
	var emptySquare;
	var inDangerSet = new Array;
	
	if(grid.squares[y][x].piece == null){
		emptySquare = true;
		grid.squares[y][x].piece = new Piece(-1, side, x, y);
	}
	for(i = 0; i < grid.pieces[1 - side].length; i++){
		inDangerSet = inDangerSet.concat(grid.pieces[1 - side][i].moveset(grid));
	}
	
	if(emptySquare){
		grid.squares[y][x].piece = null;
	}
	
	if(inDangerSet.indexOf(grid.squares[y][x]) == -1){
		return false;
	} else {
		return true;
	}
}
