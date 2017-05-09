import { myImage } from './myImage';


var playGround = document.getElementById('playground');
if (playGround) {
    

    var i1 = new myImage(playGround);
    var i2 = new myImage(playGround);
    i1.setOtherImage(i2);
    i1.startWork(x => x());
}   