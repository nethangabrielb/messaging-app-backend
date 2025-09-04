import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const messageHandler = async (message, token, roomName, callback) => {
  const senderData = jwt.verify(token, process.env.JWT_SECRET);
  const room = await prisma.room.findUnique({
    where: {
      name: roomName,
    },
  });

  const returnedMessage = await prisma.message.create({
    data: {
      message,
      senderId: senderData.id,
      roomId: room.id,
    },
  });

  if (returnedMessage) {
    callback({ success: true });
  }
};

export default messageHandler;
