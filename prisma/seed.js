import { prisma } from "../lib/prisma.js";
import { env } from "node:process";
import { configDotenv } from "dotenv";

// load root .env reliably
configDotenv({ quiet: true });

const { SEED_ADMIN_PASSWORD } = env;

const seed = async () => {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@example.com',
          password: SEED_ADMIN_PASSWORD,
          name: 'super',
          lastname: 'admin',
        }
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