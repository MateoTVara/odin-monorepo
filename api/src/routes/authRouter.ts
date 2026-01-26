// api/src/routes/authRouter.ts
import { Router } from "express";
import { authController } from "../controllers";
const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);

export { authRouter };