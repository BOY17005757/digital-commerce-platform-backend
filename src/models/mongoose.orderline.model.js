//include packages
const mongoose = require('mongoose');

//define order line model
const OrderLine = mongoose.model(
    "OrderLine",
    new mongoose.Schema({
        headerId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderHeader"
        }],
        productId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        quantity: Number,
        price: Number,
        total: Number
    }, {
        timestamps: true
    })
);

module.exports = OrderLine;