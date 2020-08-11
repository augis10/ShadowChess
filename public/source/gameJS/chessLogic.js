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

    getVisable = function(boardF, player){
        var visable = [];
        var board = this.copyBoard(boardF);
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                if(Figure.getOccupation(board[row][col]) == player){
                    var vm = this.getFigureMoves(board, row, col);
                    for(var i = 0; i < vm.visable.length; i++){
                        visable.push([vm.visable[i][0], vm.visable[i][1]]);
                    }
                }
            }
        }
        return visable;
    }
    legalMoves = function(board, player){
        var movable = [];
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                if(Figure.getOccupation(board[row][col]) == player){
                    var vm = this.getFigureMoves(board, row, col);
                    for(var i = 0; i < vm.movable.length; i++){
                        movable.push([vm.movable[i][0], vm.movable[i][1]]);
                    }
                }
            }
        }
        return movable;
    }
    isInCheck(board, player){
        if(player == 0){
            var player2 = 1;
        }
        else{
            var player2 = 0;
        }
        var mov = this.legalMoves(board, player);
        var legal;
        for(var i = 0; i < mov.length; i++){
            if(board[mov[i][0]][mov[i][1]] == 6 * player2){
                legal = false;
                return legal;
            }
        }
        legal = true;
        return legal;
    }

    checkMove = function(board, row, col, rowN, colN){
        var fig = board[rowN][colN];
        board[rowN][colN] = board[row][col];
        board[row][col] = null;
        var player = Figure.getOccupation(board[rowN][colN]);
        var legal = this.isInCheck(board, player);
        board[row][col] = board[rowN][colN];
        board[rowN][colN] = fig;
        return legal;
    }

    existsLegalMoves = function(board, turn){
        //var board = this.copyBoard(boardF);
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                if(Figure.getOccupation(board[row][col]) == turn % 2){
                    var vm = this.getFigureMoves(board, row, col);
                    for(var i = 0; i < vm.movable.length; i++){
                        var legal = this.checkMove(board, row, col, vm.movable[i][0], vm.movable[i][1]);
                        if(legal){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    

    select = function(boardF, row, col){
        var vm = new VisMov();
        var arr = [];
        var board = this.copyBoard(boardF);
        vm = this.getFigureMoves(board, row, col);
        for(var i = 0; i < vm.movable.length; i++){
            if(this.checkMove(board, row, col, vm.movable[i][0], vm.movable[i][1])){
                arr.push([vm.movable[i][0], vm.movable[i][1]]);
            }
        }
        return arr;
    }

    move = function(boardF, row, col, rowN, colN){
        var board = this.copyBoard(boardF);
        return this.checkMove(board, row, col, rowN, colN);
    }

    insMat = function(board){
        var bPoints = 0;
        var wPoints = 0;
        for(var row = 0; row < 8; row++){
            for(var col = 0; col < 8; col++){
                if(board[row][col] != null){
                    if((board[row][col] == 4 || board[row][col] == 3)){
                        bPoints += 3;
                    }
                    else if((board[row][col] == 10 || board[row][col] == 9)){
                        wPoints += 3;
                    }
                    else if(board[row][col] != 0 || board[row][col] != 6){
                        return false;
                    }
                }
                
            }
        }
        if(wPoints > 3 || bPoints > 3){
            return false;
        }
        else {
            return true;
        }
    }
    
    gameOver = function(boardF, turn){
        var board = this.copyBoard(boardF);
        var existsMoves = this.existsLegalMoves(board, turn);
        console.log(existsMoves);
        if(!existsMoves){
            var inCheck = this.isInCheck(board, (turn % 2));
            console.log(inCheck);
            if(inCheck){
                return (turn % 2);
            }
            else {
                return 2;
            }
            
        }
        var insMat = this.insMat(board);
        console.log(insMat);
        if(insMat){
            return 3;
        }

        return -1;
    }
}