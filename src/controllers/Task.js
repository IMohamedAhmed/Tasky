const asyncHandler = require("../../Utils/asyncHandler");
const TaskService = require("../services/Task");

module.exports = {
  getTasks: asyncHandler(async (req, res, next) => {
    const tasks = await TaskService.getTasks();

    return res.status(200).json({
      message: "Tasks Retrieved Successfully",
      success: true,
      data: tasks,
    });
  }),

  createTask: asyncHandler(async (req, res, next) => {
    const { task } = req.body;

    await TaskService.createTask(task);

    return res.status(201).json({
      message: "Task Created Successfully",
      success: true,
      data: "",
    });
  }),
};