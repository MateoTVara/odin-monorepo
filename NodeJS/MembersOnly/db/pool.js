const { Pool } = require('pg');
const { DB_CONNECTION_STRING } = require('./config');

module.exports = new Pool({ connectionString: DB_CONNECTION_STRING });