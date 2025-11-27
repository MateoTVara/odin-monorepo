const db = require('../db/queries');

let title;

const getAll = async (req, res) => {
  title = 'Manga List'
  const object = {};
  object.title = title;
  if (req.query.genre) {
    object.genre = Number(req.query.genre);
    object.manga = await db.getMangaListByGenre(req.query.genre);
    res.render('index', object);
    return;
  }
  object.manga = await db.getAllManga();
  res.render('index', object);
}

const getDetail = async (req, res) => {
  const manga = await db.getMangaDetailById(req.params.id);
  title = `${manga.title} - Detail`;
  res.render('detail', {
    title,
    manga,
  });
}

const getAdd = async (req, res) => {
  const status = ['Finished', 'Releasing', 'Hiatus', 'Cancelled'];
  title = 'Add new manga';
  res.render('addManga', {
    title,
    status,
  });
}

module.exports = {
  getAll,
  getDetail,
  getAdd,
}