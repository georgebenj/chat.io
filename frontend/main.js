var socket = io()
var form = document.getElementById("form");
var input = document.getElementById("input")


form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('chat message', input.value);
        input.value = "";
    }
})


socket.on('chat message', function(msg){
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
})


socket.on('connection', function(cmsg){
    var item = document.createElement('li');
    //the function variable passed from the server
    item.textContent = cmsg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight)
});