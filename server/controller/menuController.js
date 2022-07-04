var Dish = require('../models/dishModel');
var DishCategory = require("../models/dishCategoryModel");

exports.showMenu = async function (req, res) {
    try {
        const results = await DishCategory.find();
        res.json(results);
    } catch (error) {
        res.status(500).json({
            "menuError": "Something went wrong!"
        });
    }
};

exports.showMenuForCategory = async function (req, res) {
    try {
        const result = await DishCategory.findOne({ link: req.params.category });
        if(result){
            const menu = await Dish.find({ category: result._id });
            res.json(menu);
        }
    } catch (error) {
        res.status(500).json({
            "menuError": "Something went wrong!"
        });
    }
};