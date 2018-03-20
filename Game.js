public class Game
{
  constructor(team, room, player){
    this.team = team;
    this.room = room;
    this.player = player;
  }
  run(){
  	move();
  	draw();
  }
  move(){
  	player.checkBoundaries(); //This is an imaginary function that should be in the player class to check if its inside the boundaries
  }
  draw(){
    
  }
}
