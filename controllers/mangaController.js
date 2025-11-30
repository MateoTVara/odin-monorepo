const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;
const statuses = ['Finished', 'Releasing', 'Hiatus', 'Cancelled'];

const arraySanitizer = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

const titleLengthErr = (field, {min = 1, max}) => `${field} must be between ${min} and ${max}`;
const dateErr = (field) => `${field} must be a valid date.`;
const notInErr = 'The option selected is not among the options'

const validateManga = [
  body('title').trim()
    .isLength({ min: 1, max: 100 }).withMessage(titleLengthErr('title', {min:1, max:100})),
  
  body('description').optional({ values: 'falsy' }).trim()
    .isLength({ min: 1, max: 1000 }).withMessage(titleLengthErr('description', {min:1, max:1000})),

  body('status').trim()
    .isLength({ min: 1, max: 10 }).withMessage(titleLengthErr('status', {min:1, max:10}))
    .isIn(statuses).withMessage(notInErr),
  
  body('startdate').trim()
    .isDate().withMessage(dateErr('start date')),
  
  body('enddate').optional({ values: 'falsy' }).trim()
    .isDate().withMessage(dateErr('end date')),

  body('staff')
    .customSanitizer(arraySanitizer)
    .isArray().withMessage('Staff must be properly formatted'),

  body('genres')
    .customSanitizer(arraySanitizer)
    .isArray().withMessage('Genres must be properly formatted'),
];

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
  title = 'Add new manga';
  const staff = await db.getAllStaff();
  const roles = await db.getAllRoles();
  const genres = await db.getAllGenres();
  res.render('addManga', {
    title,
    statuses,
    staff,
    roles,
    genres,
  });
}

const postAdd = [
  validateManga,
  async (req, res) => {
    title = 'Add new manga';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const staff = await db.getAllStaff();
      const roles = await db.getAllRoles();
      const genres = await db.getAllGenres();
      return res.status(400).render('addManga', {
        title,
        statuses,
        staff,
        roles,
        genres,
        errors: errors.array(),
      });
    }

    const object = matchedData(req);
    await db.addManga(object);
    res.redirect('/');
  }
]

module.exports = {
  getAll,
  getDetail,
  getAdd,
  postAdd,
}