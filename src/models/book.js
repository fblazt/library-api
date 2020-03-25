const connection = require('../configs/db');

module.exports = {
    getBooks: (search) => {
        return new Promise((resolve, reject) => {
            if(search) {
                connection.query("SELECT * FROM book WHERE title LIKE ?", `%${search}%`, (err, result) => {
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
    bookDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT book.*, category.name_category FROM book INNER JOIN category ON book.id_category = category.id WHERE book.id = ?", id, (err, result) => {
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
    updateBook: (id_book, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE book SET ? WHERE id= ?", [data, id_book], (err, result) => {
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
            connection.query("DELETE FROM book WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};