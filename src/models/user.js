const connection = require('../configs/db');

module.exports = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user ORDER BY fullname", (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    registerUser: (data) => {
        return new Promise((resolve, reject) => {
            if(data) {
                connection.query("INSERT INTO user SET ?", data, (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            }
        });
    },
    loginUser: (data) => {
        return new Promise((resolve, reject) => {
            if(data) {
                connection.query("CHECK INTO user set ?", data, (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            }
        });
    },
    userDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT user.*, category.name_category FROM user INNER JOIN category ON user.id_category = category.id WHERE user.id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertuser: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO user SET ?", data, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateuser: (id_user, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE user SET ? WHERE id= ?", [data, id_user], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteuser: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM user WHERE id = ?", id, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};