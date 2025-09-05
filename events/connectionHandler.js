import initializeRoom from "./roomInitialization.js";
import messageHandler from "./messageHandler.js";

const onConnection = (socket) => {
  socket.on("create room", initializeRoom);

  socket.on("message", async (message, token, roomName, callback) => {
    const { success, senderData } = await messageHandler(
      message,
      token,
      roomName,
      callback
    );

    if (success) {
      socket.to(roomName).emit("message", message, senderData);
    }
  });

  socket.on("join room", (room) => {
    socket.join(room);
  });
};

export default onConnection;
