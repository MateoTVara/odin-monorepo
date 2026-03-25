import { prisma } from "../prisma";
import characters from "./characters";
import levels from "./levels";
import levelCharacters from "./level_characters";
import { exit } from "process";

async function seed() {
  await prisma.character.createMany({ data: characters });
  await prisma.level.createMany({ data: levels });
  await prisma.levelCharacter.createMany({ data: levelCharacters });
  console.log("Database seeding completed successfully.");
  exit(0);
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    exit(1);
  });