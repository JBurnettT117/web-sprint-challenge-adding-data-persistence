// build your `Project` model here
const db = require('../../data/dbConfig')

async function postProject( project_name, project_description, project_completed) {

    const project = { 
        project_name: project_name, 
        project_description: project_description,
        project_completed: project_completed
    }

    add(project);
}

function add(project) {
    console.log(project)
    return db('projects').insert(project)
        .then(console.log(project))
        .catch((err) => {
            console.log(err)
        })
}

async function findByName(project_name) {
    return db('projects').where("project_name", project_name).first()
}

async function find() {
    return db('projects')
}

module.exports = { postProject, findByName, find }