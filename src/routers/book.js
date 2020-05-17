const express = require('express');
const Router = express.Router();
const bookController = require('../controller/book');
const cors = require('cors');
const multer = require('multer');
// const redisHelper = require('../helpers/redis')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage
})

Router
  .get('/', bookController.getBooks)
  .post('/', upload.single('image'), bookController.insertBook)
  .get('/:id_book', bookController.bookDetail)
  .patch('/:id_book', bookController.updateBook)
  .delete('/:id_book', bookController.deleteBook);

module.exports = Router;