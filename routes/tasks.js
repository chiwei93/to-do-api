const express = require("express");

const tasksControllers = require("../controllers/tasks");
const tasksValidators = require("../validators/task");

const router = express.Router();

router.get("/:id", tasksControllers.getTaskById);

router.get("/", tasksControllers.getAllTasks);

router.post(
  "/",
  tasksValidators.createTaskValidators(),
  tasksControllers.postCreateTask
);

router.delete("/:id", tasksControllers.deleteTask);

router.patch("/status/:id", tasksControllers.patchToggleTaskStatus);

router.patch(
  "/:id",
  tasksValidators.patchTaskValidators(),
  tasksControllers.patchTaskById
);

module.exports = router;
