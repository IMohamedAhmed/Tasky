const Task = require("../models/Task");
const Project = require("../models/Project");
const mongoose = require("mongoose");

class TaskService {
  async getTasks(projectId, userId) {
    return Task.find({ _project: projectId, _user: userId }).lean();
  }

  async getTask(taskId, projectId, userId) {
    return Task.findOne({ _id: taskId, _project: projectId, _user: userId }).lean();
  }

  async createTask(task, projectId, userId) {
    const newTask = {
      _project: projectId,
      _user: userId
    };

    if (task.description) {
      newTask.description = task.description;
    }

    if (task.status) {
      newTask.status = task.status;
    }

    if (task.priority) {
      newTask.priority = task.priority;
    }

    if (task.dueDate) {
      newTask.dueDate = task.dueDate;
    }

    if (task.videoLink) {
      newTask.videoLink = task.videoLink;
    }

    const taskDoc = await new Task(newTask).save();

    return Project.updateOne({ _id: projectId }, { $push: { _tasks: taskDoc._id } })
  }

  async deleteTask(taskId, projectId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, _project: projectId, _user: userId });

    if (!task) {
      throw new Error("Task not found or unauthorized");
    }

    await Project.updateOne({ _id: projectId }, { $pull: { _tasks: taskId } });

    return task;
  }

  async updateTaskStatus(taskId, status, projectId, userId) {
    const validStatuses = ["pending", "in-progress", "completed", "archived"];

    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status. Must be one of: pending, in-progress, completed, archived");
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, _project: projectId, _user: userId },
      { status },
      { new: true }
    );

    if (!task) {
      throw new Error("Task not found or unauthorized");
    }

    return task;
  }
}

module.exports = new TaskService();
