import type { Roles } from "../../../generated/prisma/enums";

interface UserContext {
  userId: number
  role: Roles
}

export function assertOwnership(
  ownerId: number,
  user: UserContext
) {
  if (ownerId !== user.userId && user.role !== 'ADMIN') {
    throw new Error('Unauthorized: You do not have permission to perform this action.');
  }
}