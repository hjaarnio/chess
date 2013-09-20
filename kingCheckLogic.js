//checks if king is in check position in the current configuration of the field.
//used to check if move is legal after move is executed on a copy of the field,
//and in the end of turn to see if the move checked the opposing king
function isKingInCheck(side, grid){
	var x, y; //location of king
	for(i = 0; i < grid.gridWidth; i++){
		for(j = 0; j < grid.gridHeight; j++){
			if(grid.squares[i][j].piece != null && grid.squares[i][j].piece.side == side && grid.squares[i][j].piece.type == "K"){
				x = j; y = i;
				break;
			}
		}
	}
	alert("king at " + x + " " + y)
	return isSquareInCheck(x, y, side, grid);
}

function isSquareInCheck(x, y, side, grid){
	var emptySquare;
	var inDangerSet = new Array;
	
	alert("enter isSquareInCheck")
	
	if(grid.squares[y][x].piece == null){
		emptySquare = true;
		grid.squares[y][x].piece = new Piece("X", side);
	}
	for(i = 0; i < grid.gridWidth; i++){
		for(j = 0; j < grid.gridHeight; j++){
			if(grid.squares[j][i].piece != null && grid.squares[j][i].piece.side != side){
		//		alert("found " + grid.squares[j][i].piece.type)
				inDangerSet = inDangerSet.concat(grid.squares[j][i].piece.moveset(i, j, grid));
			}
		}
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
