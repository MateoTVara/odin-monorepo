import { Prisma } from "../../generated/prisma/client";

const levelCharacters: Prisma.LevelCharacterCreateManyInput[] = [
  {
    levelId: 1,
    characterId: 1,
    x: 521,
    y: 364,
    width: 43,
    height: 60
  },
  {
    levelId: 1,
    characterId: 2,
    x: 239,
    y: 360,
    width: 17,
    height: 61
  },
  {
    levelId: 1,
    characterId: 3,
    x: 628,
    y: 358,
    width: 28,
    height: 54
  }
];

export default levelCharacters;