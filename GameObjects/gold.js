const gameObject = require("./GameObject.js");
module.exports = class Gold extends GameObject
{
  constructor(x, y, w, h){
    this.defImg = "./public/images/gold.jpg";
    super(x,y,defImg, w,h);
  }
}
