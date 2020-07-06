class chessView{
    figureImgs = [];
    constructor(player, boardSize, x, y){
        this.x = x;
        this.y = y;
        this.player = player;
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
    
    drawFigure = function(figure, visable, row, col){
		if(this.player == 1 && visable){
			image(this.figureImgs[figure], this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(this.player == 2 && visable){
			image(this.figureImgs[figure], this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
    }

    drawFogOfWar = function(visable, row, col){
        fill(165,164,167);
        if(this.player == 1 && !visable){
			rect(this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(this.player == 2 && !visable){
			rect(this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
    }

    drawMovable = function(movable, selected, row, col){
        fill(51, 204, 51);
        if(this.player == 1 && (selected  || movable)){
			rect(this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(this.player == 2 && (selected  || movable)){
			rect(this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
    }
    
    drawSquares = function(board){
		for(var row = 0; row < 8; row++){
			for(var col = 0; col < 8; col++){
                var vis = board[row][col].visable;
                var mov = board[row][col].movable;
                var sel = board[row][col].selected;
                this.drawMovable(mov, sel, row, col);
				if(board[row][col].figure != null){
                    var fig = board[row][col].figure;
					this.drawFigure(fig, vis, row, col);
                }
                this.drawFogOfWar(vis, row, col);	
			}
		}
    }
    
    draw = function(board){
        this.drawBoard();
        this.drawSquares(board);
    }

}