import { body } from "express-validator";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export default body("username")
  .exists()
  .withMessage("Username is required")
  .trim()
  .notEmpty()
  .withMessage("Username can't be empty")
  .custom(async (value) => {
    const user = await prisma.user.findFirst({
      where: {
        username: value,
      },
    });
    if (user) {
      throw new Error("Username is already taken");
    }
  });
