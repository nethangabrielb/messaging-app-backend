import express from "express";
import verifyToken from "../../middlewares/authMiddleware.js";
import messagesController from "../../controllers/authenticated/messagesController.js";

const { Router } = express;

const messageRouter = Router();

messageRouter.get(
  "/:roomName",
  verifyToken,
  messagesController.getRoomMessages
);

export default messageRouter;
