import { NextFunction, Request, RequestHandler, Response } from "express";

export default function asyncHandler(fn: RequestHandler): RequestHandler {
  return ( // type annotation for better readability
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}