// api/src/controllers/authController.ts
import type { Request, RequestHandler, Response } from "express";
import type { CreateUser, VerifyUser } from "../types";
import { usersService } from "../services";
import { body, matchedData } from "express-validator";
import { BadRequestError } from "../utils/errors";
import { asyncHandler } from "./helpers/asyncHandler";
import { validateRequest } from "./helpers/validateRequest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  private readonly validationMessages = {
    username: {
      isString: "Username must be a string",
      isLength: "Username must be at least 3 characters long"
    },
    password: {
      isString: "Password must be a string",
      isStrongPassword: "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
    },
    confirmPassword: {
      custom: "Passwords do not match"
    },
    email: {
      isEmail: "Email must be a valid email address"
    },
    name: {
      isString: "Name must be a string"
    }
  }

  private readonly validateSignup = [
    body("username").trim()
      .isString().withMessage(this.validationMessages.username.isString)
      .isLength({ min: 3 }).withMessage(this.validationMessages.username.isLength),
    body("password").trim()
      .isString().withMessage(this.validationMessages.password.isString)
      .isStrongPassword().withMessage(this.validationMessages.password.isStrongPassword),
    body("confirmPassword").trim()
      .custom((value, { req }) => value === req.body.password)
      .withMessage(this.validationMessages.confirmPassword.custom),
    body("email").optional().isEmail().withMessage(this.validationMessages.email.isEmail).normalizeEmail(),
    body("name").optional().isString().withMessage(this.validationMessages.name.isString).trim(),
  ]

  signup : RequestHandler[] = [
    ...this.validateSignup,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const data = matchedData<CreateUser>(req);

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await usersService.create({
        ...data,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(201).json({
        token,
        user: {
          id: user.id,
          username: user.username,
        }
      });
    })
  ]



  private readonly validateLogin = [
    body("username").isString().withMessage(this.validationMessages.username.isString).trim(),
    body("password").isString().withMessage(this.validationMessages.password.isString).trim(),
  ]
  
  login: RequestHandler[] = [
    ...this.validateLogin,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const data = matchedData<VerifyUser>(req);

      const user = await usersService.findByUsername(data.username);
      const isValid = await bcrypt.compare(data.password, user.password);

      if (!isValid) throw new BadRequestError("Invalid username or password");

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
        }
      })
    })
  ]
}

export const authController = new AuthController();