// api/src/controllers/authController.ts
import type { Request, Response } from "express";
import type { CreateUser, VerifyUser } from "../types";
import { usersService } from "../services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async signup(req: Request<{}, {}, CreateUser>, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = await usersService.findByUsername(username);
    
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usersService.create({
      ...req.body,
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
        email: user.email,
      }
    });
  }
  
  async login(req: Request<{}, {}, VerifyUser>, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    const user = await usersService.findByUsername(username);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    })
  }
}

export const authController = new AuthController();