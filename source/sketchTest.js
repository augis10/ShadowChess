var boardSize = 600;
var game1;
var boardDiv = boardSize/8;
var selected;
var player = 1;
var player2 = 0
function setup() {
	createCanvas(boardSize, boardSize*2);
    game = new ChessGame(player, boardSize, 0, 0);
    game2 = new ChessGame(player2, boardSize, 0, boardSize)
}

function mouseClicked() {
	var sq = getSquare();
	game.input(sq[0], sq[1]);
}

var getSquare = function(){
	var sq = [];
	var col = Math.floor(mouseX/boardDiv);
	var row = Math.floor(mouseY/boardDiv);
	sq.push(row);
	sq.push(col);
	return sq;
}

function draw() {
	background(255);
    game.draw();
    game2.draw();
}
