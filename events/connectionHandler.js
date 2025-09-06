import initializeRoom from "./roomInitialization.js";
import connectHandler from "./connectHandler.js";
import messageHandler from "./messageHandler.js";

const onConnection = (socket) => {
  // set user to online upon login event
  socket.on("set online", connectHandler);

  // create room event
  socket.on("create room", initializeRoom);

  // message event
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

  // join room event
  socket.on("join room", (room) => {
    socket.join(room);
  });
};

export default onConnection;
