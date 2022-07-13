const firebaseConfig = {
    apiKey: "AIzaSyDN3YX53Q63S3vcqH864ipRQ0zB3GeNdqg",
    authDomain: "chat-app-test-5bb2e.firebaseapp.com",
    projectId: "chat-app-test-5bb2e",
    storageBucket: "chat-app-test-5bb2e.appspot.com",
    messagingSenderId: "742878400472",
    appId: "1:742878400472:web:116aaa65115b7278ef2cad"
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