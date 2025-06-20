import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router()
userRouter.route("/").post(createUser)
userRouter.route("/").get(getAllUsers)

export default userRouter