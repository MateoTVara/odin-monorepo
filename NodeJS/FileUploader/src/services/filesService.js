import cloudinary from "../../lib/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
import foldersService from "./foldersService.js";

class FilesService {

  uploadFile = async ({ ownerId, name, file: { size, mime, buffer }, parentId = null }) => {
    if (parentId) {
      await foldersService.validateFolder(parentId, ownerId);
    }

    const uploadedFile = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) return reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    return await prisma.entry.create({
      data: {
        name,
        owner: { connect: { id: ownerId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        file: {
          create: {
            size, mime,
            url: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
            resourceType: uploadedFile.resource_type,
          }, 
        },
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