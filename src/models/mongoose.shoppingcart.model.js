//include packages
const mongoose = require('mongoose');

//define product model
const ShoppingCart = mongoose.model(
    "ShoppingCart",
    new mongoose.Schema({
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        productId: String
    }, {
        timestamps: true
    })
);

module.exports = ShoppingCart;