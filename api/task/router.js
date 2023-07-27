// build your `/api/tasks` router here
const router = require('express').Router();

const db = require('../../data/dbConfig');

const Task = require('./model');

const {
    checkTaskDescription,
    checkProjectId,
    verifyProjectId,
} = require('../middleware')

router.post('/', checkTaskDescription, checkProjectId, verifyProjectId, (req, res, next) => {
    let task_completed

    if(req.body.task_completed !== 1 || req.body.task_completed === null) {
        task_completed = 0
    } else {
        task_completed = 1
    }

    Task.postTask(
        req.body.task_description,
        req.body.task_notes,
        task_completed,
        req.body.project_id
    )
    
    Task.findByDescription(req.body.task_description)
    .then(task => {
        if(task.task_completed === 0){
            task.task_completed = false
        } else if(task.task_completed === 1){
            task.task_completed = true
        }
        res.status(201).json(task)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
    Task.find()
        .then(tasks => {
            tasks.forEach(task => {
                if(task.task_completed === 0){
                    task.task_completed = false
                } else if(task.task_completed === 1){
                    task.task_completed = true
                } 
            });
            res.json(tasks)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "something went wrong inside the Task router",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router