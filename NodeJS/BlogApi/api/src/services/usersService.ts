// api/src/services/usersService.ts
import { prisma } from "../../lib/prisma";
import type { CreateUser } from "../types";
import { ConflictError, NotFoundError } from "../utils/errors";

class UsersService {
  async create(data: CreateUser) {
    const existingUser = await prisma.user.findUnique({
      where: { username: data.username }
    });

    if (existingUser) throw new ConflictError("Username already exists");

    return await prisma.user.create({
      data: {
        ...data
      }
    });
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }
}

export const usersService = new UsersService();