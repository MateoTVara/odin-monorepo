import { prisma } from "../../lib/prisma";
import type { CreatePost, UpdatePost } from "../types";

class PostsService {
  async create(data: CreatePost) {
    const { title, content, authorId } = data;
    return await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } }
      }
    });
  }

  async readPublishedById(postId: number) {
    return prisma.post.findUnique({
      where: { id: postId, published: true },
      include: {
        comments: true,
        author: true,
      }
    });
  }
  
  async readAllPublished() {
    return prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
      }
    }); 
  }

  async update(postId: number, data: UpdatePost) {
    return prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
      }
    });
  }

  async delete(postId: number) {
    return prisma.post.delete({
      where: { id: postId },
    });
  }
}

export const postsService = new PostsService();