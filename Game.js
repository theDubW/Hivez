public class Game
{
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
    setInterval(run, 1000/30);//30 times every second run() will be called
  }
  run(){//Called every frame, gets visual data from server
    socket.on('GameCoords',draw);
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
      contex.fillStyle=colors[1];
      for(tile in base.tiles)
      {
        contex.fillRect(tile[0],tile[1],30,30);
      }
    }
  }
  dropCoins(){
    socket.emit('DropCoins',true);
  }
  collectCoin(coinNum){
    //coinNum is some way to reference each individual coin
    socket.emit('CollectCoin',coinNum);
  }
  movePlayer(x,y){
    socket.emit('PlayerSpeed', [x,y]);
  }
}
