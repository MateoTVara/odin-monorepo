import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
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

  const [post1, post2] = await prisma.$transaction([
    prisma.post.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: "Welcome Post",
        content: "This is the first post in our blog!",
        published: true,
        authorId: admin.id,
      },
    }),
    prisma.post.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: "Admin's Thoughts",
        content: "Sharing some insights from the admin.",
        published: true,
        authorId: admin.id,
      },
    }),
  ]);

  // const [comment1, comment2, comment3] = 
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
  ]);

  console.log("Seeding completed.");
}

try {
  await seed();
} catch (error) {
  console.error("Seeding failed:", error);
}