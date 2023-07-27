// build your `Task` model here
const db = require('../../data/dbConfig');

async function postTask( task_description, task_notes, task_completed, project_id) {

    const task = { 
        task_description: task_description, 
        task_notes: task_notes,
        task_completed: task_completed,
        project_id: project_id
    }

    console.log(task);

    add(task);
}

function add(task) {
    console.log(task)
    return db('tasks').insert(task)
        .then(console.log(task))
        .catch((err) => {
            console.log(err)
        })
}

async function findByDescription(task_description) {
    return db('tasks').where("task_description", task_description).first()
}

async function find() {
    return db('tasks')
    .select('tasks.task_id', 'tasks.task_description', 'tasks.task_notes', 'tasks.task_completed',
    'projects.project_name', 'projects.project_description')
.innerJoin('projects', 'tasks.project_id', 'projects.project_id')
}

module.exports = { postTask, find, findByDescription, }