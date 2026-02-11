// api/src/controllers/postsController.ts
import type { CreatePost, CreatePostBody, UpdatePost, UserOwnershipContext } from "../types";
import type { Request, RequestHandler, Response } from "express";
import { postsService } from "../services";
import { body, matchedData, param } from "express-validator";
import { IdParam } from "../types/pathParams";
import { validateRequest } from "./helpers/validateRequest";
import { asyncHandler } from "./helpers/asyncHandler";

class PostsController {
  private readonly validationMessages = {
    body: {
      title: {
        isString: 'Title must be a string',
        isLength: {
          min: 'Title must be at least 1 character long',
          max: 'Title must be at most 200 characters long',
        },
      },
      content: {
        isString: 'Content must be a string',
        isLength: {
          min: 'Content must be at least 1 character long',
        },
      },
      summary: {
        isString: 'Summary must be a string',
        isLength: {
          min: 'Summary must be at least 1 character long',
          max: 'Summary must be at most 500 characters long',
        },
      },
      published: {
        isBoolean: 'Published must be a boolean value',
      },
    },
    param: {
      id: {
        isInt: 'ID must be an integer',
      }
    }
  }

  private readonly idParamValidator = [
    param('id').isInt().withMessage(this.validationMessages.param.id.isInt).toInt(),
  ]

  private readonly createPostValidators = [
    body('title').trim()
      .isString().withMessage(this.validationMessages.body.title.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.title.isLength.min)
      .isLength({ max: 200 }).withMessage(this.validationMessages.body.title.isLength.max),
    body('content').trim()
      .isString().withMessage(this.validationMessages.body.content.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.content.isLength.min),

    body('summary').trim()
      .isString().withMessage(this.validationMessages.body.summary.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.summary.isLength.min)
      .isLength({ max: 500 }).withMessage(this.validationMessages.body.summary.isLength.max),
  ];

  postCreate: RequestHandler[] = [
    ...this.createPostValidators,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const data = matchedData<CreatePostBody>(req);
      
      // req.user! justified by authenticateJwt middleware
      const authorId = req.user!.id;
      const postData: CreatePost = {
        ...data,
        authorId
      };
      const createdPost = await postsService.create(postData);
      res.status(201).json(createdPost);
    })
  ]

  getPublishedById: RequestHandler[] = [
    ...this.idParamValidator,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const { id: postId } = matchedData<IdParam>(req);
      const post = await postsService.readPublishedById(postId);
      res.json(post);
    })
  ]

  getAllPublished: RequestHandler = asyncHandler(async (_req: Request, res: Response) => {
    const posts = await postsService.readAllPublished();
    res.json(posts);
  })

  private readonly updatePostValidators = [
    param('id').isInt().withMessage(this.validationMessages.param.id.isInt).toInt(),
    body('title').optional().trim()
      .isString().withMessage(this.validationMessages.body.title.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.title.isLength.min)
      .isLength({ max: 200 }).withMessage(this.validationMessages.body.title.isLength.max),
    body('content').optional().trim()
      .isString().withMessage(this.validationMessages.body.content.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.content.isLength.min),
    body('summary').optional().trim()
      .isString().withMessage(this.validationMessages.body.summary.isString)
      .isLength({ min: 1 }).withMessage(this.validationMessages.body.summary.isLength.min)
      .isLength({ max: 500 }).withMessage(this.validationMessages.body.summary.isLength.max),
    body('published').optional()
      .isBoolean().withMessage(this.validationMessages.body.published.isBoolean).toBoolean(),
  ];

  patchById: RequestHandler[] = [
    ...this.updatePostValidators,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const { id: postId, ...data } = matchedData<IdParam & UpdatePost>(req);
      // req.user! justified by authenticateJwt middleware
      const ownershipContext: UserOwnershipContext = {
        userId: req.user!.id,
        role: req.user!.role,
      };
      const updatedPost = await postsService.update(postId, data, ownershipContext);
      res.json(updatedPost);
    })
  ];

  deleteById: RequestHandler[] = [
    ...this.idParamValidator,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      // req.user! justified by authenticateJwt middleware
      const ownershipContext: UserOwnershipContext = {
        userId: req.user!.id,
        role: req.user!.role,
      };

      const { id: postId } = matchedData<IdParam>(req);
      await postsService.delete(postId, ownershipContext);
      res.status(204).send();
    })
  ]
}

export const postsController = new PostsController();