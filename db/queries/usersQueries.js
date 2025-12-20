const pool = require('../pool');

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const { rows:[user] } = await pool.query(query, values);
  return user;
}

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const { rows:[user] } = await pool.query(query, values);
  return user;
}

module.exports = {
  getUserById,
  getUserByUsername,
}