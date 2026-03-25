import { Request, Response } from "express";
import levelService from "./levels.services";

const levelsController = Object.freeze({
  async getAll(req: Request, res: Response) {
    const levels = await levelService.readAll()
    res.json(levels);
  },

  async getDetail(req: Request<{ id: string }>, res: Response) {
    const levelId = Number(req.params.id);
    const level = await levelService.readDetail(levelId);
    res.json(level);
  }
});

export default levelsController;