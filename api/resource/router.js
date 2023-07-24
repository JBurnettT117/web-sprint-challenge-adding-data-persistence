// build your `/api/resources` router here
const router = require('express').Router();

const Resource = require('./model')

// router.post('/', (req, res, next) => {
//     Resource.postResource(req.params.resource_id, req.params.resource_name, req.params.resource_description)
// })

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Resource router",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router