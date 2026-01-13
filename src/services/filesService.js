import { prisma } from "../../lib/prisma.js";

class FilesService {
  readById = async id => {
    return await prisma.file.findUnique({
      where: { id },
      include: { entry: true },
    });
  };
}

const filesService = new FilesService;

export default filesService;