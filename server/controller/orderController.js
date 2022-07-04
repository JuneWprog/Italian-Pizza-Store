var Order = require('../models/orderModel');
var User = require('../models/userModel');
var ObjectId = require('mongoose').Types.ObjectId;

exports.createOrder = async function (req, res) {
    try {
        let userEmail = req.body.userEmail;
        const user = await User.findOne({ email: userEmail });
        const orderDetails = await new Order({
            "userId": user._id,
            "totalPrice": req.body.totalPrice,
            "address": req.body.address,
            "dishes": req.body.dishes,
            "subTotal": req.body.subTotal,
            "taxPrice": req.body.taxPrice,
            "shippingPrice": req.body.shippingPrice,
        }).save();
        res.json(orderDetails);
    } catch (error) {
        res.status(500).json({
            "orderError": "Something went wrong!"
        });
    }
};

exports.getOrders = async function (req, res) {
    try {
        let userEmail = req.body.email;
        const user = await User.findOne({ email: userEmail });
        const orders = await Order.find({ userId: user._id }).sort({"createdOn": -1});
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            "orderError": "Something went wrong!"
        });
    }
};

exports.getOrderDetails = async function (req, res) {
    try {
        let userEmail = req.body.email;
        const orders = await Order.findOne({ _id: ObjectId(req.params.orderId) }).populate("userId");
        if (orders && userEmail === orders.userId.email) {
            res.json(orders);
        } else {
            res.status(422).json({ "orderError": "Unauthorized Access!" });
        }
    } catch (error) {
        res.status(500).json({
            "orderError": "Something went wrong!"
        });
    }
};