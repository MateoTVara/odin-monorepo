import { prisma } from "../../lib/prisma.js";

class EntriesService {
  
  // ###############
  // # C R E A T E #
  // ###############

  createFolder = async ({ ownerId, name, parentId = null }) => {
    await this.#assertParentIsFolder(parentId);

    if (parentId) {
      const parent = await prisma.entry.findUnique({ where: { id: parentId } });
      if (!parent || parent.ownerId !== ownerId ) {
        throw new Error("Invalid parent folder")
      }
    }

    return await prisma.entry.create({
      data: {
        name,
        owner: { connect: { id: ownerId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        folder: { create: {} },
      }
    });
  };

  createFile = async ({ ownerId, name, file: { size, mime, url }, parentId = null }) => {
    await this.#assertParentIsFolder(parentId);
    return await prisma.entry.create({
      data: {
        name,
        owner: { connect: { id: ownerId } },
        parent: parentId ? { connect: { id: parentId } } : undefined,
        file: { create: { size, mime, url } },
      },
    });
  };



  // ###########
  // # R E A D #
  // ###########

  readById = async id => await prisma.entry.findUnique({ where: { id } });

  readFolderEntriesById = async id => {
    this.#assertEntryIsFolder(id);

    return await prisma.entry.findMany({
      where: { parentId: id },
    });
  };

  readRootEntries = async ownerId => {
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
        parent: newParentId ? { connect: { id: newParentId } } : { disconnect: true },
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

  #assertEntryIsFolder = async id => {
    const entry = await prisma.entry.findUnique({
      where: { id },
      include: { file:true },
    });

    if (!entry) throw new Error("Entry not found");
    if (entry.file) throw new Error("Entry is not folder");

    return entry;
  };

  #assertParentIsFolder = async parentId => {
    if (!parentId) return;
    await this.#assertEntryIsFolder(parentId);
  };

}

const entriesService = new EntriesService;

export default entriesService;