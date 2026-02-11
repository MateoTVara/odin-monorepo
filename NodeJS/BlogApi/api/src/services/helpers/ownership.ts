import { UserOwnershipContext } from "../../types";
import { ForbiddenError } from "../../utils/errors";

export function assertOwnership(
  ownerId: number,
  user: UserOwnershipContext
) {
  if (ownerId !== user.userId && user.role !== 'ADMIN') {
    throw new ForbiddenError('Forbidden: You do not have permission to perform this action.');
  }
}