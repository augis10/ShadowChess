var boardSize = 800;
var game1;
var boardDiv = boardSize/8;
var selected;
var player = 1;
function setup() {
	createCanvas(boardSize, boardSize);
	game = new ChessGame(player, boardSize, 0, 0);
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
}

