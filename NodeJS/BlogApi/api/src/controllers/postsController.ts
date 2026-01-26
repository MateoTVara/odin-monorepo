import type { Request, Response } from "express";
import { postsService } from "../services";
import { CreatePost, CreatePostBody, UpdatePost, UserOwnershipContext } from "../types";

class PostsController {
  async postCreate(req: Request<{}, {}, CreatePostBody>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const authorId = req.user.id;
    const postData: CreatePost = {
      ...req.body,
      authorId
    };
    const createdPost = await postsService.create(postData);
    res.status(201).json(createdPost);
  }

  async getPublishedById(req: Request<{ id: string }>, res: Response) {
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

  async patchById(req: Request<{ id: string }, {}, UpdatePost>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ownershipContext: UserOwnershipContext = {
      userId: req.user.id,
      role: req.user.role,
    };

    const postId = Number(req.params.id);
    const updatedPost = await postsService.update(postId, req.body, ownershipContext);
    res.json(updatedPost);
  }

  async deleteById(req: Request<{ id: string }>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ownershipContext: UserOwnershipContext = {
      userId: req.user.id,
      role: req.user.role,
    };

    const postId = Number(req.params.id);
    await postsService.delete(postId, ownershipContext);
    res.status(204).send();
  }
}

export const postsController = new PostsController();