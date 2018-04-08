const gameObject = require("./GameObject.js");
module.exports = class Gold extends GameObject
{
  constructor(x, y, w, h){
    super(x,y,"./public/images/gold.jpg", w,h);
  }
}
