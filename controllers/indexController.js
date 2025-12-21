const { body, validationResult, matchedData } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const users = require('../db/queries/usersQueries');
const messages = require('../db/queries/messagesQueries');

const validateUser = [
  body('first_name').trim()
    .isAlpha().withMessage('First name must contain only letters')
    .isLength({ min: 1, max: 255 }).withMessage('First name must be between 1 and 255 characters'),
  body('last_name').trim()
    .isAlpha().withMessage('Last name must contain only letters')
    .isLength({ min: 1, max: 255 }).withMessage('Last name must be between 1 and 255 characters'),
  body('username').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Username must be between 1 and 255 characters'),
  body('password').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Password must be between 1 and 255 characters'),
  body('confirm_password').trim()
    .isLength({ min: 1, max: 255 }).withMessage('Confirm password must be between 1 and 255 characters')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')
]

const getIndex = async (req, res, next) => {
  try {
    req.session.views = (req.session.views ?? 0) + 1;
    const msgs = await messages.getAllWithAuthorsNames(req.user ? req.user.is_member : false);

    res.render('pages/index', {
      title: 'Home Page',
      views: req.session.views,
      msgs,
    });
  } catch (error) {
    next(error);
  }
}

const getAuth = async (req, res, next) => {
  try {
    res.render('pages/auth', {
      title: 'Authentication',
    });
  } catch (error) {
    next(error);
  }
}

const postSignUp = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/auth', {
        title: 'Authentication',
        errors: errors.array(),
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          signup_username: req.body.username,
        },
      });
    }

    const data = matchedData(req);

    try {
      const userExists = await users.getUserByUsername(data.username) ? true : false;
      
      if (userExists) {
        return res.status(400).render('pages/auth', {
          title: 'Authentication',
          errors: [{ msg: 'Username already taken' }],
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            signup_username: data.username,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await users.insert({
        ...data,
        password: hashedPassword,
      });

      req.login(newUser, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      })
    } catch (error) {
      next(error);
    }
  }
]

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).render('pages/auth', {
        title: 'Authentication',
        errors: [{ msg: info && info.message ? info.message : 'Login failed' }],
        data: { login_username: req.body.username },
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
};

const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect('/');
}

const getNewMessage = (req, res, next) => {
  try {
    res.render('pages/new-msg', {
      title: 'New Message',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIndex,
  getAuth,
  postSignUp,
  postLogin,
  getLogout,
  getNewMessage,
}