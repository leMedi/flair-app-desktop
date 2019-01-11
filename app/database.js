import PouchDB from 'pouchdb';
import dbSettings from './config/database'

PouchDB.plugin(require('pouchdb-find'));


const db = new PouchDB('./pouchdb' )

db.createIndex({
  index: {fields: ['type']}
});


// sync to server
db.sync(dbSettings.remote, {
  live: true,
  retry: true
})
  .on('change', (change) => console.log("Pouchdb change", change))  
  .on('paused', (info) => console.log("Pouchdb paused", info))
  .on('active', (info) => console.log("Pouchdb active", info))
  .on('error', (err) => console.error("Pouchdb error", err))

export default db;

// db api
export const store = (doc) => (db.post(doc));
export const bulkStore = (docs, options) => (db.bulkDocs(docs, options));

export const find = (request) => (db.find(request));
export const getById = (id = '') => (db.get(id));

export const remove = (doc, options) => (db.remove(doc, options));

