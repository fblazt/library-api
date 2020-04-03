const categoryModel = require('../models/category');
const MiscHelper = require('../helpers/helpers');

module.exports = {
    getCategories: (req, res) => {
        console.log(req.query);
        categoryModel.getCategories()
            .then((result) => {
                MiscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
    },
    insertCategory: (req, res) => {
        const {name_category} = req.body;
        const data = {name_category};
        categoryModel.insertCategory(data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    updateCategory: (req, res) => {
        const idCategory = req.params.id_category;
        const {name_category} = req.body;
        const data = {name_category};
        categoryModel.updateCategory(idCategory, data)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    },
    deleteCategory: (req, res) => {
        const idCategory = req.params.id_category;
        categoryModel.deleteCategory(idCategory)
            .then((result) => {
                res.send(result);
            })
            .catch(err => console.log(err));
    }
};