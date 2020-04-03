const loanModel = require('../models/loan');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    getLoans: (req, res) => {
        const idUser = req.query.id_user;
        const idBook = req.query.id_book;
        console.log(req.query);
        loanModel.getLoans(idUser, idBook)
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertLoan: (req, res) => {
        const {id_user, id_book} = req.body;
        const data = {id_user, id_book, borrow_date: new Date()};
        loanModel.insertLoan(data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    updateLoan: (req, res) => {
        const idLoan = req.params.id_loan;
        const {status, limit_charge } = req.body;
        const data = {status, limit_charge};
        LoanModel.updateLoan(idLoan, data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    deleteLoan: (req, res) => {
        const idLoan = req.params.id_loan;
        loanModel.deleteLoan(idLoan)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    }
};