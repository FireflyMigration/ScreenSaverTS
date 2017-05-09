import * as express from "express";
import * as path from "path";
import * as opn from 'opn';
import * as webpack from 'webpack';
import * as fs from 'fs';
import config from '../webpack.config.dev';
import * as webpack_dev_middleware from 'webpack-dev-middleware';
import  slideConfig  from '../config';

const port = 3000;
const app = express();
console.log('testing 123');
const compiler = webpack(config);
let output = config.output || { publicPath: "./some/default/path" };

const publicPath = output.publicPath || '/';
app.use(webpack_dev_middleware(compiler, {
    noInfo: true,
    publicPath: publicPath
}));

let images: string[] = [];
function readDir(dir: string, prefix: string) {
    fs.readdir(dir, (err, files) => {
        files.forEach(s => {
            var relativePath = prefix + '/' + s;
            var fullName = path.join(dir, s);
            if (slideConfig.extentions.indexOf(path.extname(s).toLowerCase())>=0)
                images.push(fullName);
            
            if (fs.lstatSync(fullName).isDirectory())
                readDir(fullName, relativePath);

        })
    });
}
slideConfig.folders.forEach(f => { 
    readDir(f, '');
});


let position = -1;
function getNextImage(callback: (path: string) => void): void {
    position = Math.floor(Math.random() * images.length + 1);
    console.log(position);
    if (position >= images.length)
        position = 0;
    callback(position.toString());
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});


app.get('/nextImage', (req, res) => {
    getNextImage(s => { res.send(s); console.log(s); });

});
app.get('/*', (req, res) => {
    res.sendFile(images[+ req.url.substring(1)]);
});
app.listen(port, (err: any) => {
    if (err)
        console.log(err);
    else
        opn('http://localhost:' + port);
})