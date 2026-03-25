import { Request, Response } from "express";
import levelService from "./levels.services";
import asyncHandler from "../utils/asyncHandler";
import levelsValidator from "./levels.validator";
import validateRequest from "../utils/validateRequest";
import { matchedData } from "express-validator";
import type IdParam from "../utils/types/IdParam";

const levelsController = Object.freeze({
  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const levels = await levelService.readAll();
    res.json(levels);
  }),

  getDetail: [
    ...levelsValidator.idParam,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const { id: levelId } = matchedData<IdParam>(req);
      const level = await levelService.readDetail(levelId);
      res.json(level);
    })
  ],
});

export default levelsController;