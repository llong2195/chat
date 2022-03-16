const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./../middleware/errorMiddleware');
const appRoutes = require('../routes/index');
const connectDB = require('../config/db');
const corsOptions ={
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

dotenv.config();

app.use(cors(corsOptions));
connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        status : 200,
        message: 'API is OK'
    })
});


app.get('/set-cookies', (req, res) => {
    res.cookie('username','llong');
    res.cookie('authenticated', true);
    res.json({
        status : 200,
        message: 'cookies are set'
    })
});
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json({
        status : 200,
        message: 'cookies',
        cookies : cookies
    })
});


app.use(appRoutes.authRouters);

app.use(notFound);
app.use(errorHandler);

module.exports = app;