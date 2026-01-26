import { Roles } from "../../generated/prisma/enums";

export interface JwtPayload {
  id: number;
  role: Roles;
  iat?: number;
  exp?: number;
}
