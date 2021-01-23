"use strict";
var mongoose = require('mongoose');


var linkSchema = new mongoose.Schema({
    URL: String,
    description: String,
    userId: String
  });

module.exports = mongoose.model('Link', linkSchema);