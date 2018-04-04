const GameObject = require("./GameObject.js");
module.exports = class Player extends GameObject
{
  constructor(playerId, team, x, y, width, height, name, img, gold)
  {
    super(x,y,img||"./public/images/Bart.gif", width||10, height||10);
    this.health = 100;
    this.gold = 0;
    this.pressingRight = false;
    this.pressingLeft = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.playerXSpeed = 4;
    this.playerYSpeed = 4;
    /*
      Here I check to see if all of the parameters of the constructor
      have been met, if not then I keep the default values as they
      are.
    */
    this.team = team;
    this.playerId = playerId;
    img = typeof(img)==undefined ? this.defImg : img;
    this.gold = typeof(gold)==undefined ? this.gold : gold;
    this.name=name;
    this.orientation = Math.random()*360;
      }
  incHealth(num)
  {
    this.health+=num;
  }
  updatePosition(){
    if(this.pressingRight == true){
    //  this.playerXSpeed = 4;
    //  this.playerYSpeed = 0;
      this.x += this.playerXSpeed;
    }
    if(this.pressingLeft == true){
    //  this.playerXSpeed = 4;
    //  this.playerYSpeed = 0;
      this.x -= this.playerXSpeed;
    }
    if(this.pressingUp == true){
    //  this.playerYSpeed = 4;
    //  this.playerXSpeed = 0;
      this.y -= this.playerYSpeed;
    }
    if(this.pressingDown == true){
    //  this.playerYSpeed = 4;
    //  this.playerXSpeed = 0;
      this.y += this.playerYSpeed;

    }
  }
  incGold(g)
  {
    this.gold+=g;
  }
}
