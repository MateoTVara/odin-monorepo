import { prisma } from "../../lib/prisma.js";

/**
 * @class UsersService
 * @description Service for managing user data.
 * @method findUserById - Finds a user by their ID.
 * @method findUserByEmail - Finds a user by their email.
 * @method createUser - Creates a new user.
 */
class UsersService {
  readById = async id => {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  readByEmail= async email => {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  create = async ({ email, password, name = '', lastname = '' }) => {
    return prisma.user.create({
      data: {
        email,
        password,
        name,
        lastname,
      }
    })
  }
}

const usersService = new UsersService;

export default usersService;