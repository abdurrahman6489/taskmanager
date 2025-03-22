const { default: mongoose } = require("mongoose");
const {
  getUserTasksFromDB,
  updateUserTaskInDB,
  findTaskById,
  deleteSingleTaskFromDB,
} = require("../db/Tasks");
const Task = require("../model/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ success: false, error: "Task title and description required" });

    const user = req.user;
    const id = user?._id;

    const newTask = new Task({
      user: id,
      title,
      description,
      createdAt: Date.now(),
    });
    const taskCreated = await newTask.save();

    if (!taskCreated) {
      return res.status(400).json({
        success: false,
        error: "Task not created, Something went wrong",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: taskCreated,
    });
  } catch (error) {
    console.error("create task error", error);
  }
};

const getUserTasks = async (req, res) => {
  try {
    const user = req.user;
    const userId = user?._id;

    const userTasks = await getUserTasksFromDB(userId);
    if (!userTasks || !Array.isArray(userTasks))
      return res.status(400).json({
        success: false,
        error: "Something went wrong, could not get user tasks",
      });

    const noOfTasks = userTasks?.length;
    const isTasksAdded = noOfTasks > 0;
    return res.status(200).json({
      success: true,
      message: isTasksAdded
        ? `Found ${noOfTasks} tasks`
        : "No tasks added yet...",
      data: userTasks,
    });
  } catch (error) {
    console.error("get user tasks error", error);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params?.id;
    const { title, description } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, error: "Please provide task id" });

    const mongooseId = mongoose.Types.ObjectId.createFromHexString(id);

    const task = await findTaskById(mongooseId);
    if (!task)
      return res
        .status(400)
        .json({ success: false, error: "No task found with given id" });

    const updatedFields = {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    };
    const updatedTask = await updateUserTaskInDB(mongooseId, updatedFields);
    if (!updatedTask)
      return res.status(400).json({
        success: false,
        error: "Something went wrong, Task not updated",
      });

    return res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.error("task update error", error);
  }
};

const getSingleTask = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id)
      return res
        .status(400)
        .json({ success: false, error: "Please provide task id" });
    const mongooseId = mongoose.Types.ObjectId.createFromHexString(id);

    const task = await findTaskById(mongooseId);
    if (!task)
      return res
        .status(400)
        .json({ success: false, error: "No task found with given id" });

    return res.status(200).json({
      success: true,
      message: "Task details received successfully",
      data: task,
    });
  } catch (error) {
    console.error("get single task error", error);
  }
};

const deleteSingleTask = async (req, res) => {
  try {
    const id = req.params?.id;
    if (!id)
      return res
        .status(400)
        .json({ success: false, error: "Please provide task id" });
    const mongooseId = mongoose.Types.ObjectId.createFromHexString(id);

    const task = await findTaskById(mongooseId);
    if (!task)
      return res
        .status(400)
        .json({ success: false, error: "No task found with given id" });
    const deletedTask = await deleteSingleTaskFromDB(mongooseId);
    if (!deletedTask)
      return res.status(400).json({
        success: false,
        error: "Something went wrong, task could not be deleted",
      });

    return res
      .status(200)
      .json({
        success: true,
        message: "task deleted successfully",
        data: deletedTask,
      });
  } catch (error) {
    console.error("delete single task error", error);
  }
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  getSingleTask,
  deleteSingleTask,
};
