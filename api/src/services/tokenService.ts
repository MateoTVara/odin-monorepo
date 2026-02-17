// api/src/services/tokenService.ts
import { AccessTokenPayload, RefreshTokenPayload } from "../types";
import jwt from "jsonwebtoken";

class TokenService {
  private accessSecret = process.env.ACCESS_JWT_SECRET;
  private refreshSecret = process.env.REFRESH_JWT_SECRET;

  signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: "1h",
    });
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: "7d",
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const decoded = jwt.verify(token, this.accessSecret);

    if (
      decoded === null ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "number" ||
      typeof decoded.role !== "string"
    ) {
      throw new Error("Invalid token payload");
    }

    return decoded as AccessTokenPayload;
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const decoded = jwt.verify(token, this.refreshSecret);

    if (
      decoded === null ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "number"
    ) {
      throw new Error("Invalid token payload");
    }

    return decoded as RefreshTokenPayload;
  }
}

export const tokenService = new TokenService();