const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getGameId = functions.https.onCall((data, context) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
  
  var game = admin.database().ref('/games').once('value').then(function (snapshot) {
    var key;
    var color;
    var isGame = snapshot.forEach(function (childSnapshot) {
      //var key = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childData.playerBlack == '') {
        console.log("old");
        key = childSnapshot.key;
        console.log(key);
        //admin.database().ref('/games/' + key +'/playerBlack').set(data.playerId);
        admin.database().ref('/games/' +key).set({
          board: childData.board,
          playerBlack: data.playerId,
          playerWhite: childData.playerWhite,
          turn: childData.turn,
          state: "playing"
        });
        color = 0;
        return true;
      }
    });
    if (!isGame) {
      var gameId = admin.database().ref("/games").push({
        playerWhite: data.playerId,
        playerBlack: '',
        board:'rnbqkbnrpppppppp00000000000000000000000000000000PPPPPPPPRNBQKBNR',
        turn: 1,
        state: "none"
      });
      key = gameId.key;
      console.log(key);
      color = 1;
      //key = gameId.key;
    }
    return {
      gameId: key,
      player: color
    }; 
  });
  console.log(game);
  return game;
});

exports.getUserId = functions.https.onCall((data, context) => {
  var userId = admin.database().ref("/users").push({
    name:'player'
  });
  return userId.key;
});

exports.move = functions.https.onCall((data, contex) => {
  admin.database().ref('/games/' + data.gameId).once('value').then(function (snapshot) {
    game = snapshot.val();
    if(game.playerBlack != '' || !game.state.includes("playing")){
      if((game.playerBlack == data.userId && game.turn % 2 == 0) || (game.playerWhite == data.userId && game.turn % 2 == 1)){
        
        admin.database().ref('/games/' + data.gameId).set({
          board: data.board,
          playerBlack: game.playerBlack,
          playerWhite: game.playerWhite,
          turn: game.turn +1,
          state: data.state
        });
      }
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
        admin.database().ref('/games/' + data.gameId).set({
          board: game.board,
          playerBlack: game.playerBlack,
          playerWhite: game.playerWhite,
          turn: game.turn,
          state: newState
        });
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
      admin.database().ref('/games/' + data.gameId).set({
        board: game.board,
        playerBlack: game.playerBlack,
        playerWhite: game.playerWhite,
        turn: game.turn,
        state: newState
      });
    }
  });
});



