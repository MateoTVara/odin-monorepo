const bcryptjs = require('bcryptjs');
const { argv, exit } = require('node:process');

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(`
  Usage: node printHashedPassword.cjs <password>

  This script takes a plaintext password as an argument and prints its hashed version using bcryptjs.

  Example:
    node printHashedPassword.cjs mysecretpassword
  `);
  exit(0);
}

const password = argv[2];
const saltRounds = 10;

const hashedPassword = bcryptjs.hashSync(password, saltRounds);

console.log(`Hashed Password:\n${hashedPassword}`);
