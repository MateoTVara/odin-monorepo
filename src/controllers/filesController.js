import filesService from "../services/filesService.js";

class FilesController {

  postUpload = async (req, res, next) => {
    const parentId = Number(req.body.parentId);
    try {
      for (const { originalname, mimetype, size, path } of req.files) {
        await filesService.uploadFile({
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