import foldersService from "../services/foldersService.js";

class FoldersController {
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