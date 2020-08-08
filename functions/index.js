const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getGameId = functions.https.onCall((data, context) => {
  //functions.logger.info("Hello logs!", {structuredData: true});
  
  admin.database().ref('/games').once('value').then(function (snapshot) {
    var key = null;
    var isGame = snapshot.forEach(function (childSnapshot) {
      //var key = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childData.playerBlack == '') {
        console.log("old");
        key = childSnapshot.key;
        console.log(key);
        admin.database().ref('/games/' + key +'/playerBlack').set(data.playerId);

        return true;
      }
    });
    if (!isGame) {
      console.log(data);
      var gameId = admin.database().ref("/games").push({
        playerWhite: data.playerId,
        playerBlack: '',
        board:'',
        lastMove: '',
        turn: 1
      });
      key = gameId.key;
      console.log(key);
      //key = gameId.key;
    }
    console.log(key);
    //return key;
  });
});

exports.getUserId = functions.https.onCall((data, context) => {
  var userId = admin.database().ref("/users").push({
    name:'player'
  });
  return userId.key;
})
