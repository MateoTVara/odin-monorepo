import { prisma } from "../../lib/prisma";

class PostsService {
  async readAllPublished() {
    return await prisma.post.findMany({
      where: { published: true },
      include: { comments: true },
    });
  }
}

export const postsService = new PostsService();