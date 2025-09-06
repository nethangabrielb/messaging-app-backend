import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const connectHandler = async (token, status, callback) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const updatedUserStatus = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      status,
    },
  });

  if (updatedUserStatus) {
    return true;
  }
};

export default connectHandler;
