const db = require('../db/queries');

let title;

const getDetail = async (req, res) => {
  const staff = await db.getStaffDetailById(req.params.id);
  title = `${staff.fullname} - Detail`
  res.render('staff/detail', {
    title,
    staff
  });
}

module.exports = {
  getDetail,
}