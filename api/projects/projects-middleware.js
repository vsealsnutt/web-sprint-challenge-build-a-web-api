// add middlewares here related to projects

const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            res.status(404).json({
                message: 'project not found'
            });
        } else {
            req.project = project;
            next();
        }
    } catch(err) {
        res.status(500).json({
            message: 'could not find project'
        });
    }
};


function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !name.trim() ||
        !description || !description.trim() ||
        completed === undefined) {
            res.status(400).json({
                message: 'project needs name and description'
            });
        } else {
            next();
        }
};

module.exports = {
    validateProjectId,
    validateProject
}