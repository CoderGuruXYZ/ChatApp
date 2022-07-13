var all;

var check = firebase.database().ref().orderByKey().equalTo("data").once("value", function (snapshot) {
    if (!snapshot.exists()) {
        firebase.database().ref('data').set({
            messages: [""],
            userIds: [""],
            colours: [""],
            names: [""],
        });
    }
});

let userId = localStorage.getItem("user");
let userColour = localStorage.getItem("userColour");
var userName = localStorage.getItem("userName");

var dataRef = firebase.database().ref('data');
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    all = data;

    if(Object.values(all.messages).length > 1) {
        loadMsgs();
    }
});

function sendMsg() {
    if(document.getElementById("userText").value.length > 0) {
        var msgs = Object.values(all.messages);
        var ids = Object.values(all.userIds);
        var cols = Object.values(all.colours);
        var nms = Object.values(all.names);

        msgs.push(document.getElementById("userText").value);
        ids.push(userId);
        cols.push(userColour);
        nms.push(window.btoa(userName));

        firebase.database().ref('data').set({
            messages: msgs,
            userIds: ids,
            colours: cols,
            names: nms,
        });

        document.getElementById("userText").value = "";

        msgs = Object.values(all.messages);
        ids = Object.values(all.userIds);
        cols = Object.values(all.colours);
        nms = Object.values(all.names);

        if(msgs[0] == "") {
            msgs = msgs.slice(1);
            ids = ids.slice(1);
            cols = cols.slice(1);
            nms = nms.slice(1);
        }

        firebase.database().ref('data').set({
            messages: msgs,
            userIds: ids,
            colours: cols,
            names: nms,
        });

        loadMsgs();
    }
}

document.querySelector(".send").addEventListener("click", function() {
    sendMsg();
});

window.onkeypress = function(event) {
    if(event.keyCode == "13") {
        sendMsg();
    }
};

function loadMsgs() {
    document.querySelector(".window").innerHTML = "";

    var msgs = Object.values(all.messages);
    var ids = Object.values(all.userIds);
    var cols = Object.values(all.colours);
    var nms = Object.values(all.names);

    for(i = 0; i < msgs.length; i++) {
        var message = document.createElement("div");
        message.classList.add("message");

        if(ids[i] == userId) {
            message.id = "user";
        }

        var messageText = document.createElement("div");
        messageText.classList.add("messageText");
        messageText.innerHTML = msgs[i];

        if(ids[i] != userId) {
            var messageDetails = document.createElement("div");
            messageDetails.classList.add("messageDetails");

            var messageName = document.createElement("div");
            messageName.classList.add("messageName");
            messageName.innerHTML = window.atob(nms[i]);

            messageDetails.appendChild(messageName);

            var messageImage = document.createElement("div");
            messageImage.classList.add("messageImage");
            messageImage.innerHTML = '<i class="fa-solid fa-circle-user"></i>';
            messageImage.style.backgroundColor = cols[i];

            messageDetails.appendChild(messageImage);

            message.appendChild(messageDetails);
        }

        message.appendChild(messageText);

        document.querySelector(".window").appendChild(message);
    }

    document.querySelector(".window").scrollTop = document.querySelector(".window").scrollHeight - document.querySelector(".window").clientHeight;
}