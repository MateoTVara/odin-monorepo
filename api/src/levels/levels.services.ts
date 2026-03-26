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
          }
        }
      },
    });

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
      }))
    }
  }
});

export default levelService;