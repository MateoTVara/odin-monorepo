import { Router } from "express";
import runsController from "./runs.controller";

const runsRouter = Router();

runsRouter.post("/", runsController.postCreate);

export default runsRouter;