// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { 
    validateActionId,
    validateAction 
} = require('./actions-middlware');

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


router.post('/', validateAction, async (req, res, next) => {
    const newAction = await Action.insert(req.body);
    try {
        res.status(201).json(newAction);
    } catch(err) {
        next(err);
    }
});


router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(updatedAction => {
            res.json(updatedAction);
        })
        .catch(next)
});


// router.delete();


module.exports = router;