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

    await prisma.folder.createMany({
      data: [
        { name: 'Documents', ownerId: adminUser.id },
        { name: 'Pictures', ownerId: adminUser.id },
        { name: 'Projects', ownerId: adminUser.id },
      ],
      skipDuplicates: true,
    });

    const allUsers = await prisma.user.findMany({
      include: {
        folders: true,
      },
    })
    console.log('All users:', JSON.stringify(allUsers, null, 2));

    console.log('Done!');
  } catch (error) {
    console.error(`Seed failed: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

seed();