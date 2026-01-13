import { body, validationResult, matchedData } from "express-validator";
import entriesService from "../services/entriesService.js";
import { promises as fs } from "node:fs";

class EntriesController {
  
  #entryFolderNameFieldMsg = "Name must be at least 1 character long.";

  #validateRename = [body("newName").trim().notEmpty().withMessage(this.#entryFolderNameFieldMsg)];

  postUploadFile = async (req, res, next) => {
    const parentId = Number(req.body.parentId);
    try {
      for (const { originalname, mimetype, size, path } of req.files) {
        await entriesService.createFile({
          ownerId: Number(req.user.id),
          name: originalname,
          file: {
            size,
            mime: mimetype,
            url: path,
          },
          parentId: parentId ? parentId : null,
        });
      }
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  };

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
      const { newName } = matchedData(req);

      try {
        const renamedEntry = await entriesService.rename(entryId, { newName });
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

      if (deletedEntry.file) {
        try {
          await fs.unlink(deletedEntry.file.url);
        } catch (error) {
          console.error("Failed to unlink file form disk", error);
        }
      }

      res.redirect('/');
    } catch (error) {
      // next(error);
    }
  }

}

const entriesController = new EntriesController;

export default entriesController;