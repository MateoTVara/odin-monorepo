const { Client } = require('pg');
const { argv, exit } = require('node:process');
const { DB_CONNECTION_STRING } = require('./config');

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR ( 255 ),
  last_name VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  is_member BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_users
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE "user_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");
`;

const usage = () => {
  console.log('Usage: node db/populatedb.js <connection-string>');
  console.log('Examples:');
  console.log('  node db/populatedb.js "postgresql://postgres:root@localhost:5432/local_db"');
  console.log('  node db/populatedb.js "postgresql://user:pass@prod-host:5432/prod_db"');
}

const main = async () => {
  console.log('seeding...');
  const client = new Client({ connectionString: argv[2] || DB_CONNECTION_STRING });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (error) {
    console.error('Error seeding DB:', error.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

if (argv.includes('--help') || process.argv.includes('-h')) {
  usage();
  exit();
}

main();