
let b = new Image();
b.onload = () => {
    var playGround = document.getElementById('playground');
    if (playGround != null) {
        b.style.width = '100%';
        b.style.height = 'auto';
        playGround.appendChild(b);
        b.style.marginTop = ((playGround.clientHeight - b.height) / 2).toString() + "px";
    }
};
b.src = '/1.jpg';


