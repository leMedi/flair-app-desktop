import db from '../database'


const ModelMaker = (type) => (
  class Model {
    constructor(doc) {
      this.doc = {
        ...doc,
        type
      }
    }

    save() {
      if (this.doc._id)
        return this.update(this.doc)
      return this.store(this.doc)
    }

    static store(doc) {
      return db.post({
        ...doc,
        type,
      })
    }

    static update(doc) {
      return db.put({
        ...doc,
        type,
      })
    }

    static find(request = {}) {
      return db.find({
        request,
        type,
      })
    }

    static all() {
      return this.find({});
    }

    static get(id) {
      const _doc = db.get(id)
      return new Model(_doc);
    }
  }
)


export default ModelMaker;

