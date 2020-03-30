const userModel = require('../models/user');
const MiscHelper = require('../helpers/helpers');
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: (req, res) => {
        console.log(req.query);
        userModel.getUsers()
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    registerUser: async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const {card_number, email, fullname, token, phone, role, photo, status} = req.body;
        const data = {card_number, email, fullname, password: hashedPassword, token, phone, role, photo, status, created_at: new Date()};
        userModel.registerUser(data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    // loginUser: async (req, res) => {
    //     const data = user.find(data => user.email === req.body.email)
    //     if (email == null) {
    //         return res.status(400).send('Cannot find user')
    //     }
    //     userModel.loginUser(data)
    //         .then((result) => {
    //             res.send('Login Success');
    //         })
    //         .catch(err => console.log(err));
    // },
    userDetail: (req, res) => {
        const idUser = req.params.id_user;
        userModel.userDetail(idUser)
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertUser: (req, res) => {
        const {card_number, email, fullname, password, salt, token, phone, role_id, photo, status} = req.body;
        const data = {
            card_number,
            email,
            fullname,
            password,
            salt,
            token,
            phone,
            role_id,
            photo,
            status,
            created_at: new Date(),
        };
        userModel.insertUser(data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    updateUser: (req, res) => {
        const idUser = req.params.id_user;
        const {card_number, email, fullname, password, salt, token, phone, job, address, role_id, photo, status} = req.body;
        const data = {
            card_number,
            email,
            fullname,
            password,
            salt,
            token,
            phone,
            job,
            address,
            role_id,
            photo,
            status,
            update_at: new Date(),
        };
        userModel.updateuser(idUser, data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    deleteUser: (req, res) => {
        const idUser = req.params.id_user;
        userModel.deleteUser(idUser)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    }
};