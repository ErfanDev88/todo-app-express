import { body } from "express-validator";

export default new class validator{
    postValidator() { 
        body("id", "id is required, id must be a number").notEmpty().isInt(),
        body("title", "title is required, title must be a string").notEmpty().isString(),
        body("description", "description is required, descrition must be a string").optional().isString(),
        body("status", "status is required, status must be a boolean").notEmpty().isBoolean()
}

    updateValidator(){
        body("title", "title must be a string").optional().isString(),
        body("description", "description must be a string").optional().isString(),
        body("status", "status must be a boolean").optional().isBoolean()
    }
}