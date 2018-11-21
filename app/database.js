import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

// class PuchDB {

//   static db;

//   static instance;

//   constructor(){
  //     if(PuchDB.instance){
    //       return PuchDB.instance;
    //     }
    
    //     PuchDB.instance = this;
    //     console.log('****** !!!!connecting to db')
    //     PuchDB.db = new PouchDB('./pouchdb');
    //   }
    
    // }
    
    
// export default PuchDB.db;
    // const db = PuchDB.db
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

