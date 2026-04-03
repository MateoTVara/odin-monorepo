import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import validateRequest from "../utils/validateRequest";
import runsValidator from "./runs.validator";
import { matchedData } from "express-validator";
import { CreateRunDTO, MarkCharacterFoundInput } from "./runs.types";
import runsService from "./runs.services";

const runsController = Object.freeze({
  postCreate: [
    ...runsValidator.create,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const data = matchedData<CreateRunDTO>(req);
      const run = await runsService.create({
        ...data, sessionId: req.sessionId,
      });
      res.status(201).json(run);
    })
  ],

  postMarkCharacterFound: [
    ...runsValidator.markCharacterFound,
    validateRequest,
    asyncHandler(async (req: Request, res: Response) => {
      const data = matchedData<MarkCharacterFoundInput>(req);
      const foundCharacter = await runsService.markCharacterFound(data);
      res.status(201).json(foundCharacter);
    })
  ],
});

export default runsController;