/**
 * Middleware to check if user is authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const authNeeded = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.errors = [{ msg: 'You need to be logged in to access this page' }];
  res.redirect('/auth');
}

module.exports = {
  authNeeded,
}