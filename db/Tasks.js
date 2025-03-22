const Task = require("../model/Task");

const getUserTasksFromDB = async (userId) => {
  try {
    const tasks = await Task.find({ user: userId });
    return tasks;
  } catch (error) {
    console.error("get user tasks from db error", error);
    return null;
  }
};

const findTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    return task;
  } catch (error) {
    console.error("find task by id error", error);
    return null;
  }
};

const updateUserTaskInDB = async (taskId, updatedFields) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updatedFields },
      { new: true }
    );
    return updatedTask;
  } catch (error) {
    console.error("update user task in db error", error);
    return null;
  }
};

const deleteSingleTaskFromDB = async (taskId) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    return deletedTask;
  } catch (error) {
    console.error("delete single task in db error", error);
    return null;
  }
};

module.exports = {
  getUserTasksFromDB,
  updateUserTaskInDB,
  findTaskById,
  deleteSingleTaskFromDB,
};
