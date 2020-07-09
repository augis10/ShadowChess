
class ChessGame{
    board = []; // This board has limitet information
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

    select = function(row, col){
        // changes the board (has limited information)
    }

    move = function(row, col, rowN, colN){
        // changes the board (has limited information)
    }
    
    draw = function(){
        this.view.draw(this.board);
    }
}