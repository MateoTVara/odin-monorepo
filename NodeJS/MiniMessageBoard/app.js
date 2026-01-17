const express = require('express');
const path = require('node:path');
const app = express();
const indexRouter = require('./routes/indexRouter');
const { messages, users } = require('./db');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.messages = messages;
  res.locals.users = users;
  next();
});

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use('/', indexRouter)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 8000;

app.listen(PORT, (error) => {
  if (error) throw error
  console.log(`Listening on port ${PORT}`)
});