const db = require('../db/queries');

let title;

const getAll = async (req, res) => {
  const manga = await db.getAllMangas();
  title = 'Manga List'
  res.render('index', {
    title,
    manga,
  });
}

module.exports = {
  getAll,
}