import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const messagesController = (() => {
  const getMessages = () => {};

  return { getMessages };
})();

export default messagesController;
