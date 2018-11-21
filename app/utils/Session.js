import keys from '../constants/session';


const session = {
  keys,

  get(key) {
    if(!key) return null;
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  set(key, obj) {
    if(!key) return null;
    return localStorage.setItem(key, JSON.stringify(obj));
  }
}

export default session;