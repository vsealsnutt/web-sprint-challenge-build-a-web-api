// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { 
    validateProjectId,
    validateProject, 
} = require('./projects-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const projects = await Projects.get()
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
    const newProject = await Projects.insert(req.body);
    try {
        res.status(201).json(newProject);
    } catch(err) {
        next(err);
    }
});

// router.put();

// router.delete();

// router.get();

module.exports = router;