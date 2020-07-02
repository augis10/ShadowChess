class chessView{
    figureImgs = [];
    constructor(boardSize, x, y){
        this.x = x;
        this.y = y;
        this.boardSize = boardSize;
        this.sqSize = boardSize/8;
        this.loadImages();
    }

    loadImages = function() {
		for(var i = 0; i < 2; i++){
			for(var j = 1; j < 7; j++){
				var img = loadImage( "../sprites/"+ i + j +".png")
				this.figureImgs.push(img);
			}
		}
    }
    
    drawBoard = function(){
		var black = true;
		for(var row = 0; row < 8; row++){
			if(black){
				black = false;
			}
			else {
				black = true;
			}
			for(var col = 0; col < 8; col++){
				if(black){
					fill(153, 51, 0);
					black = false;
				}
				else {
					fill(255, 212, 128);
					black = true;
				}
				
				rect(this.x + col * this.sqSize, this.y + row * this.sqSize, this.sqSize, this.sqSize);
			}
		}
    }
    
    drawFigure = function(figure, visable, player, row, col){
		if(player == 0 ){
			image(this.figureImgs[figure], this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(player == 1 && visable){
			image(this.figureImgs[figure], this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(player == 2 && visable){
			image(this.figureImgs[figure], this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
    }
    
    drawAllFigures = function(board, player){
		for(var row = 0; row < 8; row++){
			for(var col = 0; col < 8; col++){
				if(board[row][col].figure != null){
                    var fig = board[row][col].figure;
                    var vis = board[row][col].visable;
					this.drawFigure(fig, vis, player, row, col);
				}	
			}
		}
    }
    
    draw = function(board, player){
        this.drawBoard();
        this.drawAllFigures(board, player);
    }

}