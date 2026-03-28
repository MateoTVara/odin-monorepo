import { Router } from "express";
import runsController from "./runs.controller";

const runsRouter = Router();

runsRouter.post("/", runsController.postCreate);
runsRouter.post("/:runId/characters/:characterId/found", runsController.postMarkCharacterFound);

export default runsRouter;