const messages = require('../db/queries/messagesQueries');
const {body, validationResult, matchedData } = require('express-validator');

const validateMessage = [
  body('title').trim()
    .isLength({ min: 1 }).withMessage('Title is required')
    .isLength({ max: 50 }).withMessage('Title must be less than 255 characters'),
  body('message').trim()
    .isLength({ min: 1 }).withMessage('Message is required')
]

const postAdd = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/new-msg', {
        title: 'New Message',
        errors: errors.array(),
        data: req.body,
      });
    }

    const messageData = matchedData(req);
    try {
      const data = {
        user_id: req.user.id,
        ...messageData,
      };

      await messages.add(data);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
]

module.exports = {
  postAdd,
}