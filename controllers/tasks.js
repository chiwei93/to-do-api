const { validationResult } = require("express-validator");

const Task = require("../models/task");
const errorUtil = require("../util/error");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      const error = errorUtil.handle404Error("task");
      return next(error);
    }

    res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};

exports.postCreateTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    const errorArr = validationResult(req);

    if (!errorArr.isEmpty()) {
      const message = errorArr.errors[0].msg;
      const error = errorUtil.handle400Error(message);
      return next(error);
    }

    const task = new Task({ title });

    await task.save();

    res.status(201).json({ task });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      const error = errorUtil.handle404Error("task");
      return next(error);
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};

exports.patchToggleTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      const error = errorUtil.handle404Error("task");
      return next(error);
    }

    const newTask = await Task.findByIdAndUpdate(id, {
      completed: !task.completed,
    });

    res.status(200).json({ task: newTask });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};

exports.patchTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const errorArr = validationResult(req);

    if (!errorArr.isEmpty()) {
      const message = errorArr.errors[0].msg;
      const error = errorUtil.handle400Error(message);
      return next(error);
    }

    const task = await Task.findById(id);

    if (!task) {
      const error = errorUtil.handle404Error("task");
      return next(error);
    }

    task.title = title;
    await task.save();

    res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    const error = errorUtil.handle500Error();
    next(error);
  }
};
