const Task = require("../models/Task");

class TaskService {
  async getTasks() {
    return Task.find().lean();
  }

  async createTask(task) {
    const newTask = {};

    if (task.title) {
      newTask.title = task.title;
    }

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

    if (task.user) {
      newTask._user = task.user;
    }

    if (task.project) {
      newTask._project = task.project;
    }

    return new Task(newTask).save();
  }
}

module.exports = new TaskService();
