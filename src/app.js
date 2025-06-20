import express, { json, urlencoded } from 'express'
import cors from 'cors'

import boardRouter from './routes/board.routes.js'
import taskRouter from './routes/task.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.urlencoded({
    extended: true,
  }))

app.use("/api/board", boardRouter)
app.use("/api/task", taskRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("api working")
})

export default app