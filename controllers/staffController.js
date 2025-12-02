const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

let title;

const genders = ['Male', 'Female', 'Non-binary'];

const validateStaff = [
  body('fullname').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Fullname must be between 1 and 255 characters.'),
]

const validateFullyStaff =[
  body('fullname').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Fullname must be between 1 and 255 characters.')
    .isAlphanumeric('en-US', { ignore: ' '}).withMessage('Fullname must only contain letters and numbers.'),
  body('birth').optional({ checkFalsy: true }).isISO8601().withMessage('Birth date must be a valid date.'),
  body('gender').optional({ checkFalsy: true }).isIn(genders).withMessage('Gender must be one of the predefined options.'),
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

const getAdd = (req, res) => {
  title = 'Add New Staff Member';
  res.render('staff/addStaff', {
    title,
    genders
  });
}

const postAddFully = [
  validateFullyStaff,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("staff/addStaff", {
        title: 'Add New Staff Member',
        genders,
        errors: errors.array(),
      });
    }
    const object = matchedData(req);
    await db.addStaff(object);
    res.redirect('/staff');
  }
]

const postAdd = [
  validateStaff,
  async (req, res) => {
    const { fullname } = matchedData(req);
    await db.addStaffOnlyFullname(fullname);
    const redirectTo = req.body.redirect || req.get('Referer') || '/add';
    res.redirect(redirectTo);
  }
]

const del = async (req, res) => {
  await db.delStaff(req.params.id);
  res.redirect('/staff')
}

module.exports = {
  getAll,
  getDetail,
  getAdd,
  postAddFully,
  postAdd,
  del,
}