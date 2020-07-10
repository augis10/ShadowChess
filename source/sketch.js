var boardSize = 800;
var imgs = []
var game1;

function setup() {
	createCanvas(boardSize, boardSize);
	game1 = new ChessGame(1, boardSize, 0, 0);
}

function draw() {
	background(255);
	game1.draw();
}