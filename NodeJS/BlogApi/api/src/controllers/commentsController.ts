// api/src/controllers/commentsController.ts
import type { Request, RequestHandler, Response } from "express";
import type { CreateComment, CreateCommentBody, UpdateComment, UserOwnershipContext } from "../types";
import { commentsService } from "../services";
import { matchedData, body, param } from "express-validator";
import type { IdParam } from "../types/pathParams";
import { validateRequest } from "./helpers/validateRequest";
import { asyncHandler } from "./helpers/asyncHandler";

class CommentsController {

  private readonly validationMessages = {
    param: {
      id: {
        isInt: "ID must be an integer"
      }
    },
    body: {
      content: {
        isString: "Content must be a string",
        isLength: {
          min: "Content cannot be empty",
          max: "Content cannot exceed 500 characters"
        }
      },
      postId: {
        isInt: "Post ID must be an integer",
        notEmpty: "Post ID is required"
      }
    }
  }

  private readonly idParamValidator = [
    param('id').isInt().withMessage(this.validationMessages.param.id.isInt).toInt(),
  ]

  private readonly createCommentValidators = [
    body('content').trim()
      .isString().withMessage(this.validationMessages.body.content.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.content.isLength.min)
      .isLength({ max: 500 }).withMessage(this.validationMessages.body.content.isLength.max),
    body('postId')
      .isInt().withMessage(this.validationMessages.body.postId.isInt)
      .notEmpty().withMessage(this.validationMessages.body.postId.notEmpty)
      .toInt(),
  ]

  postCreate: RequestHandler[] = [
    ...this.createCommentValidators,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      // req.user! justified by authenticateJwt middleware
      const authorId = req.user!.id;
      const data = matchedData<CreateCommentBody>(req)
      const commentData: CreateComment = {
        ...data,
        authorId
      };
      const createdComment = await commentsService.create(commentData);
      return res.status(201).json(createdComment);
    })
  ]

  getById: RequestHandler[] = [
    ...this.idParamValidator,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const { id: commentId } = matchedData<IdParam>(req);
      const comment = await commentsService.readById(commentId);
      return res.json(comment);
    })
  ]

  getAll: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
    const comments = await commentsService.readAll();
    return res.json(comments);
  })

  private readonly updateCommentValidators = [
    param('id').isInt().withMessage(this.validationMessages.param.id.isInt).toInt(),
    body('content').optional().trim()
      .isString().withMessage(this.validationMessages.body.content.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.content.isLength.min)
      .isLength({ max: 500 }).withMessage(this.validationMessages.body.content.isLength.max),
  ]

  patchById = [
    ...this.updateCommentValidators,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      // req.user! justified by authenticateJwt middleware
      const user = req.user!;
      const ownershipContext: UserOwnershipContext = {
        userId: user.id,
        role: user.role
      }
      const { id: commentId, ...data } = matchedData<IdParam & UpdateComment>(req);
      const updatedComment = await commentsService.update(commentId, data, ownershipContext);
      return res.json(updatedComment);
    })
  ]

  deleteById: RequestHandler[] = [
    ...this.idParamValidator,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      // req.user! justified by authenticateJwt middleware
      const user = req.user!;
      const ownershipContext: UserOwnershipContext = {
        userId: user.id,
        role: user.role
      }
      const { id: commentId } = matchedData<IdParam>(req);
      await commentsService.delete(commentId, ownershipContext);
      return res.status(204).send();
    })
  ]
}

export const commentsController = new CommentsController();