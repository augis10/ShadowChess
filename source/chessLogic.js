class ChessLogic{
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
        var vm = new VisMov();
        switch(board[row][col]) {
            case 0:
            case 6:
                return King.kingCtr(board, row, col);
            case 1:
            case 7:
                return Queen.queenCtr(board, row, col);
            case 2:
            case 8:
                return Rook.rookCtr(board, row, col);
            case 3:
            case 9:
                return Bishop.bishopCtr(board, row, col);
            case 4:
            case 10:
                return Knight.knightCtr(board, row, col);
            case 5:
            case 11:
                return Pawn.pawnCtr(board, row, col);
          }
    }
    copyBoard(boardF){
        var board = [];
        for(var i = 0; i < 8; i++){
			board[i] = new Array(8);
		}
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                board[row][col] = boardF[row][col].figure;
            }
        }
        return board;
    }

    getVisableBlack(board){

    }
    getVisableWhite(board){

    }
    LegalMovesWhite(board){

    }
    LegalMovesBlack(board){

    }

    

    select = function(boardF, row, col){
        var vm = new VisMov();
        var board = this.copyBoard(boardF);
        vm = this.getFigureMoves(board, row, col);
        console.log(vm);





        var arr = [];
        
        console.log("select");
        return arr;
    }

    move = function(board, row, col){
        console.log("move");
    }
    
    gameOver = function(board){
        return false;
    }
}