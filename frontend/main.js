var socket = io()
var form = document.getElementById("form");
var input = document.getElementById("input")

var span = document.getElementsByClassName("close")[0];
var usernameButton = document.getElementById("usernameBtn")
var usernameForm = document.getElementById("usernameForm")
var usernameInput = document.getElementById("usernameInput")
var userP = document.getElementById("userP")
myStorage = window.sessionStorage;


if(localStorage.username){
    username = localStorage.getItem("username")
}else{
    username = ""
}

usernameForm.style.display = "none";
usernameBtn.style.display = "none";
userP.style.display = "none";

if(username == ""){
    usernameForm.style.display = "block";
    usernameBtn.style.display = "block";
    userP.style.display = "block"
}
usernameForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(usernameInput.value){
        localStorage.setItem("username", usernameInput.value)
        username = usernameInput.value;
        usernameForm.style.display = "none";
        usernameBtn.style.display = "none";
        userP.style.display = "none";
    }
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('chat message', (username + ": " + input.value));
        input.value = "";
    }
});


socket.on('chat message', function(msg){
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
})


socket.on('connection', function(cmsg){
    var item = document.createElement('li');
    //the function variable passed from the server
    item.textContent = username + " " + cmsg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
});



