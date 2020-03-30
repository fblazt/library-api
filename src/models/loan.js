const connection = require('../configs/db');

module.exports = {
    getLoans: (idUser, idBook) => {
        return new Promise((resolve, reject) => {
            if(idUser) {
                connection.query("SELECT * FROM loan_book WHERE name_loan", (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            } else if(idBook) {
                connection.query("SELECT * FROM loan_book WHERE name_loan", (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            } else {
                connection.query("SELECT * FROM loan_book", (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            }
        });
    },
    insertLoan: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO loan_book SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateloan: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE loan_book SET ? WHERE id_loan= ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteloan: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM loan_book WHERE id_loan = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};