var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);	
var allPlayers = [[[]],[[]],[[]],[[]],[[]]];
var playerCord = [1, 1];
var XSpeed = 0;
var YSpeed = 0;
var numPlayers = 0;
var playerIndex;
console.log(allPlayers.length+" "+allPlayers[0].length);
function newConnection(socket){
	console.log("new connection");
	console.log(socket.id);
	var randX = Math.random()*800;
	var randY = Math.random()*600;
	
	socket.on('PlayerSpeed', playerSpeeds);
	//socket.broadcast.emit('PlayerKey', numPlayers);
	socket.on('SendPlayerKey', getPlayerIndex);
	numPlayers++;
	console.log(allPlayers);
}
function getPlayerIndex(index){
	playerIndex = index;
	if(playerIndex>=0){
	movePlayer(playerIndex);
}
	//console.log(allPlayers);

}


function playerSpeeds(data){
	XSpeed = data[0];
	YSpeed = data[1];
//	console.log(playerCord);
}
function movePlayer(data){
	if(allPlayers[0][data]!=null){
	allPlayers[0][data][0]+=XSpeed;
	allPlayers[0][data][1]+=YSpeed;
	io.sockets.emit('AllPlayers', allPlayers);
	}
	console.log(allPlayers[0][data]);
}
console.log("My server is running");
