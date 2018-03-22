public class Game
{
  constructor(team, room, player){
    this.map = getMap(player);
    this.team = team;
    this.room = room;
    this.player = player;
  }
  draw(){
    //TODO implement draw method so that it checks how everything has moved
  }
  getMap(player){
    //TODO send the server the player's x and y to the server and returns the map
  }
}
