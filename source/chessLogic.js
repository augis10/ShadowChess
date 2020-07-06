class chessLogic{
    initRow1 = [2,4,3,1,0,3,4,2];
    initRow2 = [8,10,9,7,6,9,10,8];
    boardFull = [];
    constructor(board, player){
        this.player = player;
        this.createBoard();
        this.initBoardFigures();
        this.setBoard(board);
    }

    createBoard = function(){
		for(var i = 0; i < 8; i++){
			this.boardFull[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.boardFull[row][col] = new squareExt();
			}
		}
    }

    initBoardFigures = function(){
		for(var i = 0; i < 8; i++){
			this.boardFull[0][i].figure = this.initRow1[i];
			this.boardFull[1][i].figure = 5;
			this.boardFull[7][i].figure = this.initRow2[i];
			this.boardFull[6][i].figure = 11;
		}
    }

    setBoard = function(board){
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                board[row][col].figure = this.boardFull[row][col].figure;
                board[row][col].selected = this.boardFull[row][col].selected;
                board[row][col].movable = this.boardFull[row][col].movable;
                if(this.player == 1){
                    board[row][col].visable = this.boardFull[row][col].whiteVisable;
                }
                if(this.player == 2){
                    board[row][col].visable = this.boardFull[row][col].blackVisable;
                }
            }
        }
    }

    selectFigure = function(board, row, col){
        
    }

    moveFigure = function(board, row, col, newRow, newCol){
        
    }

    visableToBlack = function(){

    }

    visableToWhite = function(){

    }

    
    

}