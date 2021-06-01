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
        collectionId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }],
        delivery: String,
        instructions: String,
        type: String,
        firstName: String,
        lastName: String,
        emailAddress: String,
        country: String,
        streetAddress: String,
        city: String,
        county: String,
        postalCode: String,
        total: Number,
        status: String
    }, {
        timestamps: true
    })
);

module.exports = OrderHeader;