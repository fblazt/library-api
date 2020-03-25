const express = require('express');
const Router = express.Router();
Router
    .get('/admin', (req, res) => res.send('ini adalah admin'))
    .get('/1', (req, res) => res.send('ini user ke 1'));
module.exports = Router;
