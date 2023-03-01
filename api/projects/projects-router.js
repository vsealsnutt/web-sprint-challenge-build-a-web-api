// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');
const { 
    validateProjectId,
    validateProject, 
} = require('./projects-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const projects = await Project.get()
    try {
        res.status(200).json(projects);
    } catch(err) {
        next(err);
    }
});


router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});


router.post('/', validateProject, async (req, res, next) => {
    const newProject = await Project.insert(req.body);
    try {
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});


router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(next)
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'project has been removed'
            });
        })
        .catch(next)
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id);
        res.json(actions);
    } catch(err) {
        next(err);
    }
});


router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'error with the projects router',
        message: err.message,
        stack: err.stack
    });
});


module.exports = router;