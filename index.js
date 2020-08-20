//where front-end server reqs are processed..?
//

const express = require('express');
const server = express();
//pull in and instantiate express server.


const client = require('./db/client.js');
client.connect();
//connect to database--?

const morgan = require('morgan'); 

const { PORT = 8072 } = process.env;

//logging middleware -- 
//this logs http reqs made to our server.
server.use(morgan('dev'));
//parsing middleware -- what does this do?
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//router: /API
server.use('/API', require('./api'));


server.listen(PORT, () =>{
    console.log("Server can hear you...");
});