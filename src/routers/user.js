const express = require('express');
const Router = express.Router();
const userController = require('../controller/user');
const cors = require('cors');

Router
    .get('/', userController.getUsers)
    .get('/:id_user', userController.userDetail)
    .post('/', userController.insertUser)
    .post('/register', userController.registerUser)
    .patch('/:id_user', userController.updateUser)
    .delete('/:id_user', userController.deleteUser)
    .post('/login', userController.loginUser);
module.exports = Router;
