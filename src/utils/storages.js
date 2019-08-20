export default class Storages {
  constructor() {}

  static getSessionStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    const val = window.sessionStorage.getItem(key) || null;
    return val === null ? val : JSON.parse(val);
  }

  static setSessionStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  static removeSessionStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.sessionStorage.removeItem(key);
  }
  static getLocalStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    const val = window.localStorage.getItem(key);
    // 防止历史方法混入 value "undefined"
    try {
      return val === null ? val : JSON.parse(val);
    } catch (e) {
      console.log(e);
    }
  }

  static setLocalStorage(key, value) {
    if (key === '' || typeof key !== 'string') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static removeLocalStorage(key) {
    if (key === '' || typeof key !== 'string') return;
    window.localStorage.removeItem(key);
  }

  // 从localStorage删除数据
  static removeStorage() {
    const storage = window.localStorage;
    storage.removeItem('$user_info');
    storage.removeItem('$token_info');
    storage.removeItem('$permission');
  }
}
