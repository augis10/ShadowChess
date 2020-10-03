//const { get } = require("http");

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

var myUsername = "";
var opUsername =  "";

function setup() {
	userId = getCookie("userId");
	
	if(userId != ""){
		console.log(userId);
		getGameId({
			playerId: userId
		}).then(function(result){
			gameId = result.data.gameId;
			player = result.data.player;
			console.log(gameId);
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

setUsername = function(userId, elemId, mine){
	database.ref("/users/"+ userId).once("value", function(dataSnapshot){
		var user = dataSnapshot.val();
		if(mine == true){
			myUsername = user.username;
		}
		else{
			opUsername = user.username;
		}
		elemId.textContent = user.username;
	});
}

setUserInfo = function(gameInfo){
	if(game != null){
		if(myUsername == ""){
			var elem = document.getElementById("myUsername");
			setUsername(userId, elem, true);
		}
		if(opUsername == "" && gameInfo.playerBlack != "" && gameInfo.playerWhite != ""){
			var elem = document.getElementById("opUsername");
			console.log(gameInfo);
			if(gameInfo.playerBlack == userId){
				setUsername(gameInfo.playerWhite,  elem, false);
			}
			if(gameInfo.playerWhite == userId){
				setUsername(gameInfo.playerBlack,  elem, false)
			}
		}
	}
	
}

function windowResized(){
	if(game != null){
		
		boardSize = getBoardSize();
		console.log(boardSize);
		resizeCanvas(boardSize, boardSize);
		game.resize(boardSize);
		boardDiv = boardSize/8;
	}
}

function mouseClicked() {
	var sq = getSquare();
	if(game != null){
		game.input(sq[0], sq[1]);
	}
}

var listen = function(){
	console.log(gameId);
	database.ref("/games/"+ gameId).on("value", function(dataSnapshot){
		var obj = dataSnapshot.val();
		setUserInfo(obj);
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