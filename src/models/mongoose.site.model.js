//include packages
const mongoose = require('mongoose');

//define site model
const Site = mongoose.model(
    "Site",
    new mongoose.Schema({
        name: String,
        description: String,
    }, {
        timestamps: true
    })
);

module.exports = Site;