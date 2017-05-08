"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
exports.default = {
    devtool: 'inline-source-map',
    entry: [path.resolve(__dirname, 'src/index')],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }],
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] }
};
//# sourceMappingURL=webpack.config.dev.js.map