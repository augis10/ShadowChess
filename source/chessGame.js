
class chessGame{
    board = [];
    constructor(player, size, startX, startY){
        this.player = player; // //player type 1-white, 2-black or 0-both (test)
        this.createBoard();
        this.view = new chessView(size, startX, startY);
        this.logic = new chessLogic(this.board, this.player);
    }

    createBoard = function(){
		for(var i = 0; i < 8; i++){
			this.board[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.board[row][col] = new square();
			}
		}
    }
    
    draw = function(){
        this.view.draw(this.board, this.player);
    }
}