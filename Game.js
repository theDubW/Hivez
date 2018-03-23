public class Game
{
  constructor(team, room, playerName){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
    this.socket = io.connect('http://http://10.10.149.169:1000');
    socket.on('GameCoords',visiblePlayer)
    this.player = new Player(x,y,playerName);
    window.addEventListener('keydown', function(e){ // listens for keypresses, left, right, up, down, and e
      var keyCode = e.keyCode;
      switch(keyCode)
      {
        case 37:
          movePlayer(-4,0);
          break;
        case 39:
          movePlayer(4,0);
          break;
        case 38:
          movePlayer(0,-4);
          break;
        case 40:
          movePlayer(0,4);
          break;
        case 69:
          dropCoins();
          break;
    }
    setInterval(run, 1000/30);
  }
  run(){
    socket.on('GameCoords',draw);
  }
  draw(data){
    console.log(draw);
  }
}
