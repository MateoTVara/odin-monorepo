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
        imgUrl: true,
        characters: {
          select: {
            character: {
              select: {
                id: true,
                name: true,
                imgUrl: true,
              },
            },
            x: true,
            y: true,
            width: true,
            height: true,
          },
        },
        runs: {
          where: {
            finishTime: { not: null },
          },
          select: {
            name: true,
            startTime: true,
            finishTime: true,
          },
        },
      },
    });

    if (level?.runs) {
      // compute duration and sort
      level.runs.sort((a, b) => {
        const durA = a.finishTime!.getTime() - a.startTime.getTime();
        const durB = b.finishTime!.getTime() - b.startTime.getTime();
        return durA - durB; // fastest first
      });

      // take top 10
      level.runs = level.runs.slice(0, 10);
    }

    if (!level) throw new NotFoundError(`Level with ID ${levelId} not found`);

    return {
      ...level,
      characters: level.characters.map(c => ({
        id: c.character.id,
        name: c.character.name,
        imgUrl: c.character.imgUrl,
        x: c.x, y: c.y,
        width: c.width,
        height: c.height,
      })),
    }
  }
});

export default levelService;