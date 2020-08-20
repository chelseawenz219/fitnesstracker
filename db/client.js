//creating an unconnected client(frontend)

const { Client } = require('pg');
//client requires postgress

const client = new Client('https://localhost:5432/fitness-dev');
//client route through localhost

module.exports = client;
//export client