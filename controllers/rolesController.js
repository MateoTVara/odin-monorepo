const db = require('../db/queries');
const { body, matchedData } = require('express-validator');

let title;

const validateRoles = [
  body('title').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters.'),
]

const postAdd = [
  validateRoles,
  async (req, res) => {
    const { title } = matchedData(req);
    await db.addRole(title);
    const redirectTo = req.body.redirect || req.get('Referer') || '/add';
    res.redirect(redirectTo);
  }
]

module.exports = {
  postAdd,
}