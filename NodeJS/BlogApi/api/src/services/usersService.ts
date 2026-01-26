// api/src/services/usersService.ts
import { prisma } from "../../lib/prisma";
import type { CreateUser } from "../types";

class UsersService {
  create(data: CreateUser) {
    return prisma.user.create({
      data: {
        ...data
      }
    });
  }

  findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username }
    });
  }
}

export const usersService = new UsersService();