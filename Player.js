class Player extends GameObject
{
  constructor(x, y, img, w, h, health, gold, weapons, armor)
  {
    super(x,y,img,w,h);
    this.health = health;
    this.gold = gold;
    this.weapons = weapons;
    this.armor = armor;
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
}
