'use strict';

const express = require('express');
const morgan = require('morgan'); //HTTP Logger
const config = require('config'); //Configuration helper
const baseRoutes = require("./base_routes"); 
//const graphqlHTTP = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const server = express();

  //Add GraphQL route
/*
  server.use('/graphql', graphqlHTTP (
      ));
*/




//Connect to database
console.log("Connecting to DB...");
var dbURI = config.get('dbSettings.dbURI')
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});

var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function() {
  console.log('Connected to database: ' + dbURI);
});


function serverStartup() {
  console.log('--==LINKS SERVER STARTING==--');

  //Setup gracefull shutdown
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown); 
  console.log('SIGTERM & SIGINT registered to shutdown gracefully...');  

  //Add any global middle ware
  //HTTP Logging midle-ware
  const morganFormat = config.get('expressSettings.morganFormat');
  server.use(morgan(morganFormat));
  console.log('Express HTTP request logger started with mode('+morganFormat+')!');  

  //Add in Security middleware 
  //TODO: CORS
  //TODO: HELMET

  //server.use(express.urlencoded({extended: false}));

  //TODO: Add in Serve Static

  //Add routes
  server.use("/", baseRoutes);

  //Add GraphQL route
  
  server.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
      }));
  

  const port = config.get('expressSettings.serverPort');  
  console.log('Express Server starting...');
  server.listen(port, () => {
    console.log(`Core Server listening at http://localhost:${port}`);
  });
  
}

serverStartup();

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  //TODO:Cleanup here if needed
  //Gracefull shutdown of express not required currently 
  
  console.log('Bye Bye...');
  process.exit(0);
}