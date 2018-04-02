const gameObject = require("./GameObject.js");
module.exports = class Base extends GameObject
/***********************************
  This class is used for the 4 different bases in the map.
  ***********************************/
{
  this.tiles = [];
  constructor(team){
    this.team = team;
  }
  tileTakeDamage(coords, dmg){
    this.tiles.takeDamage(coords,dmg);
  }
  takeGold(dmg){
    //TODO add serverside connection to let base take gold
  }
}
