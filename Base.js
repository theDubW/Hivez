class Base extends GameObject
{
  constructor(health, team, gold)
  {
    var x = (team=="Red"||team=="Blue") ? 0 : 10000;
    var y = (team=="Red"||team=="Green") ? 0 : 10000;
    super(x, y, "C:\Users\Alex\Desktop\Hivez\images\Base"+team, 20, 20);
  }
}
