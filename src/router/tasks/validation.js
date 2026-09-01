import { body } from "express-validator";

export const createTask = [
    body("id", "id is required, id must be a number").notEmpty().isInt(),
    body("title", "title is required, title must be a stirng").notEmpty().isString(),
    body("description", "description is required, description must be a stirng").optional().isString(),
    body("status", "status is required, status must be a boolean").notEmpty().isBoolean()
]

export const updateTask = [
    body("title", "title is required, title must be a stirng").notEmpty().isString(),
    body("description", "description is required, description must be a stirng").optional().isString(),
    body("status", "status is required, status must be a boolean").notEmpty().isBoolean()
]