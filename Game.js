public class Game
{
  this.emitList = {};
  /*emitList will contain every message needing to be sent to the server and will
  be sent in run() every frame. Its format is as follows:
    emitList = {['identifier',data], ['identifier',data]}
    */
  constructor(team, room, playerName){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
    this.canvas = document.getElementById("mess");
    this.context=canvas.getContext('2d');
    this.socket = io.connect('http://http://10.10.149.169:1000');
    socket.on('GameCoords',visiblePlayer)
    socket.on('Code',playerCode);
    this.playerCode= playerCode;
    this.player = new Player(x,y,playerName);
    addEventListeners();
    setInterval(run, 1000/30);//30 times every second run() will be called
  }
  addEventListeners(){
    window.addEventListener('keydown', function(e){
       // listens for keypresses, left, right, up, down, and e
      var keyCode = e.keyCode;
      switch(keyCode)
      {
        case 37: //left
          movePlayer(-4,0);
          break;
        case 39: //right
          movePlayer(4,0);
          break;
        case 38: //up
          movePlayer(0,-4);
          break;
        case 40: //down
          movePlayer(0,4);
          break;
        case 69: //e
          dropCoins();
          break;
    }
    canvas.onmousemove = function(e){
      const DEGRAD = 57.2974694;//The number of degrees per radian
      var playerX = canvas.width/2;
      var playerY = canvas.height/2;
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      var orientation = 0;
      if(mouseX==playerX && mouseY>playerY);
      {
        orientation = 180;
      }
      else if(mouseX==playerX){}//This would set orientation to 0, but it already is
      else if(mouseY==playerY && mouseX>playerX)
      {
        orientation = 90;
      }
      else if(mouseY==playerY)
      {
        orientation = 270;
      }
      else
      {
        if(mouseX>playerX && mouseY < playerY)//If its in the top right quadrant
        {
            orientation = Math.atan((mouseX-playerX)/(playerY-mouseY))*DEGRAD;
        }
        else if(mouseX>playerX)//If its in the bottom left quadrant
        {
          orientation = Math.atan((mouseY-playerY)/(mouseX-playerX))*DEGRAD + 90;
        }
        else if(mouseY>playerY)//If its in the bottom right quadrant
        {
          orientation = Math.atan((playerX-mouseX)/(mouseY-playerY))*DEGRAD + 180;
        }
        else //If its in the top left quardant
        {
          orientation = Math.atan((playerY-mouseY)/(playerX-mouseX))*DEGRAD + 270;
        }
      }
      emitList.push(["orientation",orientation]);//Adds it to the emitList
    }
    canvas.onclick = function(e){
      emitList.push(['playerClick',true]);
    }
  }
  run(){//Called every frame, gets visual data from server
    socket.on('GameCoords',draw);
    socket.emit("UserData",emitList);//Sends all of the data
  }
  /****************************************************8
  The parameter data should be structured as follows:
  data = {
    coins:
    [
      [x,y],
      [x,y], etc...
    ]
    players:
    {
        {
          name:"Jack Wier",
          team:"Blue",
          orientation:400,
          health:50,
          gold:20
          position:[x,y] //The position of the center of the player
        }
    }
    bases:
    [
      {
        team:"Red",
        squares:[[50,40],[30,12],[55,34]]
      }
    ]
  ]
  }
  *************************************************************/
  draw(data){
    drawCoins(data.coins);
    drawPlayers(data.players);
    drawBases(data.bases);
  }
  drawCoins(coins){
    for(var coin in coins)
    {
      var gold = new Image();
      gold.src = './public/images/gold.jpg';
      context.drawImage(gold, coin[0], coin[1]);
    }
  }
  getColors(team)
  {
    /************
    Returns the colors to draw each player/base based on their team.
    The format is ["outsideColor","insideColor"]
    ***********/
    if(team=="Blue")
    {
      return ["#5e97f2","#93baf9"];
    }
    else if(team=="Red")
    {
      return ["#fc4646","#f75d5d"];
    }
    else if(team=="Green")
    {
      return ["#4fad24","#76db48"];
    }
    else
    {
        return ["#e5e835","#f9fc64"];
    }
  }
  drawPlayers(players){
    for(var player in players.others)
    {
      var colors = getColors(player.team);
      context.beginPath();
      context.arc(player.position[0],player.position[1],35,2*Math.PI);
      context.stroke();
      context.fillStyle=colors[0];
      context.fill()
      context.beginPath();
      context.arc(player.position[0],player.position[1],35,2*Math.PI);
      context.stroke();
      context.fillStyle=colors[1];
      context.fill();
      context.font = "30px Arial";
      context.fillText(player.name, player.position[0]-35, player.position[1]+40);
    }
  }
  drawBases(bases)
  {
    for(base in bases)
    {
      var colors = getColors(base.team);
      context.fillStyle=colors[1];
      for(tile in base.tiles)
      {
        context.fillRect(tile[0],tile[1],30,30);
      }
    }
  }
  dropCoins(){
    emitList.push(['dropCoins',true]);
  }
  collectCoin(coinNum){
    //coinNum is some way to reference each individual coin
    emitList.push(['collectCoin',coinNum]);
  }
  movePlayer(x,y){
    emitList.push(['PlayerSpeed',[x,y]]);
  }
}
