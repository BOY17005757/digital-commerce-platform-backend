//include packages
const mongoose = require('mongoose');

//define order type model
const OrderType = mongoose.model(
    "OrderType",
    new mongoose.Schema({
        name: String
    }, {
        timestamps: true
    })
);

module.exports = OrderType;