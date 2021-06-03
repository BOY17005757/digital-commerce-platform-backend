//include packages
const mongoose = require('mongoose');

//define contact model
const Contact = mongoose.model(
    "Contact",
    new mongoose.Schema({
        name: String,
        emailAddress: String,
        message: String,
        userId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    }, {
        timestamps: true
    })
);

module.exports = Contact;