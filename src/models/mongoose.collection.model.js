//include packages
const mongoose = require('mongoose');

//define collection model
const Collection = mongoose.model(
    "Collection",
    new mongoose.Schema({
        dateTimeFrom: String,
        dateTimeTo: String
    }, {
        timestamps: true
    })
);

module.exports = Collection;