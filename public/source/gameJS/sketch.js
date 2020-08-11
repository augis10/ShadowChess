//fire.functions().useFunctionsEmulator('http://localhost:5001');

var boardSize = 800;
var game;
var boardDiv = boardSize/8;
var selected;
var player = 1;

var database = fire.database();
var functions = fire.functions();
var userId, gameId;

var getUserId = functions.httpsCallable('getUserId');
var getGameId = functions.httpsCallable('getGameId');

function setup() {
	getUserId({}).then(function(result){
		userId = result.data;
		getGameId({
			playerId: userId
		}).then(function(result){
			gameId = result.data.gameId;
			player = result.data.player;
			createCanvas(boardSize, boardSize);
			game = new ChessGame(userId, gameId, player, boardSize, 0, 0, false);
			listen();
		});
	});
}

function mouseClicked() {
	var sq = getSquare();
	if(game != null){
		game.input(sq[0], sq[1]);

	}
}

var listen = function(){
	database.ref("/games/"+ gameId).on("value", function(dataSnapshot){
		var obj = dataSnapshot.val();
		if(game != null){
			game.listenChange(obj.board, obj.turn);
		}
		
	});
	
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
	if(game != null){
		game.draw();
	}
}

