const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/Task");
const UsersController = require("../controllers/User");
const ProjectsController = require("../controllers/Project");

//tasks
router.get("/tasks", TasksController.getTasks);
router.post("/task", TasksController.createTask);

//users
router.post("/user/sign-in", UsersController.login);
router.post("/user/sign-up", UsersController.register);

//projects
router.get("/projects", ProjectsController.getProjects);
router.post("/project", ProjectsController.createProject);

module.exports = router;
