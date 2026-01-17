/**
 * Middleware to set isMember flag in request
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const isMember = (req, res, next) => {
  req.isMember = req.isAuthenticated() && req.user.is_member;
  next();
}

module.exports = {
  isMember,
}