import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.js";
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();

const initializeRoom = async (token, recipientId, callback) => {
  const client = jwt.verify(token, process.env.JWT_SECRET);
  delete client.iat;
  const recipient = await prisma.user.findUnique({
    where: {
      id: Number(recipientId),
    },
  });

  // Find room if it exists
  const roomName = CryptoJS.MD5(
    `${client.username}${recipient.username}`
  ).toString();

  const room = await prisma.room.findUnique({
    where: {
      name: roomName,
    },
  });
  if (room) {
    callback({ success: true, message: null, room });
  } else {
    // Otherwise create new room
    const roomNew = await prisma.room.create({
      data: {
        name: roomName,
        users: {
          connect: [client, recipient],
        },
      },
    });
    if (roomNew) {
      callback({
        success: true,
        message: "Chatroom created successfully!",
        room: roomNew,
      });
    } else {
      callback({
        success: false,
        message: "There was an issue creating chatroom.",
        room: roomNew,
      });
    }
  }
};

export default initializeRoom;
