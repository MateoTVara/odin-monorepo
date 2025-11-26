const db = require('../db/queries');

let title;

const getAll = async (req, res) => {
  const manga = await db.getAllManga();
  title = 'Manga List'
  res.render('index', {
    title,
    manga,
  });
}

const getDetail = async (req, res) => {
  const manga = await db.getMangaDetailById(req.params.id);
  title = `${manga.title} - Detail`;
  res.render('detail', {
    title,
    manga,
  });
}

module.exports = {
  getAll,
  getDetail,
}