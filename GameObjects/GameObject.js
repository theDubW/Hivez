class GameObject
{
  constructor(x, y, img, w, h)
  {
    this.x= x;
    this.y= y;
    this.imgSrc = img;
    this.width = w;
    this.height = h;
  }
  setX(x)
  {
    this.x = x;
  }
  setY(y)
  {
    this.y= y ;
  }
  setImg(img)
  {
    this.imgSrc = img;
  }
  move(x, y)
  {
    this.x=x;
    this.y=y;
  }
}
