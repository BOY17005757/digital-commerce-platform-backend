//include packages
const mongoose = require('mongoose');

//define image model
const ProductImage = mongoose.model(
    "ProductImage",
    new mongoose.Schema({
        productId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        base64Image: JSON
    }, {
        timestamps: true
    })
);

module.exports = ProductImage;