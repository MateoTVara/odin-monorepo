const { messages, users } = require('../db')
const Message = require('../models/Message')

let currentUser = null;
let authError = null;

module.exports = {
  get: (req, res) => {
    res.render('index', { currentUser, authError , open: false });
  },
  newMsg: (req, res) => {
    const {text} = req.body;

    messages.push(new Message(
      crypto.randomUUID(),
      text,
      new Date().toLocaleString(),
      currentUser ? currentUser.id : null
    ));

    res.redirect('/');
  },
  newUser: (req, res) => {
    const { name, password } = req.body;

    const user = users.find(user => (user.name === name) && (user.password === password));
    
    if (!user) {
      authError = 'Not Found User'
      res.render('index', { currentUser, authError, open: true });
      return;
    }

    currentUser = user;

    res.redirect('/');
  },
  logout: (req, res) => {
    currentUser = null;
    authError = null;

    res.json({ ok: true });
  }
}