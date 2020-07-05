class chessLogic{
    initRow1 = [2,4,3,1,0,3,4,2];
    initRow2 = [8,10,9,7,6,9,10,8];
    constructor(board, player){
        this.player = player;
        this.initBoardFigures(board);
    }

    initBoardFigures = function(board){
		for(var i = 0; i < 8; i++){
			board[0][i].figure = this.initRow1[i];
			board[1][i].figure = 5;
			board[7][i].figure = this.initRow2[i];
			board[6][i].figure = 11;
		}
    }

    selectFigure = function(board, row, col){
        
    }

    moveFigure = function(board, row, col, newRow, newCol){
        
    }
    

}