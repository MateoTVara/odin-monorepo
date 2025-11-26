const pool = require('./pool');

const getStaffFromManga = async (mangaId) => {
  const { rows } = await pool.query(`
    SELECT s.*, r.title as role FROM staff s
    LEFT JOIN manga_staff ms ON ms.staff_id = s.id
    LEFT JOIN roles r ON r.id = ms.role_id
    WHERE ms.manga_id = $1
  `,[mangaId]);
  return rows;
}

const getAllManga = async () => {
  const { rows } = await pool.query("SELECT * FROM manga");
  return rows;
}

const getMangaById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM manga WHERE id = $1', [id]);
  const manga = rows[0];
  const staff = await getStaffFromManga(id);
  return {
    id: manga.id,
    title: manga.title,
    description: manga.description,
    status: manga.status,
    startdate: manga.startdate,
    enddate: manga.enddate,
    staff,
  }
}



// Staff

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
  getMangaById,

  getStaffDetailById,
}

