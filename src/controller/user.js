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
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
        const {email, fullname, photo} = req.body;
      const data = {email, fullname, password: hashedPassword, photo: 'https://i.kym-cdn.com/entries/icons/facebook/000/031/003/cover3.jpg', status: 1, created_at: new Date()};
        userModel.registerUser(data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    loginUser: (req, res) => {
      const {email, password} = req.body
      const data = {
        email, password
      }
      console.log(data.email)
      console.log(data.password)
      userModel.loginUser(data.email)
        .then((result) => {
          console.log(result)
          bcrypt.compare(req.body.password, result[0].password, (err, respass) => {
            console.log(respass)
          if (respass) {
            MiscHelper.response(res, respass, 200, `Login Success`);
          } else {
            MiscHelper.response(res, null, 400, `Password invalid`)
          }
          })
        })
        .catch((err) => {
          MiscHelper.response(res, null, 400, `Email invalid`)
        })
    },
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