import { body, validationResult, matchedData } from "express-validator";
import foldersService from "../services/foldersService.js";

class FoldersController {

  #validateCreate = [
    body("name").trim()
      .isLength({ min: 1 }).withMessage("Name must be at least 1 characters long.")
  ];

  #validateEdit = [
    body("newName").trim()
      .isLength({ min: 1 })
  ];

  postCreate = [
    this.#validateCreate,
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          errors: errors.array(),
        });
      }

      const userId = req.user.id;
      const newFolderData = matchedData(req);
      
      try {
        const newFolder = await foldersService.create({
          ...newFolderData,
          ownerId: userId,
        });
        res.json({ ok: true, folder: newFolder });
      } catch (error) {
        next(error);
      }
    }
  ];

  postEdit = [
    this.#validateEdit,
    async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          errors: errors.array(),
        });
      }
      
      const folderId = Number(req.params.id);
      const newFolderData = matchedData(req);

      try {
        const updatedFolder = await foldersService.update(folderId, { ...newFolderData });
        res.json({ ok: true, folder: updatedFolder });
      } catch (error) {
        next(error);
      }   
    }
  ];

  postDelete = async (req, res, next) => {
    const folderId = Number(req.params.id);

    try {
      const deletedFolder = await foldersService.delete(folderId);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
}

const foldersController = new FoldersController;

export default foldersController;