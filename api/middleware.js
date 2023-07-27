const db = require('../data/dbConfig');

const checkResourceName = async (req, res, next) => {
    const name = req.body.resource_name
    if(
        name === undefined ||
        typeof name !== 'string' ||
        !name.trim()
    ) {
        res.status(400).json({message: 'invalid name'})
    } else {
        next()
    }
}

const checkIfResourceExists = async (req, res, next) => {
    const name = req.body.resource_name
    const exist = await db('resources').where("resource_name", name).first()
    if(exist) {
        res.status(400).json("this name already exists")
    } else {
        next()
    }
}

const checkProjectName = async (req, res, next) => {
    const name = req.body.project_name
    if(
        name === undefined ||
        typeof name !== 'string' ||
        !name.trim()
    ) {
        res.status(400).json({message: 'invalid name'})
    } else {
        next()
    }
}

const checkTaskDescription = async (req, res, next) => {
    const description = req.body.task_description
    if(
        description === undefined ||
        typeof description !== 'string' ||
        !description.trim()
    ) {
        res.status(400).json({message: 'invalid description'})
    } else {
        next()
    }
}

const checkProjectId = async (req, res, next) => {
    const id = req.body.project_id
    if(
        id === undefined ||
        typeof id !== 'number' 
    ) {
        res.status(400).json({message: 'invalid project id'})
    } else {
        next()
    }
}

const verifyProjectId = async (req, res, next) => {
    const id = req.body.project_id
    const project = await db(`projects`).where('project_id', id).first()
    if(
        !project
    ) {
        res.status(400).json({message: 'invalid im the probelm id'})
    } else {
        next()
    }
}

module.exports = {
    checkResourceName,
    checkIfResourceExists,
    checkProjectName,
    checkTaskDescription,
    checkProjectId,
    verifyProjectId,
}