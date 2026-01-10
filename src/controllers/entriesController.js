import { body, validationResult, matchedData } from "express-validator";
import entriesService from "../services/entriesService.js";

class EntriesController {
  
  #validateRename = [body("newName").trim().notEmpty().withMessage("Name must be at least 1 character long.")];

  postRename = [
    this.#validateRename,
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          errors: errors.array(),
        });
      }

      const entryId = Number(req.params.id);
      const newName = matchedData(req);

      try {
        const renamedEntry = await entriesService.rename(entryId, newName);
        res.json({ ok: true, entry: renamedEntry });
      } catch (error) {
        next(error);
      }
    }
  ];

  postDelete = async (req, res, next) => {
    const entryId = Number(req.params.id);

    try {
      const deletedEntry = await entriesService.delete(entryId);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }

}

const entriesController = new EntriesController;

export default entriesController;