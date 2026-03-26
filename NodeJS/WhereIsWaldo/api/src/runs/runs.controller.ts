import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import validateRequest from "../utils/validateRequest";
import runsValidator from "./runs.validator";
import { matchedData } from "express-validator/lib/matched-data";
import { CreateRunDTO } from "./runs.types";
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
  ]
});

export default runsController;