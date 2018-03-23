public class Game
{
  constructor(team, room, playerName,x ,y){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
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
        case 38:
          movePlayer(0,-4);
      }
    	if(e.keyCode == 37){ //left
    		playerXSpeed = -4;
    		playerYSpeed = 0;
    	}
    	if(e.keyCode == 39){ //right
    		playerXSpeed = 4;
    		playerYSpeed = 0;
    	}
    	else if(e.keyCode == 38){ //up
    		playerYSpeed = -4;
    		playerXSpeed = 0;
    	}
    	else if(e.keyCode == 40){ //down
    		playerYSpeed = 4;
    		playerXSpeed = 0;
    	}
    	if(e.keyCode == 69){//when you press e you drop your coins by your base
    		dropCoins();
    		goldAmount=0;
    	}




    });
  }
  draw(){
    //TODO implement draw method so that it checks how everything has moved
  }
  getMap(player){
    //TODO send the server the player's x and y to the server and returns the map
  }
}
