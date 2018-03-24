public class Game
{
  constructor(canvas, team, room, playerName){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
    this.canvas = canvas;
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
    var coins = data.coins;
    for(var coin in coins)
    {
      var gold = new Image();
      gold.src = 'https://i.pinimg.com/originals/f3/2f/7a/f32f7ac408007a11a311575f94438c19.jpg';
      gold.width = 40;
      gold.height = 40;
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
