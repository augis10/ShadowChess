//fire.functions().useFunctionsEmulator('http://localhost:5001');
var boardSizeD = 800;
var boardSize = 800;
var game;
var boardDiv = boardSize/8;
var selected;
var player;

var database = fire.database();
var functions = fire.functions();
var userId, gameId;

var getUserId = functions.httpsCallable('getUserId');
var getGameId = functions.httpsCallable('getGameId');
var resignGame = functions.httpsCallable('resign');
var drawGame = functions.httpsCallable('draw');



function setup() {
	var userId = getCookie("userId");
	
	if(userId != ""){
		console.log(userId);
		getGameId({
			playerId: userId
		}).then(function(result){
			gameId = result.data.gameId;
			player = result.data.player;
			var myCanvas = createCanvas(boardSize, boardSize);
			myCanvas.parent("game");
			game = new ChessGame(userId, gameId, player, boardSize, 0, 0, false);
			listen();
		});
	}
	else {
		console.log("ref");
		window.location.href = "/index.html";
	}
}
getBoardSize = function(){
	var size = 0;
	var width = windowWidth*0.8;
	var height = windowHeight*0.8;
	if(width >= height){
		size = height;
	}
	else{
		size = width;
	}
	if(size >= boardSizeD){
		size = boardSizeD;
	}
	if(size <= boardSizeD/2){
		size = boardSizeD/2;
	}
	return size;
}

function windowResized(){
	if(game != null){
		
		boardSize = getBoardSize();
		console.log(boardSize);
		resizeCanvas(boardSize, boardSize);
		game.resize(boardSize);
	}
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
		if(game != null && obj.state =="playing"){
			game.updateBoard(obj.board, obj.turn, obj.state);
			document.getElementById("bt2").disabled = false;
		}
		else if(game != null && !obj.state.includes("playing")){
			game.updateBoard(obj.board, obj.turn, obj.state);
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

var resign = function(){
	console.log("resign");
	resignGame({
		gameId: gameId,
		playerId: userId
	});
}

var drawG = function(){
	console.log("draw");
	drawGame({
		gameId: gameId,
		playerId: userId
	});
}