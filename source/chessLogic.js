class ChessLogic{
    turn = "white";
    selected = null;
    boardFull = [];
    movable = [];
    constructor(board, player){
        this.player = player;
        this.createBoard();
        this.initBoardFigures();
        this.getBoard(board);
    }

    createBoard = function(){
		for(var i = 0; i < 8; i++){
			this.boardFull[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.boardFull[row][col] = new Square();
			}
		}
    }

    initBoardFigures = function(){
        var initRow1 = [2,4,3,1,0,3,4,2];
        var initRow2 = [8,10,9,7,6,9,10,8];
		for(var i = 0; i < 8; i++){
			this.boardFull[0][i].figure = initRow1[i];
			this.boardFull[1][i].figure = 5;
			this.boardFull[7][i].figure = initRow2[i];
			this.boardFull[6][i].figure = 11;
		}
    }

    getBoard = function(board){
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                board[row][col].figure = this.boardFull[row][col].figure;
                board[row][col].movable = this.boardFull[row][col].movable;
                if(this.player == 1){
                    board[row][col].whiteVisable = this.boardFull[row][col].whiteVisable;
                }
                if(this.player == 2){
                    board[row][col].blackVisable = this.boardFull[row][col].blackVisable;
                }
            }
        }
    }
    getFigureMoves = function(board, row, col, visable, movable){
        switch(board[row][col].figure) {
            case 0:
            case 6:
                King.kingCtr(board, row, col, visable, movable);
                break;
            case 1:
            case 7:
                Queen.QueenCtr(board, row, col, visable, movable);
                break;
            case 2:
            case 8:
                Rook.rookCtr(board, row, col, visable, movable);
                break;
            case 3:
            case 9:
                Bishop.bishopCtr(board, row, col, visable, movable);
                break;
            case 4:
            case 10:
                Knight.knightCtr(board, row, col, visable, movable);
                break;
            case 5:
            case 11:
                Pawn.pawnCtr(board, row, col, visable, movable);
                break;
          }
    }

    resetVision = function(){
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                this.boardFull[row][col].blackVisable = false;
                this.boardFull[row][col].whiteVisable = false;
            }
        }
    }

    getVision = function(board, visW, visB){
        var mov = [];
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                fig = boardFull[row][col].figure;
                if(fig >= 0 && fig < 6){
                    this.getFigureMoves(board, row, col, visB, mov);
                }
                if(fig >= 6 && fig < 12){
                    this.getFigureMoves(board, row, col, visW, mov);
                }
            }
        }
    }

    select = function(row, col){

        console.log("select");
    }
    deselect = function(){
        console.log("deselect")
    }

    move = function(row, col){
        console.log("move");
    }
    
    gameOver = function(){
        return false;
    }
}