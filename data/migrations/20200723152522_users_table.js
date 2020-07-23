
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments('id');
        users.text('username', 128).notNullable().unique();
        users.text('password', 128).notNullable();
        users.text('deparment', 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
