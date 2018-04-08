const gameObject = require("./GameObject.js");
module.exports = class Gold extends GameObject
{
  constructor(x, y){
    super(40,40,"./public/images/gold.jpg", w,h);
  }
}
