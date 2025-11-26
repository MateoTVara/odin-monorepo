const db = require('../db/queries');

let title;

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

module.exports = {
  getAll,
  getDetail,
}