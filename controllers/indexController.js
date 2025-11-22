const { messages, users } = require('../db')
const Message = require('../models/Message')

module.exports = {
  get: (req, res) => {
    res.render('index');
  },
  new: (req, res) => {
    const {text} = req.body;

    messages.push(new Message(
      crypto.randomUUID(),
      text,
      new Date().toLocaleString(),
      users[0].id
    ));

    res.redirect('/');
  }
}