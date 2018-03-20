class Base extends GameObject
/***********************************
  This class is used for the 4 different bases in the map.
  ***********************************/
{
  this.health = 100;
  this.gold = 0;
  this.timeSinceDMG = -1; // timeSinceDMG is the time since the base last took
  //damage
  this.growthAdder = 1;
  constructor(team, h, g){
    this.health=h!=undefined ? h : this.health;
    this.gold = g!=undefined ? g : this.gold;
    var x = (team=="Red"||team=="Blue") ? 0 : 10000;
    var y = (team=="Red"||team=="Green") ? 0 : 10000;
    super(x, y, "C:\Users\Alex\Desktop\Hivez\images\Base"+team, 20, 20);
  }
  takeDamage(dmg){
    this.timeSinceDMG = 0;
    this.health-=dmg;
  }
  takeGold(gld){
    if(this.gold-gld >=0){//If the gold coffer can be taken from
      this.gold-=gld;
      return gld;
    }
    else {//If the gold coffer will be emptied
      this.gold=0;
      return gld-this.gold;
    }
  }
  heal()/*
    Heals the base. Called every frame. Healing increases as the
    timeSinceDMG increases
    */
  {
    this.health+=this.timeSinceDMG*0.1;
  }
  addGold(gld)
  {
    this.gold+=gld;

  }
}
