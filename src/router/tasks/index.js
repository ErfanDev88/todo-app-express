import { Router } from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    pagination
} from "./controller.js";
import { createTaskValidation, updateTaskValidation } from "./validation.js";
import { validationData } from "../../middleware/validation.js";
import Authorazation from "../../middleware/auth.js";

const task = Router();

task.use(Authorazation)

task.get("/", getAllTasks);
task.get("/pagination/:number", pagination);
task.get("/:id", getTaskById);
task.post("/", createTaskValidation, validationData, createTask);
task.put("/:id", updateTaskValidation, validationData, updateTask);
task.delete("/:id", deleteTask);

export default task;
