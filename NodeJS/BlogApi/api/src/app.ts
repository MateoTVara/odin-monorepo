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
import { AppError } from './utils/errors';
import { Prisma } from '../generated/prisma/client';
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt;

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
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  // Default fallback
  let statusCode = 500;
  let message = "Internal server error";

  // Known application errors
  if (err instanceof AppError) {
    [statusCode, message] = [err.statusCode, err.message];
  }

  // Prisma known errors (optional but professional)
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") [statusCode, message] = [409, "Unique constraint failed"];

    if (err.code === "P2025") [statusCode, message] = [404, "Record not found"];
  }

  else if (err instanceof TokenExpiredError) [statusCode, message] = [401, "Token expired"];

  else if (err instanceof JsonWebTokenError) [statusCode, message] = [401, "Invalid token"];

  // Unknown errors (programmer errors)
  else {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err instanceof Error ? err.stack : undefined
    })
  });
});

// Start the server
app.listen(parseInt(process.env.LISTEN_PORT), '0.0.0.0', (err: Error | undefined) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on port ${process.env.LISTEN_PORT}`);
});