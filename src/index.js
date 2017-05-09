"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var myImage_1 = require("./myImage");
var playGround = document.getElementById('playground');
if (playGround) {
    var i1 = new myImage_1.myImage(playGround);
    var i2 = new myImage_1.myImage(playGround);
    i1.setOtherImage(i2);
    i1.startWork(function (x) { return x(); });
}
//# sourceMappingURL=index.js.map