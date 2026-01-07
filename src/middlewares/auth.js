/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const authNeeded = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.errors = [{ msg: 'You need to be logged in to used that endpoint' }];
  res.redirect('/auth');
}

export { authNeeded }