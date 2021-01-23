"use strict";
var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    name: String,
    description: String,
    colorCode: String
  });

module.exports = mongoose.model('Tag', tagSchema);