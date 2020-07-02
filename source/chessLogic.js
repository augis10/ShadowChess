class chessLogic{
    initRow1 = [2,4,3,1,0,3,4,2];
	initRow2 = [8,10,9,7,6,9,10,8];
    constructor(board, player){
        this.player = player;
        this.initBoardFigures(board);
    }

    initBoardfigures = function(board){
		for(var i = 0; i < 8; i++){
			board[0][i].figure = this.initRow1[i];
			board[1][i].figure = 5;
			board[7][i].figure = this.initRow2[i];
			board[6][i].figure = 11;
		}
    }

    checkSquare = function(Row, Col){
		if(Row >= 0 && Row <= 7 && Col >=0  && Col <= 7){
			return true;
		}
		return false;
	}
    

}