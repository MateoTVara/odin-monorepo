import type { Request, Response, NextFunction } from "express";
import type { Roles } from "../../generated/prisma/enums";

export const requireRole = (...allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  }
}