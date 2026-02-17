// api/src/routes/authRouter.ts
import { Router } from "express";
import { authController } from "../controllers";
import { rateLimit } from 'express-rate-limit';
import { AppError } from "../utils/errors";
const authRouter = Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  limit: 5, // limit each IP to 20 requests per windowMs
  handler: (_req, _res, next) => {
    next(new AppError("Too many requests, please try again later.", 429));
  }
});

authRouter.post("/signup", limiter, authController.signup);
authRouter.post("/login", limiter, authController.login);
authRouter.post("/refresh", limiter, authController.refresh);

export { authRouter };