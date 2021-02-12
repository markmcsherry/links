// Base routes
const express = require('express');
const routes = express();
const formidable = require('formidable');

routes.get('/', (req, res) => {
  res.render("index");
});


routes.get('/login', (req, res) => {
  res.render("login");
});

routes.get('/signup', (req, res) => {
  res.render("signup");
});

routes.get('/test', (req, res) => {
  res.status(200);
  res.send('Hello World!');
});


routes.get('/upload', (req, res) => {
  res.render("upload");
});

routes.post('/fileupload', (req, res) => {
  var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.writeHead(200, {'Content-Type': 'text/html'});      
      res.write('<h1>File uploaded</h1>');
      res.write('<br>File Name: '+ files.filetoupload.name);
      res.write('<br>File Type: '+ files.filetoupload.type);
      res.end();
//      console.log('fields:', fields);
      console.log('files:', files.filetoupload.name);
//      console.log('files:', files.);
    });
});

module.exports = routes;
