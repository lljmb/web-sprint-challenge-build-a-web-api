const express = require('express');

const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use('/', (_, res) => {
    res.status(200).json({ message: 'hey! you made it!' })
})

server.use('*', (_, res) => {
    res.status(404).json({message: 'page not found'})
})

module.exports = server;
