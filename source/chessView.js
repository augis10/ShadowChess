class ChessView{
    figureImgs = [];
    constructor(player, boardSize, startX, startY){
        this.x = startX;
        this.y = startY;
        this.player = player;
        this.boardSize = boardSize;
        this.sqSize = boardSize/8;
        this.loadImages();
    }

    loadImages = function() {
		for(var i = 0; i < 2; i++){
			for(var j = 1; j < 7; j++){
				var img = loadImage( "../sprites/"+ i + j +".png");
				this.figureImgs.push(img);
			}
		}
    }

    drawBoard = function(){
        for(var col = 0; col < 8; col++){
            for(var row = 0; row < 8; row++){
                if((col + row) % 2 == 1)
                    fill(153,51,0);
                else {
                    fill(255, 212, 128);
                }
                rect(this.x + col * this.sqSize, this.y + row * this.sqSize, this.sqSize, this.sqSize);
            }
        }
    }

    drawFog = function(row, col, wVisable, bVisable){
        fill(165,164,167);
        if(this.player == 1 && !wVisable){
			rect(this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(this.player == 0 && !bVisable){
			rect(this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
    }

    drawFigure = function(figure, row, col, wVisable, bVisable){
		if(this.player == 1 && wVisable){
			image(this.figureImgs[figure], this.x + col * this.sqSize, this.y + (row) * this.sqSize, this.sqSize, this.sqSize);
		}
		if(this.player == 0 && bVisable){
			image(this.figureImgs[figure], this.x + (7-col) * this.sqSize, this.y + (7-row) * this.sqSize, this.sqSize, this.sqSize);
		}
    }

    drawMovable = function(movable){
        fill(51, 204, 51);
        if(movable != null){
            for(var i = 0; i < movable.length; i++){
                var row = movable[i][0];
                var col = movable[i][1];
                if(this.player == 1){
                    rect(this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
                }
                if(this.player == 0){
                    rect(this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
                }
            }   
        }      
    }

    drawSquares = function(board){
		for(var row = 0; row < 8; row++){
			for(var col = 0; col < 8; col++){
                if(board[row][col].figure != null){
                    this.drawFigure(board[row][col].figure, row, col, board[row][col].whiteVisable, board[row][col].blackVisable);
                }
                this.drawFog(row, col, board[row][col].whiteVisable, board[row][col].blackVisable);
			}
		}
    }

    draw = function(movable, board){
        this.drawBoard();
        this.drawMovable(movable);
        this.drawSquares(board);
    }

}