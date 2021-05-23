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
// database.post = require('./mongoose.post.model');
// database.friend = require('./mongoose.friend.model');

//define default roles
database.roleNames = ['customer','administrator'];

module.exports = database;