import initializeRoom from "./roomInitialization.js";
import connectHandler from "./connectHandler.js";
import messageHandler from "./messageHandler.js";
import { io } from "../app.js";

const onConnection = (socket) => {
  // set user to online upon login event
  socket.on("set status", async (token, status, callback) => {
    const isSuccess = await connectHandler(token, status);

    if (isSuccess) {
      callback({ success: true });
      socket.broadcast.emit("set status", { refetch: true });
    }
  });

  // create room event
  socket.on("create room", initializeRoom);

  // message event
  socket.on("message", async (message, token, roomId, randomId, callback) => {
    setTimeout(async () => {
      const { success, senderData } = await messageHandler(
        message,
        token,
        roomId,
        callback
      );

      if (success) {
        io.to(roomId).emit("message", message, senderData, randomId);
      }
    }, 1000);
  });

  // join room event
  socket.on("join room", (room) => {
    socket.join(room);
  });
};

export default onConnection;
