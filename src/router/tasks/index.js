import { Router } from "express";
import _ from "lodash";
import handlers from "../components/controler.js";
import validate from "../components/validator.js";

const task = Router();

task.get("/", handlers.taskHandler);

task.post("/", validate.postValidator , handlers.postHandler);

task.put("/:id", validate.updateValidator , handlers.updateHandler);

task.delete("/:id", handlers.deleteHandler);

export default task;