import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const messagesController = (() => {
  const getRoomMessages = () => {};

  return { getRoomMessages };
})();

export default messagesController;
