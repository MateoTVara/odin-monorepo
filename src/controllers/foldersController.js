import { body, validationResult, matchedData } from "express-validator";
import foldersService from "../services/foldersService.js";
import entriesService from "../services/entriesService.js";
import archiver from "archiver";
import * as fs from "node:fs";

class FoldersController {

  #entryFolderNameFieldMsg = "Name must be at least 1 character long."

  #validateCreate = [
    body("name").trim().notEmpty().withMessage(this.#entryFolderNameFieldMsg),
    body("parentId").optional({ values: "null" }).isInt().withMessage("Invalid parentId").toInt(),
  ];

  postCreate = [
    this.#validateCreate,
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          ok:false,
          errors: errors.array(),
        });
      }

      const { name, parentId } = matchedData(req);

      try {
        const newFolder = await foldersService.create({
          ownerId: Number(req.user.id),
          name,
          parentId,
        });
        res.json({ ok: true, folder: newFolder });
      } catch (error) {
        next(error);
      }
    }
  ];



  getById = async (req, res) => {
    const folderId = Number(req.params.id);
    req.user.entries = await foldersService.readEntriesById(folderId);
    const folderName = (await foldersService.readById(folderId)).entry.name;
    const parents = await entriesService.readBreadcrumbs(folderId);

    res.render('pages/index', {
      parents,
      title: folderName,
      styles: ['pages/index'],
      scripts: ['pages/index'],
    });
  };



  getDownload = async (req, res, next) => {
    const addFolderToArchive = async (folderId, archive, basePath) => {
      const entries = await foldersService.readEntriesById(folderId);

      for (const entry of entries) {
        const entryPath = `${basePath}/${entry.name}`;
        if (entry.file) {
          archive.append(
            fs.createReadStream(entry.file.url),
            { name: entryPath }
          );
        }

        if (entry.folder) {
          archive.append(Buffer.alloc(0), { name: `${entryPath}/` });
          await addFolderToArchive(entry.id, archive, entryPath);
        }
      }
    };

    try {
      const folderId = Number(req.params.id);
      const folder = await foldersService.readById(folderId);

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${folder.entry.name}.zip"`
      )

      const archive = archiver('zip');

      archive.on("error", (err) => {
        next(err);
      });

      archive.pipe(res);

      await addFolderToArchive(folderId, archive, folder.entry.name);

      await archive.finalize();
    } catch (error) {
      next(error);
    }
  };
}

const foldersController = new FoldersController;

export default foldersController;