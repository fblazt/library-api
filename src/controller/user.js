const userModel = require('../models/user');
const MiscHelper = require('../helpers/helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../configs/db')
require('dotenv').config();

module.exports = {
    getUsers: (req, res) => {
        console.log(req.query);
        userModel.getUsers()
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    // registerUser: async (req, res) => {
    //     const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    //     const {email, fullname, photo} = req.body;
    //   const data = {email, fullname, password: hashedPassword, photo: 'https://i.kym-cdn.com/entries/icons/facebook/000/031/003/cover3.jpg', status: 1, created_at: new Date()};
    //     userModel.registerUser(data)
    //         .then((result) => {
    //             res.send(result);
    //         })
    //         .catch(err => console.log(err));
    // },
    registerUser: async (req, res) => {
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
      const {email, fullname} = req.body
      const data = {
        email, 
        fullname,
        password: hashedPassword,
        photo: 'https://www.pikpng.com/pngl/m/5-53300_png-file-user-icon-clipart.png',
        status: 0,
      }
      userModel.registerUser(data)
        .then((result) => {
          console.log(result)
          result.email = data.email
          const token = jwt.sign({id: result[0].id_user, email: result[0].email}, process.env.SECRET_KEY)
          const resToken = jwt.verify(token, process.env.SECRET_KEY)
          result.token = token
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          const mailContents = {
            from: 'fdevtools@gmail.com',
            to: data.email,
            subject: 'Library Account Activation',
            html: '<p><a href="http://localhost:8000/api/v1/user/activate?token=' + token+'">Click here</a> to activate your account!</p>',
          };
          transporter.sendMail(mailContents, (err, info) => {
            if (err) {
              console.log(err)
              res.send('Activation failed!')
            } else {
              const result = {
                token: token,
                status: 'Success!',
              };
              MiscHelper.response(res, result, 200)
            }
          })
          MiscHelper.response(res, result, 200, 'Register Success, check your email to activate your account.')
        })
        .catch(err => {
          MiscHelper.response(res, err, 201, 'Register Failed!')
        })
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
            const token = jwt.sign({ id: result[0].id_user, email: result[0].email}, process.env.SECRET_KEY);
            console.log(result[0].id_user)
            bcrypt.compare(req.body.password, result[0].password, (err, respass) => {
            result[0].token = token;
            delete result[0].password;
            // console.log(respass)
            if (respass) {
              MiscHelper.response(res, result, 200, `Login Success`);
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
    },
    userActivate: (req, res) => {
      // res.send('bro');
      const token = req.query.token
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      console.log(verify);
      const status = {
        status: 1,
      };
      db.query(`UPDATE user SET status = ${status.status} WHERE id_user = ${verify.id}`, (err, result) => {
        if(err) {
          MiscHelper.response(res, err, 202, 'Failed Activation');
        }
        MiscHelper.response(res, result, 200, 'Success Activation');
      })
    }
};