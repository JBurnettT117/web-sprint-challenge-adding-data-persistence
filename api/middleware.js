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

module.exports = {
    checkResourceName,
    checkIfResourceExists,
    checkProjectName
}