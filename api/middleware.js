const db = require('../data/dbConfig');

const checkName = async (req, res, next) => {
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

const checkIfExists = async (req, res, next) => {
    const name = req.body.resource_name
    const exist = await db('resources').where("resource_name", name).first()
    if(exist) {
        res.status(400).json("this name already exists")
    } else {
        next()
    }
}

module.exports = {
    checkName,
    checkIfExists,
}