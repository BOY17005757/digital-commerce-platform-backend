//include packages
const { response } = require('express');
const mongoose = require('mongoose');

//async mongoose
mongoose.Promise = global.Promise;

//define database object
const database = {};

database.mongoose = mongoose;

//require mongoose models
database.user = require('./mongoose.user.model');
database.role = require('./mongoose.role.model');
database.product = require('./mongoose.product.model');
database.site = require('./mongoose.site.model');
database.shoppingcart = require('./mongoose.shoppingcart.model');
database.orderheader = require('./mongoose.orderheader.model');
database.orderline = require('./mongoose.orderline.model');
database.collection = require('./mongoose.collection.model');

//define default roles
database.roleNames = ['customer','administrator'];

module.exports = database;