import { prisma } from "../../lib/prisma";
import type { CreateComment, UpdateComment, UserOwnershipContext } from "../types";
import { assertOwnership } from "./helpers/ownership";

class CommentsService {
  async create(data: CreateComment) {
    return await prisma.comment.create({
      data: {
        ...data
      }
    });
  }

  async readById(id: number) {
    return await prisma.comment.findUnique({
      where: { id }
    });
  }

  async readAll() {
    return await prisma.comment.findMany({
      select: {
        id: true,
        content: true
      }
    })
  }

  async update(id: number, data: UpdateComment, ownershipContext: UserOwnershipContext) {
    const existingComment = await this.readById(id);
    if (!existingComment) {
      throw new Error('Comment not found');
    }
    assertOwnership(existingComment.authorId, ownershipContext);

    return await prisma.comment.update({
      where: { id },
      data: {
        ...data
      }
    })
  }

  async delete(id: number, ownershipContext: UserOwnershipContext) {
    const existingComment = await this.readById(id);
    if (!existingComment) {
      throw new Error('Comment not found');
    }
    assertOwnership(existingComment.authorId, ownershipContext);

    return await prisma.comment.delete({
      where: { id }
    });
  }
}

export const commentsService = new CommentsService();