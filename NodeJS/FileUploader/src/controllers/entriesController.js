import { body, validationResult, matchedData } from "express-validator";
import entriesService from "../services/entriesService.js";
import { promises as fs } from "node:fs";
import cloudinary from "../../lib/cloudinary.js";

class EntriesController {
  
  #entryFolderNameFieldMsg = "Name must be at least 1 character long.";

  #validateRename = [body("newName").trim().notEmpty().withMessage(this.#entryFolderNameFieldMsg)];

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
    const recursiveDeletion = async entryId => {
      const entry = await entriesService.readById(entryId);
      
      if (entry.file) {
        const result = await cloudinary.uploader.destroy(entry.file.publicId, { resource_type: entry.file.resourceType });
        await entriesService.delete(entry.id);
        return;
      }

      if (entry.folder) {
        for (const childEntry of entry.children) {
          await recursiveDeletion(childEntry.id);
        }
        await entriesService.delete(entry.id);
      }
    }

    try {
      await recursiveDeletion(entryId);
      res.json({ ok: true });
    } catch (error) {
      next(error);
    }
  };

}

const entriesController = new EntriesController;

export default entriesController;