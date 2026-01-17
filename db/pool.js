const { Pool } = require('pg');
const { env } = require('node:process');

// load .env only when not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, CONNECTION_STRING } = env;

const pool = CONNECTION_STRING
  ? new Pool({ connectionString: CONNECTION_STRING, ssl: { rejectUnauthorized: false } })
  : new Pool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT ? Number(DB_PORT) : undefined,
    });

module.exports = pool;