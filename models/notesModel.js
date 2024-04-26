const Datastore = require('nedb-promise');
const notesDb = new Datastore ({ filename: "database/notes.db", autoload: true });

module.exports = notesDb;