const pool = require('./pool');

const getAllManga = async () => {
  const { rows } = await pool.query("SELECT * FROM manga");
  return rows;
}

const getMangaDetailById = async (id) => {
  const { rows: [manga] } = await pool.query('SELECT * FROM manga WHERE id = $1', [id]);
  const { rows: staff } = await pool.query(`
    SELECT s.*, ms.role_id AS roleid, r.title AS role
    FROM staff s
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
  const genres = Array.isArray(object.genres) ? object.genres : [];

  const { rows: [newManga] } = await pool.query(`
    INSERT INTO manga (title, description, status, startdate, enddate)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `, values);

  if (staff.length) {
    for (const member of staff) {
      let staffId, roleId;

      if (member && (member.staffId !== undefined || member.roleId !== undefined)) {
        staffId = Number(member.staffId ?? member.staffid);
        roleId = Number(member.roleId ?? member.roleid);
      }

      if (!Number.isInteger(staffId) || !Number.isInteger(roleId)) continue;

      await pool.query(`
        INSERT INTO manga_staff (manga_id, staff_id, role_id)
        VALUES ($1, $2, $3)
      `, [newManga.id, staffId, roleId]);
    }
  }

  if (genres.length) {
    for (const genre of genres) {
      let genreId;

      if (genre && (genre.genreId !== undefined || genre.genreid !== undefined)) {
        genreId = Number(genre.genreId ?? genre.genreid);
      }

      if (!Number.isInteger(genreId)) continue;

      await pool.query(`
        INSERT INTO manga_genres (manga_id, genre_id)
        VALUES ($1, $2)
      `, [newManga.id, genreId]);
    }
  }
}

const updateManga = async object => {
  const values = [
    object.title,
    object.description ?? null,
    object.status,
    object.startdate,
    object.enddate ?? null,
    object.id,
  ]

  const updatedManga = await pool.query(`
    UPDATE manga SET title = $1, description = $2, status = $3, startdate = $4, enddate = $5
    WHERE id = $6 RETURNING *
  `, values);

  await pool.query("DELETE FROM manga_staff WHERE manga_id = $1", [object.id]);
  await pool.query("DELETE FROM manga_genres WHERE manga_id = $1", [object.id]);

  const staff = Array.isArray(object.staff) ? object.staff : [];
  const genres = Array.isArray(object.genres) ? object.genres : [];

  if(staff.length) {
    for (const member of staff) {
      let staffId, roleId;
      if (member && (member.staffId !== undefined || member.roleId !== undefined)) {
        staffId = Number(member.staffId ?? member.staffid);
        roleId = Number(member.roleId ?? member.roleid);
      }
      if (!Number.isInteger(staffId) || !Number.isInteger(roleId)) continue;

      await pool.query(`
        INSERT INTO manga_staff (manga_id, staff_id, role_id)
        VALUES ($1, $2, $3)
      `, [object.id, staffId, roleId]);
    }
  }

  if(genres.length) {
    for (const genre of genres) {
      let genreId;
      if (genre && (genre.genreId !== undefined || genre.genreid !== undefined)) {
        genreId = Number(genre.genreId ?? genre.genreid);
      }
      if (!Number.isInteger(genreId)) continue;

      await pool.query(`
        INSERT INTO manga_genres (manga_id, genre_id)
        VALUES ($1, $2)
      `, [object.id, genreId]);
    }
  }
}

const delManga = async id => {
  await pool.query("DELETE FROM manga WHERE id = $1", [id]);
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

const addStaff = async object => {
  await pool.query("INSERT INTO staff (fullname, birth, gender) VALUES ($1, $2, $3)", [
    object.fullname,
    object.birth ?? null,
    object.gender ?? null,
  ]);
}

const addStaffOnlyFullname = async fullname => {
  await pool.query("INSERT INTO staff (fullname) VALUES ($1)", [fullname]);
}

const updateStaff =  async object => {
  await pool.query("UPDATE staff SET fullname = $1, birth = $2, gender = $3 WHERE id = $4", [
    object.fullname,
    object.birth ?? null,
    object.gender ?? null,
    object.id,
  ]);
}

const delStaff = async id => {
  await pool.query("DELETE FROM staff WHERE id = $1", [id]);
}



// Genres

const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

const addGenre = async title => {
  await pool.query("INSERT INTO genres (title) VALUES ($1)", [title]);
}

const delGenre = async id => {
  await pool.query("DELETE FROM staff WHERE id = $1", [id]);
}



// Roles

const getAllRoles = async () => {
  const { rows } = await pool.query("SELECT * FROM roles");
  return rows;
}

const addRole = async title => {
  await pool.query("INSERT INTO roles (title) VALUES ($1)", [title]);
}

const delRole = async id => {
  await pool.query("DELETE FROM roles WHERE id = $1", [id]);
}



module.exports = {
  getAllManga,
  getMangaDetailById,
  getMangaListByGenre,
  addManga,
  updateManga,
  delManga,

  getAllStaff,
  getStaffDetailById,
  addStaff,
  addStaffOnlyFullname,
  updateStaff,
  delStaff,

  getAllGenres,
  addGenre,
  delGenre,

  getAllRoles,
  addRole,
  delRole,
}

