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

module.exports = {
    validateActionId
}