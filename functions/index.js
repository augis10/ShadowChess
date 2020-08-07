const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getGameId = functions.https.onCall((data, context) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
    var key = null;
  admin.database().ref('/games').once('value').then(function(snapshot) {
    var isGame = snapshot.forEach(function(childSnapshot){
        //var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.playerblack == 0){
            console.log("old");
            key = childData.key;
            return true;
        }
    });
    console.log(isGame);
    if(key == null){
        var gameId = admin.database().ref("/games").push({
            playerWhite: 1,
            playerblack: 0,
            board: 0,
            lastMove: 0,
            turn: 1
          });
          console.log("new");
          key = gameId.key;
    }
      return key;
  });
});
