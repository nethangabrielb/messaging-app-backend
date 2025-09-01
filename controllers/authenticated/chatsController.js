import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

const chatsController = (() => {
  const getChats = async (req, res) => {
    try {
      const userId = req.user.id;

      const chats = await prisma.room.findMany({
        where: {
          users: {
            some: {
              id: Number(userId),
            },
          },
        },
        include: {
          users: {
            where: {
              id: {
                not: Number(userId),
              },
            },
          },
        },
      });

      console.log(chats);

      return res.status(200).json({
        code: "RETRIEVE_SUCCESS",
        message: "Chats retrieved successfuly!",
        status: 200,
        data: chats,
      });
    } catch (e) {
      return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "There was an error handling the request",
        status: 500,
        data: e,
      });
    }
  };

  return { getChats };
})();

export default chatsController;
