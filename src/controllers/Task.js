const asyncHandler = require("../../Utils/asyncHandler");
const TaskService = require("../services/Task");
const { cachingQueryHandler, cachingMutationHandler } = require('../../Utils/cachingHandler')


module.exports = {
  getTasks: asyncHandler(async (req, res, next) => {
    const { projectId } = req.query
    const tasks = await cachingQueryHandler(`tasks:${projectId}:${req.user._id}`, () => TaskService.getTasks(projectId, req.user._id));

    return res.status(200).json({
      message: "Tasks Retrieved Successfully",
      success: true,
      data: tasks,
    });
  }),

  getTask: asyncHandler(async (req, res, next) => {
    const { id: taskId } = req.params
    const { projectId } = req.query

    const task = await cachingQueryHandler(`task:${taskId}:${projectId}:${req.user._id}`, () => TaskService.getTask(taskId, projectId, req.user._id));

    return res.status(200).json({
      message: "Task Retrieved Successfully",
      success: true,
      data: task,
    });
  }),

  createTask: asyncHandler(async (req, res, next) => {
    const task = req.body;
    const { projectId } = req.query;
    const userId = req.user._id

    await TaskService.createTask(task, projectId, userId);

    // Invalidate related caches
    await cachingMutationHandler(`project:${projectId}:${userId}`);
    await cachingMutationHandler(`tasks:${projectId}:${userId}`);

    return res.status(201).json({
      message: "Task Created Successfully",
      success: true,
      data: "",
    });
  }),

  deleteTask: asyncHandler(async (req, res, next) => {
    const { id: taskId } = req.params;
    const { projectId } = req.query;
    const userId = req.user._id;

    await TaskService.deleteTask(taskId, projectId, userId);

    // Invalidate related caches
    await cachingMutationHandler(`project:${projectId}:${userId}`);
    await cachingMutationHandler(`tasks:${projectId}:${userId}`);
    await cachingMutationHandler(`task:${taskId}:${projectId}:${userId}`);

    return res.status(200).json({
      message: "Task Deleted Successfully",
      success: true,
      data: "",
    });
  }),

  updateTaskStatus: asyncHandler(async (req, res, next) => {
    const { id: taskId } = req.params;
    const { status, projectId } = req.body;
    const userId = req.user._id;

    await TaskService.updateTaskStatus(taskId, status, projectId, userId);

    // Invalidate related caches
    await cachingMutationHandler(`project:${projectId}:${userId}`);
    await cachingMutationHandler(`tasks:${projectId}:${userId}`);
    await cachingMutationHandler(`task:${taskId}:${projectId}:${userId}`);

    return res.status(200).json({
      message: "Task Status Updated Successfully",
      success: true,
      data: "",
    });
  }),
};
