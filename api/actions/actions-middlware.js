// add middlewares here related to actions
const Action = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if (!action) {
            res.status(404).json({
                message: 'action not found'
            });
        } else {
            req.action = action;
            next();
        }
    } catch(err) {
        res.status(500).json({
            message: 'could not find action'
        });
    }
};

function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || 
        !description || !description.trim() ||
        !notes || !notes.trim() ||
        completed === undefined) {
            res.status(400).json({
                message: 'action needs project id, description, and notes'
            });
        } else {
            next();
        }
};

module.exports = {
    validateActionId,
    validateAction
}