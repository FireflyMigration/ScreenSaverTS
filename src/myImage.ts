

function getNextImage(callback: (path: string) => void): void {
    fetch('/nextImage').then(r => r.text(), err => console.log(err)).then(callback);

}

export class myImage {
    private image = new Image();
    constructor(private container: HTMLElement) {

        this.image.addEventListener(whichTransitionEvent(), (e: any) => {
            this.transitionEnd();

        });
        this.image.style.position = 'absolute';
        this.image.style.transitionTimingFunction = 'linear';
        this.container.appendChild(this.image);


    }

    transitionEnd = () => { };

    startWork(readyToShow: (show: () => void) => void): void {
        getNextImage(src => {
            this.image.onload = () => {
                if (this.image.naturalHeight > this.image.naturalWidth) {
                    this.image.style.height = "85%";
                    this.image.style.width = 'auto';
                } else {
                    this.image.style.width = "95%";
                    this.image.style.height = 'auto';
                }
                this.image.style.opacity = '0';


                readyToShow(() => {
                    this.image.style.top = '0';
                    this.image.style.left = '0';
                    
                    this.zoom(this.image);
                    this.fadeIn(this.image);
                    if (this.image.height < this.container.clientHeight)
                        this.image.style.top = ((this.container.clientHeight - this.image.height) / 2) + "px";
                    if (this.image.width < this.container.clientWidth)
                        this.image.style.left = ((this.container.clientWidth - this.image.width) / 2) + "px";


                    let nextImageTimer = setInterval(() => {
                        this.otherImage.startWork(x => {
                            this.fadeOut(this.image, () => {
                                
                                this.image.style.transform = '';


                            });
                            x();
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




    private zoom(element: HTMLElement) {
        element.style.transform = 'scale(1)';
        let t = setTimeout(() => {

            element.style.transition = 'opacity 1s,transform 5s';
            element.style.transform = 'scale(1.1) translate(20px,-20px)';
            clearTimeout(t);
        }, 5);

    }
    private fadeIn(element: HTMLElement) {
        element.style.opacity = '0';
        let t = setTimeout(() => {


            element.style.transition = 'opacity 1s,transform 5s';
            element.style.opacity = '1';
            clearTimeout(t);
        }, 15);
    }

    private fadeOut(element: HTMLElement, whenDone: () => void) {

        element.style.transition = 'opacity 1s,transform 5s';
        this.transitionEnd = () => {
            whenDone();
            this.transitionEnd = () => { };
        };
        element.style.opacity = '0';


    }
}
function whichTransitionEvent(): string {

    var el = document.createElement('fakeelement');
    var transitions: { [id: string]: string } = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd',
    }

    for (let t in transitions) {
        if (el.style.hasOwnProperty(t)) {
            return transitions[t];
        }
    }
    return '';
}
