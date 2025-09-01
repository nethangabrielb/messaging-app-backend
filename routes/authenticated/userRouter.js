import express from "express";
import usersController from "../../controllers/authenticated/usersController.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const { Router } = express;

const userRouter = Router();

userRouter.get("/", verifyToken, usersController.getAllUsers);

export default userRouter;
