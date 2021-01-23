"use strict";
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    userName: String,
    email: String
  });

module.exports = mongoose.model('User', userSchema);