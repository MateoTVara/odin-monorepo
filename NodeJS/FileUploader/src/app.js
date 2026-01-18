import { configDotenv } from 'dotenv';
import { env } from 'node:process';
import express from 'express';
import expressSession from 'express-session';
import { prisma } from '../lib/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import usersService from './services/usersService.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import expressLayouts from 'express-ejs-layouts';
import { format } from 'date-fns';

configDotenv();

const { SESSION_SECRET, PORT } = env;

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/base');


app.use(expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }, // ms = 2 days
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // ms = 2 minutes
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
}));
app.use(passport.session());

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.format = format;
  res.locals.user = req.user;
  res.locals.errors = req.session.errors || [];
  res.locals.styles = req.styles || [];
  res.locals.scripts = req.scripts || [];
  delete req.session.errors;
  next();
});

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await usersService.readByEmail(email);

      if (!user) return done(null, false, { message: 'Incorrect email.' });

      const match = await bcryptjs.compare(password, user.password);

      return match ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersService.readById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

import indexRouter from './routes/indexRouter.js';
app.use('/', indexRouter);

import entriesRouter from './routes/entriesRouter.js';
app.use('/entries', entriesRouter);

import foldersRouter from './routes/foldersRouter.js';
app.use('/folders', foldersRouter);

import filesRouter from './routes/filesRouter.js';
app.use('/files', filesRouter);

app.listen(
  PORT,
  "0.0.0.0",
  err => {
  if (err) {
      console.error('Failed to start server:', err);
      return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  }
);