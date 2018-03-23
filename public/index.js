var socket;
socket = io.connect('http://10.10.149.169:1000');
window.addEventListener('keydown', function changeSpeed(e){ // listens for keypresses, left, right, up, down, and e
var playerXYSpeed = [0, 0];
	if(e.keyCode == 37){ //left
		console.log("LMAO");
		playerXYSpeed[0]=-4;
		playerXYSpeed[1]= 0;
		socket.emit('PlayerSpeed',playerXYSpeed);
	}
	if(e.keyCode == 39){ //right
		playerXYSpeed[0]= 4;
		playerXYSpeed[1]= 0;
		socket.emit('PlayerSpeed',playerXYSpeed);
	}
	if(e.keyCode == 38){ //up
		playerXYSpeed[0]= 0;
		playerXYSpeed[1]= -4;
		socket.emit('PlayerSpeed',playerXYSpeed);
	}
	if(e.keyCode == 40){ //down
		playerXYSpeed[0]= 0;
		playerXYSpeed[1]= 4;
		socket.emit('PlayerSpeed',playerXYSpeed);
	}
		if(e.keyCode == 32){ //space stops you
		playerYSpeed = 0;
		playerXSpeed = 0;
	}
	if(e.keyCode == 69){//when you press e you drop your coins by your base
		dropCoins();
		goldAmount=0;
	}
	
});




var canvas = document.getElementById("mess");
var context = canvas.getContext('2d');

var bart = new Image(); //This entire block is for the main character. It has the src, width, height, speed, and x and y positions
bart.src = 'http://10.10.149.169:1000/images/Bart.gif';
bart.width = 72;
bart.height = 184;
var playerX = 1;
var playerY = 1;

socket.on('AllPlayers', drawAllPlayers);
function drawAllPlayers(playerCoords){
	for(var i = 0; i<playerCoords.length; i++){
		for(var g = 0; g<playerCoords[i].length; g++){
				console.log("LMAO");
				context.drawImage(bart,playerCoords[i][g][0],playerCoords[i][g][1], 72, 184);
		}
	}
}

socket.on('PlayerXY', updateCords);
function updateCords(cords){
playerX = cords[0];
playerY = cords[1];
}

var playerXSpeed = 0;
var playerYSpeed = 0;


var brick = new Image(); //this block is for the background, the brown bricks. Nothing special and very simple
brick.src = 'http://10.10.149.169:1000/images/brick.png';
brick.width = 100;
brick.height = 58;
var numRows = 8;
var numColl = 11;

var wall = new Image(); //This is for the walls, and is very similar to the bricks, but they are made through the matrix down below.
wall.src = 'http://10.10.149.169:1000/images/wall.jpg';//Every wall is a one.
wall.width = 40;
wall.height = 80;
var walls = [
[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var gold = new Image(); // This is the block of code for the gold object. totalGold is a number refreshed every frame that checks how much gold is on the screen
gold.src = 'http://10.10.149.169:1000/images/gold.jpg';// based on the Array "golds", which is a matrix of gold.
gold.width = 40;// "goldAmount" is the number of gold the player currently has.
gold.height = 40;
var totalGold = 0;
var goldAmount = 0;
var golds = randArrofCoins();
var startingGold = allGold(golds);
var hasDropped = false;
var droppable = false;

var castle = new Image();// this is the block for the castle object
castle.src = 'http://gallery2.jpmullan.com/d/443036-2/castle.png';//it has an x and y position, and a width and height
castle.width = 100;
castle.height = 118;
var castleX = 50;
var castleY = 400;
var castleWidth = 100;
var castleHeight = 118;
function game(){ // this is the main function which is called 30 times a second in "MessingAround.html"
move();//Move function moves every thing in the game
draw();//draw function draws it onto the canvas 
}
function draw(){//draws everything
drawRect(0, 0, canvas.width, canvas.height, "black");//this is the starting black background
makeMap();//the make map function consists of all the background objects
//context.drawImage(bart, playerX, playerY, 72, 184);// draws bart, the main character using the makePlayer function
drawRect(playerX+8, playerY-20, (goldAmount/startingGold)*60, 10, "yellow");// This is the little bar over Barts head
}
function move(){
if(playerX+(bart.width)>canvas.width){ // this first block could be condensed to a function, but for now it contains the character to the gamescreen
playerXSpeed = 0;
playerX = canvas.width-(bart.width);
}
if(playerX<0){
playerXSpeed = 0;
playerX = 0;
}
if(playerY<0){
playerYSpeed = 0;
playerY = 0;
}
if(playerY+(bart.height)>canvas.height){
playerYSpeed = 0;
playerY = canvas.height-(bart.height);
}

playerX += playerXSpeed;
playerY += playerYSpeed;
}
function drawRect(x, y, width, height, color){ //simple function that draws you a rectangle
context.fillStyle = color;
context.fillRect(x,y,width,height);
}
function drawBricks(img){ // fills the screen with bricks
for(var i = 0; i<numColl; i++){
	for(var g = 0; g<numRows; g++){
		context.drawImage(img, g*img.width, i*img.height, img.width, img.height);
	}
}
}
function makeMap(){// makes map
	drawBricks(brick); // draws te bricks
	drawWalls(wall,walls);//draws the walls
	makeCastle(castle);//draws the castle
	spawnGold(gold, golds);//makes the gold
	allGold(golds);//checks the gold total
	collectGold(gold, golds);//checks if the player is collecting gold
	if(totalGold == 0 && goldAmount == 0){ // respawns gold if there is no gold on the screen and the player has dropped all of theirs
		golds = randArrofCoins();
		startingGold = allGold(golds);
	}
}
function drawWalls(img, wallArr){ // draws the walls based on the matrix
for(var i = 0; i<wallArr.length; i++){
	for (var g = 0; g < wallArr[i].length; g++) {
		if(wallArr[i][g]!=0){
		context.drawImage(img, g*img.width, i*img.height, img.width, img.height);
	}
	}
}
}
function spawnGold(img, goldArr){ // spawns gold around the map based on an array
for(var i = 0; i<goldArr.length; i++){
	for(var g = 0; g<goldArr[i].length; g++){
		if(goldArr[i][g]!=0){
		context.drawImage(img, g*img.width, i*img.height, img.width, img.height);
		}
	}
}
}
function collectGold(img, goldArrs){ // checks if you're collecting gold
	for(var i = 0; i<goldArrs.length; i++){
	for(var g = 0; g<goldArrs[i].length; g++){
		var goldX = g*img.width;
		var goldY = i*img.height;
		if(goldX>=playerX&&goldX<=playerX+img.width){
			if(goldY>=playerY-img.height&&goldY<=playerY+img.height){
					goldArrs[i][g] = 0;
					goldAmount = startingGold-totalGold;
					if(goldAmount>0){
						droppable = true;
					}
			
				}  
			}
		}
	}

}
function allGold(goldArrays){ // counts how much gold is on the screen
	var tempAmount = 0;
	totalGold = 0;
for(var i = 0; i<goldArrays.length; i++){
	for(var g = 0; g<goldArrays[i].length; g++){
				if(goldArrays[i][g] != 0){
					totalGold++;
				}
	}
}
tempAmount = totalGold;
return tempAmount;
}
function makeCastle(img){ //draws the castle
context.drawImage(img, castleX, castleY, img.width, img.height);
}
function dropCoins(){ //triggered when you press e. Checks if you're in the area of the castle and if so grows the castle based on how many coins you have
	if(playerX>castleX-bart.width&&playerX<castleX+castleWidth+bart.width){
		if(playerY<castleY+castleHeight+bart.height-20&&playerY>castleY-bart.height+20){
			if(goldAmount>0){
				if(droppable == true){
				console.log("gonna drop");
				castle.width +=(2*goldAmount)/(castleWidth/castleHeight);
				castle.height +=(2*goldAmount);
				castleY -=(2*goldAmount);
				startingGold = allGold(golds);
				hasDropped = true;
				droppable = false;
			}
		}
		}
	}
}
function randArrofCoins(){ // makes a random array of arrays and fills it with places with coins
	var coinMatrix = [[],[],[],[],[],[],[],[],[],[],[],[]];
	for(var i = 0; i<coinMatrix.length; i++){
		for (var g = 0; g < coinMatrix.length; g++) {
			var randNum = Math.floor(Math.random()*11);

			if(randNum == 1){
				coinMatrix[i][g] = 1;
			}
			else{
				coinMatrix[i][g] = 0;
			}

		}
	}
	return coinMatrix;


}