import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../errors/errors";
import { CreateRunInput, MarkCharacterFoundInput } from "./runs.types";

const runsService = Object.freeze({
  async create(data: CreateRunInput) {
    const runSelect = {
      id: true,
      name: true,
      levelId: true,
      sessionId: true,
      startTime: true,
      finishTime: true,
      characters: {
        select: {
          foundAt: true,
          levelCharacter: {
            select: {
              characterId: true,
            }
          }
        }
      },
    }

    let run = await prisma.run.findFirst({
      where: {
        sessionId: data.sessionId,
        levelId: data.levelId,
        finishTime: null,
      },
      select: runSelect,
    });

    if (!run) run = await prisma.run.create({data, select: runSelect });

    return {
      ...run,
      characters: run.characters.map(c => ({
        foundAt: c.foundAt,
        characterId: c.levelCharacter.characterId,
      }))
    };
  },

  async markCharacterFound(data: MarkCharacterFoundInput) {
    const run = await prisma.run.findUnique({
      where: { id: data.runId },
    });

    if (!run) throw new NotFoundError("Run not found");

    const levelCharacter = await prisma.levelCharacter.findFirst({
      where: {
        levelId: run.levelId,
        characterId: data.characterId,
      }
    });

    if (!levelCharacter) throw new NotFoundError("Character not found in this level");

    const isInside =
      data.x >= levelCharacter.x &&
      data.x <= levelCharacter.x + levelCharacter.width &&
      data.y >= levelCharacter.y &&
      data.y <= levelCharacter.y + levelCharacter.height;

    if (!isInside) throw new NotFoundError("Character not found at the given coordinates");
    
    const found = await prisma.runCharacter.create({
      data: {
        runId: data.runId,
        levelCharacterId: levelCharacter.id,
      }
    });

    const totalCharacters = await prisma.levelCharacter.count({
      where: { levelId: run.levelId },
    });

    const foundCharacters = await prisma.runCharacter.count({
      where: { runId: data.runId },
    });

    if (totalCharacters === foundCharacters) {
      await prisma.run.update({
        where: { id: data.runId },
        data: { finishTime: new Date() },
      });
    }

    return found;
  }
});

export default runsService;