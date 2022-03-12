const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

const { notFound, errorHandler } = require('./../middleware/errorMiddleware');

const connectDB = require('../config/db');

dotenv.config();

app.use(cors());

connectDB();

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status : 200,
        message: 'API is OK'
    })
});



app.use(notFound);
app.use(errorHandler);

module.exports = app;