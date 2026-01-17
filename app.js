const express = require('express');
const path = require('node:path');
const { env } = require('node:process');
const { format } = require('date-fns');

require('dotenv').config();

const { LISTENING_PORT } = env;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.locals.format = format;

const mangaRouter = require('./routes/mangaRouter');
const staffRouter = require('./routes/staffRouter');
const genresRotuer = require('./routes/genresRouter');
const rolesRouter = require('./routes/rolesRouter');


app.use('/', mangaRouter);
app.use('/staff', staffRouter);
app.use('/genres', genresRotuer);
app.use('/roles', rolesRouter);


app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

const fallbackPort = 3000;

app.listen(LISTENING_PORT || fallbackPort, (error) => {
  if (error) throw error
  console.log(`Listening on port ${LISTENING_PORT || fallbackPort}`)
});
