import type { Level } from "../../generated/prisma/client";

const levels: Omit<Level, "id">[] = [
  {
    name: "Beginner",
    img_url: "https://whereiswaldo.com/assets/level1-scene.webp",
  }
];

export default levels;