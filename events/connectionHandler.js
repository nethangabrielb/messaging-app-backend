import initializeRoom from "./roomInitialization.js";

const onConnection = (socket) => {
  socket.on("create room", initializeRoom);
};

export default onConnection;
