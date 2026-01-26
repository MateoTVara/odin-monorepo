import { UserOwnershipContext } from "../../types";

export function assertOwnership(
  ownerId: number,
  user: UserOwnershipContext
) {
  if (ownerId !== user.userId && user.role !== 'ADMIN') {
    throw new Error('Forbidden: You do not have permission to perform this action.');
  }
}