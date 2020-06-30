var boardSize = 800;
var imgs = []
var game1;

function setup() {
	createCanvas(boardSize, boardSize );
	game1 = new game(boardSize, 0, 0);
	game1.init();
}

function draw() {
	background(255);
	game1.draw();
}