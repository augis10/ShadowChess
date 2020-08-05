const nickname = document.getElementById('play');

play.addEventListener('click', e => {
    firebaseConfig.auth().signInAnonymous();
});




