import initializeRoom from "./roomInitialization.js";
import messageHandler from "./messageHandler.js";

const onConnection = (socket) => {
  socket.on("create room", initializeRoom);

  socket.on("message", messageHandler);
};

export default onConnection;
