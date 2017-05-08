import * as express from "express";
import * as path from "path";
import * as opn from 'opn';
import * as webpack from 'webpack';
import config from '../webpack.config.dev';
import * as webpack_dev_middleware from 'webpack-dev-middleware';

const port = 3000;
const app = express();
console.log('testing 123');
const compiler = webpack(config);
const publicPath = config.output.publicPath;
app.use(webpack_dev_middleware(compiler, {
    noInfo: true,
    publicPath:''
}));
app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '../src/index.html'));
});
app.listen(port, (err: any) => {
    if (err)
        console.log(err);
    else
        opn('http://localhost:' + port);
})