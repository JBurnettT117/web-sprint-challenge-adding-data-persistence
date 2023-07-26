// build your server here and require it from index.js
const express = require('express');

const projectRouter = require('./project/router');

const resourceRouter = require('./resource/router');

const tasksRouter = require('./task/router');

const server = express();

server.use(express.json());

server.use('/api/project', projectRouter);

server.use('/api/resources', resourceRouter);

server.use('/api/tasks', tasksRouter);

server.use('*', (req, res) => {
    res.json({ Message: "this endpoint does not exist" })
})

module.exports = server;