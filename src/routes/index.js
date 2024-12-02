const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/Task");

//tasks
router.get("/tasks", TasksController.getTasks);
router.post("/task", TasksController.createTask);

// router.get("/tasks");
// router.post("/task");

// router.get("/tasks");
// router.post("/task");

module.exports = router;
