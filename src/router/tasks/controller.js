import { validationResult } from "express-validator";
import _ from "lodash";

import Category from "../../models/category.js";
import Task from "../../models/tasks.js";
import mongoose from "mongoose";
import User from "../../models/user.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("categoryId");

  console.log(tasks.created_by)
  if (!tasks || tasks.created_by != req.user)
    return res.status(404).json({
      msg: "task not found",
    });
  res.status(200).json(tasks);
};

export const pagination = async (req, res) => {
  const page = req.params.number;
  const num = 5;

  const tasks = await Task.find()
    .populate("categoryId")
    .limit(num)
    .skip((page - 1) * num);

  return res.status(200).json(tasks);
};

export const getTaskById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid Id");

  const task = await Task.findById(req.params.id).populate("categoryId");
  if (!task || task.created_by != req.user)
    return res.status(404).json({
      msg: "task not found",
    });

  res.status(200).json(task);
};

export const createTask = async (req, res) => {
  const data = _.pick(req.body, ["title", "categoryId", "description"]);
  const category = await Category.findById(data.categoryId);
  if (!category) return res.status(404).send("no valid category found");

  data.created_by = await User.findById(req.user);

  const task = (await Task.create(data)).populate("categoryId");

  res.status(200).json(task);
};

export const updateTask = async (req, res) => {
  const data = _.pick(req.body, ["title", "categoryId", "description"]);

  // const task = await Task.findByIdAndUpdate(req.params.id, data, {
  //   new: true,
  //   runValidators: true,
  // });

  const task = await Task.findById(req.params.id);
  console.log(task);

  if (!task || task.created_by != req.user) {
    return res.status(404).json({
      message: "task not found",
    });
  }
  Task.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(task);
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task || task.created_by != req.user) {
    return res.status(404).json({
      message: "task not found",
    });
  }

  res.status(200).json({
    message: "task deleted successfully",
  });
};
