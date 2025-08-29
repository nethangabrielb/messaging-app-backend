import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import guestRouter from "./routes/guestRouter.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use("/api", guestRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
