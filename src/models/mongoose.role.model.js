//include packages
const mongoose = require('mongoose');

//define role model
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    roleName: String
  }, {
    timestamps: true
  })
);

module.exports = Role;