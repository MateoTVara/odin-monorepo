// api/src/services/authService.ts
import bcrypt from "bcryptjs";
import { usersService } from "./usersService";
import { BadRequestError } from "../utils/errors";
import { tokenService } from "./tokenService";
import { refreshTokenService } from "./refreshTokenService";
import { CreateUser } from "../types";

class AuthService {
  async signup(data: CreateUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await usersService.create({
      ...data,
      password: hashedPassword,
    });

    const accessToken = tokenService.signAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = tokenService.signRefreshToken({ id: user.id });

    await refreshTokenService.create(refreshToken, user.id);

    return { accessToken, refreshToken, user };
  }

  async login(username: string, password: string) {
    const user = await usersService.findByUsername(username);

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new BadRequestError("Invalid username or password");

    const accessToken = tokenService.signAccessToken({
      id: user.id,
      role: user.role,
    });

    const refreshToken = tokenService.signRefreshToken({ id: user.id });

    await refreshTokenService.create(refreshToken, user.id);

    return { accessToken, refreshToken, user };
  }

  async refresh(oldRefreshToken: string) {
    const payload = tokenService.verifyRefreshToken(oldRefreshToken);

    await refreshTokenService.validate(oldRefreshToken);

    await refreshTokenService.revoke(oldRefreshToken);

    const newRefreshToken = tokenService.signRefreshToken({ id: payload.id });

    await refreshTokenService.create(newRefreshToken, payload.id);

    const user = await usersService.findById(payload.id);

    const newAccessToken = tokenService.signAccessToken({
      id: payload.id,
      role: user.role
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }
  }

  async logout(refreshToken: string) {
    await refreshTokenService.revoke(refreshToken);
  }
}

export const authService = new AuthService();