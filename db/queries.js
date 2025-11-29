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
  const { rows: genres } = await pool.query(`
    SELECT g.* FROM genres g
    LEFT JOIN manga_genres mg ON mg.genre_id = g.id
    WHERE mg.manga_id = $1
  `, [id]);
  return {
    ...manga,
    staff,
    genres,
  }
}

const getMangaListByGenre = async (id) => {
  const { rows } = await pool.query(`
    SELECT m.* FROM manga m
    LEFT JOIN manga_genres mg ON mg.manga_id = m.id
    WHERE mg.genre_id = $1
  `, [id]);
  return rows;
}

const addManga = async (object) => {
  const values = [
    object.title,
    object.description ?? null,
    object.status,
    object.startdate,
    object.enddate ?? null
  ];

  const staff = Array.isArray(object.staff) ? object.staff : [];

  const { rows: [newManga] } = await pool.query(`
    INSERT INTO manga (title, description, status, startdate, enddate)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `, values);

  if (staff.length) {
    for (const member of staff) {
      let staffId, roleId;

      // handle modern shape: { staffId, roleId }
      if (member && (member.staffId !== undefined || member.roleId !== undefined)) {
        staffId = Number(member.staffId ?? member.staffid);
        roleId = Number(member.roleId ?? member.roleid);
      }

      // skip invalid entries
      if (!Number.isInteger(staffId) || !Number.isInteger(roleId)) continue;

      await pool.query(`
        INSERT INTO manga_staff (manga_id, staff_id, role_id)
        VALUES ($1, $2, $3)
      `, [newManga.id, staffId, roleId]);
    }
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



// Genres

const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}



// Roles

const getAllRoles = async () => {
  const { rows } = await pool.query("SELECT * FROM roles");
  return rows;
}



module.exports = {
  getAllManga,
  getMangaDetailById,
  getMangaListByGenre,
  addManga,

  getAllStaff,
  getStaffDetailById,

  getAllGenres,

  getAllRoles,
}

