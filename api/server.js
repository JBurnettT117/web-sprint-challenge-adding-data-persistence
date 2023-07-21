// build your server here and require it from index.js
const express = require('express');

const projectRouter = require('./project/router');

const resourceRouter = require('./resource/router');

const taskRouter = require('./task/router');

const server = express();

server.use(express.json());

server.use('/api/project', projectRouter);

server.use('/api/resource', resourceRouter);

server.use('/api/task', taskRouter);

server.use('*', (req, res) => {
    res.json({ Message: "this endpoint does not exist" })
})

module.exports = server;