import type { Request, Response } from "express";
import { postsService } from "../services";
import { CreatePost, UpdatePost } from "../types";

class PostsController {
  async postCreate(req: Request<{}, {}, CreatePost>, res: Response) {
    const createdPost = await postsService.create(req.body);
    res.status(201).json(createdPost);
  }

  async getPublished(req: Request<{ id: string }>, res: Response) {
    const postId = Number(req.params.id);
    const post = await postsService.readPublishedById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  }

  async getAllPublished(_req: Request, res: Response) {
    const posts = await postsService.readAllPublished();
    res.json(posts);
  }

  async patchUpdate(req: Request<{ id: string }, {}, UpdatePost>, res: Response) {
    const postId = Number(req.params.id);
    const updatedPost = await postsService.update(postId, req.body);
    res.json(updatedPost);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const postId = Number(req.params.id);
    await postsService.delete(postId);
    res.status(204).send();
  }
}

export const postsController = new PostsController();