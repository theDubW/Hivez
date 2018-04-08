const gameObject = require("./GameObject.js");
module.exports = class Gold extends gameObject
{
  constructor(x, y){
    super(x,y,"./public/images/gold.jpg", 40,40);
  }
}
