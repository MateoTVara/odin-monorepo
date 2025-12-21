const pool = require('../pool');

const add = async ({ user_id, title, message }) => {
  const query = 'INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3) RETURNING *';
  const values = [user_id, title, message];
  const { rows:[newMsg] } = await pool.query(query, values);
  return newMsg;
}

module.exports = {
  add,
}