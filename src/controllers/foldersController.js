import { body, validationResult, matchedData } from "express-validator";
import foldersService from "../services/foldersService.js";

class FoldersController {

  #validateEdit = [
    body("newName").trim()
      .isLength({ min: 1 })
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
      const newUserData = matchedData(req);

      try {
        const updatedFolder = await foldersService.update(folderId, { ...newUserData });
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