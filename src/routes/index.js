const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/Task");
const AuthController = require("../controllers/Auth");
const ProjectsController = require("../controllers/Project");

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Endpoints related to tasks
 *   - name: Users
 *     description: User authentication and management
 *   - name: Projects
 *     description: Project-related operations
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns all tasks
 *     description: This endpoint returns all user tasks.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasks Retrieved Successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6769dacb7320077e5901e3ff"
 *                       title:
 *                         type: string
 *                         example: "My First Task"
 *                       description:
 *                         type: string
 *                         example: "This Gonna Be Good"
 *                       status:
 *                         type: string
 *                         enum: [pending, in-progress, completed]
 *                         example: "pending"
 *                       priority:
 *                         type: string
 *                         enum: [low, medium, high]
 *                         example: "medium"
 *                       _user:
 *                         type: string
 *                         example: "6769d51f391d11af1abfcd31"
 *                       _project:
 *                         type: string
 *                         example: "6769d780a7d8f1041e00b036"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-23T21:48:59.159Z"
 */


/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     description: Adds a new task to the system.
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               name: "New Task"
 *               status: "In Progress"
 *     responses:
 *       201:
 *         description: Task created successfully
 */

/**
 * @swagger
 * /user/sign-in:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: "user@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Successfully authenticated
 */

/**
 * @swagger
 * /user/sign-up:
 *   post:
 *     summary: User registration
 *     description: Creates a new user account.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *             example:
 *               email: "newuser@example.com"
 *               password: "strongpassword"
 *               name: "John Doe"
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects.
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects
 */

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     description: Adds a new project to the system.
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Project Alpha"
 *               description: "A sample project"
 *     responses:
 *       201:
 *         description: Project created successfully
 */

// Tasks
router.get("/tasks", TasksController.getTasks);
router.get("/task/:id", TasksController.getTask);
router.post("/task", TasksController.createTask);
router.delete("/task/:id", TasksController.deleteTask);
router.patch("/task/:id/status", TasksController.updateTaskStatus);

// Users
router.get("/user", AuthController.getUserById);
router.post("/user/sign-in", AuthController.login);
router.post("/user/reset", AuthController.sendresetPasswordOtp);
router.post("/user/reset/password", AuthController.resetPassword);
router.post("/user/sign-up", AuthController.register);
router.post("/user/sign-up/complete", AuthController.completeRegistration);
router.post("/user/verify-otp", AuthController.verifyOtp);
router.post("/user/oauth/sign-in", AuthController.loginOAuth);


// Projects
router.get("/projects", ProjectsController.getProjects);
router.get("/project/:id", ProjectsController.getProject);
router.post("/project", ProjectsController.createProject);
router.delete("/project/:id", ProjectsController.deleteProject);

module.exports = router;
