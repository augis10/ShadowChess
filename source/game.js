

function game(size, x, y, type){
	this.x = x;
	this.y = y;
	this.type = type; //player type 1-white, 2-black or 0-both
	this.boardSize = size;
	this.sqSize = boardSize/8;
	this.imgs = [];
	//0-bk, 1-bq, 2-br, 3-bb, 4-bk, 5-bp
	//6-wk, 7-wq, 8-wr, 9-wb, 10-wk, 11-wp
	this.initRow1 = [2,4,3,1,0,3,4,2];
	this.initRow2 = [8,10,9,7,6,9,10,8];
	this.board = [];
	this.toMove = (type == 1);
	
	
	
	function square(){
		this.figure = null;
		this.highlight = false;
		this.visable = true;
		this.movedOnce = false;
	}
	
	this.createBoardArr = function(){
		for(var i = 0; i < 8; i++){
			this.board[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				this.board[row][col] = new square();
			}
		}
	}
	
	this.loadImages = function() {
		for(var i = 0; i < 2; i++){
			for(var j = 1; j < 7; j++){
				var img = loadImage( "../sprites/"+ String(i) + String(j) +".png")
				this.imgs.push(img);
			}
		}
	}
	
	this.initBoard = function(){
		for(var i = 0; i < 8; i++){
			this.board[0][i].figure = this.initRow1[i];
			this.board[1][i].figure = 5;
			this.board[7][i].figure = this.initRow2[i];
			this.board[6][i].figure = 11;
		}
	}
	
	this.drawBoard = function(){
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
	
	this.drawFigure = function(player, row, col){
		if(player == 0 ){
			image(this.imgs[this.board[row][col].figure], this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(player == 1 && this.board[row][col].visable){
			image(this.imgs[this.board[row][col].figure], this.x + col * this.sqSize, this.y + (row) *this.sqSize, this.sqSize, this.sqSize);
		}
		if(player == 2 && this.board[row][col].visable){
			image(this.imgs[this.board[row][col].figure], this.x + (7-col) * this.sqSize, this.y + (7-row) *this.sqSize, this.sqSize, this.sqSize);
		}
	}
	
	this.drawAllFigures = function(player){
		for(var row = 0; row < 8; row++){
			for(var col = 0; col < 8; col++){
				if(this.board[row][col].figure != null){
					this.drawFigure(player, row, col)
				}	
			}
		}
	}
	
	this.checkSquare = function(Row, Col){
		if(Row >= 0 && Row <= 7 && Col >=0  && Col <= 7){
			return True;
		}
		return false;
	}

	
	
	
	this.figureMove = function(player, oldRow, oldCol, newRow, newCol){
		if(toMove == player && checkSquare(oldRow, oldCol) && checkSquare(newRow, newCol)){
			
		}
	}
	
	
	this.init = function(){
		this.createBoardArr();
		this.loadImages();
		this.initBoard();
	}
	
	this.draw = function(){
		this.drawBoard();
		this.drawAllFigures(this.type);
	}
	
	
	
}