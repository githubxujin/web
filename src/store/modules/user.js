import Storages from '../../utils/storages';
const state = {
  userInfo: null,
  requestHeaderToken: ''
};
const mutations = {
  setRequestHeader(state, tokenString) {
    if (tokenString) {
      state.requestHeaderToken = tokenString;
      Storages.setLocalStorage('$token_info', tokenString);
    }
  },
  setUserInfo(state, user) {
    if (user) {
      state.userInfo = user;
      Storages.setLocalStorage('$user_info', user);
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
