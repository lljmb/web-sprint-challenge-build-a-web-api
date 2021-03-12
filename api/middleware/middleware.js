// imports middleware functions 
const Actions = require('../actions/actions-model')

// validate action id
const validateActionId = (req,res,next) => {
    const {id} = req.params
    Actions.get(id)
    .then(action => {
        if(!action){
        res.status(404).json({message: `no action with ID #${id} exists`})
        } else {
        req.action = action
        next()
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error getting action'})
    })
}


module.exports = { 
    validateActionId
}