// Base routes
const express = require('express');
const routes = express();
const formidable = require('formidable');

routes.get('/', (req, res) => {
  res.status(200);
  res.send('Not Implemented');
});

routes.get('/test', (req, res) => {
  res.status(200);
  res.send('Hello World!');
});

routes.get('/upload', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  res.end();
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
