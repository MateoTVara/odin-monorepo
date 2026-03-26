import { Prisma } from "../../generated/prisma/client";

const levels: Prisma.LevelCreateManyInput[] = [
  {
    name: "Beginner",
    imgUrl: "https://whereiswaldo.com/assets/level1-scene.webp",
  }
];

export default levels;