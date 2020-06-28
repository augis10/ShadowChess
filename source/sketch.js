var boardSize = 800

var pieces = [];
var images = [];

function preload() {
	for(1 = 0; i < 2; i++){
		for(j = 1; j < 7; j++){
			images.push(loadImage( "sprites/"+ i + j +'.png'));
		}
	}
}

function setup() {
	createCanvas(boardSize, boardSize );
	
}

function draw() {
	background(255);
}

// Function just for drawing the board
function drawBoard() {
	
}