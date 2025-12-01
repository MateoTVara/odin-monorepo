const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;

const validateGenres = [
  body('title').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters.'),
]

const postAdd = [
  validateGenres,
  async (req, res) => {
    const { title } = matchedData(req);
    await db.addGenre(title);
    res.redirect('/add');
  }
]

module.exports = {
  postAdd,
}