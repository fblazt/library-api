const express = require('express');
const Router = express.Router();
const categoryController = require('../controller/category');
const cors = require('cors');

Router
    .get('/', categoryController.getCategories)
    .post('/', categoryController.insertCategory)
    .patch('/:id_category', categoryController.updateCategory)
    .delete('/:id_category', categoryController.deleteCategory);
// .post('/insert', (req, res) => res.send('ini buku ke 1'))

module.exports = Router;