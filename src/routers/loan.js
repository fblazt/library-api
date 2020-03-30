const express = require('express');
const Router = express.Router();
const loanController = require('../controller/loan');
const cors = require('cors');

Router
    .get('/', loanController.getLoans)
    .post('/', loanController.insertLoan);
// .patch('/:id_loan', loanController.updateLoan)
// .delete('/:id_loan', loanController.deleteLoan);

module.exports = Router;