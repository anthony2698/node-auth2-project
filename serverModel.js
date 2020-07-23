const db = require('./data/dbConfig');

module.exports = {
    find,
    findBy,
    add
}

function find() {
    return db('users');
}
function findBy(filter) {
    return db('users').where(filter).first();
}

function add(credentials) {
    return db('users').insert(credentials);
}