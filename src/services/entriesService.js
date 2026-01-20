import { prisma } from "../../lib/prisma.js";

class EntriesService {
  
  // ###############
  // # C R E A T E #
  // ###############



  // ###########
  // # R E A D #
  // ###########

  readById = async id => await prisma.entry.findUnique({
    where: { id },
    include: { file: true, folder: true, children: true },
  });

  readRootEntries = async ownerId => {
    return await prisma.entry.findMany({
      where: { ownerId, parentId: null },
      include: { file: true },
    });
  };

  readBreadcrumbs = async id => {
    const breadcrumbs = [];

    const startEntry = await prisma.entry.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
    });

    if (!startEntry) return breadcrumbs;

    breadcrumbs.unshift(startEntry);
    let currentEntry = startEntry;

    for (let i = 0; i < 4; i++) {
      if (!currentEntry.parentId) break;

      const parentEntry = await prisma.entry.findUnique({
        where: { id: currentEntry.parentId },
        select: {
          id: true,
          name: true,
          parentId: true,
        },
      });

      if (!parentEntry) break;

      breadcrumbs.unshift(parentEntry);
      currentEntry = parentEntry;
    }

    return breadcrumbs;
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



  // ###############
  // # D E L E T E #
  // ###############

  delete = async id => await prisma.entry.delete({
    where: { id },
    include: { file: true, folder: true, children: true },
  });

}

const entriesService = new EntriesService;

export default entriesService;