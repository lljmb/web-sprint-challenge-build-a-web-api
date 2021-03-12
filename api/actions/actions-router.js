// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const mw = require('../middleware/middleware');

const router = express.Router();

// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get('/', (req, res) => {
    Actions.get(req.query.actions)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({message: 'error getting actions'})
    })
})

// [GET] /api/actions/:id returns an action with the given id as the body of the response.
router.get('/:id', mw.validateActionId, (req, res) => {
    res.status(200).json(req.action)
})


// [POST] /api/actions returns the newly created action as the body of the response.
router.post('/', (req, res) => {
    const action = req.body
    Actions.insert(action)
    .then(action => { if(!action){
        res.status(400).json({message: 'missing required fields'})
    }
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(400).json({message: 'error posting action'})
    })
})

// [PUT] /api/actions/:id returns the updated action as the body of the response.
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Actions.update(id, changes)
    .then(action => {
        if(!changes || changes.description === undefined){
            res.status(404).json({message: 'no status with that ID'})
        } else {
        res.status(200).json(action)
        }
    })
    .catch(error => {
        res.status(400).json({message: 'error updating action'})
    })

})

// [DELETE] /api/actions/:id returns no response body.
router.delete('/:id', mw.validateActionId, (req, res, next) => {
    const {id} = req.params

    Actions.remove(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        next(error)
    })
})

module.exports = router;
