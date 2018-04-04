const GameObject = require("./GameObject.js");
module.exports = class Player extends GameObject
{
  constructor(playerId, team, x, y, width, height, name, img, gold)
  {
    super(x,y,img||"./images/Bart.gif", width||10, height||10);
    this.health = 100;
    this.gold = gold || 0;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.playerXSpeed = 4;
    this.playerYSpeed = 4;
    this.team = team;
    this.playerId = playerId;
    this.name=name;
    this.orientation = 0;
  }
  incHealth(num)
  {
    this.health+=num;
  }
  updatePosition(){
    if(this.pressingRight == true){
      this.x += this.playerXSpeed;
    }
    if(this.pressingLeft == true){
      this.x -= this.playerXSpeed;
    }
    if(this.pressingUp == true){
      this.y -= this.playerYSpeed;
    }
    if(this.pressingDown == true){
      this.y += this.playerYSpeed;
    }
  }
  incGold(g)
  {
    this.gold+=g;
  }
}
