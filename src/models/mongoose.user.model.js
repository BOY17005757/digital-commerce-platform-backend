//include packages
const mongoose = require('mongoose');

//define user model
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        emailAddress: String,
        //password not returned in query by default
        password: {
            type: String,
            select: false
        },
        roleNames: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    }, {
        timestamps: true
    })
);

module.exports = User;