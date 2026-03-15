// api/src/services/postsService.ts
import { prisma } from "../../lib/prisma";
import type { CreatePost, UpdatePost, UserOwnershipContext } from "../types";
import { NotFoundError } from "../utils/errors";
import { assertOwnership } from "./helpers/ownership";

class PostsService {
  async create(data: CreatePost) {
    const { title, content, summary, authorId } = data;
    return await prisma.post.create({
      data: {
        title,
        content,
        summary,
        author: { connect: { id: authorId } }
      }
    });
  }

  async readById(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        title: true,
        content: true,
        published: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!post) {
      throw new NotFoundError('Post not found');
    }

    return post;
  }

  async readPublishedById(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId, published: true },
      select: {
        title: true,
        content: true,
        comments: {
          select: {
            id: true,
            content: true,
            author: {
              select: {
                username: true
              }
            },
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        author: {
          select: {
            username: true
          }
        },
        updatedAt: true,
        createdAt: true,
      }
    });

    if (!post) {
      throw new NotFoundError('Post not found');
    }
    
    return post;
  }

  async readAll() {
    return await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        published: true,
        updatedAt: true,
      }
    });
  }
  
  async readAllPublished() {
    return await prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        summary: true,
        updatedAt: true,
      }
    }); 
  }

  private async readOrFail(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return post;
  }

  async update(postId: number, data: UpdatePost, ownershipContext: UserOwnershipContext) {
    const existingPost = await this.readOrFail(postId);
    assertOwnership(existingPost.authorId, ownershipContext);
    
    return prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
      }
    });
  }

  async delete(postId: number, ownershipContext: UserOwnershipContext) {
    const existingPost = await this.readOrFail(postId);
    assertOwnership(existingPost.authorId, ownershipContext);

    return prisma.post.delete({
      where: { id: postId },
    });
  }
}

export const postsService = new PostsService();