import { Prisma } from "../../generated/prisma/client";

const specs: [number, number, number, number, number, number][] = [
  // Level 1
  [1, 1, 521, 364, 43, 60],
  [1, 2, 239, 360, 17, 61],
  [1, 3, 628, 358, 28, 54],

  // Level 2
  [2, 1, 1044, 249, 26, 38],

  // Level 3
  [3, 1, 1191, 34, 16, 34],
  [3, 2, 1142, 447, 18, 42],
  [3, 3, 358, 304, 29, 63],
  [3, 4, 343, 522, 15, 18],

  // Level 4
  [4, 1, 944, 56, 23, 26],
  [4, 2, 42, 541, 25, 43],

  // Level 5
  [5, 1, 742, 176, 22, 54],
  [5, 2, 389, 1100, 26, 56],
  [5, 3, 929, 1493, 20, 35],
  [5, 4, 355, 1636, 29, 39],

  // Level 6
  [6, 1, 193, 1448, 45, 107],

  // Level 7
  [7, 1, 981, 609, 11, 33],
  [7, 2, 474, 635, 10, 35],
  [7, 3, 1152, 580, 10, 32],
  [7, 4, 778, 677, 13, 33],

  // Level 8
  [8, 1, 989, 373, 17, 43],
  [8, 2, 695, 648, 17, 32],
  [8, 3, 1474, 914, 30, 64],
  [8, 4, 673, 348, 15, 29],

  // Level 9
  [9, 1, 461, 1533, 19, 22],
  [9, 2, 2437, 1489, 14, 22],
  [9, 3, 811, 233, 13, 19],
  [9, 4, 2128, 1378, 18, 25],
]

const levelCharacters: Prisma.LevelCharacterCreateManyInput[] = [
  ...specs.map(([levelId, characterId, x, y, width, height]) => ({
    levelId,
    characterId,
    x, y,
    width,
    height
  }))
];

export default levelCharacters;