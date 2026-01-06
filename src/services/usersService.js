// const { prisma } = require('../../lib/prisma');
import { prisma } from "../../lib/prisma.js";

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
}

const findUserByEmail= async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
}

const createUser = async ({ email, password, name = '', lastname = '' }) => {
  return prisma.user.create({
    data: {
      email,
      password,
      name,
      lastname,
    }
  })
}

export default {
  createUser,

  findUserById,
  findUserByEmail,
}