const bookModel = require('../models/book');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    getBooks: (req, res) => {
        const search = req.query.search;
        const sort = req.query.sort;
        const seq = req.query.seq;
        const page = req.query.page;
        console.log(req.query);
        bookModel.getBooks(search, sort, seq, page)
            .then((result) => {
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
        const {title, description, image, author, status, id_category} = req.body;
        const data = {
            title,
            description,
            image,
            author,
            status,
            id_category,
            created_at: new Date(),
        };
        bookModel.insertBook(data)
            .then((result) => {
                res.send(result);
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