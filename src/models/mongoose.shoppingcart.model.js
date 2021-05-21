//include packages
const mongoose = require('mongoose');

//define product model
const ShoppingCart = mongoose.model(
    "ShoppingCart",
    new mongoose.Schema({
        // name: String,
        // description: String,
        // price: String,
        // image: String,
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }, {
        timestamps: true
    })
);

module.exports = ShoppingCart;