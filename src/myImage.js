"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var images = ['/1.jpg', '/99.jpg', '/2.jpg', '/3.jpg', '/4.jpg'];
var position = -1;
function getNextImage(callback) {
    fetch('/nextImage').then(function (r) { return r.text(); }, function (err) { return console.log(err); }).then(callback);
}
var myImage = (function () {
    function myImage(container) {
        this.container = container;
        this.image = new Image();
    }
    myImage.prototype.startWork = function (readyToShow) {
        var _this = this;
        getNextImage(function (src) {
            _this.image.onload = function () {
                _this.image.style.width = "95%";
                _this.image.style.height = 'auto';
                _this.image.style.opacity = '0';
                readyToShow(function () {
                    _this.zoom(_this.image);
                    _this.fadeIn(_this.image);
                    _this.container.appendChild(_this.image);
                    _this.image.style.marginTop = ((_this.container.clientHeight - _this.image.height) / 2).toString() + "px";
                    var nextImageTimer = setInterval(function () {
                        _this.otherImage.startWork(function (x) {
                            _this.fadeOut(_this.image, function () {
                                _this.image.remove();
                                clearInterval(_this.zoomTimer);
                                x();
                            });
                        });
                        clearInterval(nextImageTimer);
                    }, 3000);
                });
            };
            _this.image.onerror = function (err) {
                _this.startWork(readyToShow);
            };
            _this.image.src = src;
        });
    };
    myImage.prototype.setOtherImage = function (i) {
        this.otherImage = i;
        if (i.otherImage == null)
            i.setOtherImage(this);
    };
    myImage.prototype.zoom = function (element) {
        var scale = 1;
        var pixel = 1;
        this.zoomTimer = setInterval(function () {
            scale += 0.0001;
            pixel += 0.01;
            element.style.transform = "scale(" + scale + ") translate(" + pixel + "px," + pixel + "px)";
        }, 10);
    };
    myImage.prototype.fadeIn = function (element) {
        var op = 0.1; // initial opacity
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op.toString();
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.05;
        }, 10);
    };
    myImage.prototype.fadeOut = function (element, whenDone) {
        var op = 1; // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                whenDone();
            }
            element.style.opacity = op.toString();
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    };
    return myImage;
}());
exports.myImage = myImage;
//# sourceMappingURL=myImage.js.map