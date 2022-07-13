const firebaseConfig = {
    apiKey: "AIzaSyDYDCWXDLXH9_FArKRUT5er1TkVQVUEO6Q",
    authDomain: "chatapp-37829.firebaseapp.com",
    databaseURL: "https://chatapp-37829-default-rtdb.firebaseio.com",
    projectId: "chatapp-37829",
    storageBucket: "chatapp-37829.appspot.com",
    messagingSenderId: "377322785306",
    appId: "1:377322785306:web:4ee30a3f6a499376f79fa3"
};

firebase.initializeApp(firebaseConfig);

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

if (localStorage.user == null) {
    localStorage.setItem("user", window.btoa(randomInRange(0, 1000000)));

    var colours = ["green", "blue", "red", "yellow", "purple", "orange", "pink"];

    var idx = randomInRange(0, colours.length);
    localStorage.setItem("userColour", colours[idx]);
}

if(localStorage.userName == null) {
    var userName = prompt("Enter a Username: ");
    
    localStorage.setItem("userName", userName);
}