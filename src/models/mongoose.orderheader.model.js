//include packages
const mongoose = require('mongoose');

//define order header model
const OrderHeader = mongoose.model(
    "OrderHeader",
    new mongoose.Schema({
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        typeId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderType"
        }],
        address: String,
        total: Number
    }, {
        timestamps: true
    })
);

module.exports = OrderHeader;