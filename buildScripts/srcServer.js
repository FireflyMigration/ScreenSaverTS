"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var opn = require("opn");
var webpack = require("webpack");
var fs = require("fs");
var webpack_config_dev_1 = require("../webpack.config.dev");
var webpack_dev_middleware = require("webpack-dev-middleware");
var config_1 = require("../config");
var port = 3000;
var app = express();
console.log('testing 123');
var compiler = webpack(webpack_config_dev_1.default);
var output = webpack_config_dev_1.default.output || { publicPath: "./some/default/path" };
var publicPath = output.publicPath || '/';
app.use(webpack_dev_middleware(compiler, {
    noInfo: true,
    publicPath: publicPath
}));
var images = [];
function readDir(dir, prefix) {
    fs.readdir(dir, function (err, files) {
        files.forEach(function (s) {
            var relativePath = prefix + '/' + s;
            var fullName = path.join(dir, s);
            if (config_1.default.extentions.indexOf(path.extname(s).toLowerCase()) >= 0)
                images.push(fullName);
            if (fs.lstatSync(fullName).isDirectory())
                readDir(fullName, relativePath);
        });
    });
}
config_1.default.folders.forEach(function (f) {
    readDir(f, '');
});
var position = -1;
function getNextImage(callback) {
    position = Math.floor(Math.random() * images.length + 1);
    console.log(position);
    if (position >= images.length)
        position = 0;
    callback(position.toString());
}
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});
app.get('/nextImage', function (req, res) {
    getNextImage(function (s) { res.send(s); console.log(s); });
});
app.get('/*', function (req, res) {
    res.sendFile(images[+req.url.substring(1)]);
});
app.listen(port, function (err) {
    if (err)
        console.log(err);
    else
        opn('http://localhost:' + port);
});
//# sourceMappingURL=srcServer.js.map