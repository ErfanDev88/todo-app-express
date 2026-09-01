import { Router } from "express";
import taskRouter from "./task/index.js"

const router = Router()

router.use("/task", taskRouter)

export default router