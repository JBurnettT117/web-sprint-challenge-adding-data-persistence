const { resource } = require("../../api/server");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
        .createTable('projects', table => {//check the order of the tables, you may need to draw it out. make sure they are in a funcitonal order
            table.increments('project_id')
            table.string('project_name')
                .notNullable()
            table.string('project_description')
            table.boolean('project_completed')
                .defaultTo(0)
        })
        .createTable('resources', table => {
            table.increments('resource_id')
            table.string('resource_name')
                .unique()
                .notNullable()
            table.string('resource_description')
        })
        .createTable('tasks', table => {
            table.increments('task_id')
            table.string('task_description')
                .notNullable()
            table.string('task_notes')
            table.boolean('task_completed')
                .defaultTo(0)
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
        .createTable('project_resources', table => {
            table.increments('project_resources_id')
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            table.integer('task_id')
                .unsigned()
                .notNullable()
                .references('task_id')
                .inTable('tasks')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
            table.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })        
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('projects')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')    
        .dropTableIfExists('project_resources')
};