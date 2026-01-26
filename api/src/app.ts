// api/src/app.ts
import type { Request, Response, NextFunction } from 'express';
import type { StrategyOptionsWithoutRequest } from 'passport-jwt';
import type { JwtPayload } from './types';
import { authRouter, commentsRouter, postsRouter } from './routes';
import express from 'express';
import cors from 'cors';
import { Strategy as JwtStrategy, VerifiedCallback, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import 'dotenv/config';
import { prisma } from '../lib/prisma';

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Dev user client origin
}));

// JWT Authentication Middleware
const jwtOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: jwtPayload.id }});
    if (!user) {
      return done(null, false);
    }
    if (jwtPayload.role !== user.role) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Wireup routes
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Error handling middleware
app.use((
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('An error occurred:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(parseInt(process.env.LISTEN_PORT), '0.0.0.0', (err: Error | undefined) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on port ${process.env.LISTEN_PORT}`);
});