import { NextFunction, Request, Response } from "express";
import { AppError } from "./errors";
import { Prisma } from "../../generated/prisma/client";

export default function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    [statusCode, message] = [err.statusCode, err.message];
  }

  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") [statusCode, message] = [409, "Unique constraint failed"];

    if (err.code === "P2025") [statusCode, message] = [404, "Record not found"];
  }

  else {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json({ message });
}