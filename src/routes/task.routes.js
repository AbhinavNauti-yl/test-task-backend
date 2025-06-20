import {Router} from 'express'
import { deleteTask, getAllTasks, updateTask } from '../controllers/task.controller.js'

const taskRouter = Router()
taskRouter.route("/").get(getAllTasks)
taskRouter.route("/:id").delete(deleteTask)
taskRouter.route("/:id").put(updateTask)

export default taskRouter