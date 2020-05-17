const express = require('express');
const Router = express.Router();
const userController = require('../controller/user');
const cors = require('cors');
const Auth = require('../helpers/auth')

Router
    .get('/', userController.getUsers)
    .get('/activate', userController.userActivate)
    .post('/', userController.insertUser)
    .post('/login', userController.loginUser)
    .post('/register', userController.registerUser)
    .get('/:id_user', userController.userDetail)
    .patch('/:id_user', userController.updateUser)
    .delete('/:id_user', userController.deleteUser);
module.exports = Router;