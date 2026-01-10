import { prisma } from "../../lib/prisma.js";

class EntriesService {
  
  // ###############
  // # C R E A T E #
  // ###############

  createFolder = async ({ ownerId, name, parentId = null }) => {
    await this.#assertParentIsFolder(parentId);
    return await prisma.entry.create({
      data: {
        name,
        parentId,
        owner: { connect: { id: ownerId } },
        folder: { create: {} },
      }
    });
  };

  createFile = async ({ ownerId, name, file: { size, mime, url }, parentId = null }) => {
    await this.#assertParentIsFolder(parentId);
    return await prisma.entry.create({
      data: {
        name,
        parentId,
        owner: { connect: { id: ownerId } },
        file: { create: { size, mime, url } },
      },
    });
  };



  // ###########
  // # R E A D #
  // ###########

  readManyByOwnerIdAndNoParent = async ownerId => {
    return await prisma.entry.findMany({
      where: { ownerId, parentId: null }
    });
  };



  // ###############
  // # U P D A T E #
  // ###############

  rename = async (id, { newName }) => {
    return await prisma.entry.update({
      where: { id },
      data: { name: newName },
    });
  };

  updateFile = async (id, { newName, file: {newSize, newMime, newUrl}, newParentId = null }) => {
    await this.#assertParentIsFolder(newParentId);
    
    const entry = await prisma.entry.findUnique({
      where: { id },
      include: { file: true },
    });

    if (!entry?.file) throw new Error("Entry is not a file");

    return await prisma.entry.update({
      where: { id },
      data: {
        name: newName,
        parentId: newParentId,
        file: { update: {
          size: newSize,
          mime: newMime,
          url: newUrl,
        }},
      },
    });
  };



  // ###############
  // # D E L E T E #
  // ###############

  delete = async id => await prisma.entry.delete({ where: { id } });



  // ###############
  // # O T H E R S #
  // ###############

  #assertParentIsFolder = async parentId => {
    if (!parentId) return;

    const parent = await prisma.entry.findUnique({
      where: { id: parentId },
      include: { file: true },
    });

    if (!parent) throw new Error("Parent entry not found");

    if (parent.file) throw new Error("Files cannot contain children");
  };

}

const entriesService = new EntriesService;

export default entriesService;