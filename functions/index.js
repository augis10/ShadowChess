const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


var defaultBoard = 'rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR';

setToDatabaseGame = function(ref, board, playerBlack, playerWhite, turn, state){
  admin.database().ref(ref).set({
    board: board,
    playerBlack: playerBlack,
    playerWhite: playerWhite,
    turn: turn,
    state: state
  });
}

pushToDatabaseGame = function(ref, board, playerBlack, playerWhite, turn, state){
  var gameId = admin.database().ref(ref).push({
    board: board,
    playerBlack: playerBlack,
    playerWhite: playerWhite,
    turn: turn,
    state: state
  });
  return gameId;
}

setToDatabaseUser = function(ref, username, currentGame){
  admin.database().ref(ref).set({
    username: username,
    currentGame: currentGame
  });
}

pushToDatabaseUser = function(ref, username, currentGame){
  var userId = admin.database().ref(ref).push({
    username: username,
    currentGame: currentGame
  });
  return userId;
}

getRandomGame = function(data){
  var game = admin.database().ref('/games').once('value').then(function (snapshot) {
    var key;
    var color;
    var isGame = snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      if (childData.playerBlack == '') {
        key = childSnapshot.key;
        var ref = '/games/' + key;
        var state = "playing";
        setToDatabaseGame(ref, childData.board, data.playerId, childData.playerWhite, childData.turn, state);
        ref = "/users/" + data.playerId + "/currentGame";
        admin.database().ref(ref).set(key);
        color = 0;
        return true;
      }
    });

    if (!isGame) {
      var ref = "/games";
      var state = "none";
      var gameId = pushToDatabaseGame(ref,defaultBoard, '' , data.playerId,  1, state);
      key = gameId.key;
      ref = "/users/" + data.playerId + "/currentGame";
      admin.database().ref(ref).set(key);
      color = 1;
    }
    return {
      gameId: key,
      player: color
    }; 
  });
  return game;
}

getCurrentGameId = function(playerId){
  var game = admin.database().ref("/users/"+ playerId).once("value").then(function (snapshot){
    var user = snapshot.val();
    return user.currentGame;
  });
  return game;
}

getCurrentGame = function(gameId, playerId){
  var game = admin.database().ref('/games/' + gameId).once('value').then(function (snapshot) {
    game = snapshot.val();

    var color = -1;
    if(game.playerBlack == playerId){
      color = 0;
    }
    if(game.playerWhite == playerId){
      color =1;
    }
    return {
      gameId: gameId,
      player: color
    };
  });
  return game;
}

exports.getGameId = functions.https.onCall((data, context) => {
  //var gameId = getCurrentGameId(data.playerId);
  var gameF = admin.database().ref("/users/"+ data.playerId).once("value").then(function (snapshot){
    var user = snapshot.val();
    var gameId = user.currentGame;
    console.log(gameId)
    var game;
    console.log("1");
    var game;
    if(gameId == ''){
      console.log("3");
      game = getRandomGame(data);
    }
    else {
      console.log("2");
      game = getCurrentGame(gameId, data.playerId);
    }
    return game;
  });
  return gameF;
});

exports.getUserId = functions.https.onCall((data, context) => {
  var username;
  if(data.username == "" || data.username == null){
    username = "player";
  }
  else {
    username = data.username;
  }
  var ref = "/users";
  var userId = pushToDatabaseUser(ref, username, "");
  return userId.key;
});

exports.setUsername = functions.https.onCall((data, context) => {
  if(data.userId != null || data.username != null){
    var ref = "/users/" + data.userId;
    setToDatabaseUser(ref, data.username, '');
  }
});



exports.move = functions.https.onCall((data, contex) => {
  admin.database().ref('/games/' + data.gameId).once('value').then(function (snapshot) {
    game = snapshot.val();
    if(game.playerBlack != '' || game.state.includes("playing")){
      if((game.playerBlack == data.userId && game.turn % 2 == 0) || (game.playerWhite == data.userId && game.turn % 2 == 1)){
        var ref = '/games/' + data.gameId;
        setToDatabaseGame(ref, data.board, game.playerBlack, game.playerWhite, game.turn+1, data.state);
      }
    }
    if(game.playerBlack != '' && !data.state.includes("playing")){
      var non = "";
      var ref = "/users/" + game.playerBlack +"/currentGame";
      admin.database().ref(ref).set(non);
      var ref = "/users/" + game.playerWhite +"/currentGame";
      admin.database().ref(ref).set(non);
    }
  });
});

exports.resign = functions.https.onCall((data, context) => {
  admin.database().ref('/games/' + data.gameId).once('value').then(function (snapshot) {
    game = snapshot.val();
    var oldState = game.state;
    var newState = oldState;
    if(oldState.includes("playing")){
      if(game.playerWhite == data.playerId){
        newState = "black won";
      }
      if(game.playerBlack == data.playerId){
        newState = "white won";
      }
      if(newState != oldState){
        var ref = '/games/' + data.gameId;
        setToDatabaseGame(ref, game.board, game.playerBlack, game.playerWhite, game.turn, newState);
      }
    }
  });
});

exports.draw = functions.https.onCall((data, context) => {
  admin.database().ref('/games/' + data.gameId).once('value').then(function (snapshot) {
    game = snapshot.val();
    var oldState = game.state;
    var newState = oldState;
    if(oldState == "playing"){
      if(game.playerWhite == data.playerId){
        newState = "playing white draw?";
      }
      if(game.playerBlack == data.playerId){
        newState = "playing black draw?";
      }
    }
    if(oldState == "playing white draw?" && game.playerBlack == data.playerId){
      newState = "draw";
    }
    if(oldState == "playing black draw?" && game.playerWhite == data.playerId){
      newState = "draw";
    }
    if(newState != oldState){
      var ref = '/games/' + data.gameId;
      setToDatabaseGame(ref, game.board, game.playerBlack, game.playerWhite, game.turn, newState);
    }
  });
});



