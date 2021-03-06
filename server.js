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
var BASE_ARRAY = {};

var XSpeed = 0;
var YSpeed = 0;
var playerIndex;
var Player = require('./GameObjects/Player.js');

var GameObject = require("./GameObjects/GameObject.js");

var numOfConnections = 0;
var Gold = require('./GameObjects/gold.js');
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
<<<<<<< HEAD
	socket.on('disconnect', function(){
	console.log("Deleting Player...");
	delete SOCKET_LIST[socket.id];
	delete allPlayers[socket.id];
	console.log(SOCKET_LIST[socket.id]);
	numOfConnections++;
	console.log(numOfConnections);
	});
=======
	socket.on('disconnect', removePlayer);
>>>>>>> parent of 6a4fac3... fixed deleting players issue

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

<<<<<<< HEAD
=======
function removePlayer(){
	console.log("Deleting Player...");
	delete SOCKET_LIST[socket.id];
	delete allPlayers[socket.id];
	console.log(SOCKET_LIST[socket.id]+""+allPlayers[socket.id]);
}

>>>>>>> parent of 6a4fac3... fixed deleting players issue
setInterval(serverLoop, UPDATE_TIME);
function serverLoop(){
	//for(var i in allPlayers)
	//onsole.log(allPlayers[i].x);
	var pack = [];
	for(var i in allPlayers){
		var player = allPlayers[i];
		player.updatePosition();
			pack.push({
				AllPlayers : allPlayers,
				//TO DO: PUSH BASE ARR
		});
	}
	for(var g in goldArr){
		pack.push([g.x, g.y]);
	}

	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('data', pack);
	}
}
function makeGoldArr(){
	var randGoldArr = [];
	for(var i = 0; i<10; i++){
		for(var g = 0; g<9; g++){
			var randNum = Math.floor(Math.random()*11);
			if(randNum == 1){
			var randomX = Math.random()*800;
			var randomY = Math.random()*600;
			var tempGold = new Gold(randomX, randomY);
			randGoldArr.push(tempGold);
			}
		}
	}
	return randGoldArr;
}

console.log("My server is running");