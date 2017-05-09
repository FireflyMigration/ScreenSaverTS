

let images = ['/1.jpg', '/99.jpg', '/2.jpg', '/3.jpg', '/4.jpg'];
let position = -1;
function getNextImage(callback: (path: string) => void): void {
    fetch('/nextImage').then(r =>r.text(), err => console.log(err)).then(callback);
    
}

export class myImage {
    private image = new Image();
    constructor(private container: HTMLElement) {

    }

    startWork(readyToShow: (show: () => void) => void): void {
        getNextImage(src => {
            this.image.onload = () => {
                if (this.image.naturalHeight > this.image.naturalWidth) { 
                    this.image.style.height    = "85%";
                    this.image.style.width = 'auto';
                } else {
                    this.image.style.width = "95%";
                    this.image.style.height = 'auto';
                }
                this.image.style.opacity = '0';


                readyToShow(() => {
                    this.zoom(this.image);
                    this.fadeIn(this.image);
                    this.container.appendChild(this.image);
                    this.image.style.marginTop = ((this.container.clientHeight - this.image.height) / 2).toString() + "px";
                    let nextImageTimer = setInterval(() => {
                        this.otherImage.startWork(x => {
                            this.fadeOut(this.image, () => {
                                this.image.remove();
                                clearInterval(this.zoomTimer);
                                x();
                            });
                        });
                        clearInterval(nextImageTimer);
                    }, 3000);

                });


            };
            this.image.onerror = err => {
                this.startWork(readyToShow);
            };
            this.image.src = src;
        });
    }
    private otherImage: myImage;
    setOtherImage(i: myImage): void {
        this.otherImage = i;
        if (i.otherImage == null)
            i.setOtherImage(this);
    }



    private zoomTimer: any;
    private zoom(element: HTMLElement) {
        var scale = 1;
        var pixel = 1;
        this.zoomTimer = setInterval(function () {
            scale += 0.0001;
            pixel += 0.01;
            element.style.transform = `scale(${scale}) translate(${pixel}px,${pixel}px)`;
        }, 10);

    }
    private fadeIn(element: HTMLElement) {
        var op = 0.1;  // initial opacity

        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op.toString();
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.05;
        }, 10);
    }
    private fadeOut(element: HTMLElement, whenDone: () => void) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);

                whenDone();
            }
            element.style.opacity = op.toString();
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }
}