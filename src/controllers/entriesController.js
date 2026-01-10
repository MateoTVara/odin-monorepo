import { body, validationResult, matchedData } from "express-validator";
import entriesService from "../services/entriesService.js";

class EntriesController {
  
  #entryFolderNameFieldMsg = "Name must be at least 1 character long."

  #validateCreateFolder = [
    body("name").trim().notEmpty().withMessage(this.#entryFolderNameFieldMsg)
  ];

  #validateRename = [body("newName").trim().notEmpty().withMessage(this.#entryFolderNameFieldMsg)];

  postCreateFolder =[
    this.#validateCreateFolder,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok:false,
          errors: errors.array(),
        });
      }

      const { name } = matchedData(req);

      try {
        const newFolder = await entriesService.createFolder({
          ownerId: req.user.id,
          name,
        });
        res.json({ ok: true, folder: newFolder });
      } catch (error) {
        next(error);
      }
    }
  ];

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