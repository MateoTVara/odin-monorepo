import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../../utils/errors";

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join(', ');
    throw new BadRequestError(msg);
  }
  next();
}