import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { posts } from "./seedData";
import "dotenv/config";

async function seed() {
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const userPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

  const [admin, user] = await prisma.$transaction([
    prisma.user.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        password: adminPassword,
        email: "admin@example.com",
        role: "ADMIN",
      },
    }),
    prisma.user.upsert({
      where: { username: "user" },
      update: {},
      create: {
        username: "user",
        password: userPassword,
        email: "user@example.com",
      },
    }),
  ]);

  const [post1, post2, post3] = await prisma.$transaction([
    ...Object.entries(posts).map(([key, postData], i) => {
      return prisma.post.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          ...postData,
        }
      });
    })
  ]);

  await prisma.$transaction([
    prisma.comment.upsert({
      where: { id: 1 },
      update: {},
      create: {
        content: "Great first post!",
        postId: post1.id,
        authorId: user.id,
      },
    }),
    prisma.comment.upsert({
      where: { id: 2 },
      update: {},
      create: {
        content: "Thanks for sharing.",
        postId: post1.id,
        authorId: admin.id,
      },
    }),
    prisma.comment.upsert({
      where: { id: 3 },
      update: {},
      create: {
        content: "Welcome to the blogosphere!",
        postId: post2.id,
        authorId: admin.id,
      },
    }),
    prisma.comment.upsert({
      where: { id: 4 },
      update: {},
      create: {
        content: "Looking forward to more posts.",
        postId: post3.id,
        authorId: user.id,
      },
    }),
  ]);

  console.log("Seeding completed.");
  process.exit(0);
}

try {
  await seed();
} catch (error) {
  console.error("Seeding failed:", error);
}