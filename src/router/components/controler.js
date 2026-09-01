import _ from "lodash";
import { validationResult } from "express-validator";
let tasks = [];
export default new (class handlers {
  taskHandler(req, res) {
    return res.json({
      message: "All task is here!",
      data: tasks,
    });
  }
  postHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "bad request", errors: errors.array() });
    const body = _.pick(req.body, ["id", "title", "description", "status"]);
    const exists = tasks.find((item) => item.id == body.id);
    if (exists) return res.status(400).send("id must be unique");
    tasks.push(body);

    res.status(201).json({
      message: "task created",
      data: body,
    });
  }
  updateHandler(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "bad request", errors: errors.array() });
    const body = _.pick(req.body, ["title", "description", "status"]);
    const exists = tasks.find((item) => item.id == req.params.id);
    if (!exists) return res.status(404).send("task does not exists");

    if (body.title) exists.title = body.title;
    if (body.description) exists.description = body.description;
    if (body.status) exists.status = body.status;

    const newReserved = tasks.filter((item) => item.id != req.params.id);
    tasks = newReserved;
    tasks.push(exists);

    return res.status(201).json({
      message: "task updated",
      data: tasks,
    });
  }

  deleteHandler(req, res) {
    const exists = tasks.filter((item) => item.id == req.params.id);
    if (exists.length == 0) return res.status(404).send("task does not exists");
    const newReserved = tasks.filter((item) => item.id != req.params.id);
    tasks = newReserved;

    return res.json({
      message: "task was deleted",
      data: tasks,
    });
  }
})();