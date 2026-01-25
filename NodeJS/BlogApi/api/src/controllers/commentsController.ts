import type { Request, Response } from "express";
import type { CreateComment, UpdateComment } from "../types";
import { commentsService } from "../services";

class CommentsController {
  async create(req: Request<{}, {}, CreateComment>, res: Response) {
    const createdComment = await commentsService.create(req.body);
    return res.status(201).json(createdComment);
  }

  async readById(req: Request<{ id: string }>, res: Response) {
    const commentId = Number(req.params.id);
    const comment = await commentsService.readById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.json(comment);
  }

  async readAll(_req: Request, res: Response) {
    const comments = await commentsService.readAll();
    return res.json(comments);
  }

  async update(req: Request<{ id: string }, {}, UpdateComment>, res: Response) {
    const commentId = Number(req.params.id);
    const updatedComment = await commentsService.update(commentId, req.body);
    return res.json(updatedComment);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const commentId = Number(req.params.id);
    await commentsService.delete(commentId);
    return res.status(204).send();
  }
}

export const commentsController = new CommentsController();