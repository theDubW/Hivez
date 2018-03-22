window.addEventListener('keydown', function(e){ // listens for keypresses, left, right, up, down, and e
  var keyCode = e.keyCode;
  switch(keyCode)
  {
    case 37:
      
  }
	if(e.keyCode == 37){ //left
		playerXSpeed = -4;
		playerYSpeed = 0;
	}
	if(e.keyCode == 39){ //right
		playerXSpeed = 4;
		playerYSpeed = 0;
	}
	else if(e.keyCode == 38){ //up
		playerYSpeed = -4;
		playerXSpeed = 0;
	}
	else if(e.keyCode == 40){ //down
		playerYSpeed = 4;
		playerXSpeed = 0;
	}
	if(e.keyCode == 69){//when you press e you drop your coins by your base
		dropCoins();
		goldAmount=0;
	}




});
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
  incSpeed(speed){
    this.speed += speed;
  }
  setSpeed(speed){
    this.speed = speed;
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
