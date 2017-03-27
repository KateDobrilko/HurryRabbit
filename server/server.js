import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import path from 'path';

import config from './config';

import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

const app = express();

const compiler = webpack(webpackConfig);

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
    if (err) {
        throw err
    }
    console.log("Mongo connected");
});

app.listen(config.port, err => {
    if (err) throw err;
    console.log(`Server listening on port ${config.port}`);
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: true,
    saveInitialized: true,
    secret: config.secret
}));

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use('/api', authRoute);
app.use('/api',  checkToken, userRoute);
app.use(getUser);
app.use('/api', checkToken, pageRoute);




app.use(errorHandler);