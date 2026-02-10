import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "../../generated/prisma/client";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error | null, user: User | false | null) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const error = new Error("Unauthorized");
        error.name = "UnauthorizedError";
        return next(error);
      }

      req.user = user;
      next();
    }
  )(req, res, next);
}