const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const route = require('./src/routers/index.js');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use('/uploads', express.static('./uploads'));
app.use('/api/v1/', route);
app.listen(process.env.PORT, () => {
    console.log(`App Listen post ${process.env.PORT}`);
});