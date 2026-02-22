import { prisma } from "../lib/prisma.js";
import logger from "../winstonlog/logger.js";
async function main() {
  // Create a new user with a post
  const timestamp = Date.now();
  const user = await prisma.user.create({
    data: {
      email: `dev@mail.com`,
      username: `tboy`,
      password: "PASSWORD",
      fullname: "dev",
      roles: "USER",
    },
  });
  logger.info("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    where: {
      roles: "USER",
    },
  });
  logger.info("All users:", allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
