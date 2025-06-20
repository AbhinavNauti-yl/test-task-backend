import { Router } from "express";
import { createBoard, deleteBoard, getAllBoards } from "../controllers/board.controller.js";
import { createTask, getAllTasks, getBoardTask, getParticulaeTasks, updateParticularTask } from "../controllers/task.controller.js";

const boardRouter = Router()
boardRouter.route("/").post(createBoard)
boardRouter.route("/").get(getAllBoards)
boardRouter.route("/:id").delete(deleteBoard)
boardRouter.route("/:id/task").post(createTask)
boardRouter.route("/:id/task").get(getBoardTask)
boardRouter.route("/:id/task/:taskId").get(getParticulaeTasks)
boardRouter.route("/:id/task/:taskId").put(updateParticularTask)

export default boardRouter