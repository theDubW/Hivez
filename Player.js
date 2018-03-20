//Dude Playa is lit
class Player extends GameObject
{
  this.defW = 10;
  this.defH = 10;
  this.defImg = "GameImages\player.png";
  this.health = 100;
  this.gold = 0;
  this.weapons = new WeaponsPack();
  this.armor = new ArmorPack();
  this.coffer = 0;
  constructor(x, y, img, gold, weapons, armor)
  {
    /*
      Here I check to see if all of the parameters of the constructor
      have been met, if not then I keep the default values as they
      are.
    */
    img = typeof(img)==undefined ? this.defImg : img;
    this.gold = typeof(gold)==undefined ? this.gold : gold;
    this.weapons = typeof(weapons)==undefined ? this.weapons : weapons;
    this.armor = typeof(armor)==undefined ? this.armor : armor;
    super(x,y,img, this.defW,this.defH);
  }
  incHealth(num)
  {
    this.health+=num;
  }
  setHealth(h)
  {
    this.health = h;
  }
  setGold(g)
  {
    this.gold = g;
  }
  setWeapons(w)
  {
    this.weapons = w;
  }
  setArmor(a)
  {
    this.armor=a;
  }
  setCoffers(c)
  {
    this.coffer=c;
  }
  incCoffers(num)
  {
    this.coffer +=num;
  }
}
