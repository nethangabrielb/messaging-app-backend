import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.js";
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();

const initializeRoom = async (token, recipientId, callback) => {
  const client = jwt.verify(token, process.env.JWT_SECRET);
  const recipient = await prisma.user.findUnique({
    where: {
      id: Number(recipientId),
    },
  });

  // Create unique room name
  const roomName = CryptoJS.MD5(
    `${client.username}${recipient.username}`
  ).toString();

  // Create room
  const room = await prisma.room.create({
    data: {
      name: roomName,
    },
  });

  if (!room) {
    callback({ success: false });
  } else {
    callback({ success: true });
  }
};

export default initializeRoom;
