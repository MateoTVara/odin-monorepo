import filesService from "../services/filesService.js";

class FilesController {

  get = async (req, res, next) => {
    const fileId = Number(req.params.id);
    const file = await filesService.readById(fileId);

    res.render('pages/file', {
      title: file.entry.name,
      file,
    });
  };

}

const filesController = new FilesController;

export default filesController;