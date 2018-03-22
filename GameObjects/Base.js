class Base extends GameObject
/***********************************
  This class is used for the 4 different bases in the map.
  ***********************************/
{
  constructor(tileArray){
    this.tiles = tileArray;
  }
  takeDamage(dmg){
    //TODO add serverside connection to let base take damage
  }
  takeGold(dmg){
    //TODO add serverside connection to let base take gold
  }
}
