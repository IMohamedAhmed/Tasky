const Project = require('../models/Project')

class ProjectService {
    async getProjects() {
        return Project.find().lean()
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
}

module.exports = new ProjectService()