// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');


const router = express.Router();

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get('/', (req, res) => {
    Projects.get(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({message: 'error getting projects'})
    })
})

// [GET] /api/projects/:id returns a project with the given id as the body of the response.
router.get('/:id', (req, res) => {
    const {id} = req.params

    Projects.get(id)
    .then(project => {
        if(!project){
        res.status(404).json({message: `no project with ID #${id} exists`})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(error => {
        res.status(500).json({message: 'error getting action'})
    })
})


// [POST] /api/projects returns the newly created project as the body of the response.
router.post('/', (req, res) => {
    const project = req.body
    Projects.insert(project)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(400).json({message: 'error posting project'})
    })
})

// [PUT] /api/projects/:id returns the updated project as the body of the response.
router.put('/:id', (req, res) => {
    const changes = req.body
    const {id} = req.params

    Projects.update(id, changes)
    .then(project => {
       if(!project) {
           res.status(404).json({message: `no project with that ID exists`})
        } else if (!project.name || project.name === undefined || !project.description || project.description === undefined ) { res.status(400).json({message: 'missing all fields'}) } 
        else { res.status(200).json(project) }
    })
    .catch(error => {
        res.status(400).json({message: 'error updating project'})
    })
})

// [DELETE] /api/projects/:id returns no response body
router.delete('/:id', (req, res) => {
    const {id} = req.params

    Projects.remove(id)
    .then(project => { if(!project){
        res.status(404).json({message: `no project with ID #${id}`})
    } else {
        res.status(200).json(project) }
    })
    .catch(error => {
        res.status(500).json({message: 'error deleting project'})
    })
})

// [GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.
router.get('/:id/actions/', (req, res, next) => {
    const { id } = req.params
    Projects.getProjectActions(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        next(error)
    })
})

module.exports = router;
