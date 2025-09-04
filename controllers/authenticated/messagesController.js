import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const messagesController = (() => {
  const getRoomMessages = async (req, res) => {
    const { roomName } = req.params;

    const room = await prisma.message.findMany({
      where: {
        room: {
          name: roomName,
        },
      },
    });

    res.status(200).json({
      code: "MESSAGES_RETRIEVED",
      message: "Messages retrieved successfuly!",
      data: room,
    });
  };

  return { getRoomMessages };
})();

export default messagesController;
