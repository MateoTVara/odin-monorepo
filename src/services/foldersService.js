import { prisma } from "../../lib/prisma.js";

class FoldersService {
  create = async ({ name, ownerId }) => {
    return await prisma.folder.create({
      data: {
        name,
        owner: { connect: { id: ownerId } }
      }
    });
  };

  readById = async id => {
    return await prisma.folder.findUnique({
      where: { id }
    });
  };

  readManyByOwnerId = async ownerId => {
    return await prisma.folder.findMany({
      where: { ownerId },
    });
  };

  update = async (id, { newName }) => {
    return await prisma.folder.update({
      where: { id },
      data: { name: newName },
    });
  };

  delete = async id => {
    return await prisma.folder.delete({
      where: { id },
    });
  };
}

const foldersService = new FoldersService;

export default foldersService;