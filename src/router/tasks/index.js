import { Router } from "express";
import taskController from "./controller.js";
import { createTask, updateTask } from "./validation.js";
import { validationData } from "../../middleware/validation.js";

const task = Router();

task.get("/", taskController.getAllTasks);
task.post("/", createTask, validationData, taskController.createTask);
task.put("/:id", updateTask, validationData, taskController.updateTask);
task.delete("/:id", taskController.deleteTask);

export default task;
