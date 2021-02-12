"use strict";
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    avatar: String,
    active: Boolean
  });

module.exports = mongoose.model('User', userSchema);