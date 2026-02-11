// api/src/controllers/helpers/asyncHandler.ts
import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler = (fn: RequestHandler): RequestHandler =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise.resolve(fn(req, res, next)).catch(next);