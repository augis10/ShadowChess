
class ChessGame{
    board = [];
    movalble = [];
    constructor(player, size, startX, startY){
        this.player = player; // //player type 1-white, 2-black
        this.createBoard();
        this.view = new ChessView(player, size, startX, startY);
        this.logic = new ChessLogic(this.board, this.player);
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

    checkInput = function(row, col){
        if((row < 8 && row >= 0 && col < 8 && col >= 0)){
            return true;
        }
        return false;
    }

    checkFigure = function(row, col){
        if(this.board[row][col].figure >= 0 && this.board[row][col].figure <=6){
            return "black";
        }
        if(this.board[row][col].figure >= 7 && this.board[row][col].figure <=11){
            return "white";
        }
        return '';
    }

    checkSelected = function(row, col){
        if(this.logic.selected == null){
            return true;
        }
        if((this.logic.selected[0] != row || this.logic.selected[1] != row) && this.checkFigure(row, col) == this.player ){
            return true;
        }
        if(this.logic.selected[0] == row && this.logic.selected[1] == row)
        return false;
    }

    input = function(row, col){
        if(!this.checkInput(row, col)){
            return 0;
        }
        if(this.logic.gameOver() || this.logic.turn != player){
            return 0;
        }
        if(this.logic.turn = player){
            if(this.checkSelected(row, col)){
                this.logic.select(row, col);
            }
            if(this.logic.selected != null){
                this.logic.move(row, col);
            }
        }
        return 0;
    }

    inputOpp = function(row, col){

    }
    
    draw = function(){
        this.view.draw(this.movalble, this.board);
    }
}