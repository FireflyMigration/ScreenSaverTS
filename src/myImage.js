"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNextImage(callback) {
    fetch('/nextImage').then(function (r) { return r.text(); }, function (err) { return console.log(err); }).then(callback);
}
var myImage = (function () {
    function myImage(container) {
        var _this = this;
        this.container = container;
        this.image = new Image();
        this.transitionEnd = function () { };
        this.image.addEventListener(whichTransitionEvent(), function (e) {
            _this.transitionEnd();
        });
        this.image.style.position = 'absolute';
        this.image.style.transitionTimingFunction = 'linear';
        this.container.appendChild(this.image);
    }
    myImage.prototype.startWork = function (readyToShow) {
        var _this = this;
        getNextImage(function (src) {
            _this.image.onload = function () {
                if (_this.image.naturalHeight > _this.image.naturalWidth) {
                    _this.image.style.height = "85%";
                    _this.image.style.width = 'auto';
                }
                else {
                    _this.image.style.width = "95%";
                    _this.image.style.height = 'auto';
                }
                _this.image.style.opacity = '0';
                readyToShow(function () {
                    _this.image.style.top = '0';
                    _this.image.style.left = '0';
                    _this.zoom(_this.image);
                    _this.fadeIn(_this.image);
                    if (_this.image.height < _this.container.clientHeight)
                        _this.image.style.top = ((_this.container.clientHeight - _this.image.height) / 2) + "px";
                    if (_this.image.width < _this.container.clientWidth)
                        _this.image.style.left = ((_this.container.clientWidth - _this.image.width) / 2) + "px";
                    var nextImageTimer = setInterval(function () {
                        _this.otherImage.startWork(function (x) {
                            _this.fadeOut(_this.image, function () {
                                _this.image.style.transform = '';
                            });
                            x();
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
        element.style.transform = 'scale(1)';
        var t = setTimeout(function () {
            element.style.transition = 'opacity 1s,transform 5s';
            element.style.transform = 'scale(1.1) translate(20px,-20px)';
            clearTimeout(t);
        }, 5);
    };
    myImage.prototype.fadeIn = function (element) {
        element.style.opacity = '0';
        var t = setTimeout(function () {
            element.style.transition = 'opacity 1s,transform 5s';
            element.style.opacity = '1';
            clearTimeout(t);
        }, 15);
    };
    myImage.prototype.fadeOut = function (element, whenDone) {
        var _this = this;
        element.style.transition = 'opacity 1s,transform 5s';
        this.transitionEnd = function () {
            whenDone();
            _this.transitionEnd = function () { };
        };
        element.style.opacity = '0';
    };
    return myImage;
}());
exports.myImage = myImage;
function whichTransitionEvent() {
    var el = document.createElement('fakeelement');
    var transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd',
    };
    for (var t in transitions) {
        if (el.style.hasOwnProperty(t)) {
            return transitions[t];
        }
    }
    return '';
}
//# sourceMappingURL=myImage.js.map