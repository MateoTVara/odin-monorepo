const { messages, users } = require('../db')
const Message = require('../models/Message');
const User = require('../models/User');

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

    if (!users.map(user => user.name).includes(name)) {
      const newUser = new User(
        crypto.randomUUID(),
        name,
        password,
        null
      );
      users.push(newUser);
      currentUser = newUser;
      res.redirect('/');
    }

    const user = users.find(user => user.name === name);

    if (password != user.password) {
      authError = 'Wrong password';
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