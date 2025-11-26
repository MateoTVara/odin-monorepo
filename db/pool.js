const { Pool } = require('pg');
const { env } = require('node:process');

require('dotenv').config();
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

module.exports = pool;