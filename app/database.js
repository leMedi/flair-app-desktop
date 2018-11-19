import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('./pouchdb' )

db.createIndex({
  index: {fields: ['type']}
});

export default db;

// db api
export const store = (doc) => (db.post(doc));
export const bulkStore = (docs, options) => (db.bulkDocs(docs, options));

export const find = (request) => (db.find(request));
export const getById = (id = '') => (db.get(id));

export const remove = (doc, options) => (db.remove(doc, options));