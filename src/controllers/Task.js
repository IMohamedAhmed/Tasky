const asyncHandler = require("../../Utils/asyncHandler");
const TaskService = require("../services/Task");
const { cachingMutationHandler } = require('../../Utils/cashingHandler')


module.exports = {
  getTasks: asyncHandler(async (req, res, next) => {
    const tasks = await TaskService.getTasks();

    return res.status(200).json({
      message: "Tasks Retrieved Successfully",
      success: true,
      data: tasks,
    });
  }),

  getTask: asyncHandler(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await TaskService.getTask(taskId);

    return res.status(200).json({
      message: "Task Retrieved Successfully",
      success: true,
      data: task,
    });
  }),

  createTask: asyncHandler(async (req, res, next) => {
    const { task, projectId } = req.body;
    const userId = req.user._id

    await TaskService.createTask(task, projectId, userId);
    await cachingMutationHandler(`project:${projectId}`)

    return res.status(201).json({
      message: "Task Created Successfully",
      success: true,
      data: "",
    });
  }),
};
