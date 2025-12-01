const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;

const validateStaff = [
  body('fullname').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Fullname must be between 1 and 255 characters.'),
]

const getAll = async (req, res) => {
  const staff = await db.getAllStaff();
  title = 'Staff List';
  res.render('staff/list', {
    title,
    staff,
  });
}

const getDetail = async (req, res) => {
  const staff = await db.getStaffDetailById(req.params.id);
  title = `${staff.fullname} - Detail`
  res.render('staff/detail', {
    title,
    staff
  });
}

const postAdd = [
  validateStaff,
  async (req, res) => {
    const { fullname } = matchedData(req);
    await db.addStaffOnlyFullname(fullname);
    res.redirect('/add');
  }
]

module.exports = {
  getAll,
  getDetail,
  postAdd,
}