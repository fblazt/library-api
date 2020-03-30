const connection = require('../configs/db');

module.exports = {
    getBooks: (search, sort, seq, page) => {
        return new Promise((resolve, reject) => {
            if(search) {
                connection.query("SELECT * FROM book WHERE title LIKE ? OR description LIKE ?", [`%${search}%`, `%${search}%`], (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            } else if(sort, seq) {
                connection.query("SELECT * FROM book ORDER BY " + sort + " " + seq, (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            } else if(page) {
                connection.query("SELECT * FROM book ORDER BY id_book LIMIT " + (page * 4 - 4) + ", 4", (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            } else {
                connection.query("SELECT * FROM book", (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            }
        });
    },
    bookDetail: (idBook) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT book.*, category.name_category FROM book INNER JOIN category ON book.id_category = category.id_category WHERE book.id_book = ?", idBook, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertBook: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO book SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateBook: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE book SET ? WHERE id_book= ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteBook: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM book WHERE id_book = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};