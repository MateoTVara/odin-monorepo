import { prisma } from "../../lib/prisma";
import { CreateRunInput } from "./runs.types";

const runsService = Object.freeze({
  async create(data: CreateRunInput) {
    const existingRun = await prisma.run.findFirst({
      where: {
        sessionId: data.sessionId,
        levelId: data.levelId,
        passed: false
      }
    });

    if (existingRun) return existingRun;

    return await prisma.run.create({ data });
  }
});

export default runsService;