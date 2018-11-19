import _Joi from 'joi'
import db from '../database'

const ModelMaker = (type, _schema) => {
  
  const schema = _schema.keys({
    type: _Joi.string().required(),
    _id: Joi.string(),
    _rev: Joi.string(),
  })

  return class Model {
    constructor(doc) {
      this.doc = {
        ...doc,
        type
      }
    }

    get(key) {
      return this.doc[key]
    }
    
    toObject() {
      return this.doc
    }

    toString() {
      return JSON.stringify(this.doc)
    }

    async validate() {
      return Model._validate(this.doc)
    }

    // save or update current Object
    async save() {

      await this.validate()

      let result

      if (this.doc._id)
        result = await Model._update(this.doc)
      else
        result = await Model._store(this.doc)
      
      this.doc = {
        ...this.doc,
        _id: result.id,
        _rev: result.rev,
      }

      return result.ok
    }

    async delete() {
      // return db.remove(this.doc._id) // do not use this (read docs)
      return Model._update({
        ...this.doc,
        _deleted: true // mark for deletion
      })
    }

    static async _validate(doc) {
      return _Joi.validate(doc, schema)
    }

    static async _store(doc) {
      await Model._validate(doc)
      return db.post({
        ...doc,
        type,
      })
    }

    static async _update(doc) {
      await Model._validate(doc) // TODO: must have _id & _rev 
      return db.put({
        ...doc,
        type,
      })
    }

    static async store(doc) {
      const result = await Model._store(doc)
      return new Model({
        ...doc,
        type,
        _id: result.id,
        _rev: result.rev,
      })
    }

    static async update(doc) {
      const result = await Model._update(doc)
      return new Model({
        ...doc,
        type,
        _id: result.id,
        _rev: result.rev,
      })
    }

    static async find(query = {}) {
      const result = await db.find({
        selector: {
          ...query,
          type,
        },
      })
      return result.docs
    }

    static async all() {
      return this.find({});
    }

    // get by id
    static getOne(id) {
      const _doc = db.get(id)
      return new Model(_doc);
    }

    // buld ops
    static async _bulk(docs = [], options = null) {
      return db.bulkDocs(docs, options)
    }

    static async bulkDelete(_docs, options) {
      const docs = _docs.map(doc => Object.assign(doc ,{_deleted: true}))
      return Model._bulk(docs, options)
    }
  }
}

export const Joi = _Joi;
export default ModelMaker;

