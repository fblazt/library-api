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
                connection.query("SELECT * FROM user WHERE email = ?", data, (err, result) => {
                    if(!err) {
                        resolve(result);
                    } else {
                        reject(new Error(err));
                    }
                });
            }
        });
    },
    userDetail: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM user WHERE id_user = ?", idUser, (err, result) => {
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
    updateuser: (idUser, data) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE user SET ? WHERE id_user = ?", [data, idUser], (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteuser: (idUser) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM user WHERE id_user = ?", idUser, (err, result) => {
                if(!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};