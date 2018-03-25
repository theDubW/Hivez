class Player extends GameObject
{
  this.defW = 10;
  this.defH = 10;
  this.defImg = "GameImages\player.png";
  this.health = 100;
  this.gold = 0;
  constructor(playerId, team, x, y, name, img, gold)
  {
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
    super(x,y,img, this.defW,this.defH);
  }
  incHealth(num)
  {
    this.health+=num;
  }
  incGold(g)
  {
    this.gold+=g;
  }
}
