//include packages
const mongoose = require('mongoose');

//define shopping cart model
const ShoppingCart = mongoose.model(
    "ShoppingCart",
    new mongoose.Schema({
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        productId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        quantity: Number,
    }, {
        timestamps: true
    })
);

module.exports = ShoppingCart;