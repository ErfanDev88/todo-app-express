import { Router } from "express";
import taskRouter from "./tasks/index.js"

const router = Router()

router.use("/tasks", taskRouter)

export default router