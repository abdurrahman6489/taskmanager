const express = require("express");
const router = new express.Router();
const taskController = require("../Controllers/Task");
const endPoints = {
  createTask: "/tasks",
  getTasks: "/tasks",
  updateTask: "/tasks",
  getSingleTask: "/tasks",
  deleteSingleTask: "/tasks",
};

router.post(endPoints.createTask, taskController.createTask);
router.get(endPoints.getTasks, taskController.getUserTasks);
router.put(`${endPoints.updateTask}/:id`, taskController.updateTask);
router.get(`${endPoints.getSingleTask}/:id`, taskController.getSingleTask);
router.delete(
  `${endPoints.deleteSingleTask}/:id`,
  taskController.deleteSingleTask
);

module.exports = router;
