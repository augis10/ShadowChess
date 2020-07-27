
class ChessGame{
    board = [];
    movable = [];
    selected = null;
    gameOver = false;
    turn = 1;
    constructor(player, size, startX, startY){
        this.player = player; // //player type 1-white, 2-black
        this.createBoard();
        this.initBoardFigures();
        this.view = new ChessView(player, size, startX, startY);
        this.logic = new ChessLogic();
    }

    createBoard = function(){
		for(var i = 0; i < 8; i++){
			this.board[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.board[row][col] = new Square();
			}
		}
    }

    initBoardFigures = function(){
        var initRow1 = [2,4,3,1,0,3,4,2];
        var initRow2 = [8,10,9,7,6,9,10,8];
		for(var i = 0; i < 8; i++){
			this.board[0][i].figure = initRow1[i];
			this.board[1][i].figure = 5;
			this.board[7][i].figure = initRow2[i];
			this.board[6][i].figure = 11;
		}
    }

    checkInput = function(row, col){
        if((row < 8 && row >= 0 && col < 8 && col >= 0)){
            return true;
        }
        return false;
    }

    checkFigure = function(row, col){
        if(this.board[row][col].figure >= 0 && this.board[row][col].figure <6){
            return 0;
        }
        if(this.board[row][col].figure >= 6 && this.board[row][col].figure <=11){
            return 1;
        }
        return null;
    }

    inMovable = function(row, col){
        for(var i = 0; i < this.movable.length; i++){
            if(this.movable[i][0] == row && this.movable[i][1] == col){
                return true;
            }
        }
        return false;
    }

    isSameFig = function(row, col){
        if(this.selected != null){
            if(this.selected[0] == row && this.selected[1] == col){
                return true;
            }
        }
        return false;
    }

    select = function(row, col){
        if(this.checkFigure(row, col) == player){
            this.selected = [row, col];
            this.movable = this.logic.select(this.board, row , col);
            this.movable.push([row,col]);
        }
        
    }

    deSelect = function(){
        this.selected = null;
        this.movable = [];
    }

    move = function(row, col){
        var fig = this.board[this.selected[0]][this.selected[1]].figure;
        this.board[this.selected[0]][this.selected[1]].figure = null;
        this.board[row][col].figure = fig;
        this.turn++;
        this.gameOver = this.logic.gameOver(board);
    }

    input = function(row, col){
        if(!this.checkInput(row, col)){
            return;
        }
        else if(this.gameOver || this.turn % 2 != this.player){
            return;
        }
        if(this.turn % 2 == player){
            if(this.selected == null && this.checkFigure(row, col) == this.player){
                this.select(row, col);
                console.log("select1");
            }
            else if((!this.inMovable(row, col) && this.checkFigure(row, col) != this.player) || this.isSameFig(row, col)){
                this.deSelect();
                console.log("deSelect");
            }
            else if(this.checkFigure(row, col) == this.player && !this.isSameFig(row, col)){
                this.select(row, col);
                console.log("select2");
            }
            else if(this.inMovable(row, col)){
                this.move(row, col);
                console.log("move");
            }
        }
        
    }

    inputOpp = function(row, col){

    }
    
    draw = function(){
        this.view.draw(this.movable, this.board);
    }
}