import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const notificationHandler = async (userId, roomId) => {
  let updatedNotification = null;

  // check if notification exists for the associated user and room
  const notification = await prisma.notification.findFirst({
    where: {
      AND: [{ roomId }, { userId }],
    },
  });

  console.log(notification);

  // if notification alraedy exist we increment
  // otherwise we create a new one
  if (notification) {
    updatedNotification = await prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  } else {
    updatedNotification = await prisma.notification.create({
      data: {
        count: 1,
        roomId,
        userId,
      },
    });
  }

  if (updatedNotification) {
    return { success: true };
  }
};

export default notificationHandler;
