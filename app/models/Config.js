import Model from '../utils/Model'
const ConfigModel = Model('config')

function ConfigMaker(name, _defaultObj = {}) {

  const defaultObj = {
    ..._defaultObj,
    _id: name,
    type: 'config'
  }
  
  return class Config {

    static instance = null;
      
    constructor() {
      if(Config.instance) // singloton
        return Config.instance
      
      Config.instance = this
      this.doc = defaultObj
      
      this.load()
        .then(() => console.log(`[!] ${name} config loaded`))
        .catch(err => console.log(`[!] Error loading ${name} config`, err))
    }

    get(key) { return this.doc[key]  }
    
    set(key, val) { this.doc[key] = val }

    update(doc) {
      if(doc)
      this.doc = {
        ...doc,
        _id: name,
        type: 'config'
      }
    }

    async load() {
      try {
        this.doc = await ConfigModel._getOne(name);
      } catch (err) {
        this.doc = defaultObj
      }
      return this.doc
    }

    async save(doc = null) {
      this.update(doc)
      return ConfigModel._store(this.doc)
    }
  }
}

export default ConfigMaker;

const AuthModel = ConfigMaker('prof_auth', {
  prof: null
})

export const authConfig = new AuthModel()

// use example
// AuthModel.load().then()
// AuthModel.set('prof', 'SomeProfId')
// AuthModel.save()



