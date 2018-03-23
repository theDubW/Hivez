public class Game
{
  constructor(team, room, playerName){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
    this.socket = io.connect('http://http://10.10.149.169:1000');
    socket.on('GameCoords',visiblePlayer)
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
    {
      [x,y],
      [x,y], etc...
    }
    players:
    {
      self_: {
        name:"MyName",
        team:"Red",
        orientation:360,
        health:100,
        gold:50
      }
      others:
      [
        {
          name:"Jack Wier",
          team:"Blue",
          orientation:400,
          health:50,
          gold:20
        }
      ]
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
    console.log(draw);
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
