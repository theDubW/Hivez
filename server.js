var express = require('express');
var app = express();
var server = app.listen(1000);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);	
var allPlayers = [[[]],[[]],[[]],[[]],[[]]];
var playerCord = [1, 1];
var XSpeed = 0;
var YSpeed = 0;
var numPlayers = 0;
console.log(allPlayers.length+" "+allPlayers[0].length);
function newConnection(socket){
	console.log("new connection");
	console.log(socket.id);
	var randX = Math.random()*800;
	var randY = Math.random()*600;
	allPlayers[0][numPlayers] = [randX, randY];
	socket.on('PlayerSpeed', playerSpeeds);
	numPlayers++;
	console.log(allPlayers);
	socket.broadcast.emit('Code', numPlayers);
	socket.broadcast.emit('AllPlayers', allPlayers);
}

function playerSpeeds(data){
	XSpeed = data[0];
	YSpeed = data[1];
	allPlayers[0][numPlayers-1][0]+=XSpeed;
	allPlayers[0][numPlayers-1][1]+=YSpeed;
	//console.log(allPlayers[0][numPlayers-1][0]);
	//console.log(allPlayers[0][numPlayers-1][1]);
	playerCord = allPlayers[0][numPlayers-1];
	io.sockets.emit('PlayerXY', playerCord );
//	console.log(playerCord);
}
console.log("My server is running");
