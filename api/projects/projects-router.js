// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const projects = await Projects.get()
    try {
        res.status(200).json(projects);
    } catch(err) {
        next(err);
    }
});

// router.get();

// router.post();

// router.put();

// router.delete();

// router.get();

module.exports = router;