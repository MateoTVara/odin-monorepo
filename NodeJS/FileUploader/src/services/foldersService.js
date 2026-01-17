import { prisma } from "../../lib/prisma.js";

class FoldersService {
  
  create = async ({ ownerId, name, parentId = null }) => {
    if (parentId) {
      await this.validateFolder(parentId, ownerId);
    }    

    return await prisma.entry.create({
      data: {
        name,
        owner: { connect: { id: ownerId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        folder: { create: {} },
      },
    });
  };

  readById = async id => {
    await this.validateFolder(id);

    return await prisma.folder.findUnique({
      where: { id },
      include: { entry: true },
    });
  }

  readEntriesById = async id => {
    await this.validateFolder(id);

    return await prisma.entry.findMany({
      where: { parentId: id },
      include: { file: true },
    });
  };

  validateFolder = async (folderId, ownerId = null) => {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { entry: { select: { ownerId: true } } },
    });
    
    if (!folder) {
      throw new Error("Folder not found");
    }

    if (ownerId && folder.entry.ownerId !== ownerId) {
      throw new Error("Invalid folder");
    }
  };

}

const foldersService = new FoldersService;

export default foldersService;