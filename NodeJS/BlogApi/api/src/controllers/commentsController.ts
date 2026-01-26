import type { Request, Response } from "express";
import type { CreateComment, CreateCommentBody, UpdateComment, UserOwnershipContext } from "../types";
import { commentsService } from "../services";

class CommentsController {
  async postCreate(req: Request<{}, {}, CreateCommentBody>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const authorId = req.user.id;
    const commentData: CreateComment = {
      ...req.body,
      authorId
    };
    const createdComment = await commentsService.create(commentData);
    return res.status(201).json(createdComment);
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const commentId = Number(req.params.id);
    const comment = await commentsService.readById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.json(comment);
  }

  async getAll(_req: Request, res: Response) {
    const comments = await commentsService.readAll();
    return res.json(comments);
  }

  async patchById(req: Request<{ id: string }, {}, UpdateComment>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const ownershipContext: UserOwnershipContext = {
      userId: req.user.id,
      role: req.user.role
    }

    const commentId = Number(req.params.id);
    const updatedComment = await commentsService.update(commentId, req.body, ownershipContext);
    return res.json(updatedComment);
  }

  async deleteById(req: Request<{ id: string }>, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const ownershipContext: UserOwnershipContext = {
      userId: req.user.id,
      role: req.user.role
    }

    const commentId = Number(req.params.id);
    await commentsService.delete(commentId, ownershipContext);
    return res.status(204).send();
  }
}

export const commentsController = new CommentsController();