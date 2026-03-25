import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../errors/errors";

const levelService = Object.freeze({
  async readAll() {
    return await prisma.level.findMany();
  },

  async readDetail(levelId: number) {
    const level = await prisma.level.findUnique({
      where: { id: levelId },
      select: {
        id: true,
        name: true,
        img_url: true,
        characters: {
          select: {
            character: {
              select: {
                id: true,
                name: true,
                img_url: true,
              },
            },
            x: true,
            y: true,
            width: true,
            height: true,
          }
        }
      },
    });

    if (!level) throw new NotFoundError(`Level with ID ${levelId} not found`);

    return level;
  }
});

export default levelService;