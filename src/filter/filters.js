import Vue from 'vue';
import moment from 'moment';
import router from '../router/router.js';
import store from '../store/index.js';

router.beforeEach((to, from, next) => {
  const userInfo = store.getters.getUserInfo;
  store.commit('base/setRouteFrom', from.path);
  if (!userInfo) {
    if (to.path !== '/login') {
      next('/login');
      return;
    }
    next();
  } else {
    next();
  }
});

/**
 * 时间格式化
 * formatString：日期格式
 */
Vue.filter('timeFormat', (value, formatString) => {
  formatString = formatString || 'MM-DD HH:mm';
  return moment(value).format(formatString);
});
/**
 * 数字千分位
 * num: number
 * return string | number
 */
Vue.filter('thousandths', num => {
  if (typeof num === 'number') {
    return num.toLocaleString();
  } else {
    return num;
  }
});

// 提示框组件扩展
function toast(opt) {
  if (opt && typeof opt === 'string') {
    this.$toast({
      message: opt,
      mask: true
    });
    return;
  }
  const option = Object.assign(
    {
      message: 'toast',
      duration: 2000,
      degradeTime: 1000,
      mask: true,
      callback: function() {}
    },
    opt
  );
  this.$toast(option);
  const clock = setTimeout(function() {
    option.callback.call(this, option);
    clearTimeout(clock);
  }, option.duration + option.degradeTime);
}
Vue.prototype.toast = toast;
