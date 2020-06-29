var boardSize = 800;
var imgs = []

function setup() {
	createCanvas(boardSize, boardSize );
	var game1 = new game(boardSize, 0, 0);
	game1.init();
}

function draw() {
	background(255);
	//game1.draw();
	//game1.test1();
	fill("Black");
	rect(0,0,50,50);
}