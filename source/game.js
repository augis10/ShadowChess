function square(){
	this.figure = null;
	this.highlight = false;
	this.visable = false;
}

function game(size, x, y){
	this.x = x;
	this.y = y;
	this.boardSize = size;
	this.sqSize = boardSize/8;
	this.imgs = [];
	//0-bk, 1-bq, 2-br, 3-bb, 4-bk, 5-bp
	//6-wk, 7-wq, 8-wr, 9-wb, 10-wk, 11-wp
	this.initRow1 = [2,4,3,1,0,3,4,2]
	this.initRow2 = [8,10,9,7,6,9,10,8]
	this.board = [];
	
	
	function createBoardArr(){
		this.board = new Array(8);
		for(var i = 0; i < 8; i++){
			board[i] = new Array(8);
		}
		for(var row = 0; row < 8; row++) {
			for(var col = 0; col < 8; col++) {
				board[row][col] = new square();
			}
		}
	}
	
	
	function loadImages() {
		for(1 = 0; i < 2; i++){
			for(j = 1; j < 7; j++){
				images.push(loadImage( "sprites/"+ i + j +'.png'));
			}
		}
	}
	
	function initBoard(){
		for(var i = 0; i < 8; i++){
			board[0][i] = initRow1[i];
			board[1][i] = 5;
			board[7][i] = initRow2[i];
			board[6][i] = 11;
		}
	}
	
	function drawBoard(){
		var black = true;
		for(var col = 0; col < 8; col++){
			for(var row = 0; row < 8; row++){
				if(black){
					fill("Black");
					black = false;
				}
				else {
					fill("White");
					black = true;
				}
				rect(x + col * sqSize, y + row *sqSize, sqSize, sqSize);
			}
		}
	}
	
	function drawFigures(player){
		for(var row = 0; row < 8; row++){
			for(var col = 0; col < 8; col++){
				if(board[i][j].figure != null){
					if(player == "white"){
						//image(imgs[board[row][col].figure], )
					}
				}
				
			}
		}
		
	}
	
	
	this.draw(){
		
	}
}