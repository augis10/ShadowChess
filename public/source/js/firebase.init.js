// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDV-8pb2XaBzcdG03e2M0P5qpWL-9bcOK8",
    authDomain: "shadowchess.firebaseapp.com",
    databaseURL: "https://shadowchess.firebaseio.com",
    projectId: "shadowchess",
    storageBucket: "shadowchess.appspot.com",
    messagingSenderId: "394479361387",
    appId: "1:394479361387:web:e1b6d7413278ed2e31002e",
    measurementId: "G-Y5QZ2HC83G"
  };
  //var fire = firebase.initializeApp(firebaseConfig);

  // Initialize Firebase
  //console.log(window.location.hostname)
  
if(window.location.hostname === 'localhost'){
  var firebaseConfig = {
    projectId: "shadowchess",
    databaseURL: 'http://localhost:9000/?ns=shadowchess'
  }
  console.log("works")
  //var fire = firebase.initializeApp(firebaseConfig);
}

  var fire = firebase.initializeApp(firebaseConfig);
  fire.functions().useFunctionsEmulator('http://localhost:5001');

  //FIREBASE_DATABASE_EMULATOR_HOST="localhost:9000";