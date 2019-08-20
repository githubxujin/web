import Storages from '../../utils/storages';
const state = {
  routeFrom: ''
  // uploadUrl: 'http://192.168.1.152/api/system-setting/upload'
};
const mutations = {
  setRouteFrom(state, path) {
    console.log(path, 565656)
    if (path) {
      state.routeFrom = path;
      Storages.setLocalStorage('$roupath', path);
    }
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
