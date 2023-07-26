// build your `/api/projects` router here
const router = require('express').Router();

const db = require('../../data/dbConfig');

const Project = require('./model');

const {
    checkProjectName
} = require('../middleware')

router.post('/', checkProjectName, (req, res, next) => {
    let project_completed

    if(req.body.project_completed !== 1 || req.body.project_completed === null) {
        project_completed = 0
    } else {
        project_completed = 1
    }

    Project.postProject( req.body.project_name, req.body.project_description, project_completed)

    Project.findByName(req.body.project_name)
        .then(project => {
            if(project.project_completed === 0){
                project.project_completed = false
            } else if(project.project_completed === 1){
                project.project_completed = true
            }
            res.status(201).json(project)
        })
        .catch(next)
})

router.get('/', async (req, res, next) => {
    Project.find()
        .then(projects => {
            projects.forEach(project => {
                if(project.project_completed === 0){
                    project.project_completed = false
                } else if(project.project_completed === 1){
                    project.project_completed = true
                } 
            });
            res.json(projects)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the project router",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router