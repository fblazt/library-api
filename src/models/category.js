const connection = require('../configs/db');

module.exports = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM category ORDER BY name_category", (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            })
        });
    },
    insertCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO category SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateCategory: (id, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE category SET ? WHERE id_category= ?", [data, id], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM category WHERE id_category = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};