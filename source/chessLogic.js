class ChessLogic{
    constructor(){
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

    getFigureMoves = function(board, row, col){
        switch(board[row][col].figure) {
            case 0:
            case 6:
                King.kingCtr(board, row, col);
                break;
            case 1:
            case 7:
                Queen.queenCtr(board, row, col);
                break;
            case 2:
            case 8:
                Rook.rookCtr(board, row, col);
                break;
            case 3:
            case 9:
                Bishop.bishopCtr(board, row, col);
                break;
            case 4:
            case 10:
                Knight.knightCtr(board, row, col);
                break;
            case 5:
            case 11:
                Pawn.pawnCtr(board, row, col);
                break;
          }
    }

    select = function(board, row, col){
        var arr = [];
        
        console.log("select");
        return arr;
    }

    move = function(row, col){
        console.log("move");
    }
    
    gameOver = function(){
        return false;
    }
}