import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { comments, posts, users } from "./seedData";
import "dotenv/config";

async function seed() {

  await prisma.$transaction([
    ...users.map(userData => {
      return prisma.user.upsert({
        where: { username: userData.username },
        update: {},
        create: {
          ...userData,
        },
      });
    })
  ]);

  await prisma.$transaction([
    ...posts.map((postData, i) => {
      const id = i + 1;
      return prisma.post.upsert({
        where: { id },
        update: {},
        create: {
          ...postData,
        }
      })
    })
  ]);

  await prisma.$transaction([
    ...comments.map((commentData, i) => {
      const id = i + 1;
      return prisma.comment.upsert({
        where: { id },
        update: {},
        create: {
          ...commentData,
        }
      })
    })
  ]);

  console.log("Seeding completed.");
  process.exit(0);
}

try {
  await seed();
} catch (error) {
  console.error("Seeding failed:", error);
}