import { body, validationResult, matchedData } from "express-validator";
import usersService from "../services/usersService.js";
import passport from "passport";
import bcryptjs from "bcryptjs";

const validateUser = [
  body('email')
    .isEmail().withMessage('Invalid email address.')
    .custom(async (email) => {
      const existingUser = await usersService.findUserByEmail(email);
      if (existingUser) {
        throw new Error('Email already in use.');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 1 }).withMessage('Password must be at least 1 characters long.'),
  // optionally
  // body('confirmPassword')
  //   .custom((confirmPassword, { req }) => {
  //     if (confirmPassword !== req.body.password) {
  //       throw new Error('Passwords do not match.');
  //     }
  //     return true;
  //   }),
]

const getIndex = (req, res) => {
  res.render('pages/index', { title: 'Home'});
}


const postSignUp = [
  validateUser,
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async (req, res, next) => { 
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      return res.redirect('/');
    }

    const userData = matchedData(req);

    try {
      const hashedPassword = await bcryptjs.hash(userData.password, 10);

      const newUser = await usersService.createUser({
        ...userData,
        password: hashedPassword,
      });

      req.login(newUser, error => {
        if (error) return next(error);
        return res.redirect('/');
      });
    } catch (error) {
      next(error);
    }
  }
];

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  // failureRedirect: '',
});

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getLogout = async (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
  });
  res.redirect('/');
};



export default {
  getIndex,
  postSignUp,
  postLogin,
  getLogout,
}