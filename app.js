import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import guestRouter from "./routes/guest/guestRouter.js";
import userRouter from "./routes/authenticated/userRouter.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import onConnection from "./events/connectionHandler.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use("/api", guestRouter);
app.use("/api/users", userRouter);

io.on("connection", onConnection);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
