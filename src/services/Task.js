const Task = require("../models/Task");
const Project = require("../models/Project");

class TaskService {
  async getTasks() {
    return Task.find().lean();
  }

  async createTask(task, projectId, userId) {
    const newTask = {
      _project: projectId,
      _user: userId
    };

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

    const taskDoc = await new Task(newTask).save();
    return Project.updateOne({ _id: projectId }, { $push: { _tasks: taskDoc._id } })
  }
}

module.exports = new TaskService();
