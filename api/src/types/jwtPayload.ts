// api/src/types/jwtPayload.tss
import { Roles } from "../../generated/prisma/enums";

interface TokenPayload {
  iat?: number;
  exp?: number;
}

export interface AccessTokenPayload extends TokenPayload {
  id: number;
  role: Roles;
}

export interface RefreshTokenPayload extends TokenPayload {
  id: number;
}