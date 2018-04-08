var express = require('express');
var app = express();
var server = app.listen(80);
app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
const UPDATE_TIME = 1000/30;
io.sockets.on('connection', newConnection);	
var allPlayers = {};
var SOCKET_LIST = {};

var XSpeed = 0;
var YSpeed = 0;
var playerIndex;
var Player = require('./GameObjects/Player.js');

var numOfConnections = 0;
var goldArr = makeGoldArr();

function newConnection(socket){
	console.log("new connection");
	socket.id = Math.random();
	var randX = Math.random()*800;
	var randY = Math.random()*600;
	var team = Math.floor(Math.random()*3);
	SOCKET_LIST[socket.id] = socket;
	var player = new Player(socket.id, team, randX, randY, 72, 184, "Test", null, 0);
	allPlayers[socket.id] = player;
	console.log(socket.id);
	socket.on('disconnect', function(){
	console.log("Deleting Player...");
	delete SOCKET_LIST[socket.id];
	delete allPlayers[socket.id];
	console.log(SOCKET_LIST[socket.id]);
	numOfConnections++;
	console.log(numOfConnections);
	});

	socket.on('keyPress', function(data){
	if(data.inputId == 'right'){
		player.pressingUp = false;
		player.pressingDown = false;
		player.pressingRight = true;
		player.pressingLeft = false;
	}
	if(data.inputId == 'left'){
		player.pressingUp = false;
		player.pressingDown = false;
		player.pressingRight = false;
		player.pressingLeft = true;
	}
	if(data.inputId == 'up'){
		player.pressingUp = true;
		player.pressingDown = false;
		player.pressingRight = false;
		player.pressingLeft = false;
	}
	if(data.inputId == 'down'){
		player.pressingUp = false;
		player.pressingDown = true;
		player.pressingRight = false;
		player.pressingLeft = false;
	}
	if(data.inputId == 'stop'){
		player.pressingUp = false;
		player.pressingDown = false;
		player.pressingRight = false;
		player.pressingLeft = false;
	}	
	});
}

setInterval(serverLoop, UPDATE_TIME);
function serverLoop(){
	var pack = [];
	for(var i in allPlayers){
		var player = allPlayers[i];
		player.updatePosition();
			pack.push({
				x : player.x,
				y: player.y,
				img : player.imgSrc,
				width : player.width,
				height : player.height
			});
	}

	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('PlayerPositions', pack);
		socket.emit('GoldArray', goldArr);
	}

}
function makeGoldArr(){
	var randGoldArr = [[],[],[],[],[],[],[],[],[],[],[]];
	for(var i = 0; i<10; i++){
		for(var g = 0; g<9; g++){
			var randNum = Math.floor(Math.random()*10);
			if(randNum==1){
				randGoldArr[i][g] = 1;
			}
			else{
				randGoldArr[i][g] = 0;
			}
		}
	}
	return randGoldArr;
}

console.log("My server is running");
