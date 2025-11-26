const pool = require('./pool');

const getAllMangas = async() => {
  const { rows } = await pool.query("SELECT * FROM manga");
  return rows;
}

module.exports = {
  getAllMangas,
}

