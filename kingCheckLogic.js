//checks if king is in check position in the current configuration of the field.
//used to check if move is legal after move is executed on a copy of the field,
//and in the end of turn to see if the move checked the opposing king
function isKingInCheck(side, grid){ 
		var x, y; //location of king
		for(i = 0; i < grid.gridWidth; i++){
			for(j = 0; j < grid.gridHeight; j++){
				if(grid.squares[i][j] != null && grid.squares[i][j].side == side && grid.squares[i][j].type == "K"){
					x = j; y = i;
					break;
				}
			}
		}
		return !(verifyPawns(x, y, side, grid) && verifyKnights(x, y, side, grid) && verifyRooks(x, y, side, grid)
			 && verifyBishops(x, y, side, grid) && verifyKings(x, y, side, grid));
}

function verifyPawns(x, y, side, grid){
	if((grid.squares[y + (side * -2 + 3)][x + 1] != null && grid.squares[y + (side * -2 + 3)][x + 1].type == "P" && grid.squares[y + (side * -2 + 3)][x + 1].side != side) ||
	   (grid.squares[y + (side * -2 + 3)][x - 1] != null && grid.squares[y + (side * -2 + 3)][x - 1].type == "P" && grid.squares[y + (side * -2 + 3)][x - 1].side != side)){
			return false;
	   }
	return true;
}

function verifyKnights(x, y, side, grid){
	return true;
}

function verifyRooks(x, y, side, grid){ //contains also queen
	return true;
}

function verifyBishops(x, y, side, grid){ //contains also queen
	return true;
}

function verifyKings(x, y, side, grid){
	return true;
}
