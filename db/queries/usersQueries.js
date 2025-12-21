const pool = require('../pool');

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object>} Promise that resolves to a User object
 */
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const { rows:[user] } = await pool.query(query, values);
  return user;
}

/**
 * Get user by username
 * @param {string} username - Username
 * @returns {Promise<Object>} Promise that resolves to a User object
 */
const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const { rows:[user] } = await pool.query(query, values);
  return user;
}

/**
 * Insert a new user
 * @param {Object} param0 - User data
 * @param {string} param0.first_name - First name
 * @param {string} param0.last_name - Last name
 * @param {string} param0.username - Username
 * @param {string} param0.password - Hashed password
 * @returns {Promise<Object>} Promise that resolves to the newly inserted user
 */
const insert = async ({ first_name, last_name, username, password }) => {
  const query = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [first_name, last_name, username, password];
  const { rows:[user] } = await pool.query(query, values);
  return user;
}

module.exports = {
  getUserById,
  getUserByUsername,
  insert,
}