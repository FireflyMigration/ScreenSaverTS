import * as path from 'path';
import * as webpack from 'webpack';

export default  {
    devtool: 'inline-source-map',
    
    entry: [path.resolve(__dirname, 'src/index')],
    target:"web",
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
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    
} as webpack.Configuration;

