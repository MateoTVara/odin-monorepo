import { body, validationResult, matchedData } from "express-validator";
import usersService from "../services/usersService.js";
import passport from "passport";
import bcryptjs from "bcryptjs";
import entriesService from "../services/entriesService.js";
import foldersService from "../services/foldersService.js";

class IndexController {

  #validateUserSignUp = [
    body('email')
      .isEmail().withMessage('Invalid email address.')
      .custom(async (email) => {
        const existingUser = await usersService.readByEmail(email);
        if (existingUser) {
          throw new Error('Email already in use.');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
    body('confirmPassword')
      .custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password) {
          throw new Error('Passwords do not match.');
        }
        return true;
      }),
  ];



  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  getIndex = async (req, res) => {

    req.user.entries = await entriesService.readRootEntries(req.user.id);
    
    res.render('pages/index', {
      parents: [],
      title: 'Home',
      styles: ['pages/index'],
      scripts: ['pages/index'],
    });
  };



  /**
   * 
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  getAuth = (req, res) => {
    res.render('pages/auth', {
      scripts: ['pages/auth'],
      title: 'Auth'
    });
  };



  postSignUp = [
    this.#validateUserSignUp,
    async (req, res, next) => { 
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        return res.redirect('/auth');
      }

      const userData = matchedData(req);

      try {
        const hashedPassword = await bcryptjs.hash(userData.password, 10);

        const newUser = await usersService.create({
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
  postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        req.session.errors = req.session.errors || [];
        req.session.errors.push({ msg: info?.message || 'Login failed' });
        return res.redirect('/auth');
      }

      req.login(user, loginErr => {
        if (loginErr) return next(loginErr);
        return res.redirect('/');
      })
    })(req, res, next);
  }



  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  getLogout = async (req, res, next) => {
    req.logout((error) => {
      if (error) return next(error);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.redirect('/auth');
      });
    });
  };
}



const indexController = new IndexController;

export default indexController;