// api/src/services/refreshTokenService.ts
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../utils/errors";
import { hashToken } from "../utils/lib";

class RefreshTokenService {
  async create(refreshToken: string, userId: number) {
    const userExists = await prisma.user.findUnique({ where: { id: userId }});
    if (!userExists) throw new NotFoundError("User not found");
  
    const tokenHash = hashToken(refreshToken);

    return await prisma.refreshToken.create({
      data: {
        tokenHash,
        user: { connect: { id: userId } },
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      }
    });
  }

  async validate(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash }
    });
    if (!storedToken) throw new NotFoundError("Invalid refresh token");

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new NotFoundError("Refresh token expired");
    }

    return storedToken;
  }

  async revoke(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash }
    });

    if (!storedToken) throw new NotFoundError("Invalid refresh token");

    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
  }
}

export const refreshTokenService = new RefreshTokenService();