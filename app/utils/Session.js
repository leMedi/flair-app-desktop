import sessionConfig from '../constants/session';


const session = {
  keys: {},

  getFromLocalStorage(key) {
    if(!key) return null;
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  setToLocalStorage(key, obj) {
    if(!key) return null;
    return localStorage.setItem(key, JSON.stringify(obj));
  },

  get(key) {

    const val = this.getFromLocalStorage(key)
    
    if(val !== null)
      return val

    if(sessionConfig[key])
      return sessionConfig[key]

    
    return null
  },

  set(key, obj) {
    if(!key) return null;
    this.setToLocalStorage(key, obj)
  },

  deleteKey(key) {
    localStorage.removeItem(key);
  }

}

Object.keys(sessionConfig).forEach((key) => {session.keys[key] = key})

export default session;