import { prisma } from "../lib/prisma.js";
import { env } from "node:process";
import { configDotenv } from "dotenv";

// load root .env reliably
configDotenv({ quiet: true });

const { SEED_ADMIN_PASSWORD } = env;

const seed = async () => {
  try {
    const admin = await prisma.user.findFirst({
      where: { email: 'admin@example.com' },
    });
    
    let adminUser = admin;

    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: SEED_ADMIN_PASSWORD,
          name: 'super',
          lastname: 'admin',
        },
      });
    }

    const folderNames = ["Documents", "Pictures", "Projects"];

    for (const name of folderNames) {
      const exists = await prisma.entry.findFirst({
        where: { name, ownerId: adminUser.id }
      });

      if (exists) continue;

      await prisma.entry.create({
        data: {
          name,
          owner: { connect: { id: adminUser.id } },
          folder: { create: {} },
        },
      });
    }

    const allUsers = await prisma.user.findMany({
      include: {
        entries: true
      },
    });
    console.log('All users:', JSON.stringify(allUsers, null, 2));

    console.log('Done!');
  } catch (error) {
    console.error(`Seed failed: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

seed();