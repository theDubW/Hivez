var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);
var playerCord = [1, 1];
var XSpeed = 0;
var YSpeed = 0;
function newConnection(socket){
	console.log("new connection");
	console.log(socket.id);
	socket.on('PlayerSpeed', playerSpeeds)
}

function playerSpeeds(data){ee
	playerCord[0]+=data[0];
	playerCord[1]+=data[1];
	io.sockets.emit('PlayerXY', playerCord);
	console.log(playerCord);
}
console.log("My server is running");
