var express = require('express');

var app = express();


var socket = require('socket.io');
const cors = require('cors');


app.use(cors());

const PORT = process.env.PORT || 4000;

var server = app.listen(PORT, function () {
    console.log('listening to requests on port 4000');
})

//static files

app.use(express.static('backend'));

//Socket setup

var io = socket(server);

io.on('connection', function (socket) {
    console.log('socket connection');
    console.log(socket.id);
    
    socket.on('chat', function (data) {
        //Send data to all clients connected to the server
        io.sockets.emit('chat',data);
    })
    //Broadcast a message
    socket.on('typing', function (data) {
        //Send data to all clients connected to the server
        socket.broadcast.emit('typing', data);
    })
})
