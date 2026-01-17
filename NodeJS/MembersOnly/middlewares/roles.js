/**
 * Middleware to check if user has admin privileges
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const adminNeeded = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    return next();
  }
  req.session.errors = [{ msg: 'Admin privileges are required to perform this action' }];
  res.redirect('/');
}

module.exports = {
  adminNeeded,
};