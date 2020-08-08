//fire.functions().useFunctionsEmulator('http://localhost:5001');

var boardSize = 800;
var game;
var boardDiv = boardSize/8;
var selected;
var player = 1;

var database = fire.database();
var functions = fire.functions();

function setup() {
	var getUserId = functions.httpsCallable('getUserId');
	var getGameId = functions.httpsCallable('getGameId');
	var userId, gameId;
	getUserId({}).then(function(result){
		userId = result.data;
		console.log(result.data);
		getGameId({
			playerId: userId
		}).then(function(result2){
			gameId = result2.data;
			console.log(result2.data);
		});
	})

	// database.ref("/games/"+ result.data).on("value", function(dataSnapshot){
	// 	console.log("pasikeite");
	// });

	createCanvas(boardSize, boardSize);
	game = new ChessGame(player, boardSize, 0, 0, true);

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

