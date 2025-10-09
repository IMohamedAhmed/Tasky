const asyncHandler = require('../../Utils/asyncHandler')
const { cachingQueryHandler, cachingMutationHandler } = require('../../Utils/cachingHandler')
const ProjectService = require('../services/Project')

module.exports = {
    getProjects: asyncHandler(async (req, res, next) => {
        const projects = await cachingQueryHandler(`projects:${req.user._id}`, () => ProjectService.getProjects(req.user._id))

        res.status(200).json({
            message: "Projects Retrieved Successfully",
            success: true,
            data: projects,
        })
    }),

    getProject: asyncHandler(async (req, res, next) => {
        const { id: projectId } = req.params
        const project = await cachingQueryHandler(`project:${projectId}:${req.user._id}`, () => ProjectService.getProject(projectId, req.user._id))

        res.status(200).json({
            message: "Project Retrieved Successfully",
            success: true,
            data: project,
        })
    }),

    createProject: asyncHandler(async (req, res, next) => {
        const newProject = req.body
        const userId = req.user._id

        const project = await ProjectService.createProject(newProject, userId)

        await cachingMutationHandler(`projects:${req.user._id}`)

        res.status(201).json({
            message: "Project Created Successfully",
            success: true,
            data: project,
        })
    }),

    deleteProject: asyncHandler(async (req, res, next) => {
        const { id: projectId } = req.params;
        const userId = req.user._id;

        await ProjectService.deleteProject(projectId, userId);

        // Invalidate related caches
        await cachingMutationHandler(`projects:${userId}`);
        await cachingMutationHandler(`project:${projectId}:${userId}`);
        await cachingMutationHandler(`tasks:${projectId}:${userId}`);

        res.status(200).json({
            message: "Project Deleted Successfully",
            success: true,
            data: "",
        });
    })
}