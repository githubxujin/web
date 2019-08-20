import Storages from '../utils/storages';
const getters = {
  // 获取用户信息
  getUserInfo: state => {
    if (!state.user.userInfo) {
      state.user.userInfo = Storages.getLocalStorage('$user_info');
      console.log('用户信息', Storages.getLocalStorage('$user_info'));
    }
    return state.user.userInfo;
  },
  // 获取token
  getTokenInfo: state => {
    if (!state.user.requestHeaderToken) {
      state.user.requestHeaderToken = localStorage.getItem('$token_info');
    }
    return state.user.requestHeaderToken;
  },
  // 获取当前页面从那里跳转过来的
  getRouteFrom: state => {
    if (!state.base.routeFrom) {
      state.base.routeFrom = localStorage.getItem('$route_from');
    }
    return state.base.routeFrom;
  },
  // 获取当前选中的门店编号
  shopNumber: state => {
    if (!state.user.userInfo) {
      state.user.userInfo = Storages.getLocalStorage('$user_info');
    }
    if (!state.base.curShop) {
      state.base.curShop = Storages.getLocalStorage('$curShop');
    }
    return state.user.userInfo.roleType == 2
      ? state.user.userInfo.shopNumber
      : state.base.curShop.shopNumber;
  }
};
export default getters;
