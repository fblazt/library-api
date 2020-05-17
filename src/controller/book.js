require('dotenv').config();
const bookModel = require('../models/book');
const MiscHelper = require('../helpers/helpers');
// const redis = require('redis');
// const client = redis.createClient(process.env.REDIS_PORT);

module.exports = {
    getBooks: (req, res) => {
        const search = req.query.search;
        const sort = req.query.sort;
        const seq = req.query.seq;
        const page = req.query.page;
        console.log(req.query);
        bookModel.getBooks(search, sort, seq, page)
            .then((result) => {
              // client.setex('getallbooks', 3600, JSON.stringify(result))
              MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    bookDetail: (req, res) => {
        const idBook = req.params.id_book;
        bookModel.bookDetail(idBook)
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertBook: (req, res) => {
        const {title, description, author, id_category} = req.body;
        const data = {
            title,
            description,
            author,
            image: `http://localhost:8000/uploads/${req.file.filename}`, 
            status: 1,
            id_category,
            created_at: new Date(),
        };
        bookModel.insertBook(data)
            .then((result) => {
              result.info = req.file;
              MiscHelper.response(res, result, 200); 
            })
            .catch(err => console.log(err));
    },
    updateBook: (req, res) => {
        const idBook = req.params.id_book;
        const {title, description, image, author, status, id_category} = req.body;
        const data = {
            title,
            description,
            image,
            author,
            status,
            id_category,
            update_at: new Date(),
        };
        bookModel.updateBook(idBook, data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    deleteBook: (req, res) => {
        const idBook = req.params.id_book;
        bookModel.deleteBook(idBook)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    }
};