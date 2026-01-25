import { Request, Response } from "express";
import { postsService } from "../services";

class PostsController {
  async getAllPublished(req: Request, res: Response) {
    const posts = await postsService.readAllPublished();
    res.json(posts);
  }
}

export const postsController = new PostsController();