/**
 * Middleware to check if user is authenticated
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth');
}

module.exports = {
  isAuth,
};