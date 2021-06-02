//include packages
const mongoose = require('mongoose');

//define manifest model
const Manifest = mongoose.model(
    "Manifest",
    new mongoose.Schema({
        fileName: String,
        content: JSON,
    }, {
        timestamps: true
    })
);

module.exports = Manifest;