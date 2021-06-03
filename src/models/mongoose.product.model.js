//include packages
const mongoose = require('mongoose');

//define product model
const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        status: { 
            type: Boolean,
            default: true 
        }
    }, {
        timestamps: true
    })
);

module.exports = Product;