const pool = require('../pool');

/**
 * Get all messages with authors' full names if user is a member
 * @param {boolean} userIsMember - Indicates if the requesting user is a member
 * @returns {Promise<Array>} Promise that resolves to a list of messages with author names or 'Anonymous'
 */
const getAllWithAuthorsNames = async (userIsMember = false) => {
  if (userIsMember) {
    const { rows: messages } = await pool.query(`
      SELECT m.*, CONCAT(u.first_name, ' ', u.last_name) as author_fullname
      FROM messages m
      INNER JOIN users u ON u.id = m.user_id
      ORDER BY m.created_at DESC
    `);
    return messages;
  } else {
    const { rows: messages } = await pool.query(`
      SELECT *, 'Anonymous' as author_fullname
      FROM messages
      ORDER BY created_at DESC
    `);
    return messages;
  }
}

/**
 * Add a new message
 * @param {Object} param0 - Message data
 * @param {number} param0.user_id - ID of the user posting the message
 * @param {string} param0.title - Title of the message
 * @param {string} param0.message - Content of the message
 * @returns {Promise<Object>} Promise that resolves to the newly added message
 */
const add = async ({ user_id, title, message }) => {
  const query = 'INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3) RETURNING *';
  const values = [user_id, title, message];
  const { rows:[newMsg] } = await pool.query(query, values);
  return newMsg;
}

module.exports = {
  getAllWithAuthorsNames,
  add,
}