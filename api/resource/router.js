// build your `/api/resources` router here
const router = require('express').Router();

const Resource = require('./model');

const db = require('../../data/dbConfig');

const { 
    checkResourceName,
    checkIfResourceExists,
    } = require('../middleware');

router.post('/', checkResourceName, checkIfResourceExists, (req, res, next) => {
    Resource.postResource( req.body.resource_name, req.body.resource_description)
    res.status(201).json({resource_name: `${req.body.resource_name}`})
});

router.get('/', async (req, res, next) => {
    Resource.find()
        .then(resources => {
            res.json(resources)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Resource router",
        message: err.message,
        stack: err.stack
    })
});

module.exports = router;