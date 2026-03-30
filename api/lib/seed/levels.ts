import { Prisma } from "../../generated/prisma/client";

const levels: Prisma.LevelCreateManyInput[] = [
  {
    name: "Level 1",
    imgUrl: "https://whereiswaldo.com/assets/level1-scene.webp",
  },
  {
    name: "Level 2",
    imgUrl: "https://whereiswaldo.com/assets/level2-scene.webp",
  },
  {
    name: "Level 3",
    imgUrl: "https://whereiswaldo.com/assets/level3-scene.webp",
  },
  {
    name: "Level 4",
    imgUrl: "https://whereiswaldo.com/assets/level4-scene.webp",
  },
  {
    name: "Level 5",
    imgUrl: "https://whereiswaldo.com/assets/level5-scene.webp",
  },
  {
    name: "Level 6",
    imgUrl: "https://whereiswaldo.com/assets/level6-scene.webp",
  },
  {
    name: "Level 7",
    imgUrl: "https://whereiswaldo.com/assets/level7-scene.webp",
  },
  {
    name: "Level 8",
    imgUrl: "https://whereiswaldo.com/assets/level8-scene.webp",
  },
  {
    name: "Level 9",
    imgUrl: "https://whereiswaldo.com/assets/level9-scene.webp",
  },
];

export default levels;