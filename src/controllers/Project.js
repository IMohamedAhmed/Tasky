const asyncHandler = require('../../Utils/asyncHandler')
const ProjectService = require('../services/Project')

module.exports = {
    getProjects: asyncHandler(async (req, res, next) => {
        const projects = await ProjectService.getProjects()

        res.status(200).json({
            message: "Projects Retrieved Successfully",
            success: true,
            data: projects,
        })
    }),

    createProject: asyncHandler(async (req, res, next) => {
        const newProject = req.body.newProject
        const userId = req.user._id

        await ProjectService.createProject(newProject, userId)

        res.status(201).json({
            message: "Project Created Successfully",
            success: true,
        })
    })
}