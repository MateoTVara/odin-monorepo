// api/src/services/commentsService.ts
import { prisma } from "../../lib/prisma";
import type { CreateComment, UpdateComment, UserOwnershipContext } from "../types";
import { NotFoundError } from "../utils/errors";
import { assertOwnership } from "./helpers/ownership";

class CommentsService {
  async create(data: CreateComment) {
    const postExists = await prisma.post.findUnique({
      where: { id: data.postId },
      select: { id: true }
    });
    if (!postExists) throw new NotFoundError('Post not found');

    return await prisma.comment.create({
      data: {
        ...data
      },
      select: {
        id: true,
        content: true,
        author: {
          select: {
            username: true
          },
        },
        createdAt: true,
      },
    });
  }

  async readById(id: number) {
    const comment = await prisma.comment.findUnique({
      where: { id }
    });
    if (!comment) throw new NotFoundError('Comment not found');
    return comment;
  }

  async readAll() {
    return await prisma.comment.findMany({
      select: {
        id: true,
        content: true
      }
    })
  }

  private async readOrFail(id: number) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { authorId: true }
    });
    if (!comment) throw new NotFoundError('Comment not found');
    return comment;
  }

  async update(id: number, data: UpdateComment, ownershipContext: UserOwnershipContext) {
    const existingComment = await this.readOrFail(id);
    assertOwnership(existingComment.authorId, ownershipContext);

    return await prisma.comment.update({
      where: { id },
      data: {
        ...data
      }
    })
  }

  async delete(id: number, ownershipContext: UserOwnershipContext) {
    const existingComment = await this.readOrFail(id);
    assertOwnership(existingComment.authorId, ownershipContext);

    return await prisma.comment.delete({
      where: { id }
    });
  }
}

export const commentsService = new CommentsService();