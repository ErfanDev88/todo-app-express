import { validationResult } from "express-validator";
import _ from "lodash";

let tasks = [
  {
    id: 1,
    title: "Do homeworks",
    description: "English",
    status: false,
  },
];

export default new (class {
    getAllTasks(req, res){
        return res.json({
            message: "All task is here",
            data: tasks
        })
    }    
    createTask(req,res){
        const body = _.pick(req.body, ["id", "title", "description", "status"])
        const exist = tasks.find((t)=> t.id == body.id)
        if(exist) return res.status(400).send("id must be unique")

        tasks.push(body)

        res.status(201).json({
            message: "task created",
            data: body
        })
    }
    updateTask(req, res){
        const body = _.pick(req.body, ["title", "description", "status"])
        const exist = tasks.find((t)=> t.id == req.params.id)
        if(!exist) return res.status(404).send("Task not found")

        if(body.title) exist.title = body.title
        if(body.description) exist.description = body.description
        if(body.status) exist.status = body.status

        const newResereved = tasks.filter((t)=> t.id != req.params.id)
        tasks = newResereved
        tasks.push(exist)

        res.status(201).json({
            message: "Task Updated",
            data: tasks
        })
    }
    deleteTask(req, res){
        const exist = tasks.filter((t)=> t.id == req.params.id)
        if(exist.length == 0) return res.status(404).send("Task not found")

        const newResereved = tasks.filter((t)=> t.id != req.params.id)
        tasks = newResereved

        res.status(201).json({
            messages: "Task deleted successfully",
            data: tasks
        })
    }

})();
