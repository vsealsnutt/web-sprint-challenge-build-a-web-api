// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

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

// router.post('/', (req, res) => {

// });

// router.put();

// router.delete();

// router.get();

module.exports = router;