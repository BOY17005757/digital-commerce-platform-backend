//include packages
const mongoose = require('mongoose');

//define product model
const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        description: String,
        price: String,
        status: Boolean,
    }, {
        timestamps: true
    })
);

module.exports = Product;