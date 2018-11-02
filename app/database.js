import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('./pouchdb' )

db.createIndex({
  index: {fields: ['type']}
});

// vider la base de donner

// db.allDocs().then(function (result) {
//   // Promise isn't supported by all browsers; you may want to use bluebird
//   return Promise.all(result.rows.map(function (row) {
//     return db.remove(row.id, row.value.rev);
//   }));
// }).then(function () {
//   // done!
// }).catch(function (err) {
//   // error!
// });

export default db;



// db api
export const store = (doc) => (db.post(doc));
export const find = (request) => (db.find(request));
export const getById = (id) => (db.get(id));
