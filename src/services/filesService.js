import { prisma } from "../../lib/prisma.js";
import foldersService from "./foldersService.js";

class FilesService {

  uploadFile = async ({ ownerId, name, file: { size, mime, url }, parentId = null }) => {
    if (parentId) {
      await foldersService.validateFolder(parentId, ownerId);
    }

    return await prisma.entry.create({
      data: {
        name,
        owner: { connect: { id: ownerId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        file: { create: { size, mime, url } },
      },
    });
  };

  readById = async id => {
    return await prisma.file.findUnique({
      where: { id },
      include: { entry: true },
    });
  };
}

const filesService = new FilesService;

export default filesService;