const GameObject = require("./GameObject.js");
module.exports = class Player extends GameObject
{
  constructor(playerId, team, x, y, width, height, name, img, gold)
  {
<<<<<<< HEAD
    super(x,y,img||"./public/images/Bart.gif", width||10, height||10);
=======
    super(x,y,img || this.defImg, width, height);
    this.defW = 10;
    this.defH = 10;
    this.defImg = './images/Bart.gif';
>>>>>>> 2d78d98d63a9b89ce33cb7efc300bb672cea3993
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
<<<<<<< HEAD

=======
>>>>>>> 2d78d98d63a9b89ce33cb7efc300bb672cea3993
    }
  }
  incGold(g)
  {
    this.gold+=g;
  }
}
