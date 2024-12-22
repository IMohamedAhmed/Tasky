const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/Task");
const UsersController = require("../controllers/User");

//tasks
router.get("/tasks", TasksController.getTasks);
router.post("/task", TasksController.createTask);

//users
router.post("/user/sign-in", UsersController.login);
router.post("/user/sign-up", UsersController.register);

// router.get("/tasks");
// router.post("/task");

module.exports = router;
