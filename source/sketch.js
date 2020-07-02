var boardSize = 800;
var imgs = []
var game1;

function setup() {
	createCanvas(boardSize, boardSize);
	game1 = new chessGame(1, boardSize, 0, 0);
}

function draw() {
	background(255);
	game1.draw();
}