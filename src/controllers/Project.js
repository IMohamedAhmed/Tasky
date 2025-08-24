const asyncHandler = require('../../Utils/asyncHandler')
const { cachingQueryHandler, cachingMutationHandler } = require('../../Utils/cashingHandler')
const ProjectService = require('../services/Project')

module.exports = {
    getProjects: asyncHandler(async (req, res, next) => {
        const projects = await cashingHandler("projects", () => ProjectService.getProjects())

        res.status(200).json({
            message: "Projects Retrieved Successfully",
            success: true,
            data: projects,
        })
    }),

    getProject: asyncHandler(async (req, res, next) => {
        const { id: projectId } = req.params
        const project = await cachingQueryHandler(`project:${projectId}`, () => ProjectService.getProject(projectId))

        res.status(200).json({
            message: "Project Retrieved Successfully",
            success: true,
            data: project,
        })
    }),

    createProject: asyncHandler(async (req, res, next) => {
        const newProject = req.body.newProject
        const userId = req.user._id

        await ProjectService.createProject(newProject, userId)
        await cachingMutationHandler("projects")

        res.status(201).json({
            message: "Project Created Successfully",
            success: true,
        })
    })
}