import { prisma } from "../lib/prisma";

async function seed() {
  const [admin, user] = await prisma.$transaction([
    prisma.user.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        password: "securepassword",
        email: "admin@example.com",
        role: "ADMIN",
      },
    }),
    prisma.user.upsert({
      where: { username: "user" },
      update: {},
      create: {
        username: "user",
        password: "userpassword",
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
        title: "User's First Post",
        content: "Hello, this is a post by a regular user.",
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