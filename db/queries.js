const pool = require('./pool');

const getAllManga = async () => {
  const { rows } = await pool.query("SELECT * FROM manga");
  return rows;
}

const getMangaDetailById = async (id) => {
  const { rows: [manga] } = await pool.query('SELECT * FROM manga WHERE id = $1', [id]);
  const { rows: staff } = await pool.query(`
    SELECT s.*, r.title as role FROM staff s
    LEFT JOIN manga_staff ms ON ms.staff_id = s.id
    LEFT JOIN roles r ON r.id = ms.role_id
    WHERE ms.manga_id = $1
  `, [id]);
  return {
    ...manga,
    staff,
  }
}



// Staff

const getAllStaff = async () => {
  const { rows } = await pool.query("SELECT * FROM staff");
  return rows;
}

const getStaffDetailById = async (id) => {
  const { rows: [staff] } = await pool.query("SELECT * FROM staff WHERE id = $1", [id]);
  const { rows: manga } = await pool.query(`
    SELECT m.*, r.title as role FROM manga m
    LEFT JOIN manga_staff ms ON ms.manga_id = m.id
    LEFT JOIN roles r ON r.id = ms.role_id
    WHERE ms.staff_id = $1
    `, [id]);

  return {
    ...staff,
    manga,
  }
  
}

module.exports = {
  getAllManga,
  getMangaDetailById,

  getAllStaff,
  getStaffDetailById,
}

