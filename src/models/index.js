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
// database.post = require('./mongoose.post.model');
// database.friend = require('./mongoose.friend.model');

//define default roles
database.roleNames = ['user','administrator','moderator'];

module.exports = database;