const express = require('express');
const book = require('./book');
const user = require('./user');
const category = require('./category');
const loan = require('./loan');

const Router = express.Router();
Router
    .use('/book', book)
    .use('/category', category)
    .use('/user', user)
    .use('/loan', loan);
// sdf
module.exports = Router;