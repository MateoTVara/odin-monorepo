// api/src/middlewares/authenticateJwt.ts
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../../generated/prisma/client";
import { UnauthorizedError } from "../utils/errors";
import jwt from "jsonwebtoken";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, user: User | false | null, info: any) => {
      if (err) return next(err);

      if (info instanceof jwt.TokenExpiredError) return next(info);
      if (info instanceof jwt.JsonWebTokenError) return next(info);

      if (!user) return next(new UnauthorizedError("Unauthorized"));

      req.user = user;
      next();
    }
  )(req, res, next);
}