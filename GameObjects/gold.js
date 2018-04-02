const gameObject = require("./GameObject.js");
module.exports = class Gold extends GameObject
{
  this.defImg = "./public/images/gold.jpg";
  constructor(x, y, w, h){
    super(x,y,defImg, w,h);
  }
}
