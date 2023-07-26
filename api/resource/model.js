// build your `Resource` model here

const db = require('../../data/dbConfig')

async function postResource( resource_name, resource_description) {

    const resource = { 
        resource_name: resource_name, 
        resource_description: resource_description
    }

    add(resource);
}

function add(resource) {
    return db('resources').insert(resource)
        .then()
        .catch((err) => {
            console.log(err)
        })
}

async function find() {
    return db('resources')
}

module.exports = { postResource, find }