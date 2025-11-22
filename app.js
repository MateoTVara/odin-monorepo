// const amandaPic = require('./assets/person.webp');

const express = require('express');
const path = require('node:path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/indexRouter');

const messages = [
  {
    text: "Hi there!",
    user: "Amanda",
    image: '/person.webp',
    added: new Date().toLocaleString(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    image: '/person.webp',
    added: new Date().toLocaleString(),
  }
];

app.use((req, res, next) => {
  res.locals.messages = messages;
  next();
});

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