// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId } = require('./actions-middlware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    const actions = await Action.get()
    try {
        res.status(200).json(actions);
    } catch(err) {
        next(err);
    }
});


router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});


// router.post();


// router.put();


// router.delete();


module.exports = router;