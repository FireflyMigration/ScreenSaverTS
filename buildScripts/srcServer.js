"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var opn = require("opn");
var webpack = require("webpack");
var webpack_config_dev_1 = require("../webpack.config.dev");
var webpack_dev_middleware = require("webpack-dev-middleware");
var port = 3000;
var app = express();
var compiler = webpack(webpack_config_dev_1.default);
var publicPath = webpack_config_dev_1.default.output.publicPath;
app.use(webpack_dev_middleware(compiler, {
    noInfo: true,
    publicPath: ''
}));
app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../src/index.html'));
});
app.listen(port, function (err) {
    if (err)
        console.log(err);
    else
        opn('http://localhost:' + port);
});
//# sourceMappingURL=srcServer.js.map