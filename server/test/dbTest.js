'use strict';

//const express = require('express');
const config = require('config'); //Configuration helper

const schema = require('../schema/schema');
const mongoose = require('mongoose');
var Tag = require('../models/tag');

//const server = express();

//Connect to database
console.log("Connecting to DB...");
var dbURI = config.get('dbSettings.dbURI')
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function() {
  console.log('Connected to database: ' + dbURI);
});

//Create a new tag
const t1 = new Tag({ name: 'Hobby', description: 'Hobbies stuff to do', colorCode: 'dd00dd' });
//console.log(t1.name);

//Save the tag
t1.save(function (err, t1){
  if(err) {return console.error(err);}
  else{
    console.log("Saved a Tag: " + t1.name);
  }

});

//Find a tag by ID
const id= '6007230a77929425708988e7';
Tag.findById(id, function (err, t2) {
  if (err) return handleError(err);
  // 't2' contains the list of athletes that match the criteria.
  console.log("Find by id: " + t2.name);
})


