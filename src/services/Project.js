const Project = require('../models/Project')
const Task = require('../models/Task')

class ProjectService {
    async getProjects(userId) {
        return Project.aggregate([
            {
                $match: {
                    _user: userId
                },
            },
            {
                $project: {
                    name: 1,
                }
            }
        ])
    }

    async getProject(projectId, userId) {
        return Project.findOne({ _id: projectId, _user: userId }).lean()
    }

    async createProject(newProject, userId) {
        return new Project({
            name: newProject.name,
            description: newProject.description || '',
            deadline: newProject.deadline || null,
            _tasks: [],
            _user: userId
        }).save()
    }

    async deleteProject(projectId, userId) {
        const project = await Project.findOne({ _id: projectId, _user: userId });

        if (!project) {
            throw new Error("Project not found or unauthorized");
        }

        await Task.deleteMany({ _project: projectId, _user: userId });

        await Project.findByIdAndDelete(projectId);

        return project;
    }
}

module.exports = new ProjectService()